import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    
ui = data.get("uiStrings", {})
for k, v in list(ui.items())[:5]:
    pass # just to see how it's structured
    
print("Found uiStrings. Searching for Damage to Vulnerable...")
for k, v in ui.items():
    if "Vulnerable" in v:
        # print just a few
        pass
        
print("Length of uiStrings:", len(ui))
