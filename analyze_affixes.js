const fs = require('fs'); 
const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8')); 
const affixes = Object.values(data.paragonGlyphAffixes); 
let out = '';
affixes.filter(a => a.operation === 1 || a.operation === 2).forEach(a => {
    out += `ID: ${a.id} | OP: ${a.operation} | Base: ${a.base} | PerLevel: ${a.perLevel} | DF: ${a.displayFactor} | Formula: ${a.formula}\nDesc: ${a.desc}\n\n`;
});
fs.writeFileSync('affix_analysis.txt', out);
