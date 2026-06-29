import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

attr_desc = data.get("attributeDescriptions", {})
print("Vulnerable_Health_Damage_Bonus:", attr_desc.get("Vulnerable_Health_Damage_Bonus", "NOT FOUND"))

# Check Core Stat (ID 9)
attributes = data.get("attributes", {})
name_9 = attributes.get("9", {}).get("name")
print("ID 9 name:", name_9)
print("ID 9 desc:", attr_desc.get(name_9, "NOT FOUND"))
