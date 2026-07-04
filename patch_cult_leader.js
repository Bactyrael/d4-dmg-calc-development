const fs = require('fs');
let lines = fs.readFileSync('app.js', 'utf8').split('\n');

// 1. Add Cult Leader to compiledStats
let res1 = -1;
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes("createMultiplicativeRow('Cult Leader (Legendary Node)', cultBonus.toFixed(2), true);")) {
        res1 = i;
        break;
    }
}
if(res1 !== -1) {
    lines.splice(res1 + 1, 0, "                      compiledStats['Cult Leader (Legendary Node)'] = { final: cultBonus, isMultiplicative: true };");
}

// 2. Add Cult Leader condition to calculateSkillMultiplicativeBucket
let res2 = -1;
for(let i=7380; i<lines.length; i++) {
    if(lines[i].includes("if (lowerKey === 'hulking monstrosity damage [x]') {")) {
        res2 = i;
        break;
    }
}
if(res2 !== -1) {
    lines.splice(res2, 0, 
        "            if (lowerKey.includes('cult leader')) {",
        "                if (tags.some(t => t.includes('summon')) || skill.name.toLowerCase().includes('golem') || skill.name.toLowerCase().includes('mage') || skill.name.toLowerCase().includes('warrior')) applies = true;",
        "            }"
    );
}

fs.writeFileSync('app.js', lines.join('\n'));
console.log('Cult Leader engine integration patched successfully.');
