const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
const regex = /\.skills\[['"](.*?)['"]\]/g;
let match;
while (match = regex.exec(content)) {
    console.log(match[1]);
}
