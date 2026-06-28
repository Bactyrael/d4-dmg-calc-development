import json

with open('maxroll_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

skills = data.get('skills', {})
bone_spear = None
enhanced_bone_spear = None

for k, v in skills.items():
    if v.get('name') == 'Bone Spear':
        bone_spear = v
    elif v.get('name') == 'Enhanced Bone Spear':
        enhanced_bone_spear = v

print("Bone Spear:", json.dumps(bone_spear, indent=2))
print("Enhanced Bone Spear:", json.dumps(enhanced_bone_spear, indent=2))
