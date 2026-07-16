const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

const targetStr = `        itemObj.aspect = aspectName;
        
        let aspectMult = getAspectMultiplier(currentModalSlot, itemObj);
        
        // Auto-fill max value from database if available
        const aspectObj = window.D4_DATABASE?.aspects?.find(a => a.name === aspectName);
        if (aspectObj && aspectObj.maxValue) {
          itemObj.aspectValues = [parseFloat((aspectObj.maxValue * aspectMult).toFixed(2))];
        } else {
          itemObj.aspectValues = [];
        }`;

const replacementStr = `        if (window.isSelectingKullean) {
            itemObj.kulleanAspect = aspectName;
        } else {
            itemObj.aspect = aspectName;
        }
        
        let aspectMult = getAspectMultiplier(currentModalSlot, itemObj);
        
        // Auto-fill max value from database if available
        const aspectObj = window.D4_DATABASE?.aspects?.find(a => a.name === aspectName);
        let vals = [];
        if (aspectObj && aspectObj.maxValue) {
          vals = [parseFloat((aspectObj.maxValue * aspectMult).toFixed(2))];
        }
        
        if (window.isSelectingKullean) {
            itemObj.kulleanAspectValues = vals;
        } else {
            itemObj.aspectValues = vals;
        }`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacementStr);
    fs.writeFileSync('app.js', content);
    console.log('selectAspect patched successfully!');
} else {
    console.log('selectAspect target string not found! Falling back to regex...');
    // Fallback if formatting differs
    const fallbackTarget = /itemObj\.aspect = aspectName;\s*let aspectMult = getAspectMultiplier\(currentModalSlot, itemObj\);\s*\/\/ Auto-fill max value from database if available\s*const aspectObj = window\.D4_DATABASE\?\.aspects\?\.find\(a => a\.name === aspectName\);\s*if \(aspectObj && aspectObj\.maxValue\) \{\s*itemObj\.aspectValues = \[parseFloat\(\(aspectObj\.maxValue \* aspectMult\)\.toFixed\(2\)\)\];\s*\} else \{\s*itemObj\.aspectValues = \[\];\s*\}/;
    if (fallbackTarget.test(content)) {
        content = content.replace(fallbackTarget, replacementStr);
        fs.writeFileSync('app.js', content);
        console.log('selectAspect patched successfully via fallback!');
    } else {
        console.log('selectAspect fallback regex also failed.');
    }
}
