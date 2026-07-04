const fs = require('fs');
let lines = fs.readFileSync('app.js', 'utf8').split('\n');
let res = -1;
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes("addStat('Skeletal Mage Damage');")) {
        res = i;
        break;
    }
}
if(res !== -1) {
    lines[res] = lines[res].replace("addStat('Skeletal Mage Damage');", "addStat('Skeletal Mage Damage'); addStat('Skeleton Mage Damage');");
    lines[res+1] = lines[res+1].replace("addStat('Skeletal Warrior Damage');", "addStat('Skeletal Warrior Damage'); addStat('Skeleton Warrior Damage');");
    fs.writeFileSync('app.js', lines.join('\n'));
    console.log('Successfully injected Skeleton fixes');
}
