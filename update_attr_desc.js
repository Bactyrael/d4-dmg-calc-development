const fs = require('fs');
let content = fs.readFileSync('paragon_logic.js', 'utf8');
let fnStart = content.indexOf('window.cleanAttributeDescription = function');
let fnEnd = content.indexOf('};', fnStart) + 2;

let newFn = `const PARAM_TAG_MAP = { '-1393374579': 'Corpse' };

window.cleanAttributeDescription = function(desc, rawValue, attr) {
    if (!desc) return { name: "Unknown Stat", value: rawValue, isPercent: false };
    
    // Extract base name by stripping format blocks
    let statName = desc.replace(/\\[.*?\\]/g, '').replace(/^[+-\\s]+/, '').trim();
    
    if (statName.includes('{value1}')) {
        let paramName = '';
        if (attr && attr.param && PARAM_TAG_MAP[String(attr.param)]) {
            paramName = PARAM_TAG_MAP[String(attr.param)];
        }
        statName = statName.replace(/\\{value1\\}/g, paramName);
    }
    
    // Strip tags like {c_important} and {/c}
    statName = statName.replace(/\\{c_[^}]+\\}/g, '').replace(/\\{\\/c\\}/g, '').replace(/\\s+/g, ' ').trim();
    
    let isPercent = false;
    let scaledValue = rawValue;
    
    // e.g. [{value}*100|%|]
    let match = desc.match(/\\[\\{(.*?)\\}\\*?(\\d*)\\|?(.*?)\\|\\]/);
    if (match) {
        let mult = parseFloat(match[2]);
        if (!isNaN(mult)) scaledValue = rawValue * mult;
        if (match[3] && match[3].includes('%')) isPercent = true;
    }
    
    if (desc.includes('*100')) {
        scaledValue = rawValue * 100;
    }
    if (desc.includes('|%|') || desc.includes('%')) {
        isPercent = true;
    }
    
    return { name: statName, value: scaledValue, isPercent };
};`;

content = content.substring(0, fnStart) + newFn + content.substring(fnEnd);
fs.writeFileSync('paragon_logic.js', content);
console.log('Function successfully replaced.');
