#!/usr/bin/env python3
"""
Extract Lola English Course PDFs to structured JSON.

Two-phase parsing:
1. Detect entry headers in raw lines and group content between them
2. Within each entry, merge wrapped lines and parse example pairs
"""

import pdfplumber
import json
import re
import os
import glob
import wordninja

PDF_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "pdf")
OUTPUT_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "lessons.json")

CN_NUM = {"一": 1, "二": 2, "三": 3, "四": 4, "五": 5,
          "六": 6, "七": 7, "八": 8, "九": 9, "十": 10}

# Max chars of English part in a phrase header (before Chinese begins)
# Phrases like "Keepsbinthedark"=15, "Gotheextramile"=14 fit.
# Example sentences like "Thesolutiondidn'tworkout"=24 do NOT fit.
MAX_HEADER_EN_LEN = 20


def get_lesson_number(filename):
    basename = os.path.basename(filename)
    basename = basename.replace(".pdf", "").replace("教材", "").replace("课", "")
    for cn, num in CN_NUM.items():
        if cn in basename:
            return num
    return 0


def fix_spacing(text):
    """
    Fix English words that run together due to PDF extraction.
    Uses wordninja for intelligent word segmentation.
    """
    if not text or not has_en(text):
        return text.strip()

    # First, fix punctuation spacing (wordninja works better with separated sentences)
    text = re.sub(r'([.?!])([A-Z])', r'\1 \2', text)
    text = re.sub(r'([,])([A-Za-z])', r'\1 \2', text)
    # lowercase->uppercase boundary (e.g., "CarryOut" -> "Carry Out")
    text = re.sub(r'([a-z])([A-Z])', r'\1 \2', text)

    # Use wordninja to split joined English words
    # Only apply to the English portion (preserve Chinese text)
    # Split text into English and non-English segments
    # Regex to split English from Chinese segments
    _cn_seg_pat = re.compile('([一-鿿][一-鿿\\s，。、；：""''！？….,\\d-]*)')
    parts = _cn_seg_pat.split(text)

    result = []
    for part in parts:
        if not part:
            continue
        if re.search(r'[一-鿿]', part):
            # Chinese segment, keep as-is
            result.append(part)
        else:
            # English segment, apply wordninja
            en_text = part.strip()
            if en_text and len(en_text) > 1:
                try:
                    split_words = wordninja.split(en_text)
                    result.append(' '.join(split_words))
                except Exception:
                    result.append(en_text)
            else:
                result.append(en_text)

    text = ''.join(result)
    # Clean up extra spaces
    text = re.sub(r' +', ' ', text)
    # Fix spaces before punctuation
    text = re.sub(r' ([.?!,])', r'\1', text)
    # Fix spaces after opening parens
    text = re.sub(r'\( +', '(', text)
    text = re.sub(r' +\)', ')', text)

    # Post-process: fix common phrasal verbs that wordninja misses
    # These are frequent in the course material
    phrasal_fixes = [
        (r'\bcarryout\b', 'carry out'),
        (r'\btakeover\b', 'take over'),
        (r'\btookover\b', 'took over'),
        (r'\btakenover\b', 'taken over'),
        (r'\bhandin\b', 'hand in'),
        (r'\bhanded in\b', 'handed in'),
        (r'\bknockoff\b', 'knock off'),
        (r'\bcallout\b', 'call out'),
        (r'\bcalloff\b', 'call off'),
        (r'\bslackoff\b', 'slack off'),
        (r'\bworkout\b', 'work out'),
        (r'\bworked out\b', 'worked out'),
        (r'\bdra wup\b', 'draw up'),
        (r'\bbranchout\b', 'branch out'),
        (r'\bweighup\b', 'weigh up'),
        (r'\bfallthrough\b', 'fall through'),
        (r'\bfellthrough\b', 'fell through'),
        (r'\bwindup\b', 'wind up'),
        (r'\bgoover\b', 'go over'),
        (r'\bwentover\b', 'went over'),
        (r'\blookinto\b', 'look into'),
        (r'\btalkover\b', 'talk over'),
        (r'\btakeon\b', 'take on'),
        (r'\btookon\b', 'took on'),
        (r'\btakeoff\b', 'take off'),
        (r'\btakein\b', 'take in'),
        (r'\bgetacross\b', 'get across'),
        (r'\bgetdown to\b', 'get down to'),
        (r'\bgetbehind\b', 'get behind'),
        (r'\bgetinto\b', 'get into'),
        (r'\bgetover\b', 'get over'),
        (r'\bgetthrough\b', 'get through'),
        (r'\bwrapup\b', 'wrap up'),
        (r'\bsortout\b', 'sort out'),
        (r'\bchaseup\b', 'chase up'),
        (r'\bpileup\b', 'pile up'),
        (r'\bironout\b', 'iron out'),
        (r'\bpanout\b', 'pan out'),
        (r'\brolled out\b', 'rolled out'),
        (r'\brollout\b', 'roll out'),
        (r'\blineup\b', 'line up'),
        (r'\bbreakdown\b', 'break down'),
        (r'\bstandout\b', 'stand out'),
        (r'\bstoodout\b', 'stood out'),
        (r'\bnobrainer\b', 'no brainer'),
        (r'\bno b rainer\b', 'no brainer'),
        (r'\btome\b', 'to me'),
        (r'\bscaleup\b', 'scale up'),
        (r'\bholdoff\b', 'hold off'),
        (r'\bshrug off\b', 'shrug off'),
        (r'\bsignoff\b', 'sign off'),
        (r'\blayoff\b', 'lay off'),
        (r'\blayout\b', 'lay out'),
        (r'\bbuildup\b', 'build up'),
        (r'\bringup\b', 'bring up'),
        (r'\bbrought up\b', 'brought up'),
        (r'\bfollowup\b', 'follow up'),
        (r'\bbackup\b', 'back up'),
        (r'\bshut down\b', 'shut down'),
        (r'\bsetup\b', 'set up'),
        (r'\bcut off\b', 'cut off'),
        (r'\bphaseout\b', 'phase out'),
        (r'\bhammerout\b', 'hammer out'),
        (r'\bpulloff\b', 'pull off'),
        (r'\bpulled off\b', 'pulled off'),
        (r'\bfigureout\b', 'figure out'),
        (r'\bpointout\b', 'point out'),
        (r'\bfillout\b', 'fill out'),
        (r'\bfindout\b', 'find out'),
        (r'\bturnover\b', 'turn over'),
        (r'\brunthrough\b', 'run through'),
    ]
    for pattern, replacement in phrasal_fixes:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)

    return text.strip()


