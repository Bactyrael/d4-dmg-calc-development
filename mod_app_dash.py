import re

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Remove DOM bindings for removed elements
bad_bindings = """    additiveArmor: document.getElementById('additive-armor'),
    multiplicativeArmor: document.getElementById('multiplicative-armor'),
    additiveAllResist: document.getElementById('additive-all-resist'),
    multiplicativeAllResist: document.getElementById('multiplicative-all-resist'),
    fireResist: document.getElementById('fire-resist'),
    lightningResist: document.getElementById('lightning-resist'),
    coldResist: document.getElementById('cold-resist'),
    poisonResist: document.getElementById('poison-resist'),
    shadowResist: document.getElementById('shadow-resist'),
    drBody: document.getElementById('dr-body'),
    btnAddDr: document.getElementById('btn-add-dr'),
    dodgeAddBody: document.getElementById('dodge-add-body'),
    dodgeMultBody: document.getElementById('dodge-mult-body'),
    btnAddDodgeAdd: document.getElementById('btn-add-dodge-add'),
    btnAddDodgeMult: document.getElementById('btn-add-dodge-mult'),"""
app_code = app_code.replace(bad_bindings, "")

# 2. Add DOM bindings for new dashboard elements
new_bindings = """    ehpPhysical: document.getElementById('ehp-physical'),
    drPhysicalFinal: document.getElementById('dr-physical-final'),
    drPhysicalArmor: document.getElementById('dr-physical-armor'),
    drUniversal: document.getElementById('dr-universal'),
    dashMaxLife: document.getElementById('dash-max-life'),
    ehpFire: document.getElementById('ehp-fire'),
    drFireFinal: document.getElementById('dr-fire-final'),
    ehpCold: document.getElementById('ehp-cold'),
    drColdFinal: document.getElementById('dr-cold-final'),
    ehpLightning: document.getElementById('ehp-lightning'),
    drLightningFinal: document.getElementById('dr-lightning-final'),
    ehpPoison: document.getElementById('ehp-poison'),
    drPoisonFinal: document.getElementById('dr-poison-final'),
    ehpShadow: document.getElementById('ehp-shadow'),
    drShadowFinal: document.getElementById('dr-shadow-final'),"""
app_code = app_code.replace("    btnSave:   document.getElementById('btn-save'),", new_bindings + "\n\n    btnSave:   document.getElementById('btn-save'),")

# 3. Clean up the defensive logic in compileCharacterStats
# The inputs are gone, but we still need to calculate DR% for Armor and Resistances, and pass Universal DR as 0 (since it will come from elsewhere later).
# Wait, I'll just rewrite the defensive logic block.

old_def_logic_start = "        // --- Defensive Stats ---"
old_def_logic_end = "addStat(stats, 'Dodge Chance', finalDodge, 'Base');"
import_re_search = re.search(re.escape(old_def_logic_start) + r".*?" + re.escape(old_def_logic_end), app_code, re.DOTALL)

if import_re_search:
    new_def_logic = """        // --- Defensive Stats ---
        const finalArmor = stats['Armor'] ? stats['Armor'].final : 0;
        let armorDr = 0;
        if (finalArmor > 0) {
            armorDr = finalArmor / ((finalArmor * 10 / 9) + 5678);
        }
        addStat(stats, 'Physical DR% (Armor)', armorDr * 100, 'Calculated');
        
        const finalAllResist = stats['Resistance to All Elements'] ? stats['Resistance to All Elements'].final : 0;
        
        const specificResists = ['Fire Resistance', 'Lightning Resistance', 'Cold Resistance', 'Poison Resistance', 'Shadow Resistance'];
        specificResists.forEach(res => {
            let resTotal = (stats[res] ? stats[res].total : 0) + (stats['Resistance to All Elements'] ? stats['Resistance to All Elements'].total : 0);
            let finalResist = resTotal; // Assuming no multiplicative all resist for now, or it comes from equipment
            
            if (!stats[res]) stats[res] = { total: 0, final: 0, flatSources: [], pctSources: [] };
            stats[res].final = finalResist;
            
            if (stats['Resistance to All Elements']) {
                stats[res].flatSources.push({ name: 'From All Resistance', val: stats['Resistance to All Elements'].total });
                stats[res].total += stats['Resistance to All Elements'].total;
            }
            
            let resistDr = 0;
            if (finalResist > 0) {
                resistDr = finalResist / ((finalResist * 10 / 9) + 1136);
            }
            addStat(stats, res.split(' ')[0] + ' DR%', resistDr * 100, 'Calculated');
        });
        
        // Universal DR and Dodge will be calculated here once those tabs exist. For now, 0.
        const finalUniversalDr = 0;
        addStat(stats, 'Universal Damage Reduction %', finalUniversalDr * 100, 'Calculated');
"""
    app_code = app_code[:import_re_search.start()] + new_def_logic + app_code[import_re_search.end():]
else:
    print("Could not find defensive logic block to replace.")

# 4. Add renderToughnessDashboard
render_func = """
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
app_code += render_func

# Hook into calculate()
app_code = app_code.replace("    renderCharacterSheet(compiledStats);", "    renderCharacterSheet(compiledStats);\n    renderToughnessDashboard(compiledStats);")

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)
print("Done modifying app.js for Dashboard")
