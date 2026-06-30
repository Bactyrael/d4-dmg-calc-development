const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const regex = /renderActiveRunes\(\);[\s\S]*?\} catch \(e\)/;
if (regex.test(app)) {
    app = app.replace(regex, `renderActiveRunes();\n    if (typeof renderCalcSkills === 'function') renderCalcSkills();\n  } catch (e)`);
    fs.writeFileSync('app.js', app);
    console.log('Successfully re-added renderCalcSkills() to calculate()!');
} else {
    console.log('Failed to match end of calculate loop.');
}
