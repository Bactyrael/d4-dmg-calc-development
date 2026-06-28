const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Inject isAspectDuplicated function
const duplicateFunc = `
  function isAspectDuplicated(aspectName, currentSlotName) {
      if (!aspectName || aspectName === 'None') return false;
      let duplicated = false;
      document.querySelectorAll('.equipment-slot-box').forEach(box => {
          if (box.dataset.slot === currentSlotName) return;
          if (box.dataset.value) {
              try {
                  const item = JSON.parse(box.dataset.value);
                  if (item.aspect === aspectName) duplicated = true;
              } catch (e) {}
          }
      });
      return duplicated;
  }
`;

if (!appJs.includes('isAspectDuplicated')) {
    appJs = appJs.replace('function selectItem(itemName)', duplicateFunc + '\n  function selectItem(itemName)');
}

// 2. Patch renderEditTab for warning HTML
if (!appJs.includes('aspectWarningHtml')) {
    appJs = appJs.replace(
        `let aspectDescHtml = '';`,
        `let aspectDescHtml = '';\n        let aspectWarningHtml = '';\n        if (currentAspectName !== 'None' && isAspectDuplicated(currentAspectName, slotName)) {\n            aspectWarningHtml = ' <span style="cursor: help; margin-left: 6px; color: #d97706; font-size: 1.1em;" title="Aspect already present on another item">&#9888;</span>';\n        }`
    );
    appJs = appJs.replace(
        `<span>Legendary Aspect</span>`,
        `<span>Legendary Aspect\${aspectWarningHtml}</span>`
    );
}

// 3. Patch compileCharacterStats for deduplication
if (!appJs.includes('bestAspects')) {
    const dedupeLogic = `
        const bestAspects = {};
        Object.keys(equipped).forEach(slotName => {
            const item = equipped[slotName];
            if (!item || !item.name) return;
            if (item.aspect && item.aspect !== 'None') {
                const aspectName = item.aspect;
                let val = 0;
                if (item.aspectValues && item.aspectValues.length > 0) val = item.aspectValues[0];
                if (!bestAspects[aspectName] || val > bestAspects[aspectName].val) {
                    bestAspects[aspectName] = { val, slotName };
                }
            }
        });
        
        Object.keys(equipped).forEach(slotName => {`;
    
    appJs = appJs.replace(
        `Object.keys(equipped).forEach(slotName => {`,
        dedupeLogic
    );
    
    const applyAspectLogic = `if (item.aspect && item.aspect !== 'None') {
                if (bestAspects[item.aspect] && bestAspects[item.aspect].slotName !== slotName) {
                    // Weaker duplicate, do not apply
                } else {
                    const aspectObj = (window.D4_DATABASE?.aspects || []).find(a => a.name === item.aspect);
                    if (aspectObj && aspectObj.desc) {
                        let v = 0;
                        if (item.aspectValues && item.aspectValues.length > 0) v = item.aspectValues[0];
                        const clean = cleanStatName(item.aspect);
                        addStat(stats, clean, v, slotName);
                    }
                }
            }`;
            
    // Regex replace the old aspect apply logic
    appJs = appJs.replace(
        /if \(item\.aspect && item\.aspect !== 'None'\) \{\s*const aspectObj = \(window\.D4_DATABASE\?\.aspects \|\| \[\]\)\.find\(a => a\.name === item\.aspect\);\s*if \(aspectObj && aspectObj\.desc\) \{\s*let v = 0;\s*if \(item\.aspectValues && item\.aspectValues\.length > 0\) v = item\.aspectValues\[0\];\s*const clean = cleanStatName\(item\.aspect\);\s*addStat\(stats, clean, v, slotName\);\s*\}\s*\}/g,
        applyAspectLogic
    );
}

fs.writeFileSync('app.js', appJs, 'utf8');
console.log('Successfully patched duplicate aspect logic in app.js');
