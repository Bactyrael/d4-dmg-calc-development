const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regexRender = /function renderEditTab\(slotName\) \{[\s\S]*?if \(!box\.dataset\.value\) \{[\s\S]*?return;\s*\}\s*editTabBtn\.disabled = false;[\s\S]*?gemTabBtn\.disabled = false;/;

const newRender = `function renderEditTab(slotName) {
      const editBody = document.getElementById('item-modal-edit-body');
      const box = document.querySelector(\`.equipment-slot-box[data-slot="\${slotName}"]\`);
      const tabs = document.querySelectorAll('.item-modal-tab');
      const editTabBtn = tabs[1];
      
      if (!editBody || !box) return;
  
      if (!box.dataset.value) {
        if (editTabBtn) editTabBtn.disabled = true;
        editBody.innerHTML = '';
        return;
      }
      
      if (editTabBtn) editTabBtn.disabled = false;`;

code = code.replace(regexRender, newRender);


const regexSwitch = /function switchModalTab\(tabName\) \{[\s\S]*?\/\/ Reset all[\s\S]*?\}\);/;

const newSwitch = `function switchModalTab(tabName) {
    const tabs = document.querySelectorAll('.item-modal-tab');
    const selectTab = tabs[0];
    const editTab = tabs[1];
    
    const selectBody = document.getElementById('item-modal-select-body');
    const editBody = document.getElementById('item-modal-edit-body');
    const aspectBody = document.getElementById('item-modal-aspect-body');
    const modifierBody = document.getElementById('item-modal-modifier-body');
    const temperBody = document.getElementById('item-modal-temper-body');
    const transfigureBody = document.getElementById('item-modal-transfigure-body');
    const gemBody = document.getElementById('item-modal-gem-body');
    
    // Reset all
    [selectTab, editTab].forEach(t => t?.classList.remove('active'));
    [selectBody, editBody, aspectBody, modifierBody, temperBody, transfigureBody, gemBody].forEach(b => { if(b) b.style.display = 'none'; });`;

code = code.replace(regexSwitch, newSwitch);


const regexSwitch2 = /\} else if \(tabName === 'aspect'\) \{[\s\S]*?gemBody\.style\.display = 'flex';\s*\}/;

const newSwitch2 = `} else if (tabName === 'aspect') {
      if (aspectBody) aspectBody.style.display = 'flex';
    } else if (tabName === 'modifiers') {
      if (modifierBody) modifierBody.style.display = 'flex';
    } else if (tabName === 'temper' || tabName === 'tempering') {
      if (temperBody) temperBody.style.display = 'flex';
    } else if (tabName === 'transfigure') {
      if (transfigureBody) transfigureBody.style.display = 'flex';
    } else if (tabName === 'gem') {
      if (gemBody) gemBody.style.display = 'flex';
    }`;

code = code.replace(regexSwitch2, newSwitch2);


fs.writeFileSync('app.js', code);
console.log('Fixed app.js logic cleanly');
