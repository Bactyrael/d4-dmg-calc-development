const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(/window\.currentBuild/g, 'currentBuild');
code = code.replace(/CLASS_PARAGON_DATA\[b\.class/g, 'CLASS_PARAGON_DATA[currentBuild.class');

fs.writeFileSync('app.js', code);
