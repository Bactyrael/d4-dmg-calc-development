const fs = require('fs');
let lines = fs.readFileSync('app.js', 'utf8').split('\n');
let res = -1;
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes("addStat('Minion Damage');")) {
        res = i;
        break;
    }
}
if(res !== -1) {
    lines.splice(res + 1, 0,
        "        if (skill.name && skill.name.toLowerCase().includes('golem')) addStat('Golem Damage');",
        "        if (skill.name && skill.name.toLowerCase().includes('mage')) addStat('Skeletal Mage Damage');",
        "        if (skill.name && skill.name.toLowerCase().includes('warrior')) addStat('Skeletal Warrior Damage');"
    );
    fs.writeFileSync('app.js', lines.join('\n'));
    console.log('Successfully injected Minion specifics');
}
