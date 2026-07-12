import re

with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# Replace the closing of Object.assign
db = re.sub(r'};\s*let uniqueCharmNames = \[', r'});\n\n        let uniqueCharmNames = [', db)

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)
print("Regex replace applied.")
