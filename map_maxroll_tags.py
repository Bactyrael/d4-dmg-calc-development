import json
import re

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

with open('maxroll_data.json', 'r', encoding='utf-8') as f:
    maxroll = json.load(f)

mr_skills = {}
mr_mods = {}

for k, v in maxroll.get('skills', {}).items():
    if v.get('class') == 4: # Necromancer
        mr_skills[v.get('name', '').lower().strip()] = v
        for mod in v.get('mods', []):
            mr_mods[mod.get('name', '').lower().strip()] = mod

injected_skills = 0
injected_mods = 0

for skill_name, mr_skill in mr_skills.items():
    pattern = r'([\"\'\s]name[\"\']:\s*[\"\']' + re.escape(mr_skill.get('name', '')) + r'[\"\'],\s*\n)'
    match = re.search(pattern, js_content, re.IGNORECASE)
    if match:
        tags = mr_skill.get('tags', [])
        primary = mr_skill.get('primaryTag')
        if primary and primary not in tags:
            tags.append(primary)
            
        if tags:
            tags_json = json.dumps(tags)
            injection = f'        tags: {tags_json},\n'
            
            if not re.search(r'tags:\s*\[', js_content[match.end():match.end()+400]):
                js_content = js_content[:match.end()] + injection + js_content[match.end():]
                injected_skills += 1
                
for mod_name, mod in mr_mods.items():
    pattern = r'([\"\'\s]name[\"\']:\s*[\"\']' + re.escape(mod.get('name', '')) + r'[\"\'],\s*\n)'
    match = re.search(pattern, js_content, re.IGNORECASE)
    if match:
        tags = mod.get('tags', [])
        if tags:
            tags_json = json.dumps(tags)
            injection = f'            tags: {tags_json},\n'
            
            if not re.search(r'tags:\s*\[', js_content[match.end():match.end()+400]):
                js_content = js_content[:match.end()] + injection + js_content[match.end():]
                injected_mods += 1

with open('assets/skills.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Injected tags into {injected_skills} base skills and {injected_mods} modifiers.")
