import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

nodes = data.get("paragonNodes", {})
for k, v in nodes.items():
    name = v.get("name", "")
    if "Frailty" in name or "Wither" in name or "Scent of Death" in name:
        print(f"{name}: {k} - {v.get('power')}")