def has_cn(text):
    return bool(re.search(r'[一-鿿]', text))


def has_en(text):
    return bool(re.search(r'[A-Za-z]{3,}', text))


def cn_start_idx(line):
    """Return index where Chinese characters start, or None."""
    for i, ch in enumerate(line):
        if '一' <= ch <= '鿿':
            return i
    return None


def is_entry_header(line):
    """
    True if line starts a vocabulary entry.
    Pattern: SHORT English phrase (<= MAX_HEADER_EN_LEN chars before Chinese)
    followed by Chinese definition.
    """
    line = line.strip()
    if not line or not re.match(r'^[A-Za-z]', line):
        return False

    idx = cn_start_idx(line)
    if idx is None:
        return False

    en_part = line[:idx].strip().rstrip(':：').strip()

    # Too long -> likely a full sentence, not a phrase
    if len(en_part) > MAX_HEADER_EN_LEN:
        return False

    # Must have real English letters
    en_letters = re.sub(r'[^A-Za-z]', '', en_part)
    if len(en_letters) < 2:
        return False

    # If English part ends with period, it's a sentence
    if en_part.endswith('.'):
        return False

    # If the English part contains common sentence words (articles, pronouns),
    # it's more likely a sentence than a phrase header
    # Phrasal verbs typically don't start with "The", "I", "We", "You", etc.
    first_word = en_part.split()[0] if en_part.split() else en_part
    first_word = first_word.lower()
    sentence_starters = {'the', 'i', 'we', 'you', 'he', 'she', 'it', 'they',
                         'this', 'that', 'these', 'those', 'our', 'my', 'your',
                         'a', 'an', 'if', 'when', 'after', 'before', 'as', 'to'}
    if first_word in sentence_starters and len(en_letters) > 10:
        return False

    return True


def split_header(line):
    """Return (phrase_en, definition_zh) from a header line."""
    idx = cn_start_idx(line)
    if idx is None:
        return line, ""
    phrase = line[:idx].strip().rstrip(':：').strip()
    definition = line[idx:].strip()
    return fix_spacing(phrase), definition


SENTENCE_END_RE = re.compile(r'[。！？.!?)\]》」』"”’吧吗呢啊呀嘛啦哇哦啰]$')


