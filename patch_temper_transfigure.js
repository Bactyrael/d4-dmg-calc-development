const fs = require('fs');

let appStr = fs.readFileSync('app.js', 'utf8');

// 1. Replace switchModalTab
const switchModalTabOld = `  function switchModalTab(tabName) {
    const tabs = document.querySelectorAll('.item-modal-tab');
    const selectTab = tabs[0];
    const editTab = tabs[1];
    const aspectTab = tabs[2];
    const modifierTab = tabs[3];
    const gemTab = tabs[4];
    const selectBody = document.getElementById('item-modal-select-body');
    const editBody = document.getElementById('item-modal-edit-body');
    const aspectBody = document.getElementById('item-modal-aspect-body');
    const modifierBody = document.getElementById('item-modal-modifier-body');
    const gemBody = document.getElementById('item-modal-gem-body');
    
    // Reset all
    [selectTab, editTab, aspectTab, modifierTab, gemTab].forEach(t => t?.classList.remove('active'));
    [selectBody, editBody, aspectBody, modifierBody, gemBody].forEach(b => { if(b) b.style.display = 'none'; });

    if (tabName === 'select') {
      selectTab?.classList.add('active');
      if (selectBody) selectBody.style.display = 'flex';
    } else if (tabName === 'edit') {
      editTab?.classList.add('active');
      if (editBody) editBody.style.display = 'flex';
    } else if (tabName === 'aspect') {
      aspectTab?.classList.add('active');
      if (aspectBody) aspectBody.style.display = 'flex';
    } else if (tabName === 'modifiers') {
      modifierTab?.classList.add('active');
      if (modifierBody) modifierBody.style.display = 'flex';
    } else if (tabName === 'gem') {
      gemTab?.classList.add('active');
      if (gemBody) gemBody.style.display = 'flex';
    }
  }`;

const switchModalTabNew = `  function switchModalTab(tabName) {
    const tabs = document.querySelectorAll('.item-modal-tab');
    const selectTab = tabs[0];
    const editTab = tabs[1];
    const aspectTab = tabs[2];
    const modifierTab = tabs[3];
    const temperTab = tabs[4];
    const transfigureTab = tabs[5];
    const gemTab = tabs[6];
    
    const selectBody = document.getElementById('item-modal-select-body');
    const editBody = document.getElementById('item-modal-edit-body');
    const aspectBody = document.getElementById('item-modal-aspect-body');
    const modifierBody = document.getElementById('item-modal-modifier-body');
    const temperBody = document.getElementById('item-modal-temper-body');
    const transfigureBody = document.getElementById('item-modal-transfigure-body');
    const gemBody = document.getElementById('item-modal-gem-body');
    
    // Reset all
    [selectTab, editTab, aspectTab, modifierTab, temperTab, transfigureTab, gemTab].forEach(t => t?.classList.remove('active'));
    [selectBody, editBody, aspectBody, modifierBody, temperBody, transfigureBody, gemBody].forEach(b => { if(b) b.style.display = 'none'; });

    if (tabName === 'select') {
      selectTab?.classList.add('active');
      if (selectBody) selectBody.style.display = 'flex';
    } else if (tabName === 'edit') {
      editTab?.classList.add('active');
      if (editBody) editBody.style.display = 'flex';
    } else if (tabName === 'aspect') {
      aspectTab?.classList.add('active');
      if (aspectBody) aspectBody.style.display = 'flex';
    } else if (tabName === 'modifiers') {
      modifierTab?.classList.add('active');
      if (modifierBody) modifierBody.style.display = 'flex';
    } else if (tabName === 'temper') {
      temperTab?.classList.add('active');
      if (temperBody) temperBody.style.display = 'flex';
    } else if (tabName === 'transfigure') {
      transfigureTab?.classList.add('active');
      if (transfigureBody) transfigureBody.style.display = 'flex';
    } else if (tabName === 'gem') {
      gemTab?.classList.add('active');
      if (gemBody) gemBody.style.display = 'flex';
    }
  }`;

appStr = appStr.replace(switchModalTabOld, switchModalTabNew);

// 2. Replace tab click listeners
const tabListenersOld = `    document.getElementById('tab-aspect').addEventListener('click', () => switchModalTab('aspect'));
    document.getElementById('tab-modifier').addEventListener('click', () => switchModalTab('modifiers'));
    document.getElementById('tab-gem').addEventListener('click', () => switchModalTab('gem'));`;

const tabListenersNew = `    document.getElementById('tab-aspect').addEventListener('click', () => switchModalTab('aspect'));
    document.getElementById('tab-modifier').addEventListener('click', () => switchModalTab('modifiers'));
    document.getElementById('tab-temper').addEventListener('click', () => switchModalTab('temper'));
    document.getElementById('tab-transfigure').addEventListener('click', () => switchModalTab('transfigure'));
    document.getElementById('tab-gem').addEventListener('click', () => switchModalTab('gem'));`;

appStr = appStr.replace(tabListenersOld, tabListenersNew);

