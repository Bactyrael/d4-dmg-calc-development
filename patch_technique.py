import re

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# Let's see if of Technique is already correctly in there
if '"name": "of Technique:' not in db:
    # We should add it after Practiced Technique or similar
    tech_html = "<div style=\\'color:#ff8500;\\'>of Technique</div><div style=\\'color:#39ff14; font-size: 0.9em;\\'>Practiced Technique:</div><div style=\\'color:#b3b3b3; font-size: 0.9em;\\'>+[2 - 10]% Bonus Kill Experience ([0.2 - 1.0]% at level 70)</div>"
    tech_json = f"""            {{
              "name": "of Technique: +[2 - 10]% Bonus Kill Experience ([0.2 - 1.0]% at level 70)",
              "shortName": "+[2 - 10]% Bonus Kill Experience ([0.2 - 1.0]% at level 70)",
              "htmlName": "{tech_html}",
              "category": "Generic"
            }},"""
    
    if '"name": "of Swiftness' in db:
        db = db.replace('"name": "of Swiftness', tech_json + '\n            "name": "of Swiftness', 1)
    
with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Patched of Technique!")
