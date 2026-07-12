import json
import re

with open("assets/talisman_images.json", "r", encoding="utf-8") as f:
    images = json.load(f)

# Extract necro sets
sets_to_add = ["Radament's Desecration", "Word of the Blood Binder", "Art of the Bone Weaver", "Peace of the Black Shroud"]

new_charms = []
for img in images:
    if img.get("class") == "NECROMANCER" and img.get("rarity") == "set":
        type_field = img.get("type", "")
        set_name = ""
        if "\u00b7" in type_field:
            set_name = type_field.split("\u00b7")[1].strip()
        
        if set_name in sets_to_add:
            # Format name (escape quotes)
            name = img["name"].replace('"', '\\"')
            
            charm_str = f"""        {{
            name: "{name}",
            icon: window.D4_DATABASE.talismanIcons["{name}"],
            type: "Charm",
            rarity: "set",
            set: "{set_name}",
            desc: "Part of {set_name} set."
        }}"""
            new_charms.append(charm_str)

# Inject into database.js
with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# Find the end of the charms array. We can just insert it before the closing bracket of charms array.
# In database.js, the charms array ends before uniqueCharmNames
# Let's find: `uniqueCharmNames`
insert_point = db.find("    let uniqueCharmNames = [")
if insert_point != -1:
    # go backwards to find the `    ],`
    charms_end = db.rfind("    ],", 0, insert_point)
    if charms_end != -1:
        charms_block = ",\n" + ",\n".join(new_charms) + "\n"
        db = db[:charms_end] + charms_block + db[charms_end:]

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print(f"Added {len(new_charms)} new charms.")