// 3. Update 'Change' button listener logic to open correct tab
const changeListenersOld = `        if (type === 'affix') {
          switchModalTab('modifiers');
          window.currentModifierEditing = { type: 'affix', idx };
          renderModifierTab(currentModalSlot, 'affix');
        } else if (type === 'temper') {
          switchModalTab('modifiers');
          window.currentModifierEditing = { type: 'temper', idx };
          renderModifierTab(currentModalSlot, 'temper');
        } else if (type === 'transfigure') {
          switchModalTab('modifiers');
          window.currentModifierEditing = { type: 'transfigure', idx };
          renderModifierTab(currentModalSlot, 'transfigure');
        }`;

const changeListenersNew = `        if (type === 'affix') {
          switchModalTab('modifiers');
          window.currentModifierEditing = { type: 'affix', idx };
          renderModifierTab(currentModalSlot, 'affix');
        } else if (type === 'temper') {
          switchModalTab('temper');
          window.currentModifierEditing = { type: 'temper', idx };
          renderModifierTab(currentModalSlot, 'temper');
        } else if (type === 'transfigure') {
          switchModalTab('transfigure');
          window.currentModifierEditing = { type: 'transfigure', idx };
          renderModifierTab(currentModalSlot, 'transfigure');
        }`;
appStr = appStr.replace(changeListenersOld, changeListenersNew);

// 4. Update renderModifierTab to target correct lists
const renderModifierOld1 = `function renderModifierTab(slotName, type, query = '', activeCategory = 'All Modifiers') {
    const list = document.getElementById('item-modal-modifier-list');`;
const renderModifierNew1 = `function renderModifierTab(slotName, type, query = '', activeCategory = 'All Modifiers') {
    let listId = 'item-modal-modifier-list';
    if (type === 'temper') listId = 'item-modal-temper-list';
    if (type === 'transfigure') listId = 'item-modal-transfigure-list';
    const list = document.getElementById(listId);`;
appStr = appStr.replace(renderModifierOld1, renderModifierNew1);

const renderModifierOld2 = `document.querySelectorAll('#modifier-sidebar .sidebar-item').forEach(el => {
      el.classList.remove('active');
      if (el.dataset.category === activeCategory) el.classList.add('active');
    });`;
const renderModifierNew2 = `let sidebarId = 'modifier-sidebar';
    if (type === 'temper') sidebarId = 'temper-sidebar';
    if (type === 'transfigure') sidebarId = 'transfigure-sidebar';
    document.querySelectorAll('#' + sidebarId + ' .sidebar-item').forEach(el => {
      el.classList.remove('active');
      if (el.dataset.category === activeCategory) el.classList.add('active');
    });`;
appStr = appStr.replace(renderModifierOld2, renderModifierNew2);

// 5. Update openItemModal
const openModalOld = `      renderAspectTab(slotName, 'All Aspects', '');
      renderModifierTab(slotName, 'affix', '', 'All Modifiers');
      renderGemTab(slotName, 'All Gems', '');`;
const openModalNew = `      renderAspectTab(slotName, 'All Aspects', '');
      renderModifierTab(slotName, 'affix', '', 'All Modifiers');
      renderModifierTab(slotName, 'temper', '', 'All Modifiers');
      renderModifierTab(slotName, 'transfigure', '', 'All Modifiers');
      renderGemTab(slotName, 'All Gems', '');`;
appStr = appStr.replace(openModalOld, openModalNew);

// 6. Update DOMContentLoaded listeners
const domListenersOld = `// Setup search input listener for modifiers
  document.addEventListener('DOMContentLoaded', () => {
    const modifierSearchInput = document.getElementById('modifier-search-input');
    if (modifierSearchInput) {
      modifierSearchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const activeCat = document.querySelector('#modifier-sidebar .sidebar-item.active')?.dataset.category || 'All Modifiers';
        const type = window.currentModifierEditing ? window.currentModifierEditing.type : 'affix';
        renderModifierTab(currentModalSlot, type, query, activeCat);
      });
    }

    document.querySelectorAll('#modifier-sidebar .sidebar-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.target.dataset.category;
        const query = document.getElementById('modifier-search-input')?.value || '';
        const type = window.currentModifierEditing ? window.currentModifierEditing.type : 'affix';
        renderModifierTab(currentModalSlot, type, query, cat);
      });
    });
  });`;

const domListenersNew = `// Setup search input listener for modifiers
  document.addEventListener('DOMContentLoaded', () => {
    function setupModifierListeners(type, prefix) {
      const searchInput = document.getElementById(prefix + '-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          const query = e.target.value;
          const activeCat = document.querySelector('#' + prefix + '-sidebar .sidebar-item.active')?.dataset.category || 'All Modifiers';
          const t = window.currentModifierEditing ? window.currentModifierEditing.type : type;
          renderModifierTab(currentModalSlot, t, query, activeCat);
        });
      }

      document.querySelectorAll('#' + prefix + '-sidebar .sidebar-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const cat = e.target.dataset.category;
          const query = document.getElementById(prefix + '-search-input')?.value || '';
          const t = window.currentModifierEditing ? window.currentModifierEditing.type : type;
          renderModifierTab(currentModalSlot, t, query, cat);
        });
      });
    }
    
    setupModifierListeners('affix', 'modifier');
    setupModifierListeners('temper', 'temper');
    setupModifierListeners('transfigure', 'transfigure');
  });`;
appStr = appStr.replace(domListenersOld, domListenersNew);


fs.writeFileSync('app.js', appStr);
console.log("Patched app.js successfully.");
