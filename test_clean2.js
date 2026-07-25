function cleanStatName(name) {
    if (!name) return name;
    let isLuckyHit = name.startsWith('Lucky Hit:');
    if (!isLuckyHit) {
        name = name.replace(/^[^:]+:\s+/, '');
    }
    // Remove the roll range e.g. "+[1.0 - 2.0] " or "[1.0 - 2.0]% "
    let cleaned = name.replace(/^\+?\[[\d\.,]+\s*-\s*[\d\.,]+\](%?)\s*/, (match, p1) => p1 ? '% ' : '');
    // Also remove static prefixes if there are no brackets (e.g. "+3 ")
    cleaned = cleaned.replace(/^\+?[\d\.,]+(%?)\s*/, (match, p1) => p1 ? '% ' : '');
    
    cleaned = cleaned.replace(/\s*\([^)]+Only\)$/i, '');
    cleaned = cleaned.trim();
    if (cleaned === 'Damage Reduction' || cleaned === '% Damage Reduction') return 'Universal Damage Reduction %';
    return cleaned;
}
console.log(cleanStatName("Reanimator's: +3 to Minion Skills"));
