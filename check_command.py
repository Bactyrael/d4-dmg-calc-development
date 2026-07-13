import json
with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for k, v in data.get("affixes", {}).items():
    if v.get("suffix") == "of Command":
        print(f"{k}: attributes={v.get('attributes')}")
