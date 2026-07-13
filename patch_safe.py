import re

with open("assets/database.js", "r", encoding="utf-8") as f:
    db_lines = f.readlines()

known_values = {
    "of Brawn": "+[6.5 - 8.0] Maximum Life",
    "of Proficiency": "+[6.0 - 8.0] All Stats",
    "of Luck": "+[8.0 - 9.0] Lucky Hit Chance",
    "of Elements": "+[7.0 - 10.0] Non-Physical Damage",
    "of Reapers": "+[7.0 - 10.0]% [x] Ultimate Skill Damage",
    "of the Fleet Footed": "+[20 - 24]% Movement Speed for 4 Seconds After Killing an Elite"
}

for i in range(len(db_lines)):
    for suffix, stat in known_values.items():
        if f'"name": "{suffix}:' in db_lines[i]:
            # Replace name
            db_lines[i] = re.sub(rf'"name": "{re.escape(suffix)}:.*?"', f'"name": "{suffix}: {stat}"', db_lines[i])
            # Replace shortName and htmlName on the following lines
            if i+1 < len(db_lines) and '"shortName":' in db_lines[i+1]:
                db_lines[i+1] = re.sub(rf'"shortName": ".*?"', f'"shortName": "{stat}"', db_lines[i+1])
            if i+2 < len(db_lines) and '"htmlName":' in db_lines[i+2]:
                db_lines[i+2] = re.sub(rf'</div><div[^>]*>.*?</div>"', f'</div><div style=\\\'color:#b3b3b3; font-size: 0.9em;\\\'>{stat}</div>"', db_lines[i+2])

db = "".join(db_lines)

# Inject of Glory
if '"name": "of Glory:' not in db:
    glory_html = "<div style=\\'color:#ff8500;\\'>of Glory</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+1 Charm Slot</div>"
    glory_json = f"""            {{
              "name": "of Glory: +1 Charm Slot",
              "shortName": "+1 Charm Slot",
              "htmlName": "{glory_html}",
              "category": "Utility"
            }},"""
    db = db.replace('"name": "of Insight:', glory_json + '\n            "name": "of Insight:', 1)

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Safely patched!")
