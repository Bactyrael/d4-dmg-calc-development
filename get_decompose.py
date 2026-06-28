import re

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    s = f.read()

match = re.search(r'name:\s*[\'"]Decompose[\'"][\s\S]*?description:\s*[\'"]([\s\S]*?)[\'"]', s)
if match:
    print(match.group(1))
else:
    print("Not found")
