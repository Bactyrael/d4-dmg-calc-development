const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Insert it before renderEquipment(dom.classSelect ? dom.classSelect.textContent : 'Barbarian', b.equipment || {});
if (app.includes("renderEquipment(dom.classSelect ? dom.classSelect.textContent : 'Barbarian', b.equipment || {});")) {
    app = app.replace(
        "renderEquipment(dom.classSelect ? dom.classSelect.textContent : 'Barbarian', b.equipment || {});",
        "if (typeof populateMainSkillSelect === 'function') populateMainSkillSelect();\n      renderEquipment(dom.classSelect ? dom.classSelect.textContent : 'Barbarian', b.equipment || {});"
    );
    fs.writeFileSync('app.js', app);
    console.log('Fixed populateMainSkillSelect call');
} else {
    console.log('Could not find injection point');
}
