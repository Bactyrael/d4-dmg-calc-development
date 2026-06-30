const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetHtml = `                      <h3 style="margin: 0; color: #fff; font-size: 1.2rem; display: flex; justify-content: space-between;">
                        \${modSkill.name}`;
                        
const replacementHtml = `                      <h3 style="margin: 0; color: #fff; font-size: 1.2rem; display: flex; justify-content: space-between;">
                        \${displayImgName}`;

if (app.includes(targetHtml)) {
    app = app.replace(targetHtml, replacementHtml);
    fs.writeFileSync('app.js', app);
    console.log('Fixed card name');
} else {
    console.log('Could not find target html');
}
