import json

with open("assets/paragon_formulas.js", "r", encoding="utf-8") as f:
    js = f.read()

json_str = js[js.find("{"):-1]
data = json.loads(json_str)

form = data["attributeFormulas"]
paragon_forms = [k for k in form.keys() if "Paragon" in k]
complex = []
for k in paragon_forms:
    val = form[k][0]["formula"]
    try:
        float(val)
    except:
        complex.append((k, val))

print(f"Total Paragon Formulas: {len(paragon_forms)}")
print(f"Complex Formulas: {len(complex)}")
if complex:
    print(complex[:5])
