const fs = require('fs');
let content = fs.readFileSync('assets/skills.js', 'utf8');

// Replace Soul Vortex secondaryScalars
content = content.replace(
  /"secondaryScalars": \{ "soul_absorb_damage": 0.25 \}/,
  '"secondaryScalars": { "soul_absorb_damage": { "scalar": 0.25, "tags": ["Skill_Shadow", "Search_Damage", "Search_Shadow"] } }'
);

// Replace Frozen Wasteland secondaryScalars
content = content.replace(
  /"secondaryScalars": \{ "frozen_damage": 0.75 \}/,
  '"secondaryScalars": { "frozen_damage": { "scalar": 0.75, "tags": ["Damage_Override_Cold", "Search_Damage", "Search_Cold"] } }'
);

fs.writeFileSync('assets/skills.js', content);
console.log('Successfully patched skills.js for direct damage secondary scalars');
