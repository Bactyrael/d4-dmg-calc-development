function cleanStatName(name) {
    if (!name) return name;
    let isLuckyHit = name.startsWith('Lucky Hit:');
    if (!isLuckyHit) {
        name = name.replace(/^[^:]+:\s+/, '');
    }
    let cleaned = name.replace(/^\+?\[[\d\.,]+\s*-\s*[\d\.,]+\](%?)\s*/, (match, p1) => p1 ? '% ' : '');
    cleaned = cleaned.replace(/\s*\([^)]+Only\)$/i, '');
    cleaned = cleaned.trim();
    if (cleaned === 'Damage Reduction' || cleaned === '% Damage Reduction') return 'Universal Damage Reduction %';
    return cleaned;
}

console.log(cleanStatName("Reanimator's: +[2 - 3] to Minion Skills"));
console.log(cleanStatName("Lucky Hit: Up to a 40% Chance to Deal +[2400 - 2400] Shadow Damage"));
console.log(cleanStatName("Frigid: Lucky Hit: Up to a 40% Chance to Deal +[3,500 - 4,375] Cold Damage"));
console.log(cleanStatName("Stalwart's: +[7.5 - 10.0]% Total Armor"));
console.log(cleanStatName("of Ghouls: +[2 - 3] to Skeleton Warrior (Necromancer Only)"));
