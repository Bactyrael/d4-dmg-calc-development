import json
import re

updates = {
    "Pins and Needles": {"baseDamageScalar": 0.60},
    "You And What Army?": {"baseDamageScalar": 0.20},
    "Bloodbath": {"baseDamageScalar": 1.0},
    "Shrapnel": {"baseDamageScalar": 1.0},
    "Service and Sacrifice": {"baseDamageScalar": 1.50},
    "Poltergeists": {"baseDamageScalar": 0.30},
    "Astral Projection": {"baseDamageScalar": 1.0},
    "Fel Gluttony": {"baseDamageScalar": 3.0},
    "Jaws Of Death": {"baseDamageScalar": 1.0, "damageScalePerLevel": 0.25, "damageScalePerFive": 0.50},
    "Blood Maiden": {"baseDamageScalar": 1.50},
    "Soul Vortex": {"baseDamageScalar": 0.25},
    "Frozen Wasteland": {"baseDamageScalar": 0.75},
    "Shadow And Bone": {"baseDamageScalar": 0.40},
    "Dead Cold": {"baseDamageScalar": 1.50},
    "Hematolagnia": {"baseDamageScalar": 3.0},
    "Tides of Blood": {"baseDamageScalar": 5.0}
}

with open('assets/skills.js', encoding='utf-8') as f:
    js_text = f.read()

# Fix for Dead Cold which is named 'Dead Cold' in Maxroll but the user called it 'dead and cold'. My script used 'Dead Cold'.

js_json_text = js_text[js_text.find('{'):js_text.rfind('}')+1]
js_json_text = re.sub(r'//.*', '', js_json_text)

db = json.loads(js_json_text)

for cat, skills in db.items():
    for skill in skills:
        if 'modifiers' in skill:
            for mod in skill['modifiers']:
                if mod['name'] in updates:
                    for k, v in updates[mod['name']].items():
                        mod[k] = v

with open('assets/skills.js', 'w', encoding='utf-8') as f:
    f.write('const skillsDatabase = ' + json.dumps(db, indent=2) + ';\nif (typeof window !== "undefined") window.skillsDatabase = skillsDatabase;\n')

print("Patch applied successfully.")
