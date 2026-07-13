import json
with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for k, v in data.get("levelScaling", {}).items():
    if "GearAffix_DamageType" in str(v):
        print(f"Found in levelScaling: {k}")
        print(v)
        break
