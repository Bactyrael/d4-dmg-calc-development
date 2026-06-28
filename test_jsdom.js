const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, {
  url: "http://localhost/",
  runScripts: "dangerously",
  resources: "usable"
});

dom.window.document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const window = dom.window;
        const document = window.document;

        // Equip a glove
        const equipGlove = () => {
            const box = document.querySelector('.equipment-slot-box[data-slot="gloves"]');
            const itemObj = {
                "name": "Gloves",
                "affixes": ["+[8 - 9]% Lucky Hit Chance", "+[8 - 10]% Attack Speed"],
                "affixValues": [[9], [10]]
            };
            box.dataset.value = JSON.stringify(itemObj);
        };
        
        equipGlove();
        
        // Run calculate
        window.calculate();

        const luckyHit = document.getElementById('lucky-hit');
        const atkSpeed = document.getElementById('attack-speed');
        
        console.log("Lucky Hit Value:", luckyHit.value);
        console.log("Lucky Hit Disabled:", luckyHit.disabled);
        console.log("Attack Speed Value:", atkSpeed.value);
        console.log("Attack Speed Disabled:", atkSpeed.disabled);
        
        // Also check what getEquipmentValues() returns
        console.log("Equipment:", JSON.stringify(window.getEquipmentValues()));
        
        // Try without affixValues (fallback regex test)
        console.log("--- Testing without affixValues (simulate new item) ---");
        const box = document.querySelector('.equipment-slot-box[data-slot="gloves"]');
        const itemObj2 = {
            "name": "Gloves",
            "affixes": ["+[8 - 9]% Lucky Hit Chance", "+[8 - 10]% Attack Speed"]
        };
        box.dataset.value = JSON.stringify(itemObj2);
        window.calculate();
        
        console.log("Lucky Hit Value:", luckyHit.value);
        console.log("Attack Speed Value:", atkSpeed.value);

    }, 1000);
});
