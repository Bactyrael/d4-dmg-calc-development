const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// 1. Remove the misplaced calc-monster-type listener inside loadBuild()
const badListenerRegex = /\s*document\.querySelectorAll\('\.calc-monster-type'\)\.forEach\(el => \{\s*el\.addEventListener\('change', \(\) => \{\s*saveBuild\(\);\s*renderCalcSkills\(\);\s*\}\);\s*\}\);/g;
app = app.replace(badListenerRegex, '');

// 2. Add calc-buff and calc-monster-type listeners properly next to calc-condition listeners
const condListenerRegex = /(document\.querySelectorAll\('\.calc-condition'\)\.forEach\(chk => \{[\s\S]*?\}\);)/;
const condListenerReplacement = `$1
    
    document.querySelectorAll('.calc-buff, .calc-monster-type').forEach(el => {
      el.addEventListener('change', () => {
        saveBuild();
        if (typeof renderCalcSkills === 'function') renderCalcSkills();
      });
    });`;
app = app.replace(condListenerRegex, condListenerReplacement);

fs.writeFileSync('app.js', app);
console.log("Fixed monster save listeners.");
