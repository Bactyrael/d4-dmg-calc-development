import re
with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

keys = re.findall(r'^\s*"([^"]+)":', db, re.MULTILINE)
print(set(keys))
