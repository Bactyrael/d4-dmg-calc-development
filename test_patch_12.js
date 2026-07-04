const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

// 1. Prevent Overpower for DoT
content = content.replace(
  "    addStat('Damage');\r\n        if (stats['Damage Per Overpower Stack'] && stats['Damage Per Overpower Stack'].final) {",
  "    let isDot = tags.includes('search_dot') || tags.includes('search_shadowdot');\n    addStat('Damage');\n    if (!isDot && stats['Damage Per Overpower Stack'] && stats['Damage Per Overpower Stack'].final) {"
);

// 2. Add isDot to breakdown
content = content.replace(
  "        rankMultiplier,\r\n        critStrMin,",
  "        rankMultiplier,\n        critStrMin,\n        isDot: (skillObj.tags || []).map(t => t.toLowerCase()).includes('search_dot') || (skillObj.tags || []).map(t => t.toLowerCase()).includes('search_shadowdot'),"
);

// 3. Hide Crit for DoT in main tooltip
content = content.replace(
  "            <div style=\"font-size: 0.95rem; color: #f9d85c; margin-bottom: 5px; display: flex; justify-content: space-between; font-weight: bold;\">\r\n              <span>Critical Hit:</span> <span>${b.critStrMin} - ${b.critStrMax}</span>\r\n            </div>\r\n        `;",
  "            ${b.isDot ? '' : `\n            <div style=\"font-size: 0.95rem; color: #f9d85c; margin-bottom: 5px; display: flex; justify-content: space-between; font-weight: bold;\">\n              <span>Critical Hit:</span> <span>${b.critStrMin} - ${b.critStrMax}</span>\n            </div>\n            `}\n        `;"
);

// 4. Hide Crit for DoT in secondary scalars
content = content.replace(
  "                                      <summary style=\"cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;\">\r\n                                        <span style=\"color: #555;\">└</span> Critical Hit: <span style=\"font-weight: bold;\">${b.critStrMin} - ${b.critStrMax}</span>\r\n                                      </summary>\r\n                                      <div style=\"margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;\">",
  "                                      ${b.isDot ? '' : `\n                                      <summary style=\"cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;\">\n                                        <span style=\"color: #555;\">└</span> Critical Hit: <span style=\"font-weight: bold;\">${b.critStrMin} - ${b.critStrMax}</span>\n                                      </summary>\n                                      <div style=\"margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;\">\n                                      `}"
);
content = content.replace(
  "                                      </div>\r\n                                    </details>\r\n                                  </details>`;",
  "                                      ${b.isDot ? '' : `</div>`}\n                                    </details>\n                                  </details>`;"
);

fs.writeFileSync('app.js', content);
console.log('Successfully patched app.js for DoT Critical Hit hiding');
