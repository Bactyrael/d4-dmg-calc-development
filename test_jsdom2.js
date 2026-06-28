const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');
const dbJs = fs.readFileSync('assets/database.js', 'utf8');
const skillsJs = fs.readFileSync('assets/skills.js', 'utf8');

// remove external scripts
const htmlClean = html.replace(/<script src=".*?"><\/script>/g, '');

const dom = new JSDOM(htmlClean, {
  runScripts: "dangerously",
});

dom.window.eval(dbJs);
dom.window.eval(skillsJs);
dom.window.eval(appJs);

const window = dom.window;
const document = window.document;

// Simulate equipping transfigure
const equipGlove = () => {
    const box = document.querySelector('.equipment-slot-box[data-slot="gloves"]');
    const itemObj = {
        "name": "Gloves",
        "transfigure": ["+[8 - 9]% Lucky Hit Chance", "+[8 - 10]% Attack Speed"],
        "transfigureValues": [[9], [10]]
    };
    box.dataset.value = JSON.stringify(itemObj);
};

equipGlove();
window.calculate();

const luckyHit = document.getElementById('lucky-hit');
const atkSpeed = document.getElementById('attack-speed');

console.log("DOM Lucky Hit Value:", luckyHit.value);
console.log("DOM Attack Speed Value:", atkSpeed.value);

const stats = window.compileCharacterStats(window.getEquipmentValues(), {});
console.log("Compiled LHC:", stats['Lucky Hit Chance']);
console.log("Compiled AtkSpd:", stats['Attack Speed']);
