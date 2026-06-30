const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// 1. Sync in calculate()
const calcRegex = /(currentBuild\.equipment = getEquipmentValues\(\);)/;
const calcReplacement = "$1\n    currentBuild.conditions = getActiveConditions();";

app = app.replace(calcRegex, calcReplacement);

// 2. Restore in loadBuild()
const loadRegex = /(dom\.shadowResist\.value = b\.shadowResist \|\| 0;)/;
const loadReplacement = `$1

    if (b.conditions) {
      if (document.getElementById('cond-vulnerable')) document.getElementById('cond-vulnerable').checked = b.conditions.vulnerable || false;
      if (document.getElementById('cond-close')) document.getElementById('cond-close').checked = b.conditions.close || false;
      if (document.getElementById('cond-distant')) document.getElementById('cond-distant').checked = b.conditions.distant || false;
      if (document.getElementById('cond-healthy')) document.getElementById('cond-healthy').checked = b.conditions.healthy || false;
      if (document.getElementById('cond-injured')) document.getElementById('cond-injured').checked = b.conditions.injured || false;
      if (document.getElementById('cond-cc')) document.getElementById('cond-cc').checked = b.conditions.cc || false;
      if (document.getElementById('cond-overpower')) document.getElementById('cond-overpower').checked = b.conditions.overpower || false;
      if (document.getElementById('cond-elite')) document.getElementById('cond-elite').checked = b.conditions.elite || false;
    } else {
      document.querySelectorAll('.calc-condition').forEach(el => el.checked = false);
    }`;

app = app.replace(loadRegex, loadReplacement);

fs.writeFileSync('app.js', app);
console.log("Fixed conditions saving and loading state.");
