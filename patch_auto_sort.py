import json

maxroll = json.load(open('maxroll_data.json', encoding='utf-8'))
nodes = maxroll['skillTrees']['Necromancer']['nodes']

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    skills_js = f.read()
    
# Extract JSON from skills.js
json_str = skills_js.replace('const skillsDatabase = ', '')
if json_str.endswith(';\n'): json_str = json_str[:-2]
if json_str.endswith(';'): json_str = json_str[:-1]
db = json.loads(json_str)

for cat, skills in db.items():
    for skill in skills:
        name = skill['name']
        key = "Necromancer_" + name.replace(" ", "")
        
        if key not in maxroll['skills']:
            continue
            
        mods = maxroll['skills'][key].get('mods', [])
        if not mods:
            continue
            
        mod_ids = {m['id']: m['name'] for m in mods}
        
        # Find exactly 7 nodes for this skill in the graph
        # Since the graph duplicates nodes for different starting points, we just need ONE set of 7 unique modifiers
        # We can group all nodes in the graph by their mod ID.
        skill_nodes = {}
        for n in nodes:
            mid = n.get('reward', {}).get('mod')
            if mid in mod_ids:
                if mid not in skill_nodes:
                    skill_nodes[mid] = []
                skill_nodes[mid].append(n)
                
        if len(skill_nodes) != 7:
            # Some skills (like Soulrift) might not have 7 mapped in maxroll
            continue
            
        # To avoid duplication issues, pick one cluster by picking the first instance of each
        # Actually, let's just use the first instance's X/Y for relative sorting, assuming the geometry is identical
        sorted_mods = []
        for mid in mod_ids:
            # get the first node
            n = skill_nodes[mid][0]
            sorted_mods.append({
                'name': mod_ids[mid],
                'x': n['pos']['x'],
                'y': n['pos']['y']
            })
            
        # Group by Y (rounded to nearest 10 to handle floating point fuzziness)
        groups = {}
        for sm in sorted_mods:
            y_round = round(sm['y'] / 10) * 10
            if y_round not in groups:
                groups[y_round] = []
            groups[y_round].append(sm)
            
        diamonds = []
        pairs = []
        
        for y, group in groups.items():
            if len(group) == 1:
                diamonds.extend(group)
            else:
                pairs.append(group)
                
        if len(diamonds) == 3 and len(pairs) == 2:
            # Sort diamonds by descending Y (from -5800 towards -6600)
            diamonds = sorted(diamonds, key=lambda x: x['y'], reverse=True)
            
            # Sort pairs by descending Y
            pairs = sorted(pairs, key=lambda p: p[0]['y'], reverse=True)
            
            # Within pairs, sort by X
            circles_row2 = sorted(pairs[0], key=lambda x: x['x'])
            circles_row3 = sorted(pairs[1], key=lambda x: x['x'])
            
            final_order = diamonds + circles_row2 + circles_row3
            final_names = [f['name'] for f in final_order]
            
            # Reorder in db
            if 'modifiers' in skill:
                skill['modifiers'].sort(key=lambda x: final_names.index(x['name']) if x['name'] in final_names else 999)

out = 'const skillsDatabase = ' + json.dumps(db, indent=2) + ';\n'
with open('assets/skills.js', 'w', encoding='utf-8') as f:
    f.write(out)
    
print("Successfully auto-sorted all skills using geometric heuristic!")
