/* ============================================
   D4 Damage Calculator — Application Logic
   ============================================ */

(function () {
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
    btnSave:   document.getElementById('btn-save'),
    btnLoad:   document.getElementById('btn-load'),
    btnExport: document.getElementById('btn-export'),
    btnImport: document.getElementById('btn-import'),
    importFile: document.getElementById('import-file'),
    loadMenu:  document.getElementById('load-menu'),

    compareGrid:  document.getElementById('compare-grid'),
    compareEmpty: document.getElementById('compare-empty'),

    btnImportMaxroll: document.getElementById('btn-import-maxroll'),
    maxrollModal:     document.getElementById('maxroll-modal'),
    btnCloseModal:    document.getElementById('btn-close-modal'),
    btnCancelModal:   document.getElementById('btn-cancel-modal'),
    btnSubmitMaxroll: document.getElementById('btn-submit-maxroll'),
    maxrollTextarea:  document.getElementById('maxroll-textarea'),
    btnApiSync:       document.getElementById('btn-api-sync'),
    maxrollApiUrl:    document.getElementById('maxroll-api-url'),
    buildName:        document.getElementById('build-name'),

    nodesContainer: document.getElementById('nodes-container'),
    additionalBonusesContainer: document.getElementById('additional-bonuses-container'),
    legendaryBonusesContainer: document.getElementById('legendary-bonuses-container'),
  };

  // ---- State ----
  let currentBuild = createDefaultBuild();

  // ---- Build Model ----
  function createDefaultBuild() {
    return {
      name: 'New Build',
      class: 'Barbarian',
      weaponDamage: 0,
      skillDamage: 0,
      strength: 0,
      intelligence: 0,
      willpower: 0,
      dexterity: 0,
      aps: 1,
      level: 0,
      toughness: 0,
      armor: 0,
      physRes: 0,
      fireRes: 0,
      lightningRes: 0,
      coldRes: 0,
      poisonRes: 0,
      shadowRes: 0,
      maxLife: 0,
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
      }
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
    { label: 'Bone Graft: 40%',     value: 40  },
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

  function getDbItems(slotName) {
    if (!window.D4_DATABASE || !window.D4_DATABASE.itemDatabase) return [];
    let mapped = slotName;
    if (slotName === 'Left Ring' || slotName === 'Right Ring') mapped = 'Ring';
    if (slotName === 'Ranged Weapon') mapped = 'Mainhand'; // Map to weapon pool
    if (slotName === 'Bludgeoning Weapon' || slotName === 'Slicing Weapon') mapped = 'Mainhand'; // Map to weapon pool
    
    // Check class filter
    const currentClassVal = document.getElementById('class-select')?.value;
    const d4Idx = currentClassVal ? D4_CLASS_MAP[currentClassVal] : undefined;
    
    const items = window.D4_DATABASE.itemDatabase[mapped] || [];
    return items.filter(i => {
      if (i.classes && d4Idx !== undefined) {
        if (i.classes[d4Idx] !== 1) return false;
      }
      return true;
    });
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

  function getAdditionalBonusValues() {
    const selectedClass = dom.classSelect ? dom.classSelect.value : 'Barbarian';
    const classData = CLASS_PARAGON_DATA[selectedClass];
    const vals = [];
    for (let i = 1; i <= 5; i++) {
      if (classData) {
        const sel = document.getElementById(`additional-bonus-sel-${i}`);
        if (sel && sel.value) {
          const glyphName = sel.value;
          const glyphInfo = classData.addBonuses.find(g => g.label.startsWith(glyphName));
          if (glyphInfo && glyphInfo.value === 'custom') {
            const customInp = document.getElementById(`add-bonus-custom-${i}`);
            const val = customInp ? parseFloat(customInp.value) || 0 : 0;
            vals.push(val);
            const disp = document.getElementById(`additional-bonus-disp-${i}`);
            if (disp) disp.textContent = val + '%';
          } else {
            vals.push(glyphInfo ? glyphInfo.value : 0);
            const disp = document.getElementById(`additional-bonus-disp-${i}`);
            if (disp) disp.textContent = (glyphInfo ? glyphInfo.value : 0) + '%';
          }
        } else {
          vals.push(0);
          const disp = document.getElementById(`additional-bonus-disp-${i}`);
          if (disp) disp.textContent = '0%';
        }
      } else {
        const inp = document.getElementById(`additional-bonus-${i}`);
        vals.push(inp ? parseFloat(inp.value) || 0 : 0);
      }
    }
    return vals;
  }

  function renderAdditionalBonusInputs(className, savedValues) {
    const container = dom.additionalBonusesContainer;
    if (!container) return;
    const classData = CLASS_PARAGON_DATA[className];
    container.innerHTML = '';
    
    const sv = Array.isArray(savedValues) ? savedValues : [0,0,0,0,0];

    for (let i = 1; i <= 5; i++) {
      const group = document.createElement('div');
      group.className = 'input-group';
      const label = document.createElement('label');
      label.textContent = `Additional Bonus ${i}`;
      // Label appended later to place it underneath
      
      const saved = sv[i - 1];

      if (classData) {
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.gap = '0.25rem';
        rowDiv.style.alignItems = 'center';
        
        const sel = document.createElement('select');
        sel.id = `additional-bonus-sel-${i}`;
        sel.style.flex = '2';
        
        const noneOpt = document.createElement('option');
        noneOpt.value = '';
        noneOpt.textContent = 'None';
        sel.appendChild(noneOpt);
        
        classData.addBonuses.forEach(opt => {
          const o = document.createElement('option');
          const glyphName = opt.label.split(':')[0]; // e.g. "Abyssal"
          o.value = glyphName;
          o.textContent = glyphName; // Only display the name, without the percentage
          sel.appendChild(o);
        });
        
        const disp = document.createElement('span');
        disp.id = `additional-bonus-disp-${i}`;
        disp.style.flex = '1';
        disp.style.textAlign = 'right';
        disp.style.fontSize = '0.85rem';
        disp.style.color = 'var(--primary)';
        disp.style.fontWeight = '600';
        disp.textContent = '0%';
        
        if (typeof saved === 'object' && saved !== null) {
          sel.value = saved.name || '';
        } else {
          sel.value = '';
        }
        
        function handleCustomAddInput() {
          const glyphInfo = classData.addBonuses.find(g => g.label.startsWith(sel.value));
          let customInp = document.getElementById(`add-bonus-custom-${i}`);
          if (glyphInfo && glyphInfo.value === 'custom') {
            if (!customInp) {
              customInp = document.createElement('input');
              customInp.type = 'number';
              customInp.id = `add-bonus-custom-${i}`;
              customInp.style.flex = '1';
              customInp.style.marginLeft = '0.25rem';
              customInp.style.width = '60px';
              customInp.placeholder = '%';
              
              customInp.value = (typeof saved === 'object' && saved !== null) ? (saved.customValue || 0) : 0;
              
              customInp.addEventListener('input', () => {
                disp.textContent = customInp.value ? `${customInp.value}%` : '0%';
                calculate();
              });
              rowDiv.insertBefore(customInp, disp);
            }
            disp.textContent = customInp.value ? `${customInp.value}%` : '0%';
          } else {
            if (customInp) customInp.remove();
            disp.textContent = (glyphInfo ? glyphInfo.value : 0) + '%';
          }
        }
        
        handleCustomAddInput();
        
        sel.addEventListener('change', () => {
          handleCustomAddInput();
          updateAdditionalBonusDropdowns();
          calculate();
        });
        
        rowDiv.appendChild(sel);
        rowDiv.appendChild(disp);
        group.appendChild(rowDiv);
        group.appendChild(label); // Moved label below the input
      } else {
        const inp = document.createElement('input');
        inp.type = 'number';
        inp.id = `additional-bonus-${i}`;
        inp.value = (typeof saved === 'number') ? saved : 0;
        inp.step = 'any';
        inp.placeholder = '0';
        inp.addEventListener('input', calculate);
        group.appendChild(inp);
        group.appendChild(label); // Moved label below the input
      }
      container.appendChild(group);
    }
    updateAdditionalBonusDropdowns();
    calculate();
  }

  function updateAdditionalBonusDropdowns() {
    const selected = [];
    for (let i = 1; i <= 5; i++) {
      const sel = document.getElementById(`additional-bonus-sel-${i}`);
      if (sel && sel.value) {
        selected.push(sel.value);
      }
    }
    for (let i = 1; i <= 5; i++) {
      const sel = document.getElementById(`additional-bonus-sel-${i}`);
      if (sel) {
        Array.from(sel.options).forEach(opt => {
          if (opt.value && selected.includes(opt.value) && opt.value !== sel.value) {
            opt.disabled = true;
          } else {
            opt.disabled = false;
          }
        });
      }
    }
  }

  function getLegendaryBonusValues() {
    const selectedClass = dom.classSelect ? dom.classSelect.value : 'Barbarian';
    const classData = CLASS_PARAGON_DATA[selectedClass];
    const vals = [];
    for (let i = 1; i <= 5; i++) {
      if (classData) {
        // Read directly from the Additional Bonus section
        const sel = document.getElementById(`additional-bonus-sel-${i}`);
        const lvl = document.getElementById(`legendary-bonus-lvl-${i}`);
        const disp = document.getElementById(`legendary-bonus-disp-${i}`);
        
        if (sel && lvl && sel.value) {
          const glyphName = sel.value;
          const level = Math.max(1, Math.min(150, parseInt(lvl.value) || 1));
          
          if (level < 46) {
            vals.push(0);
            if (disp) disp.textContent = '0.0% (Lvl < 46)';
          } else {
            const glyphInfo = classData.legBonuses.find(g => g.label === glyphName);
            if (glyphInfo) {
              let rawBonus = glyphInfo.min + ((glyphInfo.max - glyphInfo.min) * ((level - 1) / 149));
              let finalBonus = rawBonus;
              let isEffective = false;
              if (glyphName === 'Essence') {
                finalBonus = rawBonus * 0.8; // Active 80% of the time (not healthy condition)
                isEffective = true;
              }
              vals.push(finalBonus);
              if (disp) {
                disp.textContent = finalBonus.toFixed(1) + '%' + (isEffective ? ' (Effective)' : '');
              }
            } else {
              vals.push(0);
              if (disp) disp.textContent = '0.0%';
            }
          }
        } else {
          vals.push(0);
          if (disp) disp.textContent = '0.0%';
        }
      } else {
        const inp = document.getElementById(`legendary-bonus-inp-${i}`);
        vals.push(inp ? parseFloat(inp.value) || 0 : 0);
      }
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
      // Icon placeholder
      if (slot === 'Left Ring' || slot === 'Right Ring') icon.textContent = 'R';
      else icon.textContent = slot.substring(0, 2).toUpperCase();
      
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
      
      if (val && val.sockets) {
        val.sockets.forEach(gem => {
          const circle = document.createElement('div');
          circle.className = 'socket-circle filled';
          circle.title = gem;
          // Determine color based on gem type
          if (gem.includes('Ruby')) circle.style.background = '#e74c3c';
          else if (gem.includes('Amethyst')) circle.style.background = '#9b59b6';
          else if (gem.includes('Emerald')) circle.style.background = '#2ecc71';
          else if (gem.includes('Topaz')) circle.style.background = '#f1c40f';
          else if (gem.includes('Sapphire')) circle.style.background = '#3498db';
          else if (gem.includes('Diamond')) circle.style.background = '#bdc3c7';
          else if (gem.includes('Skull')) circle.style.background = '#ecf0f1';
          socketContainer.appendChild(circle);
        });
      }
      
      box.appendChild(icon);
      box.appendChild(textContainer);
      box.appendChild(socketContainer);
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
                  `Defenders gain <span class="d4-tooltip-number">X</span> Thorns. Whenever they are damaged, their bones splinter and deal <span class="d4-tooltip-number">50%</span> of their Thorns to nearby enemies.<br><br>Commanding your Defenders causes them to Taunt nearby enemies for <span class="d4-tooltip-number">6</span> seconds.`,
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
            if (tooltip) tooltip.classList.add('hidden');
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
      footer.appendChild(sb);
    }
  }

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

  function calculate() {
    if (isLoading) return;
   try {
    const weaponDmg = parseFloat(dom.weaponDamage.value) || 0;
    const skillPct  = parseFloat(dom.skillDamage.value) || 0;
    const str       = parseFloat(dom.strength.value) || 0;
    const intel     = parseFloat(dom.intelligence.value) || 0;
    const will      = parseFloat(dom.willpower.value) || 0;
    const dex       = parseFloat(dom.dexterity.value) || 0;
    const aps       = parseFloat(dom.aps.value) || 1;

    // Base Damage = Skill% × Weapon Damage
    // Skill damage is a percentage, so: (skillPct / 100) × weaponDmg
    const baseDamage = (skillPct / 100) * weaponDmg;

    // Get Class main stat multiplier
    const selectedClass = dom.classSelect ? dom.classSelect.value : 'Barbarian';
    const mainStatInfo = getClassMainStat(selectedClass);
    
    let mainStatValue = 0;
    if (mainStatInfo.name === 'Strength') mainStatValue = str;
    else if (mainStatInfo.name === 'Intelligence') mainStatValue = intel;
    else if (mainStatInfo.name === 'Willpower') mainStatValue = will;
    else if (mainStatInfo.name === 'Dexterity') mainStatValue = dex;
    
    const mainStatMultiplier = 1 + (mainStatValue * mainStatInfo.factor);

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
        if (stat === mainStatInfo.name) {
          group.classList.add('main-stat-active');
        } else {
          group.classList.remove('main-stat-active');
        }
      }
    });

    // Additive: 1 + sum all (value / 100)
    const additives = getAdditiveValues();
    const additiveRawSum = additives.reduce((sum, a) => sum + (a.value / 100), 0);
    const additiveSum = 1 + additiveRawSum;

    // Multiplicative: product of all (1 + value/100)
    const multiplicatives = getMultiplicativeValues();
    const nodeEls = getNodeEls();
    const addBonusVals = getAdditionalBonusValues();
    const legVals = getLegendaryBonusValues();
    const staticMults = [
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
    const singleHit = rawDamage * MONSTER_DR;
    const totalDamage = singleHit * aps;

    // Update DOM
    dom.baseDmgDisplay.innerHTML = formatNumber(baseDamage);
    dom.additiveTotal.textContent = formatMultiplier(finalAdditiveSum);
    dom.multTotal.textContent = formatMultiplier(multProduct);

    dom.resultBase.innerHTML = formatNumber(baseDamage);
    if (dom.resultIntelLabel) dom.resultIntelLabel.textContent = `${mainStatInfo.name} ×`;
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
    currentBuild.maxLife = dom.maxLife ? parseFloat(dom.maxLife.value) || 0 : 0;
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
    currentBuild.name = dom.buildName.value || 'New Build';
    currentBuild.class = selectedClass;
    currentBuild.equipment = getEquipmentValues();
    
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
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(currentBuild));
   } catch(e) { console.error('calculate() error:', e); }
  }

  function getAdditiveValues() {
    const rows = dom.additiveBody.querySelectorAll('tr');
    const values = [];
    rows.forEach(row => {
      const nameInput = row.querySelector('.row-name-input');
      const valueInput = row.querySelector('.row-value-input');
      values.push({
        name: nameInput.value,
        value: parseFloat(valueInput.value) || 0,
      });
    });
    currentBuild.additives = values;
    return values;
  }

  function getMultiplicativeValues() {
    const rows = dom.multBody.querySelectorAll('tr');
    const values = [];
    rows.forEach(row => {
      const nameInput = row.querySelector('.row-name-input');
      const valueInput = row.querySelector('.row-value-input');
      values.push({
        name: nameInput.value,
        value: parseFloat(valueInput.value) || 0,
      });
    });
    currentBuild.multiplicatives = values;
    return values;
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
  function createAdditiveRow(name = '', value = '') {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="row-name-input" value="${escapeHtml(name)}" placeholder="Bonus name..."></td>
      <td><input type="number" class="row-value-input" value="${value}" step="any" placeholder="0"></td>
      <td class="formula-value">0.00</td>
      <td class="col-delete"><button class="btn-delete" title="Remove">✕</button></td>
    `;

    // Event listeners
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

    dom.additiveBody.appendChild(tr);
    return tr;
  }

  function createMultiplicativeRow(name = '', value = '') {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="row-name-input" value="${escapeHtml(name)}" placeholder="Multiplier name..."></td>
      <td><input type="number" class="row-value-input" value="${value}" step="any" placeholder="0"></td>
      <td class="formula-value">1.00</td>
      <td class="running-damage">—</td>
      <td class="col-delete"><button class="btn-delete" title="Remove">✕</button></td>
    `;

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
    isLoading = true;
    try {
      // Deep clone to prevent calculate() from mutating the data mid-load
      const b = JSON.parse(JSON.stringify(build));
    currentBuild = b;

    dom.buildName.value = b.name || 'New Build';
    if (dom.classSelect) dom.classSelect.value = b.class || 'Barbarian';
    dom.weaponDamage.value = b.weaponDamage || 0;
    dom.skillDamage.value = b.skillDamage || 0;

    dom.strength.value = b.strength || 0;
    dom.intelligence.value = b.intelligence || 0;
    dom.willpower.value = b.willpower || 0;
    dom.dexterity.value = b.dexterity || 0;
    dom.aps.value = b.aps || 1;
    if (dom.level) dom.level.value = b.level || 0;
    if (dom.toughness) dom.toughness.value = b.toughness || 0;
    if (dom.armor) dom.armor.value = b.armor || 0;
    if (dom.physRes) dom.physRes.value = b.physRes || 0;
    if (dom.fireRes) dom.fireRes.value = b.fireRes || 0;
    if (dom.lightningRes) dom.lightningRes.value = b.lightningRes || 0;
    if (dom.coldRes) dom.coldRes.value = b.coldRes || 0;
    if (dom.poisonRes) dom.poisonRes.value = b.poisonRes || 0;
    if (dom.shadowRes) dom.shadowRes.value = b.shadowRes || 0;
    if (dom.maxLife) dom.maxLife.value = b.maxLife || 0;
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
    renderNodeInputs(b.class || 'Barbarian', nodes);
    
    const glyphs = b.glyphs || [0,0,0,0,0,0,0,0,0,0];
    const addBonuses = glyphs.slice(0, 5);
    renderAdditionalBonusInputs(b.class || 'Barbarian', addBonuses);
    
    // For legacy saves where level was packed into addBonuses
    const legBonuses = glyphs.slice(5, 10).map((v, i) => {
        if (CLASS_PARAGON_DATA[b.class || 'Barbarian'] && addBonuses[i] !== null && typeof addBonuses[i] === 'object') {
            return addBonuses[i].level || v || 1;
        }
        return v;
    });
    renderLegendaryBonusInputs(b.class || 'Barbarian', legBonuses);
    renderEquipment(dom.classSelect ? dom.classSelect.value : 'Barbarian', {});
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

  function newBuild() {
    loadBuildToUI(createDefaultBuild());
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




  // ---- Maxroll Parsing ----
  function parseMaxrollStats(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    const ignoreList = [
      'weapon speed',
      'attack speed bonus',
      'summon attack speed',
      'critical strike chance',
      'thorns'
    ];

    // Clear existing additive rows first before importing new stats
    dom.additiveBody.innerHTML = '';

    let count = 0;
    const parsedStats = {};

    for (let i = 0; i < lines.length - 1; i++) {
      const name = lines[i];
      const valStr = lines[i+1];
      
      // Check if next line looks like a value (e.g. "5,374" or "1,192.6%")
      if (/^[\d,.]+[%]?$/.test(valStr)) {
        const nameLower = name.toLowerCase();
        const value = parseFloat(valStr.replace(/,/g, '').replace('%', ''));

        if (nameLower === 'base weapon damage') {
          dom.weaponDamage.value = value;
          count++;
        } else if (nameLower === 'strength') {
          dom.strength.value = value;
          count++;
        } else if (nameLower === 'intelligence') {
          dom.intelligence.value = value;
          count++;
        } else if (nameLower === 'willpower') {
          dom.willpower.value = value;
          count++;
        } else if (nameLower === 'dexterity') {
          dom.dexterity.value = value;
          count++;
        } else if (nameLower === 'level') {
          if (dom.level) dom.level.value = value;
          count++;
        } else if (nameLower === 'toughness') {
          if (dom.toughness) dom.toughness.value = value;
          count++;
        } else if (nameLower === 'armor') {
          if (dom.armor) dom.armor.value = value;
          count++;
        } else if (nameLower === 'physical resistance') {
          if (dom.physRes) dom.physRes.value = value;
          count++;
        } else if (nameLower === 'fire resistance') {
          if (dom.fireRes) dom.fireRes.value = value;
          count++;
        } else if (nameLower === 'lightning resistance') {
          if (dom.lightningRes) dom.lightningRes.value = value;
          count++;
        } else if (nameLower === 'cold resistance') {
          if (dom.coldRes) dom.coldRes.value = value;
          count++;
        } else if (nameLower === 'poison resistance') {
          if (dom.poisonRes) dom.poisonRes.value = value;
          count++;
        } else if (nameLower === 'shadow resistance') {
          if (dom.shadowRes) dom.shadowRes.value = value;
          count++;
        } else if (nameLower === 'maximum life') {
          if (dom.maxLife) dom.maxLife.value = value;
          count++;
        } else if (nameLower === 'potion capacity') {
          if (dom.potionCapacity) dom.potionCapacity.value = value;
          count++;
        } else if (nameLower === 'healing received') {
          if (dom.healingReceived) dom.healingReceived.value = value;
          count++;
        } else if (nameLower === 'life per 5 seconds') {
          if (dom.lifePer5s) dom.lifePer5s.value = value;
          count++;
        } else if (nameLower === 'summon armor') {
          if (dom.summonArmor) dom.summonArmor.value = value;
          count++;
        } else if (nameLower === 'all damage reduction') {
          if (dom.damageReductionAll) dom.damageReductionAll.value = value;
          count++;
        } else if (nameLower === 'barrier bonus') {
          if (dom.barrierBonus) dom.barrierBonus.value = value;
          count++;
        } else if (nameLower === 'dodge chance') {
          if (dom.dodgeChance) dom.dodgeChance.value = value;
          count++;
        } else if (nameLower === 'maximum essence') {
          if (dom.maxEssence) dom.maxEssence.value = value;
          count++;
        } else if (nameLower === 'essence regeneration') {
          if (dom.essenceRegen) dom.essenceRegen.value = value;
          count++;
        } else if (nameLower === 'movement speed') {
          if (dom.movementSpeed) dom.movementSpeed.value = value;
          count++;
        } else if (nameLower === 'lucky hit chance bonus') {
          if (dom.luckyHit) dom.luckyHit.value = value;
          count++;
        } else if (nameLower === 'crowd control duration bonus') {
          if (dom.ccDuration) dom.ccDuration.value = value;
          count++;
        } else if (nameLower === 'experience bonus') {
          if (dom.expBonus) dom.expBonus.value = value;
          count++;
        } else if (nameLower === 'damage reduction') {
          if (dom.damageReduction) dom.damageReduction.value = value;
          count++;
        } else if (!ignoreList.includes(nameLower)) {
          // If it's not a base stat and not in ignore list, it's an additive.
          // Store in parsedStats using the normalized lower-case name to avoid duplicate additive entries.
          if (parsedStats[nameLower] === undefined) {
            parsedStats[nameLower] = { name, value };
            count++;
          }
        }
        
        // Skip the value line we just processed
        i++;
      }
    }

    // Now append the unique additive rows
    Object.values(parsedStats).forEach(stat => {
      createAdditiveRow(stat.name, stat.value);
    });
    
    if (count > 0) {
      calculate();
      showToast(`Imported ${count} stats from Maxroll`);
    } else {
      showToast(`No valid stats found to import`);
    }
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
    [dom.weaponDamage, dom.skillDamage, dom.strength, dom.intelligence, dom.willpower, dom.dexterity, dom.level, dom.toughness, dom.armor, dom.physRes, dom.fireRes, dom.lightningRes, dom.coldRes, dom.poisonRes, dom.shadowRes, dom.maxLife, dom.potionCapacity, dom.healingReceived, dom.lifePer5s, dom.summonArmor, dom.damageReductionAll, dom.barrierBonus, dom.dodgeChance, dom.maxEssence, dom.essenceRegen, dom.movementSpeed, dom.luckyHit, dom.ccDuration, dom.expBonus, dom.damageReduction, dom.aps, dom.buildName].filter(Boolean).forEach(el => {
      el.addEventListener('input', calculate);
      if (el.tagName === 'SELECT') {
        el.addEventListener('change', calculate);
      }
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
      dom.classSelect.addEventListener('change', () => {
        if (isLoading) return;
        const selectedClass = dom.classSelect.value;
        if (currentBuild && currentBuild.class === selectedClass) return; // Prevent spurious resets
        
        const currentNodes = getNodeEls().map(el => el ? parseFloat(el.value) || 0 : 0);
        renderNodeInputs(dom.classSelect.value, currentNodes);
        // When changing class, get the current state to pass through (it handles resets gracefully)
        const currentAddSave = [];
        const currentLegSave = [];
        const oldClassData = CLASS_PARAGON_DATA[currentBuild.class || 'Barbarian'];
        const newClassData = CLASS_PARAGON_DATA[dom.classSelect.value];
        
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
        
        renderAdditionalBonusInputs(dom.classSelect.value, currentAddSave);
        renderLegendaryBonusInputs(dom.classSelect.value, currentLegSave);
        renderEquipment(dom.classSelect.value, currentBuild ? currentBuild.equipment : {});
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
      if (confirm('Start a new build? Unsaved changes will be lost.')) {
        newBuild();
      }
    });

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

    // Maxroll Modal Events
    dom.btnImportMaxroll.addEventListener('click', () => {
      dom.maxrollTextarea.value = '';
      dom.maxrollModal.classList.remove('hidden');
    });

    dom.btnCloseModal.addEventListener('click', () => {
      dom.maxrollModal.classList.add('hidden');
    });

    dom.btnCancelModal.addEventListener('click', () => {
      dom.maxrollModal.classList.add('hidden');
    });

    dom.btnSubmitMaxroll.addEventListener('click', () => {
      const text = dom.maxrollTextarea.value;
      if (text) {
        parseMaxrollStats(text);
      }
      dom.maxrollModal.classList.add('hidden');
    });

    dom.btnApiSync.addEventListener('click', async () => {
      const url = dom.maxrollApiUrl.value.trim();
      if (!url) return;
      
      const match = url.match(/planner\/([a-zA-Z0-9]+)/);
      if (!match) {
        alert('Invalid Maxroll planner URL.');
        return;
      }
      
      const profileId = match[1];
      const btn = dom.btnApiSync;
      btn.textContent = 'Syncing...';
      btn.disabled = true;
      
      try {
        const res = await fetch(`https://planners.maxroll.gg/profiles/d4/${profileId}`);
        if (!res.ok) throw new Error(`Failed to fetch from Maxroll (Status: ${res.status}).`);
        
        const rawData = await res.json();
        console.log("Maxroll API Response:", rawData);
        
        let parsedData = rawData;
        if (rawData.data && typeof rawData.data === 'string') {
          parsedData = JSON.parse(rawData.data);
        }
        
        const profile = parsedData.profiles && parsedData.profiles[0];
        if (!profile) {
          throw new Error('Profile data not found. Raw response: ' + JSON.stringify(rawData).substring(0, 100));
        }
        
        if (profile.minionSpec && Array.isArray(profile.minionSpec)) {
          const wMap = ['Skirmisher', 'Defender', 'Reaper'];
          const mMap = ['Shadow Mage', 'Cold Mage', 'Bone Mage'];
          const gMap = ['Bone Golem', 'Blood Golem', 'Iron Golem'];
          
          if (profile.minionSpec[0] !== undefined) currentBuild.bookOfTheDead.warriors.spec = wMap[profile.minionSpec[0]];
          if (profile.minionSpec[1] !== undefined) currentBuild.bookOfTheDead.mages.spec = mMap[profile.minionSpec[1]];
          if (profile.minionSpec[2] !== undefined) currentBuild.bookOfTheDead.golems.spec = gMap[profile.minionSpec[2]];
        }
        
        currentBuild.bookOfTheDead.warriors.node = null;
        currentBuild.bookOfTheDead.mages.node = null;
        currentBuild.bookOfTheDead.golems.node = null;

        if (profile.minionUpgrades) {
          profile.minionUpgrades.forEach(upg => {
            let node = null;
            if (upg.includes('UpgradeA')) node = '1';
            else if (upg.includes('UpgradeB')) node = '2';
            else if (upg.includes('Sacrifice')) node = '3';
            
            if (node) {
              if (upg.includes('SkeletonWarrior')) currentBuild.bookOfTheDead.warriors.node = node;
              else if (upg.includes('SkeletonMage')) currentBuild.bookOfTheDead.mages.node = node;
              else if (upg.includes('Golem')) currentBuild.bookOfTheDead.golems.node = node;
            }
          });
        }
        
        if (profile.level) {
          currentBuild.level = profile.level;
          dom.level.value = currentBuild.level;
        }
        
        if (profile.class === 4) {
          currentBuild.class = 'Necromancer';
          dom.classSelect.value = 'Necromancer';
          dom.classSelect.dispatchEvent(new Event('change'));
        }
        
        saveBuild();
        renderEquipment();
        calculateDamage();
        
        dom.maxrollModal.classList.add('hidden');
        alert('Maxroll profile synced successfully!');
      } catch (err) {
        alert('Error: ' + err.message);
      } finally {
        btn.textContent = 'Sync Profile';
        btn.disabled = false;
      }
    });
  }

  window.selectedSkills = {};
function renderSkills() { 
  const container = document.getElementById('skills-container'); 
  if (!container) return; 
  container.innerHTML = ''; 
  if (typeof skillsDatabase === 'undefined') return; 
  for (const [category, skills] of Object.entries(skillsDatabase)) { 
    const catDiv = document.createElement('div'); 
    catDiv.className = 'skill-category'; 
    const catTitle = document.createElement('h3'); 
    catTitle.className = 'skill-category-title'; 
    catTitle.textContent = category + ' Skills'; 
    catDiv.appendChild(catTitle); 
    const skillsList = document.createElement('div'); 
    skillsList.className = 'skill-list'; 
    skills.forEach(skill => { 
      const skillGroup = document.createElement('div'); 
      skillGroup.className = 'skill-group'; 
      const baseRow = createSkillRow(skill.name, skill.maxRank, 0); 
      skillGroup.appendChild(baseRow); 
      if (skill.enhancement) { 
        const enhRow = createSkillRow(skill.enhancement.name, skill.enhancement.maxRank, 1, skill.name); 
        skillGroup.appendChild(enhRow); 
        if (skill.enhancement.branches && skill.enhancement.branches.length > 0) { 
          const branchContainer = document.createElement('div'); 
          branchContainer.className = 'skill-branches'; 
          skill.enhancement.branches.forEach(branch => { 
            const bRow = createSkillRow(branch.name, branch.maxRank, 2, skill.enhancement.name, skill.enhancement.branches.map(b => b.name)); 
            branchContainer.appendChild(bRow); 
          }); 
          skillGroup.appendChild(branchContainer); 
        } 
      } 
      skillsList.appendChild(skillGroup); 
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
  nameSpan.textContent = name; 
  if (indentLevel > 0) nameSpan.innerHTML = '<span style="color:#666;">└</span> ' + name; 
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
    init(); // Setup listeners
    try {
      const autosave = JSON.parse(localStorage.getItem(AUTOSAVE_KEY));
      if (autosave && typeof autosave === 'object') {
        loadBuildToUI(autosave);
        return; // We loaded successfully, skip default render
      }
    } catch(e) {
      console.error("Autosave load failed:", e);
      alert("Error loading save data: " + e.message + "\nIf this persists, please use the Reset Data button.");
    }
    
    // If we didn't load a build, run the default render
    renderNodeInputs(dom.classSelect ? dom.classSelect.value : 'Barbarian', [0,0,0,0]);
    renderAdditionalBonusInputs(dom.classSelect ? dom.classSelect.value : 'Barbarian', [0,0,0,0,0]);
    renderLegendaryBonusInputs(dom.classSelect ? dom.classSelect.value : 'Barbarian', [0,0,0,0,0]);
    renderEquipment(dom.classSelect ? dom.classSelect.value : 'Barbarian', {});
  }

  let currentModalSlot = null;

  function switchModalTab(tabName) {
    const tabs = document.querySelectorAll('.item-modal-tab');
    const selectTab = tabs[0];
    const editTab = tabs[1];
    const aspectTab = tabs[2];
    const gemTab = tabs[3];
    const selectBody = document.getElementById('item-modal-select-body');
    const editBody = document.getElementById('item-modal-edit-body');
    const aspectBody = document.getElementById('item-modal-aspect-body');
    const gemBody = document.getElementById('item-modal-gem-body');
    
    // Reset all
    [selectTab, editTab, aspectTab, gemTab].forEach(t => t?.classList.remove('active'));
    [selectBody, editBody, aspectBody, gemBody].forEach(b => { if(b) b.style.display = 'none'; });

    if (tabName === 'select') {
      selectTab?.classList.add('active');
      if (selectBody) selectBody.style.display = 'flex';
    } else if (tabName === 'edit') {
      editTab?.classList.add('active');
      if (editBody) editBody.style.display = 'flex';
    } else if (tabName === 'aspect') {
      aspectTab?.classList.add('active');
      if (aspectBody) aspectBody.style.display = 'flex';
    } else if (tabName === 'gem') {
      gemTab?.classList.add('active');
      if (gemBody) gemBody.style.display = 'flex';
    }
  }

  function renderEditTab(slotName) {
    const editBody = document.getElementById('item-modal-edit-body');
    const box = document.querySelector(`.equipment-slot-box[data-slot="${slotName}"]`);
    const tabs = document.querySelectorAll('.item-modal-tab');
    const editTabBtn = tabs[1];
    const aspectTabBtn = tabs[2];
    const gemTabBtn = tabs[3];
    
    if (!editBody || !box) return;

    if (!box.dataset.value) {
      editTabBtn.disabled = true;
      aspectTabBtn.disabled = true;
      if (gemTabBtn) gemTabBtn.disabled = true;
      editBody.innerHTML = '';
      return;
    }
    
    editTabBtn.disabled = false;
    aspectTabBtn.disabled = false;
    if (gemTabBtn) gemTabBtn.disabled = false;
    
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
    const currentClassVal = document.getElementById('class-select').value;
    const classIdx = D4_CLASS_MAP[currentClassVal];
    // Filter affixes by class
    const affixesBase = (window.D4_DATABASE?.affixes || [])
      .filter(a => classIdx === undefined || !a.classes || a.classes[classIdx] === 1);
      
    // Determine allowed slots for affixes
    function isAffixAllowedForSlot(affixSlots, slotName) {
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

    const regularAffixes = affixesBase.filter(a => !a.tempering && isAffixAllowedForSlot(a.slots, slotName));
    const temperAffixes = affixesBase.filter(a => a.tempering && isAffixAllowedForSlot(a.slots, slotName));

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
          const vals = itemObj.aspectValues || [];
          let valIndex = 0;
          aspectDescHtml = aspectObj.desc.replace(/(?:\[([\d\.,]+)\s*-\s*([\d\.,]+)\])|#/g, (match, min, max) => {
            const v = vals[valIndex] !== undefined ? vals[valIndex] : (max || min || 0);
            let placeholder = min && max ? `${min}-${max}` : 'value';
            let minAttr = min ? ` min="${min}"` : '';
            let maxAttr = ''; // Allow overriding max for higher item power tiers
            let stepAttr = (min && min.includes('.')) || (max && max.includes('.')) ? ' step="0.1"' : ' step="1"';
            if (!min && !max) stepAttr = ' step="any"';
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
          const v = vals[valIndex] !== undefined ? vals[valIndex] : (max || min || 0);
          let placeholder = min && max ? `${min}-${max}` : 'value';
          let minAttr = min ? ` min="${min}"` : '';
          let stepAttr = (min && min.includes('.')) || (max && max.includes('.')) ? ' step="0.1"' : ' step="1"';
          if (!min && !max) stepAttr = ' step="any"';
          const inputHtml = `<input type="number" class="aspect-val-input" data-idx="${valIndex}" value="${v}" placeholder="${placeholder}" title="${placeholder}"${minAttr}${stepAttr} style="width: 56px; padding: 2px 4px; text-align: center; border: 1px solid #555; border-radius: 3px; background: rgba(0,0,0,0.5); color: #d18a45; font-family: inherit; font-size: 0.9em; margin: 0 2px;">`;
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
        datalistId = 'affixes-list'; // transfigures share the same affixes pool
      }
      
      const currentName = arr && arr[idx] ? arr[idx] : '';
      const vals = valuesArr[idx] || [];
      
      const obj = (window.D4_DATABASE?.affixes || []).find(a => a.name === currentName);
      
      if (!currentName || !obj) {
        return `<input list="${datalistId}" class="edit-dropdown" data-type="${type}" data-idx="${idx}" placeholder="Search for ${placeholderText}..." value="">`;
      }
      
      let valIndex = 0;
      let descHtml = obj.name.replace(/(?:\[([\d\.,]+)\s*-\s*([\d\.,]+)\])|#/g, (match, min, max) => {
        const v = vals[valIndex] !== undefined ? vals[valIndex] : (max || min || 0);
        let placeholder = min && max ? `${min}-${max}` : 'value';
        let minAttr = min ? ` min="${min}"` : '';
        let maxAttr = ''; // Allow overriding max for higher item power tiers
        let stepAttr = (min && min.includes('.')) || (max && max.includes('.')) ? ' step="0.1"' : ' step="1"';
        if (!min && !max) stepAttr = ' step="any"';
        const inputHtml = `<input type="number" class="affix-val-input" data-type="${type}" data-group="${idx}" data-idx="${valIndex}" value="${v}" placeholder="${placeholder}" title="${placeholder}"${minAttr}${maxAttr}${stepAttr} style="width: 56px; padding: 2px 4px; text-align: center; border: 1px solid #555; border-radius: 3px; background: rgba(0,0,0,0.5); color: #fff; font-family: inherit; font-size: 0.9em; margin: 0 2px;">`;
        valIndex++;
        return inputHtml;
      });
      
      return `
        <div style="display:flex; flex-direction: column; background: rgba(255,255,255,0.05); padding: 4px; border-radius: 4px; gap: 4px;">
          <div style="display:flex; justify-content: flex-end;">
            <button class="edit-btn btn-clear-affix" data-type="${type}" data-idx="${idx}" style="padding: 2px 8px; font-size: 0.75rem;">Change</button>
          </div>
          <div style="font-size: 0.9rem; line-height: 1.5; color: #ccc;">
            ${descHtml}
          </div>
        </div>
      `;
    }

    editBody.innerHTML = `
      ${aspectsDatalist}
      ${affixesDatalist}
      ${temperDatalist}
      <div class="edit-header">
        <div class="edit-icon-large">${rarity === 'mythic' ? 'M' : (rarity === 'unique' ? 'U' : (rarity === 'legendary' ? 'L' : 'R'))}</div>
        <div class="edit-title-area">
          <div class="edit-item-name rarity-${rarity}">${itemObj.name}</div>
          <div class="edit-input-row">
            <input type="number" id="edit-power" value="${itemObj.power || 900}"> Item Power
          </div>
          <div class="edit-input-row">
            Quality: <input type="number" id="edit-quality" value="${itemObj.quality || 0}" min="0" max="25"> / 25
          </div>
        </div>
      </div>
      
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

      <div class="edit-section">
        <div class="edit-section-title tan">Sockets</div>
        <div class="edit-section-content" style="display: flex; gap: 8px;">
          <button class="edit-btn btn-socket" data-idx="0" style="flex: 1; padding: 4px;">${(itemObj.sockets && itemObj.sockets[0]) ? itemObj.sockets[0] : 'Empty Socket'}</button>
          <button class="edit-btn btn-socket" data-idx="1" style="flex: 1; padding: 4px;">${(itemObj.sockets && itemObj.sockets[1]) ? itemObj.sockets[1] : 'Empty Socket'}</button>
        </div>
      </div>
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
        el.addEventListener('input', () => {
          itemObj[id === 'edit-power' ? 'power' : 'quality'] = parseInt(el.value) || 0;
          box.dataset.value = JSON.stringify(itemObj);
          calculate();
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

    document.querySelectorAll('.btn-clear-affix').forEach(btn => {
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
        
        if (type === 'affix') {
          if (!itemObj.affixValues) itemObj.affixValues = {};
          if (!itemObj.affixValues[groupIdx]) itemObj.affixValues[groupIdx] = [];
          itemObj.affixValues[groupIdx][idx] = val;
        } else if (type === 'temper') {
          if (!itemObj.temperValues) itemObj.temperValues = {};
          if (!itemObj.temperValues[groupIdx]) itemObj.temperValues[groupIdx] = [];
          itemObj.temperValues[groupIdx][idx] = val;
        } else if (type === 'transfigure') {
          if (!itemObj.transfigureValues) itemObj.transfigureValues = {};
          if (!itemObj.transfigureValues[groupIdx]) itemObj.transfigureValues[groupIdx] = [];
          itemObj.transfigureValues[groupIdx][idx] = val;
        }
        
        box.dataset.value = JSON.stringify(itemObj);
        calculate();
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
        if (valDiv) {
          valDiv.textContent = itemName;
          
          let rarity = 'rare';
          const dbItems = getDbItems(currentModalSlot);
          const foundItem = dbItems.find(i => i.name === itemName);
          if (foundItem) rarity = foundItem.rarity;
          
          valDiv.className = `paperdoll-slot-value rarity-${rarity}`;
        }
        renderEditTab(currentModalSlot);
        switchModalTab('edit');
      } else {
        delete box.dataset.value;
        if (valDiv) {
          valDiv.textContent = '';
          valDiv.className = 'paperdoll-slot-value';
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
        
        // Auto-fill max value from database if available
        const aspectObj = window.D4_DATABASE?.aspects?.find(a => a.name === aspectName);
        if (aspectObj && aspectObj.maxValue) {
          itemObj.aspectValues = [aspectObj.maxValue];
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
    const currentClassVal = document.getElementById('class-select').value;
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
        renderEquipment(document.getElementById('class-select').value, getSavedEquipment());
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
    
    let items = window.D4_DATABASE?.gems || [];
    
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
      if (isWeapon) effect = item.weaponEffect;
      else if (isJewelry) effect = item.jewelryEffect;
      
      let color = '#fff';
      if (item.type === 'ruby') color = '#e74c3c';
      if (item.type === 'amethyst') color = '#9b59b6';
      if (item.type === 'emerald') color = '#2ecc71';
      if (item.type === 'topaz') color = '#f1c40f';
      if (item.type === 'sapphire') color = '#3498db';
      if (item.type === 'diamond') color = '#bdc3c7';
      if (item.type === 'skull') color = '#ecf0f1';
      
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
          <div class="socket-circle filled" style="background: ${color}; width: 16px; height: 16px;"></div>
          <div class="item-name" style="color: ${color}; font-weight: bold;">${item.name}</div>
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

})();
