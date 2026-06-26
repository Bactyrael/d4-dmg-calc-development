const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /calculate\(\);\s*renderEditTab\(slotName\);\s*\}\);\s*const target = e\.target;/;

const replacementStr = `        calculate();
        renderEditTab(slotName);
      });
    });

    document.querySelectorAll('.btn-change-affix').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        const idx = parseInt(e.target.dataset.idx);
        
        window.currentModifierEditing = { type, idx, slotName };
        if (type === 'temper') {
          switchModalTab('temper');
        } else if (type === 'transfigure') {
          switchModalTab('transfigure');
        } else {
          switchModalTab('modifiers');
        }
        renderModifierTab(slotName, type);
      });
    });

    document.querySelectorAll('.affix-val-input').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const target = e.target;`;

if (regex.test(code)) {
  code = code.replace(regex, replacementStr);
  fs.writeFileSync('app.js', code);
  console.log("Restored .btn-change-affix listener with regex");
} else {
  console.log("Regex not matched.");
}
