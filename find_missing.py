import json

with open('./assets/skills.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Very hacky parsing to get the json out of the js file
json_str = code[code.find('{'):code.rfind('}')+1]
try:
    data = json.loads(json_str)
    for class_name, class_data in data.get('classData', {}).items():
        if class_name == 'Necromancer':
            for skill in class_data.get('skills', {}).get('Basic', []):
                for mod in skill.get('modifiers', []):
                    if '(' not in mod.get('name', ''):
                        print(f"Needs suffix: {mod['name']} -> {mod['name']} ({skill['name']})")
except Exception as e:
    print('Error:', e)
