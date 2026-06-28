const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf-8');

// We will mock the DOM to run `calculate`
// Actually, it's easier to just scan app.js for syntax errors or glaring logic bugs.

const esprima = require('esprima');
try {
  esprima.parseScript(appJs);
  console.log("No syntax errors!");
} catch (e) {
  console.log("Syntax error:", e.message);
}
