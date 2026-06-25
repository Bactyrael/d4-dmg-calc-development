const fs = require('fs');
let css = fs.readFileSync('style.css');
const badIndex = css.indexOf(Buffer.from('.paperdoll', 'utf16le'));
if (badIndex !== -1) {
    let clean = css.slice(0, badIndex);
    // trim trailing zeros and newlines
    let i = clean.length - 1;
    while(i >= 0 && (clean[i] === 0 || clean[i] === 10 || clean[i] === 13)) {
        i--;
    }
    clean = clean.slice(0, i+1);
    fs.writeFileSync('style.css', clean);
}
fs.appendFileSync('style.css', '\n.paperdoll-container[data-class="Necromancer"] {\n  background-image: url("assets/necro_bg.jpg");\n  background-size: cover;\n  background-position: center top;\n  background-repeat: no-repeat;\n  box-shadow: inset 0 0 0 2000px rgba(0,0,0,0.65);\n  border-radius: 8px;\n}\n');
