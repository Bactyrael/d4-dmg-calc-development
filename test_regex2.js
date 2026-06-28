let str = "[0.005*Table(34,sLevel)*12*100|1%|]";
str = str.replace(/\[([0-9.*+/\-]+)Table\(\d+,sLevel\)([0-9.*+/\-]+)?(?:\|.*?\|?)?\]/gi, (match, p1, p2) => {
    let mathStr = (p1 || "") + "1" + (p2 || "");
    let utilMult = 1.0;
    
    let val = 0;
    try {
        val = eval(mathStr) * utilMult;
    } catch (e) {
        return match;
    }
    
    if (match.includes('%')) {
         return val.toFixed(1).replace(/\.0$/, '') + '%';
    }
    return val.toFixed(1).replace(/\.0$/, '');
});
console.log(str);
