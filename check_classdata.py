import json, re

with open("assets/database.js", "r", encoding="utf-8") as f:
    db_text = f.read()

# Extract just the classData object string using a regex
match = re.search(r'"classData"\s*:\s*(\{.*?\})\s*,\s*"itemDatabase"', db_text, re.DOTALL)
if match:
    classData_str = match.group(1)
    try:
        classData = json.loads(classData_str)
        print("Classes:", list(classData.keys()))
        if "Necromancer" in classData:
            print("Necromancer Slots:", list(classData["Necromancer"].keys()))
            if "Helm" in classData["Necromancer"]:
                print("Necro Helm Categories:", list(classData["Necromancer"]["Helm"].keys()))
                
                # Check tempers
                print("Tempers count:", len(classData["Necromancer"]["Helm"].get("temper", [])))
                # Check transfigure
                print("Transfigures count:", len(classData["Necromancer"]["Helm"].get("transfigure", [])))
    except Exception as e:
        print("JSON parse error:", e)
else:
    print("Could not find classData object")
