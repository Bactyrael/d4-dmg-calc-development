import json
import re

with open('assets/database.js', 'r', encoding='utf-8') as f:
    content = f.read()

def replace_armor(item_class, new_armor):
    global content
    pattern = r'("' + item_class + r'":\s*\[.*?\])'
    def repl(m):
        return re.sub(r'"armor":\s*\d+', f'"armor": {new_armor}', m.group(1))
    content = re.sub(pattern, repl, content, flags=re.DOTALL)

replace_armor('Helm', 1509)
replace_armor('Chest Armor', 2805)
replace_armor('Gloves', 801)
replace_armor('Boots', 801)
replace_armor('Pants', 2004)

with open('assets/database.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done fixing armor!')
