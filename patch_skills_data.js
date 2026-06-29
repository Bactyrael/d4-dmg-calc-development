const fs = require('fs');
let paragonJS = fs.readFileSync('assets/paragon.js', 'utf8');
const data = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));

let patch = `\n\n`;
if (!paragonJS.includes('window.D4_PARAGON_DATA.skills')) {
    patch += `window.D4_PARAGON_DATA.skills = ${JSON.stringify(data.skills)};\n`;
}
if (!paragonJS.includes('window.D4_PARAGON_DATA.paragonThresholds')) {
    patch += `window.D4_PARAGON_DATA.paragonThresholds = ${JSON.stringify(data.paragonThresholds)};\n`;
}

if (patch.length > 5) {
    fs.writeFileSync('assets/paragon.js', paragonJS + patch);
    console.log('Appended skills and paragonThresholds to assets/paragon.js');
} else {
    console.log('Already appended');
}
