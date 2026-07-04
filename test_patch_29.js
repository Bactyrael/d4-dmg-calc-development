const fs = require('fs');
const lines = fs.readFileSync('assets/skills.js', 'utf8').split('\n');
let res = -1;
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes('"Skeleton Mage"')) {
        res = i;
        break;
    }
}
if(res !== -1) {
    for(let i=res-5; i<res+80; i++) {
        console.log(i + ': ' + lines[i]);
    }
} else {
    console.log("NOT FOUND");
}
