const fs = require('fs');

let appStr = fs.readFileSync('app.js', 'utf8');

const iifeEnd = '})();';
const iifeIndex = appStr.lastIndexOf(iifeEnd);

if (iifeIndex !== -1) {
  const beforeIife = appStr.substring(0, iifeIndex);
  const afterIife = appStr.substring(iifeIndex + iifeEnd.length);
  
  if (afterIife.trim().length > 0) {
    const newAppStr = beforeIife + '\n' + afterIife + '\n' + iifeEnd + '\n';
    fs.writeFileSync('app.js', newAppStr);
    console.log("Fixed IIFE scope.");
  } else {
    console.log("No code outside IIFE found.");
  }
} else {
  console.log("Could not find IIFE end.");
}
