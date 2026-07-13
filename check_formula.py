import json
with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for k, v in data.get("attributeFormulas", {}).items():
    if k == "GearAffix_DamageType":
        print(f"{k}: {v}")
