import json
import re

with open("parsed_seals.json", "r", encoding="utf-16") as f:
    class_sets = json.load(f)

generic_normal = {
    "Vigorous": "[6.5 - 8.0]% Maximum Life",
    "Swift": "[7.5 - 10.0]% Cooldown Reduction",
    "Keen": "+[8.0 - 10.0]% Attack Speed",
    "Adept": "+[7.5 - 10.0]% Critical Strike Chance",
    "Ferocious": "[12.0 - 20.0]% [x] Damage",
    "Stalwart's": "+[7.5 - 10.0]% Total Armor",
    "Resistant": "+[7.5 - 10.0]% Resistance to All Elements",
    "Efficient": "[7.5 - 10.0]% Resource Cost Reduction",
    "Resourceful": "+[15 - 20] Maximum Resource",
    "Astute": "+[7.5 - 10.0]% Intelligence",
    "Harmonious": "+[6.0 - 8.0]% All Stats"
}

known_values = {
    "of Brawn": "+[6.5 - 8.0] Maximum Life",
    "of Proficiency": "+[6.0 - 8.0] All Stats",
    "of Luck": "+[8.0 - 9.0] Lucky Hit Chance",
    "of Elements": "+[7.0 - 10.0] Non-Physical Damage",
    "of Reapers": "+[7.0 - 10.0]% [x] Ultimate Skill Damage",
    "of the Fleet Footed": "+[20 - 24]% Movement Speed for 4 Seconds After Killing an Elite",
    "of Glory": "+1 Charm Slot",
    "of Technique": "+[2 - 10]% Bonus Kill Experience ([0.2 - 1.0]% at level 70)"
}

def clean_stat(s):
    s = s.replace("++", "+")
    s = s.replace("<b>", "")
    s = s.replace("</b>", "")
    return s

all_modifiers = {}
class_names = ["Barbarian", "Druid", "Necromancer", "Rogue", "Sorcerer", "Spiritborn"]

for cls in class_names:
    mods = []
    
    # Generic Normal
    for k, v in generic_normal.items():
        html_name = f"<div style=\\'color:#6879d1;\\'>{k}</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>{v}</div>"
        mods.append(f"""            {{
              "name": "{k}: {v}",
              "shortName": "{v}",
              "htmlName": "{html_name}",
              "category": "Utility"
            }}""")
            
    # Generic Sets
    for s_name, affixes in class_sets.get("Generic", {}).items():
        for k, original_v in affixes.items():
            v = clean_stat(original_v)
            finalVal = known_values.get(k, v)
            html_name = f"<div style=\\'color:#ff8500;\\'>{k}</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>{finalVal}</div>"
            mods.append(f"""            {{
              "name": "{k}: {finalVal}",
              "shortName": "{finalVal}",
              "htmlName": "{html_name}",
              "category": "Utility"
            }}""")
            
    # Class Sets
    for s_name, affixes in class_sets.get(cls, {}).items():
        for k, original_v in affixes.items():
            v = clean_stat(original_v)
            html_name = f"<div style=\\'color:#ff8500;\\'>{k}</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>{v}</div>"
            mods.append(f"""            {{
              "name": "{k}: {v}",
              "shortName": "{v}",
              "htmlName": "{html_name}",
              "category": "Utility"
            }}""")
            
    seal_json = ",\n".join(mods)
    all_modifiers[cls] = f"""
        "seal": {{
          "modifiers": [
{seal_json}
          ]
        }},"""

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

for cls in class_names:
    # Match the start of the class equipment object
    pattern = re.compile(rf'("{cls}":\s*\{{\s*"equipment":\s*\{{)')
    match = pattern.search(db)
    if match:
        # Insert the seal object right after "equipment": {
        replacement = match.group(1) + all_modifiers[cls]
        db = db[:match.start()] + replacement + db[match.end():]

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Safely injected seal modifiers via Regex Injection!")
