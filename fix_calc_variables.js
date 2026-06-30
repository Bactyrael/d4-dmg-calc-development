const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Remove renderCalcSkills from top of calculate()
if (app.includes("if (typeof renderCalcSkills === 'function') renderCalcSkills();")) {
    app = app.replace("if (typeof renderCalcSkills === 'function') renderCalcSkills();\r\n", "");
    app = app.replace("if (typeof renderCalcSkills === 'function') renderCalcSkills();\n", "");
    app = app.replace("if (typeof renderCalcSkills === 'function') renderCalcSkills();", "");
}

// 2. Add it to the end of calculate
const calcEndTarget = `    renderActiveRunes();

  } catch (e) {`;
const calcEndReplacement = `    renderActiveRunes();
    if (typeof renderCalcSkills === 'function') renderCalcSkills();

  } catch (e) {`;
app = app.replace(calcEndTarget, calcEndReplacement);

// 3. Define the min/max vars
const varsTarget = `        let mainhandDmg = 0;
        let offhandDmg = 0;`;
const varsReplacement = `        let mainhandDmg = 0; let mainhandMin = 0; let mainhandMax = 0;
        let offhandDmg = 0; let offhandMin = 0; let offhandMax = 0;`;
app = app.replace(varsTarget, varsReplacement);

// 4. Set mainhandMin and mainhandMax
const mhTarget = `                  const max = parseFloat(match[2].replace(/,/g, ''));
                  mainhandDmg = ((min + max) / 2) * qMult;
              }`;
const mhReplacement = `                  const max = parseFloat(match[2].replace(/,/g, ''));
                  mainhandDmg = ((min + max) / 2) * qMult;
                  mainhandMin = min * qMult;
                  mainhandMax = max * qMult;
              }`;
app = app.replace(mhTarget, mhReplacement);

// 5. Set offhandMin and offhandMax
const ohTarget = `                      const max = parseFloat(match[2].replace(/,/g, ''));
                      offhandDmg = ((min + max) / 2) * qMult;
                  }`;
const ohReplacement = `                      const max = parseFloat(match[2].replace(/,/g, ''));
                      offhandDmg = ((min + max) / 2) * qMult;
                      offhandMin = min * qMult;
                      offhandMax = max * qMult;
                  }`;
app = app.replace(ohTarget, ohReplacement);

// 6. Set window.weaponMinDmg and window.weaponMaxDmg
const shieldTarget = `        if (hasShield) {
            totalWeaponDmg = mainhandDmg * 2;
        } else {
            totalWeaponDmg = mainhandDmg + offhandDmg;
        }`;
const shieldReplacement = `        if (hasShield) {
            totalWeaponDmg = mainhandDmg * 2;
            window.weaponMinDmg = mainhandMin * 2;
            window.weaponMaxDmg = mainhandMax * 2;
        } else {
            totalWeaponDmg = mainhandDmg + offhandDmg;
            window.weaponMinDmg = mainhandMin + offhandMin;
            window.weaponMaxDmg = mainhandMax + offhandMax;
        }`;
app = app.replace(shieldTarget, shieldReplacement);

fs.writeFileSync('app.js', app);
console.log('Fixed calculate logic!');
