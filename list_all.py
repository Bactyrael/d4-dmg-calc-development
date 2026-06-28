import re
with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js = f.read()
m = re.findall(r"name:\s*['\"]([^'\"]+)['\"]", js)
print(m)
