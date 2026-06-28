const fs = require('fs');
eval(fs.readFileSync('app.js', 'utf8')); // Load all functions from app.js
const skillsContent = fs.readFileSync('assets/skills.js', 'utf8');
const match = skillsContent.match(/"name": "Golem",[\s\S]*?"description": "(.*?)"/);
if (match) {
    let rawDesc = match[1];
    let skillObj = { name: 'Golem', baseDamageScalar: 1.25 };
    
    // Test Bone Golem
    global.currentBuild = { bookOfTheDead: { golems: { spec: 'Bone Golem', node: 1 } } };
    let parsed1 = parseD4String(rawDesc, skillObj, 1);
    console.log('--- BONE GOLEM ---');
    console.log(parsed1);
    
    // Test Blood Golem
    global.currentBuild = { bookOfTheDead: { golems: { spec: 'Blood Golem', node: 1 } } };
    let parsed2 = parseD4String(rawDesc, skillObj, 1);
    console.log('\n--- BLOOD GOLEM ---');
    console.log(parsed2);
    
    // Test Iron Golem
    global.currentBuild = { bookOfTheDead: { golems: { spec: 'Iron Golem', node: 1 } } };
    let parsed3 = parseD4String(rawDesc, skillObj, 1);
    console.log('\n--- IRON GOLEM ---');
    console.log(parsed3);
}
