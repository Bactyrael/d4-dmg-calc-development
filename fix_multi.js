const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const regexMulti = /if \(applies\) \{\s*bucket \*= \(1 \+ \(val \/ 100\)\);\s*\}\s*\}\s*\}\s*return bucket;\s*\}/;
const replMulti = `if (applies) {
                let valMult = (1 + (val / 100));
                bucket *= valMult;
                components.push({ name: key, value: valMult });
            }
        }
    }
    
    return { total: bucket, components: components };
}`;

app = app.replace(regexMulti, replMulti);
fs.writeFileSync('app.js', app);
console.log('Fixed multiplicative bucket return');
