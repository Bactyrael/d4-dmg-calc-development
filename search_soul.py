import re
with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js = f.read()
matches = re.findall(r"name:\s*['\"]([^'\"]*soul[^'\"]*)['\"]", js, re.I)
print(list(set(matches)))
