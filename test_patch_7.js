const fs = require('fs');
let lines = fs.readFileSync('app.js', 'utf8').split('\n');
let res = -1;
for(let i=4645; i<4660; i++) {
    if(lines[i].includes('if (skillObj.name === "Bone Storm") {')) {
        res = i;
        break;
    }
}
if(res !== -1) {
    lines.splice(res, 0, 
        '    if (skillObj.name === "Path of Darkness" || str.includes("Corrupting damage")) {',
        '        str = str.replace(/\\[\\{dot:tooltip_dot\\}[\\s\\.,\\d]*?\\]|\\{dot:tooltip_dot\\}/g, (6.0 * rankMult * 100).toFixed(1) + "%");',
        '    }'
    );
    fs.writeFileSync('app.js', lines.join('\n'));
    console.log('Successfully added Path of Darkness fallback');
}
