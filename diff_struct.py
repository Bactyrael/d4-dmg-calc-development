import re, json

def extract_slots(filename, enc="utf-8"):
    try:
        with open(filename, "r", encoding=enc) as f:
            db = f.read()
    except:
        with open(filename, "r", encoding="utf-16") as f:
            db = f.read()
            
    match = re.search(r'"Necromancer":\s*\{\s*"equipment":\s*\{(.*?)\}\s*\}', db, re.DOTALL)
    if match:
        equipment_content = match.group(1)
        # Find all keys
        keys = re.findall(r'"([a-zA-Z0-9 ]+)":\s*\{', equipment_content)
        print(f"{filename} Necromancer slots: {keys[:10]}...")
    else:
        print(f"Could not find Necromancer equipment in {filename}")

extract_slots("assets/database_backup.js")
extract_slots("assets/database.js")
