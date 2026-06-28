const fs = require('fs');

let s = fs.readFileSync('assets/skills.js', 'utf8');
const prefix = 'const skillsDatabase = ';
const suffix = ';';
let jsonStr = s.substring(prefix.length);
if (jsonStr.endsWith(suffix)) jsonStr = jsonStr.substring(0, jsonStr.length - 1);
if (jsonStr.endsWith(';\n')) jsonStr = jsonStr.substring(0, jsonStr.length - 2);
if (jsonStr.endsWith(';\r\n')) jsonStr = jsonStr.substring(0, jsonStr.length - 3);

// Eval to object since it might have trailing stuff or not strict JSON
let data;
eval('data = ' + jsonStr);

let reap = data['Basic'].find(sk => sk.name === 'Reap');

// Sort the modifiers according to the user's preferred order
const desiredOrder = [
    'Chilled To The Bone',
    'Cull The Weak',
    'Harvest',
    'Ferocity',
    'Corpse Generation',
    'Essence Generation',
    'Critical Strike Chance'
];

reap.modifiers.sort((a, b) => {
    let idxA = desiredOrder.findIndex(d => a.name.includes(d) || d.includes(a.name));
    let idxB = desiredOrder.findIndex(d => b.name.includes(d) || d.includes(b.name));
    if (idxA === -1) idxA = 999;
    if (idxB === -1) idxB = 999;
    return idxA - idxB;
});

// For safety, rename them to exactly what the user typed so it's guaranteed to match if the original name was slightly different
for (let i = 0; i < desiredOrder.length; i++) {
    if (reap.modifiers[i]) {
        reap.modifiers[i].name = desiredOrder[i];
    } else {
        reap.modifiers.push({ name: desiredOrder[i], maxRank: 1 });
    }
}

const out = 'const skillsDatabase = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync('assets/skills.js', out, 'utf8');
console.log("Reordered Reap modifiers");
