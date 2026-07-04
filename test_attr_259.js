const fs = require('fs');
let pCode = fs.readFileSync('paragon_logic.js', 'utf8');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<html><body></body></html>', { runScripts: 'dangerously' });
let d4data = fs.readFileSync('maxroll_data.json', 'utf8');
dom.window.D4_PARAGON_DATA = JSON.parse(d4data);
let formData = fs.readFileSync('data/formulas.js', 'utf8');
dom.window.eval(formData);
dom.window.eval(pCode);
dom.window.eval(`
  console.log('Attribute 259:', window.D4_PARAGON_FORMULAS.attributes[259]);
  if (window.D4_PARAGON_FORMULAS.attributes[259]) {
      console.log('Desc:', window.D4_PARAGON_FORMULAS.attributeDescriptions[window.D4_PARAGON_FORMULAS.attributes[259].name]);
  }
`);
