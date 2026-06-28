import json
import re

with open('maxroll_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

items = data.get('items', {})
runes = [i for i in items.values() if i.get('type') in ('ConditionRune', 'EffectRune')]

parsed_runes = []

for r in runes:
    name = r.get('name', 'Unknown')
    rune_type = 'Condition' if r.get('type') == 'ConditionRune' else 'Effect'
    rune_data = r.get('rune', {})
    
    desc = rune_data.get('desc', '')
    # Strip {c_xyz}...{/c}
    desc = re.sub(r'\{c_[^}]+\}', '', desc)
    desc = re.sub(r'\{/c\}', '', desc)
    # Strip {u}..{/u}
    desc = re.sub(r'\{u\}', '', desc)
    desc = re.sub(r'\{/u\}', '', desc)
    
    # Sometimes it has dynamic values like {c_number}{s1}{/c} or similar.
    # We will just leave them for now or replace {s1} with dynamicValue.
    dynamic = rune_data.get('dynamicValue', 0)
    desc = desc.replace('{s1}', str(dynamic))
    
    parsed = {
        'name': name,
        'type': rune_type,
        'description': desc.strip(),
        'offering': rune_data.get('value', 0)
    }
    parsed_runes.append(parsed)

# Sort alphabetically by type and name
parsed_runes.sort(key=lambda x: (x['type'], x['name']))

# Read database.js
with open('assets/database.js', 'r', encoding='utf-8') as f:
    db_text = f.read()

# Insert before the last "};\n"
match = re.search(r'    "Spiritborn": \{\s*"equipment": \{\}\s*\}\s*\}\s*\}\s*;?\s*$', db_text)
if match:
    # Append runes array
    runes_json = json.dumps(parsed_runes, indent=4)
    # We need to insert it at the root of window.D4_DATABASE.
    # Actually, D4_DATABASE is just defined as `window.D4_DATABASE = { ... }`
    # We can just append `window.D4_DATABASE.runes = [...]` to the end of the file!
    db_text += f'\nwindow.D4_DATABASE.runes = {runes_json};\n'
    
    with open('assets/database.js', 'w', encoding='utf-8') as f:
        f.write(db_text)
    print(f"Added {len(parsed_runes)} runes to database.js")
else:
    # If the regex fails, just append anyway
    runes_json = json.dumps(parsed_runes, indent=4)
    db_text += f'\nwindow.D4_DATABASE.runes = {runes_json};\n'
    with open('assets/database.js', 'w', encoding='utf-8') as f:
        f.write(db_text)
    print(f"Appended {len(parsed_runes)} runes to the very end of database.js")
