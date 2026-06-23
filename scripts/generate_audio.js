/**
 * generate_audio.js
 * 使用阿里云语音合成 SDK 为 lessons.json 中的每个英文例句生成音频文件。
 *
 * 用法: node scripts/generate_audio.js
 * 设置环境变量: ALI_APPKEY, ALI_TOKEN (或从 local.env 读取)
 *
 * 特性:
 *  - 断点续传: 跳过已存在的音频文件
 *  - 进度显示: 实时输出进度
 *  - 定期保存: 每处理完一个 lesson 就更新 lessons.json
 */

const fs = require('fs');
const path = require('path');

// ---------- 读取 local.env ----------
function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}
loadEnv(path.join(__dirname, '..', 'local.env'));

const APPKEY = process.env.ALI_APPKEY;
const TOKEN  = process.env.ALI_ACCESSTOKEN;
const URL    = 'wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1';
const FORMAT = 'mp3';        // 音频格式
const SAMPLE_RATE = 16000;
const VOLUME = 50;
const SPEECH_RATE = 0;

const AUDIO_DIR = path.join(__dirname, '..', 'data', 'audio');
const LESSONS_PATH = path.join(__dirname, '..', 'data', 'lessons.json');
const PROGRESS_PATH = path.join(__dirname, '..', 'data', 'audio', '.progress.json');

// 确保音频目录存在
fs.mkdirSync(AUDIO_DIR, { recursive: true });

// ---------- 辅助函数 ----------
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 合成一句话的语音，返回 Buffer（音频数据）。
 * 如果失败则返回 null。
 */
function synthesizeSentence(text, fileLabel) {
  return new Promise((resolve) => {
    const Nls = require('alibabacloud-nls');
    const tts = new Nls.SpeechSynthesizer({
      url: URL,
      appkey: APPKEY,
      token: TOKEN,
    });

    const chunks = [];
    let resolved = false;

    tts.on('data', (msg) => {
      // msg 是 Buffer
      chunks.push(Buffer.from(msg));
    });

    tts.on('completed', (msg) => {
      if (!resolved) {
        // 收到 completed 后，连接可能还未关闭，我们等 closed 再 resolve
      }
    });

    tts.on('closed', () => {
      if (!resolved) {
        resolved = true;
        const audio = Buffer.concat(chunks);
        resolve(audio);
      }
    });

    tts.on('failed', (msg) => {
      if (!resolved) {
        resolved = true;
        console.error(`  [FAIL] ${fileLabel}: ${msg}`);
        resolve(null);
      }
    });

    // 使用 defaultStartParams 并覆盖
    const param = tts.defaultStartParams();
    param.text = text;
    param.format = FORMAT;
    param.sample_rate = SAMPLE_RATE;
    param.volume = VOLUME;
    param.speech_rate = SPEECH_RATE;

    tts.start(param, true, 6000).catch((err) => {
      if (!resolved) {
        resolved = true;
        console.error(`  [ERROR] ${fileLabel}: ${err.message || err}`);
        resolve(null);
      }
    });
  });
}

/**
 * 生成单个音频文件（带重试）
 */
async function generateAudio(text, filepath, fileLabel, maxRetries = 2) {
  // 如果文件已存在且非空，跳过
  if (fs.existsSync(filepath) && fs.statSync(filepath).size > 0) {
    return true; // skip
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const audio = await synthesizeSentence(text, fileLabel);
    if (audio && audio.length > 0) {
      fs.writeFileSync(filepath, audio);
      console.log(`  [OK] ${fileLabel} (${audio.length} bytes)`);
      return true;
    }
    if (attempt < maxRetries) {
      console.log(`  [RETRY] ${fileLabel} (attempt ${attempt + 2}/${maxRetries + 1})`);
      await sleep(1000);
    }
  }
  console.error(`  [GIVEUP] ${fileLabel}: failed after ${maxRetries + 1} attempts`);
  return false;
}

