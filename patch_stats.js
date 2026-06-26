const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const insertStr = `
            if (item.aspect && item.aspect !== 'None') {
                if (bestAspects[item.aspect] && bestAspects[item.aspect].slotName !== slotName) {
                    // Do not apply this duplicate aspect (weaker version)
                } else {
                    const aspectObj = (window.D4_DATABASE?.aspects || []).find(a => a.name === item.aspect);
                    if (aspectObj && aspectObj.desc) {
                        let v = 0;
                        if (item.aspectValues && item.aspectValues.length > 0) v = item.aspectValues[0];
                        const clean = cleanStatName(item.aspect);
                        addStat(stats, clean, v, slotName);
                    }
                }
            }
`;

// Find the line: // Distribute All Stats
const marker = "// Distribute All Stats";
const idx = appJs.indexOf(marker);
if (idx !== -1) {
    // We want to insert right before the `});` that closes the equipped items loop.
    // Let's just find the `});` right before `// Distribute All Stats`
    const beforeStats = appJs.substring(0, idx);
    const lastClosingBracket = beforeStats.lastIndexOf('});');
    if (lastClosingBracket !== -1) {
        appJs = beforeStats.substring(0, lastClosingBracket) + insertStr + '\\n        ' + beforeStats.substring(lastClosingBracket) + appJs.substring(idx);
        fs.writeFileSync('app.js', appJs, 'utf8');
        console.log("Successfully injected using regex-less indexOf!");
    } else {
        console.log("Could not find }); before Distribute All Stats");
    }
} else {
    console.log("Could not find // Distribute All Stats");
}
