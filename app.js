
window.NECRO_ICONS = new Set(["area-damage-bonus-blight","army-of-the-dead","astral-projection","barrier-bone-storm","barrier-decompose","barrier-soulrift","bitter-harvest","blight","blood-boil","blood-lance","blood-maiden","blood-mist","blood-orb-blood-wave","blood-orb-corpse-explosion","blood-orb-hemorrhage","blood-runs-cold","blood-rush","blood-seeker","blood-spear","blood-surge","blood-transfusion","blood-wave","bloodbath","bloody-mess","bloody-splinter","bone-prison","bone-spear","bone-spikes","bone-spirit","bone-splinters","bone-storm","bouncing-spines","bramble","cast-speed-hemorrhage","charges-bone-spirit","chilled-to-the-bone","cold-pursuit","cooldown-reduction-army-of-the-dead","cooldown-reduction-bone-prison","cooldown-reduction-decrepify","core-skill-bone-spirit","corpse-efficiency-corpse-explosion","corpse-explosion","corpse-generation-army-of-the-dead","corpse-generation-reap","corpse-tendrils","cost-reduction-blood-lance","cost-reduction-bone-spear","cost-reduction-sever","coven","critical-strike-blood-mist","critical-strike-chance-corpse-tendrils","critical-strike-chance-decrepify","critical-strike-chance-reap","critical-strike-chance-skeleton-mage","crowd-control-and-corpse-generation-sever","crowd-control-damage-bonus-blight","crowd-control-damage-bonus-skeleton-mage","crowd-control-decompose","cull-the-weak","damage-bonus-army-of-the-dead","damage-bonus-blood-surge","damage-bonus-blood-wave","damage-bonus-bone-spirit","damage-bonus-decompose","damage-bonus-golem","damage-bonus-sever","damage-bonus-skeleton-warrior","damage-bonus-soulrift","damage-reduction-blood-wave","damage-reduction-bone-storm","dead-cold","decompose","decrepify","devouring-mist","distilled-anima","dizzying-curse","dry-rot","duration-damage-bonus-skeleton-mage","duration-increase-bone-storm","essence-generation-bone-prison","essence-generation-bone-splinters","essence-generation-corpse-explosion","essence-generation-corpse-tendrils","essence-generation-iron-maiden","essence-generation-reap","execute-and-fortify-iron-maiden","fel-gluttony","ferocity-and-overpower-iron-maiden","ferocity-reap","ferocity-resolve-or-overpower-skeleton-mage","ferocity-sever","ferocity-soulrift","festering-wound","first-hit-damage-bonus-bone-spear","fortify-blood-lance","fortify-blood-surge","frozen-wasteland","gargantua","get-over-here","gift-of-death","golem","gore-quills","gravebloom","harvest","healing-skeleton-warrior","hematolagnia","hemorrhage","hungry-cyclone","inexorable-reaper","iron-maiden","jaws-of-death","life-imprisonment","life-tap","litany-of-death","lucky-hit-chance-blight","lucky-hit-chance-corpse-tendrils","lucky-hit-chance-decompose","master-of-puppets","maximum-essence-bone-spirit","miasma","movement-speed-blood-mist","movement-speed-decrepify","multiple-corpses-corpse-explosion","overpower-blood-lance","overpower-blood-mist","overpower-blood-surge","overpower-blood-wave","overpower-hemorrhage","passive-bonus-army-of-the-dead","path-of-darkness","pierce-damage-bonus-bone-spear","piercing-darkness","pile-the-bodies","pins-and-needles","plunging-darkness","poltergeists","projectiles-bone-splinters","putrid-burst","reap","reaping-lotus","resolve-bone-prison","resolve-bone-spear","resolve-bone-splinters","resolve-decrepify","resolve-overpower-or-ferocity-golem","resolve-skeleton-warrior","ricochet-blood-lance","rip-and-tear","roll-the-bones","schadenfreude","service-and-sacrifice","sever","shadow-and-bone","shadow-seekers","shadow-splitter","shrapnel","singularity","size-bonus-blight","skeleton-mage","skeleton-warrior","soul-rip","soul-vortex","soulrift","tides-of-blood","torture-artist","unfinished-business","unholy-frenzy","unstoppable-golem","unyielding-commander","volatile-blood","vulnerable-and-crowd-control-soulrift","vulnerable-and-slow-blood-mist","vulnerable-bone-prison","vulnerable-bone-splinters","vulnerable-bone-storm","vulnerable-corpse-tendrils","vulnerable-iron-maiden","vulnerable-skeleton-warrior","weaken-blood-surge","weaken-golem","weaken-hemorrhage","whirlpool","you-and-what-army"]);
function renderActiveRunes() {
    const slots = document.querySelectorAll('.rune-slot.slot-square');
    if (!slots.length) return;
    
    // Clear existing
    slots.forEach(slot => {
        slot.innerHTML = '';
        slot.style.backgroundImage = 'none';
        slot.title = 'Empty Rune Slot';
        slot.style.border = '1px solid #333';
        slot.style.borderRadius = '0';
    });
    
    let activeRunes = [];
    
    document.querySelectorAll('.equipment-slot-box').forEach(box => {
        if (box.dataset.value) {
            try {
                const eq = JSON.parse(box.dataset.value);
                if (eq && eq.sockets && eq.sockets.length >= 2) {
                    const r0 = eq.sockets[0];
                    const r1 = eq.sockets[1];
                    const isR0Rune = r0 && window.D4_DATABASE?.runes?.some(r => r.name === r0);
                    const isR1Rune = r1 && window.D4_DATABASE?.runes?.some(r => r.name === r1);
                    
                    if (isR0Rune && isR1Rune) {
                        activeRunes.push(r0);
                        activeRunes.push(r1);
                    } else if (isR0Rune) {
                        activeRunes.push(r0);
                        activeRunes.push(null); 
                    } else if (isR1Rune) {
                        activeRunes.push(null);
                        activeRunes.push(r1);
                    }
                }
            } catch(e) {}
        }
    });
    
    for (let i = 0; i < Math.min(4, activeRunes.length); i++) {
        const gem = activeRunes[i];
        const slot = slots[i];
        if (gem) {
            slot.title = gem;
            slot.style.backgroundImage = `url('assets/images/Runes/rune_${gem.toLowerCase()}.png')`;
            slot.style.backgroundSize = 'cover';
            slot.style.backgroundPosition = 'center';
            slot.style.border = '1px solid #d18a45';
            slot.style.borderRadius = '4px';
        }
    }
}

/* ============================================
   D4 Damage Calculator — Application Logic
   ============================================ */

  'use strict';

  // ---- Constants ----
  const STORAGE_KEY = 'd4-damage-calc-builds';
  const AUTOSAVE_KEY = 'd4-damage-calc-autosave';
  const MONSTER_DR = 0.20; // Monsters have 80% DR, so multiply by 0.20
  
  // D4 Internal Index mapping:
  const D4_CLASS_MAP = {
    'Sorcerer': 0,
    'Druid': 1,
    'Barbarian': 2,
    'Rogue': 3,
    'Necromancer': 4,
    'Spiritborn': 5
  };

  let isLoading = false;

  // ---- DOM References ----
  const dom = {
    mainSkillSelect: document.getElementById('main-skill-select'),
    level:          document.getElementById('level'),
    toughness:      document.getElementById('toughness'),
    armor:          document.getElementById('armor'),
    physRes:        document.getElementById('phys-res'),
    fireRes:        document.getElementById('fire-res'),
    lightningRes:   document.getElementById('lightning-res'),
    coldRes:        document.getElementById('cold-res'),
    poisonRes:      document.getElementById('poison-res'),
    shadowRes:      document.getElementById('shadow-res'),
    maxLife:        document.getElementById('max-life'),
    potionCapacity: document.getElementById('potion-capacity'),
    healingReceived: document.getElementById('healing-received'),
    lifePer5s:      document.getElementById('life-per-5s'),
    summonArmor:    document.getElementById('summon-armor'),
    damageReductionAll: document.getElementById('damage-reduction-all'),
    barrierBonus:   document.getElementById('barrier-bonus'),
    dodgeChance:    document.getElementById('dodge-chance'),
    maxEssence:     document.getElementById('max-essence'),
    essenceRegen:   document.getElementById('essence-regen'),
    movementSpeed:  document.getElementById('movement-speed'),
    luckyHit:       document.getElementById('lucky-hit'),
    ccDuration:     document.getElementById('cc-duration'),
    expBonus:       document.getElementById('exp-bonus'),
    damageReduction: document.getElementById('damage-reduction'),
    weaponDamage:   document.getElementById('weapon-damage'),
    skillDamage:    document.getElementById('skill-damage'),

    strength:       document.getElementById('strength'),
    intelligence:   document.getElementById('intelligence'),
    willpower:      document.getElementById('willpower'),
    dexterity:      document.getElementById('dexterity'),
    aps:            document.getElementById('aps'),
    weaponSpeed:    document.getElementById('weapon-speed'),
    critChance:     document.getElementById('critical-chance'),
    luckyHitChance: document.getElementById('lucky-hit'),
    attackSpeed:    document.getElementById('attack-speed'),
    castSpeed:      document.getElementById('cast-speed'),
    baseDmgDisplay: document.getElementById('base-damage-display'),
    classSelect:    document.getElementById('class-select'),
    equipmentGrid:  document.getElementById('equipment-grid'),

    additiveBody:   document.getElementById('additive-body'),
    multBody:       document.getElementById('multiplicative-body'),

    addAdditiveBtn: document.getElementById('btn-add-additive'),
    addMultBtn:     document.getElementById('btn-add-multiplicative'),

    additiveTotal:  document.getElementById('additive-total'),
    multTotal:      document.getElementById('multiplicative-total'),

    resultBase:     document.getElementById('result-base'),
    resultIntel:    document.getElementById('result-intel'),
    resultIntelLabel: document.getElementById('result-intel-label'),
    resultAdditive: document.getElementById('result-additive'),
    resultMult:     document.getElementById('result-multiplicative'),
    resultFinal:    document.getElementById('result-final'),
    resultTotal:    document.getElementById('result-total'),
    


    btnNew:    document.getElementById('btn-new'),
    ehpPhysical: document.getElementById('ehp-physical'),
    drPhysicalFinal: document.getElementById('dr-physical-final'),
    dashArmor: document.getElementById('dash-armor'),
    dashArmorDr: document.getElementById('dash-armor-dr'),
    dashAllResist: document.getElementById('dash-all-resist'),
    dashUniversalDr: document.getElementById('dash-universal-dr'),
    dashMaxLife: document.getElementById('dash-max-life'),
    ehpFire: document.getElementById('ehp-fire'),
    drFireFinal: document.getElementById('dr-fire-final'),
    ehpCold: document.getElementById('ehp-cold'),
    drColdFinal: document.getElementById('dr-cold-final'),
    ehpLightning: document.getElementById('ehp-lightning'),
    drLightningFinal: document.getElementById('dr-lightning-final'),
    ehpPoison: document.getElementById('ehp-poison'),
    drPoisonFinal: document.getElementById('dr-poison-final'),
    ehpShadow: document.getElementById('ehp-shadow'),
    drShadowFinal: document.getElementById('dr-shadow-final'),

    btnSave:   document.getElementById('btn-save'),
    btnLoad:   document.getElementById('btn-load'),
    btnExport: document.getElementById('btn-export'),
    btnImport: document.getElementById('btn-import'),
    importFile: document.getElementById('import-file'),
    loadMenu:  document.getElementById('load-menu'),
    
    newBuildModal: document.getElementById('new-build-modal'),
    newBuildName:  document.getElementById('new-build-name'),
    newBuildClass: document.getElementById('new-build-class'),
    btnCancelNewBuild: document.getElementById('btn-cancel-new-build'),
    btnCreateNewBuild: document.getElementById('btn-create-new-build'),

    compareGrid:  document.getElementById('compare-grid'),
    compareEmpty: document.getElementById('compare-empty'),
    
    btnApiSync:       document.getElementById('btn-api-sync'),
    buildName:        document.getElementById('build-name'),

    nodesContainer: document.getElementById('nodes-container'),
    additionalBonusesContainer: document.getElementById('additional-bonuses-container'),
    legendaryBonusesContainer: document.getElementById('legendary-bonuses-container'),
  };

  window.addEventListener('error', function(e) {
  const debug = document.getElementById('debug-console') || (function() {
    const d = document.createElement('div');
    d.id = 'debug-console';
    d.style.position = 'fixed';
    d.style.bottom = '0';
    d.style.left = '0';
    d.style.width = '100%';
    d.style.maxHeight = '50vh';
    d.style.overflow = 'auto';
    d.style.background = 'rgba(255, 0, 0, 0.9)';
    d.style.color = 'white';
    d.style.padding = '15px';
    d.style.zIndex = '99999';
    d.style.whiteSpace = 'pre-wrap';
    d.style.fontFamily = 'monospace';
    document.body.appendChild(d);
    return d;
  })();
  debug.textContent += '[ERROR] ' + e.message + '\n' + (e.error ? e.error.stack : '') + '\n\n';
});

// Global state variables
var currentBuild = createDefaultBuild();

  // ---- Build Model ----
  function createDefaultBuild(name = 'New Build', className = 'Barbarian') {
    return {
      name: name,
      class: className,
      weaponDamage: 0,
      skillDamage: 0,
      paragon: [
        { boardId: null, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: null },
        { boardId: null, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: { parentSlot: null, parentGate: null, selfGate: null } },
        { boardId: null, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: { parentSlot: null, parentGate: null, selfGate: null } },
        { boardId: null, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: { parentSlot: null, parentGate: null, selfGate: null } },
        { boardId: null, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: { parentSlot: null, parentGate: null, selfGate: null } }
      ],
      strength: 0,
      intelligence: 0,
      willpower: 0,
      dexterity: 0,
      aps: 1,
      weaponSpeed: 1,
      critChance: 5.0,
      luckyHitChance: 0,
      attackSpeed: 0,
      castSpeed: 0,
      level: 0,
      toughness: 0,
      armor: 0,
      physRes: 0,
      fireRes: 0,
      lightningRes: 0,
      coldRes: 0,
      poisonRes: 0,
      shadowRes: 0,
      maxLife: 1526,
      potionCapacity: 0,
      healingReceived: 0,
      lifePer5s: 0,
      summonArmor: 0,
      damageReductionAll: 0,
      barrierBonus: 0,
      dodgeChance: 0,
      maxEssence: 0,
      essenceRegen: 0,
      movementSpeed: 0,
      luckyHit: 0,
      ccDuration: 0,
      expBonus: 0,
      damageReduction: 0,
      additives: [],
      multiplicatives: [],
      nodes: [0, 0, 0, 0],
      glyphs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      equipment: {},
      legendaryBonuses: [0,0,0,0,0],
      bookOfTheDead: {
        warriors: { spec: 'Skirmisher', node: null },
        mages: { spec: 'Shadow Mage', node: null },
        golems: { spec: 'Bone Golem', node: null }
      },
      runes: {
        slot1: null,
        slot2: null,
        slot3: null,
        slot4: null
      },
      activeSkills: [null, null, null, null, null, null]
    };
  }

  // ---- Formatting ----
  function formatNumber(n) {
    if (n === 0) return '0';
    if (Math.abs(n) < 0.01) return n.toExponential(2);

    const hasDecimals = n % 1 !== 0;
    const exact = n.toLocaleString('en-US', {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });

    const absN = Math.abs(n);
    let abbr = exact;
    
    if (absN >= 1e12) {
      abbr = (n / 1e12).toFixed(2) + 't';
    } else if (absN >= 1e9) {
      abbr = (n / 1e9).toFixed(2) + 'b';
    } else if (absN >= 1e6) {
      abbr = (n / 1e6).toFixed(2) + 'm';
    }

    if (abbr !== exact) {
      return `<span title="${exact}" style="cursor: help; border-bottom: 1px dotted rgba(255,255,255,0.4);">${abbr}</span>`;
    }

    return exact;
  }

  function formatMultiplier(n) {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  }

  function getClassMainStat(className) {
    switch (className) {
      case 'Barbarian':
        return { name: 'Strength', factor: 0.0011 }; // +0.11% per point
      case 'Druid':
        return { name: 'Willpower', factor: 0.00125 }; // +0.125% per point
      case 'Paladin':
        return { name: 'Strength', factor: 0.00125 }; // +0.125% per point
      case 'Rogue':
        return { name: 'Dexterity', factor: 0.0011 }; // +0.11% per point
      case 'Sorcerer':
      case 'Necromancer':
        return { name: 'Intelligence', factor: 0.00125 }; // +0.125% per point
      case 'Spiritborn':
        return { name: 'Dexterity', factor: 0.00125 }; // +0.125% per point
      case 'Warlock':
        return { name: 'Willpower', factor: 0.00125 }; // +0.125% per point
      default:
        return { name: 'Intelligence', factor: 0.00125 };
    }
  }

  // ---- Necromancer legendary node options ----
  const NECROMANCER_NODES = [
    { label: 'None',                value: 0   },
    { label: 'Bone Graft: 60%',     value: 60  },
    { label: 'Bloodbath: 80%',      value: 80  },
    { label: 'Blood Begets Blood: 60%', value: 60 },
    { label: 'Cult Leader: 200%',   value: 200 },
    { label: 'Flesh-eater: 60%',    value: 60  },
    { label: 'Frailty: 60%',        value: 60  },
    { label: 'Hulking Monstrosity: 100%', value: 100 },
    { label: 'Scent of Death: 45%', value: 45  },
    { label: 'Wither: 60%',         value: 60  },
  ];

  // ---- Necromancer additional bonus options ----
  const NECROMANCER_ADDITIONAL_BONUSES = [
    { label: 'Abyssal: 10%', value: 10 },
    { label: 'Amplify: 10%', value: 10 },
    { label: 'Blood-drinker: 0%', value: 0 },
    { label: 'Control: 20%', value: 20 },
    { label: 'Corporeal: 10%', value: 10 },
    { label: 'Darkness: 0%', value: 0 },
    { label: 'Deadraiser: 15%', value: 15 },
    { label: 'Desecration: 20%', value: 20 },
    { label: 'Dominate: 12%', value: 12 },
    { label: 'Eliminator: 10%', value: 10 },
    { label: 'Essence: 17.6%', value: 17.6 },
    { label: 'Exhumation: 0%', value: 0 },
    { label: 'Exploit: 10%', value: 10 },
    { label: 'Golem: 25%', value: 25 },
    { label: 'Gravekeeper: 18%', value: 18 },
    { label: 'Imbiber: 20%', value: 20 },
    { label: 'Mage: 20%', value: 20 },
    { label: 'Revenge: 10%', value: 10 },
    { label: 'Sacrificial: 10%', value: 10 },
    { label: 'Scourge: 10%', value: 10 },
    { label: 'Territorial: 0%', value: 0 },
    { label: 'Undaunted: 0%', value: 0 },
    { label: 'Warrior: 20%', value: 20 }
  ];

  // ---- Necromancer legendary bonus options ----
  const NECROMANCER_LEGENDARY_BONUSES = [
    { label: 'Abyssal', min: 0.5, max: 15.4 },
    { label: 'Amplify', min: 0.5, max: 15.4 },
    { label: 'Blood-drinker', min: 0.5, max: 15.4 },
    { label: 'Control', min: 2.8, max: 20 },
    { label: 'Corporeal', min: 0.5, max: 15.4 },
    { label: 'Darkness', min: 0.5, max: 15.4 },
    { label: 'Deadraiser', min: 0.5, max: 15.4 },
    { label: 'Desecration', min: 5.1, max: 24.5 },
    { label: 'Dominate', min: 0.5, max: 15.4 },
    { label: 'Eliminator', min: 2.8, max: 20 },
    { label: 'Essence', min: 2.8, max: 20 },
    { label: 'Exhumation', min: 0.8, max: 18 },
    { label: 'Exploit', min: 0.5, max: 15.4 },
    { label: 'Golem', min: 0.5, max: 15.4 },
    { label: 'Gravekeeper', min: 3.2, max: 28.5 },
    { label: 'Imbiber', min: 0.8, max: 18 },
    { label: 'Mage', min: 0.5, max: 15.4 },
    { label: 'Revenge', min: 0.5, max: 15.4 },
    { label: 'Sacrificial', min: 0.5, max: 15.4 },
    { label: 'Scourge', min: 0.5, max: 15.4 },
    { label: 'Territorial', min: 0.5, max: 15.4 },
    { label: 'Undaunted', min: 0.5, max: 15.4 },
    { label: 'Warrior', min: 0.5, max: 15.4 }
  ];

  // ---- Barbarian legendary node options ----
  const BARBARIAN_NODES = [
    { label: 'None',                value: 0   },
    { label: 'Blood Rage: 60%',     value: 60  },
    { label: 'Bone Breaker: 80%',   value: 80  },
    { label: 'Carnage: 45%',        value: 45  },
    { label: 'Decimator: 56.25%',   value: 56.25 },
    { label: 'Flawless Technique: 50%', value: 50 },
    { label: 'Force of Nature: 45%', value: 45 },
    { label: 'Hemorrhage: 75%',     value: 75  },
    { label: 'Warbringer: 45%',     value: 45  },
    { label: 'Weapons Master: 75%', value: 75  }
  ];

  // ---- Barbarian additional bonus options ----
  const BARBARIAN_ADDITIONAL_BONUSES = [
    { label: 'Ambidextrous: 8%', value: 8 },
    { label: 'Bloodfeeder: 10%', value: 10 },
    { label: 'Brawl: 25%', value: 25 },
    { label: 'Challenger: 10%', value: 10 },
    { label: 'Cleaver: 12%', value: 12 },
    { label: 'Crusher: 20%', value: 20 },
    { label: 'Disembowel: 20%', value: 20 },
    { label: 'Dominate: 0%', value: 0 },
    { label: 'Executioner: 15%', value: 15 },
    { label: 'Exploit: 0%', value: 0 },
    { label: 'Imbiber: 20%', value: 20 },
    { label: 'Ire: 0%', value: 0 },
    { label: 'Marshal: 0%', value: 0 },
    { label: 'Might: 8%', value: 8 },
    { label: 'Mortal Draw: 0%', value: 0 },
    { label: 'Revenge: 15%', value: 15 },
    { label: 'Rumble: 15%', value: 15 },
    { label: 'Seething: 0%', value: 0 },
    { label: 'Territorial: 0%', value: 0 },
    { label: 'Twister: 13%', value: 13 },
    { label: 'Undaunted: 0%', value: 0 },
    { label: 'Weapon Master: 0%', value: 0 },
    { label: 'Wrath: 0%', value: 0 }
  ];

  // ---- Barbarian legendary bonus options ----
  const BARBARIAN_LEGENDARY_BONUSES = [
    { label: 'Ambidextrous', min: 0.5, max: 15.4 },
    { label: 'Bloodfeeder', min: 0.5, max: 15.4 },
    { label: 'Brawl', min: 5.1, max: 24.5 },
    { label: 'Challenger', min: 2.8, max: 20 },
    { label: 'Cleaver', min: 0.5, max: 15.4 },
    { label: 'Crusher', min: 0.5, max: 15.4 },
    { label: 'Disembowel', min: 0.5, max: 15.4 },
    { label: 'Dominate', min: 0.5, max: 15.4 },
    { label: 'Executioner', min: 0.5, max: 15.4 },
    { label: 'Exploit', min: 0.5, max: 15.4 },
    { label: 'Imbiber', min: 0.8, max: 18 },
    { label: 'Ire', min: 0.8, max: 18 },
    { label: 'Marshal', min: 0.5, max: 15.4 },
    { label: 'Might', min: 3.2, max: 28.5 },
    { label: 'Mortal Draw', min: 0.5, max: 15.4 },
    { label: 'Revenge', min: 0.5, max: 15.4 },
    { label: 'Rumble', min: 2.4, max: 44.1 },
    { label: 'Seething', min: 0.5, max: 15.4 },
    { label: 'Territorial', min: 0.5, max: 15.4 },
    { label: 'Twister', min: 2.4, max: 44.1 },
    { label: 'Undaunted', min: 0.5, max: 15.4 },
    { label: 'Weapon Master', min: 2.8, max: 20 },
    { label: 'Wrath', min: 2.8, max: 20 }
  ];

  // ---- Paladin legendary node options ----
  const PALADIN_NODES = [
    { label: 'None', value: 0 },
    { label: 'Beacon: 90%', value: 90 },
    { label: 'Castle: Custom', value: 'custom' },
    { label: 'Divinity: 90%', value: 90 },
    { label: 'Endure: 90%', value: 90 },
    { label: 'Fervent: 35%', value: 35 },
    { label: 'Preacher: 65%', value: 65 },
    { label: 'Relentless: 80%', value: 80 },
    { label: 'Sentencing: 90%', value: 90 },
    { label: 'Shield Bearer: 110%', value: 110 }
  ];

  // ---- Paladin additional bonus options ----
  const PALADIN_ADDITIONAL_BONUSES = [
    { label: 'Apostle: 15%', value: 15 },
    { label: 'Arbiter: 18%', value: 18 },
    { label: 'Canny: 15%', value: 15 },
    { label: 'Challenger: 10%', value: 10 },
    { label: 'Chip: 15%', value: 15 },
    { label: 'Control: 20%', value: 20 },
    { label: 'Diminish: 15%', value: 15 },
    { label: 'Exploit: 0%', value: 0 },
    { label: 'Feverous: 20%', value: 20 },
    { label: 'Honed: 0%', value: 0 },
    { label: 'Imbiber: 20%', value: 20 },
    { label: 'Judicator: 20%', value: 20 },
    { label: 'Law: 15%', value: 15 },
    { label: 'Outmatch: 20%', value: 20 },
    { label: 'Resplendence: 0%', value: 0 },
    { label: 'Retribution: 10%', value: 10 },
    { label: 'Revenge: 15%', value: 15 },
    { label: 'Sentinel: 12%', value: 12 },
    { label: 'Spirit: 15%', value: 15 },
    { label: 'Turf: 0%', value: 0 },
    { label: 'Undaunted: 0%', value: 0 }
  ];

  // ---- Paladin legendary bonus options ----
  const PALADIN_LEGENDARY_BONUSES = [
    { label: 'Apostle', min: 0.5, max: 15.4 },
    { label: 'Arbiter', min: 0.8, max: 18 },
    { label: 'Canny', min: 0.5, max: 15.4 },
    { label: 'Challenger', min: 2.8, max: 20 },
    { label: 'Chip', min: 0.5, max: 15.4 },
    { label: 'Control', min: 2.8, max: 20 },
    { label: 'Diminish', min: 0.5, max: 15.4 },
    { label: 'Exploit', min: 0.5, max: 15.4 },
    { label: 'Feverous', min: 0.5, max: 15.4 },
    { label: 'Honed', min: 2.8, max: 20 },
    { label: 'Imbiber', min: 0.8, max: 18 },
    { label: 'Judicator', min: 0.5, max: 15.4 },
    { label: 'Law', min: 0.5, max: 15.4 },
    { label: 'Outmatch', min: 0.8, max: 18 },
    { label: 'Resplendence', min: 0.5, max: 15.4 },
    { label: 'Retribution', min: 0.5, max: 15.4 },
    { label: 'Revenge', min: 0.5, max: 15.4 },
    { label: 'Sentinel', min: 0.8, max: 18 },
    { label: 'Spirit', min: 2.8, max: 20 },
    { label: 'Turf', min: 0.8, max: 18 },
    { label: 'Undaunted', min: 0.5, max: 15.4 }
  ];

  // ---- Rogue legendary node options ----
  const ROGUE_NODES = [
    { label: 'None',                value: 0   },
    { label: 'Cheap Shot: 100%', value: 100 },
    { label: 'Cunning Stratagem: 60%', value: 60 },
    { label: 'Danse Macabre: 60%', value: 60 },
    { label: 'Deadly Ambush: 60%', value: 60 },
    { label: 'Eldritch Bounty: 60%', value: 60 },
    { label: 'Exploit Weakness: 60%', value: 60 },
    { label: 'Leyrana\'s Instinct: 60%', value: 60 },
    { label: 'No Witnesses: 60%', value: 60 },
    { label: 'Tricks of the Trade: 60%', value: 60 }
  ];

  // ---- Rogue additional bonus options ----
  const ROGUE_ADDITIONAL_BONUSES = [
    { label: 'Ambush: 12%', value: 12 },
    { label: 'Assassin: 25%', value: 25 },
    { label: 'Bane: 15%', value: 15 },
    { label: 'Canny: 15%', value: 15 },
    { label: 'Chip: 15%', value: 15 },
    { label: 'Closer: 0%', value: 0 },
    { label: 'Combat: 0%', value: 0 },
    { label: 'Control: 20%', value: 20 },
    { label: 'Devious: 15%', value: 15 },
    { label: 'Diminish: 0%', value: 0 },
    { label: 'Eclipse: 0%', value: 0 },
    { label: 'Efficacy: Custom', value: 'custom' },
    { label: 'Exploit: 0%', value: 0 },
    { label: 'Explosive: 0%', value: 0 },
    { label: 'Fluidity: 10%', value: 10 },
    { label: 'Grenadier: 0%', value: 0 },
    { label: 'Headhunter: 10%', value: 10 },
    { label: 'Infusion: 0%', value: 0 },
    { label: 'Nightstalker: 0%', value: 0 },
    { label: 'Pride: 27%', value: 27 },
    { label: 'Ranger: 0%', value: 0 },
    { label: 'Snare: 0%', value: 0 },
    { label: 'Tracker: 40%', value: 40 },
    { label: 'Turf: 0%', value: 0 },
    { label: 'Versatility: 25%', value: 25 },
    { label: 'Volley: 0%', value: 0 }
  ];

  // ---- Rogue legendary bonus options ----
  const ROGUE_LEGENDARY_BONUSES = [
    { label: 'Ambush', min: 5.1, max: 24.5 },
    { label: 'Assassin', min: 2.8, max: 20 },
    { label: 'Bane', min: 0.5, max: 15.4 },
    { label: 'Canny', min: 0.5, max: 15.4 },
    { label: 'Chip', min: 0.5, max: 15.4 },
    { label: 'Closer', min: 0.8, max: 18 },
    { label: 'Combat', min: 2.8, max: 20 },
    { label: 'Control', min: 2.8, max: 20 },
    { label: 'Devious', min: 2.8, max: 20 },
    { label: 'Diminish', min: 0.5, max: 15.4 },
    { label: 'Eclipse', min: 5.1, max: 24.5 },
    { label: 'Efficacy', min: 0.5, max: 15.4 },
    { label: 'Exploit', min: 0.5, max: 15.4 },
    { label: 'Explosive', min: 2.4, max: 44.1 },
    { label: 'Fluidity', min: 0.5, max: 15.4 },
    { label: 'Grenadier', min: 5.1, max: 24.5 },
    { label: 'Headhunter', min: 0.5, max: 15.4 },
    { label: 'Infusion', min: 0.5, max: 15.4 },
    { label: 'Nightstalker', min: 0.5, max: 15.4 },
    { label: 'Pride', min: 2.8, max: 20 },
    { label: 'Ranger', min: 0.5, max: 15.4 },
    { label: 'Snare', min: 5.1, max: 24.5 },
    { label: 'Tracker', min: 0.5, max: 15.4 },
    { label: 'Turf', min: 0.8, max: 18 },
    { label: 'Versatility', min: 0.5, max: 15.4 },
    { label: 'Volley', min: 2.4, max: 44.1 }
  ];

  // ---- Druid legendary node options ----
  const DRUID_NODES = [
    { label: 'None',                value: 0   },
    { label: 'Ancestral Guidance: 40%', value: 40 },
    { label: 'Constricting Tendrils: 60%', value: 60 },
    { label: 'Earthen Devastation: 70%', value: 70 },
    { label: 'Heightened Malice: 62%', value: 62 },
    { label: 'Inner Beast: 0%', value: 0 },
    { label: 'Lust for Carnage: 70%', value: 70 },
    { label: 'Survival Instincts: 81.25%', value: 81.25 },
    { label: 'Thunderstruck: 70%', value: 70 }
  ];

  // ---- Druid additional bonus options ----
  const DRUID_ADDITIONAL_BONUSES = [
    { label: 'Bane: 15%', value: 15 },
    { label: 'Dominate: 15%', value: 15 },
    { label: 'Earth and Sky: 18%', value: 18 },
    { label: 'Electrocution: 20%', value: 20 },
    { label: 'Exploit: 0%', value: 0 },
    { label: 'Fang and Claw: 12%', value: 12 },
    { label: 'Fulminate: 12%', value: 12 },
    { label: 'Guzzler: 20%', value: 20 },
    { label: 'Headhunter: 10%', value: 10 },
    { label: 'Human: 0%', value: 0 },
    { label: 'Keeper: 15%', value: 15 },
    { label: 'Outmatch: 20%', value: 20 },
    { label: 'Poise: 0%', value: 0 },
    { label: 'Protector: 0%', value: 0 },
    { label: 'Shapeshifter: 5%', value: 5 },
    { label: 'Spirit: 15%', value: 15 },
    { label: 'Tectonic: 15%', value: 15 },
    { label: 'Territorial: 0%', value: 0 },
    { label: 'Tracker: 40%', value: 40 },
    { label: 'Undaunted: 0%', value: 0 },
    { label: 'Werebear: 0%', value: 0 },
    { label: 'Werewolf: 0%', value: 0 },
    { label: 'Wilds: 130%', value: 130 }
  ];

  // ---- Druid legendary bonus options ----
  const DRUID_LEGENDARY_BONUSES = [
    { label: 'Bane', min: 0.5, max: 15.4 },
    { label: 'Dominate', min: 0.5, max: 15.4 },
    { label: 'Earth and Sky', min: 0.5, max: 15.4 },
    { label: 'Electrocution', min: 0.5, max: 15.4 },
    { label: 'Exploit', min: 0.5, max: 15.4 },
    { label: 'Fang and Claw', min: 0.5, max: 15.4 },
    { label: 'Fulminate', min: 0.5, max: 15.4 },
    { label: 'Guzzler', min: 0.8, max: 18 },
    { label: 'Headhunter', min: 0.5, max: 15.4 },
    { label: 'Human', min: 0.5, max: 15.4 },
    { label: 'Keeper', min: 0.5, max: 15.4 },
    { label: 'Outmatch', min: 0.5, max: 15.4 },
    { label: 'Poise', min: 0.5, max: 15.4 },
    { label: 'Protector', min: 0.5, max: 15.4 },
    { label: 'Shapeshifter', min: 2.8, max: 20 },
    { label: 'Spirit', min: 2.8, max: 20 },
    { label: 'Tectonic', min: 0.5, max: 15.4 },
    { label: 'Territorial', min: 0.5, max: 15.4 },
    { label: 'Tracker', min: 0.5, max: 15.4 },
    { label: 'Undaunted', min: 0.5, max: 15.4 },
    { label: 'Werebear', min: 0.5, max: 15.4 },
    { label: 'Werewolf', min: 0.5, max: 15.4 },
    { label: 'Wilds', min: 2.8, max: 20 }
  ];

  // ---- Sorcerer legendary node options ----
  const SORCERER_NODES = [
    { label: 'None', value: 0 },
    { label: 'Burning Instinct: 90%', value: 90 },
    { label: 'Ceaseless Conduit: 45%', value: 45 },
    { label: 'Elemental Summoner: 50%', value: 50 },
    { label: 'Enchantment Master: Custom', value: 'custom' },
    { label: 'Frigid Fate: 60%', value: 60 },
    { label: 'Fundamental Release: 30%', value: 30 },
    { label: 'Icefall: 70%', value: 70 },
    { label: 'Searing Heat: 70%', value: 70 },
    { label: 'Static Surge: 50%', value: 50 }
  ];

  // ---- Sorcerer additional bonus options ----
  const SORCERER_ADDITIONAL_BONUSES = [
    { label: 'Adept: 0%', value: 0 },
    { label: 'Charged: 15%', value: 15 },
    { label: 'Conjurer: 0%', value: 0 },
    { label: 'Control: 20%', value: 20 },
    { label: 'Cryopathy: 0%', value: 0 },
    { label: 'Destruction: 12%', value: 12 },
    { label: 'Electrocute: 0%', value: 0 },
    { label: 'Elementalist: 15%', value: 15 },
    { label: 'Eliminator: 10%', value: 10 },
    { label: 'Enchanter: 0%', value: 0 },
    { label: 'Exploit: 10%', value: 10 },
    { label: 'Flamefeeder: 10%', value: 10 },
    { label: 'Imbiber: 20%', value: 20 },
    { label: 'Invocation: 15%', value: 15 },
    { label: 'Pyromaniac: 18%', value: 18 },
    { label: 'Reinforced: 0%', value: 0 },
    { label: 'Stalagmite: 0%', value: 0 },
    { label: 'Tactician: 15%', value: 15 },
    { label: 'Territorial: 0%', value: 0 },
    { label: 'Torch: 25%', value: 25 },
    { label: 'Unleash: 8%', value: 8 },
    { label: 'Warding: 0%', value: 0 },
    { label: 'Winter: 18%', value: 18 }
  ];

  // ---- Sorcerer legendary bonus options ----
  const SORCERER_LEGENDARY_BONUSES = [
    { label: 'Adept', min: 2.8, max: 20 },
    { label: 'Charged', min: 0.5, max: 15.4 },
    { label: 'Conjurer', min: 2.8, max: 20 },
    { label: 'Control', min: 2.8, max: 20 },
    { label: 'Cryopathy', min: 0.5, max: 15.4 },
    { label: 'Destruction', min: 2.8, max: 20 },
    { label: 'Electrocute', min: 0.5, max: 15.4 },
    { label: 'Elementalist', min: 0.5, max: 15.4 },
    { label: 'Eliminator', min: 2.8, max: 20 },
    { label: 'Enchanter', min: 0.5, max: 15.4 },
    { label: 'Exploit', min: 0.5, max: 15.4 },
    { label: 'Flamefeeder', min: 0.5, max: 15.4 },
    { label: 'Imbiber', min: 0.8, max: 18 },
    { label: 'Invocation', min: 2.8, max: 20 },
    { label: 'Pyromaniac', min: 0.5, max: 15.4 },
    { label: 'Reinforced', min: 0.5, max: 15.4 },
    { label: 'Stalagmite', min: 0.5, max: 15.4 },
    { label: 'Tactician', min: 0.5, max: 15.4 },
    { label: 'Territorial', min: 0.5, max: 15.4 },
    { label: 'Torch', min: 0.5, max: 15.4 },
    { label: 'Unleash', min: 0.5, max: 15.4 },
    { label: 'Warding', min: 0.5, max: 15.4 },
    { label: 'Winter', min: 2.8, max: 20 }
  ];

  // ---- Spiritborn legendary node options ----
  const SPIRITBORN_NODES = [
    { label: 'None',                value: 0   },
    { label: 'Bitter Medicine: 80%', value: 80 },
    { label: 'Convergence: 60%', value: 60 },
    { label: 'Drive: 120%', value: 120 },
    { label: 'In-Fighter: 45%', value: 45 },
    { label: 'Prodigy\'s Tempo: 0%', value: 0 },
    { label: 'Revealing: 60%', value: 60 },
    { label: 'Spiney Skin: 0%', value: 0 },
    { label: 'Viscous Shield: 67%', value: 67 }
  ];

  // ---- Spiritborn additional bonus options ----
  const SPIRITBORN_ADDITIONAL_BONUSES = [
    { label: 'Bane: 15%', value: 15 },
    { label: 'Canny: 15%', value: 15 },
    { label: 'Colossal: Custom', value: 'custom' },
    { label: 'Consumption: Custom', value: 'custom' },
    { label: 'Exploit: 0%', value: 0 },
    { label: 'Fester: 15%', value: 15 },
    { label: 'Fitness: 0%', value: 0 },
    { label: 'Fulminate: 12%', value: 12 },
    { label: 'Guzzler: 20%', value: 20 },
    { label: 'Headhunter: 10%', value: 10 },
    { label: 'Hone: 0%', value: 0 },
    { label: 'Hubris: 0%', value: 0 },
    { label: 'Innate: 0%', value: 0 },
    { label: 'Jagged Plume: 15%', value: 15 },
    { label: 'Menagerist: 16%', value: 16 },
    { label: 'Outmatch: 20%', value: 20 },
    { label: 'Revenge: 15%', value: 15 },
    { label: 'Ritual: 10%', value: 10 },
    { label: 'Spirit: 15%', value: 15 },
    { label: 'Talon: 15%', value: 15 },
    { label: 'Turf: 0%', value: 0 },
    { label: 'Wildfire: 0%', value: 0 }
  ];

  // ---- Spiritborn legendary bonus options ----
  const SPIRITBORN_LEGENDARY_BONUSES = [
    { label: 'Bane', min: 0.5, max: 15.4 },
    { label: 'Canny', min: 0.5, max: 15.4 },
    { label: 'Colossal', min: 0.8, max: 18 },
    { label: 'Consumption', min: 0.5, max: 15.4 },
    { label: 'Exploit', min: 0.5, max: 15.4 },
    { label: 'Fester', min: 0.5, max: 15.4 },
    { label: 'Fitness', min: 2.8, max: 20 },
    { label: 'Fulminate', min: 0.5, max: 15.4 },
    { label: 'Guzzler', min: 0.8, max: 18 },
    { label: 'Headhunter', min: 0.5, max: 15.4 },
    { label: 'Hone', min: 2.8, max: 20 },
    { label: 'Hubris', min: 0.5, max: 15.4 },
    { label: 'Innate', min: 0.5, max: 15.4 },
    { label: 'Jagged Plume', min: 0.5, max: 15.4 },
    { label: 'Menagerist', min: 0.5, max: 15.4 },
    { label: 'Outmatch', min: 0.8, max: 18 },
    { label: 'Revenge', min: 0.5, max: 15.4 },
    { label: 'Ritual', min: 0.5, max: 15.4 },
    { label: 'Spirit', min: 2.8, max: 20 },
    { label: 'Talon', min: 0.5, max: 15.4 },
    { label: 'Turf', min: 0.8, max: 18 },
    { label: 'Wildfire', min: 0.5, max: 15.4 }
  ];

  // ---- Warlock legendary node options ----
  const WARLOCK_NODES = [
    { label: 'None',                value: 0   },
    { label: 'Chaos: 100%', value: 100 },
    { label: 'Demonic Spicules: 120%', value: 120 },
    { label: 'Dominion: 80%', value: 80 },
    { label: 'Dynamism: 90%', value: 90 },
    { label: 'Fathomless: 105%', value: 105 },
    { label: 'Greater Hex: 75%', value: 75 },
    { label: 'Overmind: 65%', value: 65 },
    { label: 'Pyrosis: 90%', value: 90 },
    { label: 'Ritualism: 90%', value: 90 }
  ];

  // ---- Warlock additional bonus options ----
  const WARLOCK_ADDITIONAL_BONUSES = [
    { label: 'Abyssal: 15%', value: 15 },
    { label: 'Archfiend: 14%', value: 14 },
    { label: 'Attrition: 20%', value: 20 },
    { label: 'Blood Frenzy: 18%', value: 18 },
    { label: 'Control: 10%', value: 10 },
    { label: 'Death Aura: 0%', value: 0 },
    { label: 'Demonologist: 17%', value: 17 },
    { label: 'Destruction: Custom', value: 'custom' },
    { label: 'Eldritch Sight: 18%', value: 18 },
    { label: 'Eliminator: 15%', value: 15 },
    { label: 'Empowered: 15%', value: 15 },
    { label: 'Entropy: 15%', value: 15 },
    { label: 'Guzzler: 20%', value: 20 },
    { label: 'Headhunter: 10%', value: 10 },
    { label: 'Hellforge: 15%', value: 15 },
    { label: 'Ichor Carapace: 0%', value: 0 },
    { label: 'Mastermind: 18%', value: 18 },
    { label: 'Occultist: 12%', value: 12 },
    { label: 'Unbound: 10%', value: 10 },
    { label: 'Vanguard: 18%', value: 18 },
    { label: 'Wrath: 0%', value: 0 }
  ];

  // ---- Warlock legendary bonus options ----
  const WARLOCK_LEGENDARY_BONUSES = [
    { label: 'Abyssal', min: 0.5, max: 15.4 },
    { label: 'Archfiend', min: 0.5, max: 15.4 },
    { label: 'Attrition', min: 0.5, max: 15.4 },
    { label: 'Blood Frenzy', min: 0.5, max: 15.4 },
    { label: 'Control', min: 2.8, max: 20 },
    { label: 'Death Aura', min: 0.5, max: 15.4 },
    { label: 'Demonologist', min: 0.5, max: 15.4 },
    { label: 'Destruction', min: 2.8, max: 20 },
    { label: 'Eldritch Sight', min: 0.5, max: 15.4 },
    { label: 'Eliminator', min: 0.5, max: 15.4 },
    { label: 'Empowered', min: 0.5, max: 15.4 },
    { label: 'Entropy', min: 0.5, max: 15.4 },
    { label: 'Guzzler', min: 0.8, max: 18 },
    { label: 'Headhunter', min: 0.5, max: 15.4 },
    { label: 'Hellforge', min: 0.5, max: 15.4 },
    { label: 'Ichor Carapace', min: 0.5, max: 15.4 },
    { label: 'Mastermind', min: 0.5, max: 15.4 },
    { label: 'Occultist', min: 0.5, max: 15.4 },
    { label: 'Unbound', min: 0.5, max: 15.4 },
    { label: 'Vanguard', min: 0.5, max: 15.4 },
    { label: 'Wrath', min: 2.8, max: 20 }
  ];

  const STANDARD_SLOTS = ['Helm', 'Chest Armor', 'Gloves', 'Pants', 'Boots', 'Mainhand', 'Amulet', 'Left Ring', 'Right Ring', 'Offhand'];
  const ROGUE_SLOTS = ['Helm', 'Chest Armor', 'Gloves', 'Pants', 'Boots', 'Ranged Weapon', 'Amulet', 'Left Ring', 'Right Ring', 'Mainhand', 'Offhand'];
  const BARB_SLOTS = ['Helm', 'Chest Armor', 'Gloves', 'Pants', 'Boots', 'Bludgeoning Weapon', 'Mainhand', 'Amulet', 'Left Ring', 'Right Ring', 'Slicing Weapon', 'Offhand'];
  
  const CLASS_EQUIPMENT_SLOTS = {
    'Necromancer': [...STANDARD_SLOTS],
    'Barbarian': [...BARB_SLOTS],
    'Druid': [...STANDARD_SLOTS],
    'Paladin': [...STANDARD_SLOTS],
    'Rogue': [...ROGUE_SLOTS],
    'Sorcerer': [...STANDARD_SLOTS],
    'Spiritborn': [...STANDARD_SLOTS],
    'Warlock': [...STANDARD_SLOTS]
  };

  function checkIs2H(itemObj, slotName) {
      if (!itemObj || !itemObj.name) return false;
      let dbSlotName = slotName;
      if (slotName === 'Left Ring' || slotName === 'Right Ring') dbSlotName = 'Ring';
      if (slotName === 'Ranged Weapon' || slotName.startsWith('Weapon')) dbSlotName = 'Mainhand';
      const dbItems = window.D4_DATABASE?.itemDatabase?.[dbSlotName] || window.D4_DATABASE?.itemDatabase?.['Mainhand'] || [];
      const baseItem = dbItems.find(i => i.name === itemObj.name);
      if (!baseItem) return false;
      if (baseItem.name && baseItem.name.includes('Two-Handed')) return true;
      if (baseItem.weaponType && (baseItem.weaponType.includes('Two-Handed') || baseItem.weaponType === 'Staff' || baseItem.weaponType === 'Polearm' || baseItem.weaponType === 'Crossbow' || baseItem.weaponType === 'Bow')) return true;
      return false;
  }

  function getDbItems(slotName) {
    if (!window.D4_DATABASE || !window.D4_DATABASE.itemDatabase) return [];
    let mapped = slotName;
    if (slotName === 'Left Ring' || slotName === 'Right Ring') mapped = 'Ring';
    if (slotName === 'Ranged Weapon') mapped = 'Mainhand'; // Map to weapon pool
    if (slotName === 'Bludgeoning Weapon' || slotName === 'Slicing Weapon') mapped = 'Mainhand'; // Map to weapon pool
    
    // Check class filter
    const currentClassVal = document.getElementById('class-select')?.textContent;
    const d4Idx = currentClassVal ? D4_CLASS_MAP[currentClassVal] : undefined;
    
    const dbItems = window.D4_DATABASE.itemDatabase[mapped] || [];
    if (d4Idx !== undefined) {
      let filtered = dbItems.filter(i => !i.classes || i.classes[d4Idx] === 1);
      if (d4Idx === 4) { // Necromancer
        const invalidForNecro = ['Ahavarion, Spear of Lycander', 'Eggcecutioner', 'Eggis', 'Shattered Vow'];
        filtered = filtered.filter(i => !invalidForNecro.includes(i.name));
      }
      return filtered;
    }
    return dbItems;
  }

  function getAspectMultiplier(slotName, itemObj) {
    if (!slotName) return 1;
    const ls = slotName.toLowerCase();
    
    // Default slot mapping
    if (ls.includes('two-handed') || ls === 'two-handed weapon' || ls === 'bludgeoning weapon' || ls === 'slicing weapon' || ls === 'ranged weapon') {
      return 2;
    }
    if (ls === 'amulet') {
      return 1.5;
    }
    
    // Check specific base item weapon type
    if (itemObj && itemObj.name) {
      let mapped = slotName;
      if (slotName === 'Left Ring' || slotName === 'Right Ring') mapped = 'Ring';
      if (slotName === 'Ranged Weapon') mapped = 'Mainhand';
      if (slotName === 'Bludgeoning Weapon' || slotName === 'Slicing Weapon') mapped = 'Mainhand';
      
      const allItems = window.D4_DATABASE?.itemDatabase?.[mapped] || [];
      const baseItem = allItems.find(i => i.name === itemObj.name);
      
      if (baseItem && baseItem.weaponType) {
        if (baseItem.weaponType.toLowerCase().includes('two-handed')) {
          return 2;
        }
      }
    }
    
    return 1;
  }

  const CLASS_PARAGON_DATA = {
    Necromancer: {
      nodes: NECROMANCER_NODES,
      addBonuses: NECROMANCER_ADDITIONAL_BONUSES,
      legBonuses: NECROMANCER_LEGENDARY_BONUSES
    },
    Barbarian: {
      nodes: BARBARIAN_NODES,
      addBonuses: BARBARIAN_ADDITIONAL_BONUSES,
      legBonuses: BARBARIAN_LEGENDARY_BONUSES
    },
    Druid: {
      nodes: DRUID_NODES,
      addBonuses: DRUID_ADDITIONAL_BONUSES,
      legBonuses: DRUID_LEGENDARY_BONUSES
    },
    Paladin: {
      nodes: PALADIN_NODES,
      addBonuses: PALADIN_ADDITIONAL_BONUSES,
      legBonuses: PALADIN_LEGENDARY_BONUSES
    },
    Rogue: {
      nodes: ROGUE_NODES,
      addBonuses: ROGUE_ADDITIONAL_BONUSES,
      legBonuses: ROGUE_LEGENDARY_BONUSES
    },
    Sorcerer: {
      nodes: SORCERER_NODES,
      addBonuses: SORCERER_ADDITIONAL_BONUSES,
      legBonuses: SORCERER_LEGENDARY_BONUSES
    },
    Spiritborn: {
      nodes: SPIRITBORN_NODES,
      addBonuses: SPIRITBORN_ADDITIONAL_BONUSES,
      legBonuses: SPIRITBORN_LEGENDARY_BONUSES
    },
    Warlock: {
      nodes: WARLOCK_NODES,
      addBonuses: WARLOCK_ADDITIONAL_BONUSES,
      legBonuses: WARLOCK_LEGENDARY_BONUSES
    }
  };

  function getAdditionalBonusEls() {
    return [
      document.getElementById('additional-bonus-1'),
      document.getElementById('additional-bonus-2'),
      document.getElementById('additional-bonus-3'),
      document.getElementById('additional-bonus-4'),
      document.getElementById('additional-bonus-5'),
    ];
  }

  
  window.getGlyphStatsInRadius = function getGlyphStatsInRadius(slotIndex, glyphData) {
      const stats = { Strength: 0, Dexterity: 0, Intelligence: 0, Willpower: 0 };
      if (!currentBuild || !currentBuild.paragon || !currentBuild.paragon[slotIndex]) return stats;
      const pData = currentBuild.paragon[slotIndex];
      if (!pData.boardId || !pData.nodes) return stats;
      
      const bData = window.D4_PARAGON_DATA?.paragonBoards?.[pData.boardId.replace(/\\/g, '')];
      if (!bData || !bData.nodes) return stats;
      
      const socketDataIdx = bData.nodes.findIndex(n => n && n.toLowerCase().includes('socket'));
      if (socketDataIdx === -1) return stats;
      
      const sX = socketDataIdx % 21;
      const sY = Math.floor(socketDataIdx / 21);
      
      const lvl = glyphData.level || 1;
      let radius = 3;
      if (lvl >= 25 && lvl <= 49) radius = 4;
      else if (lvl >= 50) radius = 5;
      
      pData.nodes.forEach(nIdx => {
          const nX = nIdx % 21;
          const nY = Math.floor(nIdx / 21);
          const dist = Math.abs(nX - sX) + Math.abs(nY - sY);
          
          if (dist <= radius) {
              const nodeName = bData.nodes[nIdx];
              if (nodeName) {
                  const nData = window.D4_PARAGON_DATA.paragonNodes[nodeName];
                  if (nData && nData.attributes) {
                      nData.attributes.forEach(attr => {
                          if (attr.value !== undefined) {
                              if (attr.id === 9 || attr.id === 18) stats.Strength += attr.value;
                              else if (attr.id === 10 || attr.id === 19) stats.Intelligence += attr.value;
                              else if (attr.id === 11 || attr.id === 20) stats.Willpower += attr.value;
                              else if (attr.id === 12 || attr.id === 21) stats.Dexterity += attr.value;
                          } else if (attr.formula && attr.formula.includes('CoreStat') && nData.tags) {
                              let sMap = { 'search_strength': 'Strength', 'search_intelligence': 'Intelligence', 'search_willpower': 'Willpower', 'search_dexterity': 'Dexterity' };
                              let tagLower = nData.tags.map(t => t.toLowerCase());
                              let s = Object.keys(sMap).find(t => tagLower.includes(t));
                              if (s) {
                                  let val = 10;
                                  if (attr.formula.includes('Magic')) val = 7;
                                  else if (attr.formula.includes('Normal')) val = 5;
                                  stats[sMap[s]] += val;
                              }
                          }
                      });
                  } else {
                      if (nodeName.toLowerCase().includes('_str')) stats.Strength += 5;
                      if (nodeName.toLowerCase().includes('_int')) stats.Intelligence += 5;
                      if (nodeName.toLowerCase().includes('_will')) stats.Willpower += 5;
                      if (nodeName.toLowerCase().includes('_dex')) stats.Dexterity += 5;
                  }
              }
          }
      });
      return stats;
  }

  function getAdditionalBonusValues() {
      const selectedClass = dom.classSelect ? dom.classSelect.textContent : 'Barbarian';
      const classData = CLASS_PARAGON_DATA[selectedClass];
      const vals = [];
      if (currentBuild && currentBuild.paragon) {
          for (let i = 0; i < 5; i++) {
              let pData = currentBuild.paragon[i];
              if (pData && pData.glyph && pData.glyph.id) {
                  let gData = window.D4_PARAGON_DATA?.paragonGlyphs?.[pData.glyph.id];
                  if (gData && classData && classData.addBonuses) {
                      let gName = gData.name;
                      let glyphInfo = classData.addBonuses.find(g => g.label.startsWith(gName));
                      
                      let meetsReq = false;
                      let hasThresholdData = false;
                      if (gData.affixes) {
                          for (let affixKey of gData.affixes) {
                              let affixInfo = window.D4_PARAGON_DATA.paragonGlyphAffixes?.[affixKey];
                              if (affixInfo && affixInfo.thresholds && affixInfo.thresholds.length > 0) {
                                  let tData = window.D4_PARAGON_DATA.paragonThresholds?.[affixInfo.thresholds[0]];
                                  if (tData && tData.attributes && tData.attributes.length > 0) {
                                      hasThresholdData = true;
                                      let reqAttrId = tData.attributes[0].id;
                                      let reqVal = tData.attributes[0].value;
                                      
                                      let currentStats = window.getGlyphStatsInRadius(i, pData.glyph);
                                      let curVal = 0;
                                      if (reqAttrId === 9 || reqAttrId === 18) curVal = currentStats.Strength;
                                      else if (reqAttrId === 10 || reqAttrId === 19) curVal = currentStats.Intelligence;
                                      else if (reqAttrId === 11 || reqAttrId === 20) curVal = currentStats.Willpower;
                                      else if (reqAttrId === 12 || reqAttrId === 21) curVal = currentStats.Dexterity;
                                      
                                      if (curVal >= reqVal) meetsReq = true;
                                  }
                              }
                          }
                      }
                      
                      if (glyphInfo && meetsReq) {
                          vals.push(glyphInfo.value === 'custom' ? 0 : glyphInfo.value);
                      } else {
                          vals.push(0);
                      }
                  } else {
                      vals.push(0);
                  }
              } else {
                  vals.push(0);
              }
          }
      } else {
          vals.push(0,0,0,0,0);
      }
      return vals;
  }

  function getLegendaryBonusValues() {
      const selectedClass = dom.classSelect ? dom.classSelect.textContent : 'Barbarian';
      const classData = CLASS_PARAGON_DATA[selectedClass];
      const vals = [];
      if (currentBuild && currentBuild.paragon) {
          for (let i = 0; i < 5; i++) {
              let pData = currentBuild.paragon[i];
              if (pData && pData.glyph && pData.glyph.id && pData.glyph.level >= 46) {
                  let gData = window.D4_PARAGON_DATA?.paragonGlyphs?.[pData.glyph.id];
                  if (gData && classData && classData.legBonuses) {
                      let gName = gData.name;
                      let glyphInfo = classData.legBonuses.find(g => g.label === gName);
                      if (glyphInfo) {
                          let min = glyphInfo.min; let max = glyphInfo.max;
                          let rawBonus = min + ((max - min) * ((Math.min(100, pData.glyph.level) - 1) / 149));
                          
                          if (gName === 'Essence') {
                              rawBonus = rawBonus * 0.8;
                          }
                          vals.push(rawBonus);
                      } else {
                          vals.push(0);
                      }
                  } else {
                      vals.push(0);
                  }
              } else {
                  vals.push(0);
              }
          }
      } else {
          vals.push(0,0,0,0,0);
      }
      return vals;
  }

function getEquipmentValues() {
    const vals = {};
    const container = document.getElementById('tab-equipment');
    if (!container) return vals;
    const boxes = container.querySelectorAll('.equipment-slot-box');
    boxes.forEach(box => {
      try {
        vals[box.dataset.slot] = box.dataset.value ? JSON.parse(box.dataset.value) : null;
      } catch(e) {
        vals[box.dataset.slot] = box.dataset.value ? { name: box.dataset.value, power: 900, quality: 0 } : null;
      }
    });
    return vals;
  }

  
function getMaxSockets(slotName, itemObj) {
    const lowerSlot = slotName.toLowerCase();
    let maxSockets = 2; // HELPER: Default to 2 for helm, chest, pants
    
    if (lowerSlot.includes('glove') || lowerSlot.includes('boot')) {
      maxSockets = 0;
    } else if (lowerSlot.includes('ring') || lowerSlot.includes('amulet') || lowerSlot.includes('offhand') || lowerSlot.includes('dual wield') || lowerSlot.includes('slicing')) {
      maxSockets = 1;
    } else if (lowerSlot.includes('mainhand') || lowerSlot.startsWith('weapon') || lowerSlot.includes('ranged weapon')) {
      if (lowerSlot.includes('bludgeoning') || lowerSlot.includes('weapon 2 (slashing)') || lowerSlot.includes('ranged weapon')) {
        maxSockets = 2;
      } else if (typeof checkIs2H === 'function' && checkIs2H(itemObj, slotName)) {
        maxSockets = 2;
      } else {
        maxSockets = 1;
      }
    }
    return maxSockets;
}

function getSlotBackgroundImage(slotName, itemObj) {
    let imgName = '';
    const defaults = {
      'Helm': 'default_helm.png',
      'Chest Armor': 'default_chest_armor.png',
      'Gloves': 'default_gloves.png',
      'Pants': 'default_pants.png',
      'Boots': 'default_boots.png',
      'Amulet': 'default_amulet.png',
      'Left Ring': 'default_left_ring.png',
      'Right Ring': 'default_right_ring.png',
      'Mainhand': 'default_one_handed_sword.png',
      'Offhand': 'default_focus.png',
      'Ranged Weapon': 'default_two_handed_sword.png',
      'Bludgeoning Weapon': 'default_two_handed_mace.png',
      'Slicing Weapon': 'default_one_handed_sword.png',
      'Weapon 1': 'default_one_handed_mace.png',
      'Weapon 2': 'default_one_handed_sword.png'
    };
    imgName = defaults[slotName] || 'default_one_handed_sword.png';
    
    if (itemObj && itemObj.name && itemObj.name !== 'Empty') {
      let dbSlotName = slotName;
      if (slotName === 'Left Ring' || slotName === 'Right Ring') dbSlotName = 'Ring';
      if (slotName === 'Ranged Weapon' || slotName.startsWith('Weapon') || slotName.endsWith('Weapon')) dbSlotName = 'Mainhand';
      
      const dbItems = window.D4_DATABASE?.itemDatabase?.[dbSlotName] || window.D4_DATABASE?.itemDatabase?.['Mainhand'] || [];
      const baseItem = dbItems.find(i => i.name === itemObj.name);
      
      if (baseItem) {
        const type = (baseItem.weaponType || baseItem.type || '').toLowerCase();
        if (type.includes('wand')) imgName = 'default_wand.png';
        else if (type.includes('dagger')) imgName = 'default_dagger.png';
        else if (type.includes('two-handed scythe')) imgName = 'default_two_handed_scythe.png';
        else if (type.includes('two-handed axe')) imgName = 'default_two_handed_axe.png';
        else if (type.includes('two-handed mace')) imgName = 'default_two_handed_mace.png';
        else if (type.includes('two-handed sword')) imgName = 'default_two_handed_sword.png';
        else if (type.includes('scythe')) imgName = 'default_one_handed_scythe.png';
        else if (type.includes('axe')) imgName = 'default_one_handed_axe.png';
        else if (type.includes('mace')) imgName = 'default_one_handed_mace.png';
        else if (type.includes('sword') || type.includes('blade')) imgName = 'default_one_handed_sword.png';
        else if (type.includes('shield')) imgName = 'default_shield.png';
        else if (type.includes('focus')) imgName = 'default_focus.png';
        else if (type.includes('totem')) imgName = 'default_focus.png';
      }
    }
    
    const clsE = document.getElementById('class-select');
    const clsName = clsE ? clsE.textContent : 'Necromancer';
    return `assets/images/${clsName}/slots/${imgName}`;
}

function renderEquipment(className, savedEquipment = {}) {
    const leftCol = document.getElementById('paperdoll-left');
    const rightCol = document.getElementById('paperdoll-right');
    const footer = document.getElementById('paperdoll-footer');
    if (!leftCol || !rightCol || !footer) return;
    
    const container = document.querySelector('.paperdoll-container');
    if (container) container.dataset.class = className;
    
    leftCol.innerHTML = '';
    rightCol.innerHTML = '';
    footer.innerHTML = '';
    
    // Clear old class mechanic panels
    document.querySelectorAll('.class-mechanic-panel').forEach(e => e.remove());
    
    const slots = CLASS_EQUIPMENT_SLOTS[className] || [];
    
    slots.forEach(slot => {
      let isRight = ['Amulet', 'Left Ring', 'Right Ring', 'Offhand', 'Slicing Weapon'].includes(slot);
      if (className === 'Rogue' && slot === 'Mainhand') isRight = true;
      
      const targetCol = isRight ? rightCol : leftCol;
      
      const box = document.createElement('div');
      box.className = 'equipment-slot-box';
      box.dataset.slot = slot;
      
      const icon = document.createElement('div');
      icon.className = 'paperdoll-slot-icon';
      icon.style.backgroundImage = `url('${getSlotBackgroundImage(slot, savedEquipment[slot])}')`;
      icon.style.backgroundSize = 'cover';
      icon.style.backgroundPosition = 'center';

      // Icon placeholder
      
      
      const textContainer = document.createElement('div');
      textContainer.className = 'paperdoll-slot-text';
      
      const label = document.createElement('div');
      label.className = 'paperdoll-slot-label';
      label.textContent = slot;
      
      const valDiv = document.createElement('div');
      valDiv.className = 'paperdoll-slot-value';
      
      let val = savedEquipment[slot];
      if (typeof val === 'string' && val) {
        val = { name: val, power: 900, quality: 0, sockets: [] };
      }
      box.dataset.value = val ? JSON.stringify(val) : '';
      
      if (val && val.name) {
        valDiv.textContent = val.name;
        valDiv.classList.remove('empty');
      } else {
        valDiv.classList.add('empty');
        valDiv.textContent = 'Empty';
      }
      
      textContainer.appendChild(label);
      textContainer.appendChild(valDiv);
      
      const socketContainer = document.createElement('div');
      socketContainer.className = 'paperdoll-socket-container';
      
      let maxSockets = getMaxSockets(slot, val || {});
      for (let i = 0; i < maxSockets; i++) {
        const gem = (val && val.sockets && val.sockets[i]) ? val.sockets[i] : null;
        const circle = document.createElement('div');
        if (gem) {
            circle.className = 'socket-circle filled';
            circle.title = gem;
            const isRune = window.D4_DATABASE?.runes?.some(r => r.name === gem);
            if (isRune) {
                circle.style.background = `url('assets/images/Runes/rune_${gem.toLowerCase()}.png')`;
                circle.style.backgroundSize = 'cover';
                circle.style.border = '1px solid #d18a45';
                circle.style.borderRadius = '50%';
            } else {
                let gemFileName = gem.toLowerCase().replace(/ /g, '_') + '_gem.png';
                circle.style.background = `url('assets/images/Gems/${gemFileName}')`;
                circle.style.backgroundSize = 'cover';
                circle.style.border = '1px solid #666';
                circle.style.borderRadius = '50%';
            }
        } else {
            circle.className = 'socket-circle empty';
            circle.title = 'Empty Socket';
        }
        socketContainer.appendChild(circle);
      }
      
      icon.appendChild(socketContainer); // Move sockets into the icon
      
      box.appendChild(icon);
      box.appendChild(textContainer);
      targetCol.appendChild(box);
      box.addEventListener('click', () => openItemModal(slot));
    });
    
    // Inject Class Mechanic Panel for Necromancer
    if (className === 'Necromancer') {
      const panel = document.createElement('div');
      panel.className = 'class-mechanic-panel';
      
      const header = document.createElement('div');
      header.className = 'class-mechanic-header';
      header.textContent = 'Book of the Dead';
      panel.appendChild(header);
      
      if (!currentBuild.bookOfTheDead) {
        currentBuild.bookOfTheDead = {
          warriors: { spec: 'Skirmisher', node: null },
          mages: { spec: 'Shadow Mage', node: null },
          golems: { spec: 'Bone Golem', node: null }
        };
      }
      
      const botdKeys = ['warriors', 'mages', 'golems'];
      const botdOptions = [
        ['Skirmisher', 'Defender', 'Reaper'],
        ['Shadow Mage', 'Cold Mage', 'Bone Mage'],
        ['Bone Golem', 'Blood Golem', 'Iron Golem']
      ];
      
      for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.className = 'botd-row';
        const key = botdKeys[i];
        const state = currentBuild.bookOfTheDead[key];
        
        let optionsHtml = '';
        botdOptions[i].forEach(opt => {
          optionsHtml += `<option value="${opt}" ${state.spec === opt ? 'selected' : ''}>${opt}</option>`;
        });
        
        let iconUrl = '';
        if (key === 'warriors') iconUrl = 'assets/botd_warriors.jpg';
        else if (key === 'mages') iconUrl = 'assets/botd_mages.jpg';
        else if (key === 'golems') iconUrl = 'assets/botd_golems.jpg';
        
        const getSpecContent = (spec) => {
          if (spec === 'Skirmisher') return '<img src="assets/skirmisher_icon.png" style="height: 48px; object-fit: contain;">';
          if (spec === 'Defender') return '<img src="assets/defender_icon.png" style="height: 48px; object-fit: contain;">';
          if (spec === 'Reaper') return '<img src="assets/reaper_icon.png" style="height: 48px; object-fit: contain;">';
          if (spec === 'Shadow Mage') return '<img src="assets/shadow_mage_icon.png" style="height: 48px; object-fit: contain;">';
          if (spec === 'Cold Mage') return '<img src="assets/cold_mage_icon.png" style="height: 48px; object-fit: contain;">';
          if (spec === 'Bone Mage') return '<img src="assets/bone_mage_icon.png" style="height: 48px; object-fit: contain;">';
          if (spec === 'Bone Golem') return '<img src="assets/bone_golem_icon.png" style="height: 48px; object-fit: contain;">';
          if (spec === 'Blood Golem') return '<img src="assets/blood_golem_icon.png" style="height: 48px; object-fit: contain;">';
          if (spec === 'Iron Golem') return '<img src="assets/iron_golem_icon.png" style="height: 48px; object-fit: contain;">';
          return spec;
        };
        
        row.innerHTML = `
          <div class="botd-minion-icon" style="background-image: url('${iconUrl}'); background-size: cover; background-position: center;"></div>
          <div class="botd-spec-text" style="display: flex; align-items: center;">${getSpecContent(state.spec)}</div>
          <div class="botd-nodes-group">
            <div class="botd-node circle-1" data-node="1"></div>
            <div class="botd-node circle-2" data-node="2"></div>
            <div class="botd-node sacrifice" data-node="sacrifice"></div>
          </div>
        `;
        
        const openContextMenu = (e) => {
          e.stopPropagation();
          const menu = document.getElementById('d4-context-menu');
          if (!menu) return;
          
          let menuHtml = '';
          botdOptions[i].forEach(opt => {
            const isSelected = state.spec === opt;
            menuHtml += `<div class="d4-context-option ${isSelected ? 'selected' : ''}" data-opt="${opt}">${opt}</div>`;
          });
          
          menu.innerHTML = menuHtml;
          menu.classList.remove('hidden');
          
          const rect = row.querySelector('.botd-minion-icon').getBoundingClientRect();
          menu.style.left = (rect.right + window.scrollX + 10) + 'px';
          menu.style.top = (rect.top + window.scrollY - 20) + 'px';
          
          // Add click listeners to options
          const options = menu.querySelectorAll('.d4-context-option');
          options.forEach(optDiv => {
            optDiv.addEventListener('click', (ev) => {
              ev.stopPropagation();
              currentBuild.bookOfTheDead[key].spec = optDiv.dataset.opt;
              currentBuild.bookOfTheDead[key].node = null; // Reset node selection
              saveBuild();
              
              // Update DOM directly
              specText.innerHTML = getSpecContent(optDiv.dataset.opt);
              const nodes = row.querySelectorAll('.botd-node');
              nodes.forEach(n => {
                n.classList.remove('active');
                n.classList.remove('dimmed');
              });
              
              menu.classList.add('hidden');
            });
          });
        };
        
        const minionIcon = row.querySelector('.botd-minion-icon');
        const specText = row.querySelector('.botd-spec-text');
        
        minionIcon.addEventListener('click', openContextMenu);
        specText.addEventListener('click', openContextMenu);
        
        // Add click logic
        const nodes = row.querySelectorAll('.botd-node');
        
        if (state.node) {
          const activeNode = Array.from(nodes).find(n => n.dataset.node === state.node);
          if (activeNode) {
            nodes.forEach(n => n.classList.add('dimmed'));
            activeNode.classList.remove('dimmed');
            activeNode.classList.add('active');
          }
        }
        
        nodes.forEach(node => {
          node.addEventListener('click', () => {
            const nodeId = node.dataset.node;
            // If already active, just un-dim others and remove active
            if (node.classList.contains('active')) {
              nodes.forEach(n => {
                n.classList.remove('active');
                n.classList.remove('dimmed');
              });
              currentBuild.bookOfTheDead[key].node = null;
            } else {
              nodes.forEach(n => {
                n.classList.remove('active');
                n.classList.add('dimmed');
              });
              node.classList.add('active');
              node.classList.remove('dimmed');
              currentBuild.bookOfTheDead[key].node = nodeId;
            }
            saveBuild();
          });
          
          node.addEventListener('mouseenter', (e) => {
            const tooltip = document.getElementById('d4-tooltip');
            if (!tooltip) return;
            
            const specName = currentBuild.bookOfTheDead[key].spec;
            const isSacrifice = node.classList.contains('sacrifice');
            const nodeNum = node.dataset.node;
            
            
              let level = document.getElementById('character-level') ? parseInt(document.getElementById('character-level').value) || 50 : 50;
              let warriorRank = 1;
              if (typeof currentBuild !== 'undefined' && currentBuild && currentBuild.skills) {
                 warriorRank = currentBuild.skills["Skeleton Warrior"] || currentBuild.skills["Necromancer_SkeletonWarrior"] || 1;
                 // Add item bonuses
                 if (typeof calculate === 'function') {
                    // Try to extract from the stats panel if it exists
                    // Actually, if we just use the dom element:
                 }
              }
              // The exact formula: Max((0.0007377*Pow(Level-1,3.6292)+2+(1+Round(Level*0.1))*SkillRank(439912))*Table(34,SkillRank(439912)),1)
              let powVal = Math.pow(level - 1, 3.6292);
              let rankMult = 1.0 + ((warriorRank - 1) * 0.10); // Approximation of Table 34
              let thornsBase = (0.0007377 * powVal) + 2 + ((1 + Math.round(level * 0.1)) * warriorRank);
              let thornsValue = Math.max(thornsBase * rankMult, 1);
              thornsValue = Math.floor(thornsValue);

            const BOTD_DATA = {
              'Skirmisher': {
                desc: 'Skirmishers slice up enemies, dealing high damage to a single target.',
                tagline: '<span class="d4-tooltip-keyword">Skeleton Warrior</span> is also a <span class="d4-tooltip-keyword">Bone</span> Skill.',
                upgrades: [
                  `You can raise <span class="d4-tooltip-number">2</span> additional Skirmishers.<br><br>Whenever a Skirmisher is Summoned, you automatically command them to leap at a nearby enemy and attack.`,
                  `Skirmishers slice up enemies, making them <span class="d4-tooltip-keyword-underline">Vulnerable</span> and Slowing them by <span class="d4-tooltip-number">50%</span> for <span class="d4-tooltip-number">4</span> seconds.`
                ],
                sacrifice: `Your Critical Strike Chance is increased by <span class="d4-tooltip-number">5%</span>[+], but the amount of Skirmishers you can Summon is reduced by <span class="d4-tooltip-number">50%</span>.`
              },
              'Defender': {
                desc: 'Defenders are durable protectors, dealing less damage but retaining strong survivability.',
                tagline: '<span class="d4-tooltip-keyword">Skeleton Warrior</span> is also a <span class="d4-tooltip-keyword">Blood</span> Skill.',
                upgrades: [
                  `Defenders gain <span class="d4-tooltip-number">${thornsValue}</span> Thorns. Whenever they are damaged, their bones splinter and deal <span class="d4-tooltip-number">50%</span> of their Thorns to nearby enemies.<br><br>Commanding your Defenders causes them to Taunt nearby enemies for <span class="d4-tooltip-number">6</span> seconds.`,
                  `Defenders have a <span class="d4-tooltip-number">10%</span> chance to form a <span class="d4-tooltip-keyword-underline">Blood Orb</span> when they deal damage.`
                ],
                sacrifice: `You gain <span class="d4-tooltip-number">40%</span>[+] Resistance to All Elements, but the amount of Defenders you can Summon is reduced by <span class="d4-tooltip-number">50%</span>.`
              },
              'Reaper': {
                desc: 'Reapers wield a powerful cleaving scythe and have a wind-up attack that deals heavy damage every <span class="d4-tooltip-number">10</span> seconds.',
                tagline: '<span class="d4-tooltip-keyword">Skeleton Warrior</span> is also a <span class="d4-tooltip-keyword">Darkness</span> Skill.',
                upgrades: [
                  `Reaper's wind-up attacks now reduce one of your active Cooldowns by <span class="d4-tooltip-number">3</span> seconds and form a Corpse.`,
                  `Reapers deal <span class="d4-tooltip-number">50%</span>[x] increased damage and have a <span class="d4-tooltip-number">15%</span> chance to Stun enemies for <span class="d4-tooltip-number">1</span> second.`
                ],
                sacrifice: `You deal <span class="d4-tooltip-number">15%</span>[x] increased damage, but the amount of Reapers you can Summon is reduced by <span class="d4-tooltip-number">50%</span>.`
              },
              'Shadow Mage': {
                desc: 'Shadow Mages wield power from the beyond, firing bursting shadow bolts.',
                tagline: '<span class="d4-tooltip-keyword">Skeleton Mage</span> is also a <span class="d4-tooltip-keyword">Darkness</span> Skill.',
                upgrades: [
                  `Shadow Mages deal an additional <span class="d4-tooltip-number">100%</span> x [Damage] Corrupting damage over <span class="d4-tooltip-number">6</span> seconds.`,
                  `Shadow Mages' bolts grant you and the Shadow Mage a <span class="d4-tooltip-keyword-underline">Barrier</span> for <span class="d4-tooltip-number">3.0%</span> of your Maximum Life (<span class="d4-tooltip-number">46</span>) for <span class="d4-tooltip-number">4</span> seconds, up to <span class="d4-tooltip-number">30%</span>.`
                ],
                sacrifice: `Your Essence Regeneration is increased by <span class="d4-tooltip-number">20%</span>[+] and your maximum Essence is increased by <span class="d4-tooltip-number">20</span>, but the amount of Shadow Mages you can Summon is reduced by <span class="d4-tooltip-number">50%</span>.`
              },
              'Cold Mage': {
                desc: 'Cold Mages attacks will chill enemies, eventually freezing them in their tracks.',
                tagline: '<span class="d4-tooltip-keyword">Skeleton Mage</span> is also a <span class="d4-tooltip-keyword">Darkness</span> Skill.',
                upgrades: [
                  `Cold Mages' initial projectile forks into <span class="d4-tooltip-number">2</span> projectiles on impact.<br><br>Enemies damaged by Cold Mages are <span class="d4-tooltip-keyword-underline">Weakened</span> for <span class="d4-tooltip-number">4</span> seconds.`,
                  `Cold Mages occasionally cast a blizzard that deals <span class="d4-tooltip-number">200%</span> x [Damage] Cold damage over <span class="d4-tooltip-number">6</span> seconds and <span class="d4-tooltip-keyword-underline">Chills</span> for <span class="d4-tooltip-number">6%</span> every second.<br><br>Enemies damaged by Cold Mages are made <span class="d4-tooltip-keyword-underline">Vulnerable</span> for <span class="d4-tooltip-number">4</span> seconds.`
                ],
                sacrifice: `You deal <span class="d4-tooltip-number">20%</span>[x] increased damage to Vulnerable enemies, but the amount of Cold Mages you can Summon is reduced by <span class="d4-tooltip-number">50%</span>.`
              },
              'Bone Mage': {
                desc: 'Bone Mages use their own bodies as piercing projectiles, dealing heavy damage at the cost of their own Life.',
                tagline: '<span class="d4-tooltip-keyword">Skeleton Mage</span> is also a <span class="d4-tooltip-keyword">Bone</span> Skill.',
                upgrades: [
                  `Bone Mages fire <span class="d4-tooltip-number">2</span> additional projectiles that deal <span class="d4-tooltip-number">75%</span> of normal damage.`,
                  `Bone Mages' attacks <span class="d4-tooltip-keyword-underline">Fortify</span> you for <span class="d4-tooltip-number">3.0%</span> of your Maximum Life (<span class="d4-tooltip-number">46</span>).<br><br>Bone Mages form a Corpse when they die.`
                ],
                sacrifice: `You deal <span class="d4-tooltip-number">20%</span>[x] increased damage while you have a stack of <span class="d4-tooltip-keyword-underline">Overpower</span>, but the amount of Bone Mages you can Summon is reduced by <span class="d4-tooltip-number">50%</span>.`
              },
              'Blood Golem': {
                desc: 'Blood Golem drains Life from nearby enemies, healing and bolstering itself.',
                tagline: '<span class="d4-tooltip-keyword">Golem</span> is also a <span class="d4-tooltip-keyword">Blood</span> Skill.',
                upgrades: [
                  `Commanding your Blood Golem also causes it to drain Life from your other <span class="d4-tooltip-keyword">Minions</span>, increasing its Maximum Life by <span class="d4-tooltip-number">5%</span> and damage by <span class="d4-tooltip-number">5%</span>[x] per <span class="d4-tooltip-keyword">Minion</span> drained for <span class="d4-tooltip-number">20</span> seconds, up to <span class="d4-tooltip-number">50%</span> increased Maximum Life and <span class="d4-tooltip-number">50%</span>[x] increased damage.`,
                  `When you command your Blood Golem, you <span class="d4-tooltip-keyword-underline">Fortify</span> for <span class="d4-tooltip-number">10%</span> of your Maximum Life (<span class="d4-tooltip-number">153</span>) for each enemy it drains.`
                ],
                sacrifice: `Your Maximum Life is increased by <span class="d4-tooltip-number">20%</span>[x], but your Golem does <span class="d4-tooltip-number">50%</span>[x] less damage.`
              },
              'Bone Golem': {
                desc: 'Bone Golem taunts enemies, forcing them to attack it and retaliating with deadly Thorns.',
                tagline: '<span class="d4-tooltip-keyword">Golem</span> is also a <span class="d4-tooltip-keyword">Bone</span> Skill.',
                upgrades: [
                  `Commanding your Bone Golem causes it to form <span class="d4-tooltip-number">5</span> corpses.`,
                  `When your Bone Golem takes damage, it unleashes bone spikes dealing <span class="d4-tooltip-number">250%</span> x [Damage] damage. This effect can occur once every <span class="d4-tooltip-number">3</span> seconds.<br><br>Enemies damaged by Bone Golem are made <span class="d4-tooltip-keyword-underline">Vulnerable</span> for <span class="d4-tooltip-number">4</span> seconds.`
                ],
                sacrifice: `You gain <span class="d4-tooltip-number">10%</span>[+] increased Attack Speed, but your Golem does <span class="d4-tooltip-number">50%</span>[x] less damage.`
              },
              'Iron Golem': {
                desc: 'Iron Golem wields immense weight and power, Stunning and controlling enemies.',
                tagline: '<span class="d4-tooltip-keyword">Golem</span> is also a <span class="d4-tooltip-keyword">Darkness</span> Skill.',
                upgrades: [
                  `Every Iron Golem attack causes a shockwave, dealing <span class="d4-tooltip-number">125%</span> x [Damage] damage to the primary enemy and to enemies behind them.`,
                  `Your Iron Golem's slam attack Pulls In enemies and its Size is increased by <span class="d4-tooltip-number">50%</span>.`
                ],
                sacrifice: `You deal <span class="d4-tooltip-number">15%</span>[x] increased Critical Strike Damage, but your Golem does <span class="d4-tooltip-number">50%</span>[x] less damage.`
              }
            };
            
            const data = BOTD_DATA[specName] || {
              desc: `Placeholder description for ${specName}.`,
              tagline: `Placeholder tagline for ${specName}.`,
              upgrades: [`Placeholder upgrade 1 for ${specName}`, `Placeholder upgrade 2 for ${specName}`],
              sacrifice: `Placeholder sacrifice for ${specName}`
            };
            
            let content = `
              <div class="d4-tooltip-title">${specName}</div>
              <div class="d4-tooltip-divider"></div>
            `;
            
            if (isSacrifice) {
               content += `
                 <div class="d4-tooltip-upgrades-header">SACRIFICE</div>
                 <div class="d4-tooltip-upgrade">${data.sacrifice}</div>
               `;
            } else {
               const upgradeText = nodeNum === '1' ? data.upgrades[0] : data.upgrades[1];
               
               content += `
                 <div class="d4-tooltip-desc">${data.desc}</div>
                 <div class="d4-tooltip-tagline">${data.tagline}</div>
                 <div class="d4-tooltip-upgrades-header">UPGRADE ${nodeNum}</div>
                 <div class="d4-tooltip-upgrade">${upgradeText}</div>
               `;
            }
            
            tooltip.innerHTML = content;
            tooltip.classList.remove('hidden');
            tooltip.classList.add('visible');
            
            // Initial position update
            const rect = node.getBoundingClientRect();
            tooltip.style.left = (rect.left + window.scrollX - 160 + rect.width / 2) + 'px';
            tooltip.style.top = (rect.top + window.scrollY - tooltip.offsetHeight - 10) + 'px';
          });
          
          node.addEventListener('mousemove', (e) => {
             const tooltip = document.getElementById('d4-tooltip');
             if (!tooltip || tooltip.classList.contains('hidden')) return;
             // Can add dynamic cursor following here if desired, but sticking to node-anchored above it is usually cleaner
          });
          
          node.addEventListener('mouseleave', () => {
            const tooltip = document.getElementById('d4-tooltip');
            if (tooltip) {
                tooltip.classList.add('hidden');
                tooltip.classList.remove('visible');
            }
          });
        });
        
        panel.appendChild(row);
      }
      const bottomRow = document.getElementById('paperdoll-bottom-row');
      if (bottomRow) {
        bottomRow.appendChild(panel);
      } else {
        rightCol.appendChild(panel); // Fallback
      }
    }
    
    for (let i = 0; i < 6; i++) {
      const sb = document.createElement('div');
      sb.className = 'skill-box';
      sb.style.cursor = 'pointer';
      
      const activeSkill = currentBuild.activeSkills && currentBuild.activeSkills[i];
      if (activeSkill) {
          let imgName = activeSkill.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
          let clsName = currentBuild.class || 'Necromancer';
          sb.style.backgroundImage = `url('assets/Skills/${clsName}/${imgName}.png')`;
          sb.style.backgroundSize = 'cover';
          sb.style.backgroundPosition = 'center';
          
          let skillObj = null;
          if (typeof skillsDatabase !== 'undefined' && skillsDatabase) {
              for (const cat of Object.keys(skillsDatabase)) {
                  let found = skillsDatabase[cat].find(s => s.name === activeSkill);
                  if (found) { skillObj = found; break; }
              }
          }
          if (skillObj) {
              sb.onmouseenter = (e) => showSkillTooltip(skillObj, e);
              sb.onmousemove = (e) => moveSkillTooltip(e);
              sb.onmouseleave = (e) => hideSkillTooltip(e);
          }
      } else {
          sb.onmouseenter = null;
          sb.onmousemove = null;
          sb.onmouseleave = null;
      }
      
      sb.addEventListener('click', (e) => {
          openSkillAssignmentDropdown(i, sb);
          e.stopPropagation();
      });
      
      sb.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          if (currentBuild.activeSkills && currentBuild.activeSkills[i]) {
              currentBuild.activeSkills[i] = null;
              if (typeof hideSkillTooltip === 'function') hideSkillTooltip();
              renderEquipment(currentBuild.class, currentBuild.equipment);
              if (typeof calculate === 'function') calculate();
          }
      });
      
      footer.appendChild(sb);
    }
  }

  function openSkillAssignmentDropdown(slotIndex, anchorEl) {
      const dropdown = document.getElementById('skill-assignment-dropdown');
      if (!dropdown) return;
      if (!skillsDatabase) return;
      
      dropdown.innerHTML = '';
      
      const rect = anchorEl.getBoundingClientRect();
      dropdown.style.left = (rect.left + window.scrollX) + 'px';
      dropdown.style.top = (rect.top + window.scrollY - 300) + 'px'; // Default above
      dropdown.classList.remove('hidden');
      
      // Empty slot option
      const noneRow = document.createElement('div');
      noneRow.className = 'skill-assign-row';
      const noneIcon = document.createElement('div');
      noneIcon.className = 'skill-assign-icon empty-slot';
      noneIcon.innerHTML = '&#10006;'; // X mark
      noneIcon.title = 'Clear Slot';
      noneIcon.addEventListener('click', () => {
          currentBuild.activeSkills[slotIndex] = null;
          dropdown.classList.add('hidden');
          renderEquipment(currentBuild.class, currentBuild.equipment);
      });
      noneRow.appendChild(noneIcon);
      dropdown.appendChild(noneRow);
      
      for (const [category, skills] of Object.entries(skillsDatabase)) {
          const row = document.createElement('div');
          row.className = 'skill-assign-row';
          let added = false;
          
          skills.forEach(skill => {
              // Base skill
              const icon = document.createElement('div');
              icon.className = 'skill-assign-icon';
              let imgName = skill.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
              let clsName = currentBuild.class || 'Necromancer';
              icon.style.backgroundImage = `url('assets/Skills/${clsName}/${imgName}.png')`;
              icon.title = skill.name;
              
              icon.addEventListener('click', () => {
                  currentBuild.activeSkills[slotIndex] = skill.name;
                  dropdown.classList.add('hidden');
                  hideSkillTooltip();
                  renderEquipment(currentBuild.class, currentBuild.equipment);
              });
              
              icon.onmouseenter = (e) => showSkillTooltip(skill, e);
              icon.onmousemove = (e) => moveSkillTooltip(e);
              icon.onmouseleave = (e) => hideSkillTooltip(e);
              
              row.appendChild(icon);
              added = true;
          });
          if (added) dropdown.appendChild(row);
      }
      
      // Fix positioning if offscreen
      setTimeout(() => {
          const ddRect = dropdown.getBoundingClientRect();
          if (ddRect.top < 0) {
              dropdown.style.top = (rect.bottom + window.scrollY + 10) + 'px';
          }
      }, 0);
  }
  
  document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('skill-assignment-dropdown');
      if (dropdown && !dropdown.classList.contains('hidden')) {
          if (!dropdown.contains(e.target) && !e.target.classList.contains('skill-box')) {
              dropdown.classList.add('hidden');
          }
      }
  });

  function renderLegendaryBonusInputs(className, savedValues) {
    const container = dom.legendaryBonusesContainer;
    if (!container) return;
    const classData = CLASS_PARAGON_DATA[className];
    container.innerHTML = '';
    
    const sv = Array.isArray(savedValues) ? savedValues : [0,0,0,0,0];
    
    for (let i = 1; i <= 5; i++) {
      const group = document.createElement('div');
      group.className = 'input-group';
      const label = document.createElement('label');
      label.textContent = `Legendary Bonus ${i}`;
      // Label appended later to place it underneath
      
      const saved = sv[i - 1];

      if (classData) {
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.justifyContent = 'space-between';
        rowDiv.style.alignItems = 'center';
        rowDiv.style.padding = '0.55rem 0.2rem';
        rowDiv.style.backgroundColor = 'rgba(0,0,0,0.1)';
        rowDiv.style.borderRadius = '4px';
        
        const lvl = document.createElement('input');
        lvl.type = 'number';
        lvl.id = `legendary-bonus-lvl-${i}`;
        lvl.min = '1';
        lvl.max = '150';
        lvl.step = '1';
        lvl.style.flex = '1';
        lvl.style.padding = '0.4rem 0.2rem';
        lvl.placeholder = 'Lvl';
        lvl.value = typeof saved === 'number' ? saved : 1;
        
        const disp = document.createElement('span');
        disp.id = `legendary-bonus-disp-${i}`;
        disp.style.textAlign = 'right';
        disp.style.flex = '1';
        disp.style.fontSize = '0.9rem';
        disp.style.color = 'var(--primary)';
        disp.style.fontWeight = '600';
        disp.textContent = '0.0%';
        
        lvl.addEventListener('input', calculate);
        
        rowDiv.appendChild(lvl);
        rowDiv.appendChild(disp);
        group.appendChild(rowDiv);
        group.appendChild(label); // Moved label below the input
      } else {
        const inp = document.createElement('input');
        inp.type = 'number';
        inp.id = `legendary-bonus-inp-${i}`;
        inp.value = (typeof saved === 'number') ? saved : 0;
        inp.step = 'any';
        inp.placeholder = '0';
        inp.addEventListener('input', calculate);
        group.appendChild(inp);
        group.appendChild(label); // Moved label below the input
      }
      container.appendChild(group);
    }
    calculate();
  }

  function getNodeEls() {
    return [
      document.getElementById('node-1'),
      document.getElementById('node-2'),
      document.getElementById('node-3'),
      document.getElementById('node-4'),
    ];
  }

  function renderNodeInputs(className, savedValues) {
    const container = dom.nodesContainer;
    if (!container) return;
    const classData = CLASS_PARAGON_DATA[className];
    container.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
      const group = document.createElement('div');
      group.className = 'input-group';
      const label = document.createElement('label');
      label.textContent = `Node ${i}`;
      // Label appended later to place it underneath
      if (classData) {
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.gap = '0.25rem';
        rowDiv.style.alignItems = 'center';

        const sel = document.createElement('select');
        sel.id = `node-${i}`;
        sel.style.flex = '2';
        
        classData.nodes.forEach(opt => {
          const o = document.createElement('option');
          o.value = opt.value;
          const nodeName = opt.label.split(':')[0];
          o.textContent = nodeName;
          sel.appendChild(o);
        });
        
        const disp = document.createElement('span');
        disp.id = `node-disp-${i}`;
        disp.style.flex = '1';
        disp.style.textAlign = 'right';
        disp.style.fontSize = '0.85rem';
        disp.style.color = 'var(--primary)';
        disp.style.fontWeight = '600';
        
        if (savedValues && savedValues[i - 1] !== undefined) {
          const sv = savedValues[i - 1];
          if (typeof sv === 'object' && sv !== null) {
            sel.value = sv.name === 'Castle' ? 'custom' : sv.value;
          } else {
            sel.value = sv;
          }
        }
        
        function handleCustomInput() {
          let customInp = document.getElementById(`node-custom-${i}`);
          if (sel.value === 'custom') {
            if (!customInp) {
              customInp = document.createElement('input');
              customInp.type = 'number';
              customInp.id = `node-custom-${i}`;
              customInp.style.flex = '1';
              customInp.style.marginLeft = '0.25rem';
              customInp.style.width = '60px';
              customInp.placeholder = '%';
              
              const sv = savedValues[i - 1];
              customInp.value = (typeof sv === 'object' && sv !== null) ? (sv.value || 0) : 0;
              
              customInp.addEventListener('input', () => {
                disp.textContent = customInp.value ? `${customInp.value}%` : '0%';
                calculate();
              });
              rowDiv.insertBefore(customInp, disp);
            }
            disp.textContent = customInp.value ? `${customInp.value}%` : '0%';
          } else {
            if (customInp) customInp.remove();
            disp.textContent = sel.value ? `${sel.value}%` : '0%';
          }
        }

        handleCustomInput();
        
        sel.addEventListener('change', () => {
          handleCustomInput();
          updateNodeDropdowns();
          calculate();
        });
        
        rowDiv.appendChild(sel);
        rowDiv.appendChild(disp);
        group.appendChild(rowDiv);
        group.appendChild(label); // Moved label below the input
      } else {
        const inp = document.createElement('input');
        inp.type = 'number';
        inp.id = `node-${i}`;
        inp.value = (savedValues && savedValues[i - 1] !== undefined) ? savedValues[i - 1] : 0;
        inp.step = 'any';
        inp.placeholder = '0';
        inp.addEventListener('input', calculate);
        group.appendChild(inp);
        group.appendChild(label); // Moved label below the input
      }
      container.appendChild(group);
    }
    updateNodeDropdowns();
    calculate();
  }

  function updateNodeDropdowns() {
    const selectedText = [];
    for (let i = 1; i <= 4; i++) {
      const sel = document.getElementById(`node-${i}`);
      if (sel && sel.selectedIndex >= 0) {
        const text = sel.options[sel.selectedIndex].textContent;
        if (text !== "None" && text !== "") {
          selectedText.push(text);
        }
      }
    }
    for (let i = 1; i <= 4; i++) {
      const sel = document.getElementById(`node-${i}`);
      if (sel) {
        Array.from(sel.options).forEach(opt => {
          if (opt.textContent !== "None" && opt.textContent !== "" && selectedText.includes(opt.textContent) && !opt.selected) {
            opt.disabled = true;
          } else {
            opt.disabled = false;
          }
        });
      }
    }
  }

  function getEffectiveQuality(itemObj) {
    let q = itemObj.quality || 0;
    if (itemObj.transfigure) {
        itemObj.transfigure.forEach((tName, idx) => {
            if (tName && tName.includes('Item Quality')) {
                let v = 0;
                if (itemObj.transfigureValues && itemObj.transfigureValues[idx] && itemObj.transfigureValues[idx][0] !== undefined) {
                    v = itemObj.transfigureValues[idx][0];
                } else {
                    // Fallback to parsing the max value directly from the affix name (e.g. "+[1 - 15] Item Quality")
                    const match = tName.match(/\[([\d\.,]+)\s*-\s*([\d\.,]+)\]/);
                    if (match) {
                        v = parseFloat(match[2].replace(/,/g, '')) || 0;
                    }
                }
                q += v;
            }
        });
    }
    return q;
  }

  function addStat(stats, rawName, value, sourceName = 'Equipment') {
      if (!rawName) return;
      let cleanName = rawName.replace(/\[(?!(?:x|X)\]).*?\]\s*/g, '').replace(/^[\+\-]\s*/, '').trim();
      
      const keepPct = ['% Strength', '% Intelligence', '% Willpower', '% Dexterity', '% Maximum Life', '% Armor', '% Total Armor', '% Resistance to All Elements'];
      if (cleanName.startsWith('%') && !keepPct.includes(cleanName)) {
          cleanName = cleanName.replace(/^%\s*/, '').trim();
      }
      
      if (cleanName === 'Maximum Resource') {
          const currClass = currentBuild.class || 'Necromancer';
          if (currClass === 'Necromancer') cleanName = 'Maximum Essence';
          else if (currClass === 'Barbarian') cleanName = 'Maximum Fury';
          else if (currClass === 'Rogue') cleanName = 'Maximum Energy';
          else if (currClass === 'Sorcerer') cleanName = 'Maximum Mana';
          else if (currClass === 'Druid') cleanName = 'Maximum Spirit';
          else if (currClass === 'Spiritborn') cleanName = 'Maximum Vigor';
      }
      
      if (!stats[cleanName]) {
          stats[cleanName] = { 
              total: 0, 
              final: 0,
              flatSources: [], 
              pctSources: [] 
          };
      }
      
      let targetList = stats[cleanName].flatSources;
      let existingSource = targetList.find(s => s.name === sourceName);
      if (existingSource) {
          existingSource.val += value;
      } else {
          targetList.push({ name: sourceName, val: value });
      }
      
      stats[cleanName].total += value;
      if (stats[cleanName].pctSources && stats[cleanName].pctSources.length > 0) {
          let totalPct = stats[cleanName].pctSources.reduce((sum, s) => sum + s.val, 0);
          stats[cleanName].final = stats[cleanName].total * (1 + (totalPct / 100));
      } else {
          stats[cleanName].final = stats[cleanName].total;
      }
  }

  function cleanStatName(name) {
    if (!name) return name;
    return name.replace(/^\+?\[[\d\.,]+\s*-\s*[\d\.,]+\]%?\s*/, '');
}

function compileCharacterStats(equipped, autoStats) {
        const stats = {};
        
        addStat(stats, 'Strength', autoStats.baseStr, 'Base');
        addStat(stats, 'Strength', autoStats.levelStr, 'Level');
        addStat(stats, 'Intelligence', autoStats.baseInt, 'Base');
        addStat(stats, 'Intelligence', autoStats.levelInt, 'Level');
        addStat(stats, 'Willpower', autoStats.baseWill, 'Base');
        addStat(stats, 'Willpower', autoStats.levelWill, 'Level');
        addStat(stats, 'Dexterity', autoStats.baseDex, 'Base');
        addStat(stats, 'Dexterity', autoStats.levelDex, 'Level');
        addStat(stats, 'Maximum Life', autoStats.maximumLife, 'Base');
        
        // Base Character Combat Stats
        addStat(stats, 'Critical Strike Chance', 5, 'Base');
        
        // --- Apply Buffs ---
        if (typeof getActiveBuffs === 'function') {
            const activeBuffs = getActiveBuffs();
            const activeConds = typeof getActiveConditions === 'function' ? getActiveConditions() : {};
            
            if (activeBuffs.weakened) {
                let weakDr = 20;
                if (activeConds.monsterType === 'elite') weakDr = 15;
                if (activeConds.monsterType === 'boss') weakDr = 10;
                // Currently no dedicated boss condition, assume boss is elite for now, or you could add one later.
                addStat(stats, 'Universal Damage Reduction %', weakDr, 'Weakened Buff');
            }
            if (activeBuffs.ferocity > 0) {
                addStat(stats, 'Attack Speed', activeBuffs.ferocity * 5, 'Ferocity Stacks');
            }
            addStat(stats, 'Damage Per Overpower Stack', 15, 'Inherent Overpower Bonus');
            if (activeBuffs.resolve > 0) {
                addStat(stats, '% Armor', 25, 'Resolve Buff');
            }
        }
        
        if (typeof window.getCompiledParagonStats === 'function') {
            const pStats = window.getCompiledParagonStats();
            for (let [k, v] of Object.entries(pStats)) {
                let statName = k;
                if (v.isPercent && ['Strength', 'Intelligence', 'Willpower', 'Dexterity', 'Maximum Life', 'Armor', 'Total Armor', 'Resistance to All Elements'].includes(statName)) {
                    statName = '% ' + statName;
                }
                addStat(stats, statName, v.value, 'Paragon Board');
            }
            
            // Add static Legendary powers that provide base stats
            if (typeof window.getActiveLegendaryPowers === 'function') {
                const legPowers = window.getActiveLegendaryPowers();
                if (legPowers.includes('Paragon_Necro_Legendary_017')) {
                    addStat(stats, 'Maximum Essence', 10, 'Bone Graft (Legendary Node)');
                }
                if (legPowers.includes('Paragon_Necro_Legendary_007')) {
                    addStat(stats, 'Universal Damage Reduction %', 15, 'Scent of Death (Legendary Node)');
                }
            }
        }
        
        // Apply active Skill Modifiers (Variable Stacks / Sliders)
        if (window.selectedSkills) {
            window.skillSliderValues = window.skillSliderValues || {};
            // Pile the Bodies (Up to 300%[x])
            if (window.selectedSkills['Pile the Bodies'] > 0) {
                let curStack = window.skillSliderValues['Pile the Bodies'] !== undefined ? window.skillSliderValues['Pile the Bodies'] : 300;
                if (curStack > 0) {
                    addStat(stats, 'Skill: Army of the Dead (Pile the Bodies) Damage [x]', curStack, 'Pile the Bodies');
                }
            }
            
            // Bloody Mess (50%[x] to Corpse Explosion)
            if (window.selectedSkills['Bloody Mess'] > 0) {
                addStat(stats, 'Skill: Corpse Explosion (Bloody Mess) Damage [x]', 50, 'Bloody Mess');
            }
        }
        
        let resourceName = 'Maximum Resource';
      const currClass = currentBuild.class || 'Necromancer';
      if (currClass === 'Necromancer') resourceName = 'Maximum Essence';
      else if (currClass === 'Barbarian') resourceName = 'Maximum Fury';
      else if (currClass === 'Rogue') resourceName = 'Maximum Energy';
      else if (currClass === 'Sorcerer') resourceName = 'Maximum Mana';
      else if (currClass === 'Druid') resourceName = 'Maximum Spirit';
      else if (currClass === 'Spiritborn') resourceName = 'Maximum Vigor';
      
      addStat(stats, resourceName, autoStats.maximumResource, 'Base');
      
      if (!equipped) return stats;


        const bestAspects = {};
        Object.keys(equipped).forEach(slotName => {
            const item = equipped[slotName];
            if (!item || !item.name) return;
            if (item.aspect && item.aspect !== 'None') {
                const aspectName = item.aspect;
                let val = 0;
                if (item.aspectValues && item.aspectValues.length > 0) val = parseFloat(item.aspectValues[0]) || 0;
                if (!bestAspects[aspectName] || val > bestAspects[aspectName].val) {
                    bestAspects[aspectName] = { val, slotName };
                }
            }
        });

      
      Object.keys(equipped).forEach(slotName => {
          const item = equipped[slotName];
          if (!item || !item.name) return;
          
          const effQ = getEffectiveQuality(item);
          const baseQMult = 1 + (effQ * 0.01);
          
          let dbSlotName = slotName;
          if (slotName === 'Left Ring' || slotName === 'Right Ring') dbSlotName = 'Ring';
          if (slotName === 'Ranged Weapon' || slotName.startsWith('Weapon')) dbSlotName = 'Mainhand'; // if needed
          
          const dbItemArr = window.D4_DATABASE?.itemDatabase?.[dbSlotName] || [];
          const baseItem = dbItemArr.find(i => i.name === item.name) || {};
          
          if (baseItem.armor) {
              addStat(stats, 'Base Armor', baseItem.armor * baseQMult, slotName);
          }
          if (baseItem.blockChance) {
              addStat(stats, 'Block Chance', baseItem.blockChance, slotName);
          }
          if (baseItem.damage) {
              const avgDmg = (baseItem.damage[0] + baseItem.damage[1]) / 2;
              addStat(stats, 'Base Weapon Damage', avgDmg * baseQMult, slotName);
          }
          if (baseItem.resistance) {
              addStat(stats, 'Resistance to All Elements', baseItem.resistance * baseQMult, slotName);
          }
          
          if (item.affixes) {
              item.affixes.forEach((affixName, i) => {
                  if (!affixName) return;
                  let v = 0;
                  if (item.affixValues && item.affixValues[i] && item.affixValues[i][0] !== undefined) {
                      v = item.affixValues[i][0];
                  } else {
                      let match = affixName.match(/\[([\d\.,]+)\s*-\s*([\d\.,]+)\]/);
                      if (match) {
                          v = parseFloat(match[2].replace(/,/g, ''));
                      } else {
                          // Fallback for old saves where affixName doesn't have the range brackets.
                          // Try to find the stat in the DB by shortName and extract its max.
                          const currentClassVal = document.getElementById('class-select')?.textContent || 'Necromancer';
                          let mappedSlot = slotName.toLowerCase();
                          if (mappedSlot === 'left ring' || mappedSlot === 'right ring') mappedSlot = 'ring';
                          if (mappedSlot === 'chest armor') mappedSlot = 'chest';
                          if (mappedSlot.startsWith('weapon') || mappedSlot === 'mainhand' || mappedSlot === 'offhand' || mappedSlot === 'ranged weapon') mappedSlot = 'mainhand';
                          
                          const classData = window.D4_DATABASE?.classData?.[currentClassVal]?.equipment?.[mappedSlot] || {};
                          const dbAffixes = classData.modifiers || [];
                          const dbMatch = dbAffixes.find(a => a.shortName === affixName || a.name === affixName);
                          if (dbMatch && dbMatch.name) {
                              match = dbMatch.name.match(/\[([\d\.,]+)\s*-\s*([\d\.,]+)\]/);
                              if (match) v = parseFloat(match[2].replace(/,/g, ''));
                          }
                      }
                  }
                  let isGA = item.greaterAffixes?.[i] || false;
                  let isCapstone = (item.capstoneBonus?.type === 'affix' && item.capstoneBonus?.idx === i);
                  const twoHandedMult = checkIs2H(item, slotName) ? 2 : 1;
                  const qMult = (baseQMult + (isGA ? 0.25 : 0) + (isCapstone ? 0.50 : 0)) * twoHandedMult;
                  addStat(stats, cleanStatName(affixName), v * qMult, slotName);
              });
          }
          
          if (item.tempering) {
              item.tempering.forEach((temperName, i) => {
                  if (!temperName) return;
                  let v = 0;
                  if (item.temperValues && item.temperValues[i] && item.temperValues[i][0] !== undefined) {
                      v = item.temperValues[i][0];
                  } else {
                      let match = temperName.match(/\[([\d\.,]+)\s*-\s*([\d\.,]+)\]/);
                      if (match) {
                          v = parseFloat(match[2].replace(/,/g, ''));
                      } else {
                          const currentClassVal = document.getElementById('class-select')?.textContent || 'Necromancer';
                          let mappedSlot = slotName.toLowerCase();
                          if (mappedSlot === 'left ring' || mappedSlot === 'right ring') mappedSlot = 'ring';
                          if (mappedSlot === 'chest armor') mappedSlot = 'chest';
                          if (mappedSlot.startsWith('weapon') || mappedSlot === 'mainhand' || mappedSlot === 'offhand' || mappedSlot === 'ranged weapon') mappedSlot = 'mainhand';
                          
                          const classData = window.D4_DATABASE?.classData?.[currentClassVal]?.equipment?.[mappedSlot] || {};
                          const dbTempers = classData.tempers || [];
                          const dbMatch = dbTempers.find(a => a.shortName === temperName || a.name === temperName);
                          if (dbMatch && dbMatch.name) {
                              match = dbMatch.name.match(/\[([\d\.,]+)\s*-\s*([\d\.,]+)\]/);
                              if (match) v = parseFloat(match[2].replace(/,/g, ''));
                          }
                      }
                  }
                  let isGA = item.greaterTempers?.[i] || false;
                  let isCapstone = (item.capstoneBonus?.type === 'temper' && item.capstoneBonus?.idx === i);
                  const twoHandedMult = checkIs2H(item, slotName) ? 2 : 1;
                  const qMult = (baseQMult + (isGA ? 0.25 : 0) + (isCapstone ? 0.50 : 0)) * twoHandedMult;
                  addStat(stats, cleanStatName(temperName), v * qMult, slotName);
              });
          }
          
          if (item.transfigure) {
              item.transfigure.forEach((transfigureName, i) => {
                  if (!transfigureName) return;
                  if (transfigureName.includes('Item Quality')) return; // handled by baseQMult
                  
                  let v = 0;
                  if (item.transfigureValues && item.transfigureValues[i] && item.transfigureValues[i][0] !== undefined) {
                      v = item.transfigureValues[i][0];
                  } else {
                      let match = transfigureName.match(/\[([\d\.,]+)\s*-\s*([\d\.,]+)\]/);
                      if (match) {
                          v = parseFloat(match[2].replace(/,/g, ''));
                      } else {
                          const currentClassVal = document.getElementById('class-select')?.textContent || 'Necromancer';
                          let mappedSlot = slotName.toLowerCase();
                          if (mappedSlot === 'left ring' || mappedSlot === 'right ring') mappedSlot = 'ring';
                          if (mappedSlot === 'chest armor') mappedSlot = 'chest';
                          if (mappedSlot.startsWith('weapon') || mappedSlot === 'mainhand' || mappedSlot === 'offhand' || mappedSlot === 'ranged weapon') mappedSlot = 'mainhand';
                          
                          const classData = window.D4_DATABASE?.classData?.[currentClassVal]?.equipment?.[mappedSlot] || {};
                          const dbTransfigures = classData.transfigures || [];
                          const dbMatch = dbTransfigures.find(a => a.shortName === transfigureName || a.name === transfigureName);
                          if (dbMatch && dbMatch.name) {
                              match = dbMatch.name.match(/\[([\d\.,]+)\s*-\s*([\d\.,]+)\]/);
                              if (match) v = parseFloat(match[2].replace(/,/g, ''));
                          }
                      }
                  }
                  let isCapstone = (item.capstoneBonus?.type === 'transfigure' && item.capstoneBonus?.idx === i);
                  const twoHandedMult = checkIs2H(item, slotName) ? 2 : 1;
                  const qMult = (baseQMult + (isCapstone ? 0.50 : 0)) * twoHandedMult;
                  addStat(stats, transfigureName, v * qMult, slotName + ' (Transfigure)');
              });
          }
          
          if (item.sockets) {
              const sName = slotName.toLowerCase();
              const isWeapon = sName.includes('weapon') || sName === 'mainhand' || sName === 'offhand';
              const isJewelry = sName === 'amulet' || sName.includes('ring');
              
              item.sockets.forEach(gemName => {
                  if (!gemName) return;
                  const gemObj = window.D4_DATABASE?.gems?.find(g => g.name === gemName);
                  if (!gemObj) return;
                  
                  let effect = gemObj.armorEffect;
                  if (isWeapon) effect = gemObj.weaponEffect;
                  else if (isJewelry) effect = gemObj.jewelryEffect;
                  
                  const match = effect.match(/([\+\-]?[\d\.]+)(%?)\s+(.*)/);
                  if (match) {
                      let v = parseFloat(match[1]);
                      let name = (match[2] ? '%' : '') + match[3];
                      addStat(stats, name, v, slotName + ' (Gem)');
                  }
              });
          }
      
            if (item.aspect && item.aspect !== 'None') {
                if (bestAspects[item.aspect] && bestAspects[item.aspect].slotName !== slotName) {
                    // Do not apply this duplicate aspect (weaker version)
                } else {
                    const aspectObj = (window.D4_DATABASE?.aspects || []).find(a => a.name === item.aspect);
                    if (aspectObj && aspectObj.desc) {
                        let v = 0;
                        if (item.aspectValues && item.aspectValues.length > 0) v = parseFloat(item.aspectValues[0]) || 0;
                        addStat(stats, item.aspect, v, slotName);
                    }
                }
            }
            
            if (item.rarity === 'unique' || item.rarity === 'mythic') {
                const uniqueObj = (window.D4_DATABASE?.uniques || []).find(u => u.name === item.name);
                if (uniqueObj && uniqueObj.desc) {
                    let v = 0;
                    if (item.aspectValues && item.aspectValues.length > 0) {
                        v = parseFloat(item.aspectValues[0]) || 0;
                    }
                    if (v === 0) {
                        let m = uniqueObj.desc.match(/([\d\.]+)(%?)\[x\]/);
                        if (m) v = parseFloat(m[1]) || 0;
                    }
                    addStat(stats, item.name, v, slotName);
                }
            }

        });
      
      // Distribute All Stats
      if (stats['All Stats']) {
          const allStatsObj = stats['All Stats'];
          const coreStats = ['Strength', 'Intelligence', 'Willpower', 'Dexterity'];
          coreStats.forEach(core => {
              if (!stats[core]) stats[core] = { total: 0, final: 0, flatSources: [], pctSources: [] };
              allStatsObj.flatSources.forEach(src => {
                  let existingSource = stats[core].flatSources.find(s => s.name === src.name);
                  if (existingSource) existingSource.val += src.val;
                  else stats[core].flatSources.push({ name: src.name, val: src.val });
                  stats[core].total += src.val;
                  stats[core].final += src.val;
              });
          });
          delete stats['All Stats'];
      }

      // Combine Base Armor into Armor
      if (stats['Base Armor']) {
          if (!stats['Armor']) stats['Armor'] = { total: 0, final: 0, flatSources: [], pctSources: [] };
          stats['Base Armor'].flatSources.forEach(src => {
              let existingSource = stats['Armor'].flatSources.find(s => s.name === src.name);
              if (existingSource) existingSource.val += src.val;
              else stats['Armor'].flatSources.push({ name: src.name, val: src.val });
              stats['Armor'].total += src.val;
              stats['Armor'].final += src.val;
          });
          delete stats['Base Armor'];
      }

        // Book of the Dead Sacrifice Bonuses (Base Stats)
        if (currentBuild?.bookOfTheDead) {
            const sacrificialKey = Object.keys(stats).find(k => k.toLowerCase() === 'sacrificial aspect');
            const sacEffectiveness = sacrificialKey ? stats[sacrificialKey].final : 0;
            const sacMultiplier = 1 + (sacEffectiveness / 100);
            
            // Warriors
            if (currentBuild.bookOfTheDead.warriors?.node === 'sacrifice') {
                if (currentBuild.bookOfTheDead.warriors.spec === 'Skirmisher') {
                    addStat(stats, 'Critical Strike Chance', 5 * sacMultiplier, 'Book of the Dead (Skirmisher Sacrifice)');
                } else if (currentBuild.bookOfTheDead.warriors.spec === 'Defender') {
                    addStat(stats, '% Resistance to All Elements', 40 * sacMultiplier, 'Book of the Dead (Defender Sacrifice)');
                }
            }
            
            // Mages
            if (currentBuild.bookOfTheDead.mages?.node === 'sacrifice') {
                if (currentBuild.bookOfTheDead.mages.spec === 'Shadow Mage') {
                    addStat(stats, 'Maximum Essence', 20 * sacMultiplier, 'Book of the Dead (Shadow Mage Sacrifice)');
                    addStat(stats, 'Essence Generation %', 20 * sacMultiplier, 'Book of the Dead (Shadow Mage Sacrifice)');
                }
            }
            
            // Golems
            if (currentBuild.bookOfTheDead.golems?.node === 'sacrifice') {
                if (currentBuild.bookOfTheDead.golems.spec === 'Bone Golem') {
                    addStat(stats, 'Attack Speed', 10 * sacMultiplier, 'Book of the Dead (Bone Golem Sacrifice)');
                } else if (currentBuild.bookOfTheDead.golems.spec === 'Blood Golem') {
                    addStat(stats, '% Maximum Life', 20 * sacMultiplier, 'Book of the Dead (Blood Golem Sacrifice)');
                }
            } else if (currentBuild.bookOfTheDead.golems?.node === '1') {
                if (currentBuild.bookOfTheDead.golems.spec === 'Blood Golem') {
                    addStat(stats, 'Skill: Golem (Blood Golem Upgrade 1) Damage [x]', 50, 'Book of the Dead (Blood Golem Upgrade 1)');
                }
            }
        }
      
      // Post-Compilation Step: Additive Percent Modifiers
      const additiveScalers = [
          { flat: 'Strength', pct: ['% Strength'] },
          { flat: 'Intelligence', pct: ['% Intelligence'] },
          { flat: 'Willpower', pct: ['% Willpower'] },
          { flat: 'Dexterity', pct: ['% Dexterity'] },
          { flat: 'Maximum Life', pct: ['% Maximum Life'] },
          { flat: 'Armor', pct: ['% Armor', '% Total Armor'] },
          { flat: 'Resistance to All Elements', pct: ['% Resistance to All Elements'] }
      ];

        additiveScalers.forEach(scaler => {
            if (!stats[scaler.flat]) {
                stats[scaler.flat] = { total: 0, final: 0, flatSources: [], pctSources: [] };
            }
            
            let totalPct = 0;
            scaler.pct.forEach(pctKey => {
                if (stats[pctKey]) {
                    totalPct += stats[pctKey].total;
                    stats[pctKey].flatSources.forEach(src => {
                        stats[scaler.flat].pctSources.push({ name: src.name, val: src.val });
                    });
                    delete stats[pctKey]; // Remove so it doesn't double-display
                }
            });
            
            if (totalPct !== 0) {
                stats[scaler.flat].final = stats[scaler.flat].total * (1 + (totalPct / 100));
            }
        });
        
        // Derive stats from Core Stats
        const selectedClass = document.getElementById('class-select')?.textContent || 'Barbarian';
        const cls = selectedClass;
        const strVal = stats['Strength'] ? stats['Strength'].final : 0;
        const intVal = stats['Intelligence'] ? stats['Intelligence'].final : 0;
        const willVal = stats['Willpower'] ? stats['Willpower'].final : 0;
        const dexVal = stats['Dexterity'] ? stats['Dexterity'].final : 0;
        
        if (strVal > 0) addStat(stats, 'Armor', strVal * 2, 'From Strength');
        if (intVal > 0) addStat(stats, 'Resistance to All Elements', intVal * 0.4, 'From Intelligence');
        if (willVal > 0) {
            addStat(stats, 'Healing Received', willVal * 0.035, 'From Willpower');
        }
        if (dexVal > 0) addStat(stats, 'Dodge Chance', dexVal * 0.006, 'From Dexterity');
        
        // Class-specific derived stats
        let skillDamageStat = '';
        let skillDamageFactor = 0;
        let critStat = '';
        let resGenStat = '';

        if (cls === 'Barbarian') { skillDamageStat = 'Strength'; skillDamageFactor = 0.11; critStat = 'Dexterity'; resGenStat = 'Willpower'; }
        else if (cls === 'Paladin') { skillDamageStat = 'Strength'; skillDamageFactor = 0.125; critStat = 'Intelligence'; resGenStat = 'Willpower'; }
        else if (cls === 'Druid') { skillDamageStat = 'Willpower'; skillDamageFactor = 0.125; critStat = 'Dexterity'; resGenStat = 'Intelligence'; }
        else if (cls === 'Rogue') { skillDamageStat = 'Dexterity'; skillDamageFactor = 0.11; critStat = 'Intelligence'; resGenStat = 'Strength'; }
        else if (cls === 'Sorcerer' || cls === 'Necromancer') { skillDamageStat = 'Intelligence'; skillDamageFactor = 0.125; critStat = 'Dexterity'; resGenStat = 'Willpower'; }
        else if (cls === 'Spiritborn') { skillDamageStat = 'Dexterity'; skillDamageFactor = 0.125; critStat = 'Strength'; resGenStat = 'Intelligence'; }
        
        const coreVals = { 'Strength': strVal, 'Intelligence': intVal, 'Willpower': willVal, 'Dexterity': dexVal };
        if (skillDamageStat && coreVals[skillDamageStat] > 0) addStat(stats, 'Skill Damage', coreVals[skillDamageStat] * skillDamageFactor, `From ${skillDamageStat}`);
        if (critStat && coreVals[critStat] > 0) addStat(stats, 'Critical Strike Chance', coreVals[critStat] * 0.02, `From ${critStat}`);
        if (resGenStat && coreVals[resGenStat] > 0) addStat(stats, 'Resource Generation', coreVals[resGenStat] * 0.03, `From ${resGenStat}`);


        // --- Defensive Stats ---
        const finalArmor = stats['Armor'] ? stats['Armor'].final : 0;
        let armorDr = 0;
        if (finalArmor > 0) {
            armorDr = finalArmor / ((finalArmor * 10 / 9) + 5678);
        }
        addStat(stats, 'Physical DR% (Armor)', armorDr * 100, 'Calculated');
        
        const finalAllResist = stats['Resistance to All Elements'] ? stats['Resistance to All Elements'].final : 0;
        
        const specificResists = ['Physical Resistance', 'Fire Resistance', 'Lightning Resistance', 'Cold Resistance', 'Poison Resistance', 'Shadow Resistance'];
        specificResists.forEach(res => {
            let resTotal = (stats[res] ? stats[res].total : 0) + (stats['Resistance to All Elements'] ? stats['Resistance to All Elements'].final : 0);
            let finalResist = resTotal; // Assuming no multiplicative all resist for now, or it comes from equipment
            
            if (!stats[res]) stats[res] = { total: 0, final: 0, flatSources: [], pctSources: [] };
            stats[res].final = finalResist;
            
            if (stats['Resistance to All Elements']) {
                stats[res].flatSources.push({ name: 'From All Resistance', val: stats['Resistance to All Elements'].final });
                stats[res].total += stats['Resistance to All Elements'].final;
            }
            
            let resistDr = 0;
            if (finalResist > 0) {
                resistDr = finalResist / ((finalResist * 10 / 9) + 1136);
            }
            addStat(stats, res.split(' ')[0] + ' DR%', resistDr * 100, 'Calculated');
        });
        
        // Apply standalone Universal DR modifiers
        if (stats['Aspect of Hardened Bones']) {
            addStat(stats, 'Universal Damage Reduction %', stats['Aspect of Hardened Bones'].total, 'Aspect of Hardened Bones');
        }
        
        if (typeof window.getCompiledParagonThresholdStats === 'function') { window.getCompiledParagonThresholdStats(stats, addStat); }

        // Post-Compilation Step: Inverse Multiplicative Stats (Dodge Chance, Damage Reduction, etc.)
        // This must run at the very end so that Core Stats (like Dexterity) are included in the inverse multiplicative pool!
        const inverseMultiplicativeKeys = Object.keys(stats).filter(k => k.includes('Dodge Chance') || k.includes('Damage Reduction'));
        inverseMultiplicativeKeys.forEach(k => {
            if (stats[k].flatSources && stats[k].flatSources.length > 1) {
                let inverseProduct = 1.0;
                stats[k].flatSources.forEach(src => {
                    inverseProduct *= (1 - (src.val / 100));
                });
                stats[k].final = (1 - inverseProduct) * 100;
            }
        });

        return stats;
    }
  
  function getStatEffects(statName, finalVal) {
      const selectedClass = document.getElementById('class-select')?.textContent || 'Barbarian';
      let effects = [];
      const v = Math.floor(finalVal);
      
      // Global effects
      if (statName === 'Armor') effects.push(`Reduces Physical damage taken. Max reduction approaches 90%.`);
      if (statName === 'Maximum Life') effects.push(`Increases the amount of damage you can take before dying.`);
      if (statName.includes('Resistance')) effects.push(`Reduces non-Physical damage taken. Max reduction approaches 90%.`);
      
      // Core Stat Global effects
      if (statName === 'Strength') effects.push(`Increases Armor by +${v * 2}`);
      if (statName === 'Intelligence') effects.push(`Increases Resistance to All Elements by +${(v * 0.4).toFixed(1)}`);
      if (statName === 'Willpower') {
          effects.push(`Increases Healing Received by +${(v * 0.035).toFixed(2)}%`);
      }
      if (statName === 'Dexterity') effects.push(`Increases Dodge Chance by +${(v * 0.006).toFixed(3)}%`);

      // Class specific scaling
      const cls = selectedClass;
      if (statName === 'Strength') {
          if (cls === 'Barbarian' || cls === 'Paladin') effects.push(`Increases Skill Damage by +${(v * 0.11).toFixed(1)}%`);
          else if (cls === 'Rogue') effects.push(`Increases Resource Generation by +${(v * 0.03).toFixed(2)}%`);
          else if (cls === 'Spiritborn') effects.push(`Increases Critical Strike Chance by +${(v * 0.02).toFixed(2)}%`);
      }
      if (statName === 'Intelligence') {
          if (cls === 'Sorcerer' || cls === 'Necromancer') effects.push(`Increases Skill Damage by +${(v * 0.125).toFixed(1)}%`);
          else if (cls === 'Druid' || cls === 'Spiritborn') effects.push(`Increases Resource Generation by +${(v * 0.03).toFixed(2)}%`);
          else if (cls === 'Paladin' || cls === 'Rogue') effects.push(`Increases Critical Strike Chance by +${(v * 0.02).toFixed(2)}%`);
      }
      if (statName === 'Willpower') {
          if (cls === 'Druid') effects.push(`Increases Skill Damage by +${(v * 0.125).toFixed(1)}%`);
          else if (cls === 'Barbarian' || cls === 'Paladin' || cls === 'Sorcerer' || cls === 'Necromancer' || cls === 'Rogue') effects.push(`Increases Resource Generation by +${(v * 0.03).toFixed(2)}%`);
      }
      if (statName === 'Dexterity') {
          if (cls === 'Rogue' || cls === 'Spiritborn') effects.push(`Increases Skill Damage by +${(v * 0.11).toFixed(1)}%`); // Note Rogue is 0.11% in user prompt, wait I will fix rogue to 0.11
          else if (cls === 'Barbarian' || cls === 'Druid' || cls === 'Sorcerer' || cls === 'Necromancer') effects.push(`Increases Critical Strike Chance by +${(v * 0.02).toFixed(2)}%`);
      }

      // Rogue exception for dex
      if (cls === 'Rogue' && statName === 'Dexterity') {
          effects.pop(); // remove the 0.125%
          effects.push(`Increases Skill Damage by +${(v * 0.11).toFixed(1)}%`);
      }

      return effects;
  }

  function renderCharacterSheet(stats) {
      const container = document.getElementById('character-sheet-content');
      if (!container) return;
      
      if (Object.keys(stats).length === 0) {
          container.innerHTML = '<div style="color: #777; font-style: italic;">No equipment detected.</div>';
          return;
      }
      
      const categories = {
          'Core Stats': ['Strength', 'Intelligence', 'Willpower', 'Dexterity', 'All Stats'],
          'Offensive': ['Damage', 'Critical', 'Vulnerable', 'Attack Speed', 'Overpower'],
          'Defensive': ['Life', 'Armor', 'Resistance', 'Reduction', 'Dodge', 'Block'],
          'Utility': ['Movement', 'Cooldown', 'Resource', 'Essence', 'Healing', 'Lucky Hit', 'Barrier']
      };
      
      const grouped = {
          'Core Stats': [],
          'Offensive': [],
          'Defensive': [],
          'Utility': [],
          'Other': []
      };
      
      Object.keys(stats).forEach(statName => {
          // Skip stats that are exclusively displayed in the Toughness Dashboard
          if (statName.includes('DR%') || statName.includes('Universal Damage Reduction %')) return;
          
          let matched = false;
          for (const [cat, keywords] of Object.entries(categories)) {
              // Exact match or contains (avoid 'Damage Reduction' matching 'Damage')
              if (keywords.some(kw => statName.toLowerCase().includes(kw.toLowerCase()))) {
                  if (cat === 'Offensive' && statName.toLowerCase().includes('damage reduction')) continue;

                  grouped[cat].push({ name: statName, val: stats[statName] });
                  matched = true;
                  break;
              }
          }
          if (!matched) grouped['Other'].push({ name: statName, val: stats[statName] });
      });
      
      let html = '';
      for (const [cat, items] of Object.entries(grouped)) {
          if (items.length === 0) continue;
          
          items.sort((a, b) => {
              const valA = typeof a.val === 'object' ? (a.val.final || 0) : a.val;
              const valB = typeof b.val === 'object' ? (b.val.final || 0) : b.val;
              return valB - valA;
          }); // sort by value descending
          
          html += `
          <div style="background: rgba(0,0,0,0.4); border: 1px solid #333; border-radius: 4px; padding: 12px;">
              <h4 style="margin: 0 0 8px 0; color: #d18a45; border-bottom: 1px solid #444; padding-bottom: 4px;">${cat}</h4>
              <div style="display: flex; flex-direction: column; gap: 4px;">
          `;
          
          items.forEach(item => {
              let valObj = item.val;
              let finalVal = typeof valObj === 'object' ? (valObj.final || 0) : valObj;
              let totalVal = typeof valObj === 'object' ? (valObj.total || 0) : valObj;
              let valStr = finalVal.toFixed(1).replace(/\.0$/, '');
              let nameStr = item.name;
              
              if (nameStr.startsWith('%')) {
                  nameStr = nameStr.substring(1).trim();
                  valStr += '%';
              } else if (nameStr.includes('%')) {
                  // already has % inside
              } else if (valStr !== '0' && !['Strength', 'Intelligence', 'Willpower', 'Dexterity', 'Armor', 'Maximum Life'].includes(nameStr)) {
                  valStr = '+' + valStr;
              }
              
              // Tooltip Generation
              let tooltipHTML = '';
              const effects = getStatEffects(nameStr, finalVal);
              
              let itemContrib = 0;
              if (typeof valObj === 'object' && valObj.flatSources) {
                  valObj.flatSources.forEach(s => {
                      if (s.name !== 'Base' && s.name !== 'Level' && s.name !== 'Paragon' && s.name !== 'Base & Level') {
                          itemContrib += s.val;
                      }
                  });
              }

              tooltipHTML += `
                  <div class="stat-tooltip">
                      <div class="stat-tooltip-header">
                          <span style="color: #d18a45;">${nameStr}:</span> 
                          <span style="color: #ffca4a;">${finalVal.toFixed(0)}</span>
                          ${itemContrib > 0 ? `<span style="color: #888;"> (Item Contribution: ${itemContrib.toFixed(0)})</span>` : ''}
                      </div>
                      ${effects.map(e => `<div class="stat-tooltip-effect">⬥ ${e}</div>`).join('')}
                      ${effects.length > 0 ? '<hr class="stat-tooltip-divider">' : ''}
              `;

              // Sum breakdown
              if (typeof valObj === 'object' && valObj.flatSources && valObj.flatSources.length > 0) {
                  const addSources = valObj.flatSources.filter(s => !s.isMultiplier);
                  const multSources = valObj.flatSources.filter(s => s.isMultiplier);
                  
                  if (addSources.length > 0) {
                      tooltipHTML += `
                          <div class="stat-tooltip-section-title">⬥ Sum: <span style="color: #4cd137;">${totalVal.toFixed(0)}</span></div>
                      `;
                      addSources.forEach(src => {
                          let color = '#ccc';
                          if (src.name === 'Base' || src.name === 'Level') color = '#888';
                          else if (src.name === 'Paragon') color = '#fbc531';
                          else color = '#3498db'; // blue for equipment

                          tooltipHTML += `
                              <div class="stat-tooltip-source">
                                  <span style="color: ${color};">⬥ ${src.name}:</span> ${src.val.toFixed(0)}
                              </div>
                          `;
                      });
                  }
                  
                  if (multSources.length > 0) {
                      tooltipHTML += `
                          <div class="stat-tooltip-section-title" style="margin-top: 6px;">⬥ Multipliers:</div>
                      `;
                      multSources.forEach(src => {
                          tooltipHTML += `
                              <div class="stat-tooltip-source">
                                  <span style="color: #e74c3c;">⬥ ${src.name}:</span> <span style="color: #e74c3c;">x${src.val.toFixed(2)}</span>
                              </div>
                          `;
                      });
                  }
              }

              // Increased breakdown
              if (typeof valObj === 'object' && valObj.pctSources && valObj.pctSources.length > 0) {
                  let totalPct = valObj.pctSources.reduce((sum, s) => sum + s.val, 0);
                  tooltipHTML += `
                      <div class="stat-tooltip-section-title" style="margin-top: 6px;">⬥ Increased: <span style="color: #4cd137;">+${totalPct.toFixed(1)}%</span></div>
                  `;
                  valObj.pctSources.forEach(src => {
                      tooltipHTML += `
                          <div class="stat-tooltip-source">
                              <span style="color: #3498db;">⬥ ${src.name}:</span> <span style="color: #4cd137;">${src.val.toFixed(1)}%</span>
                          </div>
                      `;
                  });
              }

              tooltipHTML += '</div>';

              html += `
                  <div class="stat-row-hoverable" style="display: flex; justify-content: space-between; position: relative; cursor: help;">
                      <span style="color: #ccc;">${nameStr}</span>
                      <span style="color: #fff; font-weight: bold;">${valStr}</span>
                      ${tooltipHTML}
                  </div>
              `;
          });
          
          html += `
              </div>
          </div>
          `;
      }
      
      container.innerHTML = html;
  }

  function updateDynamicSkillTags() {
      let warrior = null;
      let mage = null;
      let golem = null;
      if (typeof skillsDatabase !== 'undefined') {
          for (let cat in skillsDatabase) {
              if (!warrior) warrior = skillsDatabase[cat].find(s => s.name === "Skeleton Warrior");
              if (!mage) mage = skillsDatabase[cat].find(s => s.name === "Skeleton Mage");
              if (!golem) golem = skillsDatabase[cat].find(s => s.name === "Golem");
          }
      }

      const elementalTags = ["Search_Bone", "Search_Blood", "Search_Darkness", "Search_Physical", "Search_Shadow", "Search_Cold", "Damage_Override_Physical", "Damage_Override_Shadow", "Damage_Override_Cold", "Skill_Bone", "Skill_Blood", "Skill_Shadow", "Skill_Cold"];

      if (warrior && currentBuild && currentBuild.bookOfTheDead) {
          let spec = currentBuild.bookOfTheDead.warriors.spec;
          let node = currentBuild.bookOfTheDead.warriors.node;
          
          warrior.tags = warrior.tags.filter(t => !elementalTags.includes(t));
          warrior.damageType = "Physical"; 
          
          if (node !== null) {
              if (spec === "Skirmisher") {
                  warrior.damageType = "Physical";
                  warrior.tags.push("Search_Physical", "Search_Bone", "Damage_Override_Physical", "Skill_Bone");
              } else if (spec === "Defender") {
                  warrior.damageType = "Physical";
                  warrior.tags.push("Search_Physical", "Search_Blood", "Damage_Override_Physical", "Skill_Blood");
              } else if (spec === "Reaper") {
                  warrior.damageType = "Shadow";
                  warrior.tags.push("Search_Shadow", "Search_Darkness", "Damage_Override_Shadow", "Skill_Shadow");
              }
          }
      }
      
      if (mage && currentBuild && currentBuild.bookOfTheDead) {
          let spec = currentBuild.bookOfTheDead.mages.spec;
          let node = currentBuild.bookOfTheDead.mages.node;
          
          mage.tags = mage.tags.filter(t => !elementalTags.includes(t));
          mage.damageType = "Physical";
          
          if (node !== null) {
              if (spec === "Shadow") {
                  mage.damageType = "Shadow";
                  mage.tags.push("Search_Shadow", "Search_Darkness", "Damage_Override_Shadow", "Skill_Shadow");
              } else if (spec === "Cold") {
                  mage.damageType = "Cold";
                  mage.tags.push("Search_Cold", "Damage_Override_Cold", "Skill_Cold");
              } else if (spec === "Bone") {
                  mage.damageType = "Physical";
                  mage.tags.push("Search_Physical", "Search_Bone", "Damage_Override_Physical", "Skill_Bone");
              }
          }
      }
      
      if (golem && currentBuild && currentBuild.bookOfTheDead) {
          let spec = currentBuild.bookOfTheDead.golems.spec;
          let node = currentBuild.bookOfTheDead.golems.node;
          
          golem.tags = golem.tags.filter(t => !elementalTags.includes(t));
          golem.damageType = "Physical";
          
          if (node !== null) {
              if (spec === "Bone Golem") {
                  golem.damageType = "Physical";
                  golem.tags.push("Search_Physical", "Search_Bone", "Damage_Override_Physical", "Skill_Bone");
              } else if (spec === "Blood Golem") {
                  golem.damageType = "Physical";
                  golem.tags.push("Search_Physical", "Search_Blood", "Damage_Override_Physical", "Skill_Blood");
              } else if (spec === "Iron Golem") {
                  golem.damageType = "Shadow";
                  golem.tags.push("Search_Shadow", "Search_Darkness", "Damage_Override_Shadow", "Skill_Shadow");
              }
          }
      }
  }

  function calculate() {
        if (isLoading) return;
    updateDynamicSkillTags();
    try {
      // Auto-calculate base weapon damage and armor from equipped items
      const baseEquipped = getEquipmentValues();
      let totalArmor = 0;
      let totalWeaponDmg = 0;
      let totalWeaponAps = 0;
      let totalAllRes = 0;
  
      if (baseEquipped) {
        let mainhandDmg = 0; let mainhandMin = 0; let mainhandMax = 0;
        let offhandDmg = 0; let offhandMin = 0; let offhandMax = 0;
        let hasShield = false;
  
        Object.keys(baseEquipped).forEach(slotName => {
          const item = baseEquipped[slotName];
          if (!item || !item.name) return;
          const sName = slotName.toLowerCase();
          const baseItem = (window.D4_DATABASE.itemDatabase[slotName] || []).find(i => i.name === item.name) || {};
          
          const effQ = getEffectiveQuality(item);
          const qMult = 1 + (effQ * 0.01);
            
          if (baseItem.armor) totalArmor += (baseItem.armor * qMult);
          if (baseItem.resistance) totalAllRes += (baseItem.resistance * qMult);
          
          if (sName === 'mainhand' && baseItem.damageRange) {
              const match = baseItem.damageRange.match(/([\d,]+)\s*-\s*([\d,]+)/);
              if (match) {
                  const min = parseFloat(match[1].replace(/,/g, ''));
                  const max = parseFloat(match[2].replace(/,/g, ''));
                  mainhandDmg = ((min + max) / 2) * qMult;
                  mainhandMin = min * qMult;
                  mainhandMax = max * qMult;
              }
              if (baseItem.weaponSpeed && typeof baseItem.weaponSpeed === 'number') {
                  totalWeaponAps = baseItem.weaponSpeed;
              }
          }
  
          if (sName === 'offhand') {
              if (baseItem.weaponType === 'Shield') {
                  hasShield = true;
              } else if (baseItem.damageRange) {
                  const match = baseItem.damageRange.match(/([\d,]+)\s*-\s*([\d,]+)/);
                  if (match) {
                      const min = parseFloat(match[1].replace(/,/g, ''));
                      const max = parseFloat(match[2].replace(/,/g, ''));
                      offhandDmg = ((min + max) / 2) * qMult;
                      offhandMin = min * qMult;
                      offhandMax = max * qMult;
                  }
              }
          }
        });
  
        if (hasShield) {
            totalWeaponDmg = mainhandDmg * 2;
            window.weaponMinDmg = mainhandMin * 2;
            window.weaponMaxDmg = mainhandMax * 2;
        } else {
            totalWeaponDmg = mainhandDmg + offhandDmg;
            window.weaponMinDmg = mainhandMin + offhandMin;
            window.weaponMaxDmg = mainhandMax + offhandMax;
        }
      }
    
    // (Weapon Damage UI update moved below compileCharacterStats)
    
    if (totalWeaponAps > 0) {
      if (dom.weaponSpeed) {
        dom.weaponSpeed.value = totalWeaponAps;
        dom.weaponSpeed.disabled = true;
        dom.weaponSpeed.title = "Auto-calculated from equipped weapon";
      }
    } else {
      if (dom.weaponSpeed) {
        dom.weaponSpeed.disabled = false;
        dom.weaponSpeed.title = "";
      }
    }
    
    if (totalArmor > 0) {
      if (dom.armor) {
        dom.armor.value = totalArmor;
        dom.armor.disabled = true;
        dom.armor.title = "Auto-calculated from equipped armor";
      }
    } else {
      if (dom.armor) {
        dom.armor.disabled = false;
        dom.armor.title = "";
      }
    }

    const resFields = [dom.fireRes, dom.lightningRes, dom.coldRes, dom.poisonRes, dom.shadowRes];
    if (totalAllRes > 0) {
      resFields.forEach(el => {
          if (el) {
              el.value = totalAllRes;
              el.disabled = true;
              el.title = "Auto-calculated from equipped jewelry";
          }
      });
    } else {
      resFields.forEach(el => {
          if (el) {
              el.disabled = false;
              el.title = "";
          }
      });
    }

    // Auto-calculate base stats from class and level
    const currentClassName = dom.classSelect ? dom.classSelect.textContent : 'Necromancer';
    currentBuild.dexterity = parseFloat(dom.dexterity.value) || 0;
    currentBuild.aps = parseFloat(dom.aps.value) || 1;
    currentBuild.weaponSpeed = parseFloat(dom.weaponSpeed.value) || 1;
    currentBuild.weaponSpeed = parseFloat(dom.weaponSpeed.value) || 1;
    if (dom.castSpeed) currentBuild.castSpeed = parseFloat(dom.castSpeed.value) || 0;
    if (dom.level) currentBuild.level = parseInt(dom.level.value) || 70;
    const level = dom.level ? parseInt(dom.level.value) || 70 : 70;
    const classBaseStats = {
        Barbarian: { str: 10, dex: 8, int: 7, will: 7 },
        Paladin: { str: 10, dex: 8, int: 7, will: 7 },
        Druid: { will: 10, int: 8, str: 7, dex: 7 },
        Rogue: { dex: 10, will: 8, str: 7, int: 7 },
        Sorcerer: { int: 10, will: 8, str: 7, dex: 7 },
        Necromancer: { int: 10, will: 8, str: 7, dex: 7 },
        Spiritborn: { dex: 10, int: 8, str: 7, will: 7 }
    };
    const baseStats = classBaseStats[currentClassName] || { str: 7, int: 7, will: 7, dex: 7 };
    const levelBonus = Math.max(0, level - 1);
    
    const autoStats = {
        strength: baseStats.str + levelBonus,
        intelligence: baseStats.int + levelBonus,
        willpower: baseStats.will + levelBonus,
        dexterity: baseStats.dex + levelBonus,
        baseStr: baseStats.str, levelStr: levelBonus,
        baseInt: baseStats.int, levelInt: levelBonus,
        baseWill: baseStats.will, levelWill: levelBonus,
        baseDex: baseStats.dex, levelDex: levelBonus,
        maximumLife: dom.maxLife ? parseFloat(dom.maxLife.value) || 1526 : 1526,
        maximumResource: 100
    };
    
    const compiledStats = compileCharacterStats(baseEquipped, autoStats);
    window.D4_COMPILED_STATS = compiledStats;
    
    // Add flat "Weapon Damage" from modifiers
    if (compiledStats['Weapon Damage']) {
        totalWeaponDmg += compiledStats['Weapon Damage'].final;
        if (typeof window.weaponMinDmg !== 'undefined') window.weaponMinDmg += compiledStats['Weapon Damage'].final;
        if (typeof window.weaponMaxDmg !== 'undefined') window.weaponMaxDmg += compiledStats['Weapon Damage'].final;
    }
    
    // Update UI and lock inputs if gear is equipped
    if (totalWeaponDmg > 0) {
      if (dom.weaponDamage) {
        dom.weaponDamage.value = totalWeaponDmg;
        dom.weaponDamage.disabled = true;
        dom.weaponDamage.title = "Auto-calculated from equipped weapon (Base + Modifiers)";
      }
    } else {
      if (dom.weaponDamage) {
        dom.weaponDamage.disabled = false;
        dom.weaponDamage.title = "";
      }
    }
    
    if (dom.strength) {
        dom.strength.value = compiledStats['Strength'] ? Math.floor(compiledStats['Strength'].final) : 0;
        dom.strength.disabled = true;
        dom.strength.title = "Auto-calculated from equipment and level";
    }
    if (dom.intelligence) {
        dom.intelligence.value = compiledStats['Intelligence'] ? Math.floor(compiledStats['Intelligence'].final) : 0;
        dom.intelligence.disabled = true;
        dom.intelligence.title = "Auto-calculated from equipment and level";
    }
    if (dom.willpower) {
        dom.willpower.value = compiledStats['Willpower'] ? Math.floor(compiledStats['Willpower'].final) : 0;
        dom.willpower.disabled = true;
        dom.willpower.title = "Auto-calculated from equipment and level";
    }
    if (dom.dexterity) {
        dom.dexterity.value = compiledStats['Dexterity'] ? Math.floor(compiledStats['Dexterity'].final) : 0;
        dom.dexterity.disabled = true;
        dom.dexterity.title = "Auto-calculated from equipment and level";
    }

    if (dom.critChance) {
        dom.critChance.value = (compiledStats['Critical Strike Chance'] ? compiledStats['Critical Strike Chance'].final : 0).toFixed(2);
        dom.critChance.disabled = true;
        dom.critChance.title = "Auto-calculated from equipment and stats";
    }
    if (dom.luckyHitChance) {
        const lhcKey = Object.keys(compiledStats).find(k => k.toLowerCase().includes('lucky hit chance'));
        dom.luckyHitChance.value = lhcKey ? compiledStats[lhcKey].final : 0;
        dom.luckyHitChance.disabled = true;
        dom.luckyHitChance.title = "Auto-calculated from equipment";
    }
    if (dom.attackSpeed) {
        const asKey = Object.keys(compiledStats).find(k => k.toLowerCase().includes('attack speed'));
        dom.attackSpeed.value = asKey ? compiledStats[asKey].final : 0;
        dom.attackSpeed.disabled = true;
        dom.attackSpeed.title = "Auto-calculated from equipment";
    }
    if (dom.castSpeed) {
        dom.castSpeed.value = compiledStats['Cast Speed'] ? compiledStats['Cast Speed'].final : 0;
        dom.castSpeed.disabled = true;
        dom.castSpeed.title = "Auto-calculated from equipment";
    }

    if (dom.critChance) currentBuild.critChance = parseFloat(dom.critChance.value) || 0;
    if (dom.luckyHitChance) currentBuild.luckyHitChance = parseFloat(dom.luckyHitChance.value) || 0;
    if (dom.attackSpeed) currentBuild.attackSpeed = parseFloat(dom.attackSpeed.value) || 0;
    if (dom.castSpeed) currentBuild.castSpeed = parseFloat(dom.castSpeed.value) || 0;

    const weaponDmg = parseFloat(dom.weaponDamage.value) || 0;
    const skillPct  = parseFloat(dom.skillDamage.value) || 0;
    const str       = parseFloat(dom.strength.value) || 0;
    const intel     = parseFloat(dom.intelligence.value) || 0;
    const will      = parseFloat(dom.willpower.value) || 0;
    const dex       = parseFloat(dom.dexterity.value) || 0;
    const aps       = parseFloat(dom.aps.value) || 1;
    const crit      = (dom.critChance ? parseFloat(dom.critChance.value) : 0) / 100;
    const atkSpd    = (dom.attackSpeed ? parseFloat(dom.attackSpeed.value) : 0) / 100;
    const castSpd   = (dom.castSpeed ? parseFloat(dom.castSpeed.value) : 0) / 100;

    // Base Damage = Skill% × Weapon Damage
    // Skill damage is a percentage, so: (skillPct / 100) × weaponDmg
    const baseDamage = (skillPct / 100) * weaponDmg;

    // Get Class main stat multiplier
    const selectedClass = dom.classSelect ? dom.classSelect.textContent : 'Barbarian';
    
    let mainStatValue = 0;
    let mainStatFactor = 0;
    let mainStatName = 'Strength';
    let critStatValue = 0;
    const cls = selectedClass;
    
    if (cls === 'Barbarian') { mainStatName = 'Strength'; mainStatValue = str; mainStatFactor = 0.0011; }
    else if (cls === 'Paladin') { mainStatName = 'Strength'; mainStatValue = str; mainStatFactor = 0.00125; }
    else if (cls === 'Druid') { mainStatName = 'Willpower'; mainStatValue = will; mainStatFactor = 0.00125; }
    else if (cls === 'Rogue') { mainStatName = 'Dexterity'; mainStatValue = dex; mainStatFactor = 0.0011; }
    else if (cls === 'Sorcerer' || cls === 'Necromancer') { mainStatName = 'Intelligence'; mainStatValue = intel; mainStatFactor = 0.00125; }
    else if (cls === 'Spiritborn') { mainStatName = 'Dexterity'; mainStatValue = dex; mainStatFactor = 0.00125; }
    
    const mainStatMultiplier = 1 + (mainStatValue * mainStatFactor);

    // Highlight main stat input group
    const inputGroups = {
      Strength: dom.strength ? dom.strength.closest('.input-group') : null,
      Intelligence: dom.intelligence ? dom.intelligence.closest('.input-group') : null,
      Willpower: dom.willpower ? dom.willpower.closest('.input-group') : null,
      Dexterity: dom.dexterity ? dom.dexterity.closest('.input-group') : null
    };

    Object.keys(inputGroups).forEach(stat => {
      const group = inputGroups[stat];
      if (group) {
        if (stat === mainStatName) {
          group.classList.add('main-stat-active');
        } else {
          group.classList.remove('main-stat-active');
        }
      }
    });

    // Inject additive & multiplicative bonuses from compiledStats
    dom.additiveBody.querySelectorAll('tr.injected-row').forEach(row => row.remove());
    dom.multBody.querySelectorAll('tr.injected-row').forEach(row => row.remove());
    
    let lowerTags = [];
    if (dom.mainSkillSelect && typeof skillsDatabase !== 'undefined') {
        const mainSkillName = dom.mainSkillSelect.value;
        let mainSkill = null;
        if (mainSkillName) {
            for (const cat in skillsDatabase) {
                const found = skillsDatabase[cat].find(s => s.name === mainSkillName);
                if (found) { 
                    mainSkill = typeof applyActiveModifiers === 'function' ? applyActiveModifiers(found) : found; 
                    break; 
                }
            }
        }
        if (mainSkill && mainSkill.tags) {
            lowerTags = mainSkill.tags.map(t => t.toLowerCase());
        }
    }

    Object.keys(compiledStats).forEach(statName => {
      const val = compiledStats[statName].final;
      if (!val || val <= 0) return;
      
      let isMultiplicativeAspect = false;
      const aspectObj = (window.D4_DATABASE?.aspects || []).find(a => a.name === statName) 
                     || (window.D4_DATABASE?.uniques || []).find(u => u.name === statName);
      if (aspectObj && aspectObj.desc) {
          const descLower = aspectObj.desc.toLowerCase();
          if (descLower.includes('[x]') && descLower.includes('damage')) {
              isMultiplicativeAspect = true;
          }
      }
      
      if (isMultiplicativeAspect || statName.toLowerCase().includes('[x]')) {
          createMultiplicativeRow(statName, val.toFixed(2), true);
          return;
      }

      const lower = statName.toLowerCase();
      if (!lower.includes('damage') || lower.includes('reduction') || lower.includes('taken') || lower.includes('weapon damage') || statName === 'Skill Damage') return;
      
      let matches = false;
      if (lowerTags.includes('search_bone') && lower.includes('bone damage')) matches = true;
      if (lowerTags.includes('search_shadow') && lower.includes('shadow damage')) matches = true;
      if (lowerTags.includes('search_shadowdot') && lower.includes('shadow damage over time')) matches = true;
      if (lowerTags.includes('search_cold') && lower.includes('cold damage')) matches = true;
      if (lowerTags.includes('search_physical') && lower.includes('physical damage')) matches = true;
      if (lowerTags.includes('search_damageovertime') && lower.includes('damage over time')) matches = true;
      
      // Highly conditionals always on for now
      if (lower.includes('damage vs') || lower.includes('damage to') || lower.includes('damage while') || lower.includes('damage for') || lower.includes('critical') || lower.includes('vulnerable') || lower.includes('overpower') || statName === 'Damage' || lower.includes('core skill damage') || lower.includes('basic skill damage') || lower.includes('macabre skill damage')) {
          matches = true;
      }
      
      if (matches || lowerTags.length === 0) {
          createAdditiveRow(statName, val.toFixed(2), true);
      }
    });
      
      // Inject Dynamic Legendary Node Powers
      if (typeof window.getActiveLegendaryPowers === 'function') {
          const legPowers = window.getActiveLegendaryPowers();
          
          // Cult Leader (Necromancer)
          if (legPowers.includes('Paragon_Necro_Legendary_001')) {
              const asKey = Object.keys(compiledStats).find(k => k.toLowerCase().includes('attack speed'));
              const attackSpeed = asKey ? compiledStats[asKey].final : 0;
              
              if (attackSpeed >= 20) {
                  // Cult Leader: 40%x damage per 20% attack speed breakpoint
                  const cultBonus = Math.floor(attackSpeed / 20) * 40;
                  if (cultBonus > 0) {
                      createMultiplicativeRow('Cult Leader (Legendary Node)', cultBonus.toFixed(2), true);
                  }
              }
          }
          
          // Bone Graft (Necromancer)
          if (legPowers.includes('Paragon_Necro_Legendary_017')) {
              let isBone = false;
              if (dom.mainSkillSelect && typeof skillsDatabase !== 'undefined') {
                  const mainSkillName = dom.mainSkillSelect.value;
                  for (const cat in skillsDatabase) {
                      const found = skillsDatabase[cat].find(s => s.name === mainSkillName);
                      if (found && found.tags) {
                          const lower = found.tags.map(t => t.toLowerCase());
                          if (lower.includes('search_bone') || lower.includes('skill_bone')) {
                              isBone = true;
                          }
                      }
                  }
              }
              if (isBone) {
                  createMultiplicativeRow('Bone Graft (Legendary Node)', '60.00', true);
              }
          }
          
          // Flesh-eater (Necromancer)
          if (legPowers.includes('Paragon_Necro_Legendary_008')) {
              createMultiplicativeRow('Flesh-eater (Legendary Node)', '60.00', true);
          }
          
          // Scent of Death (Necromancer)
          if (legPowers.includes('Paragon_Necro_Legendary_007')) {
              createMultiplicativeRow('Scent of Death (Legendary Node)', '45.00', true);
          }
          
          // Wither (Necromancer)
          if (legPowers.includes('Paragon_Necro_Legendary_016')) {
              createMultiplicativeRow('Wither (Legendary Node)', '60.00', true);
          }
          
          // Frailty (Necromancer)
          if (legPowers.includes('Paragon_Necro_Legendary_018')) {
              createMultiplicativeRow('Frailty (Legendary Node)', '60.00', true);
          }
          
          // Hulking Monstrosity (Necromancer)
          if (legPowers.includes('Paragon_Necro_Legendary_005')) {
              // Find Sacrificial Aspect effectiveness
              const sacrificialKey = Object.keys(compiledStats).find(k => k.toLowerCase() === 'sacrificial aspect');
              const sacEffectiveness = sacrificialKey ? compiledStats[sacrificialKey].final : 0;
              const sacMultiplier = 1 + (sacEffectiveness / 100);
              
              const sacrificeBase = 0.60 * sacMultiplier;
              const M = 1 + sacrificeBase; // "M" multiplier for one sacrifice
              
              const wNode = currentBuild.bookOfTheDead?.warriors?.node;
              const mNode = currentBuild.bookOfTheDead?.mages?.node;
              
              const isWSacrificed = (wNode === 'sacrifice');
              const isMSacrificed = (mNode === 'sacrifice');
              
              let finalRowValue = 100; // Base 100% if no sacrifices
              
              if (isWSacrificed && isMSacrificed) {
                  // Both Sacrificed: M^2
                  finalRowValue = Math.pow(M, 2) * 100;
              } else if (isWSacrificed || isMSacrificed) {
                  // Only one sacrificed: (1 + M)
                  finalRowValue = (1 + M) * 100;
              }
              
              createMultiplicativeRow('Hulking Monstrosity (Legendary Node)', finalRowValue.toFixed(2), true);
          }
          
          // Blood Begets Blood (Necromancer)
          if (legPowers.includes('Paragon_Necro_Legendary_011')) {
              createMultiplicativeRow('Blood Begets Blood (Legendary Node)', '60.00', true);
          }
          
          // Book of the Dead Multiplicative Sacrifices
          if (currentBuild?.bookOfTheDead) {
              const sacrificialKey = Object.keys(compiledStats).find(k => k.toLowerCase() === 'sacrificial aspect');
              const sacEffectiveness = sacrificialKey ? compiledStats[sacrificialKey].final : 0;
              const sacMultiplier = 1 + (sacEffectiveness / 100);
              
              if (currentBuild.bookOfTheDead.warriors?.node === 'sacrifice' && currentBuild.bookOfTheDead.warriors.spec === 'Reaper') {
                  createMultiplicativeRow('Reaper Sacrifice (Book of the Dead)', (15 * sacMultiplier).toFixed(2), true);
              }
              if (currentBuild.bookOfTheDead.mages?.node === 'sacrifice') {
                  if (currentBuild.bookOfTheDead.mages.spec === 'Cold Mage') {
                      createMultiplicativeRow('Cold Mage Sacrifice [Vulnerable] (Book of the Dead)', (20 * sacMultiplier).toFixed(2), true);
                  } else if (currentBuild.bookOfTheDead.mages.spec === 'Bone Mage') {
                      createMultiplicativeRow('Bone Mage Sacrifice [Overpowered] (Book of the Dead)', (20 * sacMultiplier).toFixed(2), true);
                  }
              }
              if (currentBuild.bookOfTheDead.golems?.node === 'sacrifice' && currentBuild.bookOfTheDead.golems.spec === 'Iron Golem') {
                  createMultiplicativeRow('Iron Golem Sacrifice [Crit Damage] (Book of the Dead)', (15 * sacMultiplier).toFixed(2), true);
              }
          }
          
          // Bloodbath (Necromancer)
          if (legPowers.includes('Paragon_Necro_Legendary_010')) {
              createMultiplicativeRow('Bloodbath (Legendary Node)', '80.00', true);
          }
      }

    // Additive: 1 + sum all (value / 100)
    const additives = getAdditiveValues();
    const additiveRawSum = additives.reduce((sum, a) => sum + (a.value / 100), 0);
    const additiveSum = 1 + additiveRawSum;

    // Multiplicative: product of all (1 + value/100)
    const multiplicatives = getMultiplicativeValues();
    const nodeEls = []; // Replaced by dynamic nodes
    const addBonusVals = getAdditionalBonusValues();
    const legVals = getLegendaryBonusValues();
    
    let staticMults = [];
    const hasInteractiveBoard = currentBuild && currentBuild.paragon && currentBuild.paragon[0] && currentBuild.paragon[0].boardId;
    
    // Hide legacy dropdowns if using new interactive board
    if (dom.nodesContainer && dom.nodesContainer.parentElement) {
        dom.nodesContainer.parentElement.style.display = hasInteractiveBoard ? 'none' : 'block';
    }
    
    if (!hasInteractiveBoard) {
        staticMults = [
          getNodeValue(nodeEls[0], 1),
          getNodeValue(nodeEls[1], 2),
          getNodeValue(nodeEls[2], 3),
          getNodeValue(nodeEls[3], 4),
          addBonusVals[0],
          addBonusVals[1],
          addBonusVals[2],
          addBonusVals[3],
          addBonusVals[4],
          legVals[0], legVals[1], legVals[2], legVals[3], legVals[4]
        ];
    }

    function getNodeValue(el, index) {
      if (!el) return 0;
      if (el.value === 'custom') {
        const customInp = document.getElementById(`node-custom-${index}`);
        return customInp ? parseFloat(customInp.value) || 0 : 0;
      }
      return parseFloat(el.value) || 0;
    }

    let multProduct = 1;
    for (const val of staticMults) {
      if (val !== 0) {
        multProduct *= (1 + (val / 100));
      }
    }
    
    // Aggregate Gem Stats
    let gemMultProduct = 1;
    let gemAdditiveSum = 0;
    const equipment = getEquipmentValues();
    if (equipment) {
      Object.keys(equipment).forEach(slotName => {
        const item = equipment[slotName];
        if (!item || !item.sockets) return;
        
        const sName = slotName.toLowerCase();
        const isWeapon = sName.includes('weapon') || sName === 'mainhand' || sName === 'offhand';
        const isArmor = sName === 'helm' || sName === 'chest armor' || sName === 'pants' || sName === 'boots' || sName === 'gloves';
        const isJewelry = sName === 'amulet' || sName.includes('ring');
        
        item.sockets.forEach(gemName => {
          if (!gemName) return;
          const gemObj = window.D4_DATABASE?.gems?.find(g => g.name === gemName);
          if (!gemObj) return;
          
          let effectStr = '';
          if (isWeapon) effectStr = gemObj.weaponEffect;
          else if (isArmor) effectStr = gemObj.armorEffect;
          else if (isJewelry) effectStr = gemObj.jewelryEffect;
          
          if (effectStr) {
            const matchMult = effectStr.match(/x([\d.]+)%/);
            if (matchMult) {
              gemMultProduct *= (1 + (parseFloat(matchMult[1]) / 100));
            } else {
              const matchAdd = effectStr.match(/\+([\d.]+)%/);
              // Only add if it's a damage additive for the damage calc (e.g. Damage over time, basic damage)
              if (matchAdd && effectStr.toLowerCase().includes('damage')) {
                gemAdditiveSum += (parseFloat(matchAdd[1]) / 100);
              }
            }
          }
        });
      });
    }
    
    // Apply gem bonuses to totals
    const finalAdditiveSum = additiveSum + gemAdditiveSum;
    multProduct *= gemMultProduct;

    const runningDamages = [];
    const damageBeforeMult = baseDamage * mainStatMultiplier * finalAdditiveSum;

    for (let i = 0; i < multiplicatives.length; i++) {
      const formulaValue = 1 + (multiplicatives[i].value / 100);
      multProduct *= formulaValue;
      runningDamages.push(damageBeforeMult * multProduct);
    }

    // Final single-hit damage (after 80% monster DR)
    const rawDamage = baseDamage * mainStatMultiplier * finalAdditiveSum * multProduct;
    const critMultiplier = 1 + crit;
    const speedMultiplier = 1 + atkSpd + castSpd;
    const singleHit = rawDamage * MONSTER_DR * critMultiplier;
    const totalDamage = singleHit * aps * speedMultiplier;

    // Update DOM
    dom.baseDmgDisplay.innerHTML = formatNumber(baseDamage);
    dom.additiveTotal.textContent = formatMultiplier(finalAdditiveSum);
    dom.multTotal.textContent = formatMultiplier(multProduct);

    dom.resultBase.innerHTML = formatNumber(baseDamage);
    if (dom.resultIntelLabel) dom.resultIntelLabel.textContent = `${mainStatName} ×`;
    dom.resultIntel.textContent = formatMultiplier(mainStatMultiplier);
    dom.resultAdditive.textContent = formatMultiplier(finalAdditiveSum);
    dom.resultMult.innerHTML = formatNumber(multProduct);
    dom.resultFinal.innerHTML = formatNumber(singleHit);
    dom.resultTotal.innerHTML = formatNumber(totalDamage);

    // Update running damage column
    updateRunningDamages(runningDamages);

    // Update multiplicative formula values display
    updateMultFormulas(multiplicatives);

    // Update additive formula values display
    updateAdditiveFormulas(additives);

    // Store current values in state
    currentBuild.weaponDamage = weaponDmg;
    currentBuild.skillDamage = skillPct;

    currentBuild.strength = str;
    currentBuild.intelligence = intel;
    currentBuild.willpower = will;
    currentBuild.dexterity = dex;
    currentBuild.aps = aps;
    currentBuild.level = dom.level ? parseFloat(dom.level.value) || 0 : 0;
    currentBuild.toughness = dom.toughness ? parseFloat(dom.toughness.value) || 0 : 0;
    currentBuild.armor = dom.armor ? parseFloat(dom.armor.value) || 0 : 0;
    currentBuild.physRes = dom.physRes ? parseFloat(dom.physRes.value) || 0 : 0;
    currentBuild.fireRes = dom.fireRes ? parseFloat(dom.fireRes.value) || 0 : 0;
    currentBuild.lightningRes = dom.lightningRes ? parseFloat(dom.lightningRes.value) || 0 : 0;
    currentBuild.coldRes = dom.coldRes ? parseFloat(dom.coldRes.value) || 0 : 0;
    currentBuild.poisonRes = dom.poisonRes ? parseFloat(dom.poisonRes.value) || 0 : 0;
    currentBuild.shadowRes = dom.shadowRes ? parseFloat(dom.shadowRes.value) || 0 : 0;
    currentBuild.maxLife = dom.maxLife ? parseFloat(dom.maxLife.value) || 1526 : 1526;
    currentBuild.potionCapacity = dom.potionCapacity ? parseFloat(dom.potionCapacity.value) || 0 : 0;
    currentBuild.healingReceived = dom.healingReceived ? parseFloat(dom.healingReceived.value) || 0 : 0;
    currentBuild.lifePer5s = dom.lifePer5s ? parseFloat(dom.lifePer5s.value) || 0 : 0;
    currentBuild.summonArmor = dom.summonArmor ? parseFloat(dom.summonArmor.value) || 0 : 0;
    currentBuild.damageReductionAll = dom.damageReductionAll ? parseFloat(dom.damageReductionAll.value) || 0 : 0;
    currentBuild.barrierBonus = dom.barrierBonus ? parseFloat(dom.barrierBonus.value) || 0 : 0;
    currentBuild.dodgeChance = dom.dodgeChance ? parseFloat(dom.dodgeChance.value) || 0 : 0;
    currentBuild.maxEssence = dom.maxEssence ? parseFloat(dom.maxEssence.value) || 0 : 0;
    currentBuild.essenceRegen = dom.essenceRegen ? parseFloat(dom.essenceRegen.value) || 0 : 0;
    currentBuild.movementSpeed = dom.movementSpeed ? parseFloat(dom.movementSpeed.value) || 0 : 0;
    currentBuild.luckyHit = dom.luckyHit ? parseFloat(dom.luckyHit.value) || 0 : 0;
    currentBuild.ccDuration = dom.ccDuration ? parseFloat(dom.ccDuration.value) || 0 : 0;
    if (dom.expBonus) currentBuild.expBonus = parseFloat(dom.expBonus.value) || 0;
    if (dom.damageReduction) currentBuild.damageReduction = parseFloat(dom.damageReduction.value) || 0;
    currentBuild.name = dom.buildName.textContent || 'New Build';
    currentBuild.class = selectedClass;
    currentBuild.equipment = getEquipmentValues();
    currentBuild.conditions = getActiveConditions();
    currentBuild.buffs = getActiveBuffs();
    currentBuild.skills = JSON.parse(JSON.stringify(window.selectedSkills || {}));
    
    const nodeElsSave = getNodeEls();
    currentBuild.nodes = nodeElsSave.map((el, i) => {
      if (!el) return 0;
      if (el.value === 'custom') {
        const customInp = document.getElementById(`node-custom-${i + 1}`);
        return { name: 'Castle', value: customInp ? parseFloat(customInp.value) || 0 : 0 };
      }
      return parseFloat(el.value) || 0;
    });

    const addSave = [];
    const legSave = [];
    
    const classData = CLASS_PARAGON_DATA[selectedClass];
    for (let i = 1; i <= 5; i++) {
      if (classData) {
        const sel = document.getElementById(`additional-bonus-sel-${i}`);
        const customInp = document.getElementById(`add-bonus-custom-${i}`);
        const lvl = document.getElementById(`legendary-bonus-lvl-${i}`);
        addSave.push({
          name: sel ? sel.value : '',
          customValue: customInp ? parseFloat(customInp.value) || 0 : 0
        });
        legSave.push(lvl ? (parseInt(lvl.value) || 1) : 1);
      } else {
        const inp = document.getElementById(`additional-bonus-${i}`);
        addSave.push(inp ? parseFloat(inp.value) || 0 : 0);
        
        const legInp = document.getElementById(`legendary-bonus-inp-${i}`);
        legSave.push(legInp ? parseFloat(legInp.value) || 0 : 0);
      }
    }

    currentBuild.glyphs = [
      addSave[0], addSave[1], addSave[2], addSave[3], addSave[4],
      legSave[0], legSave[1], legSave[2], legSave[3], legSave[4]
    ];

    // Auto-save
    try {
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(currentBuild));
    } catch (e) {
      console.warn('Autosave failed:', e);
    }
    
    // Update the Character Sheet UI
    renderCharacterSheet(compiledStats);
    renderToughnessDashboard(compiledStats);
    
    renderActiveRunes();
    if (typeof renderCalcSkills === 'function') renderCalcSkills();
  } catch (e) {
    console.error("calculate() Error:", e);
     const container = document.getElementById('character-sheet-content');
     if (container) container.innerHTML = '<div style="color: red; padding: 10px;"><b>CALC ERROR:</b><br>' + e.stack.replace(/\n/g, '<br>') + '</div>';
    
  }
}

  function getAdditiveValues() {
    const rows = dom.additiveBody.querySelectorAll('tr');
    const allValues = [];
    const manualValues = [];
    rows.forEach(row => {
      const nameInput = row.querySelector('.row-name-input');
      const valueInput = row.querySelector('.row-value-input');
      const isInjected = row.classList.contains('injected-row');
      const val = parseFloat(valueInput.value) || 0;
      
      allValues.push({
        name: nameInput.value,
        value: val,
        isInjected: isInjected
      });
      
      if (!isInjected) {
        manualValues.push({ name: nameInput.value, value: val });
      }
    });
    currentBuild.additives = manualValues;
    return allValues;
  }

  function getDrValues() {
    if (!dom.drBody) return [];
    const rows = dom.drBody.querySelectorAll('tr');
    const values = [];
    rows.forEach(row => {
      const nameInput = row.querySelector('.row-name-input');
      const valueInput = row.querySelector('.row-value-input');
      values.push({
        name: nameInput.value,
        value: parseFloat(valueInput.value) || 0,
      });
    });
    currentBuild.defensiveDr = values;
    return values;
  }

  function createDrRow(name, val) {
    if (!dom.drBody) return null;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="d4-input row-name-input" value="${name}" placeholder="Source name"></td>
      <td><input type="number" class="d4-input row-value-input" value="${val}" step="any" placeholder="0"></td>
      <td><button class="btn-remove">X</button></td>
    `;
    
    tr.querySelector('.btn-remove').addEventListener('click', () => {
      tr.remove();
      calculate();
    });
    
    tr.querySelectorAll('input').forEach(i => i.addEventListener('input', calculate));
    dom.drBody.appendChild(tr);
    return tr;
  }

  function getDynamicValues(bodyEl, arrayName) {
    if (!bodyEl) return [];
    const rows = bodyEl.querySelectorAll('tr');
    const values = [];
    rows.forEach(row => {
      const nameInput = row.querySelector('.row-name-input');
      const valueInput = row.querySelector('.row-value-input');
      values.push({
        name: nameInput.value,
        value: parseFloat(valueInput.value) || 0,
      });
    });
    currentBuild[arrayName] = values;
    return values;
  }

  function createDodgeRow(bodyEl, arrayName, name, val) {
    if (!bodyEl) return null;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="d4-input row-name-input" value="${name}" placeholder="Source name"></td>
      <td><input type="number" class="d4-input row-value-input" value="${val}" step="any" placeholder="0"></td>
      <td><button class="btn-remove">X</button></td>
    `;
    
    tr.querySelector('.btn-remove').addEventListener('click', () => {
      tr.remove();
      calculate();
    });
    
    tr.querySelectorAll('input').forEach(i => i.addEventListener('input', calculate));
    bodyEl.appendChild(tr);
    return tr;
  }

  function getMultiplicativeValues() {
    const rows = dom.multBody.querySelectorAll('tr');
    const allValues = [];
    const manualValues = [];
    rows.forEach(row => {
      const nameInput = row.querySelector('.row-name-input');
      const valueInput = row.querySelector('.row-value-input');
      const isInjected = row.classList.contains('injected-row');
      const val = parseFloat(valueInput.value) || 0;
      
      allValues.push({
        name: nameInput.value,
        value: val,
        isInjected: isInjected
      });
      
      if (!isInjected) {
        manualValues.push({ name: nameInput.value, value: val });
      }
    });
    currentBuild.multiplicatives = manualValues;
    return allValues;
  }

  function updateRunningDamages(runningDamages) {
    const cells = dom.multBody.querySelectorAll('.running-damage');
    cells.forEach((cell, i) => {
      if (i < runningDamages.length) {
        cell.innerHTML = formatNumber(runningDamages[i]);
      }
    });
  }

  function updateMultFormulas(multiplicatives) {
    const cells = dom.multBody.querySelectorAll('.formula-value');
    cells.forEach((cell, i) => {
      if (i < multiplicatives.length) {
        const fv = 1 + (multiplicatives[i].value / 100);
        cell.textContent = formatMultiplier(fv);
      }
    });
  }

  function updateAdditiveFormulas(additives) {
    const cells = dom.additiveBody.querySelectorAll('.formula-value');
    cells.forEach((cell, i) => {
      if (i < additives.length) {
        const fv = additives[i].value / 100;
        const formatted = formatMultiplier(fv);
        cell.textContent = fv > 0 ? '+' + formatted : formatted;
      }
    });
  }

  // ---- Row Management ----
  function createAdditiveRow(name = '', value = '', isInjected = false, isSkillInjected = false) {
    const tr = document.createElement('tr');
    if (isInjected) tr.classList.add('injected-row');
    if (isSkillInjected) tr.classList.add('injected-row-skill');

    const nameHtml = isInjected
      ? `<input type="text" class="row-name-input" value="${escapeHtml(name)}" disabled title="From Equipment" style="background: rgba(255,255,255,0.05); color: #aaa;">`
      : `<input type="text" class="row-name-input" value="${escapeHtml(name)}" placeholder="Bonus name...">`;
      
    const valHtml = isInjected
      ? `<input type="number" class="row-value-input" value="${value}" disabled title="From Equipment" style="background: rgba(255,255,255,0.05); color: #aaa;">`
      : `<input type="number" class="row-value-input" value="${value}" step="any" placeholder="0">`;
      
    const deleteHtml = isInjected
      ? `<td class="col-delete"></td>`
      : `<td class="col-delete"><button class="btn-delete" title="Remove">✖</button></td>`;

    tr.innerHTML = `
      <td>${nameHtml}</td>
      <td>${valHtml}</td>
      <td class="formula-value">0.00</td>
      ${deleteHtml}
    `;

    // Event listeners
    if (!isInjected) {
      tr.querySelector('.row-name-input').addEventListener('input', calculate);
      tr.querySelector('.row-value-input').addEventListener('input', calculate);
      tr.querySelector('.btn-delete').addEventListener('click', () => {
        tr.style.opacity = '0';
        tr.style.transform = 'translateX(-10px)';
        tr.style.transition = 'all 0.2s ease';
        setTimeout(() => {
          tr.remove();
          calculate();
        }, 200);
      });
    }

    dom.additiveBody.appendChild(tr);
    return tr;
  }

  function createMultiplicativeRow(name = '', value = '', isInjected = false) {
    const tr = document.createElement('tr');
    if (isInjected) tr.classList.add('injected-row');

    const nameHtml = isInjected
      ? `<input type="text" class="row-name-input" value="${escapeHtml(name)}" disabled title="From Equipment" style="background: rgba(255,255,255,0.05); color: #aaa;">`
      : `<input type="text" class="row-name-input" value="${escapeHtml(name)}" placeholder="Multiplier name...">`;
      
    const valHtml = isInjected
      ? `<input type="number" class="row-value-input" value="${value}" disabled title="From Equipment" style="background: rgba(255,255,255,0.05); color: #aaa;">`
      : `<input type="number" class="row-value-input" value="${value}" step="any" placeholder="0">`;
      
    const deleteHtml = isInjected
      ? `<td></td>`
      : `<td class="col-delete"><button class="btn-delete" title="Remove">&times;</button></td>`;

    tr.innerHTML = `
      <td>${nameHtml}</td>
      <td>${valHtml}</td>
      <td class="formula-value">1.00</td>
      <td class="running-damage">&mdash;</td>
      ${deleteHtml}
    `;

    if (!isInjected) {
      tr.querySelector('.row-name-input').addEventListener('input', calculate);
      tr.querySelector('.row-value-input').addEventListener('input', calculate);
      tr.querySelector('.btn-delete').addEventListener('click', () => {
        tr.style.opacity = '0';
        tr.style.transform = 'translateX(-10px)';
        tr.style.transition = 'all 0.2s ease';
        setTimeout(() => {
          tr.remove();
          calculate();
        }, 200);
      });
    }
    
    dom.multBody.appendChild(tr);
    return tr;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- Build Management ----
  function loadBuildToUI(build) {
    if (build.class) {
      dom.classSelect.value = build.class;
    }
    
    if (!build.activeSkills) {
      build.activeSkills = [null, null, null, null, null, null];
    }
    
    isLoading = true;
    try {
      // Deep clone to prevent calculate() from mutating the data mid-load
      const b = JSON.parse(JSON.stringify(build));
      
      // Ensure paragon array exists and has 5 slots for backwards compatibility
      if (!b.paragon || !Array.isArray(b.paragon) || b.paragon.length < 5) {
        if (!Array.isArray(b.paragon)) b.paragon = [];
        while(b.paragon.length < 5) {
          const isStart = b.paragon.length === 0;
          b.paragon.push({ boardId: null, nodes: [], glyphId: null, glyphLevel: 1, rotation: 0, connection: isStart ? null : { parentSlot: null, parentGate: null, selfGate: null } });
        }
      }
      
      currentBuild = b;

    dom.buildName.textContent = b.name || 'New Build';
    if (dom.classSelect) dom.classSelect.textContent = b.class || 'Barbarian';
    dom.weaponDamage.value = b.weaponDamage || 0;
    dom.skillDamage.value = b.skillDamage || 0;

    dom.strength.value = b.strength || 0;
    dom.intelligence.value = b.intelligence || 0;
    dom.willpower.value = b.willpower || 0;
    dom.dexterity.value = b.dexterity || 0;
    dom.aps.value = b.aps || 1;
    dom.weaponSpeed.value = b.weaponSpeed || 1;
    if (dom.critChance) dom.critChance.value = b.critChance !== undefined ? b.critChance : 5.0;
    if (dom.luckyHitChance) dom.luckyHitChance.value = b.luckyHitChance || 0;
    if (dom.attackSpeed) dom.attackSpeed.value = b.attackSpeed || 0;
    if (dom.castSpeed) dom.castSpeed.value = b.castSpeed || 0;
    if (dom.level) dom.level.value = b.level || 70;
    if (dom.toughness) dom.toughness.value = b.toughness || 0;
    if (dom.armor) dom.armor.value = b.armor || 0;
    if (dom.physRes) dom.physRes.value = b.physRes || 0;
    if (dom.fireRes) dom.fireRes.value = b.fireRes || 0;
    if (dom.lightningRes) dom.lightningRes.value = b.lightningRes || 0;
    if (dom.coldRes) dom.coldRes.value = b.coldRes || 0;
    if (dom.poisonRes) dom.poisonRes.value = b.poisonRes || 0;
    if (dom.shadowRes) dom.shadowRes.value = b.shadowRes || 0;
    
    if (dom.additiveArmor) dom.additiveArmor.value = b.additiveArmor || 0;
    if (dom.multiplicativeArmor) dom.multiplicativeArmor.value = b.multiplicativeArmor || 0;
    if (dom.additiveAllResist) dom.additiveAllResist.value = b.additiveAllResist || 0;
    if (dom.multiplicativeAllResist) dom.multiplicativeAllResist.value = b.multiplicativeAllResist || 0;
    if (dom.fireResist) dom.fireResist.value = b.fireResist || 0;
    if (dom.lightningResist) dom.lightningResist.value = b.lightningResist || 0;
    if (dom.coldResist) dom.coldResist.value = b.coldResist || 0;
    if (dom.poisonResist) dom.poisonResist.value = b.poisonResist || 0;
    if (dom.shadowResist) dom.shadowResist.value = b.shadowResist || 0;

    if (b.conditions) {
      if (document.getElementById('cond-vulnerable')) document.getElementById('cond-vulnerable').checked = b.conditions.vulnerable || false;
      if (document.getElementById('cond-close')) document.getElementById('cond-close').checked = b.conditions.close || false;
      if (document.getElementById('cond-distant')) document.getElementById('cond-distant').checked = b.conditions.distant || false;
      if (document.getElementById('cond-healthy')) document.getElementById('cond-healthy').checked = b.conditions.healthy || false;
      if (document.getElementById('cond-injured')) document.getElementById('cond-injured').checked = b.conditions.injured || false;
      if (document.getElementById('cond-cc')) document.getElementById('cond-cc').checked = b.conditions.cc || false;
      if (document.getElementById('cond-overpower')) document.getElementById('cond-overpower').checked = b.conditions.overpower || false;
      if (b.conditions.monsterType) {
          const mTypeRadio = document.querySelector(`input[name="monster_type"][value="${b.conditions.monsterType}"]`);
          if (mTypeRadio) mTypeRadio.checked = true;
        }
    } else {
      document.querySelectorAll('.calc-condition').forEach(el => el.checked = false);
    }

    if (b.buffs) {
      if (document.getElementById('buff-weakened')) document.getElementById('buff-weakened').checked = b.buffs.weakened || false;
      if (document.getElementById('buff-ferocity')) document.getElementById('buff-ferocity').value = b.buffs.ferocity || 0;
      if (document.getElementById('buff-overpower')) document.getElementById('buff-overpower').value = b.buffs.overpower || 0;
      if (document.getElementById('buff-resolve')) document.getElementById('buff-resolve').value = b.buffs.resolve || 0;
    } else {
      document.querySelectorAll('.calc-buff').forEach(el => {
          if (el.type === 'checkbox') el.checked = false;
          else if (el.type === 'number') el.value = 0;
      });
    }
    
    if (dom.drBody) {
      dom.drBody.innerHTML = '';
      if (b.defensiveDr && b.defensiveDr.length) {
        b.defensiveDr.forEach(d => createDrRow(d.name, d.value));
      }
    }
    if (dom.dodgeAddBody) {
      dom.dodgeAddBody.innerHTML = '';
      if (b.dodgeAdd && b.dodgeAdd.length) {
        b.dodgeAdd.forEach(d => createDodgeRow(dom.dodgeAddBody, 'dodgeAdd', d.name, d.value));
      }
    }
    if (dom.dodgeMultBody) {
      dom.dodgeMultBody.innerHTML = '';
      if (b.dodgeMult && b.dodgeMult.length) {
        b.dodgeMult.forEach(d => createDodgeRow(dom.dodgeMultBody, 'dodgeMult', d.name, d.value));
      }
    }
    if (dom.maxLife) dom.maxLife.value = b.maxLife || 1526;
    if (dom.potionCapacity) dom.potionCapacity.value = b.potionCapacity || 0;
    if (dom.healingReceived) dom.healingReceived.value = b.healingReceived || 0;
    if (dom.lifePer5s) dom.lifePer5s.value = b.lifePer5s || 0;
    if (dom.summonArmor) dom.summonArmor.value = b.summonArmor || 0;
    if (dom.damageReductionAll) dom.damageReductionAll.value = b.damageReductionAll || 0;
    if (dom.barrierBonus) dom.barrierBonus.value = b.barrierBonus || 0;
    if (dom.dodgeChance) dom.dodgeChance.value = b.dodgeChance || 0;
    if (dom.maxEssence) dom.maxEssence.value = b.maxEssence || 0;
    if (dom.essenceRegen) dom.essenceRegen.value = b.essenceRegen || 0;
    if (dom.movementSpeed) dom.movementSpeed.value = b.movementSpeed || 0;
    if (dom.luckyHit) dom.luckyHit.value = b.luckyHit || 0;
    if (dom.ccDuration) dom.ccDuration.value = b.ccDuration || 0;
    if (dom.expBonus) dom.expBonus.value = b.expBonus || 0;
    if (dom.damageReduction) dom.damageReduction.value = b.damageReduction || 0;

    const nodes = b.nodes || [0,0,0,0];
    
    
    const glyphs = b.glyphs || [0,0,0,0,0,0,0,0,0,0];
    const addBonuses = glyphs.slice(0, 5);
    
    
    // For legacy saves where level was packed into addBonuses
    const legBonuses = glyphs.slice(5, 10).map((v, i) => {
        if (CLASS_PARAGON_DATA[currentBuild.class || 'Barbarian'] && addBonuses[i] !== null && typeof addBonuses[i] === 'object') {
            return addBonuses[i].level || v || 1;
        }
        return v;
    });
    
    if (typeof populateMainSkillSelect === 'function') populateMainSkillSelect();
      renderEquipment(dom.classSelect ? dom.classSelect.textContent : 'Barbarian', b.equipment || {});
    window.selectedSkills = b.skills ? JSON.parse(JSON.stringify(b.skills)) : {};
    renderSkills();

    // Clear existing rows
    dom.additiveBody.innerHTML = '';
    dom.multBody.innerHTML = '';

    // Re-populate additive rows
    (build.additives || []).forEach(a => {
      createAdditiveRow(a.name, a.value);
    });

    // Re-populate multiplicative rows
    (build.multiplicatives || []).forEach(m => {
      createMultiplicativeRow(m.name, m.value);
    });
    } finally {
      isLoading = false;
    }
    calculate();
  }

  function newBuild(name = 'New Build', className = 'Barbarian') {
    try { localStorage.removeItem(AUTOSAVE_KEY); } catch(e) {}
    loadBuildToUI(createDefaultBuild(name, className));
    const equipmentBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('data-target') === 'tab-equipment');
    if (equipmentBtn) equipmentBtn.click();
  }

  // ---- Save / Load ----
  function getSavedBuilds() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function setSavedBuilds(builds) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
  }

  function saveBuild() {
    // Sync state from UI
    calculate();

    const builds = getSavedBuilds();
    const existingIndex = builds.findIndex(b => b.name === currentBuild.name);

    const buildCopy = JSON.parse(JSON.stringify(currentBuild));
    buildCopy.savedAt = new Date().toISOString();

    if (existingIndex >= 0) {
      builds[existingIndex] = buildCopy;
    } else {
      builds.push(buildCopy);
    }

    setSavedBuilds(builds);
    showToast(`Build "${currentBuild.name}" saved!`);
  }

  function deleteSavedBuild(name) {
    const builds = getSavedBuilds().filter(b => b.name !== name);
    setSavedBuilds(builds);
    renderLoadMenu();
    
    // If the user deleted the build they currently have loaded, 
    // wipe the active session so it doesn't resurrect from autosave on refresh
    if (currentBuild && currentBuild.name === name) {
      newBuild();
    }
  }

  function renderLoadMenu() {
    const builds = getSavedBuilds();
    dom.loadMenu.innerHTML = '';

    if (builds.length === 0) {
      dom.loadMenu.innerHTML = '<div class="save-menu-empty">No saved builds</div>';
      return;
    }

    builds.forEach(build => {
      const item = document.createElement('div');
      item.className = 'save-menu-item';
      item.innerHTML = `
        <span class="item-name">${escapeHtml(build.name)}</span>
        <span class="item-delete" title="Delete">🗑</span>
      `;

      item.querySelector('.item-name').addEventListener('click', () => {
        loadBuildToUI(JSON.parse(JSON.stringify(build)));
        dom.loadMenu.classList.remove('open');
        showToast(`Loaded "${build.name}"`);
      });

      item.querySelector('.item-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Delete "${build.name}"?`)) {
          deleteSavedBuild(build.name);
        }
      });

      dom.loadMenu.appendChild(item);
    });
  }

  // ---- Export / Import ----
  function exportBuild() {
    calculate();
    const json = JSON.stringify(currentBuild, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentBuild.name.replace(/[^a-z0-9]/gi, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importBuild(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const build = JSON.parse(e.target.result);
        if (build && typeof build === 'object') {
          loadBuildToUI(build);
          showToast(`Imported "${build.name || 'build'}"`);
        }
      } catch (err) {
        showToast('Failed to import — invalid JSON');
      }
    };
    reader.readAsText(file);
  }





  // ---- Toast Notification ----
  function showToast(message) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 10px 20px;
      background: linear-gradient(135deg, #e74c3c, #ff6b35);
      color: white;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 4px 20px rgba(231, 76, 60, 0.3);
      z-index: 1000;
      animation: fadeSlideDown 0.3s ease;
      font-family: 'Inter', sans-serif;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ---- Event Binding ----
  function init() {
    // Base stat inputs → recalculate
    [dom.weaponDamage, dom.skillDamage, dom.strength, dom.intelligence, dom.willpower, dom.dexterity, dom.level, dom.toughness, dom.armor, dom.physRes, dom.fireRes, dom.lightningRes, dom.coldRes, dom.poisonRes, dom.shadowRes, dom.maxLife, dom.potionCapacity, dom.healingReceived, dom.lifePer5s, dom.summonArmor, dom.damageReductionAll, dom.barrierBonus, dom.dodgeChance, dom.maxEssence, dom.essenceRegen, dom.movementSpeed, dom.luckyHit, dom.ccDuration, dom.expBonus, dom.damageReduction, dom.aps, dom.weaponSpeed, dom.additiveArmor, dom.multiplicativeArmor, dom.additiveAllResist, dom.multiplicativeAllResist, dom.fireResist, dom.lightningResist, dom.coldResist, dom.poisonResist, dom.shadowResist].filter(Boolean).forEach(el => {
      el.addEventListener('input', calculate);
      if (el.tagName === 'SELECT') {
        el.addEventListener('change', calculate);
      }
    });
    

      if (dom.mainSkillSelect) {
        dom.mainSkillSelect.addEventListener('change', () => {
          if (dom.mainSkillSelect.value && typeof skillsDatabase !== 'undefined') {
            for (const cat in skillsDatabase) {
              const found = skillsDatabase[cat].find(s => s.name === dom.mainSkillSelect.value);
              if (found && found.baseDamageScalar) {
                dom.skillDamage.value = (found.baseDamageScalar * 100).toFixed(2);
              }
            }
          }
          calculate();
        });
      }
          
      // Calculation Sub-tabs logic
      document.querySelectorAll('.calc-condition').forEach(chk => {
    chk.addEventListener('change', () => {
      if (typeof renderCalcSkills === 'function') renderCalcSkills();
    });
    
    document.querySelectorAll('.calc-buff, .calc-monster-type').forEach(el => {
      if (el.type === 'number') {
        el.addEventListener('input', function() {
          let val = parseInt(this.value);
          let max = parseInt(this.getAttribute('max'));
          let min = parseInt(this.getAttribute('min'));
          if (isNaN(val)) return;
          if (!isNaN(max) && val > max) this.value = max;
          if (!isNaN(min) && val < min) this.value = min;
        });
      }
      el.addEventListener('change', () => {
        saveBuild();
        if (typeof renderCalcSkills === 'function') renderCalcSkills();
      });
    });
  });

  document.querySelectorAll('.calc-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          document.querySelectorAll('.calc-nav-btn').forEach(b => {
            b.classList.remove('active');
            b.style.background = 'transparent';
            b.style.borderLeftColor = 'transparent';
            b.style.color = '#aaa';
          });
          const target = e.target;
          target.classList.add('active');
          target.style.background = 'rgba(255,255,255,0.05)';
          target.style.borderLeftColor = '#c9a55c';
          target.style.color = '#fff';

          document.querySelectorAll('.calc-pane-content').forEach(pane => pane.style.display = 'none');
          const targetId = target.getAttribute('data-target');
          if (targetId) {
            document.getElementById(targetId).style.display = 'block';
          }
        });
      });
// Global click listener to close context menu
    document.addEventListener('click', (e) => {
      const menu = document.getElementById('d4-context-menu');
      if (menu && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
      }
    });

    // Item Modal logic
    const itemModal = document.getElementById('item-selection-modal');
    const closeItemModalBtn = document.getElementById('close-item-modal');
    const itemSearchInput = document.getElementById('item-search-input');
    
    if (closeItemModalBtn) {
      closeItemModalBtn.addEventListener('click', () => {
        itemModal.style.display = 'none';
      });
    }
    
    if (itemSearchInput) {
      itemSearchInput.addEventListener('input', (e) => {
        if (currentModalSlot) {
          renderModalItems(currentModalSlot, e.target.value);
        }
      });
    }
    
    const aspectSearchInput = document.getElementById('aspect-search-input');
    if (aspectSearchInput) {
      aspectSearchInput.addEventListener('input', (e) => {
        if (currentModalSlot) {
          const activeSidebar = document.querySelector('#aspect-sidebar .sidebar-item.active');
          const category = activeSidebar ? activeSidebar.dataset.category : 'All Aspects';
          renderAspectTab(currentModalSlot, category, e.target.value);
        }
      });
    }

    document.querySelectorAll('#aspect-sidebar .sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        if (!currentModalSlot) return;
        document.querySelectorAll('#aspect-sidebar .sidebar-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        const query = document.getElementById('aspect-search-input')?.value || '';
        renderAspectTab(currentModalSlot, item.dataset.category, query);
      });
    });

    const gemSearchInput = document.getElementById('gem-search-input');
    if (gemSearchInput) {
      gemSearchInput.addEventListener('input', (e) => {
        if (currentModalSlot) {
          const activeSidebar = document.querySelector('#gem-sidebar .sidebar-item.active');
          const category = activeSidebar ? activeSidebar.dataset.category : 'All Gems';
          renderGemTab(currentModalSlot, category, e.target.value);
        }
      });
    }

    document.querySelectorAll('#gem-sidebar .sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        if (!currentModalSlot) return;
        document.querySelectorAll('#gem-sidebar .sidebar-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        const query = document.getElementById('gem-search-input')?.value || '';
        renderGemTab(currentModalSlot, item.dataset.category, query);
      });
    });

    // Modal tabs switching logic
    const modalTabs = document.querySelectorAll('.item-modal-tab');
    modalTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        if (e.target.disabled) return;
        const targetTab = e.target.textContent.toLowerCase();
        window.currentModifierEditing = null;
        switchModalTab(targetTab);
      });
    });

    // Main App Tab switching logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button and target pane
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });

    // Class select: re-render node inputs and recalculate
    if (dom.classSelect) {
      dom.classSelect.addEventListener('change', (e) => {
        if (isLoading) return;
        const selectedClass = dom.classSelect.textContent;
        if (currentBuild && currentBuild.class === selectedClass) return; // Prevent spurious resets
        
        const currentNodes = getNodeEls().map(el => el ? parseFloat(el.value) || 0 : 0);
        
        // When changing class, get the current state to pass through (it handles resets gracefully)
        const currentAddSave = [];
        const currentLegSave = [];
        const oldClassData = CLASS_PARAGON_DATA[currentBuild.class || 'Barbarian'];
        const newClassData = CLASS_PARAGON_DATA[dom.classSelect.textContent];
        
        for (let i = 1; i <= 5; i++) {
          if (!newClassData) {
             // We were supported, transitioning to other. Default to 0.
             currentAddSave.push(0);
             currentLegSave.push(0);
          } else {
             // Transitioning to supported. Reset to empty object.
             currentAddSave.push({name: ''});
             currentLegSave.push(1);
          }
        }
        
        
        
        
        // Auto clear equipment and paragon to prevent slot mismatches ONLY if triggered by a real user interaction
        if (e.isTrusted) {
          currentBuild.equipment = {};
          if (currentBuild.paragon) {
             for (let i = 0; i < 5; i++) {
                 currentBuild.paragon[i] = { boardId: '', nodes: [] };
             }
          }
          if (typeof renderParagonGrid === 'function') {
              renderParagonGrid();
          }
        }
        renderEquipment(dom.classSelect.textContent, currentBuild ? currentBuild.equipment : {});
        calculate();
      });
    }

    // Add bonus buttons
    dom.addAdditiveBtn.addEventListener('click', () => {
      const row = createAdditiveRow('', '');
      row.querySelector('.row-name-input').focus();
      calculate();
    });

    dom.addMultBtn.addEventListener('click', () => {
      const row = createMultiplicativeRow('', '');
      row.querySelector('.row-name-input').focus();
      calculate();
    });

    if (dom.btnAddDr) {
      dom.btnAddDr.addEventListener('click', () => {
        const row = createDrRow('', 0);
        row.querySelector('.row-name-input').focus();
        calculate();
      });
    }

    if (dom.btnAddDodgeAdd) {
      dom.btnAddDodgeAdd.addEventListener('click', () => {
        const row = createDodgeRow(dom.dodgeAddBody, 'dodgeAdd', '', 0);
        if (row) row.querySelector('.row-name-input').focus();
        calculate();
      });
    }

    if (dom.btnAddDodgeMult) {
      dom.btnAddDodgeMult.addEventListener('click', () => {
        const row = createDodgeRow(dom.dodgeMultBody, 'dodgeMult', '', 0);
        if (row) row.querySelector('.row-name-input').focus();
        calculate();
      });
    }

    // Collapsible panels
    document.querySelectorAll('.panel-title[data-toggle]').forEach(title => {
      title.style.cursor = 'pointer';
      const icon = title.querySelector('.collapse-icon');
      const body = title.nextElementSibling; // .panel-body
      // Ensure panels start expanded
      body.style.display = 'block';
      if (icon) icon.textContent = '▾';
      title.addEventListener('click', () => {
        const isOpen = body.style.display !== 'none';
        body.style.display = isOpen ? 'none' : 'block';
        if (icon) icon.textContent = isOpen ? '▸' : '▾';
        // Recalculate layout after collapse/expand
        calculate();
      });
    });

    // Build management
    dom.btnNew.addEventListener('click', () => {
      if (dom.newBuildModal) {
        dom.newBuildModal.style.display = 'flex';
        dom.newBuildModal.classList.remove('hidden');
        if (dom.newBuildName) dom.newBuildName.value = 'New Build';
        if (dom.newBuildClass) dom.newBuildClass.value = 'Barbarian';
      }
    });

    if (dom.btnCancelNewBuild) {
      dom.btnCancelNewBuild.addEventListener('click', () => {
        if (dom.newBuildModal) {
          dom.newBuildModal.style.display = 'none';
          dom.newBuildModal.classList.add('hidden');
        }
      });
    }

    if (dom.btnCreateNewBuild) {
      dom.btnCreateNewBuild.addEventListener('click', () => {
        const name = dom.newBuildName ? (dom.newBuildName.value.trim() || 'New Build') : 'New Build';
        const className = dom.newBuildClass ? dom.newBuildClass.value : 'Barbarian';
        
        if (confirm('Start a new build? Unsaved changes will be lost.')) {
          newBuild(name, className);
          if (dom.newBuildModal) {
            dom.newBuildModal.style.display = 'none';
            dom.newBuildModal.classList.add('hidden');
          }
          saveBuild();
        }
      });
    }

    dom.btnSave.addEventListener('click', saveBuild);

    dom.btnLoad.addEventListener('click', (e) => {
      e.stopPropagation();
      renderLoadMenu();
      dom.loadMenu.classList.toggle('open');
    });

    dom.btnExport.addEventListener('click', exportBuild);

    dom.btnImport.addEventListener('click', () => {
      dom.importFile.click();
    });

    dom.importFile.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        importBuild(e.target.files[0]);
        e.target.value = '';
      }
    });

    // Close load menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.save-dropdown')) {
        dom.loadMenu.classList.remove('open');
      }
    });
  }

  window.selectedSkills = {};

function getBaseDamageScalarFor(skillName) {
    let db = typeof skillsDatabase !== 'undefined' ? skillsDatabase : (window.skillsDatabase || null);
    if (!db) return null;
    for (let cat in db) {
        for (let s of db[cat]) {
            if (s.name === skillName) return s.baseDamageScalar;
            if (s.modifiers) {
                for (let m of s.modifiers) {
                    if (m.name === skillName) return m.baseDamageScalar || s.baseDamageScalar;
                }
            }
        }
    }
    return null;
}

function parseD4String(str, skillObj, currentRank) {
    if (!str) return '';
    
    // Replace PowerFinalizedAttackSpeed so math evaluator doesn't crash on Generate Essence logic
    let apsVal = (typeof currentBuild !== 'undefined' && currentBuild && currentBuild.aps) ? currentBuild.aps : 1.2;
    str = str.replace(/PowerFinalizedAttackSpeed/gi, apsVal.toString());
    
    // Replace Blood Orb Bonus Chance so math evaluator can calculate Hemorrhage properly
    str = str.replace(/Blood_Orb_Bonus_Chance_Per_Power\(\d+\)/gi, "0");
    
    // Globally strip embedded Cooldown and Resource Cost blocks, as they are handled by statsHtml at the top
    str = str.replace(/\{c_label\}Cooldown:\{\/c(?:_label)?\}\s*\{c_resource\}\[\{cooldown time\}[\s\.,\d]*?\][\s\S]*?\{\/c(?:_resource)?\}\s*(?:seconds)?(?:\\n|\r?\n)?/gi, "");
    str = str.replace(/\{c_label\}Essence Cost:\s*\{\/c(?:_[a-zA-Z]+)?\}\s*\{c_resource\}\[\{resource cost\}[\s\.,\d]*?\][\s\S]*?\{\/c(?:_[a-zA-Z]+)?\}(?:\\n|\r?\n)?/gi, "");
    str = str.replace(/\{c_label\}Mana Cost:\{\/c(?:_[a-zA-Z]+)?\}\s*\{c_resource\}\[\{resource cost\}[\s\.,\d]*?\][\s\S]*?\{\/c(?:_[a-zA-Z]+)?\}(?:\\n|\r?\n)?/gi, "");
    str = str.replace(/\{c_label\}Fury Cost:\{\/c(?:_[a-zA-Z]+)?\}\s*\{c_resource\}\[\{resource cost\}[\s\.,\d]*?\][\s\S]*?\{\/c(?:_[a-zA-Z]+)?\}(?:\\n|\r?\n)?/gi, "");
    str = str.replace(/\{c_label\}Spirit Cost:\{\/c(?:_[a-zA-Z]+)?\}\s*\{c_resource\}\[\{resource cost\}[\s\.,\d]*?\][\s\S]*?\{\/c(?:_[a-zA-Z]+)?\}(?:\\n|\r?\n)?/gi, "");

    let maxLife = 1526; // Default level 50 life
    if (typeof dom !== 'undefined' && dom.maxLife) {
        maxLife = parseFloat(dom.maxLife.value) || 1526;
    }
    str = str.replace(/\{c_label\}Energy Cost:\{\/c(?:_[a-zA-Z]+)?\}\s*\{c_resource\}\[\{resource cost\}[\s\.,\d]*?\][\s\S]*?\{\/c(?:_[a-zA-Z]+)?\}(?:\\n|\r?\n)?/gi, "");
    
    if (skillObj && skillObj.name === "Skeleton Warrior") {
        str = str.replace(/\{c_label\}Cooldown:\{\/c_label\}\s*\{c_resource\}\[\{cooldown time\}[\s\.,\d]*?\]\{\/c_resource\}\s*seconds(?:\\n|\r?\n)?/g, "");
    }
    
    if (skillObj && skillObj.name === "Golem") {
        let gSpec = "Iron Golem"; // default
        if (typeof currentBuild !== 'undefined' && currentBuild && currentBuild.bookOfTheDead && currentBuild.bookOfTheDead.golems) {
            gSpec = currentBuild.bookOfTheDead.golems.spec;
        }
        
        let typeVal = 2; // Iron
        if (gSpec === "Bone Golem") typeVal = 0;
        else if (gSpec === "Blood Golem") typeVal = 1;
        
        // Preserve the selected Active and Cooldown blocks
        let regex = new RegExp(`\\{if:NecroArmy_Spec_For_Pet_Type\\(2\\)==${typeVal}\\}([\\s\\S]*?)\\{\\/if\\}`, 'g');
        str = str.replace(regex, '$1');
        
        let rankMult = 1.0;
        if (currentRank > 1) {
            let levelsGained = currentRank - 1;
            let enhancedIncreases = Math.floor(currentRank / 5);
            let scalePerLevel = skillObj.damageScalePerLevel !== undefined ? skillObj.damageScalePerLevel : 0.10;
            let scalePerFive = skillObj.damageScalePerFive !== undefined ? skillObj.damageScalePerFive : 0.05;
            rankMult = 1.0 + (levelsGained * scalePerLevel) + (enhancedIncreases * scalePerFive);
        }
        
        if (gSpec === "Bone Golem") {
            str = str.replace(/\[\{cooldown time\}[\s\.,\d]*?\]|\{cooldown time\}/g, "16");
        } else if (gSpec === "Blood Golem") {
            str = str.replace(/\[\{cooldown time\}[\s\.,\d]*?\]|\{cooldown time\}/g, "16");
            str = str.replace(/\[\{payload:tooltip_blood_active\}[\s\.,\d]*?\]|\{payload:tooltip_blood_active\}/g, (1.40 * rankMult * 100).toFixed(1) + '%');
        } else {
            // Iron Golem
            str = str.replace(/\[\{cooldown time\}[\s\.,\d]*?\]|\{cooldown time\}/g, "10");
            str = str.replace(/\[\{payload:tooltip_slam\}[\s\.,\d]*?\]|\{payload:tooltip_slam\}/g, (2.00 * rankMult * 100).toFixed(1) + '%');
        }
    }
    
    // Fix escaped brackets for multipliers like \[x\]
    str = str.replace(/\\\[([x\+])\\\]/g, '[$1]');
    
    str = str.replace(/\{if:ADVANCED_TOOLTIP\}([\s\S]*?)\{\/if\}/g, '$1');
    
    // Assume we don't have this unique item equipped
    str = str.replace(/GetCollectiblePowerEquippedSlotIndex\(\d+\)/gi, "-1");
    
    // Evaluate {if:AffixIsEquipped(...)}...{else}...{/if} FIRST to prevent nested brace breakage
    str = str.replace(/\{if:AffixIsEquipped\(\d+\)(?:>0)?\}([\s\S]*?)(?:\{else\}([\s\S]*?))?\{\/if\}/gi, (match, trueBranch, falseBranch) => {
        return falseBranch || "";
    });

    // Evaluate {if:-1>-1?1:0}...{else}...{/if}
    str = str.replace(/\{if:-1>-1\?1:0\}([\s\S]*?)(?:\{else\}([\s\S]*?))?\{\/if\}/gi, (match, trueBranch, falseBranch) => {
        return falseBranch || "";
    });

    // Evaluate {if:(-1>-1?1:0)?0:1} for Bone Storm
    str = str.replace(/\{if:\(-1>-1\?1:0\)\?0:1\}([\s\S]*?)(?:\{else\}([\s\S]*?))?\{\/if\}/gi, (match, trueBranch, falseBranch) => {
        return trueBranch || "";
    });

    // Evaluate {if:Mod(...)}...{else}...{/if} blocks dynamically
    str = str.replace(/\{if:(1-)?Mod\((\d+)\)(>0\?0:1)?\}([\s\S]*?)(?:\{else\}([\s\S]*?))?\{\/if\}/gi, (match, not, modId, inverse, trueBranch, falseBranch) => {
        let isSelected = false;
        // Specifically map Hematolagnia (582507896)
        if (modId === "582507896" && window.selectedSkills && window.selectedSkills["Hematolagnia"] > 0) {
            isSelected = true;
        }
        
        let isTrue = isSelected;
        if (not) isTrue = !isTrue;
        if (inverse) isTrue = !isTrue; // >0?0:1 acts as a logical NOT
        
        return isTrue ? trueBranch : (falseBranch || "");
    });
    
    str = str.replace(/\{if:.*?\}[\s\S]*?\{\/if\}/g, '');
    
    // Replace colors (run twice for nesting)
    str = str.replace(/\{c_([a-zA-Z]+)\}([\s\S]*?)\{\/c(?:_[a-zA-Z]+)?\}/g, '<span class="d4-color-$1">$2</span>');
    str = str.replace(/\{c_([a-zA-Z]+)\}([\s\S]*?)\{\/c(?:_[a-zA-Z]+)?\}/g, '<span class="d4-color-$1">$2</span>');
    str = str.replace(/\{\/c(?:_[a-zA-Z]+)?\}/g, '');
    
    // Underlines
    str = str.replace(/\{u\}([\s\S]*?)\{\/u\}/g, '<span style="text-decoration: underline;">$1</span>');
    str = str.replace(/\{\/?u\}/g, '');
    
    let rankMult = 1.0;
    if (currentRank > 1) {
        let levelsGained = currentRank - 1;
        let enhancedIncreases = Math.floor(currentRank / 5);
        let scalePerLevel = skillObj.damageScalePerLevel !== undefined ? skillObj.damageScalePerLevel : 0.10;
        let scalePerFive = skillObj.damageScalePerFive !== undefined ? skillObj.damageScalePerFive : 0.05;
        rankMult = 1.0 + (levelsGained * scalePerLevel) + (enhancedIncreases * scalePerFive);
    }
    
    if (skillObj.name === "Skeleton Warrior" && str.includes("Skeletal")) {
        str = str.replace(/\[\{payload:tooltip_sword\}[\s\.,\d]*?\]|\{payload:tooltip_sword\}/g, (0.65 * rankMult * 100).toFixed(1) + '%');
    }
    if (skillObj.name === "Blood Surge") {
        str = str.replace(/\[\{payload:inner_damage\}[\s\.,\d]*?\]|\{payload:inner_damage\}/g, (1.00 * rankMult * 100).toFixed(1) + '%');
    }
    if (skillObj.name === "Miasma") {
        str = str.replace(/\[\{dot:miasma_dot_tooltip\}[\s\.,\d]*?\]|\{dot:miasma_dot_tooltip\}/g, (1.45 * rankMult * 100).toFixed(1) + '%');
    }
    if (skillObj && skillObj.name === "Soulrift") {
        str = str.replace(/\[\{buffduration:caster_skill_active\}[\s\.,\d]*?\]|\{buffduration:caster_skill_active\}/g, "8");
        str = str.replace(/\[\{dot:tooltip_total_damage\}[\s\.,\d]*?\]|\{dot:tooltip_total_damage\}/g, "300%");
    }
    if (skillObj.name === "Blood Mist" || skillObj.name === "Devouring Mist" || skillObj.name === "Blood Transfusion" || skillObj.name === "Blood Rush") {
        str = str.replace(/\[\{cooldown time\}[\s\.,\d]*?\]|\{cooldown time\}/g, "24");
        str = str.replace(/\[\{buffduration:mistform\}[\s\.,\d]*?\]|\{buffduration:mistform\}/g, "3");
        str = str.replace(/\[\{dot:tooltip_dot\}[\s\.,\d]*?\]|\{dot:tooltip_dot\}/g, (4.2 * rankMult * 100).toFixed(1) + '%');
        str = str.replace(/\[\{dot:tooltip_dot_shadow\}[\s\.,\d]*?\]|\{dot:tooltip_dot_shadow\}/g, (6.0 * rankMult * 100).toFixed(1) + '%');
    }
    str = str.replace(/\[\{buffduration:buff_damage_reduction\}[\s\.,\d]*?\]|\{buffduration:buff_damage_reduction\}/g, "10");
    if (skillObj && skillObj.name === "Bone Prison") {
        str = str.replace(/\[\{cooldown time\}[\s\.,\d]*?\]|\{cooldown time\}/g, "15");
        
        let duration = 6.0 + (2.4 * (currentRank - 1) / 14);
        str = str.replace(/\[\{buffduration:wall_tracker\}[\s\.,\d]*?\]|\{buffduration:wall_tracker\}/g, duration.toFixed(1).replace(/\.0$/, ''));
        
        str = str.replace(/\[\{pet_health:bonewall\}[\s\.,\d]*?\]|\{pet_health:bonewall\}/g, (match) => {
            let maxLife = 1526;
            if (typeof dom !== 'undefined' && dom.maxLife) {
                maxLife = parseFloat(dom.maxLife.value) || 1526;
            }
            return Math.floor(maxLife * 0.3 * currentRank).toString();
        });
    }
    if (skillObj.name === "Bone Spirit") {
        str = str.replace(/\[\{recharge time\}[\s\.,\d]*?\]|\{recharge time\}/g, "12");
    }
    if (skillObj.name === "Devouring Mist") {
        str = str.replace(/\[\{dot:tooltip_dot_shadow\}[\s\.,\d]*?\]|\{dot:tooltip_dot_shadow\}/g, (0.5 * rankMult * 12 * 100).toFixed(1) + '%');
    }
    if (skillObj.name === "Plunging Darkness") {
        str = str.replace(/\[\{dot:tooltip_dot\}[\s\.,\d]*?\]|\{dot:tooltip_dot\}/g, (3.0 * rankMult * 100).toFixed(1) + '%');
    }
    if (skillObj.name === "Bone Storm") {
        str = str.replace(/\[\{payload:tooltip_damage\}[\s\.,\d]*?\]|\{payload:tooltip_damage\}/g, (4.0 * rankMult * 100).toFixed(1) + '%');
        str = str.replace(/\[\{payload:tooltip_damage_shadow\}[\s\.,\d]*?\]|\{payload:tooltip_damage_shadow\}/g, (4.0 * rankMult * 100).toFixed(1) + '%');
    }

    let scalar = skillObj.baseDamageScalar || getBaseDamageScalarFor(skillObj.name);
    if (skillObj.name === "Unfinished Business") {
        scalar = 2.5;
    }
    
    if (scalar || skillObj.secondaryScalars) {
        if (skillObj.secondaryScalars) {
            for (let payloadKey in skillObj.secondaryScalars) {
                let secScalar = skillObj.secondaryScalars[payloadKey];
                let secPercentage = (secScalar * rankMult * 100).toFixed(1) + '%';
                let regex = new RegExp(`\\[\\{payload:${payloadKey}\\}[\\s\\S]*?\\]|\\{payload:${payloadKey}\\}`, 'g');
                str = str.replace(regex, secPercentage);
                let regexDot = new RegExp(`\\[\\{dot:${payloadKey}\\}[\\s\\S]*?\\]|\\{dot:${payloadKey}\\}`, 'g');
                str = str.replace(regexDot, secPercentage);
            }
        }
        
        let percentage = scalar ? (scalar * rankMult * 100).toFixed(1) + '%' : '?%';
        str = str.replace(/\[\{payload:.*?\}[\s\S]*?\]|\{payload:.*?\}/g, percentage);
        str = str.replace(/\[\{dot:.*?\}[\s\S]*?\]|\{dot:.*?\}/g, percentage);
    } else {
        str = str.replace(/\[\{payload:.*?\}[\s\S]*?\]|\{payload:.*?\}/g, '?%');
        str = str.replace(/\[\{dot:.*?\}[\s\S]*?\]|\{dot:.*?\}/g, '?%');
    }
    
    // Replace Advanced Math formulas like [Max((0.0007*Pow(Level-1,3.62)+...)*Table(34,sLevel)/10,1)]
    str = str.replace(/\[([a-zA-Z0-9.*+/\-(),?:]+)(?:\|.*?\|?)?\]/gi, (match, formula) => {
        // Skip tags like {payload:damage}
        if (formula.includes('{') || formula.includes('}')) return match;

        let mathStr = formula;
        
        let characterLevel = 70;
        if (typeof document !== 'undefined') {
            const lvlInput = document.getElementById('character-level');
            if (lvlInput) characterLevel = parseInt(lvlInput.value) || 70;
        }

        // Replace Table(34,sLevel) with the correct rankMult variable which correctly factors in the per-5-level scaling
        mathStr = mathStr.replace(/Table\((\d+),sLevel\)/gi, (match, tableId) => {
            if (tableId === "37") {
                let levelsGained = currentRank > 1 ? currentRank - 1 : 0;
                let enhancedIncreases = Math.floor(currentRank / 5);
                return 1.0 + (levelsGained * 0.02) + (enhancedIncreases * 0.04);
            }
            return rankMult;
        });

        // Replace variables
        mathStr = mathStr.replace(/sLevel/g, currentRank);
        mathStr = mathStr.replace(/Level/gi, characterLevel);

        // Replace math functions
        mathStr = mathStr.replace(/Pow\(/gi, 'Math.pow(');
        mathStr = mathStr.replace(/Round\(/gi, 'Math.round(');
        mathStr = mathStr.replace(/Max\(/gi, 'Math.max(');
        mathStr = mathStr.replace(/Min\(/gi, 'Math.min(');
        mathStr = mathStr.replace(/Floor\(/gi, 'Math.floor(');
        mathStr = mathStr.replace(/Ceil\(/gi, 'Math.ceil(');
        
        mathStr = mathStr.replace(/Necro_BoneStorm_DamageReduction/gi, '0');

        let val = 0;
        try {
            val = eval(mathStr);
        } catch (e) {
            return match; // Ignore invalid formulas
        }

        if (isNaN(val)) return match;

        if (match.includes('%')) {
             return val.toFixed(1).replace(/\.0$/, '') + '%';
        }
        return val.toFixed(1).replace(/\.0$/, '');
    });
    
    str = str.replace(/\[Mod\([^)]+\)\?(\d+):(\d+)(?:\|.*?)?\]/g, '$2');
    
    if (skillObj.resourceCost) {
        str = str.replace(/\[\{resource cost\}[\s\.,\d]*?\]/g, skillObj.resourceCost);
    }
    
    if (skillObj.luckyHitChance) {
        str = str.replace(/\[\{combat effect chance\}[\s\.,\d]*?\]/g, skillObj.luckyHitChance + '%');
        str = str.replace(/\{combat effect chance\}/g, skillObj.luckyHitChance + '%');
    } else {
        str = str.replace(/\[\{combat effect chance\}[\s\.,\d]*?\]/g, '?%');
        str = str.replace(/\{combat effect chance\}/g, '?%');
    }
    
    
    str = str.replace(/\{cooldown time\}/g, '?');
    
    // Evaluate PlayerHealthMax() formulas dynamically based on user's inputted Maximum Life
    str = str.replace(/\[(?:Max\(1,)?PlayerHealthMax\(\)\*([^|\]]+)(?:\|.*?\|?)?\]/gi, (match, formula) => {
        if (match.toLowerCase().includes('max(1,')) {
            if (formula.endsWith(')')) {
                let open = formula.split('(').length - 1;
                let close = formula.split(')').length - 1;
                if (close > open) {
                    formula = formula.substring(0, formula.lastIndexOf(')'));
                }
            }
        }
        
        let maxLife = 1526; // Default level 50 life
        if (typeof dom !== 'undefined' && dom.maxLife) {
            maxLife = parseFloat(dom.maxLife.value) || 1526;
        }
        
        let mathRes = formula.replace(/(\d+(?:\.\d+)?)\*Table\(\d+,sLevel\)/gi, (m, p1) => {
            let baseVal = parseFloat(p1);
            let utilMult = 1.0;
            if (typeof currentRank !== 'undefined' && currentRank > 1) {
                utilMult = 1.0 + ((currentRank - 1) * 0.10);
            }
            return baseVal * utilMult;
        });
        
        let coefficient = 0;
        try {
            coefficient = eval(mathRes);
        } catch (e) {
            coefficient = 0;
        }
        
        return Math.round(maxLife * coefficient).toString();
    });
    
    // Explicit override for missing {fortified:xxx} inside Max()
    str = str.replace(/\[Max\(1,\{fortified:.*?\}\)(?:\|.*?\|?)?\]/g, (match) => {
        let maxLife = 1526;
        if (typeof dom !== 'undefined' && dom.maxLife) {
            maxLife = parseFloat(dom.maxLife.value) || 1526;
        }
        let pct = 0.01;
        if (str.includes("Blood Lance")) pct = 0.04;
        if (str.includes("Iron Maiden")) pct = 0.05;
        
        return Math.round(maxLife * pct).toString();
    });

    
    str = str.replace(/\{buffduration:decrepify_curse\}/g, "30");
    str = str.replace(/\{buffduration:ironmaiden_curse\}/g, "30");
    
    if (skillObj && skillObj.name === "Army of the Dead") {
        str = str.replace(/\[\{buffduration:raise_army\}[\s\.,\d]*?\]|\{buffduration:raise_army\}/g, "7");
        str = str.replace(/\[\{buffduration:volatine_stun\}[\s\.,\d]*?\]|\{buffduration:volatine_stun\}/g, "2");
    }
    
    // Evaluate specific buff durations globally so child modifiers can access them
    str = str.replace(/\[\{buffduration:bonestorm\}[\s\.,\d]*?\]|\{buffduration:bonestorm\}/g, "10");
    str = str.replace(/\[\{buffduration:barrier\}[\s\.,\d]*?\]|\{buffduration:barrier\}/g, "10");
    str = str.replace(/\[\{buffduration:lanced\}[\s\.,\d]*?\]|\{buffduration:lanced\}/g, "3");
    
    // Shield / Barrier specific replacements
    str = str.replace(/\[\{shield:barrier\}[\s\.,\d]*?\]|\{shield:barrier\}/g, () => {
        return Math.floor(maxLife * 0.10).toString();
    });
    
    // Math evaluator for inline formulas [formula|%|]
    str = str.replace(/\[([0-9a-zA-Z.*?/\-()+><,:\s_]+)(?:\|[^\]]*\|?)?\]/g, (match, formula) => {
        // Only evaluate if it looks like a math operation
        if (/[+\-*/><]/.test(formula) || /Pow\(/i.test(formula)) {
            let cleanFormula = formula.replace(/Pow\(/gi, "Math.pow(");
            cleanFormula = cleanFormula.replace(/GetCollectiblePowerEquippedSlotIndex\(\d+\)/gi, "-1");
            cleanFormula = cleanFormula.replace(/Necro_BoneStorm_DamageReduction/gi, "0");
            try {
                let val = eval(cleanFormula);
                if (match.includes('%')) {
                    return Math.floor(val).toString() + '%';
                }
                return Math.floor(val).toString();
            } catch (e) {
                return match;
            }
        }
        return match;
    });
    
    // Clean up random brackets with pipes [something|2?|]
    str = str.replace(/\[(.*?)\|.*?\]/g, '$1');
    
    // Hardcoded Book of the Dead Passive Evaluation
    str = str.replace(/NecroPetPassiveIsActive\((\d+)\)/gi, (match, passiveId) => {
        if (!currentBuild || !currentBuild.bookOfTheDead) return "0";
        const wSpec = currentBuild.bookOfTheDead.warriors?.spec;
        const wNode = currentBuild.bookOfTheDead.warriors?.node;
        
        // Warriors +2 Skirmisher (Upgrade 1)
        if (passiveId === "931558" && wSpec === "Skirmisher" && wNode === "1") return "1";
        // Skirmisher Sacrifice (reduces by 50%)
        if (passiveId === "931560" && wSpec === "Skirmisher" && wNode === "sacrifice") return "1";
        // Defender Sacrifice (reduces by 50%)
        if (passiveId === "931563" && wSpec === "Defender" && wNode === "sacrifice") return "1";
        // Reaper Sacrifice (reduces by 50%)
        if (passiveId === "931566" && wSpec === "Reaper" && wNode === "sacrifice") return "1";
        
        const mSpec = currentBuild.bookOfTheDead.mages?.spec;
        const mNode = currentBuild.bookOfTheDead.mages?.node;
        
        // Shadow Sacrifice (reduces by 50%)
        if (passiveId === "931578" && mSpec === "Shadow Mage" && mNode === "sacrifice") return "1";
        // Cold Sacrifice (reduces by 50%)
        if (passiveId === "931587" && mSpec === "Cold Mage" && mNode === "sacrifice") return "1";
        // Bone Sacrifice (reduces by 50%)
        if (passiveId === "931594" && mSpec === "Bone Mage" && mNode === "sacrifice") return "1";
        
        return "0";
    });
    
    // Replace dummy variables
    str = str.replace(/Affix_Value_2\(2587892\)/g, () => {
        let bonus = 0;
        if (typeof getEquipmentValues === 'function') {
            const eq = getEquipmentValues();
            if (eq && Object.values(eq).some(item => item && item.name && item.name.toLowerCase().includes("undercrown"))) {
                bonus += 4;
            }
            if (eq && Object.values(eq).some(item => item && item.name && item.name.toLowerCase().includes("deathgrip"))) {
                bonus += 1;
            }
        }
        return bonus.toString();
    }); // Bonus max warriors from affixes
    str = str.replace(/Affix_Value_1\(2587975\)/g, "0"); // Unknown extra bonus
    
    // Swap "Skeletal warriors" text dynamically based on spec
    if (skillObj && skillObj.name === "Skeleton Warrior" && currentBuild && currentBuild.bookOfTheDead) {
        const wSpec = currentBuild.bookOfTheDead.warriors?.spec;
        const wNode = currentBuild.bookOfTheDead.warriors?.node;
        if (wSpec && wNode !== null) {
            let pluralSpec = wSpec === "Reaper" ? "Reapers" : wSpec + "s";
            str = str.replace(/Skeletal warriors deal/gi, `Skeletal ${pluralSpec} deal`);
        }
    }
    
    // Floor math evaluator (handles nested parentheses)
    let floorIndex = str.indexOf("Floor(");
    while (floorIndex !== -1) {
        let openParens = 1;
        let endIndex = floorIndex + 6;
        while (endIndex < str.length && openParens > 0) {
            if (str[endIndex] === '(') openParens++;
            else if (str[endIndex] === ')') openParens--;
            endIndex++;
        }
        if (openParens === 0) {
            let formula = str.substring(floorIndex + 6, endIndex - 1);
            
            // Handle Mod(582507894) which represents "Master of Puppets" modifier
            let cleanFormula = formula.replace(/Mod\(582507894\)/g, () => {
                if (skillObj && skillObj.name === "Skeleton Warrior") {
                    return (window.selectedSkills && window.selectedSkills["Master of Puppets"]) ? "1" : "0";
                }
                return "0";
            });
            // Wipe out any other unknown Mod()
            cleanFormula = cleanFormula.replace(/\(Mod\(\d+\)\?\d+:\d+\)/gi, "0");
            cleanFormula = cleanFormula.replace(/Necro_Bonus_Max_Mages/gi, () => {
                let bonus = 0;
                if (window.selectedSkills && window.selectedSkills["Coven"]) bonus += 2;
                if (typeof getEquipmentValues === 'function') {
                    const eq = getEquipmentValues();
                    if (eq && Object.values(eq).some(item => item && item.name && item.name.toLowerCase().includes("undercrown"))) {
                        bonus += 4;
                    }
                    if (eq && Object.values(eq).some(item => item && item.name && item.name.toLowerCase().includes("the hand of naz"))) {
                        bonus += 1;
                    }
                }
                return bonus.toString();
            });
            cleanFormula = cleanFormula.replace(/Necro_Bonus_Max_Warriors/gi, () => {
                let bonus = 0;
                if (typeof getEquipmentValues === 'function') {
                    const eq = getEquipmentValues();
                    if (eq && Object.values(eq).some(item => item && item.name && item.name.toLowerCase().includes("undercrown"))) {
                        bonus += 4;
                    }
                }
                return bonus.toString();
            });
            
            try {
                // Pre-process math functions that don't match JS syntax
                cleanFormula = cleanFormula.replace(/Pow\(/gi, "Math.pow(");
                
                let result = Math.floor(eval(cleanFormula)).toString();
                str = str.substring(0, floorIndex) + result + str.substring(endIndex);
            } catch (e) {
                // If it fails, just leave it alone and break to prevent infinite loop
                break;
            }
        } else {
            break;
        }
        floorIndex = str.indexOf("Floor(");
    }
    
    
    str = str.replace(/\{icon:bullet,1\.2\}/g, '&bull; ');
    str = str.replace(/\{icon:.*?}/g, '* ');
    
    // Strip other remaining {tag:value} things like {shield:barrier}, {buffduration:xxx}
    str = str.replace(/\{[a-zA-Z_]+:[a-zA-Z_]+\}/g, '?');
    str = str.replace(/\{cooldown time\}/g, '?');
    
    return str.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');
}

let tooltipEl = null;

function formatTag(t) {
    let tag = t.replace('Skill_Primary_', '').replace('Skill_', '').replace('Damage_Override_', '').replace('Keyword_', '');
    if (tag === 'Shadow') tag = 'Darkness'; // D4 uses Darkness for Shadow skills
    return tag;
}

function getBaseSkillRankFor(skillName) {
    let db = typeof skillsDatabase !== 'undefined' ? skillsDatabase : (window.skillsDatabase || null);
    if (!db) return window.selectedSkills[skillName] || 0;
    for (let cat in db) {
        for (let s of db[cat]) {
            if (s.name === skillName) return window.selectedSkills[skillName] || 0;
            if (s.modifiers) {
                for (let m of s.modifiers) {
                    if (m.name === skillName) return window.selectedSkills[s.name] || 0;
                }
            }
        }
    }
    return window.selectedSkills[skillName] || 0;
}

function applyActiveModifiers(baseSkillObj) {
    if (!baseSkillObj) return baseSkillObj;
    
    // Create a shallow clone to avoid mutating the master database
    let modified = { ...baseSkillObj };
    if (baseSkillObj.tags) {
        modified.tags = [...baseSkillObj.tags];
    } else {
        modified.tags = [];
    }
    
    if (baseSkillObj.secondaryScalars) {
        modified.secondaryScalars = { ...baseSkillObj.secondaryScalars };
    }
    
    if (baseSkillObj.modifiers) {
        baseSkillObj.modifiers.forEach(mod => {
            // Check if the user has put points into this modifier
            if (window.selectedSkills && window.selectedSkills[mod.name] > 0) {
                
                // Append new tags (e.g., Hematolagnia adding Skill_Primary_Core)
                if (mod.tags) {
                    mod.tags.forEach(t => {
                        if (!modified.tags.includes(t)) {
                            modified.tags.push(t);
                        }
                    });
                }
                
                // Specific logic for Hematolagnia: remove Ultimate tag
                if (mod.name === "Hematolagnia") {
                    modified.tags = modified.tags.filter(t => t !== "Skill_Ultimate");
                    modified.cooldown = null; // Removed
                    modified.resourceCost = 50; // Added
                }
                
                // Specific logic for Shadow And Bone & Plunging Darkness: remove Bone tag
                if (mod.name === "Shadow And Bone" || mod.name === "Plunging Darkness") {
                    modified.tags = modified.tags.filter(t => !t.toLowerCase().includes('bone'));
                }

                // Specific logic for Devouring Mist: remove Blood tag
                if (mod.name === "Devouring Mist") {
                    modified.tags = modified.tags.filter(t => !t.toLowerCase().includes('blood'));
                    if (modified.secondaryScalars && modified.secondaryScalars.tooltip_damage) {
                        delete modified.secondaryScalars.tooltip_damage;
                    }
                }
                
                // Specific logic for Dead Cold: remove explosion damage
                if (mod.name === "Dead Cold") {
                    if (modified.secondaryScalars && modified.secondaryScalars.explosion_damage) {
                        delete modified.secondaryScalars.explosion_damage;
                    }
                }
                
                // Specific logic for Miasma: Convert to DoT
                if (mod.name === "Miasma") {
                    modified.secondaryScalars = modified.secondaryScalars || {};
                    modified.secondaryScalars['dot'] = 2.1;
                    modified.baseDamageScalar = null;
                }
                
                // Override base damage scalar if provided (e.g., Blood Wave 500% -> 300%)
                if (mod.baseDamageScalar !== undefined) {
                    modified.baseDamageScalar = mod.baseDamageScalar;
                }
                
                // Merge secondaryScalars if provided
                if (mod.secondaryScalars) {
                    if (!modified.secondaryScalars) modified.secondaryScalars = {};
                    for (let key in mod.secondaryScalars) {
                        modified.secondaryScalars[key] = mod.secondaryScalars[key];
                    }
                }
                
                // Override cooldown and resource cost if provided
                if (mod.cooldown !== undefined) modified.cooldown = mod.cooldown;
                if (mod.resourceCost !== undefined) modified.resourceCost = mod.resourceCost;
            }
        });
    }
    if (modified.tags) {
        const lowerTags = modified.tags.map(t => t.toLowerCase());
        let override = null;
        if (lowerTags.includes('damage_override_cold')) override = 'Cold';
        else if (lowerTags.includes('damage_override_physical')) override = 'Physical';
        else if (lowerTags.includes('damage_override_shadow')) override = 'Shadow';
        else if (lowerTags.includes('damage_override_poison')) override = 'Poison';
        else if (lowerTags.includes('damage_override_lightning')) override = 'Lightning';
        else if (lowerTags.includes('damage_override_fire')) override = 'Fire';
        
        if (override) {
            const elements = ['Cold', 'Physical', 'Shadow', 'Poison', 'Lightning', 'Fire'];
            elements.forEach(el => {
                if (el !== override) {
                    modified.tags = modified.tags.filter(t => t.toLowerCase() !== 'skill_' + el.toLowerCase() && t.toLowerCase() !== 'search_' + el.toLowerCase());
                }
            });
            if (!modified.tags.some(t => t.toLowerCase() === 'skill_' + override.toLowerCase())) modified.tags.push('Skill_' + override);
            if (!modified.tags.some(t => t.toLowerCase() === 'search_' + override.toLowerCase())) modified.tags.push('Search_' + override);
        }
        
        const removeTags = lowerTags.filter(t => t.startsWith('remove_'));
        removeTags.forEach(rt => {
            const targetTag = rt.replace('remove_', '');
            modified.tags = modified.tags.filter(t => t.toLowerCase() !== targetTag && t.toLowerCase() !== targetTag.replace('skill_', 'search_'));
        });
    }

    if (modified.name === "Golem" && currentBuild && currentBuild.bookOfTheDead) {
        let spec = currentBuild.bookOfTheDead.golems?.spec;
        let node = currentBuild.bookOfTheDead.golems?.node;
        
        if (spec === "Blood Golem" && node !== null) {
            modified.secondaryScalars = modified.secondaryScalars || {};
            modified.secondaryScalars.active = {
                scalar: 1.40,
                nameOverride: "Blood Golem Active"
            };
        }
        
        if (node !== null && spec === "Bone Golem" && Number(node) === 2) {
            modified.secondaryScalars = modified.secondaryScalars || {};
            modified.secondaryScalars.bone_spikes = 2.5;
        }
    }

    return modified;
}

function showSkillTooltip(skillObj, e) {
    if (skillObj.name === "Soulrift" && !skillObj.cooldown) {
        skillObj.cooldown = 50;
    }
    if (skillObj.name === "Corpse Tendrils" && !skillObj.luckyHitChance) {
        skillObj.luckyHitChance = 30;
    }
    skillObj = applyActiveModifiers(skillObj);
    
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'skill-tooltip';
        tooltipEl.className = 'd4-tooltip';
        document.body.appendChild(tooltipEl);
    }
    
    let baseRank = getBaseSkillRankFor(skillObj.name);
    let displayRank = baseRank > 0 ? baseRank : 1; // Unlearned skills show rank 1 stats
    
    let tagsHtml = '';
    let dynamicTags = skillObj.tags ? [...skillObj.tags] : [];
    
    if (skillObj.name === "Skeleton Warrior" && currentBuild && currentBuild.bookOfTheDead) {
        let spec = currentBuild.bookOfTheDead.warriors?.spec;
        let node = currentBuild.bookOfTheDead.warriors?.node;
        if (node !== null) {
            dynamicTags = dynamicTags.filter(t => !["Search_Bone", "Search_Blood", "Search_Darkness", "Search_Physical", "Search_Shadow", "Search_Cold", "Damage_Override_Physical", "Damage_Override_Shadow", "Damage_Override_Cold", "Skill_Bone", "Skill_Blood", "Skill_Shadow", "Skill_Cold"].includes(t));
            if (spec === "Skirmisher") {
                dynamicTags.push("Search_Physical", "Search_Bone", "Damage_Override_Physical", "Skill_Bone");
            } else if (spec === "Defender") {
                dynamicTags.push("Search_Physical", "Search_Blood", "Damage_Override_Physical", "Skill_Blood");
            } else if (spec === "Reaper") {
                dynamicTags.push("Search_Shadow", "Search_Darkness", "Damage_Override_Shadow", "Skill_Shadow");
            }
        }
    }
    
    if (skillObj.name === "Skeleton Mage" && currentBuild && currentBuild.bookOfTheDead) {
        let spec = currentBuild.bookOfTheDead.mages?.spec;
        let node = currentBuild.bookOfTheDead.mages?.node;
        if (node !== null) {
            dynamicTags = dynamicTags.filter(t => !["Search_Bone", "Search_Blood", "Search_Darkness", "Search_Physical", "Search_Shadow", "Search_Cold", "Damage_Override_Physical", "Damage_Override_Shadow", "Damage_Override_Cold", "Skill_Bone", "Skill_Blood", "Skill_Shadow", "Skill_Cold"].includes(t));
            if (spec === "Shadow") {
                dynamicTags.push("Search_Shadow", "Search_Darkness", "Damage_Override_Shadow", "Skill_Shadow");
            } else if (spec === "Cold") {
                dynamicTags.push("Search_Cold", "Damage_Override_Cold", "Skill_Cold");
            } else if (spec === "Bone") {
                dynamicTags.push("Search_Physical", "Search_Bone", "Damage_Override_Physical", "Skill_Bone");
            }
        }
    }
    
    if (skillObj.name === "Golem" && currentBuild && currentBuild.bookOfTheDead) {
        let spec = currentBuild.bookOfTheDead.golems?.spec;
        let node = currentBuild.bookOfTheDead.golems?.node;
        if (node !== null) {
            dynamicTags = dynamicTags.filter(t => !["Search_Bone", "Search_Blood", "Search_Darkness", "Search_Physical", "Search_Shadow", "Damage_Override_Physical", "Damage_Override_Shadow", "Skill_Bone", "Skill_Blood", "Skill_Shadow"].includes(t));
            if (spec === "Bone Golem") {
                dynamicTags.push("Search_Physical", "Search_Bone", "Damage_Override_Physical", "Skill_Bone");
            } else if (spec === "Blood Golem") {
                dynamicTags.push("Search_Physical", "Search_Blood", "Damage_Override_Physical", "Skill_Blood");
            } else if (spec === "Iron Golem") {
                dynamicTags.push("Search_Shadow", "Search_Darkness", "Damage_Override_Shadow", "Skill_Shadow");
            }
        }
    }
    
    if (dynamicTags.length > 0) {
        // Find if we have an override
        let hasOverride = dynamicTags.some(t => t.startsWith('Damage_Override_'));
        
        // Filter out Search tags, internal Keywords, and Damage_Override tags
        let cleanTags = dynamicTags.filter(t => !t.startsWith('Search_') && !t.startsWith('Damage_Type_') && !t.startsWith('Damage_Override_') && t !== 'Keyword_Hunter');
        
        // If an override is present, remove the base elemental Skill_ tags so they don't visually conflict
        if (hasOverride) {
            let activeOverride = dynamicTags.find(t => t.startsWith('Damage_Override_'));
            let newElement = activeOverride.replace('Damage_Override_', 'Skill_');
            cleanTags = cleanTags.filter(t => !t.startsWith('Skill_') || t === newElement || t === 'Skill_Macabre' || t === 'Skill_Summoning' || (newElement === 'Skill_Physical' && (t === 'Skill_Bone' || t === 'Skill_Blood')));
        }

        if (cleanTags.length > 0) {
            let tagBoxes = cleanTags.map(t => `<div class="d4-tooltip-tag">${formatTag(t)}</div>`).join('');
            tagsHtml = `<div class="d4-tooltip-tags">${tagBoxes}</div><hr class="d4-divider">`;
        }
    }
    
    let statsHtml = '';
    if (skillObj.resourceCost) {
        statsHtml += `<div><span class="d4-color-label">Essence Cost:</span> <span class="d4-color-number">${skillObj.resourceCost}</span></div>`;
    }
    if (skillObj.cooldown) {
        statsHtml += `<div><span class="d4-color-label">Cooldown:</span> <span class="d4-color-number">${skillObj.cooldown}</span> seconds</div>`;
    }
    if (statsHtml) {
        statsHtml = `<div class="d4-tooltip-stats">${statsHtml}</div>`;
    }
    
    let descHtml = parseD4String(skillObj.description, skillObj, displayRank);
    
    let modifiersHtml = '';
    if (skillObj.modifiers && skillObj.modifiers.length > 0) {
        let activeMods = skillObj.modifiers.filter(mod => window.selectedSkills && window.selectedSkills[mod.name] > 0);
        if (activeMods.length > 0) {
            let modLines = activeMods.map(mod => {
                let mDesc = parseD4String(mod.description, mod, displayRank);
                return `<div class="d4-tooltip-upgrade">&#9830; ${mDesc}</div>`;
            }).join('');
            modifiersHtml = `
                <div class="d4-tooltip-upgrades-header">MODIFIERS</div>
                ${modLines}
            `;
        }
    }
    
    let finalDamageType = skillObj.damageType || "Physical";
    
    // Check overrides first
    if (dynamicTags.includes("Damage_Override_Physical")) finalDamageType = "Physical";
    else if (dynamicTags.includes("Damage_Override_Shadow")) finalDamageType = "Shadow";
    else if (dynamicTags.includes("Damage_Override_Cold")) finalDamageType = "Cold";
    else if (dynamicTags.includes("Damage_Override_Fire")) finalDamageType = "Fire";
    else if (dynamicTags.includes("Damage_Override_Lightning")) finalDamageType = "Lightning";
    else if (dynamicTags.includes("Damage_Override_Poison")) finalDamageType = "Poison";
    else if (dynamicTags.includes("Damage_Override_Blood") || dynamicTags.includes("Damage_Override_Bone")) finalDamageType = "Physical";
    // Then fallback to base skill tags
    else if (dynamicTags.includes("Skill_Physical")) finalDamageType = "Physical";
    else if (dynamicTags.includes("Skill_Shadow")) finalDamageType = "Shadow";
    else if (dynamicTags.includes("Skill_Cold")) finalDamageType = "Cold";
    else if (dynamicTags.includes("Skill_Fire")) finalDamageType = "Fire";
    else if (dynamicTags.includes("Skill_Lightning")) finalDamageType = "Lightning";
    else if (dynamicTags.includes("Skill_Poison")) finalDamageType = "Poison";
    else if (dynamicTags.includes("Skill_Blood") || dynamicTags.includes("Skill_Bone")) finalDamageType = "Physical";

    let dmgTypeIcon = '';
    if (finalDamageType === "Shadow") dmgTypeIcon = '🟣';
    else if (finalDamageType === "Cold") dmgTypeIcon = '❄️';
    else if (finalDamageType === "Fire") dmgTypeIcon = '🔥';
    else if (finalDamageType === "Lightning") dmgTypeIcon = '⚡';
    else if (finalDamageType === "Poison") dmgTypeIcon = '🟢';
    else if (finalDamageType === "Physical") dmgTypeIcon = '⚔️';

        let breakdownHtml = '';
    if (skillObj.baseDamageScalar) {
        let b = getSkillDamageBreakdown(skillObj, displayRank);
        let addStr = Number(((b.additiveMult - 1) * 100).toFixed(6));
        
        breakdownHtml = `
            <div class="d4-tooltip-upgrades-header" style="margin-top: 15px;">DAMAGE BREAKDOWN</div>
            <div style="font-size: 0.9rem; color: #ccc; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>${b.mainStatName} Multiplier:</span> <span style="color: #fff;">x${Number(b.mainStatMult.toFixed(6))}</span>
            </div>
            <div style="font-size: 0.9rem; color: #ccc; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>Additive Stats:</span> <span style="color: #fff;">+${addStr}%</span>
            </div>
            <div style="font-size: 0.9rem; color: #ccc; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>Multiplicative Stats:</span> <span style="color: #fff;">x${Number(b.multiMult.toFixed(6))}</span>
            </div>
            <details style="margin-bottom: 5px;">
              <summary style="font-size: 0.85rem; color: #88a; cursor: pointer; user-select: none;">Show Multipliers</summary>
              <div style="padding-left: 10px; margin-top: 3px;">
                 ${(b.multiplicativeComponents || []).map(comp => 
                   `<div style="font-size: 0.8rem; color: #aaa; display: flex; justify-content: space-between;">
                     <span>${comp.name}</span> <span>x${Number(comp.value.toFixed(4))}</span>
                    </div>`
                 ).join('')}
              </div>
            </details>
            <div style="font-size: 0.95rem; color: #c9a55c; margin-bottom: 5px; margin-top: 5px; display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid #333; padding-top: 5px;">
              <span>Final Damage:</span> <span>${b.minStr} - ${b.maxStr}</span>
            </div>
            <div style="font-size: 0.95rem; color: #f9d85c; margin-bottom: 5px; display: flex; justify-content: space-between; font-weight: bold;">
              <span>Critical Hit:</span> <span>${b.critStrMin} - ${b.critStrMax}</span>
            </div>
        `;
    }

    let footerHtml = `
        <div class="d4-tooltip-footer">
            <span class="d4-tooltip-damage-type type-${finalDamageType.toLowerCase()}">
                ${dmgTypeIcon} ${finalDamageType} Damage
            </span>
        </div>
    `;
    
    tooltipEl.innerHTML = `
        <div class="d4-tooltip-header">${skillObj.name}</div>
        ${tagsHtml}
        ${statsHtml}
        <div class="d4-tooltip-desc">${descHtml}</div>
        ${modifiersHtml}
        ${breakdownHtml}
        ${footerHtml}
    `;
    
    tooltipEl.classList.add('visible');
    moveSkillTooltip(e);
}

function moveSkillTooltip(e) {
    if (!tooltipEl) return;
    
    let x = e.clientX + 15;
    let y = e.clientY + 15;
    
    if (x + 320 > window.innerWidth) x = e.clientX - 335;
    if (y + tooltipEl.offsetHeight > window.innerHeight) y = window.innerHeight - tooltipEl.offsetHeight - 10;
    
    tooltipEl.style.left = x + 'px';
    tooltipEl.style.top = y + 'px';
}

function hideSkillTooltip(e) {
    if (tooltipEl) tooltipEl.classList.remove('visible');
}

function getSpentSkillPoints() {
    return Object.values(window.selectedSkills || {}).reduce((sum, val) => sum + val, 0);
}

function updateSkillPointsUI() {
    const el = document.getElementById('skill-points-spent');
    if (el) {
        const spent = getSpentSkillPoints();
        el.textContent = spent;
        if (spent >= 83) {
            el.style.color = '#ff4444';
        } else {
            el.style.color = '#ffd700';
        }
    }
}


function populateMainSkillSelect() {
    if (!dom.mainSkillSelect) return;
    const currentVal = dom.mainSkillSelect.value;
    dom.mainSkillSelect.innerHTML = '<option value="">-- Custom --</option>';
    
    if (typeof skillsDatabase !== 'undefined' && currentBuild && currentBuild.class) {
        const clsDb = skillsDatabase; // The global skillsDatabase has categories with skills
        // Actually skillsDatabase has categories like 'Basic', 'Core'
        for (const cat in clsDb) {
            clsDb[cat].forEach(s => {
                const opt = document.createElement('option');
                opt.value = s.name;
                opt.textContent = s.name;
                dom.mainSkillSelect.appendChild(opt);
            });
        }
    }
    
    // Restore value if possible
    if (currentVal) {
        dom.mainSkillSelect.value = currentVal;
    }
}

function renderSkills() { 
  const container = document.getElementById('skills-container'); 
  if (!container) return; 
  container.innerHTML = ''; 
  if (typeof skillsDatabase === 'undefined') return;

  // Dynamically update Skeleton Warrior tags and damage type based on Book of the Dead
  if (typeof updateDynamicSkillTags === 'function') updateDynamicSkillTags();


  for (const [category, skills] of Object.entries(skillsDatabase)) { 
    skills.forEach(skill => {
        if (!skill.modifiers && skill.enhancement) {
            skill.modifiers = [
                { name: skill.enhancement.name, maxRank: skill.enhancement.maxRank }
            ];
            if (skill.enhancement.branches) {
                skill.enhancement.branches.forEach(b => {
                    skill.modifiers.push({ name: b.name, maxRank: b.maxRank });
                });
            }
        }
    });
  }
 
  
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '40px';
  
  for (const [category, skills] of Object.entries(skillsDatabase)) { 
    const catDiv = document.createElement('div'); 
    catDiv.className = 'skill-category skill-paperdoll-wrapper'; 
    catDiv.style.width = '100%';
    catDiv.style.boxSizing = 'border-box';
    
    const catTitle = document.createElement('h3'); 
    catTitle.className = 'skill-paperdoll-title'; 
    catTitle.textContent = category.endsWith('Skills') ? category : category + ' Skills'; 
    catDiv.appendChild(catTitle); 
    
    const skillsList = document.createElement('div'); 
    skillsList.className = 'skill-list'; 
    skillsList.style.display = 'flex';
    skillsList.style.flexDirection = 'row';
    skillsList.style.flexWrap = 'wrap';
    skillsList.style.justifyContent = 'center';
    skillsList.style.gap = '40px';
    
    skills.forEach(skill => { 
      const pdContainer = document.createElement('div');
      pdContainer.style.display = 'flex';
      pdContainer.style.flexDirection = 'column';
      pdContainer.style.alignItems = 'flex-start';
      
      const pdTitle = document.createElement('div');
      pdTitle.style.color = '#fff';
      pdTitle.style.marginBottom = '8px';
      pdTitle.style.fontWeight = 'bold';
      pdTitle.style.fontSize = '16px';
      pdTitle.style.borderBottom = '1px solid #444';
      pdTitle.style.paddingBottom = '4px';
      pdTitle.style.width = '100%';
      pdTitle.textContent = skill.name;
      pdContainer.appendChild(pdTitle);
      
      const pd = document.createElement('div');
      pd.className = 'skill-compact-grid';
      
      const createSlot = (name, maxRank, isBase, index, category, baseSkillName, skillObj) => {
          const slot = document.createElement('div');
          
          let slotClass = 'paperdoll-slot';
          if (isBase) slotClass += ' pd-base';
          else if (index < 3) slotClass += ' pd-dia pd-mod-' + index;
          else slotClass += ' pd-cir pd-mod-' + index;
          
          slot.className = slotClass;
          slot.title = name;
          
          slot.onmouseenter = (e) => showSkillTooltip(skillObj, e);
          slot.onmousemove = (e) => moveSkillTooltip(e);
          slot.onmouseleave = (e) => hideSkillTooltip(e);
          
          // Execute image loading for all categories
          if (true) {
              let imgName = name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
              let clsName = currentBuild.class || 'Necromancer';
              let imgSrc = `assets/Skills/${clsName}/${imgName}.png`;
              
              const img = document.createElement('img');
              img.src = imgSrc;
              img.onerror = () => { 
                  // If the direct name fails, try appending the base skill name (e.g. crowd-control-decompose.png)
                  if (!isBase && baseSkillName && img.src.includes(imgSrc)) {
                      let baseName = baseSkillName.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
                      img.src = `assets/Skills/${clsName}/${imgName}-${baseName}.png`;
                  } else {
                      img.style.display = 'none'; 
                  }
              };
              const imgContainer = document.createElement('div');
              imgContainer.className = 'pd-img-container';
              imgContainer.appendChild(img);
              slot.appendChild(imgContainer);
          }
          
          const rankDisplay = document.createElement('div');
          rankDisplay.className = 'paperdoll-rank';
          rankDisplay.textContent = (window.selectedSkills[name] || 0) + '/' + maxRank;
          slot.appendChild(rankDisplay);
          
          const updateDisplay = () => {
              rankDisplay.textContent = (window.selectedSkills[name] || 0) + '/' + maxRank;
              if (window.selectedSkills[name] > 0) slot.classList.add('active');
              else slot.classList.remove('active');
              updateSkillPointsUI();
          };
          updateDisplay();
          
          slot.onclick = (e) => {
              // Restriction: must have a point in base skill to add points to its modifiers
              if (!isBase && (!window.selectedSkills[baseSkillName] || window.selectedSkills[baseSkillName] === 0)) {
                  return; // Do nothing if base skill has no points
              }
              const cur = window.selectedSkills[name] || 0;
              if (cur < maxRank) {
                  let spent = getSpentSkillPoints();
                  if (spent >= 83) {
                      return; // Max points reached
                  }
                  
                  if (!isBase && skillsDatabase[category]) {
                      // Mutual Exclusivity logic per row
                      const baseSkillData = skillsDatabase[category].find(s => s.name === baseSkillName);
                      if (baseSkillData && baseSkillData.modifiers) {
                          let groupIndices = [];
                          if (index >= 0 && index <= 2) groupIndices = [0, 1, 2];
                          else if (index >= 3 && index <= 4) groupIndices = [3, 4];
                          else if (index >= 5 && index <= 6) groupIndices = [5, 6];
                          
                          groupIndices.forEach(idx => {
                              if (idx !== index && baseSkillData.modifiers[idx]) {
                                  const modName = baseSkillData.modifiers[idx].name;
                                  if (window.selectedSkills[modName] > 0) {
                                      delete window.selectedSkills[modName];
                                  }
                              }
                          });
                          // We need a brief timeout to let the global UI refresh to clear active states of wiped siblings
                          setTimeout(() => renderSkills(), 10);
                      }
                  }

                  if (e.shiftKey) {
                      // Fill up the skill as much as possible up to maxRank or global cap
                      let availablePoints = 83 - spent;
                      let pointsToMax = maxRank - cur;
                      let pointsToAdd = Math.min(availablePoints, pointsToMax);
                      window.selectedSkills[name] = cur + pointsToAdd;
                  } else {
                      window.selectedSkills[name] = cur + 1;
                  }
                  
                  updateDisplay();
                  if (typeof recalculate === 'function') recalculate();
                  if (typeof saveBuild === 'function') saveBuild();
                  showSkillTooltip(skillObj, e);
              }
          };
          
          slot.oncontextmenu = (e) => {
              e.preventDefault();
              if (window.selectedSkills[name] > 0) {
                  if (e.shiftKey) {
                      window.selectedSkills[name] = 0; // Wipe all points from this skill
                  } else {
                      window.selectedSkills[name]--;
                  }
                  
                  if (window.selectedSkills[name] === 0) {
                      delete window.selectedSkills[name];
                      // Restriction: If a base skill drops to 0, automatically clear all its modifiers
                      if (isBase && skillsDatabase[category]) {
                          const skillData = skillsDatabase[category].find(s => s.name === name);
                          if (skillData && skillData.modifiers) {
                              skillData.modifiers.forEach(mod => {
                                  delete window.selectedSkills[mod.name];
                              });
                          }
                          // We need to trigger a full UI refresh to clear the active classes from the modifiers
                          setTimeout(() => renderSkills(), 10);
                      }
                  }
                  updateDisplay();
                  if (typeof recalculate === 'function') recalculate();
                  if (typeof saveBuild === 'function') saveBuild();
                  showSkillTooltip(skillObj, e);
              }
          };
          
          return slot;
      };
      
      pd.appendChild(createSlot(skill.name, skill.maxRank, true, -1, category, skill.name, skill));
      
      if (skill.modifiers && skill.modifiers.length > 0) {
          skill.modifiers.forEach((mod, idx) => {
              pd.appendChild(createSlot(mod.name, mod.maxRank, false, idx, category, skill.name, mod));
          });
      }
      
      pdContainer.appendChild(pd);
      skillsList.appendChild(pdContainer); 
    }); 
    catDiv.appendChild(skillsList); 
    container.appendChild(catDiv); 
  } 
}
function createSkillRow(name, maxRank, indentLevel, parentName = null, exclusiveSiblings = []) { 
  const row = document.createElement('div'); 
  row.className = 'skill-row indent-' + indentLevel; 
  const nameSpan = document.createElement('span'); 
  nameSpan.className = 'skill-name'; 
  nameSpan.style.display = 'flex';
  nameSpan.style.alignItems = 'center';
  nameSpan.style.gap = '8px';
  
  let prefix = indentLevel > 0 ? '<span style="color:#666; margin-right: 4px;">└</span>' : '';
  let imgName = name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
  let clsName = currentBuild.class || 'Necromancer';
  let imgSrc = `assets/Skills/${clsName}/${imgName}.png`;
  
  nameSpan.innerHTML = prefix + `<img src="${imgSrc}" style="width:24px; height:24px; border:1px solid #333;" onerror="this.outerHTML='<div style=\'width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #222; color: #888;\'>?</div>'" />` + `<span>${name}</span>`; 
  const controls = document.createElement('div'); 
  controls.className = 'skill-controls'; 
  const minusBtn = document.createElement('button'); 
  minusBtn.textContent = '-'; 
  minusBtn.className = 'skill-btn'; 
  const rankDisplay = document.createElement('span'); 
  rankDisplay.className = 'skill-rank'; 
  const currentRank = window.selectedSkills[name] || 0; 
  rankDisplay.textContent = currentRank + ' / ' + maxRank; 
  const plusBtn = document.createElement('button'); 
  plusBtn.textContent = '+'; 
  plusBtn.className = 'skill-btn'; 
  const updateDisplay = () => { 
    rankDisplay.textContent = (window.selectedSkills[name] || 0) + ' / ' + maxRank; 
    if (window.selectedSkills[name] > 0) row.classList.add('active'); 
    else row.classList.remove('active'); 
  }; 
  minusBtn.onclick = () => { 
    if (window.selectedSkills[name] > 0) { 
      window.selectedSkills[name]--; 
      if (window.selectedSkills[name] === 0) delete window.selectedSkills[name]; 
      updateDisplay(); 
      if (typeof recalculate === 'function') recalculate(); 
      if (typeof saveBuild === 'function') saveBuild();
    } 
  }; 
  plusBtn.onclick = () => { 
    const current = window.selectedSkills[name] || 0; 
    if (parentName && (!window.selectedSkills[parentName] || window.selectedSkills[parentName] === 0)) return; 
    if (current < maxRank) { 
      if (exclusiveSiblings.length > 0) { 
        let hasSibling = false; 
        exclusiveSiblings.forEach(sib => { 
          if (sib !== name && window.selectedSkills[sib] > 0) hasSibling = true; 
        }); 
        if (hasSibling) return; 
      } 
      window.selectedSkills[name] = current + 1; 
      updateDisplay(); 
      if (typeof recalculate === 'function') recalculate(); 
      if (typeof saveBuild === 'function') saveBuild();
    } 
  }; 
  updateDisplay(); 
  controls.appendChild(minusBtn); 
  controls.appendChild(rankDisplay); 
  controls.appendChild(plusBtn); 
  row.appendChild(nameSpan); 
  row.appendChild(controls); 
  return row; 
}
  function start() {
    init();
    
    try {
      const autosave = JSON.parse(localStorage.getItem(AUTOSAVE_KEY));
      if (autosave && typeof autosave === 'object') {
        loadBuildToUI(autosave);
        return; // We loaded successfully, skip default render
      }
    } catch(e) {}
    
    // If we didn't load a build, run the default render
    
    
    
    renderEquipment(dom.classSelect ? dom.classSelect.textContent : 'Barbarian', {});
  }

  let currentModalSlot = null;

  function switchModalTab(tabName) {
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
    [selectBody, editBody, aspectBody, modifierBody, temperBody, transfigureBody, gemBody].forEach(b => { if(b) b.style.display = 'none'; });

    if (tabName === 'select') {
      selectTab?.classList.add('active');
      if (selectBody) selectBody.style.display = 'flex';
    } else if (tabName === 'edit') {
      editTab?.classList.add('active');
      if (editBody) editBody.style.display = 'flex';
    } else if (tabName === 'aspect') {
      if (aspectBody) aspectBody.style.display = 'flex';
    } else if (tabName === 'modifiers') {
      if (modifierBody) modifierBody.style.display = 'flex';
    } else if (tabName === 'temper' || tabName === 'tempering') {
      if (temperBody) temperBody.style.display = 'flex';
    } else if (tabName === 'transfigure') {
      if (transfigureBody) transfigureBody.style.display = 'flex';
    } else if (tabName === 'gem') {
      if (gemBody) gemBody.style.display = 'flex';
    }
  }

  function renderEditTab(slotName) {
      const editBody = document.getElementById('item-modal-edit-body');
      const box = document.querySelector(`.equipment-slot-box[data-slot="${slotName}"]`);
      const tabs = document.querySelectorAll('.item-modal-tab');
      const editTabBtn = tabs[1];
      
      if (!editBody || !box) return;
  
      if (!box.dataset.value) {
        if (editTabBtn) editTabBtn.disabled = true;
        editBody.innerHTML = '';
        return;
      }
      
      if (editTabBtn) editTabBtn.disabled = false;
    
    let itemObj;
    try {
      itemObj = JSON.parse(box.dataset.value);
    } catch(e) {
      itemObj = { name: box.dataset.value, power: 900, quality: 0 };
    }
    
    let rarity = 'rare';
    const dbItems = getDbItems(slotName);
    const foundItem = dbItems.find(i => i.name === itemObj.name);
    if (foundItem) {
rarity = foundItem.rarity;
    }
    
    // Get current class from DOM
    const currentClassVal = document.getElementById('class-select').textContent;
    const classIdx = D4_CLASS_MAP[currentClassVal];
    let mapped = slotName.toLowerCase();
    if (mapped === 'left ring' || mapped === 'right ring') mapped = 'ring';
    if (mapped === 'chest armor') mapped = 'chest';
    if (mapped === 'mainhand' || mapped === 'offhand' || mapped === 'weapon1' || mapped === 'weapon2' || mapped === 'ranged weapon') {
       if (mapped.startsWith('weapon') || mapped === 'ranged weapon') mapped = 'mainhand';
    }

    const classData = window.D4_DATABASE?.classData?.[currentClassVal]?.equipment?.[mapped] || {};
    const regularAffixes = classData.modifiers || [];
    const temperAffixes = classData.tempers || [];

    const affixesDatalist = `<datalist id="affixes-list">${regularAffixes.map(a => `<option value="${a.name}">${a.name}</option>`).join('')}</datalist>`;
    const temperDatalist = `<datalist id="temper-list">${temperAffixes.map(a => `<option value="${a.name}">${a.name}</option>`).join('')}</datalist>`;
    
    // Determine allowed aspect categories based on slot
    const slotCategories = {
      'helm': ['Defensive', 'Utility', 'Resource'],
      'chest armor': ['Defensive', 'Utility'],
      'gloves': ['Offensive', 'Utility'],
      'pants': ['Defensive', 'Utility'],
      'boots': ['Utility', 'Mobility'],
      'amulet': ['Offensive', 'Defensive', 'Utility', 'Resource', 'Mobility'],
      'left ring': ['Offensive', 'Resource'],
      'right ring': ['Offensive', 'Resource'],
      'weapon1': ['Offensive'],
      'weapon2': ['Offensive'],
      'mainhand': ['Offensive'],
      'offhand': ['Offensive', 'Defensive', 'Utility']
    };
    const allowedCats = slotCategories[slotName.toLowerCase()] || [];

    const aspectsOptions = (window.D4_DATABASE?.aspects || [])
      .filter(a => {
        if (classIdx !== undefined && a.classes && a.classes[classIdx] !== 1) return false;
        if (!a.category) return true;
        return allowedCats.some(c => a.category.includes(c));
      })
      .map(a => `<option value="${a.name}">${a.name}</option>`).join('');
    const aspectsDatalist = `<datalist id="aspects-list">${aspectsOptions}</datalist>`;

    let aspectSection = '';
    if (rarity !== 'mythic' && rarity !== 'unique') {
      const currentAspectName = itemObj.aspect || 'None';
      let aspectDescHtml = '';
      if (currentAspectName !== 'None') {
        const aspectObj = (window.D4_DATABASE?.aspects || []).find(a => a.name === currentAspectName);
        if (aspectObj && aspectObj.desc) {
          let aspectMult = getAspectMultiplier(slotName, itemObj);

          const vals = itemObj.aspectValues || [];
          let valIndex = 0;
          aspectDescHtml = aspectObj.desc.replace(/(?:\[([\d\.,]+)\s*-\s*([\d\.,]+)\])|#/g, (match, minStr, maxStr) => {
            let min = minStr ? parseFloat(minStr.replace(/,/g, '')) * aspectMult : (aspectObj.minVal ? parseFloat(aspectObj.minVal) * aspectMult : null);
            let max = maxStr ? parseFloat(maxStr.replace(/,/g, '')) * aspectMult : (aspectObj.maxVal ? parseFloat(aspectObj.maxVal) * aspectMult : null);
            
            if (min !== null) min = parseFloat(min.toFixed(2));
            if (max !== null) max = parseFloat(max.toFixed(2));

            // Custom integer rounding overrides
            if (aspectObj.name === 'Tidal Aspect') {
                if (min !== null) min = Math.floor(min);
                if (max !== null) max = Math.floor(max);
            }

            let v = vals[valIndex] !== undefined ? vals[valIndex] : (max || min || 0);
            if (typeof v === 'string') v = parseFloat(v.replace(/,/g, ''));
            v = parseFloat(Number(v).toFixed(2));

            let placeholder = (min !== null && max !== null) ? `${min}-${max}` : 'value';
            let minAttr = min !== null ? ` min="${min}"` : '';
              let maxAttr = max !== null ? ` max="${max}"` : '';
            let stepAttr = (min !== null && !Number.isInteger(min)) || (max !== null && !Number.isInteger(max)) ? ' step="0.1"' : ' step="1"';
            if (min === null && max === null) stepAttr = ' step="any"';
            const inputHtml = `<input type="number" class="aspect-val-input" data-idx="${valIndex}" value="${v}" placeholder="${placeholder}" title="${placeholder}"${minAttr}${maxAttr}${stepAttr} style="width: 56px; padding: 2px 4px; text-align: center; border: 1px solid #555; border-radius: 3px; background: rgba(0,0,0,0.5); color: #8ab4f8; font-family: inherit; font-size: 0.9em; margin: 0 2px;">`;
            valIndex++;
            return inputHtml;
          });
          aspectDescHtml = `<div style="margin-top: 8px; color: #d18a45; font-size: 0.9rem; line-height: 1.5;">${aspectDescHtml}</div>`;
        }
      }
      
      aspectSection = `
        <div class="edit-section">
          <div class="edit-section-title orange" style="display: flex; justify-content: space-between; align-items: center;">
            <span>Legendary Aspect</span>
            <button class="edit-btn" id="btn-select-aspect" style="padding: 2px 8px; font-size: 0.75rem;">Change</button>
          </div>
          <div class="edit-section-content" style="padding: 4px 0;">
            <div style="color: var(--text-primary); font-size: 0.95rem; font-weight: 500;">${currentAspectName}</div>
            ${aspectDescHtml}
          </div>
        </div>
      `;
    } else {
      let uniqueDescHtml = '';
      const uniqueObj = (window.D4_DATABASE?.uniques || []).find(u => u.name === itemObj.name);
      if (uniqueObj && uniqueObj.desc) {
        const vals = itemObj.aspectValues || [];
        let valIndex = 0;
        uniqueDescHtml = uniqueObj.desc.replace(/(?:\[([\d\.,]+)\s*-\s*([\d\.,]+)\])|#/g, (match, min, max) => {
          let v = vals[valIndex] !== undefined ? vals[valIndex] : (max || min || 0);
          if (typeof v === 'string') v = v.replace(/,/g, '');
          let placeholder = min && max ? `${min}-${max}` : 'value';
          let minAttr = min ? ` min="${min}"` : '';
            let maxAttr = max ? ` max="${max}"` : '';
            let stepAttr = (min && min.includes('.')) || (max && max.includes('.')) ? ' step="0.1"' : ' step="1"';
          if (!min && !max) stepAttr = ' step="any"';
          const inputHtml = `<input type="number" class="aspect-val-input" data-idx="${valIndex}" value="${v}" placeholder="${placeholder}" title="${placeholder}"${minAttr}${maxAttr}${stepAttr} style="width: 56px; padding: 2px 4px; text-align: center; border: 1px solid #555; border-radius: 3px; background: rgba(0,0,0,0.5); color: #d18a45; font-family: inherit; font-size: 0.9em; margin: 0 2px;">`;
          valIndex++;
          return inputHtml;
        });
        uniqueDescHtml = `<div style="margin-top: 8px; color: #d18a45; font-size: 0.9rem; line-height: 1.5;">${uniqueDescHtml}</div>`;
      }
      
      aspectSection = `
        <div class="edit-section">
          <div class="edit-section-title orange">Unique Power</div>
          <div class="edit-section-content" style="padding: 4px 0;">
            ${uniqueDescHtml}
          </div>
        </div>
      `;
    }

    // Helper to render Affix Row (Option A style)
    function renderAffixRow(idx, type) {
      let arr = itemObj.affixes;
      let valuesArr = itemObj.affixValues || {};
      let placeholderText = 'Modifier';
      let datalistId = 'affixes-list';
      
      if (type === 'temper') {
        arr = itemObj.tempering;
        valuesArr = itemObj.temperValues || {};
        placeholderText = 'Tempering';
        datalistId = 'temper-list';
      } else if (type === 'transfigure') {
        arr = itemObj.transfigure;
        valuesArr = itemObj.transfigureValues || {};
        placeholderText = 'Transfigure';
        datalistId = 'affixes-list'; // transfigures share the same affix
      }
      
      const currentName = arr && arr[idx] ? arr[idx] : '';
      const vals = valuesArr[idx] || [];
      
      let obj;
      
      // Determine mapped slot name to match hierarchy keys
      let mappedSlot = slotName.toLowerCase();
      if (mappedSlot === 'left ring' || mappedSlot === 'right ring') mappedSlot = 'ring';
      if (mappedSlot === 'chest armor') mappedSlot = 'chest';
      if (mappedSlot === 'mainhand' || mappedSlot === 'offhand' || mappedSlot === 'weapon1' || mappedSlot === 'weapon2' || mappedSlot === 'ranged weapon') {
         if (mappedSlot.startsWith('weapon') || mappedSlot === 'ranged weapon') mappedSlot = 'mainhand';
      }

      // Read from active class hierarchy
      const currentClassVal = document.getElementById('class-select').textContent;
      const classData = window.D4_DATABASE?.classData?.[currentClassVal]?.equipment?.[mappedSlot] || {};
      
      let dbItems = [];
      if (type === 'affix') dbItems = classData.modifiers || [];
      else if (type === 'temper') dbItems = classData.tempers || [];
      else if (type === 'transfigure') dbItems = classData.transfigures || [];

      let isGA = false;
      if (type === 'affix') isGA = itemObj.greaterAffixes?.[idx] || false;
      if (type === 'temper') isGA = itemObj.greaterTempers?.[idx] || false;
      const gaBonus = isGA ? 0.25 : 0;

      let isCapstone = false;
      if (itemObj.capstoneBonus && itemObj.capstoneBonus.type === type && itemObj.capstoneBonus.idx === idx) {
          isCapstone = true;
      }
      const capstoneBonus = isCapstone ? 0.50 : 0;

      obj = dbItems.find(a => a.name === currentName);
      if (!obj && currentName) {
        obj = dbItems.find(a => a.name.toLowerCase().includes(currentName.toLowerCase()));
        if (obj) {
          if (arr) arr[idx] = obj.name; // sync it back
        } else {
          // Allow custom manual entry if no match is found
          obj = { name: currentName, desc: currentName };
        }
      }
      
      if (!currentName) {
        return `<div class="btn-change-affix empty-affix-slot" data-type="${type}" data-idx="${idx}">Search for ${placeholderText}...</div>`;
      }
      
      let valIndex = 0;
      let descHtml = obj.name.replace(/(?:\[([\d\.,]+)\s*-\s*([\d\.,]+)\])|#/g, (match, min, max) => {
        let v = vals[valIndex] !== undefined ? vals[valIndex] : (max || min || 0);
        if (typeof v === 'string') v = v.replace(/,/g, '');
        
        let displayV = v;
        const effQ = getEffectiveQuality(itemObj);
        const twoHandedMult = checkIs2H(itemObj, slotName) ? 2 : 1;
        const qMult = (1 + (effQ * 0.01) + gaBonus + capstoneBonus) * twoHandedMult;
        if (typeof displayV === 'number' || (typeof displayV === 'string' && !isNaN(parseFloat(displayV)))) {
           // Skip scaling if it is the "Item Quality" transfigure!
           if (currentName && currentName.includes('Item Quality')) {
               // keep it exactly as it is (it doesn't scale)
               displayV = parseFloat(displayV).toFixed(1).replace(/\.0$/, '');
           } else {
               displayV = (parseFloat(displayV) * qMult).toFixed(1).replace(/\.0$/, '');
           }
        }

        let placeholder = min && max ? `${min}-${max}` : 'value';
        
        let minAttr = '';
        if (min) {
            if (currentName && currentName.includes('Item Quality')) {
                let minRaw = parseFloat(min.replace(/,/g, '')).toFixed(1).replace(/\.0$/, '');
                minAttr = ` min="${minRaw}"`;
            } else {
                let minScaled = (parseFloat(min.replace(/,/g, '')) * qMult).toFixed(1).replace(/\.0$/, '');
                minAttr = ` min="${minScaled}"`;
            }
        }
        let maxAttr = ''; // Allow overriding max for higher item power tiers
        if (max && !(currentName && currentName.includes('Item Quality'))) {
            let maxScaled = (parseFloat(max.replace(/,/g, '')) * qMult).toFixed(1).replace(/\.0$/, '');
            maxAttr = ` max="${maxScaled}"`;
        }
        
        let stepAttr = (min && min.includes('.')) || (max && max.includes('.')) ? ' step="0.1"' : ' step="1"';
        if (!min && !max) stepAttr = ' step="any"';
        const inputHtml = `<input type="number" class="affix-val-input" data-type="${type}" data-group="${idx}" data-idx="${valIndex}" data-baseval="${v}" value="${displayV}" placeholder="${placeholderText}" title="${placeholderText}"${minAttr}${maxAttr}${stepAttr} style="width: 56px; padding: 2px 4px; text-align: center; border: 1px solid #555; border-radius: 3px; background: rgba(0,0,0,0.5); color: #fff; font-family: inherit; font-size: 0.9em; margin: 0 2px;">`;
        valIndex++;
        return inputHtml;
      });
      
      const isItemQuality = currentName && currentName.includes('Item Quality');
      
      const gaColor = isGA ? '#ffea00' : '#555';
      const gaIcon = type !== 'transfigure' ? `<span class="btn-toggle-ga" data-type="${type}" data-idx="${idx}" style="color: ${gaColor}; margin-right: 8px; cursor: pointer; font-size: 1.2em;" title="Toggle Greater Affix">❋</span>` : '';
      
      const capstoneColor = isCapstone ? '#00e5ff' : '#555';
      const capstoneIcon = (type !== 'transfigure' || !isItemQuality) ? `<span class="btn-toggle-capstone" data-type="${type}" data-idx="${idx}" style="color: ${capstoneColor}; margin-right: 8px; cursor: pointer; font-size: 1.2em;" title="Toggle Capstone Bonus">◈</span>` : '';
      
      return `
        <div class="affix-filled-row" style="display: flex; align-items: center; justify-content: space-between;">
          <div style="font-size: 0.9rem; line-height: 1.5; color: #ccc; flex: 1;">
            <span style="color: #ff5555; margin-right: 4px; cursor: pointer;" class="btn-remove-affix" data-type="${type}" data-idx="${idx}" title="Remove">✖</span> ${descHtml}
          </div>
          <div style="display: flex; align-items: center;">
            ${gaIcon}
            ${capstoneIcon}
            <button class="edit-btn btn-change-affix" data-type="${type}" data-idx="${idx}" style="padding: 2px 8px; font-size: 0.75rem;">Change</button>
          </div>
        </div>
      `;
    }

    editBody.innerHTML = `
      ${aspectsDatalist}
      ${affixesDatalist}
      ${temperDatalist}
      ${(() => {
        let dbSlotName = slotName;
        if (slotName === 'Left Ring' || slotName === 'Right Ring') dbSlotName = 'Ring';
        const baseItem = window.D4_DATABASE.itemDatabase[dbSlotName]?.find(i => i.name === itemObj.name) || {};
        let extraWeaponInfo = '';
        const effQ = getEffectiveQuality(itemObj);
        const qMult = 1 + (effQ * 0.01);
        
        if (baseItem.armor) {
          const scaledArmor = Math.floor(baseItem.armor * qMult);
          extraWeaponInfo += `<div style="font-size:15px; color:#fff; font-weight: bold; margin-top: 4px;">${scaledArmor.toLocaleString()} Armor</div>`;
        }
        if (baseItem.blockChance) {
          extraWeaponInfo += `<div style="font-size:15px; color:#fff; font-weight: bold; margin-top: 4px;">${baseItem.blockChance}% Block Chance</div>`;
        }
        if (baseItem.resistance) {
          const scaledRes = Math.floor(baseItem.resistance * qMult);
          extraWeaponInfo += `<div style="font-size:15px; color:#fff; font-weight: bold; margin-top: 4px;">${scaledRes.toLocaleString()} Resistance to All Elements</div>`;
        }
        if (baseItem.weaponType) {
          extraWeaponInfo += `<div style="font-size:13px; color:#ccc; margin-top: 4px;">Type: <span style="color:#fff;">${baseItem.weaponType}</span></div>`;
          if (baseItem.damageRange) {
             let dmgStr = baseItem.damageRange;
             const match = dmgStr.match(/([\d,]+)\s*-\s*([\d,]+)/);
             if (match) {
                 const min = Math.floor(parseFloat(match[1].replace(/,/g, '')) * qMult);
                 const max = Math.floor(parseFloat(match[2].replace(/,/g, '')) * qMult);
                 dmgStr = `${min.toLocaleString()} - ${max.toLocaleString()}`;
             }
             extraWeaponInfo += `<div style="font-size:13px; color:#ccc;">Damage: <span style="color:#fff;">${dmgStr}</span></div>`;
          }
          if (baseItem.weaponSpeed) extraWeaponInfo += `<div style="font-size:13px; color:#ccc;">Speed: <span style="color:#fff;">${baseItem.weaponSpeed}</span></div>`;
        }
        return `
        <div class="edit-header">
          <div class="edit-icon-large">${rarity === 'mythic' ? 'M' : (rarity === 'unique' ? 'U' : (rarity === 'legendary' ? 'L' : 'R'))}</div>
          <div class="edit-title-area">
            <div class="edit-item-name rarity-${rarity}">${itemObj.name}</div>
            <div class="edit-input-row">
              <input type="number" id="edit-power" value="${itemObj.power || 900}"> Item Power
              &nbsp;&nbsp; Quality: &nbsp; <input type="number" id="edit-quality" value="${itemObj.quality || 0}" min="0" max="25" style="width:50px;"> &nbsp; / 25
            </div>
            <div id="extra-info-container">${extraWeaponInfo}</div>
          </div>
        </div>
        `;
      })()}
      
      <div class="edit-actions">
        <button class="edit-btn" id="btn-change-item">🔄 Change Item</button>
        <button class="edit-btn" id="btn-unequip-item">✖ Unequip</button>
        <button class="edit-btn" id="btn-delete-item">🗑 Delete</button>
      </div>

      <div class="edit-section">
        <div class="edit-section-title">Transfigure</div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${renderAffixRow(0, 'transfigure')}
        </div>
      </div>

      <div class="edit-section">
        <div class="edit-section-title">Modifiers</div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${renderAffixRow(0, 'affix')}
          ${renderAffixRow(1, 'affix')}
          ${renderAffixRow(2, 'affix')}
          ${renderAffixRow(3, 'affix')}
        </div>
      </div>

      <div class="edit-section">
        <div class="edit-section-title">Tempering</div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${renderAffixRow(0, 'temper')}
        </div>
      </div>

      ${aspectSection}

      ${(() => {
        const lowerSlot = slotName.toLowerCase();
        let maxSockets = getMaxSockets(slotName, itemObj);
        if (maxSockets === 0) return '';
        
        let socketsHtml = '';
        for (let i = 0; i < maxSockets; i++) {
          const gemName = (itemObj.sockets && itemObj.sockets[i]) ? itemObj.sockets[i] : null;
          if (gemName) {
            const gemObj = window.D4_DATABASE?.gems?.find(g => g.name === gemName);
            const runeObj = window.D4_DATABASE?.runes?.find(r => r.name === gemName);
            let effectStr = gemName;
            if (gemObj) {
                const sName = slotName.toLowerCase();
                const isWeapon = sName.includes('weapon') || sName === 'mainhand' || sName === 'offhand' || sName.includes('slicing');
                const isArmor = sName === 'helm' || sName === 'chest armor' || sName === 'pants' || sName === 'boots' || sName === 'gloves';
                const isJewelry = sName === 'amulet' || sName.includes('ring');
                
                if (isWeapon) effectStr = gemObj.weaponEffect;
                else if (isArmor) effectStr = gemObj.armorEffect;
                else if (isJewelry) effectStr = gemObj.jewelryEffect;
            } else if (runeObj) {
                effectStr = runeObj.description;
            }
            
            // Format number specifically for potential future scaling (Gem Strength)
            let formattedEffect = effectStr.replace(/([\d\.]+)/, `<span class="gem-val" data-base="$1" style="color: #fff; font-weight: bold;">$1</span>`);
            
            socketsHtml += `
              <div class="affix-filled-row" style="margin-bottom: 4px; display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 4px; border: 1px solid #333;">
                <div style="font-size: 0.9rem; line-height: 1.5; color: #ccc; flex: 1;">
                  <span style="color: #ff5555; margin-right: 4px; cursor: pointer;" class="btn-remove-socket" data-idx="${i}" title="Remove">✖</span>
                  <strong style="color: #d18a45; margin-right: 4px; font-size: 0.85em;">${gemName}:</strong> ${formattedEffect}
                </div>
                <button class="edit-btn btn-socket" data-idx="${i}" style="padding: 2px 8px; font-size: 0.75rem;">Change</button>
              </div>
            `;
          } else {
            socketsHtml += `<div class="empty-affix-slot btn-socket" data-idx="${i}" style="margin-bottom: 4px; cursor: pointer;">Search for Socket...</div>`;
          }
        }

        return `
        <div class="edit-section">
          <div class="edit-section-title tan">Sockets</div>
          <div class="edit-section-content" style="display: flex; flex-direction: column; gap: 4px;">
            ${socketsHtml}
          </div>
        </div>
        `;
      })()}
    `;

    document.getElementById('btn-change-item').addEventListener('click', () => switchModalTab('select'));
    document.getElementById('btn-unequip-item').addEventListener('click', () => selectItem(''));
    document.getElementById('btn-delete-item').addEventListener('click', () => selectItem(''));
    
    const btnSelectAspect = document.getElementById('btn-select-aspect');
    if (btnSelectAspect) {
      btnSelectAspect.addEventListener('click', () => switchModalTab('aspect'));
    }

    document.querySelectorAll('.btn-socket').forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.currentSocketIndex = parseInt(e.target.dataset.idx);
        switchModalTab('gem');
      });
    });

    ['edit-power', 'edit-quality'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          itemObj[id === 'edit-power' ? 'power' : 'quality'] = parseInt(el.value) || 0;
          box.dataset.value = JSON.stringify(itemObj);
          calculate();
          
          if (id === 'edit-quality') {
             const effQ = getEffectiveQuality(itemObj);
             const qMult = 1 + (effQ * 0.01);
             
             // 1. Update extraWeaponInfo
             const container = document.getElementById('extra-info-container');
             if (container) {
                let dbSlotName = slotName;
                if (slotName === 'Left Ring' || slotName === 'Right Ring') dbSlotName = 'Ring';
                const baseItem = window.D4_DATABASE.itemDatabase[dbSlotName]?.find(i => i.name === itemObj.name) || {};
                let extraInfo = '';
                if (baseItem.armor) {
                  const scaledArmor = Math.floor(baseItem.armor * qMult);
                  extraInfo += `<div style="font-size:15px; color:#fff; font-weight: bold; margin-top: 4px;">${scaledArmor.toLocaleString()} Armor</div>`;
                }
                if (baseItem.blockChance) {
                  extraInfo += `<div style="font-size:15px; color:#fff; font-weight: bold; margin-top: 4px;">${baseItem.blockChance}% Block Chance</div>`;
                }
                if (baseItem.resistance) {
                  const scaledRes = Math.floor(baseItem.resistance * qMult);
                  extraInfo += `<div style="font-size:15px; color:#fff; font-weight: bold; margin-top: 4px;">${scaledRes.toLocaleString()} Resistance to All Elements</div>`;
                }
                if (baseItem.weaponType) {
                  extraInfo += `<div style="font-size:13px; color:#ccc; margin-top: 4px;">Type: <span style="color:#fff;">${baseItem.weaponType}</span></div>`;
                  if (baseItem.damageRange) {
                     let dmgStr = baseItem.damageRange;
                     const match = dmgStr.match(/([\d,]+)\s*-\s*([\d,]+)/);
                     if (match) {
                         const min = Math.floor(parseFloat(match[1].replace(/,/g, '')) * qMult);
                         const max = Math.floor(parseFloat(match[2].replace(/,/g, '')) * qMult);
                         dmgStr = `${min.toLocaleString()} - ${max.toLocaleString()}`;
                     }
                     extraInfo += `<div style="font-size:13px; color:#ccc;">Damage: <span style="color:#fff;">${dmgStr}</span></div>`;
                  }
                  if (baseItem.weaponSpeed) extraInfo += `<div style="font-size:13px; color:#ccc;">Speed: <span style="color:#fff;">${baseItem.weaponSpeed}</span></div>`;
                }
                container.innerHTML = extraInfo;
             }
             
             // 2. Update affix value inputs dynamically
             document.querySelectorAll('.affix-val-input').forEach(inp => {
                 const type = inp.dataset.type;
                 const groupIdx = parseInt(inp.dataset.group);
                 const idx = parseInt(inp.dataset.idx);
                 
                 let baseValArr = [];
                 if (type === 'affix') baseValArr = itemObj.affixValues?.[groupIdx] || [];
                 if (type === 'temper') baseValArr = itemObj.temperValues?.[groupIdx] || [];
                 if (type === 'transfigure') baseValArr = itemObj.transfigureValues?.[groupIdx] || [];
                 
                 let baseVal = baseValArr[idx];
                 if (baseVal === undefined && inp.dataset.baseval) {
                     baseVal = parseFloat(inp.dataset.baseval);
                 }
                 
                 let isGA = false;
                 if (type === 'affix') isGA = itemObj.greaterAffixes?.[groupIdx] || false;
                 if (type === 'temper') isGA = itemObj.greaterTempers?.[groupIdx] || false;
                 const gaBonus = isGA ? 0.25 : 0;
                 
                 let isCapstone = false;
                 if (itemObj.capstoneBonus && itemObj.capstoneBonus.type === type && itemObj.capstoneBonus.idx === groupIdx) {
                     isCapstone = true;
                 }
                 const capstoneBonus = isCapstone ? 0.50 : 0;
                 
                 const twoHandedMult = checkIs2H(itemObj, slotName) ? 2 : 1;
                 const rowQMult = (qMult + gaBonus + capstoneBonus) * twoHandedMult;
                 
                 if (baseVal !== undefined && !isNaN(baseVal)) {
                     // Check if this input belongs to the 'Item Quality' transfigure
                     // To do this properly we'd need to look up its name, but an easy way is to check the DOM text
                     const rowNameText = inp.closest('.affix-filled-row')?.innerText || '';
                     let scaled = (baseVal * rowQMult).toFixed(1).replace(/\.0$/, '');
                     if (rowNameText.includes('Item Quality')) {
                         scaled = (baseVal).toFixed(1).replace(/\.0$/, ''); // does not scale
                     }
                     inp.value = scaled;
                 }
             });
          }
        });
      }
    });

    document.querySelectorAll('.aspect-val-input').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const target = e.target;
        const idx = parseInt(target.dataset.idx);
        let val = parseFloat(target.value) || 0;
        
        if (target.hasAttribute('min')) {
          const minVal = parseFloat(target.getAttribute('min'));
          if (val < minVal) val = minVal;
        }
        if (target.hasAttribute('max')) {
          const maxVal = parseFloat(target.getAttribute('max'));
          if (val > maxVal) val = maxVal;
        }
        
        target.value = val;
        
        if (!itemObj.aspectValues) itemObj.aspectValues = [];
        itemObj.aspectValues[idx] = val;
        box.dataset.value = JSON.stringify(itemObj);
        calculate();
      });
    });

    document.querySelectorAll('.edit-dropdown').forEach(input => {
      input.addEventListener('change', (e) => {
        const type = e.target.dataset.type; // 'affix' or 'temper'
        const idx = parseInt(e.target.dataset.idx);
        const val = e.target.value;
        
        if (type === 'affix') {
          if (!itemObj.affixes) itemObj.affixes = [];
          itemObj.affixes[idx] = val;
        } else if (type === 'temper') {
          if (!itemObj.tempering) itemObj.tempering = [];
          itemObj.tempering[idx] = val;
        } else if (type === 'transfigure') {
          if (!itemObj.transfigure) itemObj.transfigure = [];
          itemObj.transfigure[idx] = val;
        }
        box.dataset.value = JSON.stringify(itemObj);
        calculate();
        renderEditTab(slotName); // Re-render to show the number inputs
      });
    });

    document.querySelectorAll('.btn-remove-affix').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        const idx = parseInt(e.target.dataset.idx);
        
        if (type === 'affix') {
          if (itemObj.affixes) itemObj.affixes[idx] = '';
          if (itemObj.affixValues) itemObj.affixValues[idx] = [];
        } else if (type === 'temper') {
          if (itemObj.tempering) itemObj.tempering[idx] = '';
          if (itemObj.temperValues) itemObj.temperValues[idx] = [];
        } else if (type === 'transfigure') {
          if (itemObj.transfigure) itemObj.transfigure[idx] = '';
          if (itemObj.transfigureValues) itemObj.transfigureValues[idx] = [];
        }
        box.dataset.value = JSON.stringify(itemObj);
                calculate();
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

    document.querySelectorAll('.btn-toggle-ga').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        const idx = parseInt(e.target.dataset.idx);
        if (type === 'affix') {
           if (!itemObj.greaterAffixes) itemObj.greaterAffixes = [];
           itemObj.greaterAffixes[idx] = !itemObj.greaterAffixes[idx];
        } else if (type === 'temper') {
           if (!itemObj.greaterTempers) itemObj.greaterTempers = [];
           itemObj.greaterTempers[idx] = !itemObj.greaterTempers[idx];
        }
        box.dataset.value = JSON.stringify(itemObj);
        calculate();
        renderEditTab(slotName);
      });
    });

    document.querySelectorAll('.btn-toggle-capstone').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        const idx = parseInt(e.target.dataset.idx);
        
        if (itemObj.capstoneBonus && itemObj.capstoneBonus.type === type && itemObj.capstoneBonus.idx === idx) {
            itemObj.capstoneBonus = null; // Toggle off
        } else {
            itemObj.capstoneBonus = { type, idx }; // Replace with new
        }
        
        box.dataset.value = JSON.stringify(itemObj);
        calculate();
        renderEditTab(slotName);
      });
    });

    document.querySelectorAll('.btn-remove-socket').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx);
        if (itemObj.sockets) {
            itemObj.sockets[idx] = null;
            // Cleanup trailing nulls
            while(itemObj.sockets.length > 0 && itemObj.sockets[itemObj.sockets.length - 1] === null) {
              itemObj.sockets.pop();
            }
        }
        box.dataset.value = JSON.stringify(itemObj);
        
        calculate();
        
        // Re-render paperdoll for socket updates
        renderEquipment(document.getElementById('class-select').textContent, getEquipmentValues());
        
        // Re-open item modal to properly bind new event listeners to the fresh DOM elements
        openItemModal(currentModalSlot);
      });
    });

      document.querySelectorAll('.affix-val-input').forEach(inp => {
        inp.addEventListener('change', (e) => {
          const target = e.target;
          const type = target.dataset.type; // 'affix', 'temper' or 'transfigure'
          const groupIdx = parseInt(target.dataset.group);
          const idx = parseInt(target.dataset.idx);
          let val = parseFloat(target.value) || 0;
          
          if (target.hasAttribute('min')) {
            const minVal = parseFloat(target.getAttribute('min'));
            if (val < minVal) val = minVal;
          }
          if (target.hasAttribute('max')) {
            const maxVal = parseFloat(target.getAttribute('max'));
            if (val > maxVal) val = maxVal;
          }
          
          target.value = val;
          
          const rowNameText = target.closest('.affix-filled-row')?.innerText || '';
          
          let isGA = false;
          if (type === 'affix') isGA = itemObj.greaterAffixes?.[groupIdx] || false;
          if (type === 'temper') isGA = itemObj.greaterTempers?.[groupIdx] || false;
          const gaBonus = isGA ? 0.25 : 0;
          
          let isCapstone = false;
          if (itemObj.capstoneBonus && itemObj.capstoneBonus.type === type && itemObj.capstoneBonus.idx === groupIdx) {
              isCapstone = true;
          }
          const capstoneBonus = isCapstone ? 0.50 : 0;
          
          let baseVal;
          if (rowNameText.includes('Item Quality')) {
              baseVal = val;
          } else {
              const effQ = getEffectiveQuality(itemObj);
              const twoHandedMult = checkIs2H(itemObj, slotName) ? 2 : 1;
              const qMult = (1 + (effQ * 0.01) + gaBonus + capstoneBonus) * twoHandedMult;
              baseVal = Number((val / qMult).toFixed(2));
          }
          
          if (type === 'affix') {
            if (!itemObj.affixValues) itemObj.affixValues = {};
            if (!itemObj.affixValues[groupIdx]) itemObj.affixValues[groupIdx] = [];
            itemObj.affixValues[groupIdx][idx] = baseVal;
          } else if (type === 'temper') {
            if (!itemObj.temperValues) itemObj.temperValues = {};
            if (!itemObj.temperValues[groupIdx]) itemObj.temperValues[groupIdx] = [];
            itemObj.temperValues[groupIdx][idx] = baseVal;
          } else if (type === 'transfigure') {
            if (!itemObj.transfigureValues) itemObj.transfigureValues = {};
            if (!itemObj.transfigureValues[groupIdx]) itemObj.transfigureValues[groupIdx] = [];
            itemObj.transfigureValues[groupIdx][idx] = baseVal;
          }
          
          box.dataset.value = JSON.stringify(itemObj);
          calculate();
          
          if (rowNameText.includes('Item Quality')) {
              const qInput = document.getElementById('edit-quality');
              if (qInput) qInput.dispatchEvent(new Event('input'));
          }
        });
      });
  }

  function openItemModal(slotName) {
    try {
      currentModalSlot = slotName;
      const modal = document.getElementById('item-selection-modal');
      const sidebarSlotName = document.getElementById('modal-sidebar-slot-name');
      const searchInput = document.getElementById('item-search-input');
      
      if (!modal) return;
      
      if (sidebarSlotName) sidebarSlotName.textContent = slotName;
      if (searchInput) searchInput.value = '';
      
      // Reset Aspect Tab state
      const aspectSearchInput = document.getElementById('aspect-search-input');
      if (aspectSearchInput) aspectSearchInput.value = '';
      document.querySelectorAll('#aspect-sidebar .sidebar-item').forEach(el => {
        el.classList.remove('active');
        if (el.dataset.category === 'All Aspects') el.classList.add('active');
      });
      
      // Reset Gem Tab state
      const gemSearchInput = document.getElementById('gem-search-input');
      if (gemSearchInput) gemSearchInput.value = '';
      document.querySelectorAll('#gem-sidebar .sidebar-item').forEach(el => {
        el.classList.remove('active');
        if (el.dataset.category === 'All Gems') el.classList.add('active');
      });

      renderModalItems(slotName, '');
      renderEditTab(slotName);
      renderAspectTab(slotName, 'All Aspects', '');
      renderModifierTab(slotName, 'affix', '', 'All Modifiers');
      renderModifierTab(slotName, 'temper', '', 'All Modifiers');
      renderModifierTab(slotName, 'transfigure', '', 'All Modifiers');
      renderGemTab(slotName, 'All Gems', '');
      
      const box = document.querySelector(`.equipment-slot-box[data-slot="${slotName}"]`);
      if (box && box.dataset.value) {
        switchModalTab('edit');
      } else {
        switchModalTab('select');
      }
      
      modal.style.display = 'flex';
    } catch(e) {
      alert("openItemModal error: " + e.message);
      console.error(e);
    }
  }

  function renderModalItems(slotName, query = '') {
    const list = document.getElementById('item-modal-list');
    if (!list) return;
    list.innerHTML = '';
    
    // Add "None" option
    const noneRow = document.createElement('div');
    noneRow.className = 'item-row';
    noneRow.innerHTML = `<div class="item-icon">✕</div><div class="item-name" style="color: #888;">None</div>`;
    noneRow.addEventListener('click', () => selectItem(''));
    list.appendChild(noneRow);

    let items = getDbItems(slotName);
    if (query) {
      items = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
    }
    
    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'item-row';
      
      const icon = document.createElement('div');
      icon.className = 'item-icon';
      icon.textContent = item.rarity === 'mythic' ? 'M' : 
                         (item.rarity === 'unique' ? 'U' : 
                         (item.rarity === 'legendary' ? 'L' : 'R'));
      
      const name = document.createElement('div');
      name.className = `item-name rarity-${item.rarity}`;
      name.textContent = item.name;
      
      row.appendChild(icon);
      row.appendChild(name);
      
      row.addEventListener('click', () => selectItem(item.name));
      list.appendChild(row);
    });
  }

  function selectItem(itemName) {
    if (!currentModalSlot) return;
    
    const box = document.querySelector(`.equipment-slot-box[data-slot="${currentModalSlot}"]`);
    if (box) {
      const valDiv = box.querySelector('.paperdoll-slot-value');
      if (itemName) {
        const itemObj = { name: itemName, power: 900, quality: 0 };
        box.dataset.value = JSON.stringify(itemObj);
        
        let rarity = 'rare';
        const dbItems = getDbItems(currentModalSlot);
        const foundItem = dbItems.find(i => i.name === itemName);
        if (foundItem) rarity = foundItem.rarity;
        
        if (valDiv) {
          valDiv.textContent = itemName;
          valDiv.className = `paperdoll-slot-value rarity-${rarity}`;
        }
        
        // QoL: Two-Handed logic
        if (foundItem && foundItem.weaponType && foundItem.weaponType.toLowerCase().includes('two-handed')) {
            if (currentModalSlot === 'Mainhand') {
                const offhandBox = document.querySelector(`.equipment-slot-box[data-slot="Offhand"]`);
                if (offhandBox) {
                    delete offhandBox.dataset.value;
                    const offValDiv = offhandBox.querySelector('.paperdoll-slot-value');
                    if (offValDiv) {
                        offValDiv.textContent = 'Empty';
                        offValDiv.className = 'paperdoll-slot-value empty';
                    }
                }
            }
        }
        if (currentModalSlot === 'Offhand') {
           const mainhandBox = document.querySelector(`.equipment-slot-box[data-slot="Mainhand"]`);
           if (mainhandBox && mainhandBox.dataset.value) {
              try {
                  const mhVal = JSON.parse(mainhandBox.dataset.value);
                  const mhDbItems = getDbItems('Mainhand');
                  const mhFoundItem = mhDbItems.find(i => i.name === mhVal.name);
                  if (mhFoundItem && mhFoundItem.weaponType && mhFoundItem.weaponType.toLowerCase().includes('two-handed')) {
                      delete mainhandBox.dataset.value;
                      const mhValDiv = mainhandBox.querySelector('.paperdoll-slot-value');
                      if (mhValDiv) {
                          mhValDiv.textContent = 'Empty';
                          mhValDiv.className = 'paperdoll-slot-value empty';
                      }
                  }
              } catch(e) {}
           }
        }

        renderEditTab(currentModalSlot);
        switchModalTab('edit');
      } else {
        delete box.dataset.value;
        if (valDiv) {
          valDiv.textContent = 'Empty';
          valDiv.className = 'paperdoll-slot-value empty';
        }
        renderEditTab(currentModalSlot);
        switchModalTab('select');
      }
      calculate();
    }
  }

  function selectAspect(aspectName) {
    if (!currentModalSlot) return;
    
    const box = document.querySelector(`.equipment-slot-box[data-slot="${currentModalSlot}"]`);
    if (box && box.dataset.value) {
      try {
        const itemObj = JSON.parse(box.dataset.value);
        itemObj.aspect = aspectName;
        
        let aspectMult = getAspectMultiplier(currentModalSlot, itemObj);
        
        // Auto-fill max value from database if available
        const aspectObj = window.D4_DATABASE?.aspects?.find(a => a.name === aspectName);
        if (aspectObj && aspectObj.maxValue) {
          itemObj.aspectValues = [parseFloat((aspectObj.maxValue * aspectMult).toFixed(2))];
        } else {
          itemObj.aspectValues = [];
        }
        
        box.dataset.value = JSON.stringify(itemObj);
        
        renderEditTab(currentModalSlot);
        switchModalTab('edit');
        calculate();
      } catch (e) {
        console.error("Error setting aspect", e);
      }
    }
  }

  function renderAspectTab(slotName, activeCategory = 'All Aspects', query = '') {
    const list = document.getElementById('item-modal-aspect-list');
    if (!list) return;
    list.innerHTML = '';
    
    // Get current class
    const currentClassVal = document.getElementById('class-select').textContent;
    const classIdx = D4_CLASS_MAP[currentClassVal];

    // Determine allowed aspect categories based on slot
    const slotCategories = {
      'helm': ['Defensive', 'Utility', 'Resource'],
      'chest armor': ['Defensive', 'Utility'],
      'gloves': ['Offensive', 'Utility'],
      'pants': ['Defensive', 'Utility'],
      'boots': ['Utility', 'Mobility'],
      'amulet': ['Offensive', 'Defensive', 'Utility', 'Resource', 'Mobility'],
      'left ring': ['Offensive', 'Resource'],
      'right ring': ['Offensive', 'Resource'],
      'mainhand': ['Offensive'],
      'offhand': ['Offensive', 'Defensive', 'Utility'],
      'weapon 1': ['Offensive'],
      'weapon 2': ['Offensive'],
      'weapon 1 (bludgeoning)': ['Offensive'],
      'weapon 2 (slashing)': ['Offensive'],
      'weapon 3 (dual wield 1)': ['Offensive'],
      'weapon 4 (dual wield 2)': ['Offensive']
    };
    const allowedCats = slotCategories[slotName.toLowerCase()] || [];

    // Filter logic
    let items = (window.D4_DATABASE?.aspects || []).filter(a => {
      // 1. Filter by class
      if (classIdx !== undefined && a.classes && a.classes[classIdx] !== 1) return false;
      // 2. Filter by slot valid categories
      if (a.category && !allowedCats.some(c => a.category.includes(c))) return false;
      // 3. Filter by Active Sidebar Category
      if (activeCategory !== 'All Aspects') {
        if (!a.category || !a.category.includes(activeCategory)) return false;
      }
      // 4. Filter by Search Query
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
      
      return true;
    });

    // Update sidebar visibility
    document.querySelectorAll('#aspect-sidebar .sidebar-item').forEach(el => {
      const cat = el.dataset.category;
      if (cat === 'All Aspects' || allowedCats.includes(cat)) {
        el.style.display = 'block'; // Or flex if that was the default
      } else {
        el.style.display = 'none';
      }
    });
    
    // Render "None" option
    if (!query && activeCategory === 'All Aspects') {
      const noneRow = document.createElement('div');
      noneRow.className = 'item-row';
      noneRow.innerHTML = `<div class="item-icon">✕</div><div class="item-name" style="color: #888;">None</div>`;
      noneRow.addEventListener('click', () => selectAspect(''));
      list.appendChild(noneRow);
    }
    
    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'item-row';
      
      const icon = document.createElement('div');
      icon.className = 'item-icon';
      icon.textContent = 'L'; // Legendary Aspect
      
      const name = document.createElement('div');
      name.className = `item-name rarity-legendary`;
      name.textContent = item.name;
      
      row.appendChild(icon);
      row.appendChild(name);
      
      row.addEventListener('click', () => selectAspect(item.name));
      list.appendChild(row);
    });
  }

  function selectGem(gemName) {
    if (!currentModalSlot) return;
    
    const box = document.querySelector(`.equipment-slot-box[data-slot="${currentModalSlot}"]`);
    if (box && box.dataset.value) {
      try {
        const itemObj = JSON.parse(box.dataset.value);
        if (!itemObj.sockets) itemObj.sockets = [];
        
        const idx = window.currentSocketIndex || 0;
        if (gemName === '') {
          itemObj.sockets[idx] = null;
        } else {
          itemObj.sockets[idx] = gemName;
        }
        
        // Cleanup nulls at end
        while(itemObj.sockets.length > 0 && itemObj.sockets[itemObj.sockets.length - 1] === null) {
          itemObj.sockets.pop();
        }
        
        box.dataset.value = JSON.stringify(itemObj);
        
        renderEditTab(currentModalSlot);
        switchModalTab('edit');
        calculate();
        
        // Re-render paperdoll for socket updates
        renderEquipment(document.getElementById('class-select').textContent, getEquipmentValues());
        openItemModal(currentModalSlot); // re-open to edit state
      } catch (e) {
        console.error("Error setting gem", e);
      }
    }
  }

  function renderGemTab(slotName, activeCategory = 'All Gems', query = '') {
    const list = document.getElementById('item-modal-gem-list');
    if (!list) return;
    list.innerHTML = '';
    
    let items = [...(window.D4_DATABASE?.gems || [])];
    
    const box = document.querySelector(`.equipment-slot-box[data-slot="${slotName}"]`);
    let eq = {};
    if (box && box.dataset.value) {
        try { eq = JSON.parse(box.dataset.value); } catch(e){}
    }
    const maxSockets = getMaxSockets(slotName, eq);
    
    let globalRuneCount = 0;
    document.querySelectorAll('.equipment-slot-box').forEach(b => {
        if (b.dataset.value) {
            try {
                const bEq = JSON.parse(b.dataset.value);
                if (bEq && bEq.sockets) {
                    bEq.sockets.forEach(gemName => {
                        if (gemName && window.D4_DATABASE?.runes?.some(r => r.name === gemName)) {
                            globalRuneCount++;
                        }
                    });
                }
            } catch(e){}
        }
    });
    
    const currentGemName = eq.sockets ? eq.sockets[window.currentSocketIndex] : null;
    const isReplacingRune = currentGemName && window.D4_DATABASE?.runes?.some(r => r.name === currentGemName);
    
    const canAddRune = globalRuneCount < 4 || isReplacingRune;
    
    if (maxSockets >= 2 && canAddRune) {
        if (window.currentSocketIndex === 0) {
            items = items.concat((window.D4_DATABASE?.runes || []).filter(r => r.type === 'Ritual'));
        } else if (window.currentSocketIndex === 1) {
            const socket0GemName = eq.sockets ? eq.sockets[0] : null;
            const hasRitualInSocket0 = socket0GemName && window.D4_DATABASE?.runes?.some(r => r.name === socket0GemName && r.type === 'Ritual');
            if (hasRitualInSocket0) {
                items = items.concat((window.D4_DATABASE?.runes || []).filter(r => r.type === 'Invocation'));
            }
        }
    }
    
    // Filter
    items = items.filter(g => {
      if (activeCategory !== 'All Gems' && g.type.toLowerCase() !== activeCategory.toLowerCase()) return false;
      if (query && !g.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    
    // Render "None"
    if (!query && activeCategory === 'All Gems') {
      const noneRow = document.createElement('div');
      noneRow.className = 'item-row';
      noneRow.innerHTML = `<div class="item-icon">✕</div><div class="item-name" style="color: #888;">None</div>`;
      noneRow.addEventListener('click', () => selectGem(''));
      list.appendChild(noneRow);
    }
    
    // Determine which effect to show based on slot
    const sName = slotName.toLowerCase();
    const isWeapon = sName.includes('weapon') || sName === 'mainhand' || sName === 'offhand';
    const isJewelry = sName === 'amulet' || sName.includes('ring');
    
    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'item-row';
      row.style.flexDirection = 'column';
      row.style.alignItems = 'flex-start';
      row.style.padding = '8px 12px';
      
      let effect = item.armorEffect;
      let isRune = item.type === 'Ritual' || item.type === 'Invocation';
      if (isRune) {
        effect = item.description;
      } else {
        if (isWeapon) effect = item.weaponEffect;
        else if (isJewelry) effect = item.jewelryEffect;
      }
      
      let color = '#fff';
      if (item.type === 'ruby') color = '#e74c3c';
      if (item.type === 'amethyst') color = '#9b59b6';
      if (item.type === 'emerald') color = '#2ecc71';
      if (item.type === 'topaz') color = '#f1c40f';
      if (item.type === 'sapphire') color = '#3498db';
      if (item.type === 'diamond') color = '#bdc3c7';
      if (item.type === 'skull') color = '#ecf0f1';
      if (isRune) color = '#ffcc00'; // Runes are gold
      
      let offeringHTML = '';
      let iconHTML = `<div class="socket-circle filled" style="background: ${color}; width: 16px; height: 16px;"></div>`;
      if (isRune) {
          offeringHTML = ` <span style="color: #a8a8a8; font-size: 0.8em;">(Offering: ${item.offering})</span>`;
          iconHTML = `<div style="width: 24px; height: 24px; background-image: url('assets/images/Runes/rune_${item.name.toLowerCase()}.png'); background-size: cover; background-position: center; border-radius: 50%; border: 1px solid #d18a45;"></div>`;
      } else {
          let gemFileName = item.name.toLowerCase().replace(/ /g, '_') + '_gem.png';
          iconHTML = `<div style="width: 24px; height: 24px; background-image: url('assets/images/Gems/${gemFileName}'); background-size: cover; background-position: center; border-radius: 50%; border: 1px solid #666;"></div>`;
      }
      
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
          ${iconHTML}
          <div class="item-name" style="color: ${color}; font-weight: bold;">${item.name}${offeringHTML}</div>
        </div>
        <div style="font-size: 0.85rem; color: #aaa; margin-left: 28px;">${effect}</div>
      `;
      
      row.addEventListener('click', () => selectGem(item.name));
      list.appendChild(row);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  function getAffixCategory(name) {
    const n = name.toLowerCase();
    if (n.includes('strength') || n.includes('intelligence') || n.includes('willpower') || n.includes('dexterity') || n.includes('all stats')) return 'Core Stats';
    if (n.includes('damage reduction')) return 'Defensive';
    if (n.includes('damage') || n.includes('critical') || n.includes('attack speed') || n.includes('vulnerable') || n.includes('overpower') || n.includes('chance to')) return 'Offensive';
    if (n.includes('armor') || n.includes('life') || n.includes('resistance') || n.includes('dodge') || n.includes('reduction') || n.includes('barrier')) return 'Defensive';
    if (n.includes('movement') || n.includes('cooldown') || n.includes('luck') || n.includes('healing') || n.includes('duration') || n.includes('size')) return 'Utility';
    if (n.includes('essence') || n.includes('mana') || n.includes('fury') || n.includes('spirit') || n.includes('energy') || n.includes('resource') || n.includes('regeneration')) return 'Resource';
    if (n.includes('rank') || n.includes('to ')) return 'Skills';
    return 'Utility';
  }

  function renderModifierTab(slotName, type, query = '', activeCategory = 'All Modifiers') {
    let listId = 'item-modal-modifier-list';
    if (type === 'temper') listId = 'item-modal-temper-list';
    if (type === 'transfigure') listId = 'item-modal-transfigure-list';
    const list = document.getElementById(listId);
    if (!list) return;
    list.innerHTML = '';
    
    const currentClassVal = document.getElementById('class-select').textContent;
    const classIdx = D4_CLASS_MAP[currentClassVal];

    const box = document.querySelector(`.equipment-slot-box[data-slot="${slotName}"]`);
    let itemObj = { name: '' };
    if (box && box.dataset.value) {
      try { itemObj = JSON.parse(box.dataset.value); } catch(e) {}
    }
    
    let mapped = slotName.toLowerCase();
    if (mapped === 'chest armor') mapped = 'chest';
    if (mapped === 'left ring' || mapped === 'right ring') mapped = 'ring';
    if (mapped.startsWith('weapon') || mapped === 'ranged weapon') mapped = 'mainhand';

    const classData = window.D4_DATABASE?.classData?.[currentClassVal]?.equipment?.[mapped] || {};
    let dbItems = [];
    if (type === 'affix') dbItems = classData.modifiers || [];
    else if (type === 'temper') dbItems = classData.tempers || [];
    else if (type === 'transfigure') dbItems = classData.transfigures || [];

    let currentlyEquipped = [];
    if (type === 'affix') currentlyEquipped = itemObj.affixes || [];
    if (type === 'temper') currentlyEquipped = itemObj.tempering || [];
    if (type === 'transfigure') currentlyEquipped = itemObj.transfigure || [];
    
    let editingAffixName = '';
    if (window.currentModifierEditing && window.currentModifierEditing.type === type) {
        editingAffixName = currentlyEquipped[window.currentModifierEditing.idx];
    }

    let items = dbItems.filter(a => {
      if (activeCategory !== 'All Modifiers' && getAffixCategory(a.name) !== activeCategory) return false;
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (a.name !== editingAffixName && currentlyEquipped.includes(a.name)) return false;
      
      // Filter out shield-specific tempers and modifiers if the equipped offhand is a focus
      if (mapped === 'offhand') {
        const baseItem = window.D4_DATABASE.itemDatabase['Offhand']?.find(i => i.name === itemObj.name);
        if (type === 'affix') {
          if (baseItem && baseItem.type === 'Focus' && a.exclusiveTo === 'Shield') return false;
          if (baseItem && baseItem.type === 'Shield' && a.exclusiveTo === 'Focus') return false;
        } else if (type === 'temper') {
          if (baseItem && baseItem.type === 'Focus') {
            const shieldManuals = ['Natural Resistance', 'Necromancer Wall', 'Worldly Endurance', 'Wordly Endurance', 'Natural Schemes', 'Worldly Fortune', 'Worldy Fortune'];
            if (shieldManuals.includes(a.desc)) return false;
          }
        }
      }
      
      // Filter out 1H vs 2H specific modifiers on mainhand
      if (mapped === 'mainhand' && type === 'affix') {
        const is2H = checkIs2H(itemObj, mapped);
        if (is2H && a.exclusiveTo === '1H') return false;
        if (!is2H && a.exclusiveTo === '2H') return false;
      }
      
      return true;
    });

    // Update sidebar visibility and active state
    let sidebarId = 'modifier-sidebar';
    if (type === 'temper') sidebarId = 'temper-sidebar';
    if (type === 'transfigure') sidebarId = 'transfigure-sidebar';
    document.querySelectorAll('#' + sidebarId + ' .sidebar-item').forEach(el => {
      el.classList.remove('active');
      if (el.dataset.category === activeCategory) el.classList.add('active');
    });

    if (items.length === 0) {
      list.innerHTML = '<div style="padding: 20px; color: #888; text-align: center;">No modifiers found.</div>';
      return;
    }

    items.forEach(a => {
      const card = document.createElement('div');
      card.className = 'item-card';
      const title = document.createElement('div');
      title.className = 'item-card-title';
      title.textContent = a.name;
      const desc = document.createElement('div');
      desc.className = 'item-card-desc';
      desc.innerHTML = a.desc || '';
      card.appendChild(title);
      card.appendChild(desc);
      
      card.addEventListener('click', () => {
        let editing = window.currentModifierEditing;
        if (!editing) {
          // If no specific slot was clicked, find the first empty one
          let targetObj = itemObj;
          let idx = 0;
          if (type === 'temper') {
            if (!targetObj.tempering) targetObj.tempering = [];
            idx = targetObj.tempering.findIndex(x => !x);
            if (idx === -1) idx = Math.min(targetObj.tempering.length, 1); // Max 2 tempers (0,1)
          } else if (type === 'transfigure') {
            if (!targetObj.transfigure) targetObj.transfigure = [];
            idx = targetObj.transfigure.findIndex(x => !x);
            if (idx === -1) idx = Math.min(targetObj.transfigure.length, 0); // Max 1 transfigure (0)
          } else {
            if (!targetObj.affixes) targetObj.affixes = [];
            idx = targetObj.affixes.findIndex(x => !x);
            if (idx === -1) idx = Math.min(targetObj.affixes.length, 2); // Max 3 affixes (0,1,2)
          }
          editing = { type: type || 'affix', idx, slotName };
        }
        
        let targetObj = itemObj;
        if (editing.type === 'affix') {
          if (!targetObj.affixes) targetObj.affixes = [];
          targetObj.affixes[editing.idx] = a.name;
        } else if (editing.type === 'temper') {
          if (!targetObj.tempering) targetObj.tempering = [];
          targetObj.tempering[editing.idx] = a.name;
        } else if (editing.type === 'transfigure') {
          if (!targetObj.transfigure) targetObj.transfigure = [];
          targetObj.transfigure[editing.idx] = a.name;
        }
        
        box.dataset.value = JSON.stringify(targetObj);
        calculate();
        switchModalTab('edit');
        window.currentModifierEditing = null;
        renderEditTab(slotName);
      });
      
      list.appendChild(card);
    });
  }

  // Setup search input listener for modifiers
  document.addEventListener('DOMContentLoaded', () => {
    // Skill Tree Reset Button
    const resetBtn = document.getElementById('reset-skill-tree-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to completely reset your skill tree?")) {
                window.selectedSkills = {};
                if (typeof renderSkills === 'function') renderSkills();
                if (typeof calculate === 'function') calculate();
            }
        });
    }

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
  });

  function renderToughnessDashboard(compiledStats) {
      if (!dom.ehpPhysical) return;

      const maxLife = compiledStats['Maximum Life'] ? compiledStats['Maximum Life'].final : 0;
      dom.dashMaxLife.textContent = Math.floor(maxLife).toLocaleString();

      const armorTotal = compiledStats['Armor'] ? compiledStats['Armor'].final : 0;
      const armorDrPct = compiledStats['Physical DR% (Armor)'] ? compiledStats['Physical DR% (Armor)'].final : 0;
      const allResistTotal = compiledStats['Resistance to All Elements'] ? compiledStats['Resistance to All Elements'].final : 0;
      const universalDrPct = compiledStats['Universal Damage Reduction %'] ? compiledStats['Universal Damage Reduction %'].final : 0;
      
      if (dom.dashArmor) dom.dashArmor.textContent = Math.floor(armorTotal).toLocaleString();
      if (dom.dashArmorDr) dom.dashArmorDr.textContent = armorDrPct.toFixed(1) + '%';
      if (dom.dashAllResist) dom.dashAllResist.textContent = Math.floor(allResistTotal).toLocaleString();
      if (dom.dashUniversalDr) dom.dashUniversalDr.textContent = universalDrPct.toFixed(1) + '%';
      
      const elements = ['Physical', 'Fire', 'Cold', 'Lightning', 'Poison', 'Shadow'];
      elements.forEach(elem => {
          const resistDrPct = compiledStats[`${elem} DR%`] ? compiledStats[`${elem} DR%`].final : 0;
          // Armor DR applies to all elemental damage as well as physical
          const finalElemDr = 1 - ((1 - (armorDrPct/100)) * (1 - (resistDrPct/100)) * (1 - (universalDrPct/100)));
          const ehpElem = maxLife / (1 - finalElemDr);
          
          const ehpEl = document.getElementById(`ehp-${elem.toLowerCase()}`);
          const drEl = document.getElementById(`dr-${elem.toLowerCase()}-final`);
          
          if (ehpEl) {
              ehpEl.textContent = Math.floor(ehpElem).toLocaleString();
              
              const card = ehpEl.parentElement;
              card.classList.add('stat-row-hoverable');
              card.style.position = 'relative';
              
              const existingTooltip = card.querySelector('.stat-tooltip');
              if (existingTooltip) existingTooltip.remove();
              
              const ehpStep1 = maxLife / (1 - (armorDrPct/100));
              const ehpStep2 = ehpStep1 / (1 - (universalDrPct/100));
              const ehpStep3 = ehpStep2 / (1 - (resistDrPct/100));
              
              const tooltipHtml = `
                  <div class="stat-tooltip" style="top: auto; bottom: 100%; left: 0px; z-index: 100; min-width: 250px; margin-bottom: 10px;">
                      <div class="stat-tooltip-header">
                          <span style="color: #d18a45;">${elem} EHP Math</span>
                      </div>
                      <div class="stat-tooltip-source">
                          <span style="color: #ccc;">Max Life:</span> <span style="color: #4cd137; float: right;">${Math.floor(maxLife).toLocaleString()}</span>
                      </div>
                      <hr class="stat-tooltip-divider">
                      <div class="stat-tooltip-source">
                          <span style="color: #ccc;">Armor DR (<span style="color: #e74c3c;">${armorDrPct.toFixed(1)}%</span>):</span> 
                          <span style="color: #888; float: right;">${Math.floor(ehpStep1).toLocaleString()}</span>
                      </div>
                      <div class="stat-tooltip-source">
                          <span style="color: #ccc;">Universal DR (<span style="color: #e74c3c;">${universalDrPct.toFixed(1)}%</span>):</span> 
                          <span style="color: #888; float: right;">${Math.floor(ehpStep2).toLocaleString()}</span>
                      </div>
                      <div class="stat-tooltip-source">
                          <span style="color: #ccc;">${elem} Resist DR (<span style="color: #e74c3c;">${resistDrPct.toFixed(1)}%</span>):</span> 
                          <span style="color: #888; float: right;">${Math.floor(ehpStep3).toLocaleString()}</span>
                      </div>
                      <hr class="stat-tooltip-divider">
                      <div class="stat-tooltip-source" style="font-weight: bold;">
                          <span style="color: #d18a45;">Total ${elem} EHP:</span> <span style="color: #4cd137; float: right;">${Math.floor(ehpElem).toLocaleString()}</span>
                      </div>
                  </div>
              `;
              card.insertAdjacentHTML('beforeend', tooltipHtml);
          }
          if (drEl) drEl.textContent = (finalElemDr * 100).toFixed(1) + '%';
      });
  }



// Tab Persistence
document.addEventListener('DOMContentLoaded', () => {
    const savedTab = localStorage.getItem('activeTabId');
    if (savedTab) {
        const tabToClick = document.querySelector(`.tab-btn[data-target="${savedTab}"]`);
        if (tabToClick) {
            tabToClick.click();
        }
    }
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target;
            if (target) {
                localStorage.setItem('activeTabId', target);
            }
        });
    });
});

// ---- Paragon Board UI Logic ----


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initParagonUI, 200);
});





function getActiveConditions() {
    return {
        vulnerable: document.getElementById('cond-vulnerable')?.checked || false,
        close: document.getElementById('cond-close')?.checked || false,
        distant: document.getElementById('cond-distant')?.checked || false,
        healthy: document.getElementById('cond-healthy')?.checked || false,
        injured: document.getElementById('cond-injured')?.checked || false,
        cc: document.getElementById('cond-cc')?.checked || false,
        golemSingleTarget: document.getElementById('cond-golem-single')?.checked || false,
        monsterType: document.querySelector('input[name="monster_type"]:checked')?.value || 'elite'
    };
}

function getActiveBuffs() {
    return {
        weakened: document.getElementById('buff-weakened')?.checked || false,
        ferocity: parseInt(document.getElementById('buff-ferocity')?.value) || 0,
        overpower: parseInt(document.getElementById('buff-overpower')?.value) || 0,
        resolve: parseInt(document.getElementById('buff-resolve')?.value) || 0
    };
}

function calculateSkillAdditiveBucket(skill) {
    if (!window.D4_COMPILED_STATS) return 0;
    const stats = window.D4_COMPILED_STATS;
    const conds = getActiveConditions();
    const tags = (skill.tags || []).map(t => t.toLowerCase());
    let dType = (skill.damageType || '').toLowerCase();
    
    if (tags.includes('damage_override_cold')) dType = 'cold';
    if (tags.includes('damage_override_physical')) dType = 'physical';
    if (tags.includes('damage_override_shadow')) dType = 'shadow';
    if (tags.includes('damage_override_poison')) dType = 'poison';
    if (tags.includes('damage_override_lightning')) dType = 'lightning';
    if (tags.includes('damage_override_fire')) dType = 'fire';
    if (tags.includes('damage_override_bone')) dType = 'bone';
    
    let bucket = 0;
    let components = [];
    
    // Helper to safely add stat
    const addStat = (statName) => {
        if (stats[statName] && stats[statName].final) {
            let val = stats[statName].final / 100;
            bucket += val;
            components.push({ name: statName, value: val });
        }
    };

    // Generic Additives
    addStat('Damage');
        if (stats['Damage Per Overpower Stack'] && stats['Damage Per Overpower Stack'].final) {
        let opStacks = 0;
        if (typeof getActiveBuffs === 'function') {
            let activeBuffs = getActiveBuffs();
            opStacks = activeBuffs.overpower || 0;
        }
        if (opStacks > 0) {
            let val = (stats['Damage Per Overpower Stack'].final * opStacks) / 100;
            bucket += val;
            components.push({ name: 'Damage Per Overpower Stack (x' + opStacks + ')', value: val });
        }
    }

    // Type Additives
    if (dType === 'shadow' || tags.includes('skill_shadow') || tags.includes('search_shadow') || tags.includes('skill_darkness')) { addStat('Shadow Damage'); addStat('Darkness Damage'); }
    if (dType === 'physical' || tags.includes('skill_physical') || tags.includes('search_physical')) addStat('Physical Damage');
    if (dType === 'bone' || tags.includes('skill_bone') || tags.includes('search_bone')) addStat('Bone Damage');
    if (tags.includes('skill_blood')) addStat('Blood Damage');
    if (dType === 'cold' || tags.includes('skill_cold') || tags.includes('search_cold')) addStat('Cold Damage');
    if (dType === 'poison' || tags.includes('skill_poison') || tags.includes('search_poison')) addStat('Poison Damage');
    if (dType === 'lightning' || tags.includes('skill_lightning') || tags.includes('search_lightning')) addStat('Lightning Damage');
    if (dType === 'fire' || tags.includes('skill_fire') || tags.includes('search_fire')) addStat('Fire Damage');

    // Category Additives
    if (tags.includes('keyword_core')) {
        addStat('Core Skill Damage');
        addStat('Core Damage');
    }
    if (tags.includes('keyword_basic')) {
        addStat('Basic Skill Damage');
        addStat('Basic Damage');
    }
    if (tags.includes('keyword_macabre') || tags.some(t => t.toLowerCase().includes('macabre')) || ['Bone Prison', 'Blood Mist', 'Golem', 'Bone Spirit'].includes(skill.name)) {
        addStat('Macabre Skill Damage');
        addStat('Macabre Damage');
    }
    if (tags.includes('keyword_corruption')) {
        addStat('Corruption Skill Damage');
        addStat('Corruption Damage');
    }
    if (tags.some(t => t.includes('summon'))) {
        addStat('Summoning Skill Damage');
        addStat('Summoning Damage');
        addStat('Summon Damage');
        addStat('Minion Damage');
    }
    // DoT Additives
    if (tags.includes('search_dot')) {
        addStat('Damage over Time');
        addStat('Damage Over Time');
        if (dType === 'shadow' || tags.includes('skill_shadow')) addStat('Shadow Damage over Time');
        if (dType === 'poison' || tags.includes('skill_poison')) addStat('Poison Damage over Time');
        if (dType === 'fire' || tags.includes('skill_fire')) { addStat('Fire Damage over Time'); addStat('Burning Damage'); }
        if (dType === 'cold' || tags.includes('skill_cold')) addStat('Cold Damage over Time');
        if (dType === 'physical' || tags.includes('skill_physical')) { addStat('Physical Damage over Time'); addStat('Bleeding Damage'); }
    }

    // Conditional Additives
    if (conds.vulnerable) { addStat('Damage to Vulnerable Enemies'); addStat('Vulnerable Damage'); addStat('Damage to Vulnerable'); }
    if (conds.close) { addStat('Damage to Close Enemies'); addStat('Close Damage'); addStat('Damage to Close'); }
    if (conds.distant) { addStat('Damage to Distant Enemies'); addStat('Distant Damage'); addStat('Damage to Distant'); }
    if (conds.healthy) { addStat('Damage while Healthy'); addStat('Damage While Healthy'); }
    if (conds.injured) addStat('Damage while Injured');
    if (conds.cc) {
        addStat('Damage to Crowd Controlled Enemies');
        addStat('Damage to Crowd Controlled');
        addStat('Damage to Slowed Enemies');
        addStat('Damage to Stunned Enemies');
        addStat('Crowd Control Damage');
    }
    if (conds.monsterType === 'elite' || conds.monsterType === 'boss') {
        addStat('Damage to Elites');
        addStat('Elite Damage');
    }
    let opStacks = 0;
    if (typeof getActiveBuffs === 'function') {
        opStacks = getActiveBuffs().overpower || 0;
    }
    if (opStacks > 0) {
        addStat('Overpower Damage');
    }
    
    // Fortify is a player state, assume 100% if they have fortify generation, but we'll just check if they have Max Life fortify
    // We'll leave conditional player states simple for now.

    return { total: bucket, components: components };
}

function calculateSkillMultiplicativeBucket(skill) {
    if (!window.D4_COMPILED_STATS) return 1;
    const stats = window.D4_COMPILED_STATS;
    const conds = getActiveConditions();
    const tags = (skill.tags || []).map(t => t.toLowerCase());
    
    let dType = (skill.damageType || '').toLowerCase();
    if (tags.includes('damage_override_cold')) dType = 'cold';
    if (tags.includes('damage_override_physical')) dType = 'physical';
    if (tags.includes('damage_override_shadow')) dType = 'shadow';
    if (tags.includes('damage_override_poison')) dType = 'poison';
    if (tags.includes('damage_override_lightning')) dType = 'lightning';
    if (tags.includes('damage_override_fire')) dType = 'fire';
    if (tags.includes('damage_override_bone')) dType = 'bone';
    
    let bucket = 1;
    let components = [];
    
    // Apply Native Vulnerable Multiplier if applicable
    if (conds.vulnerable) {
        bucket *= 1.2;
        components.push({ name: 'Vulnerable (Native)', value: 1.2 });
    }
    
    // Iterate over all stats to find multiplicative ones
    for (let key in stats) {
        if (!stats.hasOwnProperty(key)) continue;
        const stat = stats[key];
        const val = stat.final;
        if (!val || val === 0) continue;
        
        // Match generic Multipliers
        // [x] is usually appended to the name or it's tagged as isMultiplicative = true inside compileCharacterStats
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('[x]') || stat.isMultiplicative) {
            // Check if it applies to this skill
            let applies = false;
            
            let isSkillSpecific = lowerKey.startsWith('skill:');
            
            if (!isSkillSpecific && lowerKey.includes('damage') && !lowerKey.includes('critical') && !lowerKey.includes('over time') && !lowerKey.includes('dot') && !lowerKey.includes('to') && !lowerKey.includes('shadow') && !lowerKey.includes('darkness') && !lowerKey.includes('bone') && !lowerKey.includes('blood') && !lowerKey.includes('core') && !lowerKey.includes('macabre') && !lowerKey.includes('vulnerable') && !lowerKey.includes('cold') && !lowerKey.includes('poison') && !lowerKey.includes('lightning') && !lowerKey.includes('physical')) {
                // Generic damage multiplier (e.g. 20% [x] Damage)
                applies = true;
            }
            
            if (lowerKey.includes('vulnerable') && conds.vulnerable) applies = true;
            if ((lowerKey.includes('shadow') || lowerKey.includes('darkness')) && (tags.includes('skill_shadow') || tags.includes('search_shadow') || tags.includes('skill_darkness') || dType === 'shadow')) applies = true;
            if (lowerKey.includes('bone') && (tags.includes('skill_bone') || tags.includes('search_bone') || dType === 'bone')) applies = true;
            if (lowerKey.includes('blood') && tags.includes('skill_blood')) applies = true;
            if (lowerKey.includes('core') && tags.includes('keyword_core')) applies = true;
            if (lowerKey.includes('macabre') && (tags.includes('keyword_macabre') || tags.some(t => t.toLowerCase().includes('macabre')) || ['Bone Prison', 'Blood Mist', 'Golem', 'Bone Spirit'].includes(skill.name))) applies = true;
            if (lowerKey.includes('cold') && (tags.includes('skill_cold') || tags.includes('search_cold') || dType === 'cold')) applies = true;
            if (lowerKey.includes('poison') && (tags.includes('skill_poison') || tags.includes('search_poison') || dType === 'poison')) applies = true;
            if (lowerKey.includes('lightning') && (tags.includes('skill_lightning') || tags.includes('search_lightning') || dType === 'lightning')) applies = true;
            if (lowerKey.includes('physical') && (tags.includes('skill_physical') || tags.includes('search_physical') || dType === 'physical')) applies = true;
            
            // Catch-all for purely generic aspect multipliers
            if (!lowerKey.includes('damage') && !lowerKey.includes('critical') && !lowerKey.includes('over time') && !lowerKey.includes('dot') && !lowerKey.includes('shadow') && !lowerKey.includes('darkness') && !lowerKey.includes('bone') && !lowerKey.includes('blood') && !lowerKey.includes('core') && !lowerKey.includes('macabre') && !lowerKey.includes('vulnerable') && !lowerKey.includes('cold') && !lowerKey.includes('poison') && !lowerKey.includes('lightning') && !lowerKey.includes('physical')) {
                applies = true;
            }
            
            // Explicit Damage over Time check
            if ((lowerKey.includes('over time') || lowerKey.includes('dot')) && (tags.includes('search_dot') || tags.includes('search_shadowdot'))) {
                applies = true;
            }
            
            // Universal Skill-Specific Multiplier Check
            if (lowerKey.startsWith('skill: ' + skill.name.toLowerCase())) {
                applies = true;
            }

            if (applies) {
                let valMult = (1 + (val / 100));
                bucket *= valMult;
                
                let displayName = key;
                if (lowerKey.startsWith('skill:')) {
                    let match = key.match(/\(([^)]+)\)/);
                    if (match && match[1]) {
                        displayName = match[1] + ' [x]';
                    } else {
                        displayName = key.replace('Skill: ', '');
                    }
                }
                
                components.push({ name: displayName, value: valMult });
            }
        }
    }
    
    return { total: bucket, components: components };
}

function renderCalcSkills() {
    const container = document.getElementById('calc-pane-skills');
    if (!container) return;
    
    container.innerHTML = `
      <h2 style="color: #fff; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 15px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
         <span class="icon" style="color: #c9a55c;">⚔️</span> Skills Engine
      </h2>
    `;

    if (typeof skillsDatabase === 'undefined' || !window.selectedSkills) {
        container.innerHTML += `<p style="color: #aaa; font-style: italic;">Allocate points in your Skill Tree into skills that deal damage to see them appear here.</p>`;
        return;
    }

    // Dynamic Skill Sliders state init
    window.skillSliderValues = window.skillSliderValues || {};

    let foundSkills = 0;
    
    for (const cat in skillsDatabase) {
        skillsDatabase[cat].forEach(baseSkill => {
            const modSkill = typeof applyActiveModifiers === 'function' ? applyActiveModifiers(baseSkill) : baseSkill;
            
            // Render base skills that have points and deal damage (either base or via modified secondary scalars)
            if (window.selectedSkills[baseSkill.name] > 0 && (modSkill.baseDamageScalar > 0 || (modSkill.secondaryScalars && Object.keys(modSkill.secondaryScalars).length > 0))) {
                foundSkills++;
                
                const card = document.createElement('div');
                card.className = 'd4-panel calc-skill-card';
                card.style.background = 'rgba(20,20,25,0.9)';
                card.style.border = '1px solid #334';
                card.style.borderRadius = '8px';
                card.style.padding = '20px';
                card.style.marginBottom = '15px';
                card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
                
                let displayImgName = baseSkill.name;
                if (baseSkill.modifiers) {
                    // Only check the first 3 modifiers (index 0, 1, 2) which are the diamonds/modifiers.
                    // Upgrades (circles) are index 3+ and should not change the skill's identity.
                    let maxIndex = Math.min(2, baseSkill.modifiers.length - 1);
                    for (let i = maxIndex; i >= 0; i--) {
                        if (window.selectedSkills[baseSkill.modifiers[i].name] > 0) {
                            displayImgName = baseSkill.modifiers[i].name;
                            break;
                        }
                    }
                }
                let imgName = displayImgName.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
                let clsName = (typeof currentBuild !== 'undefined' && currentBuild && currentBuild.class) ? currentBuild.class : 'Necromancer';
                let baseNameSlug = baseSkill.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
                
                let finalIconName = baseNameSlug; // Default to base skill if all else fails
                if (window.NECRO_ICONS) {
                    if (window.NECRO_ICONS.has(imgName)) {
                        finalIconName = imgName;
                    } else if (window.NECRO_ICONS.has(imgName + '-' + baseNameSlug)) {
                        finalIconName = imgName + '-' + baseNameSlug;
                    }
                }
                
                let iconUrl = `assets/Skills/${clsName}/${finalIconName}.png`;
                let iconHtml = `<img src="${iconUrl}" style="width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px;" onerror="this.outerHTML='<div style=\'width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #222; color: #888;\'>?</div>'">`;
                
                card.innerHTML = `
                  <div style="display: flex; align-items: flex-start; gap: 15px;">
                    ${iconHtml}
                    <div style="flex: 1;">
                      <h3 style="margin: 0; color: #fff; font-size: 1.2rem; display: flex; justify-content: space-between;">
                        ${displayImgName}
                        <span style="font-size: 0.9rem; color: #888;">Rank ${window.selectedSkills[baseSkill.name]}</span>
                      </h3>
                      <div style="color: #aaa; font-size: 0.9rem; margin-top: 10px; font-family: monospace;">
                        ${(function() {
                            let html = '';
                            let rank = window.selectedSkills[baseSkill.name] || 1;
                            let wpMin = window.weaponMinDmg || 0;
                            let wpMax = window.weaponMaxDmg || 0;

                            let b = getSkillDamageBreakdown(modSkill, rank);
                              let finalScalar = b.finalScalar;

                              if (modSkill.baseDamageScalar) {
                                  let pct = (modSkill.baseDamageScalar * b.rankMultiplier * 100).toFixed(1).replace('.0', '');
                                  let addStr = Number(((b.additiveMult - 1) * 100).toFixed(6));
                                  let baseLabel = (['Bone Storm', 'Blood Mist', 'Devouring Mist', 'Blood Transfusion', 'Blood Rush'].includes(modSkill.name)) ? 'Per Tick Damage' : 'Damage';
                                  html += `<details style="margin-bottom: 4px;">
                                    <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none;">
                                      <span style="color: #555;">├</span> ${baseLabel} (${pct}%): <span style="color: #fff; font-weight: bold;">${b.minStr} - ${b.maxStr}</span>
                                    </summary>
                                    <div style="margin-left: 20px; font-size: 0.9em; color: #aaa; margin-top: 6px; border-left: 1px solid #444; padding-left: 10px; margin-bottom: 6px;">
                                      <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                        <span style="color: #555;">└</span> ${b.mainStatName} Multiplier: <span style="color: #fff;">x${Number(b.mainStatMult.toFixed(6))}</span>
                                      </div>
                                      <div style="margin-bottom: 3px;">
                                        <div style="display: flex; align-items: center; gap: 5px;">
                                          <span style="color: #555;">└</span> Additive Multiplier: <span style="color: #fff;">1 + (${addStr}%)</span>
                                        </div>
                                        ${(b.additiveComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: +${(comp.value * 100).toFixed(1).replace('.0', '')}%</div>`).join('')}
                                      </div>
                                      <div>
                                        <div style="display: flex; align-items: center; gap: 5px;">
                                          <span style="color: #555;">└</span> Multiplicative Multiplier: <span style="color: #fff;">x${Number(b.multiMult.toFixed(6))}</span>
                                        </div>
                                        ${(b.multiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name.replace('Skill: ', '')}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                      </div>
                                    </div>
                                    <details style="margin-left: 20px; font-size: 0.9em; margin-bottom: 6px;">
                                      <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;">
                                        <span style="color: #555;">└</span> Critical Hit: <span style="font-weight: bold;">${b.critStrMin} - ${b.critStrMax}</span>
                                      </summary>
                                      <div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">
                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                                          <span style="color: #555;">├</span> Base Critical Multiplier: x1.5
                                        </div>
                                        ${(b.critMultiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-top: 2px;">
                                          <span style="color: #555;">├</span> Additive Critical Bonus: +${Number(((b.critAdditiveMult - b.additiveMult) * 100).toFixed(1))}%
                                        </div>
                                      </div>
                                    </details>
                                  </details>`;
                              }
                            if (modSkill.secondaryScalars) {
                                for (const [key, val] of Object.entries(modSkill.secondaryScalars)) {
                                    if (val === null || val === undefined) continue;
                                    let label = key.replace(/_/g, ' ').replace(/tooltip /i, '').replace(/dot/i, 'DoT').replace(/\b\w/g, c => c.toUpperCase());
                                    let scalarVal = typeof val === 'object' ? val.scalar : val;
                                    let secSkill = JSON.parse(JSON.stringify(modSkill));
                                    if (typeof val === 'object' && val.tags) secSkill.tags = [...val.tags];
                                    if (typeof val === 'object' && val.addTags) {
                                        secSkill.tags = secSkill.tags || [];
                                        secSkill.tags.push(...val.addTags);
                                    }
                                    if (typeof val === 'object' && val.nameOverride) {
                                        secSkill.name = val.nameOverride;
                                    }
                                    secSkill.baseDamageScalar = scalarVal;
                                    let b2 = getSkillDamageBreakdown(secSkill, rank);
                                    let pct = (scalarVal * b2.rankMultiplier * 100).toFixed(1).replace('.0', '');
                                    let minStr = Math.floor(wpMin * scalarVal * b2.finalScalar).toLocaleString();
                                    let maxStr = Math.floor(wpMax * scalarVal * b2.finalScalar).toLocaleString();
                                    
                                    let addStr2 = Number(((b2.additiveMult - 1) * 100).toFixed(6));
                                    let canCrit = !key.toLowerCase().includes('dot');
                                    let critMinStr = Math.floor(wpMin * scalarVal * b2.finalScalar * (b2.critAdditiveMult / b2.additiveMult) * (b2.critMultiMult / b2.multiMult)).toLocaleString();
                                    let critMaxStr = Math.floor(wpMax * scalarVal * b2.finalScalar * (b2.critAdditiveMult / b2.additiveMult) * (b2.critMultiMult / b2.multiMult)).toLocaleString();
                                      
                                    html += `<details style="margin-bottom: 4px;">
                                      <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none;">
                                        <span style="color: #555;">├</span> ${label} (${pct}%): <span style="color: #fff; font-weight: bold;">${minStr} - ${maxStr}</span>
                                      </summary>
                                      <div style="margin-left: 20px; font-size: 0.9em; color: #aaa; margin-top: 6px; border-left: 1px solid #444; padding-left: 10px; margin-bottom: 6px;">
                                        <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                          <span style="color: #555;">└</span> ${b2.mainStatName} Multiplier: <span style="color: #fff;">x${Number(b2.mainStatMult.toFixed(6))}</span>
                                        </div>
                                        <div style="margin-bottom: 3px;">
                                          <div style="display: flex; align-items: center; gap: 5px;">
                                            <span style="color: #555;">└</span> Additive Multiplier: <span style="color: #fff;">1 + (${addStr2}%)</span>
                                          </div>
                                          ${(b2.additiveComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: +${(comp.value * 100).toFixed(1).replace('.0', '')}%</div>`).join('')}
                                        </div>
                                        <div>
                                          <div style="display: flex; align-items: center; gap: 5px;">
                                            <span style="color: #555;">└</span> Multiplicative Multiplier: <span style="color: #fff;">x${Number(b2.multiMult.toFixed(6))}</span>
                                          </div>
                                          ${(b2.multiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name.replace('Skill: ', '')}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                        </div>
                                      </div>
                                      ${canCrit ? `
                                      <details style="margin-left: 20px; font-size: 0.9em; margin-bottom: 6px;">
                                        <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;">
                                          <span style="color: #555;">└</span> Critical Hit: <span style="font-weight: bold;">${critMinStr} - ${critMaxStr}</span>
                                        </summary>
                                        <div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">
                                          <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                                            <span style="color: #555;">├</span> Base Critical Multiplier: x1.5
                                          </div>
                                          ${(b2.critMultiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                          <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-top: 2px;">
                                            <span style="color: #555;">├</span> Additive Critical Bonus: +${Number(((b2.critAdditiveMult - b2.additiveMult) * 100).toFixed(1))}%
                                          </div>
                                        </div>
                                      </details>` : ''}
                                    </details>`;
                                }
                            }
                            return html;
                        })()}
                        <div style="margin-left: 15px; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">└</span> Lucky Hit Chance: <span style="color: #fff;">${modSkill.luckyHitChance || 0}%</span>
                        </div>
                        
                        <div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">├</span> Attack Rate: <span style="color: #fff;">TBD frames</span>
                        </div>
                        <div style="margin-left: 15px; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">├</span> Attack: <span style="color: #fff;">0</span>
                        </div>
                        <div style="margin-left: 15px; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">└</span> Time to kill: <span style="color: #fff;">TBD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
                
                // Append skill-specific sliders
                if (baseSkill.name === 'Army of the Dead' && window.selectedSkills['Pile the Bodies'] > 0) {
                    let curVal = window.skillSliderValues['Pile the Bodies'] !== undefined ? window.skillSliderValues['Pile the Bodies'] : 300;
                    let sliderDiv = document.createElement('div');
                    sliderDiv.style.marginTop = '15px';
                    sliderDiv.style.borderTop = '1px solid #334';
                    sliderDiv.style.paddingTop = '15px';
                    sliderDiv.innerHTML = `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <label style="color: #ccc; font-size: 0.85em;">Pile the Bodies (Modifier Scaling)</label>
                            <span id="slider-val-pile" style="color: #c9a55c; font-size: 0.85em; font-weight: bold;">${curVal}%</span>
                        </div>
                        <input type="range" min="0" max="300" step="10" value="${curVal}" style="width: 100%; accent-color: #c9a55c;" 
                               oninput="document.getElementById('slider-val-pile').innerText = this.value + '%'; window.skillSliderValues['Pile the Bodies'] = parseInt(this.value); window.calculate();">
                    `;
                    card.appendChild(sliderDiv);
                }

                container.appendChild(card);
            }
        });
    }
    
    if (foundSkills === 0) {
        container.innerHTML += `<p style="color: #aaa; font-style: italic;">Allocate points in your Skill Tree into skills that deal damage to see them appear here.</p>`;
    }
}


function getSkillDamageBreakdown(skillObj, displayRank) {
    let rank = displayRank || 1;
    let rankMultiplier = 1.0;
    if (rank > 1) {
        let levelsGained = rank - 1;
        let enhancedIncreases = Math.floor(rank / 5);
        let scalePerLevel = skillObj.damageScalePerLevel !== undefined ? skillObj.damageScalePerLevel : 0.10;
        let scalePerFive = skillObj.damageScalePerFive !== undefined ? skillObj.damageScalePerFive : 0.05;
        rankMultiplier = 1.0 + (levelsGained * scalePerLevel) + (enhancedIncreases * scalePerFive);
    }
    let wpMin = window.weaponMinDmg || 0;
    let wpMax = window.weaponMaxDmg || 0;

    let cls = (typeof currentBuild !== 'undefined' && currentBuild && currentBuild.class) ? currentBuild.class : 'Necromancer';
    let statVal = 0;
    let factor = 0.125;
    let mainStatName = 'Intelligence';

    if (window.D4_COMPILED_STATS) {
        if (cls === 'Barbarian') { mainStatName = 'Strength'; statVal = window.D4_COMPILED_STATS['Strength']?.final||0; factor = 0.11; }
        else if (cls === 'Paladin') { mainStatName = 'Strength'; statVal = window.D4_COMPILED_STATS['Strength']?.final||0; factor = 0.125; }
        else if (cls === 'Druid') { mainStatName = 'Willpower'; statVal = window.D4_COMPILED_STATS['Willpower']?.final||0; factor = 0.125; }
        else if (cls === 'Rogue') { mainStatName = 'Dexterity'; statVal = window.D4_COMPILED_STATS['Dexterity']?.final||0; factor = 0.11; }
        else if (cls === 'Sorcerer' || cls === 'Necromancer') { mainStatName = 'Intelligence'; statVal = window.D4_COMPILED_STATS['Intelligence']?.final||0; factor = 0.125; }
        else if (cls === 'Spiritborn') { mainStatName = 'Dexterity'; statVal = window.D4_COMPILED_STATS['Dexterity']?.final||0; factor = 0.125; }
    }

    let mainStatPct = statVal * factor;
    let mainStatMult = 1 + (mainStatPct / 100);

    let addData = typeof calculateSkillAdditiveBucket === 'function' ? calculateSkillAdditiveBucket(skillObj) : { total: 0, components: [] };
    let additiveMult = 1 + addData.total;

    let multiData = typeof calculateSkillMultiplicativeBucket === 'function' ? calculateSkillMultiplicativeBucket(skillObj) : { total: 1, components: [] };
    let multiMult = multiData.total;
    
    if (skillObj.name === "Blood Golem Active" && typeof getActiveConditions === 'function' && getActiveConditions().golemSingleTarget) {
        multiMult *= 4.0;
        multiData.components.push({ name: 'Single Target (Blood Golem) [x]', value: 4.0 });
    }
    
    let finalScalar = rankMultiplier * mainStatMult * additiveMult * multiMult;

    let minDmg = 0;
    let maxDmg = 0;
    if (skillObj.baseDamageScalar) {
        minDmg = Math.floor(wpMin * skillObj.baseDamageScalar * finalScalar);
        maxDmg = Math.floor(wpMax * skillObj.baseDamageScalar * finalScalar);
    }

    let canCrit = true; // For base breakdown, we assume true unless explicitly overridden outside or if it's a DoT
    let critMin = 0;
    let critMax = 0;
    let critStrMin = "0";
    let critStrMax = "0";

    // Grab additive crit damage
    let additiveCritBonus = (window.D4_COMPILED_STATS && window.D4_COMPILED_STATS['Critical Strike Damage']) ? window.D4_COMPILED_STATS['Critical Strike Damage'].final / 100 : 0;
    let critAdditiveMult = additiveMult + additiveCritBonus;

    // Grab multiplicative crit multipliers
    let critMultiplicativeComponents = [];
    let critMultiMult = multiMult * 1.5; // Base native 1.5x for critical hits
    critMultiplicativeComponents.push({ name: 'Base Critical Strike', value: 1.5 });
    
    if (window.D4_COMPILED_STATS) {
        // The Grandfather: 120%[x] -> 2.2x
        let gf = window.D4_COMPILED_STATS['The Grandfather'];
        if (gf && gf.final > 0) {
            let gfVal = (1 + (gf.final / 100));
            critMultiMult *= gfVal;
            critMultiplicativeComponents.push({ name: 'The Grandfather', value: gfVal });
        }
        
        // Blood Moon Breeches: 60%[x] conditionally (if cursed, but let's assume active if equipped for now, or check conditions)
        let bmb = window.D4_COMPILED_STATS['Blood Moon Breeches'];
        if (bmb && bmb.final > 0) {
            // Note: This applies strictly to enemies affected by curses, but as a generic multiplier we can assume it for the calculator
            let bmbVal = (1 + (bmb.final / 100));
            critMultiMult *= bmbVal;
            critMultiplicativeComponents.push({ name: 'Blood Moon Breeches', value: bmbVal });
        }

        // Dynamically grab any generic Critical Strike Damage [x] multipliers
        for (let key in window.D4_COMPILED_STATS) {
            if (!window.D4_COMPILED_STATS.hasOwnProperty(key)) continue;
            let stat = window.D4_COMPILED_STATS[key];
            if (!stat || stat.final === 0) continue;
            let lowerKey = key.toLowerCase();
            if ((lowerKey.includes('[x]') || stat.isMultiplicative) && (lowerKey.includes('critical') || lowerKey.includes('crit '))) {
                let critVal = (1 + (stat.final / 100));
                critMultiMult *= critVal;
                critMultiplicativeComponents.push({ name: key, value: critVal });
            }
        }
    }

    let finalCritScalar = rankMultiplier * mainStatMult * critAdditiveMult * critMultiMult;

    if (skillObj.baseDamageScalar) {
        critMin = Math.floor(wpMin * skillObj.baseDamageScalar * finalCritScalar);
        critMax = Math.floor(wpMax * skillObj.baseDamageScalar * finalCritScalar);
        critStrMin = critMin.toLocaleString();
        critStrMax = critMax.toLocaleString();
    }

    return {
        mainStatName,
        mainStatMult,
        additiveMult,
        multiMult,
        finalScalar,
        wpMin,
        wpMax,
        minStr: minDmg.toLocaleString(),
        maxStr: maxDmg.toLocaleString(),
        rankMultiplier,
        critStrMin,
        critStrMax,
        critMultiMult,
        critAdditiveMult,
        additiveComponents: addData.components,
        multiplicativeComponents: multiData.components,
        critMultiplicativeComponents
    };
}
