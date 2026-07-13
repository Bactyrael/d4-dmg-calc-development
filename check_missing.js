const fs = require('fs');
const js = fs.readFileSync('assets/database.js', 'utf8');

const m = js.match(/window\.D4_DATABASE,\s*(\{[\s\S]*\})\s*\);/);
if (m) {
    try {
        const db = JSON.parse(m[1].replace(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '$1"$3":').replace(/'/g, '"'));
        // Wait, JSON.parse will fail on JS objects
    } catch(e) {}
}

// Let's just use eval to safely get the object keys
const script = `
let window = { D4_DATABASE: {} };
${js.substring(0, js.length - 12)}
console.log("Barbarian slots:", Object.keys(window.D4_DATABASE.classData.Barbarian.equipment));
console.log("Necromancer Helm keys:", Object.keys(window.D4_DATABASE.classData.Necromancer.equipment.Helm || {}));
`;
fs.writeFileSync('test_eval.js', script);
