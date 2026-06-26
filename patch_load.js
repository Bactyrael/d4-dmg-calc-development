const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regexLoad = /renderLegendaryBonusInputs\(b\.class \|\| 'Barbarian', legBonuses\);\s*renderEquipment\(dom\.classSelect \? dom\.classSelect\.value : 'Barbarian', \{\}\);/g;

if (regexLoad.test(code)) {
    code = code.replace(regexLoad, `renderLegendaryBonusInputs(b.class || 'Barbarian', legBonuses);
    renderEquipment(dom.classSelect ? dom.classSelect.value : 'Barbarian', b.equipment || {});`);
    fs.writeFileSync('app.js', code);
    console.log("Fixed loadBuildToUI!");
} else {
    console.log("Could not find regex in app.js");
}
