const fs = require('fs');
const maxroll = JSON.parse(fs.readFileSync("maxroll_data.json", "utf8"));
console.log(maxroll.attributeFormulas['ParagonNodeCoreStat_Normal']);
