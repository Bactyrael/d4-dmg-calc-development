const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

const regex = /let footerHtml = `[\s\S]*?tooltipEl\.innerHTML = `[\s\S]*?`;/m;

if (regex.test(app)) {
    const match = app.match(regex)[0];
    
    let replacement = `    let breakdownHtml = '';
    if (skillObj.baseDamageScalar) {
        let rankMultiplier = 1 + ((displayRank || 1) - 1) * 0.1;
        let wpMin = window.weaponMinDmg || 0;
        let wpMax = window.weaponMaxDmg || 0;

        // Ensure calculation functions are defined
        let additiveMult = typeof calculateSkillAdditiveBucket === 'function' ? 1 + calculateSkillAdditiveBucket(skillObj) : 1;
        let multiMult = typeof calculateSkillMultiplicativeBucket === 'function' ? calculateSkillMultiplicativeBucket(skillObj) : 1;
        let finalScalar = rankMultiplier * additiveMult * multiMult;

        let minStr = Math.floor(wpMin * skillObj.baseDamageScalar * finalScalar).toLocaleString();
        let maxStr = Math.floor(wpMax * skillObj.baseDamageScalar * finalScalar).toLocaleString();
        
        let addStr = ((additiveMult - 1) * 100).toFixed(1).replace('.0', '');
        let multStr = multiMult.toFixed(2);

        breakdownHtml = \`
            <div class="d4-tooltip-upgrades-header" style="margin-top: 15px;">DAMAGE BREAKDOWN</div>
            <div style="font-size: 0.9rem; color: #ccc; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>Additive Stats:</span> <span style="color: #fff;">+\${addStr}%</span>
            </div>
            <div style="font-size: 0.9rem; color: #ccc; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>Multiplicative Stats:</span> <span style="color: #fff;">x\${multStr}</span>
            </div>
            <div style="font-size: 0.95rem; color: #c9a55c; margin-bottom: 5px; margin-top: 5px; display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid #333; padding-top: 5px;">
              <span>Final Damage:</span> <span>\${minStr} - \${maxStr}</span>
            </div>
        \`;
    }

    let footerHtml = \`
        <div class="d4-tooltip-footer">
            <span class="d4-tooltip-damage-type type-\${finalDamageType.toLowerCase()}">
                \${dmgTypeIcon} \${finalDamageType} Damage
            </span>
        </div>
    \`;
    
    tooltipEl.innerHTML = \`
        <div class="d4-tooltip-header">\${skillObj.name}</div>
        \${tagsHtml}
        \${statsHtml}
        <div class="d4-tooltip-desc">\${descHtml}</div>
        \${modifiersHtml}
        \${breakdownHtml}
        \${footerHtml}
    \`;`;

    app = app.replace(regex, replacement);
    fs.writeFileSync('app.js', app);
    console.log("Successfully replaced block with regex");
} else {
    console.log("Failed to match regex");
}
