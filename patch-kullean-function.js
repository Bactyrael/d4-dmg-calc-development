const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

const functionCode = `
window.getAllEquippedItemsWithAspects = function(build) {
    if (!build) return [];
    let items = [...Object.values(build.equipment || {})];
    if (build.talisman && build.talisman.charms) {
        items = items.concat(build.talisman.charms);
    }
    
    let expandedItems = [];
    for (const item of items) {
        if (item) {
            expandedItems.push(item);
            if (item.kulleanAspect && item.kulleanAspect !== 'None') {
                let clonedItem = JSON.parse(JSON.stringify(item));
                clonedItem.aspect = item.kulleanAspect;
                clonedItem.aspectValues = item.kulleanAspectValues;
                expandedItems.push(clonedItem);
            }
        }
    }
    return expandedItems;
};

`;

if (!content.includes('window.getAllEquippedItemsWithAspects = function')) {
    content = functionCode + content;
    fs.writeFileSync('app.js', content);
    console.log('App.js patched with window.getAllEquippedItemsWithAspects successfully');
} else {
    console.log('window.getAllEquippedItemsWithAspects already exists');
}
