const fs = require('fs');

const path = 'app.js';
let content = fs.readFileSync(path, 'utf8');

// Replace the Item Power line in showItemTooltip to handle undefined
const target = `<div>Item Power <span style="color: #fff;">\${itemObj.power}</span></div>`;
const replace = `\${itemObj.power ? \`<div>Item Power <span style="color: #fff;">\${itemObj.power}</span></div>\` : ''}`;

if (content.includes(target)) {
    content = content.replace(target, replace);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Successfully patched tooltip power.");
} else {
    console.log("Target string not found for tooltip power.");
}
