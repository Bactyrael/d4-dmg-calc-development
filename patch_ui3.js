const fs = require('fs');
let app = fs.readFileSync('paragon_logic.js', 'utf8').replace(/\r\n/g, '\n');

const targetStr = `            } else if (affixData.requiredRank >= 2 || affixKey.includes('Legendary')) {
                legBonus = formatDesc(affixData.desc, val);
            } else {
                baseBonuses.push(formatDesc(affixData.desc, val));
            }
        });`;

const replStr = `            } else if (affixData.requiredRank >= 2 || affixKey.includes('Legendary')) {
                legBonus = formatDesc(affixData.desc, val);
            } else {
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
            }
        });`;

app = app.replace(targetStr, replStr);

fs.writeFileSync('paragon_logic.js', app);
console.log('CRLF normalized and replaced');
