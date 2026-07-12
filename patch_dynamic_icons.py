import json

with open("assets/talisman_images.json", "r", encoding="utf-8") as f:
    images = json.load(f)

# build JS object
js_obj = "window.D4_DATABASE.talismanIcons = {\n"
for img in images:
    name = img['name'].replace('"', '\\"')
    js_obj += f'  "{name}": {{ url: "{img["image_url"]}", position: "{img["background_position"]}", size: "{img["background_size"]}" }},\n'
js_obj += "};\n"

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# Add the dictionary before the setTimeout
if "window.D4_DATABASE.talismanIcons =" not in db:
    db = db.replace('setTimeout(() => {', js_obj + '\n    setTimeout(() => {')

# Modify the dynamic push
old_push = """                        desc: item.desc,
                        icon: item.icon
                    });"""

new_push = """                        desc: item.desc,
                        icon: window.D4_DATABASE.talismanIcons[item.name + " (Charm)"] || item.icon
                    });"""

if new_push not in db:
    db = db.replace(old_push, new_push)

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Updated dynamic charms to use atlas icons.")
