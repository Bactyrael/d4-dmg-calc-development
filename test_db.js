global.window = {};
require('./assets/database.js');
console.log("Database loaded successfully, charms count: ", window.D4_DATABASE.charms.length);
