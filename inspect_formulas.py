import json

with open("maxroll_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

formulas = data.get("attributeFormulas", {})
print("Number of formulas:", len(formulas))
if formulas:
    sample_key = list(formulas.keys())[0]
    print(f"Sample '{sample_key}':", formulas[sample_key])
    
    # check for a specific paragon one
    test_key = "ParagonNodeDamageBonusToVulnerable_RareMajor"
    if test_key in formulas:
        print(f"Test '{test_key}':", formulas[test_key])
