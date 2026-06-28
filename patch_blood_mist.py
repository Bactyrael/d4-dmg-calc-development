import re

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

orderings = {
    "Blood Mist": ["Devouring Mist", "Blood Rush", "Blood Transfusion", "Overpower", "Vulnerable and Slow", "Critical Strike", "Movement Speed"]
}

for base_skill, order in orderings.items():
    pattern = r"([\"']name[\"']:\s*['\"]" + re.escape(base_skill) + r"['\"][\s\S]*?[\"']modifiers[\"']:\s*\[)([\s\S]*?)(\])"
    match = re.search(pattern, js_content, re.IGNORECASE)
    if match:
        prefix = match.group(1)
        modifiers_str = match.group(2)
        suffix = match.group(3)
        
        mod_blocks = re.findall(r'\{[^{}]*\}', modifiers_str)
        mod_dict = {}
        for block in mod_blocks:
            name_match = re.search(r"[\"']name[\"']:\s*['\"]([^'\"]+)['\"]", block)
            if name_match:
                mod_dict[name_match.group(1).lower().strip()] = block
        
        sorted_blocks = []
        for mod_name in order:
            key = mod_name.lower().strip()
            if key in mod_dict:
                sorted_blocks.append(mod_dict[key])
            else:
                sorted_blocks.append(f'{{\n            "name": "{mod_name}",\n            "maxRank": 1\n          }}')
        
        new_modifiers_str = ",\n          ".join(sorted_blocks)
        js_content = js_content[:match.start()] + prefix + "\n          " + new_modifiers_str + "\n        " + suffix + js_content[match.end():]

with open('assets/skills.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Blood Mist mapped successfully.")
