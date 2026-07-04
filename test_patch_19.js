const fs = require('fs');

let appContent = fs.readFileSync('app.js', 'utf8');

appContent = appContent.replace(
  /if \(lowerKey\.includes\('cult leader'\)\) \{\s*if \(\(tags\.some\(t => t\.includes\('summon'\)\) \|\| skill\.name\.toLowerCase\(\)\.includes\('golem'\) \|\| skill\.name\.toLowerCase\(\)\.includes\('mage'\) \|\| skill\.name\.toLowerCase\(\)\.includes\('warrior'\)\) && !skill\.name\.toLowerCase\(\)\.includes\('army of the dead'\)\) applies = true;\s*\}/g,
  'if (lowerKey.includes(\'cult leader\')) {\n                let sName = skill.name.toLowerCase();\n                if (sName.includes(\'golem\') || sName.includes(\'mage\') || sName.includes(\'warrior\')) applies = true;\n            }'
);

fs.writeFileSync('app.js', appContent);
console.log('Patched Cult Leader logic');
