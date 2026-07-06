const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
let fn = content.substring(content.indexOf('function compileCharacterStats'), content.indexOf('function generateTooltip'));
let script = `
global.addStat = function(statsObj, k, v, src) {
    statsObj[k] = {final: v, sources: [src]};
};
global.currentBuild = {
    class: 'Necromancer',
    skills: [{name: 'Bloody Mess', rank: 1}],
    stats: {},
    conditions: {},
    bookOfTheDead: {warriors: {spec: 'Defender', node: '1'}}
};
global.window = {
    selectedSkills: {'Bloody Mess': 1},
    skillsData: [
        {
            name: 'Corpse Explosion',
            modifiers: [{name: 'Bloody Mess', description: 'damage is increased by 50%[x]'}]
        }
    ],
    D4_COMPILED_STATS: {}
};
` + fn + `
compileCharacterStats({}, false);
console.log(Object.keys(global.window.D4_COMPILED_STATS).filter(k => k.includes('Bloody Mess')));
`;
fs.writeFileSync('test_compile.js', script);
