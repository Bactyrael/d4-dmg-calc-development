const fs = require('fs'); 
const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8')); 
const affixes = Object.values(data.paragonGlyphAffixes); 
let out = '';
affixes.filter(a => a.operation === 2).forEach(a => {
    let val150 = a.base + a.perLevel * 149;
    out += `ID: ${a.id}, Base: ${a.base}, Per: ${a.perLevel}, Val150: ${val150}, Desc: ${a.desc}\n`;
});
fs.writeFileSync('op2.txt', out);
