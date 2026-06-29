import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

nodes = data.get("paragonNodes", {})
for k, v in nodes.items():
    if "Cult Leader" in v.get("name", ""):
        print("Found in nodes:", k, v)

for k, v in data.get("uiStrings", {}).items():
    if "Cult Leader" in v:
        print("Found in uiStrings:", k, v)
        
powers = data.get("powerTables", {})
for k, v in powers.items():
    # powers can be list or dict
    if isinstance(v, dict):
        if "Cult Leader" in str(v):
            print("Found in power dict:", k)
    elif isinstance(v, list):
        if "Cult Leader" in str(v):
            print("Found in power list:", k)
