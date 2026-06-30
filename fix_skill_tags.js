const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const target = "if (found) { mainSkill = found; break; }";
const replacement = "if (found) { mainSkill = typeof applyActiveModifiers === 'function' ? applyActiveModifiers(found) : found; break; }";

if (app.includes(target)) {
    app = app.replace(target, replacement);
    fs.writeFileSync('app.js', app);
    console.log('Fixed tags calculation');
} else {
    console.log('Could not find injection point');
}
