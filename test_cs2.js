const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously' });
const window = dom.window;

// Wait a tiny bit for scripts to load if any
setTimeout(() => {
    try {
        window.currentBuild = { equipment: { head: { name: 'Gospel of the Devotee' } } };
        window.selectedSkills = {}; 
        
        let stats = window.compileCharacterStats({}, { baseStr: 10, levelStr: 10, baseInt: 10, levelInt: 10, baseWil: 10, levelWil: 10, baseDex: 10, levelDex: 10 });
        let csStats = stats['Skill: Hemorrhage (Cast Speed)'];
        console.log('CS Stats:', csStats);
    } catch(e) {
        console.error('Error:', e);
    }
}, 500);