def _is_complete_line(text):
    """
    A line is "complete" (self-contained example pair) if:
    - Has both EN and CN content
    - The English portion has meaningful length (not just a trailing word fragment)
    - Ends with sentence-ending punctuation
    """
    if not has_en(text) or not has_cn(text):
        return False

    # If the English portion before Chinese is just a word fragment,
    # the line is a continuation, not a complete pair.
    # E.g. "system.经理正在权衡..." -> EN part "system" is just the tail of previous line
    idx = cn_start_idx(text)
    if idx is not None and idx > 0:
        en_part = text[:idx].strip().rstrip('.').strip()
        en_letters = re.sub(r'[^A-Za-z]', '', en_part)
        # If English portion has fewer than 15 letters, it's likely a fragment
        if len(en_letters) < 15:
            return False

    if SENTENCE_END_RE.search(text):
        return True
    if re.match(r'^[a-z]', text):
        return False
    return False


def merge_content_lines(raw_lines):
    """
    Merge wrapped lines within an entry's content.
    Only merges when a line is clearly cut off mid-sentence.
    A self-contained example pair (EN+CN, starts capital, ends with punct)
    is NOT merged with its neighbors.
    """
    if not raw_lines:
        return []

    merged = []
    buffer = ""

    for line in raw_lines:
        line = line.strip()
        if not line:
            if buffer:
                merged.append(buffer)
                buffer = ""
            continue

        if not buffer:
            buffer = line
            continue

        # Never merge if current line is a scenario section header
        if _is_section_header(line):
            merged.append(buffer)
            buffer = line
            continue

        buf_complete = _is_complete_line(buffer)
        line_complete = _is_complete_line(line)
        buf_ends = bool(SENTENCE_END_RE.search(buffer))
        buf_is_cn_question = has_cn(buffer) and not has_en(buffer) and buffer.endswith('？')
        line_starts_lower = bool(re.match(r'^[a-z]', line))
        line_starts_cn = bool(re.match(r'^[一-鿿]', line))

        # Don't merge anything into a Chinese question (likely a section header)
        if buf_is_cn_question:
            merged.append(buffer)
            buffer = line
            continue

        # Don't merge Chinese-only buffer with a line that contains English
        # E.g. "强调某人愿意..." + "Don't be afraid to voice..." should not merge
        buf_cn_only = has_cn(buffer) and not has_en(buffer)
        if buf_cn_only and has_en(line):
            merged.append(buffer)
            buffer = line
            continue

        if buf_complete:
            merged.append(buffer)
            buffer = line
        elif line_complete:
            merged.append(buffer)
            buffer = line
        elif buf_ends and not line_starts_lower and not line_starts_cn:
            merged.append(buffer)
            buffer = line
        elif line_starts_lower:
            # Lowercase English continuation
            buffer += " " + line
        elif line_starts_cn and not has_en(buffer):
            # Chinese continuation of Chinese-only buffer
            buffer += line
        elif not buf_ends:
            # Buffer incomplete, merge
            buffer += line
        else:
            merged.append(buffer)
            buffer = line

    if buffer:
        merged.append(buffer)

    return merged


def parse_examples(content_lines):
    """
    Parse example pairs from entry content lines.
    Alternating pattern: English sentence, Chinese translation.
    """
    examples = []
    pending_en = ""

    for line in content_lines:
        line = line.strip()
        if not line:
            continue

        line_has_en = has_en(line)
        line_has_cn = has_cn(line)

        if line_has_en and line_has_cn:
            # Split mixed line at Chinese boundary
            idx = cn_start_idx(line)
            if idx is not None and idx > 0:
                en_part = line[:idx].strip().rstrip('.').strip()
                zh_part = line[idx:].strip()
                if len(re.sub(r'[^A-Za-z]', '', en_part)) >= 3:
                    examples.append({"en": fix_spacing(en_part), "zh": zh_part})
                else:
                    examples.append({"en": "", "zh": line})
            else:
                examples.append({"en": "", "zh": line})

        elif line_has_en and not line_has_cn:
            if pending_en:
                examples.append({"en": fix_spacing(pending_en), "zh": ""})
            pending_en = line

        elif line_has_cn and not line_has_en:
            if pending_en:
                examples.append({"en": fix_spacing(pending_en), "zh": line})
                pending_en = ""
            else:
                # Could be definition extension or standalone translation
                examples.append({"en": "", "zh": line})

    if pending_en:
        examples.append({"en": fix_spacing(pending_en), "zh": ""})

    # Clean
    cleaned = []
    for ex in examples:
        en = ex["en"].strip()
        zh = ex["zh"].strip()
        en = re.sub(r'\s*[（(][^)）]*[）)]', '', en).strip()
        if en or zh:
            cleaned.append({"en": en, "zh": zh})
    return cleaned


