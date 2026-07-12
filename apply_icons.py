import json
import re

# Load images
with open("assets/talisman_images.json", "r", encoding="utf-8") as f:
    images = json.load(f)

# Load database
with open("assets/database.js", "r", encoding="utf-8") as f:
    db_content = f.read()

# Since database.js is a JS file, we'll use regex to inject the icon properties
# We'll find each seal and charm and add the icon object.

for img in images:
    name = img['name'].replace('"', '\\"')
    # Unique charms have " (Charm)" appended in our database
    # But infinitybuilds might just call them "Andariel's Visage"
    # We'll check both.
    
    icon_str = f'icon: {{ url: "{img["image_url"]}", position: "{img["background_position"]}", size: "{img["background_size"]}" }}'
    
    # Try finding exact name
    pattern = r'(name:\s*["\']' + re.escape(name) + r'["\'],\s*)'
    if re.search(pattern, db_content):
        db_content = re.sub(pattern, r'\g<1>' + icon_str + ',\n            ', db_content, count=1)
        
    # If it's a unique charm
    pattern_charm = r'(name:\s*["\']' + re.escape(name) + r' \(Charm\)["\'],\s*)'
    if re.search(pattern_charm, db_content):
        db_content = re.sub(pattern_charm, r'\g<1>' + icon_str + ',\n            ', db_content, count=1)

# Now write back
with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db_content)

print("Applied icons to database.js")
