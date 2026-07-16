const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

// 1. Hook up the btn-select-kullean-aspect button
const btnSelectAspectCode = `    const btnSelectAspect = document.getElementById('btn-select-aspect');
    if (btnSelectAspect) {
      btnSelectAspect.addEventListener('click', () => switchModalTab('aspect'));
    }`;

const btnSelectAspectReplacement = `    const btnSelectAspect = document.getElementById('btn-select-aspect');
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

content = content.replace(btnSelectAspectCode, btnSelectAspectReplacement);

// 2. Update renderAspectTab to restrict to Utility if isSelectingKullean is true
const aspectCatCode = `    let allowedCats = slotCategories[slotName.toLowerCase()] || [];`;
const aspectCatReplacement = `    let allowedCats = slotCategories[slotName.toLowerCase()] || [];
    if (window.isSelectingKullean) {
        allowedCats = ['Utility'];
    }`;

content = content.replace(aspectCatCode, aspectCatReplacement);

// 3. Update selectAspect to save to kulleanAspect if window.isSelectingKullean is true
const selectAspectCode = `        itemObj.aspect = aspectName;
        
        let aspectMult = getAspectMultiplier(currentModalSlot, itemObj);
        
        // Auto-fill max value from database if available
        const aspectObj = window.D4_DATABASE?.aspects?.find(a => a.name === aspectName);
        if (aspectObj && aspectObj.maxValue) {
          itemObj.aspectValues = [parseFloat((aspectObj.maxValue * aspectMult).toFixed(2))];
        } else {
          itemObj.aspectValues = [];
        }`;

const selectAspectReplacement = `        if (window.isSelectingKullean) {
            itemObj.kulleanAspect = aspectName;
        } else {
            itemObj.aspect = aspectName;
        }
        
        let aspectMult = getAspectMultiplier(currentModalSlot, itemObj);
        
        // Auto-fill max value from database if available
        const aspectObj = window.D4_DATABASE?.aspects?.find(a => a.name === aspectName);
        let vals = [];
        if (aspectObj && aspectObj.maxValue) {
          vals = [parseFloat((aspectObj.maxValue * aspectMult).toFixed(2))];
        }
        
        if (window.isSelectingKullean) {
            itemObj.kulleanAspectValues = vals;
        } else {
            itemObj.aspectValues = vals;
        }`;

content = content.replace(selectAspectCode, selectAspectReplacement);

// 4. Update the save logic in renderEditTab where input values are saved
// We need to also hook up .kullean-aspect-val-input
const saveValuesCode = `    document.querySelectorAll('.aspect-val-input').forEach(input => {
      input.addEventListener('change', (e) => {`;
const saveValuesReplacement = `    document.querySelectorAll('.aspect-val-input').forEach(input => {
      input.addEventListener('change', (e) => {`; // Not changing this directly, I will add the kullean loop right after it

const saveValuesCodeBlock = `    document.querySelectorAll('.aspect-val-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const val = parseFloat(e.target.value) || 0;
        const idx = parseInt(e.target.dataset.idx);
        itemObj.aspectValues = itemObj.aspectValues || [];
        itemObj.aspectValues[idx] = val;
        
        const box = document.querySelector(\`.equipment-slot-box[data-slot="\${slotName}"], .charm-slot[data-slot="\${slotName}"], .seal-slot[data-slot="\${slotName}"]\`);
        if (box) {
          box.dataset.value = JSON.stringify(itemObj);
          if (typeof saveEquipmentFromBoxes === 'function') saveEquipmentFromBoxes();
          if (typeof updateStats === 'function') updateStats();
        }
      });
    });`;

const saveKulleanValuesCodeBlock = `\n    document.querySelectorAll('.kullean-aspect-val-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const val = parseFloat(e.target.value) || 0;
        const idx = parseInt(e.target.dataset.idx);
        itemObj.kulleanAspectValues = itemObj.kulleanAspectValues || [];
        itemObj.kulleanAspectValues[idx] = val;
        
        const box = document.querySelector(\`.equipment-slot-box[data-slot="\${slotName}"], .charm-slot[data-slot="\${slotName}"], .seal-slot[data-slot="\${slotName}"]\`);
        if (box) {
          box.dataset.value = JSON.stringify(itemObj);
          if (typeof saveEquipmentFromBoxes === 'function') saveEquipmentFromBoxes();
          if (typeof updateStats === 'function') updateStats();
        }
      });
    });`;

content = content.replace(saveValuesCodeBlock, saveValuesCodeBlock + saveKulleanValuesCodeBlock);

fs.writeFileSync('app.js', content);
console.log('App.js Kullean logic patched successfully');