def parse_lesson(pages_text):
    """
    Parse vocabulary-style lesson.
    Phase 1: Split raw lines into entries based on headers.
    Phase 2: Within each entry, merge wrapped lines and parse examples.
    """
    content_pages = pages_text[1:-1] if len(pages_text) > 2 else pages_text[1:]

    # Collect raw lines
    raw_lines = []
    for page_text in content_pages:
        for line in page_text.split('\n'):
            line = line.strip()
            if line and line != "The end":
                raw_lines.append(line)

    # Phase 1: Group raw lines into entries
    entry_groups = []  # list of (header_line, [content_lines])
    current_header = None
    current_content = []

    for line in raw_lines:
        if is_entry_header(line):
            if current_header is not None:
                entry_groups.append((current_header, current_content))
            current_header = line
            current_content = []
        else:
            if current_header is not None:
                current_content.append(line)

    # Last entry
    if current_header is not None:
        entry_groups.append((current_header, current_content))

    # Phase 2: Process each entry group
    entries = []
    for header_line, content_lines in entry_groups:
        phrase, definition = split_header(header_line)

        # Split definition from first example(s)
        # The definition from the header line might include the first example
        # if it was on the same line. Let's check:
        # "进行；开展；执行Thebuildingwork..." -> definition may have leaked example

        # Try to separate: if definition contains an English sentence followed by Chinese,
        # split it into (clean_definition, first_example_pair)
        clean_def = definition
        extra_examples = []

        if has_en(definition):
            # Definition contains English text - likely a leaked example
            idx = cn_start_idx(definition)
            if idx is not None and idx > 0:
                # The first part before Chinese is definition
                def_part = definition[:idx].strip()
                rest = definition[idx:].strip()

                # But wait, the definition might start with Chinese, then have English
                # Let's find the first Chinese character
                first_cn = cn_start_idx(definition)
                if first_cn == 0:
                    # Definition starts with Chinese - find where English example starts
                    # after the Chinese definition
                    # Pattern: Chinese definition then English example
                    en_match = re.search(r'([A-Z][A-Za-z].*?)([一-鿿])', definition)
                    if en_match:
                        en_part = definition[en_match.start():en_match.start(2)]
                        cn_after = definition[en_match.start(2):]
                        # Check if there's Chinese before the English
                        cn_before = definition[:en_match.start()]
                        if cn_before and has_cn(cn_before) and not has_en(cn_before):
                            clean_def = cn_before.strip()
                            extra_examples.append({"en": fix_spacing(en_part.strip()), "zh": cn_after.strip()})
                else:
                    # Definition part is from start to first Chinese
                    # Rest might be example
                    cn_idx_in_def = cn_start_idx(definition)
                    if cn_idx_in_def and cn_idx_in_def < len(definition):
                        # Check character after definition
                        rest_text = definition[cn_idx_in_def:]
                        # If it looks like an example (has mixed EN/CN pattern)
                        if has_en(rest_text):
                            # Split: Chinese def then leaked example
                            # Find transition from Chinese to English
                            trans = re.search(r'([。；])([A-Z])', definition)
                            if trans:
                                clean_def = definition[:trans.start()+1].strip()
                                leaked = definition[trans.start()+1:].strip()
                                # Parse the leaked part as example(s)
                                examples_from_def = parse_examples(
                                    merge_content_lines(leaked.split('\n')))
                                extra_examples.extend(examples_from_def)
                            else:
                                clean_def = definition
                        else:
                            clean_def = definition

        # Merge and parse content lines
        merged_content = merge_content_lines(content_lines)

        # If first merged line is Chinese-only (no English), it's likely a
        # definition extension, not an example.
        # E.g. "它通常表示进入新的领域或市场并取得成功" → append to definition
        while merged_content and has_cn(merged_content[0]) and not has_en(merged_content[0]):
            clean_def += "；" + merged_content[0]
            merged_content = merged_content[1:]

        examples = parse_examples(merged_content)

        # Prepend any examples extracted from the definition
        all_examples = extra_examples + examples

        entries.append({
            "phrase": phrase,
            "definition_zh": clean_def,
            "examples": all_examples
        })

    # Post-process: remove fragment entries
    entries = remove_fragments(entries)

    return entries


