import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

target = """        if (upgradeBonus > 0) {
            bonusLHC += upgradeBonus;
            components.push({ name: 'Skill Upgrade [+]', value: upgradeBonus });
        }
    }
    
    let totalLHC = baseLHC * (1 + (bonusLHC / 100));"""

replacement = """        if (upgradeBonus > 0) {
            bonusLHC += upgradeBonus;
            components.push({ name: 'Skill Upgrade [+]', value: upgradeBonus });
        }
    }
    
    let aphoticMult = 1;
    if (typeof currentBuild !== 'undefined' && currentBuild && currentBuild.equipment) {
        const aphoticItem = Object.values(currentBuild.equipment).find(item => item && item.aspect === "Aphotic Aspect");
        if (aphoticItem) {
            let aphoticAspectValue = (aphoticItem.aspectValues && aphoticItem.aspectValues.length > 0) ? aphoticItem.aspectValues[0] : 30;
            let isShadowDamage = skillObj.damageType === 'Shadow' || (skillObj.tags && skillObj.tags.some(t => t.toLowerCase() === 'damage_shadow' || t.toLowerCase() === 'skill_shadow' || t.toLowerCase() === 'search_shadow'));
            
            if (isShadowDamage && aphoticAspectValue > 0) {
                aphoticMult = (1 + (aphoticAspectValue / 100));
                components.push({ name: 'Aphotic Aspect [x]', value: aphoticAspectValue });
            }
        }
    }
    
    let totalLHC = baseLHC * (1 + (bonusLHC / 100)) * aphoticMult;"""

content = content.replace(target, replacement)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Applied Aphotic Aspect")
