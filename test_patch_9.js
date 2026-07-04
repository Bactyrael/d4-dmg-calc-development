const fs = require('fs');
let content = fs.readFileSync('assets/skills.js', 'utf8');

// Update Soulrift baseDamageScalar
content = content.replace(
  /"name": "Soulrift",\s*"tags": \[\s*"Skill_Shadow",\s*"Search_ResourceEssence",\s*"Search_Damage",\s*"Search_Cooldown",\s*"Search_Shadow",\s*"Search_ShadowDOT"\s*\],\s*"baseDamageScalar": 0.1,/,
  '"name": "Soulrift",\n      "tags": [\n        "Skill_Shadow",\n        "Search_ResourceEssence",\n        "Search_Damage",\n        "Search_Cooldown",\n        "Search_Shadow",\n        "Search_ShadowDOT"\n      ],\n      "baseDamageScalar": 3.0,'
);

// Update Soul Vortex secondaryScalars
content = content.replace(
  /"name": "Soul Vortex",\s*"tags": \[\s*"Search_Damage",\s*"Search_CrowdControl"\s*\],\s*"description": "\{c_important\}Soulrift\{.*\} deals \{c_number\}\[\{payload:soul_absorb_damage\}\|2\?\|\]\{.*\} damage and Pulls them in.",\s*"maxRank": 1,\s*"baseDamageScalar": 0.25/,
  '"name": "Soul Vortex",\n          "tags": [\n            "Search_Damage",\n            "Search_CrowdControl"\n          ],\n          "description": "{c_important}Soulrift{/c} is cast at the target location. Absorbing an enemy\'s soul deals {c_number}[{payload:soul_absorb_damage}|2?|]{/c} damage and Pulls them in.",\n          "maxRank": 1,\n          "secondaryScalars": { "soul_absorb_damage": 0.25 }'
);

// Update Frozen Wasteland secondaryScalars
content = content.replace(
  /"name": "Frozen Wasteland",\s*"tags": \[\s*"Damage_Override_Cold",\s*"Search_Damage",\s*"Keyword_Chill",\s*"Keyword_Freeze",\s*"Search_Cold"\s*\],\s*"description": "\{c_important\}Soulrift.*explode for \{c_number\}\[\{payload:frozen_damage\}\|2\?\|\]\{.*\} damage.",\s*"maxRank": 1,\s*"baseDamageScalar": 0.75/,
  '"name": "Frozen Wasteland",\n          "tags": [\n            "Damage_Override_Cold",\n            "Search_Damage",\n            "Keyword_Chill",\n            "Keyword_Freeze",\n            "Search_Cold"\n          ],\n          "description": "{c_important}Soulrift{/c} deals Frostbite damage and {c_important}{u}Chills{/c}{/u} for {c_number}30%{/c} every second. \\n\\nIf {c_important}Soulrift{/c} absorbs the soul of a {c_important}{u}Frozen{/c}{/u} enemy, they shatter and explode for {c_number}[{payload:frozen_damage}|2?|]{/c} damage.",\n          "maxRank": 1,\n          "secondaryScalars": { "frozen_damage": 0.75 }'
);

fs.writeFileSync('assets/skills.js', content);
console.log('Successfully patched skills.js for Soul Rift');
