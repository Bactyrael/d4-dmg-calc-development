const fs = require('fs');
let lines = fs.readFileSync('app.js', 'utf8').split('\n');
let res = -1;
for(let i=7380; i<lines.length; i++) {
    if(lines[i].includes("if (lowerKey.includes('cult leader')) {")) {
        res = i;
        break;
    }
}
if(res !== -1) {
    lines[res+1] = "                if ((tags.some(t => t.includes('summon')) || skill.name.toLowerCase().includes('golem') || skill.name.toLowerCase().includes('mage') || skill.name.toLowerCase().includes('warrior')) && !skill.name.toLowerCase().includes('army of the dead')) applies = true;";
    fs.writeFileSync('app.js', lines.join('\n'));
    console.log('Successfully excluded Army of the Dead from Cult Leader');
}
