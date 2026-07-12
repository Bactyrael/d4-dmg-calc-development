import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

calc_target = """    const compiledStats = compileCharacterStats(baseEquipped, autoStats);
    window.D4_COMPILED_STATS = compiledStats;"""

calc_replacement = """    const compiledStats = compileCharacterStats(baseEquipped, autoStats);
    
    // Process Talisman Set Bonuses & Charms
    if (currentBuild.talisman) {
        let setCounts = {};
        
        // Tally sets
        for (let i = 0; i < 6; i++) {
            const charm = currentBuild.talisman.charms[i];
            if (charm && charm.rarity === 'set' && charm.set) {
                setCounts[charm.set] = (setCounts[charm.set] || 0) + 1;
            } else if (charm && charm.isUnique) {
                // If it's a unique charm, its power applies globally
                // In this simplified model, unique charms provide their power as a stat component
                // Actually, Unique Charms just grant the Legendary power, so we should add to a legendary array
                // For now, we just ensure it's tracked
                if (!compiledStats['Unique Charm Powers']) compiledStats['Unique Charm Powers'] = { final: 0, isMultiplicative: false, components: [] };
                compiledStats['Unique Charm Powers'].components.push({ name: charm.name, value: charm.desc || '' });
            }
        }
        
        const seal = currentBuild.talisman.seal;
        const reducesSetReq = seal && seal.name === 'Seal of the Diamond Mind';
        
        if (!compiledStats['Talisman Set Bonuses']) compiledStats['Talisman Set Bonuses'] = { final: 0, isMultiplicative: false, components: [] };
        
        // Evaluate bonuses
        for (const setName in setCounts) {
            let count = setCounts[setName];
            let effectiveCount = reducesSetReq ? count + 1 : count;
            
            const setBonuses = window.D4_DATABASE?.talismanSets?.[setName];
            if (setBonuses) {
                for (const req in setBonuses) {
                    if (effectiveCount >= parseInt(req)) {
                        // Bonus active! Add to compiledStats
                        compiledStats['Talisman Set Bonuses'].components.push({ name: `${setName} (${req}-piece)`, value: setBonuses[req] });
                    }
                }
            }
        }
    }
    
    window.D4_COMPILED_STATS = compiledStats;"""

content = content.replace(calc_target, calc_replacement)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated calculate loop with Talisman set bonuses")
