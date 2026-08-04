const fs = require('fs');
let lines = fs.readFileSync('app.js', 'utf8').split('\n');
let idx = lines.findIndex(l => l.includes("if (item && item.aspect === 'Aspect of Biting Cold') {"));

if (idx > -1) {
    let injection = `            if (item && item.aspect === 'Bristleback Aspect') {
                let tags = skillObj.tags ? skillObj.tags.map(t => t.toLowerCase()) : [];
                if (tags.includes('thorns') || skillObj.name.includes('Thorns')) {
                    let val = 200; // Default minimum roll
                    if (item.aspectValues && item.aspectValues.length > 0) {
                        val = parseFloat(item.aspectValues[0]) || 200;
                    }
                    let mult = 1 + (val / 100);
                    multiMult *= mult;
                    multiData.components.push({ name: \`Bristleback Aspect [x]\`, value: mult });
                }
            }
`;
    lines.splice(idx, 0, injection);
    fs.writeFileSync('app.js', lines.join('\n'));
    console.log('Successfully injected Bristleback code.');
} else {
    console.log('Could not find insertion point.');
}
