const fs = require('fs');
let content = fs.readFileSync('paragon_logic.js', 'utf8');

const anchor = "statName = statName.replace(/\\{value1\\}/g, paramName);";
if (content.includes(anchor)) {
    const splitIndex = content.indexOf(anchor) + anchor.length;
    const endBraceIndex = content.indexOf('}', splitIndex) + 1;
    
    let before = content.substring(0, endBraceIndex);
    let after = content.substring(endBraceIndex);
    
    let insertion = `
      
      if (statName.includes('Damage to Shadow Enemies')) {
          statName = statName.replace('Shadow Enemies', 'Shadow Damage Over Time-Affected Enemies');
      }`;
      
    content = before + insertion + after;
    fs.writeFileSync('paragon_logic.js', content);
    console.log('Fixed');
} else {
    console.log('Target not found');
}
