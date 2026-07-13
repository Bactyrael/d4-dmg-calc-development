const fs = require('fs');

const path = 'app.js';
let content = fs.readFileSync(path, 'utf8');

// Patch seal
const targetSeal = `sealSlot.style.borderColor = '#d18a45'; // Keep golden accent
              sealSlot.dataset.value = JSON.stringify(sealData);`;
const replaceSeal = `sealSlot.style.borderColor = '#d18a45'; // Keep golden accent
              sealSlot.dataset.value = JSON.stringify(sealData);
              sealSlot.onmouseenter = (e) => {
                  if (sealData && sealData.name) showItemTooltip(sealData, e, 'Seal');
              };
              sealSlot.onmousemove = (e) => typeof moveItemTooltip === 'function' ? moveItemTooltip(e) : null;
              sealSlot.onmouseleave = (e) => typeof hideItemTooltip === 'function' ? hideItemTooltip() : null;`;
              
const targetSealElse = `sealSlot.innerHTML = '';
              sealSlot.style.borderColor = '#d18a45';
              delete sealSlot.dataset.value;`;
const replaceSealElse = `sealSlot.innerHTML = '';
              sealSlot.style.borderColor = '#d18a45';
              delete sealSlot.dataset.value;
              sealSlot.onmouseenter = null;
              sealSlot.onmousemove = null;
              sealSlot.onmouseleave = null;`;

// Patch charms
const targetCharm = `charmSlot.innerHTML = \`<div style="\${style}; border-radius: 50%; box-shadow: inset 0 0 10px rgba(0,0,0,0.8);"></div>\`;
                  charmSlot.dataset.value = JSON.stringify(charm);`;
const replaceCharm = `charmSlot.innerHTML = \`<div style="\${style}; border-radius: 50%; box-shadow: inset 0 0 10px rgba(0,0,0,0.8);"></div>\`;
                  charmSlot.dataset.value = JSON.stringify(charm);
                  charmSlot.onmouseenter = (e) => {
                      if (charm && charm.name) showItemTooltip(charm, e, 'Charm ' + (i+1));
                  };
                  charmSlot.onmousemove = (e) => typeof moveItemTooltip === 'function' ? moveItemTooltip(e) : null;
                  charmSlot.onmouseleave = (e) => typeof hideItemTooltip === 'function' ? hideItemTooltip() : null;`;

const targetCharmElse = `charmSlot.innerHTML = '';
                  delete charmSlot.dataset.value;`;
const replaceCharmElse = `charmSlot.innerHTML = '';
                  delete charmSlot.dataset.value;
                  charmSlot.onmouseenter = null;
                  charmSlot.onmousemove = null;
                  charmSlot.onmouseleave = null;`;

content = content.replace(targetSeal, replaceSeal);
content = content.replace(targetSealElse, replaceSealElse);
content = content.replace(targetCharm, replaceCharm);
content = content.replace(targetCharmElse, replaceCharmElse);

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully patched talisman tooltips in app.js.");
