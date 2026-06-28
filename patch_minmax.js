const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const targetStr = `            aspectDescHtml = aspectObj.desc.replace(/(?:\\[([\\d\\.,]+)\\s*-\\s*([\\d\\.,]+)\\])|#/g, (match, minStr, maxStr) => {
              let min = minStr ? parseFloat(minStr.replace(/,/g, '')) * aspectMult : null;
              let max = maxStr ? parseFloat(maxStr.replace(/,/g, '')) * aspectMult : null;
              
              if (min !== null) min = parseFloat(min.toFixed(2));
              if (max !== null) max = parseFloat(max.toFixed(2));`;

const replacementStr = `            aspectDescHtml = aspectObj.desc.replace(/(?:\\[([\\d\\.,]+)\\s*-\\s*([\\d\\.,]+)\\])|#/g, (match, minStr, maxStr) => {
              let min = minStr ? parseFloat(minStr.replace(/,/g, '')) * aspectMult : (aspectObj.minVal ? parseFloat(aspectObj.minVal) * aspectMult : null);
              let max = maxStr ? parseFloat(maxStr.replace(/,/g, '')) * aspectMult : (aspectObj.maxVal ? parseFloat(aspectObj.maxVal) * aspectMult : null);
              
              if (min !== null) min = parseFloat(min.toFixed(2));
              if (max !== null) max = parseFloat(max.toFixed(2));`;

appJs = appJs.replace(targetStr, replacementStr);
fs.writeFileSync('app.js', appJs, 'utf8');
