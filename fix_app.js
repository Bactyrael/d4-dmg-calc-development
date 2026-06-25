const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Remove the injected duplicate function block
app = app.replace(/  function isAffixAllowedForSlot\(slotsArr, slotName\) \{[\s\S]*?  \}\r?\n\r?\n/m, '');

// Update the actual function
const oldCode = `      if (mapped === 'mainhand' || mapped === 'offhand' || mapped === 'weapon1' || mapped === 'weapon2') {
         if (mapped.startsWith('weapon')) mapped = 'mainhand';
      }`;
const newCode = `      if (mapped === 'mainhand' || mapped === 'offhand' || mapped === 'weapon1' || mapped === 'weapon2' || mapped === 'ranged weapon') {
         if (mapped.startsWith('weapon') || mapped === 'ranged weapon') mapped = 'mainhand';
      }`;

app = app.replace(oldCode, newCode);

fs.writeFileSync('app.js', app);
