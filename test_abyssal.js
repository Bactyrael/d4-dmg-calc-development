const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window;
global.document = window.document;

const fs = require('fs');
window.D4_PARAGON_DATA = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));
global.currentBuild = { class: 'necromancer', paragon: [{ glyph: { id: 'Rare_046_Dexterity_Side', level: 15 } }] };
require('./paragon_logic.js');

try {
    console.log("Output:");
    console.log(window.renderGlyphTooltip('Rare_046_Dexterity_Side', 15));
} catch(e) {
    console.error(e);
}
