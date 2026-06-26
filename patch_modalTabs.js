const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /modalTabs\.forEach\(tab => \{\s*tab\.addEventListener\('click', \(e\) => \{\s*if \(e\.target\.disabled\) return;\s*const targetTab = e\.target\.textContent\.toLowerCase\(\);\s*switchModalTab\(targetTab\);\s*\}\);\s*\}\);/;

const replacementStr = `modalTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          if (e.target.disabled) return;
          const targetTab = e.target.textContent.toLowerCase();
          window.currentModifierEditing = null; // Clear editing state on top tab switch
          switchModalTab(targetTab);
        });
      });`;

if (regex.test(code)) {
  code = code.replace(regex, replacementStr);
  fs.writeFileSync('app.js', code);
  console.log("Restored modalTabs listener");
} else {
  console.log("Regex not matched.");
}
