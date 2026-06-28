import json
import re

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

with open('maxroll_data.json', 'r', encoding='utf-8') as f:
    maxroll = json.load(f)

mr_skills = {}

for k, v in maxroll.get('skills', {}).items():
    if v.get('class') == 4: # Necromancer
        mr_skills[v.get('name', '').lower().strip()] = v

injected = 0

for skill_name, mr_skill in mr_skills.items():
    pattern = r'([\"\'\s]name[\"\']:\s*[\"\']' + re.escape(mr_skill.get('name', '')) + r'[\"\'],\s*\n)'
    match = re.search(pattern, js_content, re.IGNORECASE)
    if match:
        injection = ""
        
        # Parse damage scalar
        payloads = mr_skill.get('payloads', [])
        if isinstance(payloads, list) and len(payloads) > 0 and isinstance(payloads[0], dict) and 'damage' in payloads[0] and isinstance(payloads[0]['damage'], dict) and 'scalar' in payloads[0]['damage']:
            scalar_str = str(payloads[0]['damage']['scalar'])
            scalar_match = re.search(r'([\d\.]+)\*Table', scalar_str)
            if scalar_match:
                injection += f'        baseDamageScalar: {scalar_match.group(1)},\n'
            elif scalar_str.replace('.','',1).isdigit():
                injection += f'        baseDamageScalar: {scalar_str},\n'
        
        # Parse resource cost
        cost = mr_skill.get('cost', [])
        if isinstance(cost, list) and len(cost) > 0 and isinstance(cost[0], dict) and 'cost' in cost[0]:
            cost_str = str(cost[0]['cost'])
            cost_match = re.search(r':(\d+)$', cost_str)
            if cost_match:
                cost_val = cost_match.group(1)
            elif cost_str.isdigit():
                cost_val = cost_str
            else:
                cost_val = re.sub(r'Mod.*?(\d+)$', r'\1', cost_str)
                cost_val = re.sub(r'[^\d]', '', cost_val)
                
            if cost_val:
                injection += f'        resourceCost: {cost_val},\n'
                
        # Parse cooldown
        cd = mr_skill.get('cooldown', [])
        if isinstance(cd, list) and len(cd) > 0 and isinstance(cd[0], dict) and 'cooldown' in cd[0]:
            cd_str = str(cd[0]['cooldown'])
            cd_match = re.search(r':([\d\.]+)$', cd_str)
            if cd_match:
                cd_val = cd_match.group(1)
            elif cd_str.replace('.','',1).isdigit():
                cd_val = cd_str
            else:
                cd_val = re.sub(r'[^\d\.]', '', cd_str)
                
            if cd_val:
                injection += f'        cooldown: {cd_val},\n'
        
        if injection and not re.search(r'baseDamageScalar:', js_content[match.end():match.end()+300]):
            js_content = js_content[:match.end()] + injection + js_content[match.end():]
            injected += 1

with open('assets/skills.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Injected baseDamage/costs into {injected} base skills.")
