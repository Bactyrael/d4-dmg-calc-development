import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

nodes = data.get("paragonNodes", {})
necro_legs = []
for k, v in nodes.items():
    if "Necro_Legendary_" in v.get("power", "") or "Necromancer_Legendary" in k:
        necro_legs.append(f"{v.get('power')} - {v.get('name')}")

for n in sorted(necro_legs):
    print(n)
