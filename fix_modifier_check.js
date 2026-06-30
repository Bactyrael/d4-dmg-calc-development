const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetStr = `
                let displayImgName = baseSkill.name;
                if (baseSkill.modifiers) {
                    for (let i = baseSkill.modifiers.length - 1; i >= 0; i--) {
                        if (window.selectedSkills[baseSkill.modifiers[i].name] > 0) {
                            displayImgName = baseSkill.modifiers[i].name;
                            break;
                        }
                    }
                }
`;

const replacementStr = `
                let displayImgName = baseSkill.name;
                if (baseSkill.modifiers) {
                    // Only check the first 3 modifiers (index 0, 1, 2) which are the diamonds/modifiers.
                    // Upgrades (circles) are index 3+ and should not change the skill's identity.
                    let maxIndex = Math.min(2, baseSkill.modifiers.length - 1);
                    for (let i = maxIndex; i >= 0; i--) {
                        if (window.selectedSkills[baseSkill.modifiers[i].name] > 0) {
                            displayImgName = baseSkill.modifiers[i].name;
                            break;
                        }
                    }
                }
`;

if (app.includes(targetStr.trim())) {
    app = app.replace(targetStr.trim(), replacementStr.trim());
    fs.writeFileSync('app.js', app);
    console.log('Successfully updated to only check modifiers (diamonds)');
} else {
    console.log('Failed to match string in app.js');
}
