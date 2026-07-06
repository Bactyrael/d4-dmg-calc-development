const fs = require('fs');
eval(fs.readFileSync('assets/skills.js', 'utf8'));
const appJs = fs.readFileSync('app.js', 'utf8');

global.document = {
    createElement: () => ({ style: {}, appendChild: () => {}, classList: { add: () => {} }, setAttribute: () => {} }),
    getElementById: (id) => ({ innerHTML: '', addEventListener: () => {}, appendChild: () => {}, style: {} }),
    querySelector: () => null
};
global.window = {
    selectedSkills: { 'Hemorrhage': 1, 'Blood Boil': 1, 'Cast Speed': 1 },
    D4_COMPILED_STATS: {},
    NECRO_ICONS: new Set(['blood-boil'])
};

let compileStatsFuncStr = appJs.substring(appJs.indexOf('function compileCharacterStats'), appJs.indexOf('function updateStatsPanel'));
let addStatFuncStr = appJs.substring(appJs.indexOf('function addStat'), appJs.indexOf('function addMultStat'));
eval(addStatFuncStr);
eval(compileStatsFuncStr.replace('function compileCharacterStats', 'global.compileCharacterStats = function compileCharacterStats'));

window.D4_COMPILED_STATS = global.compileCharacterStats({}, {});
console.log('Stats keys: ' + Object.keys(window.D4_COMPILED_STATS).filter(k => k.includes('Cast Speed')).join(', '));
console.log('Skill Cast Speed value: ' + (window.D4_COMPILED_STATS['Skill: Blood Boil (Cast Speed) [+]'] ? window.D4_COMPILED_STATS['Skill: Blood Boil (Cast Speed) [+]'].final : 'undefined'));

let displayImgName = 'Blood Boil';
let skillCsKey = \Skill: \ (Cast Speed) [+]\;
console.log('skillCsKey: ' + skillCsKey);
console.log('Match: ' + (window.D4_COMPILED_STATS[skillCsKey] !== undefined));
