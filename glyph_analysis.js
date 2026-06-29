const fs = require('fs');
const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));

let out = '';
Object.values(data.paragonGlyphs).forEach(g => {
    g.affixes.forEach(aKey => {
        const affixData = data.paragonGlyphAffixes[aKey];
        if (!affixData) return;
        
        // We only care about additive affixes (operation 1 and 2 usually)
        if (affixData.operation !== 1 && affixData.operation !== 2) return;
        
        let val15 = (affixData.base || 0) + ((affixData.perLevel || 0) * 14);
        let val150 = (affixData.base || 0) + ((affixData.perLevel || 0) * 149);
        
        // My current logic:
        let myVal15 = affixData.operation === 1 ? val15 / 10 : val15;
        let myVal150 = affixData.operation === 1 ? val150 / 10 : val150;
        
        out += `${g.name} (${affixData.operation} | DF: ${affixData.displayFactor}):\n`;
        out += `  L15: Raw=${val15.toFixed(2)}, MyLogic=${myVal15.toFixed(2)}\n`;
        out += `  L150: Raw=${val150.toFixed(2)}, MyLogic=${myVal150.toFixed(2)}\n`;
    });
});
fs.writeFileSync('glyph_analysis.txt', out);
