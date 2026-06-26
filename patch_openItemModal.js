const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /renderAspectTab\(slotName,\s*'All Aspects',\s*''\);\s*renderGemTab\(slotName,\s*'All Gems',\s*''\);/;
const replacement = `renderAspectTab(slotName, 'All Aspects', '');
      renderModifierTab(slotName, 'affix', '', 'All Modifiers');
      renderGemTab(slotName, 'All Gems', '');`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('app.js', code);
  console.log("Patched openItemModal using regex.");
} else {
  console.log("Regex didn't match.");
}
