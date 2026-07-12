with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

target = """function getMaxSockets(slotName, itemObj) {
    const lowerSlot = slotName.toLowerCase();
    let maxSockets = 2; // HELPER: Default to 2 for helm, chest, pants
    
    if (lowerSlot.includes('glove') || lowerSlot.includes('boot')) {"""

replacement = """function getMaxSockets(slotName, itemObj) {
    const lowerSlot = slotName.toLowerCase();
    let maxSockets = 2; // HELPER: Default to 2 for helm, chest, pants
    
    if (lowerSlot === 'seal' || lowerSlot.includes('glove') || lowerSlot.includes('boot')) {"""

if target in content:
    content = content.replace(target, replacement)
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Patched getMaxSockets for Seal")
else:
    print("Target not found for getMaxSockets")
