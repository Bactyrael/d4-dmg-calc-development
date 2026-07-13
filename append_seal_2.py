import re

extra_mods = [
    {
        "name": "of Shade: +[7 - 10]% [x] Shadow Damage (Necromancer Only)",
        "shortName": "+[7 - 10]% [x] Shadow Damage (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Shade</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Peace of the Black Shroud:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7 - 10]% [x] Shadow Damage (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Shadows: +[5 - 8]% Darkness Skill Cooldown Reduction (Necromancer Only)",
        "shortName": "+[5 - 8]% Darkness Skill Cooldown Reduction (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Shadows</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Peace of the Black Shroud:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[5 - 8]% Darkness Skill Cooldown Reduction (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Injuries: +[7.0 - 10.0]% [x] Damage to Crowd Controlled Enemies (Necromancer Only)",
        "shortName": "+[7.0 - 10.0]% [x] Damage to Crowd Controlled Enemies (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Injuries</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Peace of the Black Shroud:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7.0 - 10.0]% [x] Damage to Crowd Controlled Enemies (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Chilling: +[7 - 10]% [x] Cold Damage (Necromancer Only)",
        "shortName": "+[7 - 10]% [x] Cold Damage (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Chilling</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Peace of the Black Shroud:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7 - 10]% [x] Cold Damage (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Infusions: +[7 - 10]% Damage for 4 seconds after picking up a Blood Orb (Necromancer Only)",
        "shortName": "+[7 - 10]% Damage for 4 seconds after picking up a Blood Orb (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Infusions</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Word of the Blood Binder:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7 - 10]% Damage for 4 seconds after picking up a Blood Orb (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Stygian: +[7 - 10]% [x] Darkness Skill Damage (Necromancer Only)",
        "shortName": "+[7 - 10]% [x] Darkness Skill Damage (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Stygian</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Peace of the Black Shroud:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7 - 10]% [x] Darkness Skill Damage (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Shrouds: +[7.5 - 10.0] Resistance to All Elements (Necromancer Only)",
        "shortName": "+[7.5 - 10.0] Resistance to All Elements (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Shrouds</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Peace of the Black Shroud:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7.5 - 10.0] Resistance to All Elements (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Lifesteal: +[263 - 316] Life on Kill (Necromancer Only)",
        "shortName": "+[263 - 316] Life on Kill (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Lifesteal</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Word of the Blood Binder:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[263 - 316] Life on Kill (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Clotting: +[12 - 15]% Fortification Generation (Necromancer Only)",
        "shortName": "+[12 - 15]% Fortification Generation (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Clotting</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Word of the Blood Binder:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[12 - 15]% Fortification Generation (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Coagulation: +[5 - 8]% Blood Skill Cooldown Reduction (Necromancer Only)",
        "shortName": "+[5 - 8]% Blood Skill Cooldown Reduction (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Coagulation</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Word of the Blood Binder:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[5 - 8]% Blood Skill Cooldown Reduction (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Survival: +[7 - 8]% Maximum Life (Necromancer Only)",
        "shortName": "+[7 - 8]% Maximum Life (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Survival</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Word of the Blood Binder:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7 - 8]% Maximum Life (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Shattering: +[5 - 8]% Bone Skill Cooldown Reduction (Necromancer Only)",
        "shortName": "+[5 - 8]% Bone Skill Cooldown Reduction (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Shattering</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Art of the Bone Weaver:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[5 - 8]% Bone Skill Cooldown Reduction (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Innards: +[7.0 - 10.0]% [x] Core Skill Damage (Necromancer Only)",
        "shortName": "+[7.0 - 10.0]% [x] Core Skill Damage (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Innards</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Art of the Bone Weaver:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7.0 - 10.0]% [x] Core Skill Damage (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Swiftness: +[20 - 24]% Movement Speed while Quintessence is active (Necromancer Only)",
        "shortName": "+[20 - 24]% Movement Speed while Quintessence is active (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Swiftness</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Art of the Bone Weaver:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[20 - 24]% Movement Speed while Quintessence is active (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Exsanguination: +[7 - 10]% [x] Blood Skill Damage (Necromancer Only)",
        "shortName": "+[7 - 10]% [x] Blood Skill Damage (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Exsanguination</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Word of the Blood Binder:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7 - 10]% [x] Blood Skill Damage (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Corpses: +[7 - 10]% [x] Corpse Skill Damage (Necromancer Only)",
        "shortName": "+[7 - 10]% [x] Corpse Skill Damage (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Corpses</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Radament\\'s Desecration:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7 - 10]% [x] Corpse Skill Damage (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Death Rattles: +[5 - 8]% Macabre Skill Cooldown Reduction (Necromancer Only)",
        "shortName": "+[5 - 8]% Macabre Skill Cooldown Reduction (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Death Rattles</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Radament\\'s Desecration:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[5 - 8]% Macabre Skill Cooldown Reduction (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Graves: +[7 - 10]% Macabre Skill Damage (Necromancer Only)",
        "shortName": "+[7 - 10]% Macabre Skill Damage (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Graves</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Radament\\'s Desecration:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7 - 10]% Macabre Skill Damage (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Severing: +[1 - 2] Essence on Kill (Necromancer Only)",
        "shortName": "+[1 - 2] Essence on Kill (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Severing</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Radament\\'s Desecration:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[1 - 2] Essence on Kill (Necromancer Only)</div>",
        "category": "Utility"
    }
]

mods_str_list = []
for m in extra_mods:
    mods_str_list.append(f"""            {{
              "name": "{m['name']}",
              "shortName": "{m['shortName']}",
              "htmlName": "{m['htmlName']}",
              "category": "{m['category']}"
            }}""")

extra_json = ",\n".join(mods_str_list)

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

pattern = re.compile(r'("Necromancer":\s*\{\s*"equipment":\s*\{\s*"seal":\s*\{\s*"modifiers":\s*\[\s*)(.*?)(\s*\])', re.DOTALL)
match = pattern.search(db)
if match:
    replacement = match.group(1) + match.group(2) + ",\n" + extra_json + match.group(3)
    db = db[:match.start()] + replacement + db[match.end():]

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Safely injected 19 missing modifiers!")
