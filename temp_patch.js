const fs = require('fs'); 
const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8')); 
const thresholds = data.paragonThresholds; 
const formulaData = fs.readFileSync('assets/paragon_formulas.js', 'utf8'); 
const out = formulaData.replace('};', ',"paragonThresholds": ' + JSON.stringify(thresholds) + '};'); 
fs.writeFileSync('assets/paragon_formulas.js', out);
