const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// Replace logic in renderEditTab
const oldEditLogic = `    // Filter affixes by class
    const affixesBase = (window.D4_DATABASE?.affixes || [])
      .filter(a => classIdx === undefined || !a.classes || a.classes[classIdx] === 1);
      
    const baseItemDef = window.D4_DATABASE.itemDatabase[slotName]?.find(i => i.name === itemObj.name) || {};
    
    // Determine allowed slots for affixes
    function isAffixAllowedForSlot(affix, slotName) {
      // Speed restriction check
      if (affix.targetSpeeds && baseItemDef.weaponSpeed !== undefined) {
        if (!affix.targetSpeeds.includes(baseItemDef.weaponSpeed)) {
          return false;
        }
      }
      
      const affixSlots = affix.slots;
      if (!affixSlots || affixSlots.length === 0) return true; // generic
      let mapped = slotName.toLowerCase();
      if (mapped === 'left ring' || mapped === 'right ring') mapped = 'ring';
      if (mapped === 'chest armor') mapped = 'chest';
      if (mapped === 'mainhand' || mapped === 'offhand' || mapped === 'weapon1' || mapped === 'weapon2' || mapped === 'ranged weapon') {
         if (mapped.startsWith('weapon') || mapped === 'ranged weapon') mapped = 'mainhand';
      }
      
      return affixSlots.some(s => {
        const ms = s.toLowerCase();
        if (mapped === 'ring' && (ms === 'ring1' || ms === 'ring2')) return true;
        if (mapped === 'mainhand' && (ms === 'mainhand' || ms === '2h-slashing' || ms === '2h-bludgeoning' || ms === '2h-ranged')) return true; 
        if (mapped === 'offhand' && (ms === 'offhand' || ms === 'shield')) return true;
        return ms === mapped;
      });
    }

    const regularAffixes = affixesBase.filter(a => !a.tempering && isAffixAllowedForSlot(a, slotName));
    const temperAffixes = affixesBase.filter(a => a.tempering && isAffixAllowedForSlot(a, slotName));`;

const newEditLogic = `    // New Hierarchical Lookup
    let mapped = slotName.toLowerCase();
    if (mapped === 'chest armor') mapped = 'chest';
    if (mapped === 'left ring' || mapped === 'right ring') mapped = 'ring';
    if (mapped.startsWith('weapon') || mapped === 'ranged weapon') mapped = 'mainhand';

    const classData = window.D4_DATABASE?.classData?.[currentClassVal]?.equipment?.[mapped] || {};
    const regularAffixes = classData.modifiers || [];
    const temperAffixes = classData.tempers || [];`;

// Replace logic in renderModifierTab
const oldModLogic = `    function getDbItems(sName) {
      const keys = Object.keys(window.D4_DATABASE?.itemDatabase || {});
      const match = keys.find(k => k.toLowerCase() === sName.toLowerCase());
      return match ? window.D4_DATABASE.itemDatabase[match] : [];
    }
    
    const baseItemDef = getDbItems(slotName).find(i => i.name === itemObj.name) || {};

    function isAffixAllowedForSlot(affix, slotName) {
      if (affix.targetSpeeds && baseItemDef.weaponSpeed !== undefined) {
        if (!affix.targetSpeeds.includes(baseItemDef.weaponSpeed)) return false;
      }
      const affixSlots = affix.slots;
      if (!affixSlots || affixSlots.length === 0) return true; // generic
      let mapped = slotName.toLowerCase();
      if (mapped === 'left ring' || mapped === 'right ring') mapped = 'ring';
      if (mapped === 'chest armor') mapped = 'chest';
      if (mapped === 'mainhand' || mapped === 'offhand' || mapped === 'weapon1' || mapped === 'weapon2' || mapped === 'ranged weapon') {
         if (mapped.startsWith('weapon') || mapped === 'ranged weapon') mapped = 'mainhand';
      }
      return affixSlots.some(s => {
        const ms = s.toLowerCase();
        if (mapped === 'ring' && (ms === 'ring1' || ms === 'ring2')) return true;
        if (mapped === 'mainhand' && (ms === 'mainhand' || ms === '2h-slashing' || ms === '2h-bludgeoning' || ms === '2h-ranged')) return true; 
        if (mapped === 'offhand' && (ms === 'offhand' || ms === 'shield')) return true;
        return ms === mapped;
      });
    }

    let items = (window.D4_DATABASE?.affixes || []).filter(a => {
      if (classIdx !== undefined && a.classes && a.classes[classIdx] !== 1) return false;
      if (type === 'temper' && !a.tempering) return false;
      if (type === 'affix' && a.tempering) return false;
      if (type === 'transfigure') {
        if (a.tempering) return false;
      }
      if (!isAffixAllowedForSlot(a, slotName)) return false;
      if (activeCategory !== 'All Modifiers' && getAffixCategory(a.name) !== activeCategory) return false;
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });`;

const newModLogic = `    // New Hierarchical Lookup
    let mapped = slotName.toLowerCase();
    if (mapped === 'chest armor') mapped = 'chest';
    if (mapped === 'left ring' || mapped === 'right ring') mapped = 'ring';
    if (mapped.startsWith('weapon') || mapped === 'ranged weapon') mapped = 'mainhand';

    const classData = window.D4_DATABASE?.classData?.[currentClassVal]?.equipment?.[mapped] || {};
    let dbItems = [];
    if (type === 'affix') dbItems = classData.modifiers || [];
    else if (type === 'temper') dbItems = classData.tempers || [];
    else if (type === 'transfigure') dbItems = classData.transfigures || [];

    let items = dbItems.filter(a => {
      if (activeCategory !== 'All Modifiers' && getAffixCategory(a.name) !== activeCategory) return false;
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });`;

if (code.includes(oldEditLogic) && code.includes(oldModLogic)) {
    code = code.replace(oldEditLogic, newEditLogic);
    code = code.replace(oldModLogic, newModLogic);
    fs.writeFileSync('app.js', code);
    console.log('Successfully patched app.js UI logic!');
} else {
    console.log('Failed to match logic chunks in app.js');
    if (!code.includes(oldEditLogic)) console.log('Missed oldEditLogic');
    if (!code.includes(oldModLogic)) console.log('Missed oldModLogic');
}
