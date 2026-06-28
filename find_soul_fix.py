import re
with open('assets/skills.js', 'r', encoding='utf-8') as f:
    s = f.read()
m = re.findall(r"name:\s*['\"]([^'\"]+)['\"]", s)
print([x for x in m if 'soul' in x.lower()])
