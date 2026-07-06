const fs = require('fs');
const appJs = fs.readFileSync('app.js', 'utf8');

// Find the IIFE
let iifeMatch = appJs.match(/\$\{\(\(\) => \{([\s\S]*?)return [\s\S]*?\}\)\(\)\}/g);
if (iifeMatch) {
    let lastIife = iifeMatch[iifeMatch.length - 1]; // The attack/cast speed IIFE is the last one in the card
    let body = lastIife.replace(/^\$\{\(\(\) => \{/, '').replace(/\}\)\(\)\}$/, '');
    
    // Simulate environment
    let displayImgName = 'Blood Boil';
    let window = {
        D4_COMPILED_STATS: {
            'Skill: Blood Boil (Cast Speed) [+]': { final: 20, flatSources: [{name: 'Cast Speed (Upgrade)', val: 20}] },
            'Attack Speed': { final: 15, flatSources: [] },
            'Cast Speed': { final: 0, flatSources: [] }
        }
    };
    
    // Evaluate
    try {
        let fn = new Function('window', 'displayImgName', body + '\nreturn csTotal;');
        console.log('csTotal:', fn(window, displayImgName));
    } catch(e) {
        console.log('Error:', e);
    }
}
