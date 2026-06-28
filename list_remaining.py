import re

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

pattern = r"const\s+skillsDatabase\s*=\s*(\{[\s\S]*?\});"
match = re.search(pattern, js_content)
if match:
    db_str = match.group(1)
    
    # Extract categories and their base skills
    categories = re.findall(r"[\"']([\w\s]+)[\"']:\s*\[([\s\S]*?)(?=\n  [\"'][\w\s]+[\"']:|})", db_str)
    
    for cat_name, cat_content in categories:
        print(f"\n--- {cat_name} ---")
        skills = re.findall(r"[\"']name[\"']:\s*['\"]([^'\"]+)['\"]", cat_content)
        # We need to filter out modifier names, but since modifiers are nested, it's a bit tricky with just regex.
        # But looking at top level name:
        # A simple way to get base skills is to split by "modifiers:" or look at the first name in each {} block at the array root.
        
        # A safer way to just list base skill names:
        base_matches = re.findall(r"\{\s*[\"']name[\"']:\s*['\"]([^'\"]+)['\"][\s\S]*?(?:modifiers|maxRank|tags)", cat_content)
        # That might overmatch or undermatch. Let's just use node to print it since we fixed the JSON.
