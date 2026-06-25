const https = require('https');
const fs = require('fs');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function scrapeGems() {
    try {
        console.log('Fetching gems page...');
        const html = await fetchHtml('https://d4guides.gg/en/loh/database/gems');
        
        const gems = [];
        
        // Find all table rows in the tbody
        const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/);
        if (!tbodyMatch) {
            console.log('Could not find tbody');
            return;
        }
        
        const rows = tbodyMatch[1].split('<tr>').slice(1); // Split by <tr>
        
        for (const row of rows) {
            const tds = row.split(/<td[^>]*>/);
            if (tds.length < 7) continue; // Not a valid row
            
            // td[1] contains the link and name
            const nameMatch = tds[1].match(/<span class="db-table__name">([^<]+)<\/span>/);
            const name = nameMatch ? nameMatch[1].trim() : '';
            
            const type = tds[2].split('</td>')[0].trim();
            const quality = tds[3].split('</td>')[0].trim();
            const weaponEffect = tds[4].split('</td>')[0].trim();
            const armorEffect = tds[5].split('</td>')[0].trim();
            const jewelryEffect = tds[6].split('</td>')[0].trim();
            
            if (name) {
                gems.push({
                    name,
                    type,
                    quality,
                    weaponEffect,
                    armorEffect,
                    jewelryEffect
                });
            }
        }
        
        fs.writeFileSync('gem_data.json', JSON.stringify(gems, null, 2));
        console.log(`Successfully scraped ${gems.length} gems and saved to gem_data.json`);
    } catch (e) {
        console.error('Error scraping gems:', e.message);
    }
}

scrapeGems();
