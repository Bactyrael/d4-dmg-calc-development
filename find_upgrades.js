const fs = require('fs');
const lines = fs.readFileSync('skills.js', 'utf8').split('\n');
let res = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/name:\s*['"].*?\(\w+\)['"]/)) {
        res.push((i + 1) + ': ' + lines[i].trim());
    }
}
console.log(res.join('\n'));
