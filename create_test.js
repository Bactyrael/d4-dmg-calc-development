const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
let fn = content.substring(content.indexOf('function calculateSkillMultiplicativeBucket'), content.indexOf('function getSkillDamageBreakdown'));
let lines = fn.split('\n');
for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/applies = true/g, 'applies = true; console.log("Line " + ' + (i + 7631) + ');');
}
let script = lines.join('\n');
script += `
let skill = {
    name: 'Skeleton Warrior',
    tags: ['Skill_Primary_Summoning', 'Skill_Primary_Corpse'],
    dType: 'Physical'
};
global.window = {
    D4_COMPILED_STATS: {
        'Skill: Corpse Explosion (Bloody Mess) Damage [x]': {final: 50}
    }
};
global.getActiveBuffs = () => ({overpower: 0});
global.getActiveConditions = () => ({vulnerable: true, close: true, corpsesNearby: true, shadowDot: false, cc: false, cursed: false});
console.log(calculateSkillMultiplicativeBucket(skill));
`;
fs.writeFileSync('test_multi6.js', script);
