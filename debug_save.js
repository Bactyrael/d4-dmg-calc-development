const fs = require('fs');
const { JSDOM } = require('jsdom');

let appJs = fs.readFileSync('app.js', 'utf8');
appJs = appJs.replace('function saveBuild() {', 'function saveBuild() { console.log("saveBuild started");');
appJs = appJs.replace('calculate();', 'console.log("calling calculate"); calculate(); console.log("calculate finished", currentBuild.name);');
appJs = appJs.replace('const builds = getSavedBuilds();', 'const builds = getSavedBuilds(); console.log("got builds", builds.length);');
appJs = appJs.replace('buildCopy.savedAt = new Date().toISOString();', 'buildCopy.savedAt = new Date().toISOString(); console.log("buildCopy created");');
appJs = appJs.replace('setSavedBuilds(builds);', 'setSavedBuilds(builds); console.log("setSavedBuilds called");');

const dom = new JSDOM(fs.readFileSync('index.html', 'utf8'), { url: 'http://localhost/', runScripts: 'dangerously' });
try { dom.window.eval(fs.readFileSync('assets/database.js', 'utf8')); } catch(e) {}
try { 
  dom.window.eval(appJs);
  dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  setTimeout(() => {
    console.log("clicking save");
    dom.window.document.getElementById('btn-save').click();
  }, 100);
} catch(e) { console.log('error', e); }
