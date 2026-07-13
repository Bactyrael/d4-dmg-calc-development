const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

const targetStr = `    let unlockedSlots = (currentBuild.talisman.seal && currentBuild.talisman.seal.name === 'Legendary Horadric Seal') ? 5 : 5;
    
    // Check if seal has +1 Charm Slot modifier or is Mythic
    if (currentBuild.talisman.seal) {
        let seal = currentBuild.talisman.seal;
        if (seal.isMythic || seal.rarity === 'mythic') {
            unlockedSlots = 6;
        } else {
            const checkExtraSlot = (arr) => arr && arr.some(a => {
                if (typeof a === 'string') return a.includes('+1 Charm Slot') || a.includes('of Glory');
                return a && a.name && (a.name.includes('+1 Charm Slot') || a.name.includes('of Glory'));
            });
            if (checkExtraSlot(seal.affixes) || 
                checkExtraSlot(seal.inherentAffixes) || 
                checkExtraSlot(seal.temperingModifiers) || 
                checkExtraSlot(seal.transfigureModifiers) ||
                checkExtraSlot(seal.tempering) ||
                checkExtraSlot(seal.transfigure)) {
                unlockedSlots = 6;
            }
        }
    }`;

const newStr = `    let unlockedSlots = 0;
    
    // Check if seal has +1 Charm Slot modifier or is Mythic
    if (currentBuild.talisman.seal) {
        unlockedSlots = 5;
        let seal = currentBuild.talisman.seal;
        if (seal.isMythic || seal.rarity === 'mythic') {
            unlockedSlots = 6;
        } else {
            const checkExtraSlot = (arr) => arr && arr.some(a => {
                if (typeof a === 'string') return a.includes('+1 Charm Slot') || a.includes('of Glory');
                return a && a.name && (a.name.includes('+1 Charm Slot') || a.name.includes('of Glory'));
            });
            if (checkExtraSlot(seal.affixes) || 
                checkExtraSlot(seal.inherentAffixes) || 
                checkExtraSlot(seal.temperingModifiers) || 
                checkExtraSlot(seal.transfigureModifiers) ||
                checkExtraSlot(seal.tempering) ||
                checkExtraSlot(seal.transfigure)) {
                unlockedSlots = 6;
            }
        }
    }`;

if (content.includes(targetStr)) {
    const updated = content.replace(targetStr, newStr);
    fs.writeFileSync('app.js', updated);
    console.log("Successfully patched app.js");
} else {
    console.log("Error: Target string not found in app.js");
}
