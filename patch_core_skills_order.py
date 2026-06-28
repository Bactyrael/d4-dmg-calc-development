import re
import json

with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract the skillsDatabase object string
match = re.search(r'const\s+skillsDatabase\s*=\s*(\{.*?\});', js_content, re.DOTALL)
if not match:
    print("Could not find skillsDatabase in skills.js")
    exit(1)

db_str = match.group(1)
# Safely load it (it should be valid JSON if keys are quoted, but in standard JS they might not be)
# We can just use Python's ast if we format it, but using regex replacements might be easier and safer.

# The user provided orderings for 6 skills.
orderings = {
    "Bone Spear": ["Bone Spikes", "Blood Spear", "Shadow Splitter", "First Hit Damage Bonus", "Cost Reduction", "Resolve", "Pierce Damage Bonus"],
    "Sever": ["Reaping Lotus", "Inexorable Reaper", "Cold Pursuit", "Damage Bonus", "Cost Reduction", "Crowd Control", "Corpse Generation"],
    "Blight": ["Piercing Darkness", "Whirlpool", "Volatile Blood", "Area Damage Bonus", "Size Bonus", "Lucky Hit Chance", "Crowd Control Damage Bonus"],
    "Skeleton Mage": ["Singularity", "Gift of Death", "Coven", "Ferocity, Resolve, or Overpower", "Crowd Control Damage Bonus", "Critical Strike Chance", "Duration Damage Bonus"],
    "Blood Surge": ["Pins and Needles", "You and What Army?", "Bloodbath", "Overpower", "Weaken", "Fortify", "Damage Bonus"],
    "Blood Lance": ["Festering Wound", "Gore Quills", "Blood Seeker", "Overpower", "Cost Reduction", "Fortify", "Ricochet"]
}

# The easiest way to reorder them in JS string format without a full AST parser is to 
# find the block for each base skill, extract its modifiers array, and sort it based on the ordered list.

def sort_modifiers(match_obj):
    base_skill = match_obj.group(1)
    modifiers_str = match_obj.group(2)
    
    if base_skill not in orderings:
        return match_obj.group(0)
        
    order = orderings[base_skill]
    
    # Extract individual modifier objects
    mod_matches = re.findall(r'\{\s*name:\s*[\'"]([^\'"]+)[\'"][\s\S]*?\}', modifiers_str)
    mod_blocks = re.findall(r'\{[\s\S]*?\}', modifiers_str)
    
    # Map name to block
    mod_dict = {}
    for block in mod_blocks:
        name_match = re.search(r'name:\s*[\'"]([^\'"]+)[\'"]', block)
        if name_match:
            mod_dict[name_match.group(1)] = block
            
    # Rebuild modifiers string
    sorted_blocks = []
    for mod_name in order:
        # Fuzzy match for names that might be slightly different in DB
        found = False
        for db_name, block in mod_dict.items():
            if db_name.lower().strip() == mod_name.lower().strip() or (mod_name.lower().startswith('ferocity') and db_name.lower().startswith('ferocity')):
                sorted_blocks.append(block)
                found = True
                break
        if not found:
            # If a modifier provided by the user doesn't exist in the DB, we create a stub for it
            print(f"Warning: modifier '{mod_name}' not found for '{base_skill}', creating stub.")
            sorted_blocks.append(f"{{ name: '{mod_name}', maxRank: 1, tooltip: '{mod_name}' }}")
            
    # Add any remaining modifiers from DB that weren't in the user's list at the end
    for db_name, block in mod_dict.items():
        # Check if db_name is in order (case insensitive)
        if not any(o.lower().strip() == db_name.lower().strip() or (o.lower().startswith('ferocity') and db_name.lower().startswith('ferocity')) for o in order):
            sorted_blocks.append(block)
            
    new_modifiers_str = "[\n            " + ",\n            ".join(sorted_blocks) + "\n        ]"
    
    return f"name: '{base_skill}'{match_obj.group(0)[len(f\"name: '{base_skill}'\"):match_obj.group(0).find('modifiers:')]}modifiers: {new_modifiers_str}"

# We need a regex that matches the base skill block up to the modifiers array
# Since JS blocks can contain nested curly braces, it's a bit tricky.
# Let's just find the name and the modifiers array.
pattern = r"name:\s*[\'\"]([^\'\"]+)[\'\"][\s\S]*?modifiers:\s*\[([\s\S]*?)\]"
new_db_str = re.sub(pattern, sort_modifiers, db_str)

js_content = js_content.replace(db_str, new_db_str)

with open('assets/skills.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Core skills mapped successfully.")
