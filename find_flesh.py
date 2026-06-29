import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

nodes = data.get("paragonNodes", {})
for k, v in nodes.items():
    if "Flesh-eater" in v.get("name", ""):
        print("Found in nodes:", k, v)
