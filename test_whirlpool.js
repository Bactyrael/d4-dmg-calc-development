function getBaseDamageScalarFor(name) { return null; }
function parseD4String(str, skillObj, currentRank) {
    if (!str) return '';
    
    // Fix escaped brackets for multipliers like \[x\]
    str = str.replace(/\\\[([x\+])\\\]/g, '[$1]');
    
    str = str.replace(/\{if:ADVANCED_TOOLTIP\}([\s\S]*?)\{\/if\}/g, '$1');
    str = str.replace(/\{if:.*?\}[\s\S]*?\{\/if\}/g, '');
    
    // Replace colors (run twice for nesting)
    str = str.replace(/\{c_([a-zA-Z]+)\}([\s\S]*?)\{\/c(?:_[a-zA-Z]+)?\}/g, '<span class="d4-color-$1">$2</span>');
    str = str.replace(/\{c_([a-zA-Z]+)\}([\s\S]*?)\{\/c(?:_[a-zA-Z]+)?\}/g, '<span class="d4-color-$1">$2</span>');
    str = str.replace(/\{\/c(?:_[a-zA-Z]+)?\}/g, '');
    
    // Underlines
    str = str.replace(/\{u\}([\s\S]*?)\{\/u\}/g, '<span style="text-decoration: underline;">$1</span>');
    str = str.replace(/\{\/?u\}/g, '');
    
    let scalar = skillObj.baseDamageScalar || getBaseDamageScalarFor(skillObj.name);
    if (scalar) {
        let rankMult = 1.0;
        if (currentRank > 1) {
            let levelsGained = currentRank - 1;
            let enhancedIncreases = Math.floor(currentRank / 5);
            let scalePerLevel = skillObj.damageScalePerLevel !== undefined ? skillObj.damageScalePerLevel : 0.10;
            let scalePerFive = skillObj.damageScalePerFive !== undefined ? skillObj.damageScalePerFive : 0.05;
            rankMult = 1.0 + (levelsGained * scalePerLevel) + (enhancedIncreases * scalePerFive);
        }
        if (skillObj.secondaryScalars) {
            for (let payloadKey in skillObj.secondaryScalars) {
                let secScalar = skillObj.secondaryScalars[payloadKey];
                let secPercentage = (secScalar * rankMult * 100).toFixed(1) + '%';
                let regex = new RegExp(`\\[\\{payload:${payloadKey}\\}[\\s\\S]*?\\]|\\{payload:${payloadKey}\\}`, 'g');
                str = str.replace(regex, secPercentage);
            }
        }
        
        let percentage = (scalar * rankMult * 100).toFixed(1) + '%';
        str = str.replace(/\[\{payload:.*?\}[\s\S]*?\]|\{payload:.*?\}/g, percentage);
        str = str.replace(/\[\{dot:.*?\}[\s\S]*?\]|\{dot:.*?\}/g, percentage);
    } else {
        str = str.replace(/\[\{payload:.*?\}[\s\S]*?\]|\{payload:.*?\}/g, '?%');
        str = str.replace(/\[\{dot:.*?\}[\s\S]*?\]|\{dot:.*?\}/g, '?%');
    }
    
    // Replace Math formulas like [15*Table(34,sLevel)|%|] with scaled value
    str = str.replace(/\[(\d+(?:\.\d+)?)\*Table\(\d+,sLevel\)(?:\|.*?\|?)?\]/gi, (match, p1) => {
        let baseVal = parseFloat(p1);
        let utilMult = 1.0;
        if (currentRank > 1) {
            utilMult = 1.0 + ((currentRank - 1) * 0.10);
        }
        return (baseVal * utilMult).toFixed(1).replace(/\.0$/, '') + '%';
    });
    
    // Catch-all for any other multiplier like [15*foo] that we don't scale
    str = str.replace(/\[(\d+(?:\.\d+)?)\*([^\]]+)\]/g, (match, p1, p2) => {
        let val = parseFloat(p1);
        // If the formula explicitly multiplies by 100 at the end (for percentage formatting)
        if (p2.includes('*100')) {
            val = val * 100;
        }
        return val + '%';
    });
    
    str = str.replace(/\[Mod\([^)]+\)\?(\d+):(\d+)(?:\|.*?)?\]/g, '$2');
    
    if (skillObj.resourceCost) {
        str = str.replace(/\[\{resource cost\}[\s\S]*?\]/g, skillObj.resourceCost);
    }
    
    if (skillObj.luckyHitChance) {
        str = str.replace(/\[\{combat effect chance\}[\s\S]*?\]/g, skillObj.luckyHitChance);
        str = str.replace(/\{combat effect chance\}/g, skillObj.luckyHitChance);
    } else {
        str = str.replace(/\[\{combat effect chance\}[\s\S]*?\]/g, '?');
        str = str.replace(/\{combat effect chance\}/g, '?');
    }
    
    // Strip other remaining {tag:value} things like {shield:barrier}, {buffduration:xxx}
    str = str.replace(/\{[a-zA-Z_]+:[a-zA-Z_]+\}/g, '?');
    str = str.replace(/\{cooldown time\}/g, '?');
    
    // Evaluate PlayerHealthMax() formulas dynamically based on user's inputted Maximum Life
    str = str.replace(/\[PlayerHealthMax\(\)\*\((.*?)\)(?:\|.*?\|?)?\]/gi, (match, formula) => {
        let maxLife = 1526; // Default level 50 life
        if (typeof dom !== 'undefined' && dom.maxLife) {
            maxLife = parseFloat(dom.maxLife.value) || 1526;
        }
        
        let mathRes = formula.replace(/(\d+(?:\.\d+)?)\*Table\(\d+,sLevel\)/gi, (m, p1) => {
            let baseVal = parseFloat(p1);
            let utilMult = 1.0;
            if (typeof currentRank !== 'undefined' && currentRank > 1) {
                utilMult = 1.0 + ((currentRank - 1) * 0.10);
            }
            return baseVal * utilMult;
        });
        
        let coefficient = 0;
        try {
            coefficient = eval(mathRes);
        } catch (e) {
            coefficient = 0;
        }
        
        return Math.round(maxLife * coefficient).toString();
    });

    
    // Clean up random brackets with pipes [something|2?|]
    str = str.replace(/\[(.*?)\|.*?\]/g, '$1');
    
    str = str.replace(/\{icon:bullet,1\.2\}/g, '&bull; ');
    str = str.replace(/\{icon:.*?}/g, '* ');
    
    return str.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');
}
console.log(parseD4String('{c_important}Blight{/c} deals Cold and Frostbite damage. \\n\\nIts defiled area Pulls in enemies and {c_important}{u}Chills{/u}{/c} for {c_number}[Min(1,0.15*(1+Bonus_Percent_Per_Power(481293)))*100|%|]{/c} every second.', {name: 'Whirlpool'}, 2));