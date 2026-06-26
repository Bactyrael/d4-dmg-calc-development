import json
import re

with open('assets/database.js', 'r', encoding='utf-8') as f:
    content = f.read()

# We can find the global variable window.D4_DATABASE.itemDatabase
# But let's just do a string replace for now

content = re.sub(r'(\"Amulet\": \[.*?\])', lambda m: re.sub(r'(\"rarity\":\s*\"[^\"]+\"(?:,\s*\"classes\":\s*\[.*?\])?)', r'\1, "resistance": 230', m.group(1), flags=re.DOTALL), content, flags=re.DOTALL)
content = re.sub(r'(\"Ring\": \[.*?\])', lambda m: re.sub(r'(\"rarity\":\s*\"[^\"]+\"(?:,\s*\"classes\":\s*\[.*?\])?)', r'\1, "resistance": 173', m.group(1), flags=re.DOTALL), content, flags=re.DOTALL)

with open('assets/database.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done python!')
