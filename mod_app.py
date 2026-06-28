import re

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Add currentBuild defaults
build_defaults = """        poisonRes: 0,
        shadowRes: 0,
        additiveArmor: 0,
        multiplicativeArmor: 0,
        additiveAllResist: 0,
        multiplicativeAllResist: 0,
        fireResist: 0,
        lightningResist: 0,
        coldResist: 0,
        poisonResist: 0,
        shadowResist: 0,
        defensiveDr: [],"""
app_code = app_code.replace("        poisonRes: 0,\n        shadowRes: 0,", build_defaults)

# 2. Add currentBuild property extraction
build_extract = """      currentBuild.poisonRes = dom.poisonRes ? parseFloat(dom.poisonRes.value) || 0 : 0;
      currentBuild.shadowRes = dom.shadowRes ? parseFloat(dom.shadowRes.value) || 0 : 0;
      
      currentBuild.additiveArmor = dom.additiveArmor ? parseFloat(dom.additiveArmor.value) || 0 : 0;
      currentBuild.multiplicativeArmor = dom.multiplicativeArmor ? parseFloat(dom.multiplicativeArmor.value) || 0 : 0;
      currentBuild.additiveAllResist = dom.additiveAllResist ? parseFloat(dom.additiveAllResist.value) || 0 : 0;
      currentBuild.multiplicativeAllResist = dom.multiplicativeAllResist ? parseFloat(dom.multiplicativeAllResist.value) || 0 : 0;
      currentBuild.fireResist = dom.fireResist ? parseFloat(dom.fireResist.value) || 0 : 0;
      currentBuild.lightningResist = dom.lightningResist ? parseFloat(dom.lightningResist.value) || 0 : 0;
      currentBuild.coldResist = dom.coldResist ? parseFloat(dom.coldResist.value) || 0 : 0;
      currentBuild.poisonResist = dom.poisonResist ? parseFloat(dom.poisonResist.value) || 0 : 0;
      currentBuild.shadowResist = dom.shadowResist ? parseFloat(dom.shadowResist.value) || 0 : 0;"""
app_code = app_code.replace("      currentBuild.poisonRes = dom.poisonRes ? parseFloat(dom.poisonRes.value) || 0 : 0;\n      currentBuild.shadowRes = dom.shadowRes ? parseFloat(dom.shadowRes.value) || 0 : 0;", build_extract)

# 3. Add to init filter array
init_array = "dom.expBonus, dom.damageReduction, dom.aps, dom.weaponSpeed, dom.additiveArmor, dom.multiplicativeArmor, dom.additiveAllResist, dom.multiplicativeAllResist, dom.fireResist, dom.lightningResist, dom.coldResist, dom.poisonResist, dom.shadowResist]"
app_code = app_code.replace("dom.expBonus, dom.damageReduction, dom.aps, dom.weaponSpeed]", init_array)

# 4. Add DR array logic in init
dr_logic = """    dom.addMultBtn.addEventListener('click', () => {
      const row = createMultiplicativeRow('', '');
      row.querySelector('.row-name-input').focus();
      calculate();
    });

    if (dom.btnAddDr) {
      dom.btnAddDr.addEventListener('click', () => {
        const row = createDrRow('', 0);
        row.querySelector('.row-name-input').focus();
        calculate();
      });
    }"""
app_code = app_code.replace("""    dom.addMultBtn.addEventListener('click', () => {
      const row = createMultiplicativeRow('', '');
      row.querySelector('.row-name-input').focus();
      calculate();
    });""", dr_logic)

# 5. Add DOM update in renderBuild
render_build = """    if (dom.poisonRes) dom.poisonRes.value = b.poisonRes || 0;
    if (dom.shadowRes) dom.shadowRes.value = b.shadowRes || 0;
    
    if (dom.additiveArmor) dom.additiveArmor.value = b.additiveArmor || 0;
    if (dom.multiplicativeArmor) dom.multiplicativeArmor.value = b.multiplicativeArmor || 0;
    if (dom.additiveAllResist) dom.additiveAllResist.value = b.additiveAllResist || 0;
    if (dom.multiplicativeAllResist) dom.multiplicativeAllResist.value = b.multiplicativeAllResist || 0;
    if (dom.fireResist) dom.fireResist.value = b.fireResist || 0;
    if (dom.lightningResist) dom.lightningResist.value = b.lightningResist || 0;
    if (dom.coldResist) dom.coldResist.value = b.coldResist || 0;
    if (dom.poisonResist) dom.poisonResist.value = b.poisonResist || 0;
    if (dom.shadowResist) dom.shadowResist.value = b.shadowResist || 0;
    
    if (dom.drBody) {
      dom.drBody.innerHTML = '';
      if (b.defensiveDr && b.defensiveDr.length) {
        b.defensiveDr.forEach(d => createDrRow(d.name, d.value));
      }
    }"""
app_code = app_code.replace("""    if (dom.poisonRes) dom.poisonRes.value = b.poisonRes || 0;
    if (dom.shadowRes) dom.shadowRes.value = b.shadowRes || 0;""", render_build)

# 6. Add getDrValues, createDrRow functions
dr_funcs = """  function getDrValues() {
    if (!dom.drBody) return [];
    const rows = dom.drBody.querySelectorAll('tr');
    const values = [];
    rows.forEach(row => {
      const nameInput = row.querySelector('.row-name-input');
      const valueInput = row.querySelector('.row-value-input');
      values.push({
        name: nameInput.value,
        value: parseFloat(valueInput.value) || 0,
      });
    });
    currentBuild.defensiveDr = values;
    return values;
  }

  function createDrRow(name, val) {
    if (!dom.drBody) return null;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="d4-input row-name-input" value="${name}" placeholder="Source name"></td>
      <td><input type="number" class="d4-input row-value-input" value="${val}" step="any" placeholder="0"></td>
      <td><button class="btn-remove">X</button></td>
    `;
    
    tr.querySelector('.btn-remove').addEventListener('click', () => {
      tr.remove();
      calculate();
    });
    
    tr.querySelectorAll('input').forEach(i => i.addEventListener('input', calculate));
    dom.drBody.appendChild(tr);
    return tr;
  }

  function getMultiplicativeValues() {"""
app_code = app_code.replace("  function getMultiplicativeValues() {", dr_funcs)

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)
print("Done modifying app.js structure")
