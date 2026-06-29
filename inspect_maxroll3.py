import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# check attribute descriptions
attr_desc = data.get("attributeDescriptions", {})
print("Len of attributeDescriptions:", len(attr_desc))

if "735" in attr_desc:
    print("735:", attr_desc["735"])

if "9" in attr_desc:
    print("9:", attr_desc["9"])
