const fs = require('fs');

let code = fs.readFileSync('app.js', 'utf8');

// 1. Add weaponSpeed to dom
code = code.replace(
  "aps:            document.getElementById('aps'),",
  "aps:            document.getElementById('aps'),\n    weaponSpeed:    document.getElementById('weapon-speed'),"
);

// 2. Add weaponSpeed to createDefaultBuild
code = code.replace(
  "aps: 1,",
  "aps: 1,\n      weaponSpeed: 1,"
);

// 3. Update calculate() logic
code = code.replace(
  "dom.aps.value = totalWeaponAps;\n        dom.aps.disabled = true;",
  "dom.weaponSpeed.value = totalWeaponAps;\n        dom.weaponSpeed.disabled = true;\n        dom.weaponSpeed.title = \"Auto-calculated from equipped weapon\";"
);
code = code.replace(
  "dom.aps.disabled = false;",
  "if (dom.weaponSpeed) { dom.weaponSpeed.disabled = false; dom.weaponSpeed.title = \"\"; }"
);

// 4. Update loadBuildToUI()
code = code.replace(
  "dom.aps.value = b.aps || 1;",
  "dom.aps.value = b.aps || 1;\n    if (dom.weaponSpeed) dom.weaponSpeed.value = b.weaponSpeed || 1;"
);

// 5. Update init() event listener
code = code.replace(
  "dom.aps, dom.buildName]",
  "dom.aps, dom.weaponSpeed, dom.buildName]"
);

fs.writeFileSync('app.js', code);
console.log('app.js patched for weapon speed!');
