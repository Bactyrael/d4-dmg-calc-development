const fs = require('fs');
let app = fs.readFileSync('style.css', 'utf8').replace(/\r\n/g, '\n');

const target = `/* Remove number spinners, except for aspect inputs and quality */
input[type="number"]:not(.aspect-val-input):not(#edit-quality)::-webkit-inner-spin-button,
input[type="number"]:not(.aspect-val-input):not(#edit-quality)::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"]:not(.aspect-val-input):not(#edit-quality) { -moz-appearance: textfield; }

/* Keep spinners for aspect values and quality */
input[type="number"].aspect-val-input::-webkit-inner-spin-button,
input[type="number"].aspect-val-input::-webkit-outer-spin-button,
input[type="number"]#edit-quality::-webkit-inner-spin-button,
input[type="number"]#edit-quality::-webkit-outer-spin-button {
  -webkit-appearance: auto;
  opacity: 1;
}`;

const repl = `/* Remove number spinners, except for aspect inputs, quality, and buffs */
input[type="number"]:not(.aspect-val-input):not(#edit-quality):not(.calc-buff)::-webkit-inner-spin-button,
input[type="number"]:not(.aspect-val-input):not(#edit-quality):not(.calc-buff)::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"]:not(.aspect-val-input):not(#edit-quality):not(.calc-buff) { -moz-appearance: textfield; }

/* Keep spinners for aspect values, quality, and buffs */
input[type="number"].aspect-val-input::-webkit-inner-spin-button,
input[type="number"].aspect-val-input::-webkit-outer-spin-button,
input[type="number"]#edit-quality::-webkit-inner-spin-button,
input[type="number"]#edit-quality::-webkit-outer-spin-button,
input[type="number"].calc-buff::-webkit-inner-spin-button,
input[type="number"].calc-buff::-webkit-outer-spin-button {
  -webkit-appearance: auto;
  opacity: 1;
}`;

app = app.replace(target, repl);

fs.writeFileSync('style.css', app);
console.log('Patched style.css to show buff spinners');
