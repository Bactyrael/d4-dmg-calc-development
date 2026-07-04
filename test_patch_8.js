const fs = require('fs');
let lines = fs.readFileSync('app.js', 'utf8').split('\n');
let res = -1;
for(let i=7290; i<lines.length; i++) {
    if(lines[i].includes("if (tags.includes('keyword_corruption')) {")) {
        res = i;
        break;
    }
}
if(res !== -1) {
    lines.splice(res, 0, 
        "    if (tags.includes('subpower_desecratedground') || tags.includes('search_desecratedground')) {",
        "        addStat('Desecration Damage');",
        "    }"
    );
    fs.writeFileSync('app.js', lines.join('\n'));
    console.log('Successfully added Desecration additive logic');
}
