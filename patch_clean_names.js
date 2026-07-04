const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Inject cleanStatName function
const target1 = `function compileCharacterStats(equippedObj) {`;
const repl1 = `function cleanStatName(name) {
    if (!name) return name;
    return name.replace(/^\\+?\\[[\\d\\.,]+\\s*-\\s*[\\d\\.,]+\\]%?\\s*/, '');
}

function compileCharacterStats(equippedObj) {`;
app = app.replace(target1, repl1);

// 2. Replace addStat(stats, affixName
const target2 = `addStat(stats, affixName, v * qMult, slotName);`;
const repl2 = `addStat(stats, cleanStatName(affixName), v * qMult, slotName);`;
app = app.replace(target2, repl2);

// 3. Replace addStat(stats, temperName
const target3 = `addStat(stats, temperName, v * qMult, slotName);`;
const repl3 = `addStat(stats, cleanStatName(temperName), v * qMult, slotName);`;
app = app.replace(target3, repl3);

// 4. Replace addStat(stats, transfigureName (if it exists)
const target4 = `addStat(stats, transfigureName, v * qMult, slotName);`;
const repl4 = `addStat(stats, cleanStatName(transfigureName), v * qMult, slotName);`;
app = app.replace(target4, repl4);

fs.writeFileSync('app.js', app);
console.log('Patched cleanStatName into compileCharacterStats');
