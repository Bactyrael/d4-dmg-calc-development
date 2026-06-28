import re

with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

replacement = r'''    // Strip other remaining {tag:value} things like {shield:barrier}, {buffduration:xxx}
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
            if (currentRank > 1) {
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
    
    str = str.replace(/\[([^\]\|]+)(?:\|.*?\|?)?\]/g, '$1');
    return str;
}'''

target = r'''    // Strip other remaining {tag:value} things like {shield:barrier}, {buffduration:xxx}
    str = str.replace(/\{[a-zA-Z_]+:[a-zA-Z_]+\}/g, '?');
    str = str.replace(/\{cooldown time\}/g, '?');
    
    str = str.replace(/\[([^\]\|]+)(?:\|.*?\|?)?\]/g, '$1');
    
    return str;
}'''

if target in text:
    text = text.replace(target, replacement)
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Success")
else:
    print("Target not found")
