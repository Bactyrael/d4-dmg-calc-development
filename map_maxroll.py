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

def escape_quotes(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

def sanitize_desc(desc):
    return desc.replace('\r\n', '\\n').replace('\n', '\\n')

injected_skills = 0
injected_mods = 0

for skill_name, mr_skill in mr_skills.items():
    pattern = r'([\"\'\s]name[\"\']:\s*[\"\']' + re.escape(mr_skill.get('name', '')) + r'[\"\'],\s*\n)'
    match = re.search(pattern, js_content, re.IGNORECASE)
    if match:
        desc = sanitize_desc(mr_skill.get('desc', ''))
        injection = f'        description: "{escape_quotes(desc)}",\n'
        
        if not re.search(r'description:\s*[\"\'].*?[\"\']', js_content[match.end():match.end()+200]):
            js_content = js_content[:match.end()] + injection + js_content[match.end():]
            injected_skills += 1
        
for mod_name, mod in mr_mods.items():
    pattern = r'([\"\'\s]name[\"\']:\s*[\"\']' + re.escape(mod.get('name', '')) + r'[\"\'],\s*\n)'
    match = re.search(pattern, js_content, re.IGNORECASE)
    if match:
        desc = sanitize_desc(mod.get('desc', ''))
        injection = f'            description: "{escape_quotes(desc)}",\n'
        
        if not re.search(r'description:\s*[\"\'].*?[\"\']', js_content[match.end():match.end()+200]):
            js_content = js_content[:match.end()] + injection + js_content[match.end():]
            injected_mods += 1

with open('assets/skills.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Injected descriptions into {injected_skills} base skills and {injected_mods} modifiers/upgrades.")
