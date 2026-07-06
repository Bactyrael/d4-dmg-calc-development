
global.addStat = function(statsObj, k, v, src) {
    statsObj[k] = {final: v, sources: [src]};
};
global.currentBuild = {
    class: 'Necromancer',
    skills: [{name: 'Bloody Mess', rank: 1}],
    stats: {},
    conditions: {},
    bookOfTheDead: {warriors: {spec: 'Defender', node: '1'}}
};
global.window = {
    selectedSkills: {'Bloody Mess': 1},
    skillsData: [
        {
            name: 'Corpse Explosion',
            modifiers: [{name: 'Bloody Mess', description: 'damage is increased by 50%[x]'}]
        }
    ],
    D4_COMPILED_STATS: {}
};

window.NECRO_ICONS = new Set(["area-damage-bonus-blight","army-of-the-dead","astral-projection","barrier-bone-storm","barrier-decompose","barrier-soulrift","bitter-harvest","blight","blood-boil","blood-lance","blood-maiden","blood-mist","blood-orb-blood-wave","blood-orb-corpse-explosion","blood-orb-hemorrhage","blood-runs-cold","blood-rush","blood-seeker","blood-spear","blood-surge","blood-transfusion","blood-wave","bloodbath","bloody-mess","bloody-splinter","bone-prison","bone-spear","bone-spikes","bone-spirit","bone-splinters","bone-storm","bouncing-spines","bramble","cast-speed-hemorrhage","charges-bone-spirit","chilled-to-the-bone","cold-pursuit","cooldown-reduction-army-of-the-dead","cooldown-reduction-bone-prison","cooldown-reduction-decrepify","core-skill-bone-spirit","corpse-efficiency-corpse-explosion","corpse-explosion","corpse-generation-army-of-the-dead","corpse-generation-reap","corpse-tendrils","cost-reduction-blood-lance","cost-reduction-bone-spear","cost-reduction-sever","coven","critical-strike-blood-mist","critical-strike-chance-corpse-tendrils","critical-strike-chance-decrepify","critical-strike-chance-reap","critical-strike-chance-skeleton-mage","crowd-control-and-corpse-generation-sever","crowd-control-damage-bonus-blight","crowd-control-damage-bonus-skeleton-mage","crowd-control-decompose","cull-the-weak","damage-bonus-army-of-the-dead","damage-bonus-blood-surge","damage-bonus-blood-wave","damage-bonus-bone-spirit","damage-bonus-decompose","damage-bonus-golem","damage-bonus-sever","damage-bonus-skeleton-warrior","damage-bonus-soulrift","damage-reduction-blood-wave","damage-reduction-bone-storm","dead-cold","decompose","decrepify","devouring-mist","distilled-anima","dizzying-curse","dry-rot","duration-damage-bonus-skeleton-mage","duration-increase-bone-storm","essence-generation-bone-prison","essence-generation-bone-splinters","essence-generation-corpse-explosion","essence-generation-corpse-tendrils","essence-generation-iron-maiden","essence-generation-reap","execute-and-fortify-iron-maiden","fel-gluttony","ferocity-and-overpower-iron-maiden","ferocity-reap","ferocity-resolve-or-overpower-skeleton-mage","ferocity-sever","ferocity-soulrift","festering-wound","first-hit-damage-bonus-bone-spear","fortify-blood-lance","fortify-blood-surge","frozen-wasteland","gargantua","get-over-here","gift-of-death","golem","gore-quills","gravebloom","harvest","healing-skeleton-warrior","hematolagnia","hemorrhage","hungry-cyclone","inexorable-reaper","iron-maiden","jaws-of-death","life-imprisonment","life-tap","litany-of-death","lucky-hit-chance-blight","lucky-hit-chance-corpse-tendrils","lucky-hit-chance-decompose","master-of-puppets","maximum-essence-bone-spirit","miasma","movement-speed-blood-mist","movement-speed-decrepify","multiple-corpses-corpse-explosion","overpower-blood-lance","overpower-blood-mist","overpower-blood-surge","overpower-blood-wave","overpower-hemorrhage","passive-bonus-army-of-the-dead","path-of-darkness","pierce-damage-bonus-bone-spear","piercing-darkness","pile-the-bodies","pins-and-needles","plunging-darkness","poltergeists","projectiles-bone-splinters","putrid-burst","reap","reaping-lotus","resolve-bone-prison","resolve-bone-spear","resolve-bone-splinters","resolve-decrepify","resolve-overpower-or-ferocity-golem","resolve-skeleton-warrior","ricochet-blood-lance","rip-and-tear","roll-the-bones","schadenfreude","service-and-sacrifice","sever","shadow-and-bone","shadow-seekers","shadow-splitter","shrapnel","singularity","size-bonus-blight","skeleton-mage","skeleton-warrior","soul-rip","soul-vortex","soulrift","tides-of-blood","torture-artist","unfinished-business","unholy-frenzy","unstoppable-golem","unyielding-commander","volatile-blood","vulnerable-and-crowd-control-soulrift","vulnerable-and-slow-blood-mist","vulnerable-bone-prison","vulnerable-bone-splinters","vulnerable-bone-storm","vulnerable-corpse-tendrils","vulnerable-iron-maiden","vulnerable-skeleton-warrior","weaken-blood-surge","weaken-golem","weaken-hemorrhage","whirlpool","you-and-what-army"]);

