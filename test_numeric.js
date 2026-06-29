const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window;
global.document = window.document;

const fs = require('fs');
window.D4_PARAGON_DATA = JSON.parse(fs.readFileSync('maxroll_data.json', 'utf8'));
require('./paragon_logic.js');

try {
    console.log("Output:");
    console.log(window.renderGlyphTooltip(1031058, 15));
} catch(e) {
    console.error(e);
}
