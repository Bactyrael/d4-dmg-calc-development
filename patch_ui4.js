const fs = require('fs');
let app = fs.readFileSync('paragon_logic.js', 'utf8').replace(/\r\n/g, '\n');

// Target 1: Add globalStatTracker before baseBonuses
app = app.replace(/let baseBonuses = \[\];/, 
`let baseBonuses = [];
    let globalStatTracker = "";`);

// Target 2: Change the injection logic to set globalStatTracker instead of appending
const target2 = `            } else {
                let statTracker = "";
                if (affixData.convertedAttributes && affixData.convertedAttributes.length > 0) {
                    let reqAttrId = affixData.convertedAttributes[0].from?.id;
                    if (reqAttrId && slotIndex !== undefined && slotIndex !== -1 && window.getGlyphStatsInRadius) {
                        let currentStats = window.getGlyphStatsInRadius(slotIndex, {id: glyphId, level: level});
                        let curVal = 0;
                        let attrName = "Stat";
                        if (reqAttrId === 9 || reqAttrId === 18) { curVal = currentStats.Strength; attrName = "Strength"; }
                        else if (reqAttrId === 10 || reqAttrId === 19) { curVal = currentStats.Intelligence; attrName = "Intelligence"; }
                        else if (reqAttrId === 11 || reqAttrId === 20) { curVal = currentStats.Willpower; attrName = "Willpower"; }
                        else if (reqAttrId === 12 || reqAttrId === 21) { curVal = currentStats.Dexterity; attrName = "Dexterity"; }
                        
                        statTracker = \` <span style="color: #999; font-size: 0.85em; font-style: italic;">(\${curVal} \${attrName} in radius)</span>\`;
                    }
                }
                baseBonuses.push(formatDesc(affixData.desc, val) + statTracker);
            }`;

const repl2 = `            } else {
                if (affixData.convertedAttributes && affixData.convertedAttributes.length > 0) {
                    let reqAttrId = affixData.convertedAttributes[0].from?.id;
                    if (reqAttrId && slotIndex !== undefined && slotIndex !== -1 && window.getGlyphStatsInRadius) {
                        let currentStats = window.getGlyphStatsInRadius(slotIndex, {id: glyphId, level: level});
                        let curVal = 0;
                        let attrName = "Stat";
                        if (reqAttrId === 9 || reqAttrId === 18) { curVal = currentStats.Strength; attrName = "Strength"; }
                        else if (reqAttrId === 10 || reqAttrId === 19) { curVal = currentStats.Intelligence; attrName = "Intelligence"; }
                        else if (reqAttrId === 11 || reqAttrId === 20) { curVal = currentStats.Willpower; attrName = "Willpower"; }
                        else if (reqAttrId === 12 || reqAttrId === 21) { curVal = currentStats.Dexterity; attrName = "Dexterity"; }
                        
                        globalStatTracker = \` <span style="color: #999; font-size: 0.85em; font-style: italic;">(\${curVal} \${attrName} in radius)</span>\`;
                    }
                }
                baseBonuses.push(formatDesc(affixData.desc, val));
            }`;
app = app.replace(target2, repl2);

// Target 3: Append to Bonus:
app = app.replace(/html \+= \`<div style="color: #c9a55c; font-size: 0\.95rem; margin-top: 8px;">Bonus:<\/div>\`;/, 
`html += \`<div style="color: #c9a55c; font-size: 0.95rem; margin-top: 8px;">Bonus:\${globalStatTracker}</div>\`;`);

fs.writeFileSync('paragon_logic.js', app);
console.log('Moved tracker next to Bonus header');
