const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const t1 = `const inverseMultiplicativeKeys = Object.keys(stats).filter(k => k.includes('Dodge Chance') || k.includes('Damage Reduction'));`;
const r1 = `if (stats['Block Chance'] && stats['Block Chance'].total > 0) {
            addStat(stats, 'Block Damage Reduction', 15, 'Base Shield');
        }
        const inverseMultiplicativeKeys = Object.keys(stats).filter(k => k.includes('Dodge Chance') || k.includes('Damage Reduction') || k.includes('Block Damage Reduction'));`;
code = code.replace(t1, r1);

const t2 = `if (dom.dashUniversalDr) dom.dashUniversalDr.textContent = (100 - (100 * (1 - (universalDrPct/100)) * glyphDRMultiplier)).toFixed(1) + '%';

      const dodgeTotal = compiledStats['Dodge Chance'] ? compiledStats['Dodge Chance'].final : 0;
      const blockTotal = compiledStats['Block Chance'] ? compiledStats['Block Chance'].final : 0;
      
      const domDodge = document.getElementById('dash-dodge');
      const domBlock = document.getElementById('dash-block');
      if (domDodge) domDodge.textContent = dodgeTotal.toFixed(1) + '%';
      if (domBlock) domBlock.textContent = blockTotal.toFixed(1) + '%';`;

const r2 = `      const dodgeTotal = compiledStats['Dodge Chance'] ? compiledStats['Dodge Chance'].final : 0;
      const blockTotal = compiledStats['Block Chance'] ? compiledStats['Block Chance'].final : 0;
      const blockDrPct = compiledStats['Block Damage Reduction'] ? compiledStats['Block Damage Reduction'].final : 0;
      const avgBlockMitigation = (blockTotal / 100) * (blockDrPct / 100);

      const combinedUniversalDr = 100 - (100 * (1 - (universalDrPct/100)) * glyphDRMultiplier * (1 - avgBlockMitigation));
      if (dom.dashUniversalDr) dom.dashUniversalDr.textContent = combinedUniversalDr.toFixed(1) + '%';

      const domDodge = document.getElementById('dash-dodge');
      const domBlock = document.getElementById('dash-block');
      const domBlockDr = document.getElementById('dash-block-dr');
      if (domDodge) domDodge.textContent = dodgeTotal.toFixed(1) + '%';
      if (domBlock) domBlock.textContent = blockTotal.toFixed(1) + '%';
      if (domBlockDr) domBlockDr.textContent = blockDrPct.toFixed(1) + '%';`;
code = code.replace(t2, r2);

const t3 = `// Armor DR applies to all elemental damage as well as physical
          const combinedUniversalDr = 100 - (100 * (1 - (universalDrPct/100)) * glyphDRMultiplier);`;
const r3 = `// Armor DR applies to all elemental damage as well as physical
          const combinedUniversalDr = 100 - (100 * (1 - (universalDrPct/100)) * glyphDRMultiplier * (1 - avgBlockMitigation));`;
code = code.replace(t3, r3);

const t4 = `const combinedUniversalDr = 100 - (100 * (1 - (universalDrPct/100)) * glyphDRMultiplier);
        const finalElemDr = 1 - ((1 - (armorDrPct/100)) * (1 - (resistDrPct/100)) * (1 - (combinedUniversalDr/100)));`;
const r4 = `const combinedUniversalDr = 100 - (100 * (1 - (universalDrPct/100)) * glyphDRMultiplier * (1 - avgBlockMitigation));
        const finalElemDr = 1 - ((1 - (armorDrPct/100)) * (1 - (resistDrPct/100)) * (1 - (combinedUniversalDr/100)));`;
code = code.replace(t4, r4);

const t5 = `        let total = 0;
        if (allSources.length > 0) {`;
const r5 = `        const blockTotal = compiledStats['Block Chance'] ? compiledStats['Block Chance'].final : 0;
        const blockDrPct = compiledStats['Block Damage Reduction'] ? compiledStats['Block Damage Reduction'].final : 0;
        const avgBlockMitigation = (blockTotal / 100) * (blockDrPct / 100);
        if (avgBlockMitigation > 0) {
            allSources.push({name: 'Block Mitigation', val: avgBlockMitigation * 100});
        }

        let total = 0;
        if (allSources.length > 0) {`;
code = code.replace(t5, r5);

fs.writeFileSync('app.js', code);
console.log("Patched!");
