import re

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# I will find the Soulrift block and then remove any modifier blocks that match the removed names.
removed_names = ["Enhanced Soulrift", "Prime Soulrift", "Final Soulrift", "Supreme Soulrift"]

pattern = r"([\"']name[\"']:\s*['\"]Soulrift['\"][\s\S]*?[\"']modifiers[\"']:\s*\[)([\s\S]*?)(\])"
match = re.search(pattern, js_content, re.IGNORECASE)

if match:
    prefix = match.group(1)
    modifiers_str = match.group(2)
    suffix = match.group(3)
    
    # Extract blocks
    mod_blocks = re.findall(r'\{[^{}]*\}', modifiers_str)
    
    kept_blocks = []
    for block in mod_blocks:
        name_match = re.search(r"[\"']name[\"']:\s*['\"]([^'\"]+)['\"]", block)
        if name_match:
            mod_name = name_match.group(1)
            # Only keep it if it's NOT in the removed_names list (case insensitive)
            if not any(r.lower() == mod_name.lower() for r in removed_names):
                kept_blocks.append(block)
    
    new_modifiers_str = ",\n          ".join(kept_blocks)
    js_content = js_content[:match.start()] + prefix + "\n          " + new_modifiers_str + "\n        " + suffix + js_content[match.end():]
    
    with open('assets/skills.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("Scrubbed outdated Soulrift nodes.")
else:
    print("Could not find Soulrift block.")
