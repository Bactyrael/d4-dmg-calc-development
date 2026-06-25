const fs = require('fs');
const https = require('https');

const AFFIX_URL = 'https://raw.githubusercontent.com/josdemmers/Diablo4Companion/master/D4Companion/Data/Affixes.enUS.json';
const ASPECT_URL = 'https://raw.githubusercontent.com/josdemmers/Diablo4Companion/master/D4Companion/Data/Aspects.enUS.json';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NodeJS' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function buildDb() {
  try {
    console.log('Loading scraped affixes...');
    const scrapedAffixes = JSON.parse(fs.readFileSync('./assets/affixes_data.json', 'utf8'));
    
    console.log('Fetching aspects from D4Companion...');
    const aspectsRaw = await fetchJson(ASPECT_URL);

    // Map string classes to index arrays for app.js
    const CLASS_MAP = {
      'Sorcerer': 0,
      'Druid': 1,
      'Barbarian': 2,
      'Rogue': 3,
      'Necromancer': 4,
      'Spiritborn': 5
    };

    console.log('Loading scraped tempers...');
    let scrapedTempers = [];
    if (fs.existsSync('./assets/temper_data.json')) {
      scrapedTempers = JSON.parse(fs.readFileSync('./assets/temper_data.json', 'utf8'));
    }

    // Build a flat set of all valid temper affix names
    const temperAffixNames = new Set();
    scrapedTempers.forEach(manual => {
      if (manual.affixes) {
        manual.affixes.forEach(aff => temperAffixNames.add(aff));
      }
    });

    const affixesMap = new Map();
    scrapedAffixes.forEach(a => {
      const desc = a.desc || '';
      if (!desc || desc.startsWith('Rampage:')) return;
      
      let classArr = [0,0,0,0,0,0,0,0];
      if (a.classes && a.classes.length > 0) {
        if (a.classes.includes('All')) {
          classArr = [1,1,1,1,1,1,1,1];
        } else {
          a.classes.forEach(c => {
            if (CLASS_MAP[c] !== undefined) classArr[CLASS_MAP[c]] = 1;
          });
        }
      } else {
        classArr = [1,1,1,1,1,1,1,1]; // Any class
      }

      // If the short name is in the temperAffixNames set, mark as tempering
      const isTempering = temperAffixNames.has(a.name) || (a.tempering === true);

      // Patch slots for Universal Modifiers that d4guides.gg has incomplete data for
      let finalSlots = [...(a.slots || [])];
      const nameLower = a.name.toLowerCase();
      
      const ALL_SLOTS = ['Helm', 'Chest Armor', 'Gloves', 'Pants', 'Boots', 'Amulet', 'Ring', 'Mainhand', 'Offhand', 'Weapon 1', 'Weapon 2', 'Weapon 1 (Bludgeoning)', 'Weapon 2 (Slashing)', 'Weapon 3 (Dual Wield 1)', 'Weapon 4 (Dual Wield 2)'];
      const NON_WEAPON_SLOTS = ['Helm', 'Chest Armor', 'Gloves', 'Pants', 'Boots', 'Amulet', 'Ring'];

      if (['intelligence', 'strength', 'willpower', 'dexterity', 'all stats', 'maximum life'].includes(nameLower)) {
          finalSlots = ALL_SLOTS;
      } else if (nameLower === 'armor' || nameLower.includes('resistance')) {
          // Generally non-weapons
          finalSlots = Array.from(new Set([...finalSlots, ...NON_WEAPON_SLOTS]));
      }

      affixesMap.set(desc, { 
        name: desc, 
        shortName: a.name,
        classes: classArr,
        slots: finalSlots,
        tempering: isTempering
      });
    });
    const uniqueAffixes = Array.from(affixesMap.values());

    // Extract aspects with their categories!
    const aspectsMap = new Map();
    aspectsRaw.forEach(a => {
      if (a.Name && a.Name.trim().length > 0) {
        let name = a.Name.trim();
        if (name.toLowerCase().startsWith('of ')) {
          name = 'Aspect ' + name;
        } else if (!name.toLowerCase().includes('aspect')) {
          name = name + ' Aspect';
        }
        
        if (!aspectsMap.has(name)) {
          aspectsMap.set(name, {
            name: name,
            desc: a.Description || '',
            category: a.Category, // e.g. "FILTER_Legendary_Offensive"
            classes: a.AllowedForPlayerClass
          });
        } else {
          const existing = aspectsMap.get(name);
          if (!existing.desc && a.Description) existing.desc = a.Description;
          for (let i = 0; i < 8; i++) {
            if (a.AllowedForPlayerClass[i]) existing.classes[i] = 1;
          }
        }
      }
    });
    const sortedAffixes = uniqueAffixes.sort((a, b) => a.name.localeCompare(b.name));

    console.log('Fetching uniques from D4Companion...');
    let uniquesRaw = await fetchJson('https://raw.githubusercontent.com/josdemmers/Diablo4Companion/master/D4Companion/Data/Uniques.enUS.json');

    // Attempt to load scraped aspect data for max values
    let scrapedAspectData = {};
    if (fs.existsSync('./aspect_data.json')) {
      scrapedAspectData = JSON.parse(fs.readFileSync('./aspect_data.json', 'utf8'));
    }

    function makeSlug(name) {
      let s = name.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');
      if (s.startsWith('of-')) s = 'aspect-' + s;
      else if (!s.endsWith('-aspect') && !s.startsWith('aspect-')) s += '-aspect';
      return s;
    }

    const aspects = Array.from(aspectsMap.values()).map(a => {
      const slug = makeSlug(a.name);
      const scraped = scrapedAspectData[slug] || scrapedAspectData[slug.replace('-aspect', '')] || scrapedAspectData[slug + '-aspect'];
      
      let maxValue = '';
      if (scraped && scraped.description) {
        // Try to find the largest percentage or flat number that makes sense as a value
        const numbers = scraped.description.match(/[\d\.]+/g);
        if (numbers && numbers.length > 0) {
          // Some descriptions have multiple numbers (e.g. 50% for 5 seconds). We'll just grab the first one as a naive default max value
          // since the first number is usually the primary aspect value.
          maxValue = numbers[0];
        }
      }

      return {
        name: a.name,
        desc: a.desc,
        category: a.category,
        classes: a.classes,
        maxValue: maxValue
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
    
    const uniquesMap = new Map();
    uniquesRaw.forEach(u => {
      if (u.Name && u.Name.trim().length > 0) {
        uniquesMap.set(u.Name.trim(), {
          name: u.Name.trim(),
          desc: u.Description || ''
        });
      }
    });
    
    // Inject scraped unique data with min/max values
    if (fs.existsSync('./assets/uniques_data.json')) {
      const scrapedUniques = JSON.parse(fs.readFileSync('./assets/uniques_data.json', 'utf8'));
      scrapedUniques.forEach(su => {
        if (su.name && su.desc) {
          if (uniquesMap.has(su.name)) {
            uniquesMap.get(su.name).desc = su.desc;
          } else {
            uniquesMap.set(su.name, {
              name: su.name,
              desc: su.desc
            });
          }
        }
      });
    }

    const uniques = Array.from(uniquesMap.values());

    console.log(`Found ${sortedAffixes.length} unique affixes.`);
    console.log(`Found ${aspects.length} unique aspects.`);
    console.log(`Found ${uniques.length} unique items.`);

    // Build Item Database for Slots
    const itemDatabase = {
      'Helm': [{ name: 'Legendary Helm', rarity: 'legendary' }],
      'Chest Armor': [{ name: 'Legendary Chest', rarity: 'legendary' }],
      'Gloves': [{ name: 'Legendary Gloves', rarity: 'legendary' }],
      'Pants': [{ name: 'Legendary Pants', rarity: 'legendary' }],
      'Boots': [{ name: 'Legendary Boots', rarity: 'legendary' }],
      'Amulet': [{ name: 'Legendary Amulet', rarity: 'legendary' }],
      'Ring': [{ name: 'Legendary Ring', rarity: 'legendary' }],
      'Mainhand': [{ name: 'Legendary Weapon', rarity: 'legendary' }],
      'Offhand': [{ name: 'Legendary Offhand', rarity: 'legendary' }],
      
      // Other class specific names
      'Weapon 1': [{ name: 'Legendary Weapon', rarity: 'legendary' }],
      'Weapon 2': [{ name: 'Legendary Weapon', rarity: 'legendary' }],
      'Weapon 1 (Bludgeoning)': [{ name: 'Legendary Weapon', rarity: 'legendary' }],
      'Weapon 2 (Slashing)': [{ name: 'Legendary Weapon', rarity: 'legendary' }],
      'Weapon 3 (Dual Wield 1)': [{ name: 'Legendary Weapon', rarity: 'legendary' }],
      'Weapon 4 (Dual Wield 2)': [{ name: 'Legendary Weapon', rarity: 'legendary' }]
    };

    const KNOWN_MYTHICS = [
      "Andariel's Visage", "Harlequin Crest", "Tyrael's Might", 
      "Doombringer", "The Grandfather", "Ring of Starless Skies", 
      "Ahavarion, Spear of Lycander", "Melted Heart of Selig", 
      "Shattered Vow", "Heir of Perdition", "Shroud of False Death", 
      "Nesekem, the Herald"
    ];

    uniquesRaw.forEach(u => {
      if (!u.Name || u.Name.trim() === '') return;
      const name = u.Name.trim();
      
      let rarity = KNOWN_MYTHICS.includes(name) ? 'mythic' : 'unique';

      const idName = (u.IdName || '').toLowerCase();
      let slots = [];
      
      let allowedClasses = [...(u.AllowedForPlayerClass || [])];
      // Fix broken datamined class arrays by looking at the internal ID name
      if (idName.includes('_sorc_')) allowedClasses = [1,0,0,0,0,0,0,0];
      else if (idName.includes('_druid_')) allowedClasses = [0,1,0,0,0,0,0,0];
      else if (idName.includes('_barb_')) allowedClasses = [0,0,1,0,0,0,0,0];
      else if (idName.includes('_rogue_')) allowedClasses = [0,0,0,1,0,0,0,0];
      else if (idName.includes('_necro_')) allowedClasses = [0,0,0,0,1,0,0,0];
      else if (idName.includes('_spirit')) allowedClasses = [0,0,0,0,0,1,0,0];
      
      if (idName.includes('helm') || idName.includes('lucion')) slots.push('Helm');
      else if (idName.includes('chest') || idName.includes('endurant')) slots.push('Chest Armor');
      else if (idName.includes('glove')) slots.push('Gloves');
      else if (idName.includes('pant')) slots.push('Pants');
      else if (idName.includes('boot')) slots.push('Boots');
      else if (idName.includes('amulet')) slots.push('Amulet');
      else if (idName.includes('ring')) slots.push('Ring');
      else if (idName.includes('shield') || idName.includes('focus') || idName.includes('totem')) slots.push('Offhand');
      else if (idName.match(/1h|2h|bow|crossbow|staff|sword|axe|mace|scythe|dagger|wand|polearm/)) {
        slots.push('Mainhand', 'Weapon 1', 'Weapon 2', 'Weapon 1 (Bludgeoning)', 'Weapon 2 (Slashing)', 'Weapon 3 (Dual Wield 1)', 'Weapon 4 (Dual Wield 2)');
      } else {
        // Fallbacks for specific known uniques that don't match the pattern
        if (name === 'Crown of Lucion') slots.push('Helm');
        else if (name === 'Endurant Faith') slots.push('Gloves');
        else if (name === 'Fists of Fate') slots.push('Gloves');
        else if (name === 'Frostburn') slots.push('Gloves');
        else if (name === 'Mother\'s Embrace') slots.push('Ring');
        else if (name === 'Ring of Starless Skies') slots.push('Ring');
      }

      slots.forEach(slot => {
        if (itemDatabase[slot] && !itemDatabase[slot].find(i => i.name === name)) {
          itemDatabase[slot].push({ name, rarity, classes: allowedClasses });
        }
      });
    });

    let gems = [];
    if (fs.existsSync('./gem_data.json')) {
      gems = JSON.parse(fs.readFileSync('./gem_data.json', 'utf8'));
    }

    const fileContent = `// Auto-generated Relational D4 Database
window.D4_DATABASE = {
  affixes: ${JSON.stringify(sortedAffixes, null, 2)},
  aspects: ${JSON.stringify(aspects, null, 2)},
  uniques: ${JSON.stringify(uniques, null, 2)},
  gems: ${JSON.stringify(gems, null, 2)},
  itemDatabase: ${JSON.stringify(itemDatabase, null, 2)}
};
`;
    
    if (!fs.existsSync('./assets')) {
      fs.mkdirSync('./assets');
    }

    fs.writeFileSync('./assets/database.js', fileContent);
    console.log('Successfully generated assets/database.js');
  } catch (err) {
    console.error('Error building database:', err);
  }
}

buildDb();
