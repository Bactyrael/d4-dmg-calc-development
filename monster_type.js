const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// 1. Remove Elite checkbox from Conditions pane
const condRegex = /<label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">\s*<input type="checkbox" id="cond-elite" class="d4-checkbox calc-condition" checked> Enemy is Elite\s*<\/label>/;
index = index.replace(condRegex, '');

// 2. Add radio buttons to Monster pane
const monsterPaneRegex = /(<div id="calc-pane-monster" class="calc-pane-content" style="display: none;">\s*<div class="d4-panel" style="background: rgba\(20,20,25,0\.9\); border: 1px solid #334; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba\(0,0,0,0\.5\);">\s*<h2 style="color: #fff; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 15px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">\s*<span class="icon" style="color: #c9a55c;">.*?<\/span> Monster Configuration\s*<\/h2>\s*)<p style="color: #aaa; font-style: italic;">.*?<\/p>/s;
const monsterPaneReplacement = `$1<p style="color: #aaa; font-style: italic; margin-bottom: 20px;">Configure the target monster attributes to properly calculate conditional damage and damage reduction.</p>
                   
                   <h3 style="color: #ddd; margin-top: 0; margin-bottom: 10px; font-size: 1.05rem;">Target Type</h3>
                   <div style="display: flex; gap: 20px; margin-bottom: 20px;" id="monster-type-group">
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="radio" name="monster_type" value="normal" class="calc-monster-type"> Normal
                     </label>
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="radio" name="monster_type" value="elite" class="calc-monster-type" checked> Elite
                     </label>
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ddd;">
                       <input type="radio" name="monster_type" value="boss" class="calc-monster-type"> Boss
                     </label>
                   </div>`;
index = index.replace(monsterPaneRegex, monsterPaneReplacement);

fs.writeFileSync('index.html', index);

let app = fs.readFileSync('app.js', 'utf8');

// 3. Update getActiveConditions()
const getCondRegex = /elite: document\.getElementById\('cond-elite'\)\?\.checked \|\| false/;
const getCondReplacement = `monsterType: document.querySelector('input[name="monster_type"]:checked')?.value || 'elite'`;
app = app.replace(getCondRegex, getCondReplacement);

// 4. Update loadBuild() logic
const loadCondRegex = /if \(document\.getElementById\('cond-elite'\)\) document\.getElementById\('cond-elite'\)\.checked = b\.conditions\.elite \|\| false;/;
const loadCondReplacement = `if (b.conditions.monsterType) {
          const mTypeRadio = document.querySelector(\`input[name="monster_type"][value="\${b.conditions.monsterType}"]\`);
          if (mTypeRadio) mTypeRadio.checked = true;
        }`;
app = app.replace(loadCondRegex, loadCondReplacement);

// 5. Update calculateSkillAdditiveBucket()
const bucketEliteRegex = /if \(conds\.elite\) \{/g;
const bucketEliteReplacement = `if (conds.monsterType === 'elite' || conds.monsterType === 'boss') {`;
app = app.replace(bucketEliteRegex, bucketEliteReplacement);

// 6. Update Weakened buff logic
const weakDrRegex = /if \(activeConds\.elite\) weakDr = 15;/;
const weakDrReplacement = `if (activeConds.monsterType === 'elite') weakDr = 15;
                if (activeConds.monsterType === 'boss') weakDr = 10;`;
app = app.replace(weakDrRegex, weakDrReplacement);

// 7. Add event listeners for new radio buttons
const eventRegex = /(document\.querySelectorAll\('\.calc-buff'\)\.forEach\(el => \{[\s\S]*?\}\);)/;
const eventReplacement = `$1
      document.querySelectorAll('.calc-monster-type').forEach(el => {
        el.addEventListener('change', () => {
          saveBuild();
          renderCalcSkills();
        });
      });`;
app = app.replace(eventRegex, eventReplacement);

fs.writeFileSync('app.js', app);
console.log("Updated monster type logic.");
