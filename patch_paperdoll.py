with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# We need to define renderTalismanUI and place it inside the global scope or before where it's used.
# Since app.js has a bunch of global functions, we can append it or insert it near renderEquipment.

render_func = """
function renderTalismanUI() {
    if (!currentBuild || !currentBuild.talisman) return;
    
    const sealSlot = document.querySelector('.seal-slot');
    if (sealSlot) {
        if (currentBuild.talisman.seal) {
            let style = getScaledSpriteStyle(currentBuild.talisman.seal.icon, 60, currentBuild.talisman.seal.type);
            sealSlot.innerHTML = `<div style="${style}; border-radius: 50%; box-shadow: inset 0 0 10px rgba(0,0,0,0.8);"></div>`;
            sealSlot.style.borderColor = '#d18a45'; // Keep golden accent
        } else {
            sealSlot.innerHTML = '';
            sealSlot.style.borderColor = '#d18a45';
        }
    }
    
    for (let i = 0; i < 6; i++) {
        const charmSlot = document.querySelector(`.charm-${i}`);
        if (charmSlot) {
            const charm = currentBuild.talisman.charms[i];
            if (charm) {
                let style = getScaledSpriteStyle(charm.icon, 50, charm.type);
                charmSlot.innerHTML = `<div style="${style}; border-radius: 50%; box-shadow: inset 0 0 10px rgba(0,0,0,0.8);"></div>`;
            } else {
                charmSlot.innerHTML = '';
            }
        }
    }
}
"""

if "function renderTalismanUI()" not in content:
    # insert before renderEquipment
    content = content.replace("function renderEquipment(", render_func + "\nfunction renderEquipment(")

# Also call it in loadBuildToUI
load_call = """
        if (typeof renderTalismanUI === 'function') renderTalismanUI();
        // Update stats
"""
if "renderTalismanUI" not in content.split("function loadBuildToUI(")[1]:
    content = content.replace("// Update stats\n", load_call)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Added renderTalismanUI.")
