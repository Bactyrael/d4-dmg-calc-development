const fs = require('fs');
const maxrollData = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));

let paragonJS = fs.readFileSync('assets/paragon.js', 'utf8');

if (!paragonJS.includes('window.D4_PARAGON_DATA.paragonGlyphs')) {
    const patch = `\nwindow.D4_PARAGON_DATA.paragonGlyphs = ${JSON.stringify(maxrollData.paragonGlyphs)};\nwindow.D4_PARAGON_DATA.paragonGlyphAffixes = ${JSON.stringify(maxrollData.paragonGlyphAffixes)};\n`;
    fs.writeFileSync('assets/paragon.js', paragonJS + patch);
    console.log('Appended paragonGlyphs and paragonGlyphAffixes to assets/paragon.js');
} else {
    console.log('Already patched!');
}
