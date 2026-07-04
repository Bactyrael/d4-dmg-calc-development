const fs = require('fs');
let lines = fs.readFileSync('paragon_logic.js', 'utf8').split('\n');
let res = -1;
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes("'446956': 'Golem'")) {
        res = i;
        break;
    }
}
if(res !== -1) {
    lines[res] = "    '446956': 'Golem',";
    lines.splice(res + 1, 0, "    '94190265': 'Desecration'");
    fs.writeFileSync('paragon_logic.js', lines.join('\n'));
    console.log('Successfully added Desecration param to map');
}
