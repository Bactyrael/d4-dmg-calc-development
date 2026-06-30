const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetStr = `
                let imgName = displayImgName.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-');
                let clsName = (typeof currentBuild !== 'undefined' && currentBuild && currentBuild.class) ? currentBuild.class : 'Necromancer';
                let iconUrl = \`assets/Skills/\${clsName}/\${imgName}.png\`;
                
                let iconHtml = iconUrl 
                    ? \`<img src="\${iconUrl}" style="width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px;" onerror="this.outerHTML='<div style=\\'width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #222; color: #888;\\'>?</div>'">\` 
                    : \`<div style="width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #222; color: #888;">?</div>\`;
`;

const replacementStr = `
                let imgName = displayImgName.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-');
                let clsName = (typeof currentBuild !== 'undefined' && currentBuild && currentBuild.class) ? currentBuild.class : 'Necromancer';
                let iconUrl = \`assets/Skills/\${clsName}/\${imgName}.png\`;
                let baseNameSlug = baseSkill.name.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-');
                let fallbackUrl = \`assets/Skills/\${clsName}/\${imgName}-\${baseNameSlug}.png\`;
                
                let iconHtml = \`<img src="\${iconUrl}" style="width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px;" onerror="if(!this.dataset.triedFallback){this.dataset.triedFallback='1';this.src='\${fallbackUrl}';}else{this.outerHTML='<div style=\\'width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #222; color: #888;\\'>?</div>';}">\`;
`;

// wait, the target string in app.js might not exactly match due to previous replaces. I'll use a regex replacement.

let replaced = false;

// We will find where `let imgName = displayImgName` is and replace up to the iconHtml assignment
const regex = /let imgName = displayImgName[\s\S]*?iconHtml = [^;]+;/;
if (regex.test(app)) {
    app = app.replace(regex, replacementStr.trim());
    fs.writeFileSync('app.js', app);
    console.log('Successfully updated fallback icon logic!');
    replaced = true;
} else {
    console.log('Failed to match Regex');
}
