const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Add color for Set rarity
const colorTarget = "else if (itemObj.rarity === 'rare') rarityColor = '#e4c466'; // Rare yellow";
const colorReplace = `else if (itemObj.rarity === 'rare') rarityColor = '#e4c466'; // Rare yellow
    else if (itemObj.rarity === 'set') rarityColor = '#00ff00'; // Set green`;
if (appJs.includes(colorTarget)) appJs = appJs.replace(colorTarget, colorReplace);

const titleTarget = "else if (itemObj.rarity === 'rare') titleType = \"Ancestral Rare\";";
const titleReplace = `else if (itemObj.rarity === 'rare') titleType = "Ancestral Rare";
    else if (itemObj.rarity === 'set') titleType = "Ancestral Set";`;
if (appJs.includes(titleTarget)) appJs = appJs.replace(titleTarget, titleReplace);

// 2. Inject Set Information after Affixes
// We need to find a place after Affixes or Unique Power. Let's insert it before Sockets.
const socketTarget = "// Sockets";
const setInfoInjection = `
    // Set Information
    if (itemObj.rarity === 'set' && itemObj.set) {
        let setName = itemObj.set;
        let setBonuses = window.D4_DATABASE?.talismanSets?.[setName];
        if (setBonuses) {
            // Find all components in the set
            let components = window.D4_DATABASE?.charms?.filter(c => c.set === setName) || [];
            if (components.length === 0 && window.D4_DATABASE?.itemDatabase?.['Charm']) {
                components = window.D4_DATABASE.itemDatabase['Charm'].filter(c => c.set === setName);
            }
            // Count equipped components
            let equippedCount = 0;
            if (window.currentBuild && window.currentBuild.talisman && window.currentBuild.talisman.charms) {
                window.currentBuild.talisman.charms.forEach(c => {
                    if (c && c.set === setName) equippedCount++;
                });
            }
            // If viewing in paperdoll or search modal, itemObj might already be equipped, but let's just rely on currentBuild for equip count.
            // Wait, if it's the seal or something else? Usually set is charms.

            tooltipHtml += \`<div style="margin-top: 8px;">\`;
            tooltipHtml += \`<div style="font-size: 1.05rem; color: #fff; font-weight: bold; margin-bottom: 4px; text-transform: none;">\${setName}</div>\`;
            
            // List components
            components.forEach(comp => {
                let isEquipped = false;
                if (window.currentBuild && window.currentBuild.talisman && window.currentBuild.talisman.charms) {
                    isEquipped = window.currentBuild.talisman.charms.some(c => c && c.name === comp.name);
                }
                // Also check if the current tooltip item is this component (for search modal preview)
                if (itemObj.name === comp.name) isEquipped = true;

                let compColor = isEquipped ? '#00ff00' : '#888';
                tooltipHtml += \`<div style="color: \${compColor}; font-size: 0.85rem; margin-bottom: 2px; margin-left: 10px; display: flex; text-transform: none;">
                    <span style="margin-right: 5px;">→</span> <span>\${comp.name}</span>
                </div>\`;
            });

            tooltipHtml += \`<div style="font-size: 0.9rem; color: #00ff00; margin-top: 6px; margin-bottom: 4px; text-transform: none;">\${setName} (\${equippedCount}/\${components.length || 5})</div>\`;

            // List bonuses
            [2, 3, 5].forEach(req => {
                if (setBonuses[req]) {
                    let isActive = equippedCount >= req;
                    let titleColor = isActive ? '#ccc' : '#555';
                    let descColor = isActive ? '#aaa' : '#555';
                    let highlightColor = isActive ? '#d18a45' : '#555'; // Gold for numbers if active
                    
                    let descHtml = setBonuses[req];
                    if (isActive) {
                        // Highlight numbers
                        descHtml = descHtml.replace(/([\\d\\.]+%(?:\\[[x\\+]\\])?|[\\d\\.]+)/g, '<span style="color: #d18a45;">$1</span>');
                    }

                    tooltipHtml += \`<div style="margin-top: 4px; text-transform: none;">
                        <div style="color: \${titleColor}; font-size: 0.85rem;">(\${req}) Set:</div>
                        <div style="color: \${descColor}; font-size: 0.85rem; margin-left: 10px; line-height: 1.3;">\${descHtml}</div>
                    </div>\`;
                }
            });
            tooltipHtml += \`</div>\`;
        }
    }

    // Sockets`;

if (appJs.includes(socketTarget) && !appJs.includes('// Set Information')) {
    appJs = appJs.replace(socketTarget, setInfoInjection);
    console.log("Injected Set Information into tooltip.");
} else {
    console.log("Could not inject Set Information.");
}

fs.writeFileSync('app.js', appJs, 'utf8');
