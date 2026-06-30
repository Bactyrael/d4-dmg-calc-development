const fs = require('fs');
const path = require('path');

let app = fs.readFileSync('app.js', 'utf8');

// 1. Generate the Set of available icons
const necroIcons = fs.readdirSync('assets/Skills/Necromancer')
    .filter(f => f.endsWith('.png'))
    .map(f => f.replace('.png', ''));

const setInjection = `\nwindow.NECRO_ICONS = new Set(${JSON.stringify(necroIcons)});\n`;

// Inject if not present
if (!app.includes('window.NECRO_ICONS = new Set')) {
    // Inject right after DOMContentLoaded or top of file
    app = setInjection + app;
}

// 2. Update renderCalcSkills
const renderTarget = `                let iconUrl = \`assets/Skills/\${clsName}/\${imgName}.png\`;
                let baseNameSlug = baseSkill.name.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-');
                let fallbackUrl = \`assets/Skills/\${clsName}/\${imgName}-\${baseNameSlug}.png\`;
                
                let iconHtml = \`<img src="\${iconUrl}" style="width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px;" onerror="if(!this.dataset.triedFallback){this.dataset.triedFallback='1';this.src='\${fallbackUrl}';}else{this.outerHTML='<div style=\\'width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #222; color: #888;\\'>?</div>';}">\`;`;

const renderReplacement = `                let baseNameSlug = baseSkill.name.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-');
                
                let finalIconName = baseNameSlug; // Default to base skill if all else fails
                if (window.NECRO_ICONS) {
                    if (window.NECRO_ICONS.has(imgName)) {
                        finalIconName = imgName;
                    } else if (window.NECRO_ICONS.has(imgName + '-' + baseNameSlug)) {
                        finalIconName = imgName + '-' + baseNameSlug;
                    }
                }
                
                let iconUrl = \`assets/Skills/\${clsName}/\${finalIconName}.png\`;
                let iconHtml = \`<img src="\${iconUrl}" style="width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px;" onerror="this.outerHTML='<div style=\\'width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #222; color: #888;\\'>?</div>'">\`;`;

if (app.includes(renderTarget.trim())) {
    app = app.replace(renderTarget.trim(), renderReplacement.trim());
}

// 3. Update createSlot
const createSlotTarget = `                let imgSrc = \`assets/Skills/\${clsName}/\${imgName}.png\`;
                
                const img = document.createElement('img');
                img.src = imgSrc;
                img.onerror = () => { 
                    // If the direct name fails, try appending the base skill name (e.g. crowd-control-decompose.png)
                    if (!isBase && baseSkillName && img.src.includes(imgSrc)) {
                        let baseName = baseSkillName.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-');
                        img.src = \`assets/Skills/\${clsName}/\${imgName}-\${baseName}.png\`;
                    } else {
                        img.style.display = 'none'; 
                    }
                };`;

const createSlotReplacement = `                let baseName = baseSkillName ? baseSkillName.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-') : '';
                let finalIconName = imgName;
                if (!isBase && window.NECRO_ICONS) {
                    if (window.NECRO_ICONS.has(imgName)) {
                        finalIconName = imgName;
                    } else if (baseName && window.NECRO_ICONS.has(imgName + '-' + baseName)) {
                        finalIconName = imgName + '-' + baseName;
                    } else if (baseName && window.NECRO_ICONS.has(baseName)) {
                        finalIconName = baseName;
                    }
                }
                
                let imgSrc = \`assets/Skills/\${clsName}/\${finalIconName}.png\`;
                const img = document.createElement('img');
                img.src = imgSrc;
                img.onerror = () => { img.style.display = 'none'; };`;

if (app.includes(createSlotTarget.trim())) {
    app = app.replace(createSlotTarget.trim(), createSlotReplacement.trim());
}

fs.writeFileSync('app.js', app);
console.log('Successfully injected exact icon mapping to prevent 404s!');
