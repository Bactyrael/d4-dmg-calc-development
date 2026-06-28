const fs = require('fs');
let skillsData = fs.readFileSync('assets/skills.js', 'utf8').replace('const skillsDatabase = ', 'global.skillsDatabase = ').replace(/;$/, '');
eval(skillsData);
let count = 0;
for (let cat in global.skillsDatabase) {
    let s = global.skillsDatabase[cat].find(x => x.name === "Skeleton Warrior");
    if (s) {
        console.log(`Found in category: ${cat}`);
        count++;
    }
}
console.log(`Total found: ${count}`);
