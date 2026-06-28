import re
with open('assets/skills.js', 'r', encoding='utf-8') as f:
    js = f.read()

# We know the structure is:
# const skillsDatabase = {
#    "Basic": [ { name: "Reap", ...
# So let's extract all the category base skill names
pattern = r"const\s+skillsDatabase\s*=\s*(\{.*?\});"
match = re.search(pattern, js, re.DOTALL)
if match:
    db_str = match.group(1)
    base_skills = re.findall(r"name:\s*['\"]([^'\"]+)['\"][\s\S]*?modifiers:", db_str)
    print("Base skills found:")
    print(base_skills)
else:
    print("Could not parse database")
