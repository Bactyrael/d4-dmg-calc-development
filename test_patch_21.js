const fs = require('fs');

let appContent = fs.readFileSync('app.js', 'utf8');

appContent = appContent.replace(
  /let modified = \{ \.\.\.baseSkillObj \};/g,
  'let modified = { ...baseSkillObj, baseName: baseSkillObj.name };'
);

appContent = appContent.replace(
  /!\['Soulrift', 'Decompose', 'Blighted Corpse Explosion'\]\.includes\(skill\.name\)/g,
  '![\'Soulrift\', \'Decompose\', \'Blighted Corpse Explosion\'].includes(skill.baseName || skill.name)'
);

appContent = appContent.replace(
  /!\['Soulrift', 'Decompose', 'Blighted Corpse Explosion'\]\.includes\(skillObj\.name\)/g,
  '![\'Soulrift\', \'Decompose\', \'Blighted Corpse Explosion\'].includes(skillObj.baseName || skillObj.name)'
);

fs.writeFileSync('app.js', appContent);
console.log('Patched baseName logic');
