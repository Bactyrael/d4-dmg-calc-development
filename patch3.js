const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

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

// Use regex to catch line breaks properly
const regex2 = /if \(dom\.dashUniversalDr\) dom\.dashUniversalDr\.textContent = \(100 - \(100 \* \(1 - \(universalDrPct\/100\)\) \* glyphDRMultiplier\)\)\.toFixed\(1\) \+ '%';[\s\S]*?if \(domBlock\) domBlock\.textContent = blockTotal\.toFixed\(1\) \+ '%';/;

code = code.replace(regex2, r2);

fs.writeFileSync('app.js', code);
console.log("Patched 3!");
