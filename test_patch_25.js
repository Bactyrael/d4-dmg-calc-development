const fs = require('fs');
let appContent = fs.readFileSync('app.js', 'utf8');

// Replace string literal escaped backticks from the inner HTML block with actual backticks
appContent = appContent.replace(/\\`/g, '`');

fs.writeFileSync('app.js', appContent);
console.log('Fixed backticks syntax error');
