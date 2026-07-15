const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

const regex = /(item|i|itemObj|eq)\.name\s*===\s*(["'])(.*?)\2/g;

let replacedCount = 0;
content = content.replace(regex, (match, variable, quote, itemName) => {
    if (itemName.includes('(Charm)')) return match;
    
    // Ignore internal mechanics or generic names that aren't items
    const ignored = ['Paragon Board', 'Paragon Board (Normal Nodes)', 'None', 'Essence'];
    if (ignored.includes(itemName)) return match;
    
    replacedCount++;
    return `(${variable}.name === ${quote}${itemName}${quote} || ${variable}.name === ${quote}${itemName} (Charm)${quote})`;
});

fs.writeFileSync('app.js', content);
console.log('Total replacements:', replacedCount);
