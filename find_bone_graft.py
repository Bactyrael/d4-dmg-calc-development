import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for v in data.get("powerTables", []):
    if "Paragon_Necro_Legendary_017" in str(v):
        print("Found in power tables:", v)

for k, v in data.get("uiStrings", {}).items():
    if "Bone Graft" in str(v):
        print("Found in uiStrings:", k, v)
