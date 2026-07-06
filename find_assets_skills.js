const fs = require('fs');
const content = fs.readFileSync('assets/skills.js', 'utf8');
const regex = /"name":\s*"([^"]*\([^"]+\)[^"]*)"/g;
const set = new Set();
let match;
while (match = regex.exec(content)) {
    set.add(match[1]);
}
console.log('Renamed Skills in assets/skills.js:');
console.log(Array.from(set).join('\n'));
