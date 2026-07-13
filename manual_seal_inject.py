import json
import re

modifiers = [
    {
        "name": "Vigorous: [6.5 - 8.0]% Maximum Life",
        "shortName": "[6.5 - 8.0]% Maximum Life",
        "htmlName": "<div style=\\'color:#6879d1;\\'>Vigorous</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>[6.5 - 8.0]% Maximum Life</div>",
        "category": "Utility"
    },
    {
        "name": "of Swiftness: +[20 - 24]% Movement Speed",
        "shortName": "+[20 - 24]% Movement Speed",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Swiftness</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Practiced Technique:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[20 - 24]% Movement Speed</div>",
        "category": "Utility"
    },
    {
        "name": "of Technique: +[2 - 10]% Bonus Kill Experience ([0.2 - 1.0]% at level 70)",
        "shortName": "+[2 - 10]% Bonus Kill Experience ([0.2 - 1.0]% at level 70)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Technique</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Practiced Technique:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[2 - 10]% Bonus Kill Experience ([0.2 - 1.0]% at level 70)</div>",
        "category": "Utility"
    },
    {
        "name": "Keen: +[8.0 - 10.0]% Attack Speed",
        "shortName": "+[8.0 - 10.0]% Attack Speed",
        "htmlName": "<div style=\\'color:#6879d1;\\'>Keen</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[8.0 - 10.0]% Attack Speed</div>",
        "category": "Utility"
    },
    {
        "name": "Adept: +[7.5 - 10.0]% Critical Strike Chance",
        "shortName": "+[7.5 - 10.0]% Critical Strike Chance",
        "htmlName": "<div style=\\'color:#6879d1;\\'>Adept</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7.5 - 10.0]% Critical Strike Chance</div>",
        "category": "Utility"
    },
    {
        "name": "Ferocious: [12.0 - 20.0]% [x] Damage",
        "shortName": "[12.0 - 20.0]% [x] Damage",
        "htmlName": "<div style=\\'color:#6879d1;\\'>Ferocious</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>[12.0 - 20.0]% [x] Damage</div>",
        "category": "Utility"
    },
    {
        "name": "Stalwart\\'s: +[7.5 - 10.0]% Total Armor",
        "shortName": "+[7.5 - 10.0]% Total Armor",
        "htmlName": "<div style=\\'color:#6879d1;\\'>Stalwart\\'s</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7.5 - 10.0]% Total Armor</div>",
        "category": "Utility"
    },
    {
        "name": "Resistant: +[7.5 - 10.0]% Resistance to All Elements",
        "shortName": "+[7.5 - 10.0]% Resistance to All Elements",
        "htmlName": "<div style=\\'color:#6879d1;\\'>Resistant</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7.5 - 10.0]% Resistance to All Elements</div>",
        "category": "Utility"
    },
    {
        "name": "Efficient: [7.5 - 10.0]% Resource Cost Reduction",
        "shortName": "[7.5 - 10.0]% Resource Cost Reduction",
        "htmlName": "<div style=\\'color:#6879d1;\\'>Efficient</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>[7.5 - 10.0]% Resource Cost Reduction</div>",
        "category": "Utility"
    },
    {
        "name": "Resourceful: +[15 - 20] Maximum Resource",
        "shortName": "+[15 - 20] Maximum Resource",
        "htmlName": "<div style=\\'color:#6879d1;\\'>Resourceful</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[15 - 20] Maximum Resource</div>",
        "category": "Utility"
    },
    {
        "name": "of Flaying: +[8 - 10]% Minion Attack Speed (Necromancer Only)",
        "shortName": "+[8 - 10]% Minion Attack Speed (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Flaying</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Rathma\\'s Walking Touch:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[8 - 10]% Minion Attack Speed (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Bones: +[7 - 10]% Bone Skill Damage (Necromancer Only)",
        "shortName": "+[7 - 10]% Bone Skill Damage (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Bones</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Art of the Bone Weaver:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7 - 10]% Bone Skill Damage (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Spirits: +[5 - 11]% Maximum Essence (Necromancer Only)",
        "shortName": "+[5 - 11]% Maximum Essence (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Spirits</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Art of the Bone Weaver:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[5 - 11]% Maximum Essence (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Lamellar: +[8 - 10]% Armor (Necromancer Only)",
        "shortName": "+[8 - 10]% Armor (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Lamellar</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Art of the Bone Weaver:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[8 - 10]% Armor (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Liches: +[2 - 3] to Skeleton Mage (Necromancer Only)",
        "shortName": "+[2 - 3] to Skeleton Mage (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Liches</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Rathma\\'s Walking Touch:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[2 - 3] to Skeleton Mage (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Force: +[7 - 10]% [x] Physical Damage (Necromancer Only)",
        "shortName": "+[7 - 10]% [x] Physical Damage (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Force</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Rathma\\'s Walking Touch:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7 - 10]% [x] Physical Damage (Necromancer Only)</div>",
        "category": "Utility"
    }
]

mods_str_list = []
for m in modifiers:
    mods_str_list.append(f"""            {{
              "name": "{m['name']}",
              "shortName": "{m['shortName']}",
              "htmlName": "{m['htmlName']}",
              "category": "{m['category']}"
            }}""")

seal_json = ",\n".join(mods_str_list)

seal_obj_str = f"""
        "seal": {{
          "modifiers": [
{seal_json}
          ]
        }},"""

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# Inject into Necromancer equipment
pattern = re.compile(r'("Necromancer":\s*\{\s*"equipment":\s*\{)')
match = pattern.search(db)
if match:
    replacement = match.group(1) + seal_obj_str
    db = db[:match.start()] + replacement + db[match.end():]

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Safely injected 16 modifiers into Necromancer seal!")