window.UNIQUE_ITEM_CONSTRAINTS = {
    "Razorplate": {
        lockedModifiers: ["Thorns", "Thorns", "Thorns", "Thorns"]
    }
};
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
    { label: 'Darkness: 10%', value: 10 },
    { label: 'Deadraiser: 15%', value: 15 },
    { label: 'Desecration: 20%', value: 20 },
    { label: 'Dominate: 12%', value: 12 },
    { label: 'Eliminator: 10%', value: 10 },
    { label: 'Essence: 17.6%', value: 17.6 },
    { label: 'Exhumation: 6%', value: 6 },
    { label: 'Exploit: 10%', value: 10 },
    { label: 'Golem: 25%', value: 25 },
    { label: 'Gravekeeper: 18%', value: 18 },
    { label: 'Imbiber: 20%', value: 20 },
    { label: 'Mage: 20%', value: 20 },
    { label: 'Revenge: 10%', value: 10 },
    { label: 'Sacrificial: 10%', value: 10 },
    { label: 'Scourge: 10%', value: 10 },
    { label: 'Territorial: 15%', value: 15 },
    { label: 'Undaunted: 15%', value: 15 },
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

  
  window.isGlyphSocketed = function isGlyphSocketed(pData) {
      if (!pData || !pData.glyph || !pData.glyph.id) return false;
      if (!pData.boardId) return true; // Legacy UI assumption
      if (!pData.nodes || pData.nodes.length === 0) return false;
      const bData = window.D4_PARAGON_DATA?.paragonBoards?.[pData.boardId.replace(/\\/g, '')];
      if (!bData || !bData.nodes) return false;
      const socketDataIdx = bData.nodes.findIndex(n => n && n.toLowerCase().includes('socket'));
      if (socketDataIdx === -1) return false;
      return pData.nodes.includes(socketDataIdx);
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
      if (lvl >= 15 && lvl <= 45) radius = 4;
      else if (lvl >= 46) radius = 5;
      
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
              if (window.isGlyphSocketed(pData)) {
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
              if (window.isGlyphSocketed(pData) && pData.glyph.level >= 46) {
                  let gData = window.D4_PARAGON_DATA?.paragonGlyphs?.[pData.glyph.id];
                  if (gData && classData && classData.legBonuses) {
                      let gName = gData.name;
                      let glyphInfo = classData.legBonuses.find(g => g.label === gName);
                      if (glyphInfo) {
                          let min = glyphInfo.min; let max = glyphInfo.max;
                          let rawBonus = min + ((max - min) * ((Math.min(150, pData.glyph.level) - 1) / 149));
                          
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

function getTotalActiveMinions(currentBuild) {
    if (!currentBuild || !currentBuild.bookOfTheDead) return 0;
    
    let total = 0;
    
    // Warriors (Base 4)
    if (currentBuild.bookOfTheDead.warriors?.node !== 'sacrifice') {
        let wCount = 4;
        if (currentBuild.bookOfTheDead.warriors?.spec === "Skirmisher" && currentBuild.bookOfTheDead.warriors?.node === "1") wCount += 2; // Formula uses ?2:0
        if (window.selectedSkills && window.selectedSkills["Master of Puppets"]) wCount += 3; // From Mod(582507894)
        if (typeof getEquipmentValues === 'function') {
            const eq = getEquipmentValues();
            if (eq && Object.values(eq).some(item => item && item.name && item.name.toLowerCase().includes("undercrown"))) wCount += 4;
            if (eq && Object.values(eq).some(item => item && item.name && item.name.toLowerCase().includes("deathgrip"))) wCount += 1;
        }
        total += wCount;
    }
    
    // Mages (Base 3)
    if (currentBuild.bookOfTheDead.mages?.node !== 'sacrifice') {
        let mCount = 3;
        if (window.selectedSkills && window.selectedSkills["Coven"] > 0) mCount += 2;
        if (typeof getEquipmentValues === 'function') {
            const eq = getEquipmentValues();
            if (eq && Object.values(eq).some(item => item && item.name && item.name.toLowerCase().includes("undercrown"))) mCount += 4;
            if (eq && Object.values(eq).some(item => item && item.name && item.name.toLowerCase().includes("the hand of naz"))) mCount += 1;
        }
        total += mCount;
    }
    
    // Golems
    if (window.selectedSkills && window.selectedSkills["Golem"] > 0) {
        let gCount = 1;
        if (window.selectedSkills["Gravebloom"] > 0) gCount = 3;
        total += gCount;
    }
    
    return total;
}


compileCharacterStats({}, false);
console.log(Object.keys(global.window.D4_COMPILED_STATS).filter(k => k.includes('Bloody Mess')));
