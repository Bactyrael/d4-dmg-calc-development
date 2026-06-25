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
  const regex = /<a href="(\/en\/loh\/database\/temper\/[^"]+)" class="db-table__link"/g;
  
  for (let page = 1; page <= 5; page++) {
    console.log(`Fetching temper page ${page}...`);
    const pageHtml = await fetchHtml(`https://d4guides.gg/en/loh/database/temper?page=${page}`);
    let match;
    let found = 0;
    while ((match = regex.exec(pageHtml)) !== null) {
      links.add('https://d4guides.gg' + match[1]);
      found++;
    }
    if (found === 0) break;
  }
  
  const linksArray = Array.from(links);
  console.log(`Found ${linksArray.length} temper manuals to scrape. Starting...`);
  
  const results = [];
  const concurrency = 20;
  for (let i = 0; i < linksArray.length; i += concurrency) {
    const batch = linksArray.slice(i, i + concurrency);
    const promises = batch.map(async (url) => {
      try {
        const html = await fetchHtml(url);
        
        // Title
        const titleMatch = html.match(/<h1 class="db-detail__title[^>]*>([^<]+)<\/h1>/);
        const name = titleMatch ? decodeHtml(titleMatch[1].trim()) : '';
        
        // We need the affixes inside the temper manual
        let affixes = [];
        const affixRegex = /<span class="db-affix-name">([^<]+)<\/span>/g;
        let am;
        while ((am = affixRegex.exec(html)) !== null) {
           affixes.push(decodeHtml(am[1].trim()));
        }

        return { name, url, affixes };
      } catch (e) {
        console.error(`Error fetching ${url}: ${e.message}`);
        return null;
      }
    });
    
    const batchResults = await Promise.all(promises);
    batchResults.forEach(r => { if (r && r.name) results.push(r) });
    
    process.stdout.write(`Scraped ${Math.min(i + concurrency, linksArray.length)} / ${linksArray.length}\r`);
  }
  
  console.log('\nFinished scraping. Writing to assets/temper_data.json');
  fs.writeFileSync('assets/temper_data.json', JSON.stringify(results, null, 2));
  console.log('Done!');
}

run();
