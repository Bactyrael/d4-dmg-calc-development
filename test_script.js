const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');

const dom = new JSDOM(html, {
    url: "file:///" + __dirname.replace(/\\/g, '/') + "/index.html",
    runScripts: "dangerously",
    resources: "usable"
});

dom.window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Window Error:', msg, url, lineNo, columnNo, error);
};
