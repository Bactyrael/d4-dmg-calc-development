import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

nodes = data.get("paragonNodes", {})
for k, v in nodes.items():
    if "Blood Begets Blood" in v.get("name", ""):
        print(f"{v.get('name')}: {k} - {v.get('power')}")
