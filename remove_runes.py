import json

# Additional names to remove
to_remove = ["Random Legendary Rune", "Random Rare or Legendary Rune", "Random Rune"]

with open('assets/database.js', 'r', encoding='utf-8') as f:
    text = f.read()

prefix = 'window.D4_DATABASE.runes = '
if prefix in text:
    split_parts = text.split(prefix)
    runes_json = split_parts[-1].strip()
    if runes_json.endswith(';'):
        runes_json = runes_json[:-1]
    
    runes = json.loads(runes_json)
    
    # Filter out removed runes using case-insensitive partial match
    filtered_runes = [r for r in runes if not any(x.lower() in r['name'].lower() for x in to_remove)]
    
    new_runes_json = json.dumps(filtered_runes, indent=4)
    new_text = split_parts[0] + prefix + new_runes_json + ';\n'
    
    with open('assets/database.js', 'w', encoding='utf-8') as f:
        f.write(new_text)
        
    print(f"Removed {len(runes) - len(filtered_runes)} runes. {len(filtered_runes)} remain.")
else:
    print("Could not find runes in database.js")
