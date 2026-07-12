import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# Fix CSS scaling in Seal and Charm tabs
old_seal_icon = """iconHtml = `<div class="item-icon" style="background-image: url('${item.icon.url}'); background-position: ${item.icon.position}; background-size: ${item.icon.size}; width: 36px; height: 36px; display: inline-block; vertical-align: middle;"></div>`;"""
new_seal_icon = """iconHtml = `<div class="item-icon" style="width: 36px; height: 36px; display: inline-block; vertical-align: middle; position: relative; overflow: hidden; background: transparent;"><div style="background-image: url('${item.icon.url}'); background-position: ${item.icon.position}; background-size: ${item.icon.size}; width: 122px; height: 122px; transform: scale(0.295); transform-origin: top left; position: absolute; top: 0; left: 0;"></div></div>`;"""

content = content.replace(old_seal_icon, new_seal_icon)

# There are two identical occurrences (one in renderSealTab, one in renderCharmTab)
# Wait, I replaced them using specific variables in my last python script, so they should be identical.
content = content.replace(old_seal_icon, new_seal_icon) # Run it again just in case, replace all

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)

# Fix database lookup for Uniques
with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

old_lookup = """icon: window.D4_DATABASE.talismanIcons[item.name + " (Charm)"] || item.icon"""
new_lookup = """icon: window.D4_DATABASE.talismanIcons[item.name] || item.icon"""

# Also fix Beru
beru_target = """name: "Beru of the Waking Touch",
            type: "Charm","""
beru_replace = """name: "Beru of the Waking Touch",
            icon: window.D4_DATABASE.talismanIcons["Beru of the Waking Touch"],
            type: "Charm","""

if new_lookup not in db:
    db = db.replace(old_lookup, new_lookup)
if "icon: window.D4_DATABASE.talismanIcons[\"Beru of the Waking Touch\"]" not in db:
    db = db.replace(beru_target, beru_replace)

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)

print("Fixed CSS scaling and dynamic lookup.")
