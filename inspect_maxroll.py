import json

with open('maxroll_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("Top level keys:", list(data.keys()))
if 'skills' in data:
    skills = data['skills']
    print(f"Total skills: {len(skills)}")
    # Find Bone Spear
    bone_spear = None
    for k, v in skills.items():
        if v.get('name', '') == 'Bone Spear':
            bone_spear = v
            break
            
    if bone_spear:
        print("Bone Spear:", json.dumps(bone_spear, indent=2)[:500])
    else:
        print("Bone Spear not found in skills.")
elif 'Power' in data:
    # maybe it's named 'Power' or 'skill'
    pass
