const fs = require('fs');
let lines = fs.readFileSync('paragon_logic.js', 'utf8').split('\n');

for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('window.getGlyphNodeMultiplier = function(slotId, dataIdx, nData) {')) {
        lines[i] = lines[i].replace('nData) {', 'nData, attr) {');
    }
    else if (lines[i].includes('let mult = window.getGlyphNodeMultiplier(slotId, dataIdx, nodeInfo);')) {
        lines[i] = lines[i].replace('nodeInfo);', 'nodeInfo, attr);');
    }
    else if (lines[i].includes('mult = window.getGlyphNodeMultiplier(slotIndex, dataIdx, nData);')) {
        lines[i] = lines[i].replace('nData);', 'nData, attr);');
    }
    
    else if (lines[i].includes('if (affixData.affectedRarity && affixData.affectedRarity === nData.rarity) {')) {
        lines.splice(i, 1, 
            '        let isMatch = false;',
            '        if (affixData.affectedRarity && affixData.affectedRarity === nData.rarity) {',
            '            isMatch = true;',
            '        } else if (affixData.affectedAttributes && affixData.affectedAttributes.length > 0 && attr) {',
            '            isMatch = affixData.affectedAttributes.some(a => {',
            '                if (a.param !== undefined && a.param !== -1) {',
            '                    return a.id === attr.id && a.param === attr.param;',
            '                }',
            '                return a.id === attr.id;',
            '            });',
            '        }',
            '        ',
            '        if (isMatch) {'
        );
        i += 12; // skip newly added lines
    }
}

fs.writeFileSync('paragon_logic.js', lines.join('\n'));
console.log('Successfully patched getGlyphNodeMultiplier');
