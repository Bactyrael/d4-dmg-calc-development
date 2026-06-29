let str = "You gain up to {c_number}[(Resource_STARTING_PERCENT(5)?1.5:1.5)*0.1*100|%|]{/c} Damage Reduction";
str = str.replace(/\[([^\]]+)\|%\|\]/g, (match, formula) => {
    let clean = formula.replace(/[a-zA-Z_]+\([^)]*\)/g, '1'); // Replace Resource_STARTING_PERCENT(5) with 1
    try {
        let val = eval(clean);
        return val + '%';
    } catch(e) {
        return match;
    }
});
console.log(str);
