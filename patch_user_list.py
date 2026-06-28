import json
import sys

# The user provided list string
user_input = sys.argv[1]

# Parse it
parts = [p.strip().strip('.') for p in user_input.split(',')]
skill_name = parts[0]
modifier_names_lower = [p.lower() for p in parts[1:]]

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js_text = f.read()

json_str = js_text.replace('const skillsDatabase = ', '').strip().rstrip(';')
db = json.loads(json_str)

found = False
for cat, skills in db.items():
    for skill in skills:
        if skill['name'].lower() == skill_name.lower():
            if 'modifiers' in skill:
                # Reorder modifiers based on user_input matching
                new_mods = []
                for desired in modifier_names_lower:
                    # Find matching mod
                    match = next((m for m in skill['modifiers'] if m['name'].lower() == desired), None)
                    if match:
                        new_mods.append(match)
                    else:
                        # Fallback if name slightly mismatches
                        match_partial = next((m for m in skill['modifiers'] if desired in m['name'].lower() or m['name'].lower() in desired), None)
                        if match_partial:
                            new_mods.append(match_partial)
                        else:
                            # Create generic if completely missing
                            new_mods.append({'name': desired.title(), 'maxRank': 1})
                
                # Append any remaining that weren't matched just in case (though shouldn't happen if they provide 7)
                for m in skill['modifiers']:
                    if m not in new_mods:
                        new_mods.append(m)
                        
                skill['modifiers'] = new_mods
                found = True
                break
    if found:
        break

if found:
    out = 'const skillsDatabase = ' + json.dumps(db, indent=2) + ';\n'
    with open('assets/skills.js', 'w', encoding='utf-8') as f:
        f.write(out)
    print(f"Successfully reordered {skill_name}")
else:
    print(f"Could not find skill {skill_name}")
