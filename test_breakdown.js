const fs = require('fs');
const appJs = fs.readFileSync('app.js', 'utf8');

let updateDamageBreakdownFunc = appJs.substring(appJs.indexOf('function updateDamageBreakdown'), appJs.indexOf('function updateDisplay'));

console.log('updateDamageBreakdown found, length:', updateDamageBreakdownFunc.length);
