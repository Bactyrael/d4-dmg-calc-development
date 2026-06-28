let str = "{c_number}([Max(1,{fortified:mod_fortify})|0|]){/c} if it hits";
str = str.replace(/\[Max\(1,\{fortified:.*?\}\)(?:\|.*?\|?)?\]/g, (match) => {
    let maxLife = 1526;
    let pct = 0.04;
    return Math.round(maxLife * pct).toString();
});
console.log(str);
