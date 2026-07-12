with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

target = """            row.innerHTML = `${iconHtml}<div class="item-name rarity-mythic" style="display:inline-block; margin-left: 10px;">${item.name}</div>`;"""

replacement = """            let rarityClass = item.rarity === 'legendary' ? 'rarity-legendary' : 'rarity-mythic';
            row.innerHTML = `${iconHtml}<div class="item-name ${rarityClass}" style="display:inline-block; margin-left: 10px;">${item.name}</div>`;"""

if target in content:
    content = content.replace(target, replacement)
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed seal text color logic in modal.")
else:
    print("Target not found.")