// ---------- 主逻辑 ----------
async function main() {
  console.log('=== 阿里云语音合成 - 批量生成音频 ===');
  console.log(`Appkey: ${APPKEY}`);
  console.log(`Token:  ${TOKEN ? TOKEN.slice(0, 8) + '...' : '(missing)'}`);
  console.log(`Output: ${AUDIO_DIR}`);
  console.log('');

  if (!APPKEY || !TOKEN) {
    console.error('错误: 请在 local.env 中设置 ALI_APPKEY 和 ALI_ACCESSTOKEN');
    process.exit(1);
  }

  // 读取 lessons.json
  const lessons = JSON.parse(fs.readFileSync(LESSONS_PATH, 'utf-8'));

  // 读取进度记录（用于续传）
  let progress = {};
  if (fs.existsSync(PROGRESS_PATH)) {
    progress = JSON.parse(fs.readFileSync(PROGRESS_PATH, 'utf-8'));
    console.log(`已加载进度记录: ${Object.keys(progress).length} 个已处理项`);
  }

  let totalSentences = 0;
  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (let li = 0; li < lessons.length; li++) {
    const lesson = lessons[li];
    const lessonNum = lesson.lesson;
    console.log(`\n--- Lesson ${lessonNum}: ${lesson.title} (${lesson.type}) ---`);

    if (lesson.type === 'vocabulary') {
      for (let pi = 0; pi < lesson.phrases.length; pi++) {
        const phrase = lesson.phrases[pi];
        for (let ei = 0; ei < phrase.examples.length; ei++) {
          const example = phrase.examples[ei];
          const en = example.en;

          // 生成文件名: l{lesson}_p{phraseIdx}_e{exampleIdx}.mp3
          const filename = `l${lessonNum}_p${pi}_e${ei}.mp3`;
          const filepath = path.join(AUDIO_DIR, filename);
          const label = `L${lessonNum}P${pi}E${ei}`;
          const progressKey = filename;

          totalSentences++;

          if (progress[progressKey] === 'ok') {
            skipCount++;
            example.audio = `audio/${filename}`;
            continue;
          }

          const ok = await generateAudio(en, filepath, label);
          if (ok) {
            successCount++;
            progress[progressKey] = 'ok';
            example.audio = `audio/${filename}`;
          } else {
            failCount++;
          }

          // 每句话之间短暂停顿，避免请求过快
          await sleep(200);
        }
      }
    } else if (lesson.type === 'scenario') {
      for (let si = 0; si < lesson.sections.length; si++) {
        const section = lesson.sections[si];
        for (let gi = 0; gi < section.groups.length; gi++) {
          const group = section.groups[gi];
          for (let ii = 0; ii < group.items.length; ii++) {
            const item = group.items[ii];
            const en = item.en;

            // 生成文件名: l{lesson}_s{sectionIdx}_g{groupIdx}_i{itemIdx}.mp3
            const filename = `l${lessonNum}_s${si}_g${gi}_i${ii}.mp3`;
            const filepath = path.join(AUDIO_DIR, filename);
            const label = `L${lessonNum}S${si}G${gi}I${ii}`;
            const progressKey = filename;

            totalSentences++;

            if (progress[progressKey] === 'ok') {
              skipCount++;
              item.audio = `audio/${filename}`;
              continue;
            }

            const ok = await generateAudio(en, filepath, label);
            if (ok) {
              successCount++;
              progress[progressKey] = 'ok';
              item.audio = `audio/${filename}`;
            } else {
              failCount++;
            }

            await sleep(200);
          }
        }
      }
    }

    // 每处理完一个 lesson 就保存 JSON 和进度
    fs.writeFileSync(LESSONS_PATH, JSON.stringify(lessons, null, 2), 'utf-8');
    fs.writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2), 'utf-8');
    console.log(`  [SAVED] Lesson ${lessonNum} 处理完毕，lessons.json 已更新`);

    console.log(`  进度: ${successCount + skipCount}/${totalSentences} (成功${successCount}, 跳过${skipCount}, 失败${failCount})`);
  }

  // 最终保存
  fs.writeFileSync(LESSONS_PATH, JSON.stringify(lessons, null, 2), 'utf-8');
  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2), 'utf-8');

  console.log('\n=== 完成 ===');
  console.log(`总句数: ${totalSentences}`);
  console.log(`成功: ${successCount}`);
  console.log(`跳过: ${skipCount}`);
  console.log(`失败: ${failCount}`);
  console.log(`音频目录: ${AUDIO_DIR}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
