const fs = require('fs');

// --- 1. Patch app.js Tooltips ---
let appJs = fs.readFileSync('app.js', 'utf8');

// Title Type fix for Mythic Seals
const titleTarget = 'if (isMythic) titleType = "Mythic Unique";';
const titleReplace = `if (itemObj.type === 'Seal' && isMythic) titleType = "Mythic Unique Horadric Seal";
    else if (isMythic) titleType = "Mythic Unique";`;
if (appJs.includes(titleTarget)) appJs = appJs.replace(titleTarget, titleReplace);

// Unlocks 6 Charm Slots injection
const typeTarget = `        <div style="color: #ccc; font-size: 0.9rem; margin-bottom: 10px;">
            900 Item Power
        </div>`;
const typeReplace = `        <div style="color: #ccc; font-size: 0.9rem; margin-bottom: 10px;">
            900 Item Power
        </div>
        \${itemObj.type === 'Seal' ? \`<div style="margin-top: 10px; margin-bottom: 10px; border-top: 1px solid #444; border-bottom: 1px solid #444; padding: 8px 0; color: #ccc; font-size: 0.85rem; display: flex; align-items: center; text-transform: none;"><span style="color: #777; margin-right: 5px;">❖</span> Unlocks 6 Charm Slots</div>\` : ''}`;
if (appJs.includes(typeTarget)) appJs = appJs.replace(typeTarget, typeReplace);

// Unique Power fix for Seals
const uniquePowerTarget = `        if (uniqueObj && uniqueObj.desc) {
            let udesc = uniqueObj.desc;`;
const uniquePowerReplace = `        if ((uniqueObj && uniqueObj.desc) || (itemObj.type === 'Seal' && itemObj.desc)) {
            let udesc = (itemObj.type === 'Seal') ? itemObj.desc : uniqueObj.desc;
            let flavorHtml = itemObj.flavorText ? \`<div style="margin-top: 10px; color: #888; font-style: italic; font-size: 0.8rem;">"\${itemObj.flavorText}"</div>\` : '';`;
            
const uniquePowerEndTarget = `                    <span style="color: #d18a45;">\${udesc}</span>
                </div>
            \`;`;
const uniquePowerEndReplace = `                    <span style="color: #d18a45; width: 100%;">\${udesc}
                        \${flavorHtml}
                    </span>
                </div>
            \`;`;

if (appJs.includes(uniquePowerTarget)) appJs = appJs.replace(uniquePowerTarget, uniquePowerReplace);
if (appJs.includes(uniquePowerEndTarget)) appJs = appJs.replace(uniquePowerEndTarget, uniquePowerEndReplace);

// Ensure Aspect Star is purple for Mythic unique power, otherwise keep it default (or maybe they want it purple in screenshot)
// The screenshot shows a purple/blue star symbol instead of gold star? No, the screenshot shows a purple star for the unique power: ❖
const starTarget = `<span style="color: #e1b171; margin-right: 5px;">★</span>`;
const starReplace = `<span style="color: \${isMythic ? '#c17ce2' : '#e1b171'}; margin-right: 5px; font-size: 1.1em;">\${isMythic ? '❖' : '★'}</span>`;
if (appJs.includes(starTarget)) appJs = appJs.replace(new RegExp(starTarget.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g, '\\\\$&'), 'g'), starReplace);

// We should also change color of the unique description for mythics
const udescTarget = `<span style="color: #d18a45; width: 100%;">\${udesc}`;
const udescReplace = `<span style="color: \${isMythic ? '#c17ce2' : '#d18a45'}; width: 100%;">\${udesc}`;
if (appJs.includes(udescTarget)) appJs = appJs.replace(udescTarget, udescReplace);


fs.writeFileSync('app.js', appJs, 'utf8');

// --- 2. Patch assets/database.js ---
let dbJs = fs.readFileSync('assets/database.js', 'utf8');
const diamondMindTarget = 'desc: "Reduces the number of Charms needed for Set bonuses by 1 (to a minimum of 2)."';
const diamondMindReplace = `desc: "Reduces the number of Charms needed for Set bonuses by 1 (to a minimum of 2).",
            flavorText: "Every facet, precise. Each turn of the stone, a symphony of refracted light. How miraculous the properties? How thrilling the possibilities?" -Zoltun Kulle`;
// Fix syntax string
const diamondMindReplaceSafe = `desc: "Reduces the number of Charms needed for Set bonuses by 1 (to a minimum of 2).",
            flavorText: "Every facet, precise. Each turn of the stone, a symphony of refracted light. How miraculous the properties? How thrilling the possibilities?\\" -Zoltun Kulle"`;
if (dbJs.includes(diamondMindTarget)) dbJs = dbJs.replace(diamondMindTarget, diamondMindReplaceSafe);

const goldenEpiphanyTarget = 'desc: "Can equip up to 3 Unique Charms."';
const goldenEpiphanyReplaceSafe = `desc: "Can equip up to 3 Unique Charms.",
            flavorText: "I know what I must do. Phoba, Fer, Mlor, aligned upon a single, terrible course. Yet despite myself, I find the certainty not only comforting but beautiful in its simplicity.\\" -Tal Rasha"`;
if (dbJs.includes(goldenEpiphanyTarget)) dbJs = dbJs.replace(goldenEpiphanyTarget, goldenEpiphanyReplaceSafe);

fs.writeFileSync('assets/database.js', dbJs, 'utf8');

console.log("Patched tooltips and database for mythic seals!");
