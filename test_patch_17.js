const fs = require('fs');

let appContent = fs.readFileSync('app.js', 'utf8');

// Replacement 1
appContent = appContent.replace(
  /<div style="font-size: 0\.95rem; color: #f9d85c; margin-bottom: 5px; display: flex; justify-content: space-between; font-weight: bold;">\s*<span>Critical Hit:<\/span> <span>\$\{b\.critStrMin\} - \$\{b\.critStrMax\}<\/span>\s*<\/div>/g,
  '${!b.isHit ? \'\' : `<div style="font-size: 0.95rem; color: #f9d85c; margin-bottom: 5px; display: flex; justify-content: space-between; font-weight: bold;">\\n              <span>Critical Hit:</span> <span>${b.critStrMin} - ${b.critStrMax}</span>\\n            </div>`}'
);

// Replacement 2
appContent = appContent.replace(
  /function calculateSkillAdditiveBucket\(skill\) \{\s*if \(\!window\.D4_COMPILED_STATS\) return 0;/g,
  'function calculateSkillAdditiveBucket(skill, isHit) {\n    if (isHit === undefined) isHit = ![\'Soulrift\', \'Decompose\', \'Blighted Corpse Explosion\'].includes(skill.name);\n    if (!window.D4_COMPILED_STATS) return 0;'
);

// Replacement 3
appContent = appContent.replace(
  /\/\/ Generic Additives\s*addStat\('Damage'\);\s*if \(stats\['Damage Per Overpower Stack'\] && stats\['Damage Per Overpower Stack'\]\.final\) \{/g,
  '// Generic Additives\n    addStat(\'Damage\');\n        if (isHit && stats[\'Damage Per Overpower Stack\'] && stats[\'Damage Per Overpower Stack\'].final) {'
);

// Replacement 4
appContent = appContent.replace(
  /\/\/ DoT Additives\s*if \(tags\.includes\('search_dot'\) \|\| tags\.includes\('search_shadowdot'\)\) \{/g,
  '// DoT Additives\n    if (!isHit) {'
);

// Replacement 5
appContent = appContent.replace(
  /function getSkillDamageBreakdown\(skillObj, displayRank\) \{\s*let rank = displayRank \|\| 1;/g,
  'function getSkillDamageBreakdown(skillObj, displayRank, isHit) {\n    if (isHit === undefined) isHit = ![\'Soulrift\', \'Decompose\', \'Blighted Corpse Explosion\'].includes(skillObj.name);\n    let rank = displayRank || 1;'
);

// Replacement 6
appContent = appContent.replace(
  /let addData = typeof calculateSkillAdditiveBucket === 'function' \? calculateSkillAdditiveBucket\(skillObj\) : \{ total: 0, components: \[\] \};/g,
  'let addData = typeof calculateSkillAdditiveBucket === \'function\' ? calculateSkillAdditiveBucket(skillObj, isHit) : { total: 0, components: [] };'
);

// Replacement 7
appContent = appContent.replace(
  /rankMultiplier,\s*critStrMin,\s*critStrMax,/g,
  'rankMultiplier,\n        critStrMin,\n        isHit: isHit,\n        critStrMax,'
);

// Replacement 8
appContent = appContent.replace(
  /secSkill\.baseDamageScalar = scalarVal;\s*let b2 = getSkillDamageBreakdown\(secSkill, rank\);/g,
  'secSkill.baseDamageScalar = scalarVal;\n                                    let isHit = !key.toLowerCase().includes(\'dot\');\n                                    let b2 = getSkillDamageBreakdown(secSkill, rank, isHit);'
);

// Replacement 9
appContent = appContent.replace(
  /<details style="margin-left: 20px; font-size: 0\.9em; margin-bottom: 6px;">\s*<summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;">\s*<span style="color: #555;">└<\/span> Critical Hit: <span style="font-weight: bold;">\$\{critMinStr\} - \$\{critMaxStr\}<\/span>\s*<\/summary>\s*<div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">\s*<div style="font-size: 0\.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">\s*<span style="color: #555;">├<\/span> Base Critical Multiplier: x1\.5\s*<\/div>\s*\$\{\(b2\.critAdditiveComponents \|\| \[\]\)\.map\(comp => `<div style="font-size: 0\.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;"><span style="color: #555;">├<\/span> \$\{comp\.name\}: \+\$\{\(comp\.value \* 100\)\.toFixed\(1\)\.replace\('\.0', ''\)\}%<\/div>`\)\.join\(''\)\}\s*\$\{\(b2\.critMultiplicativeComponents \|\| \[\]\)\.map\(comp => `<div style="font-size: 0\.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;"><span style="color: #555;">├<\/span> \$\{comp\.name\.replace\('Skill: ', ''\)\}: x\$\{Number\(comp\.value\.toFixed\(4\)\)\}<\/div>`\)\.join\(''\)\}\s*<div style="font-size: 0\.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-top: 2px;">\s*<span style="color: #555;">├<\/span> Additive Critical Bonus: \+\$\{Number\(\(\(b2\.critAdditiveMult - b2\.additiveMult\) \* 100\)\.toFixed\(1\)\)\}%\s*<\/div>\s*<\/div>\s*<\/details>\s*<\/details>`;/g,
  '${!b2.isHit ? \'\' : `<details style="margin-left: 20px; font-size: 0.9em; margin-bottom: 6px;">\\n                                      <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;">\\n                                        <span style="color: #555;">└</span> Critical Hit: <span style="font-weight: bold;">${critMinStr} - ${critMaxStr}</span>\\n                                      </summary>\\n                                      <div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">\\n                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">\\n                                          <span style="color: #555;">├</span> Base Critical Multiplier: x1.5\\n                                        </div>\\n                                        ${(b2.critAdditiveComponents || []).map(comp => `<div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;"><span style="color: #555;">├</span> ${comp.name}: +${(comp.value * 100).toFixed(1).replace(\'.0\', \'\')}%</div>`).join(\'\')}\\n                                        ${(b2.critMultiplicativeComponents || []).map(comp => `<div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;"><span style="color: #555;">├</span> ${comp.name.replace(\'Skill: \', \'\')}: x${Number(comp.value.toFixed(4))}</div>`).join(\'\')}\\n                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-top: 2px;">\\n                                          <span style="color: #555;">├</span> Additive Critical Bonus: +${Number(((b2.critAdditiveMult - b2.additiveMult) * 100).toFixed(1))}%\\n                                        </div>\\n                                      </div>\\n                                    </details>`}\\n                                  </details>\`;'
);

// Replacement 10
appContent = appContent.replace(
  /<details style="margin-left: 20px; font-size: 0\.9em; margin-bottom: 6px;">\s*<summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;">\s*<span style="color: #555;">└<\/span> Critical Hit: <span style="font-weight: bold;">\$\{b\.critStrMin\} - \$\{b\.critStrMax\}<\/span>\s*<\/summary>\s*<div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">\s*<div style="font-size: 0\.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">\s*<span style="color: #555;">├<\/span> Base Critical Multiplier: x1\.5\s*<\/div>\s*\$\{\(b\.critAdditiveComponents \|\| \[\]\)\.map\(comp => `<div style="font-size: 0\.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;"><span style="color: #555;">├<\/span> \$\{comp\.name\}: \+\$\{\(comp\.value \* 100\)\.toFixed\(1\)\.replace\('\.0', ''\)\}%<\/div>`\)\.join\(''\)\}\s*\$\{\(b\.critMultiplicativeComponents \|\| \[\]\)\.map\(comp => `<div style="font-size: 0\.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;"><span style="color: #555;">├<\/span> \$\{comp\.name\.replace\('Skill: ', ''\)\}: x\$\{Number\(comp\.value\.toFixed\(4\)\)\}<\/div>`\)\.join\(''\)\}\s*<div style="font-size: 0\.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-top: 2px;">\s*<span style="color: #555;">├<\/span> Additive Critical Bonus: \+\$\{Number\(\(\(b\.critAdditiveMult - b\.additiveMult\) \* 100\)\.toFixed\(1\)\)\}%\s*<\/div>\s*<\/div>\s*<\/details>\s*<\/details>`;/g,
  '${!b.isHit ? \'\' : `<details style="margin-left: 20px; font-size: 0.9em; margin-bottom: 6px;">\\n                                      <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;">\\n                                        <span style="color: #555;">└</span> Critical Hit: <span style="font-weight: bold;">${b.critStrMin} - ${b.critStrMax}</span>\\n                                      </summary>\\n                                      <div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">\\n                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">\\n                                          <span style="color: #555;">├</span> Base Critical Multiplier: x1.5\\n                                        </div>\\n                                        ${(b.critAdditiveComponents || []).map(comp => `<div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;"><span style="color: #555;">├</span> ${comp.name}: +${(comp.value * 100).toFixed(1).replace(\'.0\', \'\')}%</div>`).join(\'\')}\\n                                        ${(b.critMultiplicativeComponents || []).map(comp => `<div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;"><span style="color: #555;">├</span> ${comp.name.replace(\'Skill: \', \'\')}: x${Number(comp.value.toFixed(4))}</div>`).join(\'\')}\\n                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-top: 2px;">\\n                                          <span style="color: #555;">├</span> Additive Critical Bonus: +${Number(((b.critAdditiveMult - b.additiveMult) * 100).toFixed(1))}%\\n                                        </div>\\n                                      </div>\\n                                    </details>`}\\n                                  </details>\`;'
);

fs.writeFileSync('app.js', appContent);
console.log('Successfully written app.js patch');
