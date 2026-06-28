const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log("Launching Puppeteer...");
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    let urls = [];
    page.on('response', async (response) => {
        const url = response.url();
        urls.push(url);
        fs.appendFileSync('maxroll_urls.txt', url + '\n');
        
        // Let's try to parse any response that looks like it might contain JSON data
        if (url.includes('.json') || url.includes('data') || response.headers()['content-type']?.includes('application/json')) {
            try {
                const text = await response.text();
                if (text.includes('Bone Spear') && text.includes('Necromancer')) {
                    console.log(`Found matching text payload at: ${url}`);
                    fs.writeFileSync('maxroll_dump.json', text);
                }
            } catch (e) {}
        }
    });

    console.log("Navigating to maxroll...");
    try {
        await page.goto('https://maxroll.gg/d4/planner/', { waitUntil: 'domcontentloaded', timeout: 60000 });
        console.log("DOM loaded. Waiting 10 seconds for background requests...");
        await new Promise(r => setTimeout(r, 10000));
        
        const nextData = await page.evaluate(() => {
            return window.__NEXT_DATA__ ? JSON.stringify(window.__NEXT_DATA__) : null;
        });
        
        if (nextData && nextData.includes('Bone Spear')) {
            console.log("Found in __NEXT_DATA__");
            fs.writeFileSync('maxroll_dump.json', nextData);
        } else {
            console.log("__NEXT_DATA__ did not contain skills.");
        }
    } catch (e) {
        console.error("Navigation error:", e);
    }

    await browser.close();
    console.log("Scraping finished.");
})();
