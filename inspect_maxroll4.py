import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# check attribute descriptions
attr_desc = data.get("attributeDescriptions", {})

print("Sample attributeDescriptions:")
for k in list(attr_desc.keys())[:5]:
    print(k, ":", attr_desc[k])
