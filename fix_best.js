const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const marker = "if (!equipped) return stats;";
const idx = appJs.indexOf(marker);

const insertStr = `
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
`;

if (idx !== -1) {
    const endOfMarker = idx + marker.length;
    appJs = appJs.substring(0, endOfMarker) + '\\n\\n' + insertStr + appJs.substring(endOfMarker);
    // Un-escape newline characters (I wrote '\\n' intentionally to avoid CR/LF syntax literal issues in string block)
    appJs = appJs.replace(/\\n/g, '\n'); 
    fs.writeFileSync('app.js', appJs, 'utf8');
    console.log("Successfully injected bestAspects!");
} else {
    console.log("Failed to find marker!");
}
