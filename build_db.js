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
    console.log('Fetching affixes from D4Companion...');
    const affixesRaw = await fetchJson(AFFIX_URL);
    
    console.log('Fetching aspects from D4Companion...');
    const aspectsRaw = await fetchJson(ASPECT_URL);

    // Extract unique affixes (just searchable strings, since slot data is missing/empty for many)
    const affixesMap = new Map();
    affixesRaw.forEach(a => {
      if (a.Description && a.Description.trim().length > 0) {
        const desc = a.Description.trim();
        // If we haven't seen it, or if the current one has a wider class array, merge them
        if (!affixesMap.has(desc)) {
          affixesMap.set(desc, { name: desc, classes: a.AllowedForPlayerClass });
        } else {
          // Merge class allowances (some generic strings appear multiple times for different classes)
          const existing = affixesMap.get(desc);
          for (let i = 0; i < 8; i++) {
            if (a.AllowedForPlayerClass[i]) existing.classes[i] = 1;
          }
        }
      }
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
