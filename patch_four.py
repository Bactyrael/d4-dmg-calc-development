import re

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

known_values = {
    "of Brawn": "+[6.5 - 8.0] Maximum Life",
    "of Proficiency": "+[6.0 - 8.0] All Stats",
    "of Luck": "+[8.0 - 9.0] Lucky Hit Chance",
    "of Elements": "+[7.0 - 10.0] Non-Physical Damage"
}

for suffix, stat in known_values.items():
    pattern = re.compile(rf'("name": "{re.escape(suffix)}: ).*?"')
    db = pattern.sub(rf'\g<1>{stat}"', db)
    
    pattern2 = re.compile(rf'("shortName": ").*?"(?=\s*,\s*"htmlName".*?{re.escape(suffix)})', re.DOTALL)
    db = pattern2.sub(rf'\g<1>{stat}"', db)

    pattern3 = re.compile(rf'({re.escape(suffix)}</div>(?:<div[^>]*>.*?</div>)*<div[^>]*>).*?(</div>")', re.DOTALL)
    db = pattern3.sub(rf'\g<1>{stat}\g<2>', db)

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Patched of Brawn, of Proficiency, of Luck, of Elements!")
