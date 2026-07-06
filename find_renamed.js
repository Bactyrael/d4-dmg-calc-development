const fs = require('fs');
const lines = fs.readFileSync('app.js', 'utf8').split('\n');
let res = [];
for (let i = 0; i < lines.length; i++) {
    let match = lines[i].match(/name:\s*['"](.*?\([^)]+\))['"]/);
    if (match) {
        res.push((i + 1) + ': ' + lines[i].trim());
    }
}
console.log(res.join('\n'));
