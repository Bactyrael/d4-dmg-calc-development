import re

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

pattern = r"([\"']name[\"']:\s*['\"]Soulrift['\"][\s\S]*?[\"']modifiers[\"']:\s*\[)([\s\S]*?)(\])"
match = re.search(pattern, js_content, re.IGNORECASE)

if match:
    prefix = match.group(1)
    modifiers_str = match.group(2)
    suffix = match.group(3)
    
    # Extract blocks
    mod_blocks = re.findall(r'\{[^{}]*\}', modifiers_str)
    
    kept_blocks = []
    seen = set()
    for block in mod_blocks:
        name_match = re.search(r"[\"']name[\"']:\s*['\"]([^'\"]+)['\"]", block)
        if name_match:
            mod_name = name_match.group(1).lower().strip()
            # If the user says there's a duplicate Distilled Anima, we remove duplicates based on name matching
            # Actually, "Distilled Anime" and "Distilled Anima" might both be there!
            # The script added "Distilled Anime" because it didn't find an exact match when the user misspelled it
            # But the original was probably "Distilled Anima"!
            # I will filter out "Distilled Anima" and keep "Distilled Anime" (or vice versa).
            
            # Since the user noticed "distilled anima" in row 2 (which is index 3 or 4, i.e., "Damage Bonus" or "Barrier" in our ordering), it means "Distilled Anima" was appended to the END as a leftover!
            # Let's just remove anything named "Distilled Anima" because we already have "Distilled Anime" at the front (index 0).
            
            if mod_name == "distilled anima":
                continue # Skip the original leftover
                
            kept_blocks.append(block)
    
    new_modifiers_str = ",\n          ".join(kept_blocks)
    js_content = js_content[:match.start()] + prefix + "\n          " + new_modifiers_str + "\n        " + suffix + js_content[match.end():]
    
    with open('assets/skills.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("Scrubbed duplicate Distilled Anima.")
else:
    print("Could not find Soulrift block.")
