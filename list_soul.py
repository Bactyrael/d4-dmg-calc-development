import re
with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js = f.read()
matches = re.findall(r"name:\s*['\"]([^'\"]+)['\"]", js)
print([m for m in matches if 'soul' in m.lower()])
