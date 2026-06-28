import re

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

defensive_logic = """
        // --- Defensive Stats ---
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
        });

        // DR Calculation
        let drValues = currentBuild.defensiveDr || [];
        let totalMultDrMultiplier = 1;
        drValues.forEach(dr => {
           const drDec = dr.value / 100;
           totalMultDrMultiplier *= (1 - drDec);
        });
        
        const finalUniversalDr = 1 - totalMultDrMultiplier;
        addStat(stats, 'Universal Damage Reduction %', finalUniversalDr * 100, 'Base');

        return stats;"""

app_code = app_code.replace("        return stats;\n    }", defensive_logic + "\n    }")

with open(r'C:\Users\rcmil\.gemini\antigravity\scratch\d4-damage-calc\app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)
print("Done adding defensive logic to compileCharacterStats")
