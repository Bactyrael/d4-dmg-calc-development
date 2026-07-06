const fs = require('fs');
eval(fs.readFileSync('assets/skills.js', 'utf8').replace('const skillsDatabase =', 'global.skillsDatabase ='));
const appJs = fs.readFileSync('app.js', 'utf8');

global.window = {
    selectedSkills: { 'Hemorrhage': 1, 'Blood Boil': 1, 'Cast Speed': 1 },
    skillSliderValues: {},
    NECRO_ICONS: new Set(),
    D4_COMPILED_STATS: {}
};
global.document = { createElement: () => ({ style: {}, appendChild: () => {} }) };

let getSkillBreakdown = appJs.substring(appJs.indexOf('function getSkillDamageBreakdown'), appJs.indexOf('function generateTooltipHTML'));
eval(getSkillBreakdown);

let updateDamageBreakdownStr = appJs.substring(appJs.indexOf('function updateDamageBreakdown'), appJs.indexOf('function calculateSkillCritChance'));
// To avoid dom manipulation errors, we just evaluate the IIFE inside updateDamageBreakdownStr.
let iifeMatch = updateDamageBreakdownStr.match(/\$\{\(\(\) => \{([\s\S]*?)return html;\n\s*\}\)\(\)\}\s*\$\{\(\(\) => \{([\s\S]*?)return [\s\S]*?\}\)\(\)\}/);
if (iifeMatch) {
    let iifeBody = iifeMatch[2];
    // setup environment for iife
    let displayImgName = 'Blood Boil';
    window.D4_COMPILED_STATS = {
        'Skill: Blood Boil (Cast Speed) [+]': { final: 20, flatSources: [{name: 'Cast Speed (Upgrade)', val: 20}] },
        'Attack Speed': { final: 15, flatSources: [] },
        'Cast Speed': { final: 0, flatSources: [] }
    };
    
    let fn = new Function('displayImgName', iifeBody + '\nreturn csDetails;');
    console.log(fn(displayImgName));
} else {
    console.log('IIFE not found');
}
