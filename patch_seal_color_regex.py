import re
with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# The target is likely inside renderModalItems or renderSealTab depending on how it's structured.
# Let's find "rarity-mythic" right after getScaledSpriteStyle in the Seal context.
# Actually we can just find:
# let iconHtml = `<div class="item-icon" style="color: #c17ce2;">M</div>`;
# if (item.icon && item.icon.url) {
#     iconHtml = `<div class="item-icon" style="${getScaledSpriteStyle(item.icon, 36, item.type)}"></div>`;
# }
# row.innerHTML = `${iconHtml}<div class="item-name rarity-mythic" style="display:inline-block; margin-left: 10px;">${item.name}</div>`;

pattern = re.compile(r'(let iconHtml = `<div class="item-icon" style="color: #c17ce2;">M</div>`;\s*if \(item\.icon && item\.icon\.url\) \{\s*iconHtml = `<div class="item-icon" style="\$\{getScaledSpriteStyle\(item\.icon, 36, item\.type\)\}"></div>`;\s*\}\s*row\.innerHTML = `\$\{iconHtml\}<div class="item-name )rarity-mythic(" style="display:inline-block; margin-left: 10px;">\$\{item\.name\}</div>`;)')

match = pattern.search(content)
if match:
    # We found it!
    replacement = """let rarityClass = item.rarity === 'legendary' ? 'rarity-legendary' : 'rarity-mythic';
            let iconHtml = `<div class="item-icon" style="color: #c17ce2;">M</div>`;
            if (item.icon && item.icon.url) {
                iconHtml = `<div class="item-icon" style="${getScaledSpriteStyle(item.icon, 36, item.type)}"></div>`;
            }
            row.innerHTML = `${iconHtml}<div class="item-name ${rarityClass}" style="display:inline-block; margin-left: 10px;">${item.name}</div>`;"""
    
    content = content[:match.start()] + replacement + content[match.end():]
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed with regex.")
else:
    print("Regex failed.")
