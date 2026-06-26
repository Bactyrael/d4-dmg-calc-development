import json

with open('assets/database.js', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('{')
end_idx = text.rfind(';')
if end_idx == -1: end_idx = len(text)
else: end_idx = text.rfind('}', 0, end_idx) + 1

json_str = text[start_idx:end_idx]

db = json.loads(json_str)

armors = {
    'Helm': 1603
}

for k, val in armors.items():
    if k in db.get('itemDatabase', {}):
        for item in db['itemDatabase'][k]:
            if 'armor' in item:
                item['armor'] = val

new_json = json.dumps(db, indent=2)
new_text = text[:start_idx] + new_json + text[end_idx:]

with open('assets/database.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

print('Successfully restored helm armor!')
