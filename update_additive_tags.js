const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetOld = `
    Object.keys(compiledStats).forEach(statName => {
      const val = compiledStats[statName].final;
      if (!val || val <= 0) return;
      
      let isMultiplicativeAspect = false;
      const aspectObj = (window.D4_DATABASE?.aspects || []).find(a => a.name === statName) 
                     || (window.D4_DATABASE?.uniques || []).find(u => u.name === statName);
      if (aspectObj && aspectObj.desc) {
          const descLower = aspectObj.desc.toLowerCase();
          if (descLower.includes('[x]') && descLower.includes('damage')) {
              isMultiplicativeAspect = true;
          }
      }
      
      if (isMultiplicativeAspect || statName.toLowerCase().includes('[x]')) {
          createMultiplicativeRow(statName, val.toFixed(2), true);
          return;
      }

      const lower = statName.toLowerCase();
      if (
        (lower.includes('damage') || lower.includes('critical') || lower.includes('vulnerable') || lower.includes('overpower')) &&
        !lower.includes('reduction') &&
        !lower.includes('chance') &&
        !lower.includes('base damage') &&
        !lower.includes('weapon damage') &&
        statName !== 'Skill Damage'
      ) {
        createAdditiveRow(statName, val.toFixed(2), true);
      }
    });`;

const targetNew = `
    let lowerTags = [];
    if (dom.mainSkillSelect && typeof skillsDatabase !== 'undefined') {
        const mainSkillName = dom.mainSkillSelect.value;
        let mainSkill = null;
        if (mainSkillName) {
            for (const cat in skillsDatabase) {
                const found = skillsDatabase[cat].find(s => s.name === mainSkillName);
                if (found) { 
                    mainSkill = typeof applyActiveModifiers === 'function' ? applyActiveModifiers(found) : found; 
                    break; 
                }
            }
        }
        if (mainSkill && mainSkill.tags) {
            lowerTags = mainSkill.tags.map(t => t.toLowerCase());
        }
    }

    Object.keys(compiledStats).forEach(statName => {
      const val = compiledStats[statName].final;
      if (!val || val <= 0) return;
      
      let isMultiplicativeAspect = false;
      const aspectObj = (window.D4_DATABASE?.aspects || []).find(a => a.name === statName) 
                     || (window.D4_DATABASE?.uniques || []).find(u => u.name === statName);
      if (aspectObj && aspectObj.desc) {
          const descLower = aspectObj.desc.toLowerCase();
          if (descLower.includes('[x]') && descLower.includes('damage')) {
              isMultiplicativeAspect = true;
          }
      }
      
      if (isMultiplicativeAspect || statName.toLowerCase().includes('[x]')) {
          createMultiplicativeRow(statName, val.toFixed(2), true);
          return;
      }

      const lower = statName.toLowerCase();
      if (!lower.includes('damage') || lower.includes('reduction') || lower.includes('taken') || lower.includes('weapon damage') || statName === 'Skill Damage') return;
      
      let matches = false;
      if (lowerTags.includes('search_bone') && lower.includes('bone damage')) matches = true;
      if (lowerTags.includes('search_shadow') && lower.includes('shadow damage')) matches = true;
      if (lowerTags.includes('search_shadowdot') && lower.includes('shadow damage over time')) matches = true;
      if (lowerTags.includes('search_cold') && lower.includes('cold damage')) matches = true;
      if (lowerTags.includes('search_physical') && lower.includes('physical damage')) matches = true;
      if (lowerTags.includes('search_damageovertime') && lower.includes('damage over time')) matches = true;
      
      // Highly conditionals always on for now
      if (lower.includes('damage vs') || lower.includes('damage to') || lower.includes('damage while') || lower.includes('damage for') || lower.includes('critical') || lower.includes('vulnerable') || lower.includes('overpower') || statName === 'Damage' || lower.includes('core skill damage') || lower.includes('basic skill damage') || lower.includes('macabre skill damage')) {
          matches = true;
      }
      
      if (matches || lowerTags.length === 0) {
          createAdditiveRow(statName, val.toFixed(2), true);
      }
    });`;

if (app.includes("Object.keys(compiledStats).forEach(statName => {")) {
    // We will do string replacement on the entire block.
    // However, JS multiline strings with exact matching can be finicky due to CRLF.
    // Let's normalize CRLF to LF for the replacement block.
    const normalizedApp = app.replace(/\\r\\n/g, '\\n');
    const normalizedTarget = targetOld.replace(/\\r\\n/g, '\\n').trim();
    
    // Find the starting index of the target
    const startIndex = normalizedApp.indexOf("Object.keys(compiledStats).forEach(statName => {");
    if (startIndex !== -1) {
        // Find the ending index (end of the loop)
        const endIndex = normalizedApp.indexOf("});", startIndex + 500) + 3;
        
        const extracted = normalizedApp.substring(startIndex, endIndex);
        
        // We will just replace the extracted portion with targetNew
        app = normalizedApp.substring(0, startIndex) + targetNew.trim() + normalizedApp.substring(endIndex);
        
        fs.writeFileSync('app.js', app);
        console.log('Successfully replaced additive tags block!');
    } else {
        console.log('Failed to find start of block.');
    }
} else {
    console.log('Object.keys not found.');
}
