import json
import re

with open("assets/talisman_images.json", "r", encoding="utf-8") as f:
    images = json.load(f)

sets_to_add = ["Radament's Desecration", "Word of the Blood Binder", "Art of the Bone Weaver", "Peace of the Black Shroud"]

new_charms = []
for img in images:
    if img.get("class") == "NECROMANCER" and img.get("rarity") == "set":
        type_field = img.get("type", "")
        set_name = ""
        if "\u00b7" in type_field:
            set_name = type_field.split("\u00b7")[1].strip()
        
        if set_name in sets_to_add:
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

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# We need to find the `charms: [` block and insert before it ends.
# A simple way is to find `"Linta of the Waking Touch"` or something at the end of the Rathma set,
# and just append right after it.
insert_point = db.find('set: "Rathma\'s Waking Touch",')
if insert_point != -1:
    # Find the closing brace of that charm object
    charm_end_idx = db.find("        }", insert_point)
    if charm_end_idx != -1:
        charm_end_idx += 9 # past the `}`
        # insert new_charms
        charms_block = ",\n" + ",\n".join(new_charms)
        db = db[:charm_end_idx] + charms_block + db[charm_end_idx:]

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)
print("Injected charms after Rathma.")
