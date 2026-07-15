const fs = require('fs');
let db = fs.readFileSync('assets/database.js', 'utf8');
db = db.replace(/\{\s*\"name\": \"Blood Getter's Aspect\"[\s\S]*?\},/g, '')
       .replace(/\{\s*\"name\": \"Coldbringer's Aspect\"[\s\S]*?\},/g, '');
fs.writeFileSync('assets/database.js', db);
