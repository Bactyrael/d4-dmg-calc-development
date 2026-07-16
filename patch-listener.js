const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

const targetStr = `    const btnSelectAspect = document.getElementById('btn-select-aspect');
    if (btnSelectAspect) {
      btnSelectAspect.addEventListener('click', () => switchModalTab('aspect'));
    }`;

const replacementStr = `    const btnSelectAspect = document.getElementById('btn-select-aspect');
    if (btnSelectAspect) {
      btnSelectAspect.addEventListener('click', () => {
          window.isSelectingKullean = false;
          switchModalTab('aspect');
      });
    }

    const btnSelectKulleanAspect = document.getElementById('btn-select-kullean-aspect');
    if (btnSelectKulleanAspect) {
      btnSelectKulleanAspect.addEventListener('click', () => {
          window.isSelectingKullean = true;
          switchModalTab('aspect');
      });
    }`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacementStr);
    fs.writeFileSync('app.js', content);
    console.log('Successfully patched listeners!');
} else {
    console.log('Target string not found for listeners. Trying fallback match...');
    const fallbackTarget = "btnSelectAspect.addEventListener('click', () => switchModalTab('aspect'));";
    if (content.includes(fallbackTarget)) {
        content = content.replace(fallbackTarget, `btnSelectAspect.addEventListener('click', () => { window.isSelectingKullean = false; switchModalTab('aspect'); });\n    }\n    const btnSelectKulleanAspect = document.getElementById('btn-select-kullean-aspect');\n    if (btnSelectKulleanAspect) {\n      btnSelectKulleanAspect.addEventListener('click', () => { window.isSelectingKullean = true; switchModalTab('aspect'); });`);
        fs.writeFileSync('app.js', content);
        console.log('Successfully patched via fallback!');
    } else {
        console.log('Fallback failed too.');
    }
}
