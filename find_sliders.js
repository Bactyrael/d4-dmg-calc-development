const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
const regex = /window\.skillSliderValues\[['"](.*?)['"]\]/g;
const set = new Set();
let match;
while (match = regex.exec(content)) {
    set.add(match[1]);
}
console.log(Array.from(set).join(', '));