def remove_fragments(entries):
    """
    Remove entries that are clearly not real vocabulary items.
    A fragment has: empty definition, no examples, or phrase is too long
    to be a real phrasal verb.
    """
    result = []
    for entry in entries:
        phrase = entry["phrase"]
        definition = entry["definition_zh"]
        examples = entry["examples"]

        # Skip entries with empty everything
        if not definition and not examples:
            continue

        # Skip entries where phrase is clearly a full sentence
        en_letters = re.sub(r'[^A-Za-z]', '', phrase)
        if len(en_letters) > 30 and not definition:
            continue

        # Skip single-word entries that look like English words misdetected
        # from example sentences (e.g., "The" as a phrase)
        if len(en_letters) < 3 and not definition and not examples:
            continue

        result.append(entry)

    return result


def _is_section_header(line):
    """True if a merged line is a top-level scenario section header.
    These start with common question-introducing phrases and are pure Chinese questions."""
    return (has_cn(line) and not has_en(line) and
            re.match(r'^(如何在|职场中如何|工作中如何|怎么|如何有效)', line) and
            '？' in line and
            len(line) >= 8 and len(line) <= 50)


def parse_scenario_lesson(pages_text):
    """Parse scenario-based lessons with topic sections."""
    content_pages = pages_text[1:-1] if len(pages_text) > 2 else pages_text[1:]

    raw_lines = []
    for page_text in content_pages:
        for line in page_text.split('\n'):
            line = line.strip()
            if line and line != "The end":
                raw_lines.append(line)

    # Step 1: Merge wrapped lines (section headers are protected from merging)
    merged = merge_content_lines(raw_lines)

    # Step 2: Group into sections
    sections = []
    current_title = ""
    current_items = []

    for line in merged:
        if _is_section_header(line):
            if current_title or current_items:
                sections.append({"title": current_title, "items": current_items})
            current_title = line
            current_items = []
        else:
            if has_en(line) and has_cn(line):
                idx = cn_start_idx(line)
                if idx:
                    en = line[:idx].strip().rstrip('.').strip()
                    zh = line[idx:].strip()
                    current_items.append({"en": fix_spacing(en), "zh": zh})
                else:
                    current_items.append({"en": "", "zh": line})
            elif has_en(line):
                current_items.append({"en": fix_spacing(line), "zh": ""})
            elif has_cn(line):
                current_items.append({"en": "", "zh": line})

    if current_title or current_items:
        sections.append({"title": current_title, "items": current_items})

    return sections


def extract_raw_text(pdf_path):
    pages_text = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                pages_text.append(text)
    return pages_text


def detect_lesson_type(pages_text):
    """Determine if lesson is scenario-based."""
    if len(pages_text) < 2:
        return "vocabulary"
    content = pages_text[1]
    first_line = content.split('\n')[0].strip() if content else ""
    if has_cn(first_line) and ('？' in first_line or '?' in first_line) and not has_en(first_line):
        return "scenario"
    lines = content.split('\n')
    header_count = sum(1 for l in lines if is_entry_header(l.strip()))
    if header_count < 2 and len(lines) > 15:
        return "scenario"
    return "vocabulary"


def process_all_pdfs():
    pdf_files = sorted(glob.glob(os.path.join(PDF_DIR, "*.pdf")))
    all_lessons = []

    for pdf_path in pdf_files:
        lesson_num = get_lesson_number(pdf_path)
        basename = os.path.basename(pdf_path)
        print(f"Processing Lesson {lesson_num}: {basename}")

        pages_text = extract_raw_text(pdf_path)
        lesson_title = pages_text[0].strip().replace('\n', ' ') if pages_text else ""
        lesson_type = detect_lesson_type(pages_text)

        if lesson_type == "scenario":
            sections = parse_scenario_lesson(pages_text)
            lesson_data = {
                "lesson": lesson_num,
                "title": lesson_title,
                "type": "scenario",
                "sections": sections
            }
            item_count = sum(len(s.get("items", [])) for s in sections)
            print(f"  -> {len(sections)} sections, {item_count} expressions")
        else:
            entries = parse_lesson(pages_text)
            lesson_data = {
                "lesson": lesson_num,
                "title": lesson_title,
                "type": "vocabulary",
                "total_phrases": len(entries),
                "phrases": entries
            }
            print(f"  -> {len(entries)} phrases")

        all_lessons.append(lesson_data)

    all_lessons.sort(key=lambda x: x["lesson"])

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_lessons, f, ensure_ascii=False, indent=2)

    total = 0
    for l in all_lessons:
        if l["type"] == "vocabulary":
            total += l.get("total_phrases", 0)
        else:
            total += sum(len(s.get("items", [])) for s in l.get("sections", []))

    print(f"\n✅ {total} items from {len(all_lessons)} lessons -> {OUTPUT_FILE}")
    return all_lessons


if __name__ == "__main__":
    process_all_pdfs()
