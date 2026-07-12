with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# Fix the overwrite issue
# Instead of `window.D4_DATABASE = {`, we can change it to `Object.assign(window.D4_DATABASE, {`
# Or we can just move talismanIcons to the BOTTOM but reference it inside the charm array?
# Wait, you CANNOT reference it inside the charm array if it's defined after.
# Best solution: Change `window.D4_DATABASE = {` to `Object.assign(window.D4_DATABASE, {`
if "window.D4_DATABASE = {\n" in db:
    db = db.replace("window.D4_DATABASE = {\n", "Object.assign(window.D4_DATABASE, {\n")
    # Also need to close the `});` at the end
    # Let's find the closing brace before the setTimeout
    idx = db.find("    let uniqueCharmNames = [")
    if idx != -1:
        # find the `};` before that
        closing_idx = db.rfind("};", 0, idx)
        if closing_idx != -1:
            db = db[:closing_idx] + "});\n" + db[closing_idx+2:]

# Check where the 20 charms went
print("Number of 'Charm' string occurrences:", db.count('"Charm"'))

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)
print("Applied Object.assign fix.")
