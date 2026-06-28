import re
with open(r'C:\Users\rcmil\.gemini\antigravity\brain\1f73c3b5-9d8f-4b09-973c-6e8e35084095\.system_generated\steps\9210\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

clean_text = re.sub(r'<[^>]+>', ' ', text)
clean_text = re.sub(r'\s+', ' ', clean_text)
idx = clean_text.find('It\'s important to remember the "1" in the multiplicative bucket')
if idx != -1:
    print(clean_text[idx:idx+3000])
