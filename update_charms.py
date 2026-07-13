import json

with open('parsed_charms.json', 'r') as f:
    data = json.load(f)

new_data = []

for item in data:
    if "Artisanal" in item["name"] or "of the Artisan" in item["name"]:
        continue
    
    if item["name"].startswith(": +[110 - 144]% Critical Strike Damage"):
        item["name"] = "of the Focused: +[110 - 144]% Critical Strike Damage"
        item["htmlName"] = "<div style='color:#ff8500;'>of the Focused</div><div style='color:#b3b3b3; font-size: 0.9em;'>+[110 - 144]% Critical Strike Damage</div>"
    elif item["name"].startswith(": +[71 - 94]% Critical Strike Damage"):
        item["name"] = "Focused: +[71 - 94]% Critical Strike Damage"
        item["htmlName"] = "<div style='color:#ff8500;'>Focused</div><div style='color:#b3b3b3; font-size: 0.9em;'>+[71 - 94]% Critical Strike Damage</div>"
        
    new_data.append(item)

with open('parsed_charms.json', 'w') as f:
    json.dump(new_data, f, indent=4)
