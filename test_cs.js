const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'outside-only' });
const window = dom.window;
window.selectedSkills = {};
window.skillSliderValues = {};
window.currentBuild = { equipment: { head: { name: 'Gospel of the Devotee' } } };
window.D4_DATABASE = { classData: { Necromancer: { skills: { Basic: [] } } } };
window.calculateAutoStats = () => ({ baseStr: 10, baseInt: 10, baseWil: 10, baseDex: 10 });
window.getActiveLegendaryPowers = () => [];
window.getEquippedWeaponSpeed = () => 1.0;

const appCode = fs.readFileSync('app.js', 'utf8');
try { window.eval(appCode); } catch(e) {}

let stats = {};
window.compileCharacterStats(stats);
console.log('isSkillActiveNode Cast Speed:', window.isSkillActiveNode('Cast Speed (Hemorrhage)'));
console.log('Final Stats for Hemorrhage Cast Speed:', stats['Skill: Hemorrhage (Cast Speed)']);
