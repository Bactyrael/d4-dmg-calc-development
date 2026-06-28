let str = "[0.005*Table(34,sLevel)*12*100|1%|]";
str = str.replace(/\[(\d+(?:\.\d+)?)\*Table\(\d+,sLevel\)(?:\|.*?\|?)?\]/gi, (match, p1) => {
    return p1;
});
console.log("After Table replace:", str);

// Let's see if another replace matches it
let re = /\[(.*?)(\|.*?\|?)?\]/g;
str = str.replace(/\[(.*?)(\|.*?\|?)?\]/g, '$1');
console.log("After bracket cleanup:", str);
