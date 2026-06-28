const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf-8');

const panZoomLogic = `
// ==========================================
// SKILL TREE PAN & ZOOM LOGIC
// ==========================================
let skillScale = 1;
let skillTranslateX = -1000;
let skillTranslateY = -500;
let isSkillDragging = false;
let skillStartX = 0;
let skillStartY = 0;

function updateSkillTransform() {
    const container = document.getElementById('skills-container');
    const svgLayer = document.getElementById('skills-svg-layer');
    if (!container || !svgLayer) return;
    const transformStr = \`translate(\${skillTranslateX}px, \${skillTranslateY}px) scale(\${skillScale})\`;
    container.style.transform = transformStr;
    svgLayer.style.transform = transformStr;
}

function initSkillPanZoom() {
    const viewport = document.getElementById('skills-viewport');
    if (!viewport) return;

    viewport.addEventListener('mousedown', (e) => {
        if (e.target.closest('.skill-node') || e.target.closest('.skill-cluster') || e.target.closest('.tab-btn')) return;
        isSkillDragging = true;
        skillStartX = e.clientX - skillTranslateX;
        skillStartY = e.clientY - skillTranslateY;
        viewport.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isSkillDragging) return;
        skillTranslateX = e.clientX - skillStartX;
        skillTranslateY = e.clientY - skillStartY;
        updateSkillTransform();
    });

    window.addEventListener('mouseup', () => {
        isSkillDragging = false;
        if (viewport) viewport.style.cursor = 'grab';
    });

    viewport.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomIntensity = 0.1;
        const wheel = e.deltaY < 0 ? 1 : -1;
        const zoom = Math.exp(wheel * zoomIntensity);
        
        const rect = viewport.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Adjust translation to zoom towards mouse cursor
        skillTranslateX = mouseX - (mouseX - skillTranslateX) * zoom;
        skillTranslateY = mouseY - (mouseY - skillTranslateY) * zoom;
        skillScale *= zoom;
        
        // Limits
        skillScale = Math.max(0.2, Math.min(skillScale, 3));
        
        updateSkillTransform();
    }, { passive: false });
    
    document.getElementById('btn-zoom-in')?.addEventListener('click', () => { skillScale = Math.min(3, skillScale * 1.2); updateSkillTransform(); });
    document.getElementById('btn-zoom-out')?.addEventListener('click', () => { skillScale = Math.max(0.2, skillScale / 1.2); updateSkillTransform(); });
    document.getElementById('btn-zoom-reset')?.addEventListener('click', () => { skillScale = 1; skillTranslateX = -1000; skillTranslateY = -500; updateSkillTransform(); });
    
    updateSkillTransform();
}

// Ensure init is called
document.addEventListener('DOMContentLoaded', () => {
    initSkillPanZoom();
});
`;

if (!content.includes('initSkillPanZoom')) {
    content += '\n' + panZoomLogic;
    fs.writeFileSync('app.js', content, 'utf-8');
    console.log("Injected Pan/Zoom logic.");
} else {
    console.log("Pan/Zoom logic already exists.");
}
