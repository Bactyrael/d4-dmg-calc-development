with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# find uniqueCharmNames
idx = db.find("let uniqueCharmNames")
if idx != -1:
    closing_idx = db.rfind("};", 0, idx)
    if closing_idx != -1:
        db = db[:closing_idx] + "});" + db[closing_idx+2:]

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)
print("Fixed closing brace.")
