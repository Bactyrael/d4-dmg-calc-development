const fs = require('fs');
let content = fs.readFileSync('paragon_logic.js', 'utf8');

if (content.includes("'-1745774146': 'Summon'")) {
    content = content.replace("'-1745774146': 'Summon'", "'-1745774146': 'Summon',\n    '440313': 'Skeleton Mage',\n    '439912': 'Skeleton Warrior',\n    '446956': 'Golem'");
    fs.writeFileSync('paragon_logic.js', content);
    console.log('Fixed Minion param mappings');
} else {
    console.log('Target not found');
}
