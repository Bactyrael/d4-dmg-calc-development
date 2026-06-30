const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// The replacement script added an actual backslash before the backtick in the code!
app = app.replace(/\\\`/g, '\`');

fs.writeFileSync('app.js', app);
console.log("Fixed backticks.");
