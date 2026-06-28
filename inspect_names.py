import re

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

names = re.findall(r'[\"\']name[\"\']:\s*[\"\'](.*?)[\"\']', js_content)
print(names[:20])
