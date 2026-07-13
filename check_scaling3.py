import json
with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for item in data.get("levelScaling", []):
    if "GearAffix_DamageType" in str(item):
        print(item)
        break
