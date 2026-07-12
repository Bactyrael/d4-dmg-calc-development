with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# Update getScaledSpriteStyle definition
old_func_def = """function getScaledSpriteStyle(iconObj, targetSize) {
    if (!iconObj || !iconObj.url) return '';
    
    const cellWidth = 122.5;
    const cellHeight = 182;
    const scale = targetSize / cellWidth;"""

new_func_def = """function getScaledSpriteStyle(iconObj, targetSize, itemType) {
    if (!iconObj || !iconObj.url) return '';
    
    // Seals use a 234x234 grid, Charms use 122.5x182
    const cellWidth = itemType === 'Seal' ? 234 : 122.5;
    const cellHeight = itemType === 'Seal' ? 234 : 182;
    const scale = targetSize / cellWidth;"""

content = content.replace(old_func_def, new_func_def)

# Update the calls
# The calls look like: getScaledSpriteStyle(item.icon, 36)
content = content.replace('getScaledSpriteStyle(item.icon, 36)', 'getScaledSpriteStyle(item.icon, 36, item.type)')

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Patched seal sprite sizing logic.")
