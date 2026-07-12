with open("assets/database.js", "r", encoding="utf-8") as f:
    db = f.read()

# Find talismanIcons definition
start_idx = db.find("window.D4_DATABASE.talismanIcons = {")
if start_idx != -1:
    end_idx = db.find("};", start_idx) + 2
    
    talisman_icons_block = db[start_idx:end_idx]
    
    # Remove it from current location
    db = db[:start_idx] + db[end_idx:]
    
    # Prepend it to the top (but after window object is created)
    # We can create window = window || {}; window.D4_DATABASE = window.D4_DATABASE || {};
    prefix = "window.D4_DATABASE = window.D4_DATABASE || {};\n" + talisman_icons_block + "\n\n"
    
    # Remove existing window.D4_DATABASE = window.D4_DATABASE || {}; if any
    if db.startswith("window.D4_DATABASE = {"):
        db = prefix + db
    else:
        # Just prepend
        db = prefix + db

with open("assets/database.js", "w", encoding="utf-8") as f:
    f.write(db)
print("Moved talismanIcons to top.")
