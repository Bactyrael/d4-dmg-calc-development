import json
with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for k, v in data.items():
    if isinstance(v, dict):
        if "Skill_Rank_All_Bonus" in str(v):
            print(f"Found in dict: {k}")
    elif isinstance(v, list):
        if "Skill_Rank_All_Bonus" in str(v):
            print(f"Found in list: {k}")
