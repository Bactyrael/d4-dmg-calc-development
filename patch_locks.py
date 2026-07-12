with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# Update renderTalismanUI to add lock styling
target = """    for (let i = 0; i < 6; i++) {
        const charmSlot = document.querySelector(`.charm-${i}`);
        if (charmSlot) {
            const charm = currentBuild.talisman.charms[i];
            if (charm) {"""

replacement = """    const unlockedSlots = (currentBuild.talisman.seal && currentBuild.talisman.seal.name === 'Legendary Horadric Seal') ? 5 : 6;
    
    for (let i = 0; i < 6; i++) {
        const charmSlot = document.querySelector(`.charm-${i}`);
        if (charmSlot) {
            if (i >= unlockedSlots) {
                // Lock the slot
                charmSlot.innerHTML = `<div style="width: 100%; height: 100%; border-radius: 50%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; color: #555; font-size: 20px;">&#128274;</div>`;
                charmSlot.style.pointerEvents = 'none'; // Prevent clicking
                // If there's an item stuck in here, unequip it
                if (currentBuild.talisman.charms[i]) currentBuild.talisman.charms[i] = null;
                continue;
            } else {
                charmSlot.style.pointerEvents = 'auto';
            }
            
            const charm = currentBuild.talisman.charms[i];
            if (charm) {"""

content = content.replace(target, replacement)

# Update the modal to prevent opening if locked? No, the pointerEvents = 'none' will prevent clicking it entirely!

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Added slot locking logic.")
