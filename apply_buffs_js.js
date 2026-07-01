const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// 1. Add getActiveBuffs()
const condRegex = /(function getActiveConditions\(\) \{[\s\S]*?\})/m;
const buffFunc = `\n  function getActiveBuffs() {
      return {
          weakened: document.getElementById('buff-weakened')?.checked || false,
          ferocity: parseInt(document.getElementById('buff-ferocity')?.value) || 0,
          overpower: parseInt(document.getElementById('buff-overpower')?.value) || 0,
          resolve: parseInt(document.getElementById('buff-resolve')?.value) || 0
      };
  }`;
app = app.replace(condRegex, `$1\n${buffFunc}`);

// 2. Update calculate() to save buffs
const calcRegex = /(currentBuild\.conditions = getActiveConditions\(\);)/;
app = app.replace(calcRegex, `$1\n    currentBuild.buffs = getActiveBuffs();`);

// 3. Update loadBuild() to restore buffs
const loadRegex = /(if \(b\.conditions\) \{[\s\S]*?\} else \{[\s\S]*?\})/m;
const loadReplacement = `$1

    if (b.buffs) {
      if (document.getElementById('buff-weakened')) document.getElementById('buff-weakened').checked = b.buffs.weakened || false;
      if (document.getElementById('buff-ferocity')) document.getElementById('buff-ferocity').value = b.buffs.ferocity || 0;
      if (document.getElementById('buff-overpower')) document.getElementById('buff-overpower').value = b.buffs.overpower || 0;
      if (document.getElementById('buff-resolve')) document.getElementById('buff-resolve').value = b.buffs.resolve || 0;
    } else {
      document.querySelectorAll('.calc-buff').forEach(el => {
          if (el.type === 'checkbox') el.checked = false;
          else if (el.type === 'number') el.value = 0;
      });
    }`;
app = app.replace(loadRegex, loadReplacement);

// 4. Inject buffs into compileCharacterStats
const compileRegex = /(addStat\(stats, 'Critical Strike Chance', 5, 'Base'\);)/;
const compileReplacement = `$1
        
        // --- Apply Buffs ---
        if (typeof getActiveBuffs === 'function') {
            const activeBuffs = getActiveBuffs();
            const activeConds = typeof getActiveConditions === 'function' ? getActiveConditions() : {};
            
            if (activeBuffs.weakened) {
                let weakDr = 20;
                if (activeConds.elite) weakDr = 15;
                // Currently no dedicated boss condition, assume boss is elite for now, or you could add one later.
                addStat(stats, 'Universal Damage Reduction %', weakDr, 'Weakened Buff');
            }
            if (activeBuffs.ferocity > 0) {
                addStat(stats, 'Attack Speed', activeBuffs.ferocity * 5, 'Ferocity Stacks');
            }
            if (activeBuffs.overpower > 0) {
                addStat(stats, 'Damage', activeBuffs.overpower * 15, 'Overpower Stacks');
            }
            if (activeBuffs.resolve > 0) {
                addStat(stats, '% Armor', 25, 'Resolve Buff');
            }
        }`;
app = app.replace(compileRegex, compileReplacement);

// 5. Add event listener to `.calc-buff`
const eventRegex = /(document\.querySelectorAll\('\.calc-condition'\)\.forEach\(el => \{[\s\S]*?\}\);)/;
const eventReplacement = `$1
      document.querySelectorAll('.calc-buff').forEach(el => {
        el.addEventListener('change', () => {
          saveBuild();
          renderCalcSkills();
        });
      });`;
app = app.replace(eventRegex, eventReplacement);

fs.writeFileSync('app.js', app);
console.log("Updated app.js with buffs logic.");
