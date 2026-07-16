const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

const aspectCatCode = `    const allowedCats = slotCategories[slotName.toLowerCase()] || [];`;
const aspectCatReplacement = `    let allowedCats = slotCategories[slotName.toLowerCase()] || [];
    if (window.isSelectingKullean) {
        allowedCats = ['Utility'];
    }`;

content = content.replace(aspectCatCode, aspectCatReplacement);

// Just in case it appears multiple times, let's replace all occurrences in the aspect filter area.
// But wait, it appears in renderEditTab as well!
// Let's only target the one in renderAspectTab.
const renderAspectCode = `function renderAspectTab(slotName, activeCategory = 'All Aspects', query = '') {`;
const renderAspectIdx = content.indexOf(renderAspectCode);

if (renderAspectIdx > -1) {
    const sectionToReplace = content.substring(renderAspectIdx);
    const replacedSection = sectionToReplace.replace(aspectCatCode, aspectCatReplacement);
    content = content.substring(0, renderAspectIdx) + replacedSection;
}

fs.writeFileSync('app.js', content);
console.log('App.js allowedCats fixed');
