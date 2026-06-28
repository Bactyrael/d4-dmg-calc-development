import re

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Update DOM bindings
bindings = """    ehpPhysical: document.getElementById('ehp-physical'),
    drPhysicalFinal: document.getElementById('dr-physical-final'),
    dashArmor: document.getElementById('dash-armor'),
    dashArmorDr: document.getElementById('dash-armor-dr'),
    dashAllResist: document.getElementById('dash-all-resist'),
    dashUniversalDr: document.getElementById('dash-universal-dr'),"""

app_code = app_code.replace("""    ehpPhysical: document.getElementById('ehp-physical'),
    drPhysicalFinal: document.getElementById('dr-physical-final'),
    drPhysicalArmor: document.getElementById('dr-physical-armor'),
    drUniversal: document.getElementById('dr-universal'),""", bindings)

# 2. Add Physical Resistance to the specificResists loop
app_code = app_code.replace("const specificResists = ['Fire Resistance', 'Lightning Resistance', 'Cold Resistance', 'Poison Resistance', 'Shadow Resistance'];", "const specificResists = ['Physical Resistance', 'Fire Resistance', 'Lightning Resistance', 'Cold Resistance', 'Poison Resistance', 'Shadow Resistance'];")


# 3. Update renderToughnessDashboard
render_func_old = """
  function renderToughnessDashboard(compiledStats) {
      if (!dom.ehpPhysical) return;

      const maxLife = compiledStats['Maximum Life'] ? compiledStats['Maximum Life'].final : 0;
      dom.dashMaxLife.textContent = Math.floor(maxLife).toLocaleString();

      const armorDrPct = compiledStats['Physical DR% (Armor)'] ? compiledStats['Physical DR% (Armor)'].final : 0;
      const universalDrPct = compiledStats['Universal Damage Reduction %'] ? compiledStats['Universal Damage Reduction %'].final : 0;
      
      const finalPhysicalDr = 1 - ((1 - (armorDrPct/100)) * (1 - (universalDrPct/100)));
      const ehpPhysical = maxLife / (1 - finalPhysicalDr);
      
      dom.drPhysicalArmor.textContent = armorDrPct.toFixed(1) + '%';
      dom.drUniversal.textContent = universalDrPct.toFixed(1) + '%';
      dom.drPhysicalFinal.textContent = (finalPhysicalDr * 100).toFixed(1) + '%';
      dom.ehpPhysical.textContent = Math.floor(ehpPhysical).toLocaleString();
      
      const elements = ['Fire', 'Cold', 'Lightning', 'Poison', 'Shadow'];
      elements.forEach(elem => {
          const resistDrPct = compiledStats[`${elem} DR%`] ? compiledStats[`${elem} DR%`].final : 0;
          const finalElemDr = 1 - ((1 - (resistDrPct/100)) * (1 - (universalDrPct/100)));
          const ehpElem = maxLife / (1 - finalElemDr);
          
          const ehpEl = document.getElementById(`ehp-${elem.toLowerCase()}`);
          const drEl = document.getElementById(`dr-${elem.toLowerCase()}-final`);
          
          if (ehpEl) ehpEl.textContent = Math.floor(ehpElem).toLocaleString();
          if (drEl) drEl.textContent = (finalElemDr * 100).toFixed(1) + '%';
      });
  }
"""

render_func_new = """
  function renderToughnessDashboard(compiledStats) {
      if (!dom.ehpPhysical) return;

      const maxLife = compiledStats['Maximum Life'] ? compiledStats['Maximum Life'].final : 0;
      dom.dashMaxLife.textContent = Math.floor(maxLife).toLocaleString();

      const armorTotal = compiledStats['Armor'] ? compiledStats['Armor'].final : 0;
      const armorDrPct = compiledStats['Physical DR% (Armor)'] ? compiledStats['Physical DR% (Armor)'].final : 0;
      const allResistTotal = compiledStats['Resistance to All Elements'] ? compiledStats['Resistance to All Elements'].final : 0;
      const universalDrPct = compiledStats['Universal Damage Reduction %'] ? compiledStats['Universal Damage Reduction %'].final : 0;
      
      if (dom.dashArmor) dom.dashArmor.textContent = Math.floor(armorTotal).toLocaleString();
      if (dom.dashArmorDr) dom.dashArmorDr.textContent = armorDrPct.toFixed(1) + '%';
      if (dom.dashAllResist) dom.dashAllResist.textContent = Math.floor(allResistTotal).toLocaleString();
      if (dom.dashUniversalDr) dom.dashUniversalDr.textContent = universalDrPct.toFixed(1) + '%';
      
      const elements = ['Physical', 'Fire', 'Cold', 'Lightning', 'Poison', 'Shadow'];
      elements.forEach(elem => {
          const resistDrPct = compiledStats[`${elem} DR%`] ? compiledStats[`${elem} DR%`].final : 0;
          // Armor DR applies to all elemental damage as well as physical
          const finalElemDr = 1 - ((1 - (armorDrPct/100)) * (1 - (resistDrPct/100)) * (1 - (universalDrPct/100)));
          const ehpElem = maxLife / (1 - finalElemDr);
          
          const ehpEl = document.getElementById(`ehp-${elem.toLowerCase()}`);
          const drEl = document.getElementById(`dr-${elem.toLowerCase()}-final`);
          
          if (ehpEl) ehpEl.textContent = Math.floor(ehpElem).toLocaleString();
          if (drEl) drEl.textContent = (finalElemDr * 100).toFixed(1) + '%';
      });
  }
"""

app_code = app_code.replace(render_func_old, render_func_new)

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)
print("Done modifying app.js for Physical Resist")
