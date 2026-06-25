const https = require('https');
const fs = require('fs');

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function decodeHtml(html) {
  return html.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}

async function run() {
  const links = new Set();
  const regex = /<a href="(\/en\/loh\/database\/affixes\/[^"]+)" class="db-table__link"/g;
  
  for (let page = 1; page <= 15; page++) {
    console.log(`Fetching page ${page}...`);
    const pageHtml = await fetchHtml(`https://d4guides.gg/en/loh/database/affixes?page=${page}`);
    let match;
    let found = 0;
    while ((match = regex.exec(pageHtml)) !== null) {
      links.add('https://d4guides.gg' + match[1]);
      found++;
    }
    if (found === 0) break; // no more items
  }
  
  const linksArray = Array.from(links);
  console.log(`Found ${linksArray.length} items to scrape. Starting...`);
  
  const results = [];
  const concurrency = 20; // 20 requests at a time
  for (let i = 0; i < linksArray.length; i += concurrency) {
    const batch = linksArray.slice(i, i + concurrency);
    const promises = batch.map(async (url) => {
      try {
        const html = await fetchHtml(url);
        
        // Extract Title
        const titleMatch = html.match(/<h1 class="db-detail__title[^>]*>([^<]+)<\/h1>/);
        const name = titleMatch ? decodeHtml(titleMatch[1].trim()) : '';
        
        // Extract Description
        let desc = '';
        const descMatch = html.match(/<h2 class="db-section__title">Description<\/h2>\s*<p class="db-section__text">([\s\S]*?)<\/p>/);
        if (descMatch) desc = decodeHtml(descMatch[1].trim());

        // Extract Type
        let type = '';
        const typeMatch = html.match(/<dt>Type<\/dt>\s*<dd><span class="type-badge[^>]*>([^<]+)<\/span><\/dd>/);
        if (typeMatch) type = typeMatch[1].trim();

        // Extract Class
        let classes = [];
        const classMatch = html.match(/<dt>Class<\/dt>\s*<dd>([^<]+)<\/dd>/);
        if (classMatch && classMatch[1] !== 'Any') {
            classes.push(classMatch[1].trim());
        }

        // Extract Tempering
        let tempering = false;
        const tempMatch = html.match(/<dt>Tempering<\/dt>\s*<dd>([^<]+)<\/dd>/);
        if (tempMatch && tempMatch[1].trim() === 'Yes') tempering = true;

        // Extract Slots
        let slots = [];
        const slotSectionMatch = html.match(/<h2 class="db-section__title">Applicable Slots<\/h2>\s*<div class="db-tag-list">([\s\S]*?)<\/div>/);
        if (slotSectionMatch) {
            const slotRegex = /<span class="db-tag">([^<]+)<\/span>/g;
            let sm;
            while ((sm = slotRegex.exec(slotSectionMatch[1])) !== null) {
                slots.push(sm[1].trim());
            }
        }

        return { name, desc, type, classes, tempering, slots };
      } catch (e) {
        console.error(`Error fetching ${url}: ${e.message}`);
        return null;
      }
    });
    
    const batchResults = await Promise.all(promises);
    batchResults.forEach(r => { if (r && r.name) results.push(r) });
    
    process.stdout.write(`Scraped ${Math.min(i + concurrency, linksArray.length)} / ${linksArray.length}\r`);
  }
  
  console.log('\nFinished scraping. Writing to assets/affixes_data.json');
  fs.writeFileSync('assets/affixes_data.json', JSON.stringify(results, null, 2));
  console.log('Done!');
}

run();
