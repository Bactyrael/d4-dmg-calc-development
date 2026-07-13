import json
with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for k, v in data.get("attributes", {}).items():
    if "Skill_Rank_All_Bonus" in str(v):
        print(f"{k}: {v}")
