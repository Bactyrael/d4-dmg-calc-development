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
  // Extract all item URLs from all pages
  const links = new Set();
  const regex = /<a href="(\/en\/loh\/database\/items\/[^"]+)" class="db-table__link"/g;
  
  for (let page = 1; page <= 10; page++) {
    console.log(`Fetching page ${page}...`);
    const pageHtml = await fetchHtml(`https://d4guides.gg/en/loh/database/items?page=${page}`);
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
  
  // Concurrency limit of 10 to not overwhelm the server
  const concurrency = 10;
  for (let i = 0; i < linksArray.length; i += concurrency) {
    const batch = linksArray.slice(i, i + concurrency);
    const promises = batch.map(async (url) => {
      try {
        const html = await fetchHtml(url);
        
        // Extract Title
        const titleMatch = html.match(/<h1 class="db-detail__title[^>]*>([^<]+)<\/h1>/);
        const name = titleMatch ? decodeHtml(titleMatch[1]) : '';
        
        // Extract Unique Effect
        // <h2 class="db-section__title">Unique Effect</h2>\n        <p class="db-section__text">...</p>
        let desc = '';
        const descMatch = html.match(/<h2 class="db-section__title">(?:Unique Effect|Mythic Effect)<\/h2>\s*<p class="db-section__text">([\s\S]*?)<\/p>/);
        if (descMatch) {
          desc = decodeHtml(descMatch[1].trim());
        } else {
            // Check if it's just missing the Unique Effect header, or wait, maybe the regex needs to be more forgiving
            const fallbackMatch = html.match(/<h2 class="db-section__title">.*?<\/h2>\s*<p class="db-section__text">([\s\S]*?)<\/p>/);
            if(fallbackMatch) desc = decodeHtml(fallbackMatch[1].trim());
        }
        
        return { name, desc };
      } catch (e) {
        console.error(`Error fetching ${url}: ${e.message}`);
        return null;
      }
    });
    
    const batchResults = await Promise.all(promises);
    batchResults.forEach(r => { if (r && r.name && r.desc) results.push(r) });
    
    process.stdout.write(`Scraped ${Math.min(i + concurrency, links.length)} / ${links.length}\r`);
  }
  
  console.log('\nFinished scraping. Writing to uniques_data.json');
  fs.writeFileSync('assets/uniques_data.json', JSON.stringify(results, null, 2));
  console.log('Done!');
}

run();
