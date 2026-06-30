const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images', 'Necromancer', 'Paragon Nodes');
const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.png'));

let nodeImagesMap = {};
files.forEach(f => {
    let clean = f.toLowerCase().replace('.png', '').trim();
    nodeImagesMap[clean] = f;
});

let jsCode = `
window.NODE_IMAGES = ${JSON.stringify(nodeImagesMap, null, 4)};

window.getNodeImageUrl = function(nodeName, nData) {
    if (!nodeName) return '';
    let clean = nodeName.toLowerCase().replace(/_/g, ' ').trim();
    let nameMatch = window.NODE_IMAGES[clean] || window.NODE_IMAGES[clean + ' (paragon node)'] || window.NODE_IMAGES[clean + ' node'];
    if (nameMatch) return 'assets/images/Necromancer/Paragon Nodes/' + nameMatch;
    
    if (nData) {
        let isMagic = (nData.rarity === 2);
        let isNormal = (nData.rarity === 1 || nData.rarity === 0);
        
        let primaryAttr = 'damage'; // default
        if (nData.attributes && nData.attributes.length > 0) {
            let formAttr = window.D4_PARAGON_FORMULAS.attributes[nData.attributes[0].id];
            if (formAttr) {
                let aName = formAttr.name.toLowerCase();
                if (aName.includes('strength')) primaryAttr = 'strength';
                else if (aName.includes('dexterity')) primaryAttr = 'dexterity';
                else if (aName.includes('intelligence')) primaryAttr = 'intelligence';
                else if (aName.includes('willpower')) primaryAttr = 'willpower';
                else if (aName.includes('life')) primaryAttr = 'life';
                else if (aName.includes('armor')) primaryAttr = 'armor_clad';
                else if (aName.includes('minion')) primaryAttr = 'minion_damage';
            }
        }
        
        if (isNormal) {
            if (primaryAttr === 'strength') return 'assets/images/Necromancer/Paragon Nodes/strength_normal_paragon_node.png';
            if (primaryAttr === 'dexterity') return 'assets/images/Necromancer/Paragon Nodes/dexterity_normal_paragon_node.png';
            if (primaryAttr === 'intelligence') return 'assets/images/Necromancer/Paragon Nodes/intelligence_normal_paragon_node.png';
            if (primaryAttr === 'willpower') return 'assets/images/Necromancer/Paragon Nodes/willpower_normal_paragon_node.png';
            return 'assets/images/Necromancer/Paragon Nodes/strength_normal_paragon_node.png'; // fallback
        }
        
        if (isMagic) {
            let magicKey = 'magic_' + primaryAttr + '_paragon';
            if (window.NODE_IMAGES[magicKey]) return 'assets/images/Necromancer/Paragon Nodes/' + window.NODE_IMAGES[magicKey];
            let altKey = 'magic_' + primaryAttr;
            if (window.NODE_IMAGES[altKey]) return 'assets/images/Necromancer/Paragon Nodes/' + window.NODE_IMAGES[altKey];
            return 'assets/images/Necromancer/Paragon Nodes/magic_damage_paragon.png'; // fallback
        }
    }
    
    // Fallbacks for start/gate
    if (clean.includes('start')) return 'assets/images/Necromancer/Paragon Nodes/prime_starter.png';
    return '';
};
`;

let targetFile = 'paragon_logic.js';
let content = fs.readFileSync(targetFile, 'utf8');

if (!content.includes('window.NODE_IMAGES')) {
    content = content.replace(/window\.getTotalParagonPointsSpent = function\(\) {/, jsCode + '\nwindow.getTotalParagonPointsSpent = function() {');
    fs.writeFileSync(targetFile, content);
    console.log("Injected node mapping!");
} else {
    console.log("Already injected.");
}
