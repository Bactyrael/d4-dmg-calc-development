import json

with open('parsed_charms.json', 'r') as f:
    data = json.load(f)

new_data = []

for item in data:
    if "Artisanal" in item["name"] or "of the Artisan" in item["name"]:
        continue
    new_data.append(item)

# Add the two critical strike damage ones requested by the user
new_data.append({
    "name": "Focused: +[71 - 94]% Critical Strike Damage",
    "shortName": "+[71 - 94]% Critical Strike Damage",
    "htmlName": "<div style='color:#ff8500;'>Focused</div><div style='color:#b3b3b3; font-size: 0.9em;'>+[71 - 94]% Critical Strike Damage</div>",
    "category": "Offensive"
})

new_data.append({
    "name": "of the Focused: +[110 - 144]% Critical Strike Damage",
    "shortName": "+[110 - 144]% Critical Strike Damage",
    "htmlName": "<div style='color:#ff8500;'>of the Focused</div><div style='color:#b3b3b3; font-size: 0.9em;'>+[110 - 144]% Critical Strike Damage</div>",
    "category": "Offensive"
})

with open('parsed_charms.json', 'w') as f:
    json.dump(new_data, f, indent=4)
