const fs = require('fs');
let content = fs.readFileSync('assets/skills.js', 'utf8');
content = content.replace('const skillsDatabase =', 'global.skillsDatabase =');
eval(content);

const keys = Object.keys(global.skillsDatabase);
let s1, s2, s3;
for (const k of keys) {
  const cat = global.skillsDatabase[k];
  if (!s1) s1 = cat.find(s => s.name === 'Skeleton Warrior');
  if (!s2) s2 = cat.find(s => s.name === 'Skeleton Mage');
  if (!s3) s3 = cat.find(s => s.name === 'Golem');
}

console.log('Warrior tags:', s1?.tags);
console.log('Mage tags:', s2?.tags);
console.log('Golem tags:', s3?.tags);
