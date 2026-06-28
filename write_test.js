const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const prefix = `
global.window = {
    D4_DATABASE: { aspects: [{name: 'Test Aspect', desc: 'test'}], itemDatabase: {}, classData: { Necromancer: { equipment: { ring: { modifiers: [] } } } } },
    equippedItems: { 'Ring': { name: 'Test Ring', aspect: 'Test Aspect', aspectValues: [50] } }
};
global.document = {
    getElementById: (id) => ({ textContent: 'Necromancer', value: '90', addEventListener: () => {} }),
    querySelectorAll: () => [],
    createElement: () => ({ classList: {add: ()=>{}}, appendChild: ()=>{}, style: {} }),
    addEventListener: () => {}
};
global.localStorage = { getItem: () => null, setItem: () => {} };
`;

const postfix = `
try {
    const auto = calculateAutoStats(90);
    const result = compileCharacterStats(window.equippedItems, auto);
    console.log("Keys:", Object.keys(result).length);
} catch(e) {
    console.error("COMPILE ERROR:", e.stack);
}
`;

// Replace all DOM initialization to prevent errors during evaluation
appJs = appJs.replace(/function start\(\) \{[\s\S]*?\}\s*document\.addEventListener\('DOMContentLoaded', start\);/g, '');
appJs = appJs.replace(/document\.addEventListener\('DOMContentLoaded', init\);/g, '');
appJs = appJs.replace(/const dom = \{[\s\S]*?\};\n/g, 'const dom = {};\n');
appJs = appJs.replace(/document\.querySelectorAll\('.aspect-val-input'\)\.forEach\([\s\S]*?\}\);/g, '');

fs.writeFileSync('test_compile.js', prefix + appJs + postfix, 'utf8');
