const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const target = `        const blockTotal = compiledStats['Block Chance'] ? compiledStats['Block Chance'].final : 0;
        const blockDrPct = compiledStats['Block Damage Reduction'] ? compiledStats['Block Damage Reduction'].final : 0;
        const avgBlockMitigation = (blockTotal / 100) * (blockDrPct / 100);
        if (avgBlockMitigation > 0) {
            allSources.push({name: 'Block Mitigation', val: avgBlockMitigation * 100});
        }`;

const replacement = `        if (statName === 'Universal Damage Reduction %') {
            const blockTotal = compiledStats['Block Chance'] ? compiledStats['Block Chance'].final : 0;
            const blockDrPct = compiledStats['Block Damage Reduction'] ? compiledStats['Block Damage Reduction'].final : 0;
            const avgBlockMitigation = (blockTotal / 100) * (blockDrPct / 100);
            if (avgBlockMitigation > 0) {
                allSources.push({name: 'Block Mitigation', val: avgBlockMitigation * 100});
            }
        }`;

code = code.replace(target, replacement);

fs.writeFileSync('app.js', code);
console.log("Patched 5!");
