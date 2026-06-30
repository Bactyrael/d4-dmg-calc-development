const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

if (app.includes("Chance to Hit:")) {
    app = app.replace("Chance to Hit:", "Lucky Hit Chance:");
    fs.writeFileSync('app.js', app);
    console.log('Fixed label to Lucky Hit Chance');
} else {
    console.log('Could not find string');
}
