const fs = require('fs');

const path = 'app.js';
let content = fs.readFileSync(path, 'utf8');

// Patch seal
const targetSeal = "sealSlot.dataset.value = JSON.stringify(sealData);";
const replaceSeal = `sealSlot.dataset.value = JSON.stringify(sealData);
              sealSlot.onmouseenter = (e) => {
                  if (sealData && sealData.name) showItemTooltip(sealData, e, 'Seal');
              };
              sealSlot.onmousemove = (e) => typeof moveItemTooltip === 'function' ? moveItemTooltip(e) : null;
              sealSlot.onmouseleave = (e) => typeof hideItemTooltip === 'function' ? hideItemTooltip() : null;`;

const targetSealElse = "delete sealSlot.dataset.value;";
const replaceSealElse = `delete sealSlot.dataset.value;
              sealSlot.onmouseenter = null;
              sealSlot.onmousemove = null;
              sealSlot.onmouseleave = null;`;

// Patch charms
const targetCharm = "charmSlot.dataset.value = JSON.stringify(charm);";
const replaceCharm = `charmSlot.dataset.value = JSON.stringify(charm);
                  charmSlot.onmouseenter = (e) => {
                      if (charm && charm.name) showItemTooltip(charm, e, 'Charm ' + (i+1));
                  };
                  charmSlot.onmousemove = (e) => typeof moveItemTooltip === 'function' ? moveItemTooltip(e) : null;
                  charmSlot.onmouseleave = (e) => typeof hideItemTooltip === 'function' ? hideItemTooltip() : null;`;

const targetCharmElse = "delete charmSlot.dataset.value;";
const replaceCharmElse = `delete charmSlot.dataset.value;
                  charmSlot.onmouseenter = null;
                  charmSlot.onmousemove = null;
                  charmSlot.onmouseleave = null;`;

let patchCount = 0;
if (content.includes(targetSeal)) { content = content.replace(targetSeal, replaceSeal); patchCount++; }
if (content.includes(targetSealElse)) { content = content.replace(targetSealElse, replaceSealElse); patchCount++; }
if (content.includes(targetCharm)) { content = content.replace(targetCharm, replaceCharm); patchCount++; }
if (content.includes(targetCharmElse)) { content = content.replace(targetCharmElse, replaceCharmElse); patchCount++; }

fs.writeFileSync(path, content, 'utf8');
console.log(`Successfully applied ${patchCount} patches for talisman tooltips in app.js.`);
