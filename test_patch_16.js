const fs = require('fs');

// Patch skills.js
let skillsContent = fs.readFileSync('assets/skills.js', 'utf8');

// Soulrift
skillsContent = skillsContent.replace(
  /"name": "Soulrift",\s*"tags": \[/g,
  '"name": "Soulrift",\n          "isDot": true,\n          "tags": ['
);

// Decompose
skillsContent = skillsContent.replace(
  /"name": "Decompose",\s*"tags": \[/g,
  '"name": "Decompose",\n          "isDot": true,\n          "tags": ['
);

// Blighted Corpse Explosion
skillsContent = skillsContent.replace(
  /"name": "Blighted Corpse Explosion",\s*"description":/g,
  '"name": "Blighted Corpse Explosion",\n          "isDot": true,\n          "description":'
);

fs.writeFileSync('assets/skills.js', skillsContent);
console.log('Patched skills.js');

// Patch app.js
let appContent = fs.readFileSync('app.js', 'utf8');

// 1. Modifier Merge
appContent = appContent.replace(
  /if \(mod\.baseDamageScalar !== undefined\) \{\s*modified\.baseDamageScalar = mod\.baseDamageScalar;\s*\}/g,
  'if (mod.baseDamageScalar !== undefined) {\n                    modified.baseDamageScalar = mod.baseDamageScalar;\n                }\n                if (mod.isDot !== undefined) {\n                    modified.isDot = mod.isDot;\n                }'
);

// 2. calculateSkillAdditiveBucket
appContent = appContent.replace(
  /function calculateSkillAdditiveBucket\(skill\) \{/g,
  'function calculateSkillAdditiveBucket(skill, isDotOverride) {'
);
appContent = appContent.replace(
  /let isDot = tags\.includes\('search_dot'\) \|\| tags\.includes\('search_shadowdot'\);/g,
  'let isDot = isDotOverride !== undefined ? isDotOverride : !!skill.isDot;'
);

// 3. getSkillDamageBreakdown
appContent = appContent.replace(
  /function getSkillDamageBreakdown\(skillObj, displayRank\) \{/g,
  'function getSkillDamageBreakdown(skillObj, displayRank, isDotOverride) {'
);
appContent = appContent.replace(
  /let addData = typeof calculateSkillAdditiveBucket === 'function' \? calculateSkillAdditiveBucket\(skillObj\) : \{ total: 0, components: \[\] \};/g,
  "let isDot = isDotOverride !== undefined ? isDotOverride : !!skillObj.isDot;\n    let addData = typeof calculateSkillAdditiveBucket === 'function' ? calculateSkillAdditiveBucket(skillObj, isDot) : { total: 0, components: [] };"
);
appContent = appContent.replace(
  /isDot: \(skillObj\.tags \|\| \[\]\)\.map\(t => t\.toLowerCase\(\)\)\.includes\('search_dot'\) \|\| \(skillObj\.tags \|\| \[\]\)\.map\(t => t\.toLowerCase\(\)\)\.includes\('search_shadowdot'\),/g,
  'isDot: isDot,'
);

// 4. Secondary Scalars call
appContent = appContent.replace(
  /secSkill\.baseDamageScalar = scalarVal;\s*let b2 = getSkillDamageBreakdown\(secSkill, rank\);/g,
  "secSkill.baseDamageScalar = scalarVal;\n                                    let canCrit = !key.toLowerCase().includes('dot');\n                                    let b2 = getSkillDamageBreakdown(secSkill, rank, !canCrit);"
);

// Remove the canCrit I added earlier if it's there
appContent = appContent.replace(
  /let addStr2 = Number\(\(\(b2\.additiveMult - 1\) \* 100\)\.toFixed\(6\)\);\s*let canCrit = !key\.toLowerCase\(\)\.includes\('dot'\);/g,
  'let addStr2 = Number(((b2.additiveMult - 1) * 100).toFixed(6));'
);

// Hide critical hit box for DoT main skills
appContent = appContent.replace(
  /<div style="font-size: 0\.95rem; color: #f9d85c; margin-bottom: 5px; display: flex; justify-content: space-between; font-weight: bold;">\s*<span>Critical Hit:<\/span> <span>\$\{b\.critStrMin\} - \$\{b\.critStrMax\}<\/span>\s*<\/div>/g,
  '${b.isDot ? \'\' : `<div style="font-size: 0.95rem; color: #f9d85c; margin-bottom: 5px; display: flex; justify-content: space-between; font-weight: bold;">\\n              <span>Critical Hit:</span> <span>${b.critStrMin} - ${b.critStrMax}</span>\\n            </div>`}'
);

fs.writeFileSync('app.js', appContent);
console.log('Patched app.js');
