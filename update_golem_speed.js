const fs = require('fs');
let content = fs.readFileSync('paragon_logic.js', 'utf8');

const target = "if (attr && attr.param && PARAM_TAG_MAP[String(attr.param)]) {";
const replacement = `if (attr && attr.id === 588 && attr.param === 2) {
              paramName = 'Golems';
          } else if (attr && attr.param && PARAM_TAG_MAP[String(attr.param)]) {`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('paragon_logic.js', content);
    console.log('Fixed Golem Attack Speed param mapping');
} else {
    console.log('Target not found');
}
