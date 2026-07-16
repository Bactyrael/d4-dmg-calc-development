const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

// Replacements from previous turn
content = content.replace(/\[\.\.\.Object\.values\(equipped \|\| \{\}\), \.\.\.\(window\.currentBuild\?\.talisman\?\.charms \|\| \[\]\)\]/g, "window.getAllEquippedItemsWithAspects(window.currentBuild)");
content = content.replace(/\[\.\.\.Object\.values\(currentBuild\.equipment \|\| \{\}\), \.\.\.\(currentBuild\.talisman\?\.charms \|\| \[\]\)\]/g, "window.getAllEquippedItemsWithAspects(currentBuild)");
content = content.replace(/\[\.\.\.Object\.values\(window\.currentBuild\.equipment \|\| \{\}\), \.\.\.\(window\.currentBuild\.talisman\?\.charms \|\| \[\]\)\]/g, "window.getAllEquippedItemsWithAspects(window.currentBuild)");

// Injecting Kullean Aspect variable
content = content.replace("let aspectSection = '';", "let aspectSection = '';\n    let kulleanAspectSection = '';");

// Injecting Kullean Aspect Logic inside renderEditTab
const insertionPoint = `    if (slotName.toLowerCase() === 'seal' || slotName.toLowerCase().startsWith('charm')) {`;

const kulleanLogic = `    if (slotName.toLowerCase() === 'amulet') {
      const currentKulleanAspectName = itemObj.kulleanAspect || 'None';
      let kulleanAspectDescHtml = '';
      if (currentKulleanAspectName !== 'None') {
        const aspectObj = (window.D4_DATABASE?.aspects || []).find(a => a.name === currentKulleanAspectName);
        if (aspectObj && aspectObj.desc) {
          let aspectMult = getAspectMultiplier(slotName, itemObj);
          const vals = itemObj.kulleanAspectValues || [];
          let valIndex = 0;
          kulleanAspectDescHtml = aspectObj.desc.replace(/(?:\\[([\\d\\.,]+)\\s*-\\s*([\\d\\.,]+)\\])|#/g, (match, minStr, maxStr) => {
            let min = minStr ? parseFloat(minStr.replace(/,/g, '')) * aspectMult : (aspectObj.minVal ? parseFloat(aspectObj.minVal) * aspectMult : null);
            let max = maxStr ? parseFloat(maxStr.replace(/,/g, '')) * aspectMult : (aspectObj.maxVal ? parseFloat(aspectObj.maxVal) * aspectMult : null);
            if (min !== null) min = parseFloat(min.toFixed(2));
            if (max !== null) max = parseFloat(max.toFixed(2));
            
            let v = vals[valIndex] !== undefined ? vals[valIndex] : (max || min || 0);
            if (typeof v === 'string') v = parseFloat(v.replace(/,/g, ''));
            v = parseFloat(Number(v).toFixed(2));

            let placeholder = (min !== null && max !== null) ? \`\${min}-\${max}\` : 'value';
            let minAttr = min !== null ? \` min="\${min}"\` : '';
            let maxAttr = max !== null ? \` max="\${max}"\` : '';
            let stepAttr = (min !== null && !Number.isInteger(min)) || (max !== null && !Number.isInteger(max)) ? ' step="0.1"' : ' step="1"';
            if (min === null && max === null) stepAttr = ' step="any"';
            const inputHtml = \`<input type="number" class="kullean-aspect-val-input" data-idx="\${valIndex}" value="\${v}" placeholder="\${placeholder}" title="\${placeholder}"\${minAttr}\${maxAttr}\${stepAttr} style="width: 85px; min-width: 85px; flex-shrink: 0; padding: 2px 4px; text-align: center; border: 1px solid #555; border-radius: 3px; background: rgba(0,0,0,0.5); color: #8ab4f8; font-family: inherit; font-size: 0.9em; margin: 0 2px;">\`;
            valIndex++;
            return inputHtml;
          });
          kulleanAspectDescHtml = \`<div style="margin-top: 8px; color: #d18a45; font-size: 0.9rem; line-height: 1.5;">\${kulleanAspectDescHtml}</div>\`;
        }
      }
      
      kulleanAspectSection = \`
        <div class="edit-section">
          <div class="edit-section-title orange" style="display: flex; justify-content: space-between; align-items: center;">
            <span>Kullean Aspect</span>
            <button class="edit-btn" id="btn-select-kullean-aspect" style="padding: 2px 8px; font-size: 0.75rem;">Change</button>
          </div>
          <div class="edit-section-content" style="padding: 4px 0;">
            <div style="color: var(--text-primary); font-size: 0.95rem; font-weight: 500;">\${currentKulleanAspectName}</div>
            \${kulleanAspectDescHtml}
          </div>
        </div>
      \`;
    }

    if (slotName.toLowerCase() === 'seal' || slotName.toLowerCase().startsWith('charm')) {`;

content = content.replace(insertionPoint, kulleanLogic);

// Injecting Kullean Aspect Section output
content = content.replace(/\$\{aspectSection\}/g, "${aspectSection}\n      ${kulleanAspectSection}");

fs.writeFileSync('app.js', content);
console.log('App.js updated successfully');
