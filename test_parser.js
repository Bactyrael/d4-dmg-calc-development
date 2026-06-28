const fs = require('fs');
let skillsDb = require('./temp_skills.js');

function parseD4String(str, skillObj, currentRank) {
    if (!str) return '';
    
    str = str.replace(/\{if:ADVANCED_TOOLTIP\}([\s\S]*?)\{\/if\}/g, '$1');
    str = str.replace(/\{if:.*?\}[\s\S]*?\{\/if\}/g, '');
    
    str = str.replace(/\{c_([a-zA-Z]+)\}([\s\S]*?)\{\/c(?:_[a-zA-Z]+)?\}/g, '<span class="d4-color-$1">$2</span>');
    str = str.replace(/\{\/c(?:_[a-zA-Z]+)?\}/g, '');
    
    if (skillObj.baseDamageScalar) {
        let rankMult = 1.0;
        if (currentRank > 1) {
            let levelsGained = currentRank - 1;
            let enhancedIncreases = Math.floor(currentRank / 5);
            rankMult = 1.0 + (levelsGained * 0.10) + (enhancedIncreases * 0.05);
        }
        let percentage = (skillObj.baseDamageScalar * rankMult * 100).toFixed(1) + '%';
        str = str.replace(/\[\{payload:.*?\}[\s\S]*?\]|\{payload:.*?\}/g, percentage);
        str = str.replace(/\[\{dot:.*?\}[\s\S]*?\]|\{dot:.*?\}/g, percentage);
    } else {
        str = str.replace(/\[\{payload:.*?\}[\s\S]*?\]|\{payload:.*?\}/g, '?%');
        str = str.replace(/\[\{dot:.*?\}[\s\S]*?\]|\{dot:.*?\}/g, '?%');
    }
    
    str = str.replace(/\[(\d+(?:\.\d+)?)\*[A-Za-z]+\|.*?\]/g, '$1');
    str = str.replace(/\[Mod\([^)]+\)\?(\d+):(\d+)(?:\|.*?)?\]/g, '$2');
    
    if (skillObj.resourceCost) {
        str = str.replace(/\[\{resource cost\}[\s\S]*?\]/g, skillObj.resourceCost);
    }
    
    str = str.replace(/\[(.*?)\|.*?\]/g, '$1');
    str = str.replace(/\{icon:bullet,1\.2\}/g, '&bull; ');
    str = str.replace(/\{icon:.*?}/g, '* ');
    
    return str.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');
}

let remainingTags = new Set();
for (let cat in skillsDb) {
    skillsDb[cat].forEach(skill => {
        let parsed = parseD4String(skill.description, skill, 1);
        let m = parsed.match(/\{.*?\}/g) || [];
        m.forEach(t => remainingTags.add(t));
        
        if (skill.modifiers) {
            skill.modifiers.forEach(mod => {
                let p = parseD4String(mod.description, mod, 1);
                let m2 = p.match(/\{.*?\}/g) || [];
                m2.forEach(t => remainingTags.add(t));
            });
        }
    });
}

console.log("Remaining tags wrapped in {}:", Array.from(remainingTags));

// Also check for unparsed Maxroll array math like [13*...]
let remainingBrackets = new Set();
for (let cat in skillsDb) {
    skillsDb[cat].forEach(skill => {
        let parsed = parseD4String(skill.description, skill, 1);
        let m = parsed.match(/\[.*?\]/g) || [];
        m.forEach(t => remainingBrackets.add(t));
        
        if (skill.modifiers) {
            skill.modifiers.forEach(mod => {
                let p = parseD4String(mod.description, mod, 1);
                let m2 = p.match(/\[.*?\]/g) || [];
                m2.forEach(t => remainingBrackets.add(t));
            });
        }
    });
}
console.log("Remaining items wrapped in []:", Array.from(remainingBrackets));
