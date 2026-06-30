const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const target = `
                let iconUrl = '';
                if (window.NODE_IMAGES && window.NODE_IMAGES[modSkill.name.toLowerCase()]) {
                    // Try to guess path, typically it's assets/images/Necromancer/Skills/...
                    iconUrl = 'assets/images/Necromancer/Skills/' + window.NODE_IMAGES[modSkill.name.toLowerCase()];
                }
`;

const replacement = `
                let displayImgName = baseSkill.name;
                if (baseSkill.modifiers) {
                    for (let i = baseSkill.modifiers.length - 1; i >= 0; i--) {
                        if (window.selectedSkills[baseSkill.modifiers[i].name] > 0) {
                            displayImgName = baseSkill.modifiers[i].name;
                            break;
                        }
                    }
                }
                let imgName = displayImgName.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-');
                let clsName = (typeof currentBuild !== 'undefined' && currentBuild && currentBuild.class) ? currentBuild.class : 'Necromancer';
                let iconUrl = \`assets/Skills/\${clsName}/\${imgName}.png\`;
`;

// Also, the previous iconUrl template literal was:
// <img src="\${iconUrl}" style="width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px;" onerror="this.style.display='none'">
// Let's modify the fallback in case the image fails to load to show the question mark box.
const targetHtml = ` onerror="this.style.display='none'"`;
const replacementHtml = ` onerror="this.outerHTML='<div style=\\'width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #222; color: #888;\\'>?</div>'"`;

if (app.includes(target.trim())) {
    app = app.replace(target.trim(), replacement.trim());
    if (app.includes(targetHtml)) {
        app = app.replace(targetHtml, replacementHtml);
    }
    fs.writeFileSync('app.js', app);
    console.log('Fixed skill image logic');
} else {
    console.log('Could not find image logic block');
}
