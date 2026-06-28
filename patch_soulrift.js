const fs = require('fs');
let s = fs.readFileSync('assets/skills.js','utf8');

const oldSoulrift = `"enhancement": {
        "name": "Enhanced Soulrift",
        "maxRank": 1,
        "branches": [
          {
            "name": "Distilled Anima",
            "maxRank": 1
          },
          {
            "name": "Soul Vortex",
            "maxRank": 1
          },
          {
            "name": "Frozen Wasteland",
            "maxRank": 1
          }
        ]
      }`;

const newSoulrift = `"modifiers": [
        { "name": "Enhanced Soulrift", "maxRank": 1 },
        { "name": "Supreme Soulrift", "maxRank": 1 },
        { "name": "Prime Soulrift", "maxRank": 1 },
        { "name": "Distilled Anima", "maxRank": 1 },
        { "name": "Soul Vortex", "maxRank": 1 },
        { "name": "Frozen Wasteland", "maxRank": 1 },
        { "name": "Final Soulrift", "maxRank": 1 }
      ]`;

s = s.replace(oldSoulrift, newSoulrift);
fs.writeFileSync('assets/skills.js', s);
console.log("Patched Soulrift modifiers in skills.js");
