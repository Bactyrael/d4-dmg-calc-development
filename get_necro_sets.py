import json

with open("assets/talisman_images.json", "r", encoding="utf-8") as f:
    images = json.load(f)
    
necro_sets = {}
for img in images:
    if img.get("class") == "NECROMANCER" and img.get("rarity") == "set":
        # Extract set name. Usually the type is "Charm - [Set Name]" or we can parse it from name
        # Wait, the subagent json has "type": "Charm - Radament's Desecration"
        # Let's use the type field.
        type_field = img.get("type", "")
        if "-" in type_field:
            set_name = type_field.split("-")[1].strip()
        else:
            set_name = type_field
        
        if set_name not in necro_sets:
            necro_sets[set_name] = []
        necro_sets[set_name].append(img)
        
for set_name, items in necro_sets.items():
    print(f"Set: {set_name}")
    for item in items:
        print(f"  - {item['name']}")
