const fs = require('fs');
let content = fs.readFileSync('assets/skills.js', 'utf8');

content = content.replace(
  /"name": "Soul Vortex",\s*"tags": \[\s*"Search_Damage",\s*"Search_CrowdControl"\s*\],\s*"description": "[^"]*",\s*"maxRank": 1,\s*"baseDamageScalar": 0.25/,
  '"name": "Soul Vortex",\n          "tags": [\n            "Search_Damage",\n            "Search_CrowdControl"\n          ],\n          "description": "{c_important}Soulrift{/c} is cast at the target location. Absorbing an enemy\'s soul deals {c_number}[{payload:soul_absorb_damage}|2?|]{/c} damage and Pulls them in.",\n          "maxRank": 1,\n          "secondaryScalars": { "soul_absorb_damage": 0.25 }'
);

fs.writeFileSync('assets/skills.js', content);
console.log('Successfully patched Soul Vortex in skills.js');
