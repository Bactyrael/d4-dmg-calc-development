const strs = [
    "[PlayerHealthMax()*(0.02*Table(34,sLevel))||]",
    "[PlayerHealthMax()*0.02||]",
    "[Max(1,PlayerHealthMax()*(0.005*Table(34,sLevel)*12))|0|]",
    "[Max(1,PlayerHealthMax()*0.30000000000000004)|0|]",
    "[Max(1,PlayerHealthMax()*0.5)|0|]"
];

for (let str of strs) {
    let replaced = str.replace(/\[(?:Max\(1,)?PlayerHealthMax\(\)\*([^|\]]+)(?:\|.*?\|?)?\]/gi, (match, formula) => {
        // formula could have an unbalanced closing paren from Max(1,...
        // So we balance it or just strip one trailing paren if Max(1, was present
        if (match.toLowerCase().includes('max(1,')) {
            // formula includes everything up to | or ]
            // so we should remove the trailing parenthesis
            if (formula.endsWith(')')) {
                let open = formula.split('(').length - 1;
                let close = formula.split(')').length - 1;
                if (close > open) {
                    formula = formula.substring(0, formula.lastIndexOf(')'));
                }
            }
        }
        return `[FORMULA: ${formula}]`;
    });
    console.log(str, " => ", replaced);
}
