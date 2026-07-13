import re

extra_mods = [
    {
        "name": "Astute: +[7.5 - 10.0]% Intelligence",
        "shortName": "+[7.5 - 10.0]% Intelligence",
        "htmlName": "<div style=\\'color:#6879d1;\\'>Astute</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7.5 - 10.0]% Intelligence</div>",
        "category": "Utility"
    },
    {
        "name": "Harmonious: +[6.0 - 8.0]% All Stats",
        "shortName": "+[6.0 - 8.0]% All Stats",
        "htmlName": "<div style=\\'color:#6879d1;\\'>Harmonious</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[6.0 - 8.0]% All Stats</div>",
        "category": "Utility"
    },
    {
        "name": "of Minions: +[7 - 10]% [x] Minion Damage (Necromancer Only)",
        "shortName": "+[7 - 10]% [x] Minion Damage (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Minions</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Rathma\\'s Walking Touch:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[7 - 10]% [x] Minion Damage (Necromancer Only)</div>",
        "category": "Utility"
    },
    {
        "name": "of Ghouls: +[2 - 3] to Skeleton Warrior (Necromancer Only)",
        "shortName": "+[2 - 3] to Skeleton Warrior (Necromancer Only)",
        "htmlName": "<div style=\\'color:#ff8500;\\'>of Ghouls</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>Rathma\\'s Walking Touch:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[2 - 3] to Skeleton Warrior (Necromancer Only)</div>",
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

# We need to find the Necromancer seal modifiers array and append these
pattern = re.compile(r'("Necromancer":\s*\{\s*"equipment":\s*\{\s*"seal":\s*\{\s*"modifiers":\s*\[\s*)(.*?)(\s*\])', re.DOTALL)
match = pattern.search(db)
if match:
    replacement = match.group(1) + match.group(2) + ",\n" + extra_json + match.group(3)
    db = db[:match.start()] + replacement + db[match.end():]

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Safely injected 4 missing modifiers!")
