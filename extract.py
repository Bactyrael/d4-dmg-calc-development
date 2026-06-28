import re
with open(r'C:\Users\rcmil\.gemini\antigravity\brain\1f73c3b5-9d8f-4b09-973c-6e8e35084095\.system_generated\steps\9210\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

import json
# Look for the maxroll JSON state
match = re.search(r'window\.__remixContext = (.*?);</script>', text)
if match:
    data = json.loads(match.group(1))
    print("Found JSON data")
    # let's just dump the text
    clean_text = re.sub(r'<[^>]+>', ' ', text)
    idx = clean_text.find('Armor Damage Reduction')
    if idx == -1:
        idx = clean_text.find('Damage Reduction Formula')
    if idx == -1:
        idx = clean_text.find('Armor')
    print(clean_text[max(0, idx-100):idx+500])
