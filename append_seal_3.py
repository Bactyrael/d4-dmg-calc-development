import re

extra_mods_raw = [
    {"name": "of Alchemy", "text": "+[2 - 3] Potion Capacity", "set": "Practiced Technique", "color": "orange"},
    {"name": "of Armor", "text": "+[7.5 - 10.0] Armor", "set": "Survival", "color": "orange"},
    {"name": "of Durability", "text": "+[7.5 - 10.0] Maximum Resistance to All Elements", "set": "Survival", "color": "orange"},

    {"name": "of Insight", "text": "+[2.0 - 10.0] Bonus Experience from Elites", "set": "Slaughter", "color": "orange"},
    {"name": "of Safeguarding", "text": "+[11.0 - 15.0] Damage Reduction from Elites", "set": "Slaughter", "color": "orange"},
    {"name": "of Devastation", "text": "+[7.0 - 10.0] Damage to Elites", "set": "Slaughter", "color": "orange"},
    {"name": "of Riches", "text": "+[85 - 100]% Gold Drop Rate", "set": "Practiced Technique", "color": "orange"},

    {"name": "of Curses", "text": "+[7 - 10]% Damage against Cursed Enemies (Necromancer Only)", "set": "Radament\\'s Desecration", "color": "orange"},
    {"name": "of Reapers", "text": "+[7.0 - 10.0]% [x] Ultimate Skill Damage (Necromancer Only)", "set": "Radament\\'s Desecration", "color": "orange"},
    {"name": "of Glory", "text": "+1 Charm Slot", "set": None, "color": "orange"},
    {"name": "of the Fleet Footed", "text": "+[20 - 24]% Movement Speed for 4 Seconds After Killing an Elite", "set": "Slaughter", "color": "orange"},

    {"name": "of Virtuosity", "text": "+1 to All Skills", "set": "Mastery", "color": "orange"},
    {"name": "of Command", "text": "+[7.0 - 10.0] Basic Skill Damage", "set": "Mastery", "color": "orange"},
    {"name": "of Expertise", "text": "+[7.0 - 10.0] Core Skill Damage", "set": "Mastery", "color": "orange"},
    {"name": "Swift", "text": "[7.5 - 10.0]% Cooldown Reduction", "set": None, "color": "purple"},

    {"name": "of Brawn", "text": "+[6.5 - 8.0] Maximum Life", "set": "Survival", "color": "orange"},
    {"name": "of Proficiency", "text": "+[6.0 - 8.0] All Stats", "set": "Survival", "color": "orange"},
    {"name": "of Luck", "text": "+[8.0 - 9.0] Lucky Hit Chance", "set": "Dark Pact", "color": "orange"},
    {"name": "of Elements", "text": "+[7.0 - 10.0] Non-Physical Damage", "set": "Dark Pact", "color": "orange"}
]

mods_str_list = []
for m in extra_mods_raw:
    color_hex = "#ff8500" if m["color"] == "orange" else "#6879d1"
    
    if m["set"]:
        htmlName = f"<div style=\\'color:{color_hex};\\'>{m['name']}</div><div style=\\'color:#2bd42b; font-size: 0.9em;\\'>{m['set']}:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>{m['text']}</div>"
    else:
        htmlName = f"<div style=\\'color:{color_hex};\\'>{m['name']}</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>{m['text']}</div>"

    mods_str_list.append(f"""            {{
              "name": "{m['name']}: {m['text']}",
              "shortName": "{m['text']}",
              "htmlName": "{htmlName}",
              "category": "Utility"
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

print("Safely injected 19 more modifiers!")
