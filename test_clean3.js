const regex1 = /^[^:]+:\s+/;
const regex2 = /^\+?\[[\d\.,]+\s*-\s*[\d\.,]+\](%?)\s*/;
let str = "Reanimator's: +[2 - 3] to Minion Skills";
str = str.replace(regex1, '');
str = str.replace(regex2, (match, p1) => p1 ? '% ' : '');
console.log(str);
