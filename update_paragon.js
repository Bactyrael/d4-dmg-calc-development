const fs = require('fs');
let content = fs.readFileSync('paragon_logic.js', 'utf8');

const target = "statName = statName.replace(/\\{value1\\}/g, paramName);\n      }";
const replacement = `statName = statName.replace(/\\{value1\\}/g, paramName);
      }
      
      if (statName.includes('Damage to Shadow Enemies')) {
          statName = statName.replace('Shadow Enemies', 'Shadow Damage Over Time-Affected Enemies');
      }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('paragon_logic.js', content);
    console.log('Fixed');
} else {
    console.log('Target not found');
}
