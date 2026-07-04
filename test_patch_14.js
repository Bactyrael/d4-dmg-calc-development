const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

// 1. Modify calculateSkillAdditiveBucket signature and isDot
content = content.replace(
    /function calculateSkillAdditiveBucket\(skill\) \{/,
    "function calculateSkillAdditiveBucket(skill, isDotOverride) {"
);

content = content.replace(
    /let isDot = tags\.includes\('search_dot'\) \|\| tags\.includes\('search_shadowdot'\);/,
    "let isDot = isDotOverride !== undefined ? isDotOverride : ['Soulrift', 'Decompose', 'Blighted Corpse Explosion'].includes(skill.name);"
);

// 2. Modify getSkillDamageBreakdown to use isDot
content = content.replace(
    /let addData = typeof calculateSkillAdditiveBucket === 'function' \? calculateSkillAdditiveBucket\(skillObj\) : \{ total: 0, components: \[\] \};/,
    "let isDot = skillObj.isComponentDot !== undefined ? skillObj.isComponentDot : ['Soulrift', 'Decompose', 'Blighted Corpse Explosion'].includes(skillObj.name);\n    let addData = typeof calculateSkillAdditiveBucket === 'function' ? calculateSkillAdditiveBucket(skillObj, isDot) : { total: 0, components: [] };"
);

// 3. Modify getSkillDamageBreakdown return
content = content.replace(
    /isDot: \(skillObj\.tags \|\| \[\]\)\.map\(t => t\.toLowerCase\(\)\)\.includes\('search_dot'\) \|\| \(skillObj\.tags \|\| \[\]\)\.map\(t => t\.toLowerCase\(\)\)\.includes\('search_shadowdot'\),/,
    "isDot: isDot,"
);

// 4. Set isComponentDot for secondary scalars
content = content.replace(
    /secSkill\.baseDamageScalar = scalarVal;\s*let b2 = getSkillDamageBreakdown\(secSkill, rank\);/,
    "secSkill.baseDamageScalar = scalarVal;\n                                    secSkill.isComponentDot = !canCrit;\n                                    let b2 = getSkillDamageBreakdown(secSkill, rank);"
);

fs.writeFileSync('app.js', content);
console.log('Successfully patched app.js for component-level isDot isolation');
