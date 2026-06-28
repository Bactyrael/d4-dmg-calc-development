import re

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

pattern = r"([\"']name[\"']:\s*['\"]Soulrift['\"][\s\S]*?[\"']modifiers[\"']:\s*\[)([\s\S]*?)(\])"
match = re.search(pattern, js_content, re.IGNORECASE)

if match:
    prefix = match.group(1)
    modifiers_str = match.group(2)
    suffix = match.group(3)
    
    # We will just replace "Distilled Anime" with "Distilled Anima" in the modifiers_str
    # Since we deleted the real Distilled Anima, we can just rename the stub.
    
    new_modifiers_str = re.sub(r'[\"']name[\"']:\s*[\"\']Distilled Anime[\"\']', '"name": "Distilled Anima"', modifiers_str, flags=re.IGNORECASE)
    
    js_content = js_content[:match.start()] + prefix + new_modifiers_str + suffix + js_content[match.end():]
    
    with open('assets/skills.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("Fixed Distilled Anima spelling.")
else:
    print("Could not find Soulrift block.")
