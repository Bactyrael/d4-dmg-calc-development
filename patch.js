const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// The replacement logic:
app = app.replace(
    /function calculateSkillMultiplicativeBucket[\s\S]*?const tags = \(skill\.tags \|\| \[\]\)\.map\(t => t\.toLowerCase\(\)\);\r?\n\s*let dType = \(skill\.damageType \|\| ''\)\.toLowerCase\(\);/,
    match => {
        return match.replace(
            "const tags = (skill.tags || []).map(t => t.toLowerCase());",
            "const tags = (skill.tags || []).map(t => t.toLowerCase());\n    if (stats[\"Radament's Desecration Ultimate Tag\"] && tags.some(t => t.includes('ultimate'))) {\n        tags.push('skill_profane', 'skill_macabre');\n    }"
        );
    }
);

fs.writeFileSync('app.js', app);
console.log('Patched calculateSkillMultiplicativeBucket successfully!');
