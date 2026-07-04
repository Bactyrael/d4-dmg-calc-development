const fs = require('fs');

// Patch skills.js
let skillsContent = fs.readFileSync('assets/skills.js', 'utf8');

skillsContent = skillsContent.replace(
  /"name": "Soulrift",\s*"tags": \[/g,
  '"name": "Soulrift",\n          "isHit": false,\n          "tags": ['
);

fs.writeFileSync('assets/skills.js', skillsContent);
console.log('Patched skills.js with isHit: false for Soulrift');

// Patch app.js
let appContent = fs.readFileSync('app.js', 'utf8');

// 1. Copy isHit in applyActiveModifiers
appContent = appContent.replace(
  /let modified = \{ \.\.\.baseSkillObj, baseName: baseSkillObj\.name \};/g,
  'let modified = { ...baseSkillObj, baseName: baseSkillObj.name };\n    if (baseSkillObj.isHit !== undefined) modified.isHit = baseSkillObj.isHit;'
);

// 2. Modifier merge
appContent = appContent.replace(
  /if \(mod\.baseDamageScalar !== undefined\) \{\s*modified\.baseDamageScalar = mod\.baseDamageScalar;\s*\}/g,
  'if (mod.baseDamageScalar !== undefined) {\n                    modified.baseDamageScalar = mod.baseDamageScalar;\n                }\n                if (mod.isHit !== undefined) modified.isHit = mod.isHit;'
);

// 3. calculateSkillAdditiveBucket
appContent = appContent.replace(
  /if \(isHit === undefined\) isHit = \!\['Soulrift', 'Decompose', 'Blighted Corpse Explosion'\]\.includes\(skill\.baseName \|\| skill\.name\);/g,
  'if (isHit === undefined) isHit = skill.isHit !== undefined ? skill.isHit : ![\'Decompose\', \'Blighted Corpse Explosion\'].includes(skill.baseName || skill.name);'
);

// 4. getSkillDamageBreakdown
appContent = appContent.replace(
  /if \(isHit === undefined\) isHit = \!\['Soulrift', 'Decompose', 'Blighted Corpse Explosion'\]\.includes\(skillObj\.baseName \|\| skillObj\.name\);/g,
  'if (isHit === undefined) isHit = skillObj.isHit !== undefined ? skillObj.isHit : ![\'Decompose\', \'Blighted Corpse Explosion\'].includes(skillObj.baseName || skillObj.name);'
);

// 5. Secondary Scalars logic
appContent = appContent.replace(
  /secSkill\.baseDamageScalar = scalarVal;\s*let isHit = \!key\.toLowerCase\(\)\.includes\('dot'\);/g,
  'secSkill.baseDamageScalar = scalarVal;\n                                    let isHit = (typeof val === \'object\' && val.isHit !== undefined) ? val.isHit : !key.toLowerCase().includes(\'dot\');'
);

fs.writeFileSync('app.js', appContent);
console.log('Patched app.js to respect explicit isHit booleans');
