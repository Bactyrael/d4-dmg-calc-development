const fs = require('fs');

global.window = { D4_DATABASE: {} };
global.document = {
    getElementById: (id) => ({ textContent: 'Necromancer', style: {}, addEventListener: () => {} }),
    querySelector: () => ({ dataset: { value: '{}' } }),
    querySelectorAll: () => []
};
global.D4_CLASS_MAP = { 'Necromancer': 4 };
global.getAffixCategory = () => 'Offensive';
global.getMaxSockets = () => 0;

eval(fs.readFileSync('assets/database.js', 'utf8'));

setTimeout(() => {
    // Read app.js but we only want to test the mapping logic in renderModifierTab
    const appJs = fs.readFileSync('app.js', 'utf8');
    
    // Extract the function
    let match = appJs.match(/function renderModifierTab[\s\S]*?dbItems = classData\.modifiers \|\| \[\];/);
    if (match) {
        console.log("Extracted code snippet:\n", match[0]);
    } else {
        console.log("Could not extract function.");
    }
}, 500);
