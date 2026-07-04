const fs = require('fs');
let lines = fs.readFileSync('app.js', 'utf8').split('\n');
let res = -1;
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes('for (let [k, v] of Object.entries(pStats)) {')) {
        res = i;
        break;
    }
}
if(res !== -1) {
    lines.splice(res + 2, 0,
        '                const statRenameMap = {',
        '                    "Shadow damage": "Shadow Damage",',
        '                    "Bone damage": "Bone Damage",',
        '                    "Blood damage": "Blood Damage",',
        '                    "Physical damage": "Physical Damage",',
        '                    "Cold damage": "Cold Damage",',
        '                    "Poison damage": "Poison Damage",',
        '                    "Lightning damage": "Lightning Damage",',
        '                    "Fire damage": "Fire Damage",',
        '                    "Non-Physical damage": "Non-Physical Damage",',
        '                    "Physical damage over time": "Physical Damage Over Time",',
        '                    "Shadow damage over time": "Shadow Damage Over Time"',
        '                };',
        '                if (statRenameMap[statName]) statName = statRenameMap[statName];'
    );
    fs.writeFileSync('app.js', lines.join('\n'));
    console.log('Successfully injected statRenameMap');
}
