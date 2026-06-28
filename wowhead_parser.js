const fs = require('fs');

const markdown = fs.readFileSync('C:\\Users\\rcmil\\.gemini\\antigravity\\brain\\1f73c3b5-9d8f-4b09-973c-6e8e35084095\\.system_generated\\steps\\10576\\content.md', 'utf8');

const dataStart = markdown.indexOf('"data":[{');
if (dataStart === -1) {
    console.log("Could not find '\"data\":[{'");
    process.exit(1);
}

const bracketStart = dataStart + 7;
// We need to find the matching closing bracket for this array.
let bracketCount = 0;
let arrayEnd = -1;
for (let i = bracketStart; i < markdown.length; i++) {
    if (markdown[i] === '[') bracketCount++;
    if (markdown[i] === ']') {
        bracketCount--;
        if (bracketCount === 0) {
            arrayEnd = i + 1;
            break;
        }
    }
}

if (arrayEnd === -1) {
    console.log("Failed to find end of array");
    process.exit(1);
}

const jsonString = markdown.substring(bracketStart, arrayEnd);
const aspectsData = JSON.parse(jsonString);

// Extract mapping from name to tooltip
const wowheadAspects = {};
aspectsData.forEach(a => {
    if (!a.tooltipLines || !a.tooltipLines[0]) return;
    let tooltip = a.tooltipLines[0];
    
    // Convert HTML to text
    tooltip = tooltip.replace(/<br>/gi, '\n');
    tooltip = tooltip.replace(/&lsqb;/gi, '[');
    tooltip = tooltip.replace(/&rsqb;/gi, ']');
    tooltip = tooltip.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
    tooltip = tooltip.trim();
    
    // Wowhead has "Aspect of XYZ" but sometimes "of XYZ Aspect"
    wowheadAspects[a.name] = tooltip;
});

global.window = {};
eval(fs.readFileSync('assets/database.js', 'utf8'));
const db = window.D4_DATABASE;

let updated = 0;
let notFound = [];

db.aspects.forEach(aspect => {
    let nameToMatch = aspect.name;
    
    // Try Wowhead's inverted names (e.g. "of the Damned Aspect" -> "Aspect of the Damned")
    let matchToolip = wowheadAspects[nameToMatch];
    if (!matchToolip) {
        if (nameToMatch.startsWith('Aspect of ')) {
            let inverted = 'of ' + nameToMatch.substring(10) + ' Aspect';
            matchToolip = wowheadAspects[inverted];
        }
    }
    
    if (matchToolip) {
        let wowTooltip = matchToolip;
        
        if (wowTooltip.includes('NEEDS REDESIGN')) {
            wowTooltip = wowTooltip.replace(/NEEDS REDESIGN\n/g, '');
        }
        
        aspect.desc = wowTooltip;
        updated++;
    } else {
        notFound.push(nameToMatch);
    }
});

console.log(`Updated ${updated} aspects.`);
console.log('Not found:', notFound.length);
if (notFound.length > 0 && notFound.length < 20) {
    console.log(notFound);
}

const newContent = 'window.D4_DATABASE = ' + JSON.stringify(db, null, 2) + ';\n';
fs.writeFileSync('assets/database.js', newContent, 'utf8');
console.log('Database updated successfully.');
