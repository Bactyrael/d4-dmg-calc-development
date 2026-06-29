import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# The node had: {"id": 735, "formula": "ParagonNodeDamageBonusToVulnerable_RareMajor"}
attributes = data.get("attributes", {})
print("Attributes ID 735:")
if "735" in attributes:
    print(attributes["735"])
elif 735 in attributes:
    print(attributes[735])
    
desc = data.get("attributeDescriptions", {})
print("\nDescriptions ID 735:")
if "735" in desc:
    print(desc["735"])
elif 735 in desc:
    print(desc[735])
