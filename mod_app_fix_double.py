import re

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# Replace defensive stat aggregation logic to avoid double-counting
old_logic = """        // --- Defensive Stats ---
        const addArmor = currentBuild.additiveArmor || 0;
        const multArmor = currentBuild.multiplicativeArmor || 0;
        const strArmor = strVal * 2;
        const totalAddArmor = addArmor + strArmor;
        const finalArmor = totalAddArmor * (1 + (multArmor / 100));
        
        let armorDr = 0;
        if (finalArmor > 0) {
            armorDr = finalArmor / ((finalArmor * 10 / 9) + 5678);
        }
        
        addStat(stats, 'Armor', finalArmor, 'Base');
        addStat(stats, 'Physical DR% (Armor)', armorDr * 100, 'Base');
        
        const addAllResist = currentBuild.additiveAllResist || 0;
        const multAllResist = currentBuild.multiplicativeAllResist || 0;
        const intResist = intVal * 0.4;
        const totalAddAllResist = addAllResist + intResist;
        const finalAllResist = totalAddAllResist * (1 + (multAllResist / 100));
        
        addStat(stats, 'All Resistance', finalAllResist, 'Base');
        
        const specificResists = [
            { name: 'Fire Resistance', val: currentBuild.fireResist || 0 },
            { name: 'Lightning Resistance', val: currentBuild.lightningResist || 0 },
            { name: 'Cold Resistance', val: currentBuild.coldResist || 0 },
            { name: 'Poison Resistance', val: currentBuild.poisonResist || 0 },
            { name: 'Shadow Resistance', val: currentBuild.shadowResist || 0 }
        ];
        
        specificResists.forEach(res => {
            const totalAdd = totalAddAllResist + res.val;
            const finalResist = totalAdd * (1 + (multAllResist / 100));
            
            let resistDr = 0;
            if (finalResist > 0) {
                resistDr = finalResist / ((finalResist * 10 / 9) + 1136);
            }
            addStat(stats, res.name, finalResist, 'Base');
            addStat(stats, res.name.split(' ')[0] + ' DR%', resistDr * 100, 'Base');
        });"""

new_logic = """        // --- Defensive Stats ---
        const addArmor = currentBuild.additiveArmor || 0;
        const multArmor = currentBuild.multiplicativeArmor || 0;
        
        if (addArmor > 0) addStat(stats, 'Armor', addArmor, 'Additive Base');
        
        if (multArmor > 0) {
            if (!stats['Armor']) stats['Armor'] = { total: 0, final: 0, flatSources: [], pctSources: [] };
            stats['Armor'].pctSources.push({ name: 'Multiplicative Boost', val: multArmor });
            stats['Armor'].final = stats['Armor'].total * (1 + (multArmor / 100));
        }
        
        const finalArmor = stats['Armor'] ? stats['Armor'].final : 0;
        let armorDr = 0;
        if (finalArmor > 0) {
            armorDr = finalArmor / ((finalArmor * 10 / 9) + 5678);
        }
        addStat(stats, 'Physical DR% (Armor)', armorDr * 100, 'Calculated');
        
        
        const addAllResist = currentBuild.additiveAllResist || 0;
        const multAllResist = currentBuild.multiplicativeAllResist || 0;
        
        if (addAllResist > 0) addStat(stats, 'Resistance to All Elements', addAllResist, 'Additive Base');
        
        if (multAllResist > 0) {
            if (!stats['Resistance to All Elements']) stats['Resistance to All Elements'] = { total: 0, final: 0, flatSources: [], pctSources: [] };
            stats['Resistance to All Elements'].pctSources.push({ name: 'Multiplicative Boost', val: multAllResist });
            stats['Resistance to All Elements'].final = stats['Resistance to All Elements'].total * (1 + (multAllResist / 100));
        }
        
        const finalAllResist = stats['Resistance to All Elements'] ? stats['Resistance to All Elements'].final : 0;
        
        const specificResists = [
            { name: 'Fire Resistance', val: currentBuild.fireResist || 0 },
            { name: 'Lightning Resistance', val: currentBuild.lightningResist || 0 },
            { name: 'Cold Resistance', val: currentBuild.coldResist || 0 },
            { name: 'Poison Resistance', val: currentBuild.poisonResist || 0 },
            { name: 'Shadow Resistance', val: currentBuild.shadowResist || 0 }
        ];
        
        specificResists.forEach(res => {
            if (res.val > 0) addStat(stats, res.name, res.val, 'Additive Inputs');
            
            let resTotal = (stats[res.name] ? stats[res.name].total : 0) + (stats['Resistance to All Elements'] ? stats['Resistance to All Elements'].total : 0);
            let finalResist = resTotal * (1 + (multAllResist / 100));
            
            // To ensure the display is pretty, we overwrite the final of the specific resist
            if (!stats[res.name]) stats[res.name] = { total: 0, final: 0, flatSources: [], pctSources: [] };
            
            // We want it to just display "Final Resistance" rather than doing weird additive math in the UI
            // So we'll just let addStat handle the flat sources, and set final manually.
            stats[res.name].final = finalResist;
            if (multAllResist > 0) {
                stats[res.name].pctSources.push({ name: 'All Resist Multiplier', val: multAllResist });
            }
            if (stats['Resistance to All Elements']) {
                // Add the all resistance total as a flat source to the specific resistance for tooltip clarity
                stats[res.name].flatSources.push({ name: 'From All Resistance', val: stats['Resistance to All Elements'].total });
                stats[res.name].total += stats['Resistance to All Elements'].total;
            }
            
            let resistDr = 0;
            if (finalResist > 0) {
                resistDr = finalResist / ((finalResist * 10 / 9) + 1136);
            }
            addStat(stats, res.name.split(' ')[0] + ' DR%', resistDr * 100, 'Calculated');
        });"""

app_code = app_code.replace(old_logic, new_logic)

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)
print("Fixed double-counting!")
