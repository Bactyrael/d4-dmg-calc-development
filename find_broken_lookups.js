const fs = require('fs');

// 1. Get renamed skills from assets/skills.js
const skillsContent = fs.readFileSync('assets/skills.js', 'utf8');
const renamedRegex = /"name":\s*"([^"]*\([^"]+\)[^"]*)"/g;
const renamedSkills = new Set();
let match;
while (match = renamedRegex.exec(skillsContent)) {
    renamedSkills.add(match[1]);
}

// 2. Parse app.js to find window.selectedSkills lookups
const appContent = fs.readFileSync('app.js', 'utf8');
const lookupRegex = /window\.selectedSkills\[['"](.*?)['"]\]/g;
const lookups = new Set();
while (match = lookupRegex.exec(appContent)) {
    lookups.add(match[1]);
}

// 3. Find lookups in app.js that match the BASE name of a renamed skill
const brokenLookups = [];
for (let renamed of renamedSkills) {
    // e.g. "Crowd Control Damage Bonus (Blight)" -> "Crowd Control Damage Bonus"
    const baseNameMatch = renamed.match(/^(.*?)\s*\([^)]+\)$/);
    if (baseNameMatch) {
        const baseName = baseNameMatch[1].trim();
        if (lookups.has(baseName)) {
            brokenLookups.push({ baseName, renamed, foundInAppJS: baseName });
        }
    }
}

console.log("Broken lookups in app.js:");
brokenLookups.forEach(item => {
    console.log(`- '${item.baseName}' should probably be '${item.renamed}'`);
});
