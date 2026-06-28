import re
import json

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

orderings = {
    "Skeleton Warrior": ["Master of Puppets", "Service and Sacrifice", "Litany of Death", "Damage Bonus", "Healing", "Vulnerable", "Resolve"]
}

for base_skill, order in orderings.items():
    # Find the block for the base skill
    pattern = r"(name:\s*['\"]" + re.escape(base_skill) + r"['\"][\s\S]*?modifiers:\s*\[)([\s\S]*?)(\])"
    match = re.search(pattern, js_content)
    if match:
        prefix = match.group(1)
        modifiers_str = match.group(2)
        suffix = match.group(3)
        
        # Extract blocks
        mod_blocks = re.findall(r'\{[^{}]*\}', modifiers_str)
        mod_dict = {}
        for block in mod_blocks:
            name_match = re.search(r"name:\s*['\"]([^'\"]+)['\"]", block)
            if name_match:
                mod_dict[name_match.group(1).lower()] = block
        
        sorted_blocks = []
        for mod_name in order:
            key = mod_name.lower()
            if key in mod_dict:
                sorted_blocks.append(mod_dict[key])
            else:
                # Try finding a partial match
                found = False
                for k, v in mod_dict.items():
                    if k.startswith(key.split(',')[0]) or key.startswith(k.split(',')[0]):
                        sorted_blocks.append(v)
                        found = True
                        break
                if not found:
                    sorted_blocks.append(f"{{ name: '{mod_name}', maxRank: 1, tooltip: '{mod_name}' }}")
        
        # Any leftovers?
        for k, v in mod_dict.items():
            if not any(o.lower() in k or k in o.lower() for o in order):
                sorted_blocks.append(v)
                
        new_modifiers_str = ",\n            ".join(sorted_blocks)
        
        js_content = js_content[:match.start()] + prefix + "\n            " + new_modifiers_str + "\n        " + suffix + js_content[match.end():]

with open('assets/skills.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Skeleton Warrior mapped successfully.")
