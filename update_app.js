const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Add dom.mainSkillSelect
app = app.replace("const dom = {", "const dom = {\n    mainSkillSelect: document.getElementById('main-skill-select'),");

// 2. Add populateMainSkillSelect function
const populateFn = `
function populateMainSkillSelect() {
    if (!dom.mainSkillSelect) return;
    const currentVal = dom.mainSkillSelect.value;
    dom.mainSkillSelect.innerHTML = '<option value="">-- Custom --</option>';
    
    if (typeof skillsDatabase !== 'undefined' && currentBuild && currentBuild.class) {
        const clsDb = skillsDatabase; // The global skillsDatabase has categories with skills
        // Actually skillsDatabase has categories like 'Basic', 'Core'
        for (const cat in clsDb) {
            clsDb[cat].forEach(s => {
                const opt = document.createElement('option');
                opt.value = s.name;
                opt.textContent = s.name;
                dom.mainSkillSelect.appendChild(opt);
            });
        }
    }
    
    // Restore value if possible
    if (currentVal) {
        dom.mainSkillSelect.value = currentVal;
    }
}
`;

app = app.replace("function renderSkills() {", populateFn + "\nfunction renderSkills() {");

// 3. Inject event listener in loadBuildToUI or init
app = app.replace("dom.skillDamage.addEventListener('input', calculate);", "dom.skillDamage.addEventListener('input', calculate);\n  if (dom.mainSkillSelect) dom.mainSkillSelect.addEventListener('change', () => { calculate(); });");

// 4. Update calculate() to use mainSkillSelect
const calcInjection = `
      // Additive: 1 + sum all (value / 100)
      const additives = getAdditiveValues();
      const additiveRawSum = additives.reduce((sum, a) => sum + (a.value / 100), 0);
      const additiveSum = 1 + additiveRawSum;
`;

const newCalcInjection = `
      // Additive injection logic based on active skill tags
      if (dom.mainSkillSelect) {
          const mainSkillName = dom.mainSkillSelect.value;
          let mainSkill = null;
          if (mainSkillName && typeof skillsDatabase !== 'undefined') {
              for (const cat in skillsDatabase) {
                  const found = skillsDatabase[cat].find(s => s.name === mainSkillName);
                  if (found) { mainSkill = found; break; }
              }
          }
          
          if (mainSkill) {
              const tags = mainSkill.tags || [];
              const lowerTags = tags.map(t => t.toLowerCase());
              
              // Clear previous automated rows from dom
              dom.additiveBody.querySelectorAll('tr.injected-row-skill').forEach(row => row.remove());
              
              Object.keys(compiledStats).forEach(statName => {
                  const val = compiledStats[statName].final;
                  if (!val || val <= 0) return;
                  
                  const lower = statName.toLowerCase();
                  if (!lower.includes('damage') || lower.includes('reduction') || lower.includes('taken') || lower.includes('weapon damage') || statName === 'Skill Damage') return;
                  
                  // Conditionals - the user said "always on for the highly conditionals for now"
                  // We just need to check if the stat matches the skill tags.
                  let matches = false;
                  
                  // Basic matches
                  if (lower === 'damage' || lower === '% damage') matches = true; // Global additive
                  if (lower.includes('core skill') && lowerTags.includes('skill_core')) matches = true;
                  if (lower.includes('basic skill') && lowerTags.includes('skill_basic')) matches = true;
                  if (lower.includes('macabre skill') && lowerTags.includes('skill_macabre')) matches = true;
                  if (lower.includes('corruption skill') && lowerTags.includes('skill_corruption')) matches = true;
                  if (lower.includes('bone skill') && lowerTags.includes('search_bone')) matches = true;
                  if (lower.includes('blood skill') && lowerTags.includes('search_blood')) matches = true;
                  if (lower.includes('shadow damage') && lowerTags.includes('search_shadow')) matches = true;
                  if (lower.includes('shadow damage over time') && lowerTags.includes('search_shadowdot')) matches = true;
                  if (lower.includes('physical damage') && lowerTags.includes('search_physical')) matches = true;
                  if (lower.includes('damage over time') && lowerTags.includes('search_damageovertime')) matches = true;
                  
                  // Always on conditionals
                  if (lower.includes('damage vs') || lower.includes('damage to') || lower.includes('damage while') || lower.includes('damage for')) {
                      matches = true; // User requested highly conditionals always on
                  }
                  
                  if (matches) {
                      createAdditiveRow(statName, val.toFixed(2), true, true);
                  }
              });
          }
      }

      // Additive: 1 + sum all (value / 100)
      const additives = getAdditiveValues();
      const additiveRawSum = additives.reduce((sum, a) => sum + (a.value / 100), 0);
      const additiveSum = 1 + additiveRawSum;
`;

app = app.replace(calcInjection, newCalcInjection);

// We need to update createAdditiveRow to support a 4th argument (isSkillInjected) so we can class them differently
app = app.replace("function createAdditiveRow(name = '', value = '', isInjected = false) {", "function createAdditiveRow(name = '', value = '', isInjected = false, isSkillInjected = false) {");
app = app.replace("if (isInjected) tr.classList.add('injected-row');", "if (isInjected) tr.classList.add('injected-row');\n    if (isSkillInjected) tr.classList.add('injected-row-skill');");

fs.writeFileSync('app.js', app);
console.log('App updated');
