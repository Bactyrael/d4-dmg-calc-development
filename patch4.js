const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const target = `        const combinedUniversalDr = 100 - (100 * (1 - (universalDrPct/100)) * glyphDRMultiplier * (1 - avgBlockMitigation));
        const finalElemDr = 1 - ((1 - (armorDrPct/100)) * (1 - (resistDrPct/100)) * (1 - (combinedUniversalDr/100)));
        const ehpElem = maxLife / (1 - finalElemDr);`;

const replacement = `        const blockTotal = compiledStats['Block Chance'] ? compiledStats['Block Chance'].final : 0;
        const blockDrPct = compiledStats['Block Damage Reduction'] ? compiledStats['Block Damage Reduction'].final : 0;
        const avgBlockMitigation = (blockTotal / 100) * (blockDrPct / 100);

        const combinedUniversalDr = 100 - (100 * (1 - (universalDrPct/100)) * glyphDRMultiplier * (1 - avgBlockMitigation));
        const finalElemDr = 1 - ((1 - (armorDrPct/100)) * (1 - (resistDrPct/100)) * (1 - (combinedUniversalDr/100)));
        const ehpElem = maxLife / (1 - finalElemDr);`;

code = code.replace(target, replacement);

fs.writeFileSync('app.js', code);
console.log("Patched 4!");
