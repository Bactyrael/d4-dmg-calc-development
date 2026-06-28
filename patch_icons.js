const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const oldNameSpan = `
  const nameSpan = document.createElement('span'); 
  nameSpan.className = 'skill-name'; 
  nameSpan.textContent = name; 
  if (indentLevel > 0) nameSpan.innerHTML = '<span style="color:#666;">└</span> ' + name; 
`;

const newNameSpan = `
  const nameSpan = document.createElement('span'); 
  nameSpan.className = 'skill-name'; 
  nameSpan.style.display = 'flex';
  nameSpan.style.alignItems = 'center';
  nameSpan.style.gap = '8px';
  
  let prefix = indentLevel > 0 ? '<span style="color:#666; margin-right: 4px;">└</span>' : '';
  let imgName = name.toLowerCase().replace(/\\s+/g, '-');
  let imgSrc = 'assets/skills/' + imgName + '.png';
  
  nameSpan.innerHTML = prefix + \`<img src="\${imgSrc}" style="width:24px; height:24px; border:1px solid #333;" onerror="this.style.display='none'" />\` + \`<span>\${name}</span>\`;
`;

// It's safer to use string replacement by stripping whitespace, or regex
appJs = appJs.replace(/const nameSpan = document\.createElement\('span'\);[\s\S]*?if \(indentLevel > 0\) nameSpan\.innerHTML = '<span style="color:#666;">└<\/span> ' \+ name;/, newNameSpan.trim());

fs.writeFileSync('app.js', appJs, 'utf8');
console.log("Patched app.js to show skill icons");
