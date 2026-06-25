const fs = require('fs');

const classes = [
  { cls: 'Barbarian', bg: 'barbarian_bg.jpg' },
  { cls: 'Druid', bg: 'druid_bg.jpg' },
  { cls: 'Sorcerer', bg: 'sorcerer_bg.jpg' },
  { cls: 'Spiritborn', bg: 'spiritborn_bg.jpg' },
  { cls: 'Paladin', bg: 'paladin_bg.jpg' },
  { cls: 'Warlock', bg: 'warlock_bg.jpg' }
];

let cssToAppend = '';

classes.forEach(c => {
  cssToAppend += `\n.paperdoll-container[data-class="${c.cls}"] {\n  background-image: url("assets/${c.bg}");\n  background-size: cover;\n  background-position: center top;\n  background-repeat: no-repeat;\n  box-shadow: inset 0 0 0 2000px rgba(0,0,0,0.65);\n  border-radius: 8px;\n}\n`;
});

fs.appendFileSync('style.css', cssToAppend);
