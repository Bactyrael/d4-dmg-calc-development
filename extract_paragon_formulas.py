import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

out_data = {
    "attributeFormulas": data.get("attributeFormulas", {}),
    "attributes": data.get("attributes", {}),
    "attributeDescriptions": data.get("attributeDescriptions", {})
}

js_content = "window.D4_PARAGON_FORMULAS = " + json.dumps(out_data, indent=2) + ";"

with open("assets/paragon_formulas.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("Saved assets/paragon_formulas.js successfully!")
