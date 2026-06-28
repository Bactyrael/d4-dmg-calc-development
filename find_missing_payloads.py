import json
import re

with open('assets/skills.js', encoding='utf-8') as f:
    js_text = f.read()

# Hacky extract of JSON from JS
js_json_text = js_text[js_text.find('{'):js_text.rfind('}')+1]
js_json_text = re.sub(r'//.*', '', js_json_text)
# fix trailing commas if any, but skills.js is likely clean since it was JSON stringified
try:
    skills_db = json.loads(js_json_text)
except Exception as e:
    print("JSON Decode Error:", e)
    skills_db = None

with open('maxroll_data.json', encoding='utf-8') as f:
    maxroll = json.load(f)

mr_skills = maxroll.get('skills', {})

missing = []

if skills_db:
    for cat, skills in skills_db.items():
        for skill in skills:
            # find corresponding maxroll skill
            mr_s = next((s for s in mr_skills.values() if s.get('name') == skill['name']), None)
            if not mr_s:
                continue
            
            mr_payloads = mr_s.get('payloads', [])
            damage_scalars = []
            for p in mr_payloads:
                if 'damage' in p and 'scalar' in p['damage']:
                    # Extract the scalar math
                    damage_scalars.append(str(p['damage']['scalar']))
            
            # If the skill has modifiers
            if 'modifiers' in skill:
                for mod in skill['modifiers']:
                    desc = mod.get('description', '')
                    if '{payload:' in desc and 'baseDamageScalar' not in mod:
                        # Modifier expects a payload but lacks its own scalar.
                        # Does the parent have multiple payloads indicating hidden math?
                        missing.append({
                            'parent': skill['name'],
                            'modifier': mod['name'],
                            'parent_payloads': damage_scalars,
                            'desc_snippet': re.search(r'\{payload:[^}]+\}', desc).group(0) if re.search(r'\{payload:[^}]+\}', desc) else ''
                        })

for m in missing:
    print(f"Parent: {m['parent']} | Mod: {m['modifier']} | Snippet: {m['desc_snippet']}")
    print(f"  Parent Payloads: {m['parent_payloads']}")
    print("-" * 50)
