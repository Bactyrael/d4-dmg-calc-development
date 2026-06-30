const fs = require('fs');
let content = fs.readFileSync('paragon_logic.js', 'utf8');

let search = `    // Fallback to the raw key
    let keyMatch = window.NODE_IMAGES[cleanKey] || window.NODE_IMAGES[cleanKey + ' (paragon node)'] || window.NODE_IMAGES[cleanKey + ' node'];`;

let replace = `    // Starter Node Explicit Match
    if (cleanKey.includes('start') || displayName.includes('starting node')) {
        let startMatch = window.NODE_IMAGES['necromancer starter node'] || window.NODE_IMAGES['starter node'];
        if (startMatch) return 'assets/images/Necromancer/Paragon Nodes/' + startMatch;
    }
    
    // Fallback to the raw key
    let keyMatch = window.NODE_IMAGES[cleanKey] || window.NODE_IMAGES[cleanKey + ' (paragon node)'] || window.NODE_IMAGES[cleanKey + ' node'];`;

content = content.replace(search, replace);
fs.writeFileSync('paragon_logic.js', content);
console.log('Update complete');
