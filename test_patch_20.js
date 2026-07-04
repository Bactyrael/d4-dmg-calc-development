const fs = require('fs');

let appContent = fs.readFileSync('app.js', 'utf8');

appContent = appContent.replace(
  /if \(\!lowerKey\.includes\('damage'\) && \!lowerKey\.includes\('critical'\) && \!isDotStat &&/g,
  'if (!lowerKey.includes(\'cult leader\') && !lowerKey.includes(\'damage\') && !lowerKey.includes(\'critical\') && !isDotStat &&'
);

fs.writeFileSync('app.js', appContent);
console.log('Patched multiplicative catch-all for Cult Leader');
