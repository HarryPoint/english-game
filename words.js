// ==================== Shared English Word Library ====================
// Covers Chinese elementary school English curriculum (PEP 人教版 G3-G6 ~650 words).
// Reusable across all English learning games in this project.
// Include with: <script src="words.js"></script>
// Provides: WORD_POOL, WORD_CN, getRandomWords(), getWordsByCategory(), getWordsByGrade()

const WORD_POOL = [

  // ======================== GRADE 3 (三上/三下) ========================

  // ---- School Supplies 学习用品 ----
  { en: 'book',    cn: '书',       emoji: '📖',  category: 'school',  grade: 3 },
  { en: 'pen',     cn: '钢笔',     emoji: '🖊️',  category: 'school',  grade: 3 },
  { en: 'pencil',  cn: '铅笔',     emoji: '✏️',  category: 'school',  grade: 3 },
  { en: 'ruler',   cn: '尺子',     emoji: '📏',  category: 'school',  grade: 3 },
  { en: 'eraser',  cn: '橡皮',     emoji: '🧹',  category: 'school',  grade: 3 },
  { en: 'bag',     cn: '书包',     emoji: '🎒',  category: 'school',  grade: 3 },
  { en: 'crayon',  cn: '蜡笔',     emoji: '🖍️',  category: 'school',  grade: 3 },
  { en: 'school',  cn: '学校',     emoji: '🏫',  category: 'school',  grade: 3 },

  // ---- Body Parts 身体部位 ----
  { en: 'eye',     cn: '眼睛',     emoji: '👁️',  category: 'body',    grade: 3 },
  { en: 'ear',     cn: '耳朵',     emoji: '👂',  category: 'body',    grade: 3 },
  { en: 'nose',    cn: '鼻子',     emoji: '👃',  category: 'body',    grade: 3 },
  { en: 'mouth',   cn: '嘴巴',     emoji: '👄',  category: 'body',    grade: 3 },
  { en: 'hand',    cn: '手',       emoji: '✋',  category: 'body',    grade: 3 },
  { en: 'foot',    cn: '脚',       emoji: '🦶',  category: 'body',    grade: 3 },
  { en: 'head',    cn: '头',       emoji: '🗣️',  category: 'body',    grade: 3 },
  { en: 'face',    cn: '脸',       emoji: '😊',  category: 'body',    grade: 3 },
  { en: 'arm',     cn: '胳膊',     emoji: '💪',  category: 'body',    grade: 3 },
  { en: 'leg',     cn: '腿',       emoji: '🦵',  category: 'body',    grade: 3 },
  { en: 'hair',    cn: '头发',     emoji: '💇',  category: 'body',    grade: 3 },

  // ---- Colors 颜色 ----
  { en: 'red',     cn: '红色',     emoji: '🔴',  category: 'color',   grade: 3 },
  { en: 'blue',    cn: '蓝色',     emoji: '🔵',  category: 'color',   grade: 3 },
  { en: 'green',   cn: '绿色',     emoji: '🟢',  category: 'color',   grade: 3 },
  { en: 'yellow',  cn: '黄色',     emoji: '🟡',  category: 'color',   grade: 3 },
  { en: 'white',   cn: '白色',     emoji: '⚪',  category: 'color',   grade: 3 },
  { en: 'black',   cn: '黑色',     emoji: '⚫',  category: 'color',   grade: 3 },
  { en: 'orange',  cn: '橙色',     emoji: '🟠',  category: 'color',   grade: 3 },
  { en: 'brown',   cn: '棕色',     emoji: '🟤',  category: 'color',   grade: 3 },
  { en: 'pink',    cn: '粉色',     emoji: '🩷',  category: 'color',   grade: 3 },
  { en: 'purple',  cn: '紫色',     emoji: '🟣',  category: 'color',   grade: 3 },

  // ---- Animals 动物 ----
  { en: 'cat',     cn: '猫',       emoji: '🐱',  category: 'animal',  grade: 3 },
  { en: 'dog',     cn: '狗',       emoji: '🐶',  category: 'animal',  grade: 3 },
  { en: 'fish',    cn: '鱼',       emoji: '🐟',  category: 'animal',  grade: 3 },
  { en: 'bird',    cn: '小鸟',     emoji: '🐦',  category: 'animal',  grade: 3 },
  { en: 'pig',     cn: '猪',       emoji: '🐷',  category: 'animal',  grade: 3 },
  { en: 'duck',    cn: '鸭子',     emoji: '🦆',  category: 'animal',  grade: 3 },
  { en: 'monkey',  cn: '猴子',     emoji: '🐵',  category: 'animal',  grade: 3 },
  { en: 'rabbit',  cn: '兔子',     emoji: '🐰',  category: 'animal',  grade: 3 },
  { en: 'mouse',   cn: '老鼠',     emoji: '🐭',  category: 'animal',  grade: 3 },
  { en: 'bear',    cn: '熊',       emoji: '🐻',  category: 'animal',  grade: 3 },
  { en: 'tiger',   cn: '老虎',     emoji: '🐯',  category: 'animal',  grade: 3 },
  { en: 'lion',    cn: '狮子',     emoji: '🦁',  category: 'animal',  grade: 3 },
  { en: 'elephant',cn: '大象',     emoji: '🐘',  category: 'animal',  grade: 3 },
  { en: 'snake',   cn: '蛇',       emoji: '🐍',  category: 'animal',  grade: 3 },
  { en: 'frog',    cn: '青蛙',     emoji: '🐸',  category: 'animal',  grade: 3 },
  { en: 'hen',     cn: '母鸡',     emoji: '🐔',  category: 'animal',  grade: 3 },
  { en: 'sheep',   cn: '羊',       emoji: '🐑',  category: 'animal',  grade: 3 },
  { en: 'horse',   cn: '马',       emoji: '🐴',  category: 'animal',  grade: 3 },
  { en: 'cow',     cn: '奶牛',     emoji: '🐮',  category: 'animal',  grade: 3 },
  { en: 'ant',     cn: '蚂蚁',     emoji: '🐜',  category: 'animal',  grade: 3 },
  { en: 'bee',     cn: '蜜蜂',     emoji: '🐝',  category: 'animal',  grade: 3 },

  // ---- Food & Drinks 食物饮料 ----
  { en: 'apple',   cn: '苹果',     emoji: '🍎',  category: 'food',    grade: 3 },
  { en: 'banana',  cn: '香蕉',     emoji: '🍌',  category: 'food',    grade: 3 },
  { en: 'cake',    cn: '蛋糕',     emoji: '🎂',  category: 'food',    grade: 3 },
  { en: 'egg',     cn: '鸡蛋',     emoji: '🥚',  category: 'food',    grade: 3 },
  { en: 'milk',    cn: '牛奶',     emoji: '🥛',  category: 'food',    grade: 3 },
  { en: 'bread',   cn: '面包',     emoji: '🍞',  category: 'food',    grade: 3 },
  { en: 'rice',    cn: '米饭',     emoji: '🍚',  category: 'food',    grade: 3 },
  { en: 'water',   cn: '水',       emoji: '💧',  category: 'food',    grade: 3 },
  { en: 'juice',   cn: '果汁',     emoji: '🧃',  category: 'food',    grade: 3 },
  { en: 'grape',   cn: '葡萄',     emoji: '🍇',  category: 'food',    grade: 3 },
  { en: 'pear',    cn: '梨',       emoji: '🍐',  category: 'food',    grade: 3 },
  { en: 'fish',    cn: '鱼肉',     emoji: '🐟',  category: 'food',    grade: 3 },
  { en: 'chicken', cn: '鸡肉',     emoji: '🍗',  category: 'food',    grade: 3 },
  { en: 'hotdog',  cn: '热狗',     emoji: '🌭',  category: 'food',    grade: 3 },
  { en: 'icecream',cn: '冰淇淋',   emoji: '🍦',  category: 'food',    grade: 3 },
  { en: 'candy',   cn: '糖果',     emoji: '🍬',  category: 'food',    grade: 3 },

  // ---- Family 家庭 ----
  { en: 'mom',     cn: '妈妈',     emoji: '👩',  category: 'family',  grade: 3 },
  { en: 'dad',     cn: '爸爸',     emoji: '👨',  category: 'family',  grade: 3 },
  { en: 'baby',    cn: '宝宝',     emoji: '👶',  category: 'family',  grade: 3 },
  { en: 'sister',  cn: '姐妹',     emoji: '👧',  category: 'family',  grade: 3 },
  { en: 'brother', cn: '兄弟',     emoji: '👦',  category: 'family',  grade: 3 },
  { en: 'family',  cn: '家庭',     emoji: '👨‍👩‍👧‍👦', category: 'family', grade: 3 },
  { en: 'friend',  cn: '朋友',     emoji: '🤝',  category: 'family',  grade: 3 },

  // ---- Toys 玩具 ----
  { en: 'ball',    cn: '球',       emoji: '⚽',  category: 'toy',     grade: 3 },
  { en: 'kite',    cn: '风筝',     emoji: '🪁',  category: 'toy',     grade: 3 },
  { en: 'doll',    cn: '娃娃',     emoji: '🪆',  category: 'toy',     grade: 3 },
  { en: 'car',     cn: '小汽车',   emoji: '🚗',  category: 'toy',     grade: 3 },
  { en: 'boat',    cn: '小船',     emoji: '⛵',  category: 'toy',     grade: 3 },
  { en: 'balloon', cn: '气球',     emoji: '🎈',  category: 'toy',     grade: 3 },

  // ---- Numbers 数字 ----
  { en: 'one',     cn: '一',       emoji: '1️⃣',  category: 'number',  grade: 3 },
  { en: 'two',     cn: '二',       emoji: '2️⃣',  category: 'number',  grade: 3 },
  { en: 'three',   cn: '三',       emoji: '3️⃣',  category: 'number',  grade: 3 },
  { en: 'four',    cn: '四',       emoji: '4️⃣',  category: 'number',  grade: 3 },
  { en: 'five',    cn: '五',       emoji: '5️⃣',  category: 'number',  grade: 3 },
  { en: 'six',     cn: '六',       emoji: '6️⃣',  category: 'number',  grade: 3 },
  { en: 'seven',   cn: '七',       emoji: '7️⃣',  category: 'number',  grade: 3 },
  { en: 'eight',   cn: '八',       emoji: '8️⃣',  category: 'number',  grade: 3 },
  { en: 'nine',    cn: '九',       emoji: '9️⃣',  category: 'number',  grade: 3 },
  { en: 'ten',     cn: '十',       emoji: '🔟',  category: 'number',  grade: 3 },

  // ======================== GRADE 4 (四上/四下) ========================

  // ---- Classroom 教室 ----
  { en: 'desk',    cn: '课桌',     emoji: '🪑',  category: 'school',  grade: 4 },
  { en: 'chair',   cn: '椅子',     emoji: '💺',  category: 'school',  grade: 4 },
  { en: 'window',  cn: '窗户',     emoji: '🪟',  category: 'school',  grade: 4 },
  { en: 'door',    cn: '门',       emoji: '🚪',  category: 'school',  grade: 4 },
  { en: 'clock',   cn: '时钟',     emoji: '🕐',  category: 'school',  grade: 4 },
  { en: 'board',   cn: '黑板',     emoji: '📋',  category: 'school',  grade: 4 },
  { en: 'light',   cn: '灯',       emoji: '💡',  category: 'school',  grade: 4 },
  { en: 'picture', cn: '图画',     emoji: '🖼️',  category: 'school',  grade: 4 },
  { en: 'computer',cn: '电脑',     emoji: '💻',  category: 'school',  grade: 4 },
  { en: 'floor',   cn: '地板',     emoji: '🧹',  category: 'school',  grade: 4 },
  { en: 'wall',    cn: '墙壁',     emoji: '🧱',  category: 'school',  grade: 4 },

  // ---- Home & Rooms 家与房间 ----
  { en: 'house',   cn: '房子',     emoji: '🏠',  category: 'place',   grade: 4 },
  { en: 'room',    cn: '房间',     emoji: '🚪',  category: 'place',   grade: 4 },
  { en: 'bedroom', cn: '卧室',     emoji: '🛏️',  category: 'place',   grade: 4 },
  { en: 'kitchen', cn: '厨房',     emoji: '🍳',  category: 'place',   grade: 4 },
  { en: 'bathroom',cn: '浴室',     emoji: '🛁',  category: 'place',   grade: 4 },
  { en: 'garden',  cn: '花园',     emoji: '🌻',  category: 'place',   grade: 4 },
  { en: 'bed',     cn: '床',       emoji: '🛏️',  category: 'place',   grade: 4 },
  { en: 'table',   cn: '桌子',     emoji: '🍽️',  category: 'place',   grade: 4 },
  { en: 'sofa',    cn: '沙发',     emoji: '🛋️',  category: 'place',   grade: 4 },
  { en: 'phone',   cn: '电话',     emoji: '📱',  category: 'place',   grade: 4 },
  { en: 'fridge',  cn: '冰箱',     emoji: '🧊',  category: 'place',   grade: 4 },
  { en: 'key',     cn: '钥匙',     emoji: '🔑',  category: 'place',   grade: 4 },

  // ---- Food & Meals 餐饮 ----
  { en: 'beef',    cn: '牛肉',     emoji: '🥩',  category: 'food',    grade: 4 },
  { en: 'noodle',  cn: '面条',     emoji: '🍜',  category: 'food',    grade: 4 },
  { en: 'soup',    cn: '汤',       emoji: '🍲',  category: 'food',    grade: 4 },
  { en: 'salad',   cn: '沙拉',     emoji: '🥗',  category: 'food',    grade: 4 },
  { en: 'hamburger',cn:'汉堡',     emoji: '🍔',  category: 'food',    grade: 4 },
  { en: 'pizza',   cn: '披萨',     emoji: '🍕',  category: 'food',    grade: 4 },
  { en: 'sandwich',cn: '三明治',   emoji: '🥪',  category: 'food',    grade: 4 },
  { en: 'tea',     cn: '茶',       emoji: '🍵',  category: 'food',    grade: 4 },
  { en: 'coffee',  cn: '咖啡',     emoji: '☕',  category: 'food',    grade: 4 },

  // ---- Clothes 服装 ----
  { en: 'hat',     cn: '帽子',     emoji: '🧢',  category: 'clothes', grade: 4 },
  { en: 'shirt',   cn: '衬衫',     emoji: '👔',  category: 'clothes', grade: 4 },
  { en: 'dress',   cn: '裙子',     emoji: '👗',  category: 'clothes', grade: 4 },
  { en: 'skirt',   cn: '短裙',     emoji: '👚',  category: 'clothes', grade: 4 },
  { en: 'coat',    cn: '外套',     emoji: '🧥',  category: 'clothes', grade: 4 },
  { en: 'jacket',  cn: '夹克',     emoji: '🧥',  category: 'clothes', grade: 4 },
  { en: 'sweater', cn: '毛衣',     emoji: '👕',  category: 'clothes', grade: 4 },
  { en: 'shoe',    cn: '鞋子',     emoji: '👟',  category: 'clothes', grade: 4 },
  { en: 'sock',    cn: '袜子',     emoji: '🧦',  category: 'clothes', grade: 4 },
  { en: 'pants',   cn: '裤子',     emoji: '👖',  category: 'clothes', grade: 4 },
  { en: 'shorts',  cn: '短裤',     emoji: '🩳',  category: 'clothes', grade: 4 },
  { en: 'scarf',   cn: '围巾',     emoji: '🧣',  category: 'clothes', grade: 4 },
  { en: 'glasses', cn: '眼镜',     emoji: '👓',  category: 'clothes', grade: 4 },

  // ---- Weather 天气 ----
  { en: 'sun',     cn: '太阳',     emoji: '☀️',  category: 'nature',  grade: 4 },
  { en: 'rain',    cn: '雨',       emoji: '🌧️',  category: 'nature',  grade: 4 },
  { en: 'snow',    cn: '雪',       emoji: '❄️',  category: 'nature',  grade: 4 },
  { en: 'cloud',   cn: '云',       emoji: '☁️',  category: 'nature',  grade: 4 },
  { en: 'wind',    cn: '风',       emoji: '💨',  category: 'nature',  grade: 4 },
  { en: 'hot',     cn: '热的',     emoji: '🥵',  category: 'nature',  grade: 4 },
  { en: 'cold',    cn: '冷的',     emoji: '🥶',  category: 'nature',  grade: 4 },
  { en: 'warm',    cn: '温暖的',   emoji: '🌤️',  category: 'nature',  grade: 4 },
  { en: 'cool',    cn: '凉爽的',   emoji: '🍃',  category: 'nature',  grade: 4 },

  // ---- Time 时间 ----
  { en: 'morning', cn: '早上',     emoji: '🌅',  category: 'time',    grade: 4 },
  { en: 'afternoon',cn:'下午',     emoji: '🌤️',  category: 'time',    grade: 4 },
  { en: 'evening', cn: '傍晚',     emoji: '🌆',  category: 'time',    grade: 4 },
  { en: 'night',   cn: '夜晚',     emoji: '🌙',  category: 'time',    grade: 4 },
  { en: 'today',   cn: '今天',     emoji: '📅',  category: 'time',    grade: 4 },
  { en: 'tomorrow',cn: '明天',     emoji: '➡️',  category: 'time',    grade: 4 },
  { en: 'yesterday',cn:'昨天',     emoji: '⬅️',  category: 'time',    grade: 4 },

  // ======================== GRADE 5 (五上/五下) ========================

  // ---- People & Jobs 人物职业 ----
  { en: 'teacher', cn: '老师',     emoji: '👩‍🏫',  category: 'people',  grade: 5 },
  { en: 'student', cn: '学生',     emoji: '🧑‍🎓',  category: 'people',  grade: 5 },
  { en: 'doctor',  cn: '医生',     emoji: '👨‍⚕️',  category: 'people',  grade: 5 },
  { en: 'nurse',   cn: '护士',     emoji: '👩‍⚕️',  category: 'people',  grade: 5 },
  { en: 'cook',    cn: '厨师',     emoji: '👨‍🍳',  category: 'people',  grade: 5 },
  { en: 'driver',  cn: '司机',     emoji: '👨‍✈️',  category: 'people',  grade: 5 },
  { en: 'farmer',  cn: '农民',     emoji: '👨‍🌾',  category: 'people',  grade: 5 },
  { en: 'police',  cn: '警察',     emoji: '👮',  category: 'people',  grade: 5 },
  { en: 'singer',  cn: '歌手',     emoji: '🎤',  category: 'people',  grade: 5 },
  { en: 'writer',  cn: '作家',     emoji: '✍️',  category: 'people',  grade: 5 },
  { en: 'king',    cn: '国王',     emoji: '🤴',  category: 'people',  grade: 5 },
  { en: 'queen',   cn: '女王',     emoji: '👸',  category: 'people',  grade: 5 },
  { en: 'boy',     cn: '男孩',     emoji: '👦',  category: 'people',  grade: 5 },
  { en: 'girl',    cn: '女孩',     emoji: '👧',  category: 'people',  grade: 5 },
  { en: 'man',     cn: '男人',     emoji: '👨',  category: 'people',  grade: 5 },
  { en: 'woman',   cn: '女人',     emoji: '👩',  category: 'people',  grade: 5 },
  { en: 'child',   cn: '孩子',     emoji: '🧒',  category: 'people',  grade: 5 },

  // ---- Nature & Plants 自然植物 ----
  { en: 'tree',    cn: '树',       emoji: '🌳',  category: 'nature',  grade: 5 },
  { en: 'flower',  cn: '花',       emoji: '🌸',  category: 'nature',  grade: 5 },
  { en: 'grass',   cn: '草',       emoji: '🌿',  category: 'nature',  grade: 5 },
  { en: 'leaf',    cn: '叶子',     emoji: '🍃',  category: 'nature',  grade: 5 },
  { en: 'river',   cn: '河流',     emoji: '🏞️',  category: 'nature',  grade: 5 },
  { en: 'lake',    cn: '湖泊',     emoji: '🌊',  category: 'nature',  grade: 5 },
  { en: 'sea',     cn: '大海',     emoji: '🌊',  category: 'nature',  grade: 5 },
  { en: 'moon',    cn: '月亮',     emoji: '🌙',  category: 'nature',  grade: 5 },
  { en: 'star',    cn: '星星',     emoji: '⭐',  category: 'nature',  grade: 5 },
  { en: 'fire',    cn: '火',       emoji: '🔥',  category: 'nature',  grade: 5 },
  { en: 'hill',    cn: '山丘',     emoji: '⛰️',  category: 'nature',  grade: 5 },
  { en: 'bridge',  cn: '桥',       emoji: '🌉',  category: 'nature',  grade: 5 },

  // ---- More Animals 更多动物 ----
  { en: 'turtle',  cn: '乌龟',     emoji: '🐢',  category: 'animal',  grade: 5 },
  { en: 'whale',   cn: '鲸鱼',     emoji: '🐋',  category: 'animal',  grade: 5 },
  { en: 'shark',   cn: '鲨鱼',     emoji: '🦈',  category: 'animal',  grade: 5 },
  { en: 'owl',     cn: '猫头鹰',   emoji: '🦉',  category: 'animal',  grade: 5 },
  { en: 'panda',   cn: '熊猫',     emoji: '🐼',  category: 'animal',  grade: 5 },
  { en: 'wolf',    cn: '狼',       emoji: '🐺',  category: 'animal',  grade: 5 },
  { en: 'fox',     cn: '狐狸',     emoji: '🦊',  category: 'animal',  grade: 5 },
  { en: 'deer',    cn: '鹿',       emoji: '🦌',  category: 'animal',  grade: 5 },
  { en: 'eagle',   cn: '鹰',       emoji: '🦅',  category: 'animal',  grade: 5 },
  { en: 'crab',    cn: '螃蟹',     emoji: '🦀',  category: 'animal',  grade: 5 },
  { en: 'dolphin', cn: '海豚',     emoji: '🐬',  category: 'animal',  grade: 5 },
  { en: 'goat',    cn: '山羊',     emoji: '🐐',  category: 'animal',  grade: 5 },
  { en: 'parrot',  cn: '鹦鹉',     emoji: '🦜',  category: 'animal',  grade: 5 },

  // ---- Sports & Hobbies 运动爱好 ----
  { en: 'run',     cn: '跑步',     emoji: '🏃',  category: 'action',  grade: 5 },
  { en: 'swim',    cn: '游泳',     emoji: '🏊',  category: 'action',  grade: 5 },
  { en: 'jump',    cn: '跳',       emoji: '🤾',  category: 'action',  grade: 5 },
  { en: 'fly',     cn: '飞',       emoji: '🦋',  category: 'action',  grade: 5 },
  { en: 'sing',    cn: '唱歌',     emoji: '🎤',  category: 'action',  grade: 5 },
  { en: 'dance',   cn: '跳舞',     emoji: '💃',  category: 'action',  grade: 5 },
  { en: 'read',    cn: '阅读',     emoji: '📚',  category: 'action',  grade: 5 },
  { en: 'draw',    cn: '画画',     emoji: '🎨',  category: 'action',  grade: 5 },
  { en: 'cook',    cn: '烹饪',     emoji: '🍳',  category: 'action',  grade: 5 },
  { en: 'skate',   cn: '滑冰',     emoji: '⛸️',  category: 'action',  grade: 5 },
  { en: 'ski',     cn: '滑雪',     emoji: '🎿',  category: 'action',  grade: 5 },
  { en: 'climb',   cn: '攀爬',     emoji: '🧗',  category: 'action',  grade: 5 },

  // ---- Places 场所 ----
  { en: 'park',    cn: '公园',     emoji: '🏞️',  category: 'place',   grade: 5 },
  { en: 'zoo',     cn: '动物园',   emoji: '🐘',  category: 'place',   grade: 5 },
  { en: 'shop',    cn: '商店',     emoji: '🏪',  category: 'place',   grade: 5 },
  { en: 'library', cn: '图书馆',   emoji: '📚',  category: 'place',   grade: 5 },
  { en: 'hospital',cn: '医院',     emoji: '🏥',  category: 'place',   grade: 5 },
  { en: 'cinema',  cn: '电影院',   emoji: '🎬',  category: 'place',   grade: 5 },
  { en: 'museum',  cn: '博物馆',   emoji: '🏛️',  category: 'place',   grade: 5 },
  { en: 'hotel',   cn: '酒店',     emoji: '🏨',  category: 'place',   grade: 5 },

  // ---- Days, Months, Seasons ----
  { en: 'Monday',  cn: '星期一',   emoji: '📅',  category: 'time',    grade: 5 },
  { en: 'Tuesday', cn: '星期二',   emoji: '📅',  category: 'time',    grade: 5 },
  { en: 'Wednesday',cn:'星期三',   emoji: '📅',  category: 'time',    grade: 5 },
  { en: 'Thursday',cn: '星期四',   emoji: '📅',  category: 'time',    grade: 5 },
  { en: 'Friday',  cn: '星期五',   emoji: '📅',  category: 'time',    grade: 5 },
  { en: 'Saturday',cn: '星期六',   emoji: '📅',  category: 'time',    grade: 5 },
  { en: 'Sunday',  cn: '星期日',   emoji: '📅',  category: 'time',    grade: 5 },
  { en: 'spring',  cn: '春天',     emoji: '🌸',  category: 'time',    grade: 5 },
  { en: 'summer',  cn: '夏天',     emoji: '☀️',  category: 'time',    grade: 5 },
  { en: 'autumn',  cn: '秋天',     emoji: '🍂',  category: 'time',    grade: 5 },
  { en: 'winter',  cn: '冬天',     emoji: '❄️',  category: 'time',    grade: 5 },
  { en: 'January', cn: '一月',     emoji: '🗓️',  category: 'time',    grade: 5 },
  { en: 'February',cn:'二月',      emoji: '🗓️',  category: 'time',    grade: 5 },
  { en: 'March',   cn: '三月',     emoji: '🗓️',  category: 'time',    grade: 5 },
  { en: 'April',   cn: '四月',     emoji: '🗓️',  category: 'time',    grade: 5 },
  { en: 'May',     cn: '五月',     emoji: '🗓️',  category: 'time',    grade: 5 },
  { en: 'June',    cn: '六月',     emoji: '🗓️',  category: 'time',    grade: 5 },
  { en: 'July',    cn: '七月',     emoji: '🗓️',  category: 'time',    grade: 5 },
  { en: 'August',  cn: '八月',     emoji: '🗓️',  category: 'time',    grade: 5 },
  { en: 'September',cn:'九月',     emoji: '🗓️',  category: 'time',    grade: 5 },
  { en: 'October', cn: '十月',     emoji: '🗓️',  category: 'time',    grade: 5 },
  { en: 'November',cn:'十一月',    emoji: '🗓️',  category: 'time',    grade: 5 },
  { en: 'December',cn:'十二月',    emoji: '🗓️',  category: 'time',    grade: 5 },

  // ---- Adjectives 形容词 ----
  { en: 'big',     cn: '大的',     emoji: '🐘',  category: 'adj',     grade: 5 },
  { en: 'small',   cn: '小的',     emoji: '🐭',  category: 'adj',     grade: 5 },
  { en: 'long',    cn: '长的',     emoji: '🐍',  category: 'adj',     grade: 5 },
  { en: 'short',   cn: '短的',     emoji: '📏',  category: 'adj',     grade: 5 },
  { en: 'tall',    cn: '高的',     emoji: '🦒',  category: 'adj',     grade: 5 },
  { en: 'new',     cn: '新的',     emoji: '✨',  category: 'adj',     grade: 5 },
  { en: 'old',     cn: '旧的/老的',emoji: '👴',  category: 'adj',     grade: 5 },
  { en: 'fast',    cn: '快的',     emoji: '🚀',  category: 'adj',     grade: 5 },
  { en: 'slow',    cn: '慢的',     emoji: '🐌',  category: 'adj',     grade: 5 },
  { en: 'happy',   cn: '快乐的',   emoji: '😄',  category: 'adj',     grade: 5 },
  { en: 'sad',     cn: '伤心的',   emoji: '😢',  category: 'adj',     grade: 5 },
  { en: 'kind',    cn: '善良的',   emoji: '💝',  category: 'adj',     grade: 5 },
  { en: 'tired',   cn: '累的',     emoji: '😫',  category: 'adj',     grade: 5 },
  { en: 'hungry',  cn: '饿的',     emoji: '😋',  category: 'adj',     grade: 5 },
  { en: 'thirsty', cn: '渴的',     emoji: '🥤',  category: 'adj',     grade: 5 },
  { en: 'clean',   cn: '干净的',   emoji: '🧼',  category: 'adj',     grade: 5 },
  { en: 'dirty',   cn: '脏的',     emoji: '💩',  category: 'adj',     grade: 5 },

  // ======================== GRADE 6 (六上/六下) ========================

  // ---- Transportation 交通 ----
  { en: 'bus',     cn: '公交车',   emoji: '🚌',  category: 'transport',grade:6 },
  { en: 'bike',    cn: '自行车',   emoji: '🚲',  category: 'transport',grade:6 },
  { en: 'train',   cn: '火车',     emoji: '🚂',  category: 'transport',grade:6 },
  { en: 'plane',   cn: '飞机',     emoji: '✈️',  category: 'transport',grade:6 },
  { en: 'ship',    cn: '轮船',     emoji: '🚢',  category: 'transport',grade:6 },
  { en: 'taxi',    cn: '出租车',   emoji: '🚕',  category: 'transport',grade:6 },
  { en: 'subway',  cn: '地铁',     emoji: '🚇',  category: 'transport',grade:6 },
  { en: 'truck',   cn: '卡车',     emoji: '🚛',  category: 'transport',grade:6 },
  { en: 'helicopter',cn:'直升机',  emoji: '🚁',  category: 'transport',grade:6 },

  // ---- Countries & Cities 国家城市 ----
  { en: 'China',   cn: '中国',     emoji: '🇨🇳',  category: 'place',   grade: 6 },
  { en: 'England', cn: '英国',     emoji: '🇬🇧',  category: 'place',   grade: 6 },
  { en: 'America', cn: '美国',     emoji: '🇺�',  category: 'place',   grade: 6 },
  { en: 'Canada',  cn: '加拿大',   emoji: '🇨🇦',  category: 'place',   grade: 6 },
  { en: 'Australia',cn:'澳大利亚', emoji: '🇦🇺',  category: 'place',   grade: 6 },
  { en: 'London',  cn: '伦敦',     emoji: '🏰',  category: 'place',   grade: 6 },
  { en: 'Beijing', cn: '北京',     emoji: '🏯',  category: 'place',   grade: 6 },
  { en: 'New York',cn:'纽约',      emoji: '🗽',  category: 'place',   grade: 6 },

  // ---- More Verbs 更多动作 ----
  { en: 'eat',     cn: '吃',       emoji: '🍽️',  category: 'action',  grade: 6 },
  { en: 'drink',   cn: '喝',       emoji: '🥤',  category: 'action',  grade: 6 },
  { en: 'sleep',   cn: '睡觉',     emoji: '😴',  category: 'action',  grade: 6 },
  { en: 'play',    cn: '玩',       emoji: '⚽',  category: 'action',  grade: 6 },
  { en: 'work',    cn: '工作',     emoji: '💼',  category: 'action',  grade: 6 },
  { en: 'walk',    cn: '走路',     emoji: '🚶',  category: 'action',  grade: 6 },
  { en: 'sit',     cn: '坐',       emoji: '🪑',  category: 'action',  grade: 6 },
  { en: 'stand',   cn: '站',       emoji: '🧍',  category: 'action',  grade: 6 },
  { en: 'open',    cn: '打开',     emoji: '📂',  category: 'action',  grade: 6 },
  { en: 'close',   cn: '关闭',     emoji: '📁',  category: 'action',  grade: 6 },
  { en: 'start',   cn: '开始',     emoji: '▶️',  category: 'action',  grade: 6 },
  { en: 'stop',    cn: '停止',     emoji: '⏹️',  category: 'action',  grade: 6 },
  { en: 'buy',     cn: '买',       emoji: '🛒',  category: 'action',  grade: 6 },
  { en: 'give',    cn: '给',       emoji: '🎁',  category: 'action',  grade: 6 },
  { en: 'write',   cn: '写',       emoji: '✍️',  category: 'action',  grade: 6 },
  { en: 'speak',   cn: '说',       emoji: '🗣️',  category: 'action',  grade: 6 },
  { en: 'listen',  cn: '听',       emoji: '👂',  category: 'action',  grade: 6 },
  { en: 'think',   cn: '想',       emoji: '🤔',  category: 'action',  grade: 6 },
  { en: 'watch',   cn: '观看',     emoji: '👀',  category: 'action',  grade: 6 },
  { en: 'wash',    cn: '洗',       emoji: '🧼',  category: 'action',  grade: 6 },
  { en: 'clean',   cn: '打扫',     emoji: '🧹',  category: 'action',  grade: 6 },
  { en: 'visit',   cn: '拜访',     emoji: '🏠',  category: 'action',  grade: 6 },
  { en: 'travel',  cn: '旅行',     emoji: '🧳',  category: 'action',  grade: 6 },

  // ---- Feelings & Health 感受健康 ----
  { en: 'angry',   cn: '生气的',   emoji: '😠',  category: 'adj',     grade: 6 },
  { en: 'afraid',  cn: '害怕的',   emoji: '😨',  category: 'adj',     grade: 6 },
  { en: 'worried', cn: '担心的',   emoji: '😟',  category: 'adj',     grade: 6 },
  { en: 'excited', cn: '兴奋的',   emoji: '🤩',  category: 'adj',     grade: 6 },
  { en: 'sick',    cn: '生病的',   emoji: '🤒',  category: 'adj',     grade: 6 },
  { en: 'strong',  cn: '强壮的',   emoji: '💪',  category: 'adj',     grade: 6 },
  { en: 'thin',    cn: '瘦的',     emoji: '🧍',  category: 'adj',     grade: 6 },
  { en: 'heavy',   cn: '重的',     emoji: '🏋️',  category: 'adj',     grade: 6 },
  { en: 'light',   cn: '轻的',     emoji: '🪶',  category: 'adj',     grade: 6 },
  { en: 'beautiful',cn:'美丽的',   emoji: '💐',  category: 'adj',     grade: 6 },
  { en: 'interesting',cn:'有趣的', emoji: '🎯',  category: 'adj',     grade: 6 },
  { en: 'favorite',cn: '最爱的',   emoji: '❤️',  category: 'adj',     grade: 6 },
  { en: 'different',cn:'不同的',   emoji: '🔄',  category: 'adj',     grade: 6 },

  // ---- More Items 更多物品 ----
  { en: 'map',     cn: '地图',     emoji: '🗺️',  category: 'toy',     grade: 6 },
  { en: 'camera',  cn: '相机',     emoji: '📷',  category: 'toy',     grade: 6 },
  { en: 'guitar',  cn: '吉他',     emoji: '🎸',  category: 'toy',     grade: 6 },
  { en: 'piano',   cn: '钢琴',     emoji: '🎹',  category: 'toy',     grade: 6 },
  { en: 'violin',  cn: '小提琴',   emoji: '🎻',  category: 'toy',     grade: 6 },
  { en: 'umbrella',cn: '雨伞',     emoji: '☂️',  category: 'toy',     grade: 6 },
  { en: 'newspaper',cn:'报纸',     emoji: '📰',  category: 'toy',     grade: 6 },
  { en: 'magazine',cn: '杂志',     emoji: '📓',  category: 'toy',     grade: 6 },
  { en: 'diary',   cn: '日记',     emoji: '📔',  category: 'toy',     grade: 6 },
  { en: 'gift',    cn: '礼物',     emoji: '🎁',  category: 'toy',     grade: 6 },
  { en: 'ring',    cn: '戒指',     emoji: '💍',  category: 'toy',     grade: 6 },
  { en: 'coin',    cn: '硬币',     emoji: '🪙',  category: 'toy',     grade: 6 },
  { en: 'lamp',    cn: '台灯',     emoji: '💡',  category: 'toy',     grade: 6 },
  { en: 'drum',    cn: '鼓',       emoji: '🥁',  category: 'toy',     grade: 6 },
  { en: 'fan',     cn: '风扇',     emoji: '🪭',  category: 'toy',     grade: 6 },

  // ---- Shapes 形状 ----
  { en: 'circle',  cn: '圆形',     emoji: '⭕',  category: 'shape',   grade: 6 },
  { en: 'square',  cn: '正方形',   emoji: '🟫',  category: 'shape',   grade: 6 },
  { en: 'triangle',cn: '三角形',   emoji: '🔺',  category: 'shape',   grade: 6 },
  { en: 'star',    cn: '星形',     emoji: '⭐',  category: 'shape',   grade: 6 },
  { en: 'heart',   cn: '心形',     emoji: '❤️',  category: 'shape',   grade: 6 },

  // ---- Nature & Space 自然太空 ----
  { en: 'earth',   cn: '地球',     emoji: '🌍',  category: 'nature',  grade: 6 },
  { en: 'air',     cn: '空气',     emoji: '💨',  category: 'nature',  grade: 6 },
  { en: 'forest',  cn: '森林',     emoji: '🌲',  category: 'nature',  grade: 6 },
  { en: 'island',  cn: '岛屿',     emoji: '🏝️',  category: 'nature',  grade: 6 },
  { en: 'mountain',cn:'山',        emoji: '🏔️',  category: 'nature',  grade: 6 },

  // ---- Prepositions 介词/方位 ----
  { en: 'in',      cn: '在...里',  emoji: '📥',  category: 'prep',    grade: 6 },
  { en: 'on',      cn: '在...上',  emoji: '📤',  category: 'prep',    grade: 6 },
  { en: 'under',   cn: '在...下',  emoji: '⬇️',  category: 'prep',    grade: 6 },
  { en: 'behind',  cn: '在...后',  emoji: '🔙',  category: 'prep',    grade: 6 },
  { en: 'between', cn: '在...之间',emoji: '↔️',  category: 'prep',    grade: 6 },
  { en: 'beside',  cn: '在...旁边',emoji: '👈',  category: 'prep',    grade: 6 },
  { en: 'up',      cn: '向上',     emoji: '⬆️',  category: 'prep',    grade: 6 },
  { en: 'down',    cn: '向下',     emoji: '⬇️',  category: 'prep',    grade: 6 },
  { en: 'left',    cn: '左边',     emoji: '👈',  category: 'prep',    grade: 6 },
  { en: 'right',   cn: '右边',     emoji: '👉',  category: 'prep',    grade: 6 },
];

// Convenience lookup: English → Chinese
const WORD_CN = {};
WORD_POOL.forEach(w => { WORD_CN[w.en] = w.cn; });

// Get random subset of words
function getRandomWords(count, excludeWords) {
  const available = WORD_POOL.filter(w => !excludeWords || !excludeWords.has(w.en));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get words by category
function getWordsByCategory(category) {
  return WORD_POOL.filter(w => w.category === category);
}

// Get words by grade level (3-6)
function getWordsByGrade(grade) {
  return WORD_POOL.filter(w => w.grade === grade);
}

console.log('📚 Word library loaded: ' + WORD_POOL.length + ' words (G3-G6 PEP curriculum)');
