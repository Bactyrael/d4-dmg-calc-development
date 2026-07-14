const fs = require('fs');
const content = fs.readFileSync('assets/paragon.js', 'utf8');
const indices = [];
let index = content.indexOf('.png');
while (index !== -1 && indices.length < 5) {
    indices.push(index);
    index = content.indexOf('.png', index + 1);
}

for (const idx of indices) {
    console.log("MATCH:");
    console.log(content.substring(Math.max(0, idx - 150), idx + 100));
    console.log("-----------------------");
}
