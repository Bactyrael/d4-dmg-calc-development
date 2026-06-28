import re

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Add DOM bindings
dom_bindings = """    drBody: document.getElementById('dr-body'),
    btnAddDr: document.getElementById('btn-add-dr'),
    dodgeAddBody: document.getElementById('dodge-add-body'),
    dodgeMultBody: document.getElementById('dodge-mult-body'),
    btnAddDodgeAdd: document.getElementById('btn-add-dodge-add'),
    btnAddDodgeMult: document.getElementById('btn-add-dodge-mult'),"""
app_code = app_code.replace("    drBody: document.getElementById('dr-body'),\n    btnAddDr: document.getElementById('btn-add-dr'),", dom_bindings)

# 2. Add build defaults
build_defaults = """        defensiveDr: [],
        dodgeAdd: [],
        dodgeMult: [],"""
app_code = app_code.replace("        defensiveDr: [],", build_defaults)

# 3. Add to init filter array (no new additive stat inputs, so just add event listeners for the new buttons)
dodge_listeners = """    if (dom.btnAddDr) {
      dom.btnAddDr.addEventListener('click', () => {
        const row = createDrRow('', 0);
        row.querySelector('.row-name-input').focus();
        calculate();
      });
    }

    if (dom.btnAddDodgeAdd) {
      dom.btnAddDodgeAdd.addEventListener('click', () => {
        const row = createDodgeRow(dom.dodgeAddBody, 'dodgeAdd', '', 0);
        if (row) row.querySelector('.row-name-input').focus();
        calculate();
      });
    }

    if (dom.btnAddDodgeMult) {
      dom.btnAddDodgeMult.addEventListener('click', () => {
        const row = createDodgeRow(dom.dodgeMultBody, 'dodgeMult', '', 0);
        if (row) row.querySelector('.row-name-input').focus();
        calculate();
      });
    }"""
app_code = app_code.replace("""    if (dom.btnAddDr) {
      dom.btnAddDr.addEventListener('click', () => {
        const row = createDrRow('', 0);
        row.querySelector('.row-name-input').focus();
        calculate();
      });
    }""", dodge_listeners)

# 4. Add DOM update in renderBuild
render_build = """    if (dom.drBody) {
      dom.drBody.innerHTML = '';
      if (b.defensiveDr && b.defensiveDr.length) {
        b.defensiveDr.forEach(d => createDrRow(d.name, d.value));
      }
    }
    if (dom.dodgeAddBody) {
      dom.dodgeAddBody.innerHTML = '';
      if (b.dodgeAdd && b.dodgeAdd.length) {
        b.dodgeAdd.forEach(d => createDodgeRow(dom.dodgeAddBody, 'dodgeAdd', d.name, d.value));
      }
    }
    if (dom.dodgeMultBody) {
      dom.dodgeMultBody.innerHTML = '';
      if (b.dodgeMult && b.dodgeMult.length) {
        b.dodgeMult.forEach(d => createDodgeRow(dom.dodgeMultBody, 'dodgeMult', d.name, d.value));
      }
    }"""
app_code = app_code.replace("""    if (dom.drBody) {
      dom.drBody.innerHTML = '';
      if (b.defensiveDr && b.defensiveDr.length) {
        b.defensiveDr.forEach(d => createDrRow(d.name, d.value));
      }
    }""", render_build)

# 5. Add getDodgeValues, createDodgeRow functions
dodge_funcs = """  function getDynamicValues(bodyEl, arrayName) {
    if (!bodyEl) return [];
    const rows = bodyEl.querySelectorAll('tr');
    const values = [];
    rows.forEach(row => {
      const nameInput = row.querySelector('.row-name-input');
      const valueInput = row.querySelector('.row-value-input');
      values.push({
        name: nameInput.value,
        value: parseFloat(valueInput.value) || 0,
      });
    });
    currentBuild[arrayName] = values;
    return values;
  }

  function createDodgeRow(bodyEl, arrayName, name, val) {
    if (!bodyEl) return null;
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
    bodyEl.appendChild(tr);
    return tr;
  }

  function getMultiplicativeValues() {"""
app_code = app_code.replace("  function getMultiplicativeValues() {", dodge_funcs)


# 6. Add to compileCharacterStats logic
defensive_logic = """        const finalUniversalDr = 1 - totalMultDrMultiplier;
        addStat(stats, 'Universal Damage Reduction %', finalUniversalDr * 100, 'Base');

        // Dodge Calculation
        const dodgeAddValues = currentBuild.dodgeAdd || [];
        const dodgeMultValues = currentBuild.dodgeMult || [];
        
        let dodgeAddSum = 0;
        dodgeAddValues.forEach(d => dodgeAddSum += d.value);
        
        let dodgeMultMultiplier = 1;
        dodgeMultValues.forEach(d => {
            const dec = d.value / 100;
            dodgeMultMultiplier *= (1 - dec);
        });
        
        const multDodgeTotal = (1 - dodgeMultMultiplier) * 100;
        const dexDodge = dexVal * 0.006;
        
        const finalDodge = multDodgeTotal + dodgeAddSum + dexDodge;
        
        addStat(stats, 'Dodge Chance', finalDodge, 'Base');

        return stats;"""
app_code = app_code.replace("        const finalUniversalDr = 1 - totalMultDrMultiplier;\n        addStat(stats, 'Universal Damage Reduction %', finalUniversalDr * 100, 'Base');\n\n        return stats;", defensive_logic)


with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)
print("Done adding Dodge logic")
