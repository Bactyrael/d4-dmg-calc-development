import json

with open('raw_charms.json', 'r') as f:
    data = json.load(f)

parsed = {}

for item in data:
    if '\n' in item:
        parts = item.split('\n')
        prefix = parts[0]
        effect = '\n'.join(parts[1:])
        name = f"{prefix}: {effect}".replace('\n', ' ')
        
        # Category heuristic
        category = "Utility"
        effect_lower = effect.lower()
        if "damage" in effect_lower or "skill" in effect_lower or "critical" in effect_lower or "vulnerable" in effect_lower:
            category = "Offensive"
        elif "resistance" in effect_lower or "armor" in effect_lower or "life" in effect_lower or "healing" in effect_lower:
            category = "Defensive"
            
        short_name = effect.replace('\n', ' ')
        html_name = f"<div style='color:#ff8500;'>{prefix}</div><div style='color:#b3b3b3; font-size: 0.9em;'>{effect}</div>"
        
        parsed[name] = {
            "name": name,
            "shortName": short_name,
            "htmlName": html_name,
            "category": category
        }

# Filter out duplicates by using dict keys
unique_parsed = list(parsed.values())

with open('parsed_charms.json', 'w') as f:
    json.dump(unique_parsed, f, indent=4)
