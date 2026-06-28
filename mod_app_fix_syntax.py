import re

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# I want to find where `setupModifierListeners('transfigure', 'transfigure');` is.
marker = "setupModifierListeners('transfigure', 'transfigure');\n  });"

app_code_parts = app_code.split(marker)
if len(app_code_parts) == 2:
    clean_top = app_code_parts[0] + marker + "\n"
    
    # We reconstruct the dashboard function perfectly inside the IIFE, then add })();
    clean_func = """
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

})();
"""
    
    with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'w', encoding='utf-8') as f:
        f.write(clean_top + clean_func)
    print("Fixed syntax error")
else:
    print("Could not find marker")
