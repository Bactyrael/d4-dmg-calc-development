import re

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

known_values = {
    "of Reapers": "+[7.0 - 10.0]% [x] Ultimate Skill Damage",
    "of the Fleet Footed": "+[20 - 24]% Movement Speed for 4 Seconds After Killing an Elite"
}

for suffix, stat in known_values.items():
    pattern = re.compile(rf'("name": "{re.escape(suffix)}: ).*?"')
    db = pattern.sub(rf'\g<1>{stat}"', db)
    
    pattern2 = re.compile(rf'("shortName": ").*?"(?=\s*,\s*"htmlName".*?{re.escape(suffix)})', re.DOTALL)
    db = pattern2.sub(rf'\g<1>{stat}"', db)

    pattern3 = re.compile(rf'({re.escape(suffix)}</div>(?:<div[^>]*>.*?</div>)*<div[^>]*>).*?(</div>")', re.DOTALL)
    db = pattern3.sub(rf'\g<1>{stat}\g<2>', db)

# of Glory is completely new, we should add it if it's missing, but it might just be missing from my parser. 
# Wait, let's see if of Glory is in the db.
if "of Glory" not in db:
    # Add of Glory to generic utility list
    glory_html = "<div style=\\'color:#ff8500;\\'>of Glory</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+1 Charm Slot</div>"
    glory_json = f"""            {{
              "name": "of Glory: +1 Charm Slot",
              "shortName": "+1 Charm Slot",
              "htmlName": "{glory_html}",
              "category": "Utility"
            }},"""
    # Just inject it after of Insight
    db = db.replace('"name": "of Insight', glory_json + '\n            "name": "of Insight')

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Patched of Reapers, of the Fleet Footed, and of Glory!")
