const fs = require('fs');
let data = fs.readFileSync('maxroll_data.json', 'utf8');
let d4 = JSON.parse(data);

let legPowers = {};
Object.values(d4.paragonNodes).forEach(n => {
    if (n && n.power && d4.skills[n.power]) {
        legPowers[n.power] = { desc: d4.skills[n.power].desc };
    }
});

let formulas = fs.readFileSync('assets/paragon_formulas.js', 'utf8');
if (!formulas.includes('"legendaryPowers"')) {
    let injectStr = `\n    "legendaryPowers": ` + JSON.stringify(legPowers, null, 4) + `,`;
    formulas = formulas.replace('window.D4_PARAGON_FORMULAS = {', 'window.D4_PARAGON_FORMULAS = {' + injectStr);
    fs.writeFileSync('assets/paragon_formulas.js', formulas);
    console.log('Injected legendary powers into paragon_formulas.js');
}

let logic = fs.readFileSync('paragon_logic.js', 'utf8');
let logicTarget = `if (nData.attributes) {`;
let logicInject = `if (nData.power && window.D4_PARAGON_FORMULAS.legendaryPowers && window.D4_PARAGON_FORMULAS.legendaryPowers[nData.power]) {
          let rawDesc = window.D4_PARAGON_FORMULAS.legendaryPowers[nData.power].desc;
          // clean the description
          rawDesc = rawDesc.replace(/\\{c_[^}]+\\}/g, '').replace(/\\{\\/c\\}/g, '').replace(/\\\\\\[x\\\\\\]/g, '[x]');
          html += \`<div style="margin-bottom: 8px; color: #c9a55c; font-style: italic;">
              \${rawDesc}
          </div>\`;
      }
      
      `;
if (!logic.includes('nData.power && window.D4_PARAGON_FORMULAS.legendaryPowers')) {
    logic = logic.replace(logicTarget, logicInject + logicTarget);
    fs.writeFileSync('paragon_logic.js', logic);
    console.log('Updated paragon_logic.js with legendary desc renderer');
}
