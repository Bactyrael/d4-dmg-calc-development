import re
with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the transfigureSection error
content = content.replace("transfigureSection = ''; // Not defined as a string, it's rendered inline? Let's check if it exists.", "")

# Hide tempers for Seal
temper_pattern = r"""<div class="edit-section" style="\$\{\(rarity === 'mythic' \|\| rarity === 'unique'\) \? 'display:none;' : ''\}">"""
temper_repl = """<div class="edit-section" style="${(rarity === 'mythic' || rarity === 'unique' || slotName === 'Seal') ? 'display:none;' : ''}">"""
content = re.sub(temper_pattern, temper_repl, content)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Cleaned up editBody sections.")
