const fs = require('fs');

let appContent = fs.readFileSync('app.js', 'utf8');

let index = appContent.indexOf('Path of Darkness');
if (index !== -1) {
    let blockStart = appContent.lastIndexOf('if (skillObj.name', index);
    let blockEnd = appContent.indexOf('}', index) + 1;
    
    let block = appContent.substring(blockStart, blockEnd);
    let newBlock = `if (skillObj.name === "Unfinished Business") {
        str = str.replace(/\\[\\{dot:tooltip_dot\\}[\\s\\.,\\d]*?\\]|\\{dot:tooltip_dot\\}/g, (2.5 * rankMult * 100).toFixed(1) + "%");
    } else ` + block;
    
    appContent = appContent.replace(block, newBlock);
    fs.writeFileSync('app.js', appContent);
    console.log("Patched Unfinished Business tooltip successfully");
} else {
    console.log("NO MATCH");
}
