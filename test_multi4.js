function calculateSkillMultiplicativeBucket(skill) {
    if (!window.D4_COMPILED_STATS) return 1;
    const stats = window.D4_COMPILED_STATS;
    const buffs = getActiveBuffs();
    const conds = getActiveConditions();
    const tags = (skill.tags || []).map(t => t.toLowerCase());
    
    let dType = (skill.damageType || '').toLowerCase();
    if (tags.includes('damage_override_cold')) dType = 'cold';
    if (tags.includes('damage_override_physical')) dType = 'physical';
    if (tags.includes('damage_override_shadow')) dType = 'shadow';
    if (tags.includes('damage_override_poison')) dType = 'poison';
    if (tags.includes('damage_override_lightning')) dType = 'lightning';
    if (tags.includes('damage_override_fire')) dType = 'fire';
    if (tags.includes('damage_override_bone')) dType = 'bone';
    
    let bucket = 1;
    let components = [];
    
    // Apply Native Vulnerable Multiplier if applicable
    if (conds.vulnerable) {
        bucket *= 1.2;
        components.push({ name: 'Vulnerable (Native)', value: 1.2 });
    }
    
    // Iterate over all stats to find multiplicative ones
    for (let key in stats) {
        if (!stats.hasOwnProperty(key)) continue;
        const stat = stats[key];
        const val = stat.final;
        if (!val || val === 0) continue;
        
        // Match generic Multipliers
        // [x] is usually appended to the name or it's tagged as isMultiplicative = true inside compileCharacterStats
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('[x]') || stat.isMultiplicative) {
            // Check if it applies to this skill
            let applies = false;
            
            let isSkillSpecific = lowerKey.startsWith('skill:') || lowerKey.startsWith('skill (secondary):');
            
            if (!isSkillSpecific && lowerKey.includes('damage') && !lowerKey.includes('critical') && !lowerKey.includes('over time') && !lowerKey.includes('dot') && !lowerKey.includes('to') && !lowerKey.includes('shadow') && !lowerKey.includes('darkness') && !lowerKey.includes('bone') && !lowerKey.includes('blood') && !lowerKey.includes('core') && !lowerKey.includes('macabre') && !lowerKey.includes('vulnerable') && !lowerKey.includes('cold') && !lowerKey.includes('poison') && !lowerKey.includes('lightning') && !lowerKey.includes('physical') && !lowerKey.includes('wither') && !lowerKey.includes('frailty') && !lowerKey.includes('hulking monstrosity')) {
                // Generic damage multiplier (e.g. 20% [x] Damage)
                applies = true; console.log('applies became true at');;
            }
            
            if (lowerKey.includes('vulnerable') && conds.vulnerable) applies = true; console.log('applies became true at');;
            
            if (lowerKey.includes('damage to') && (lowerKey.includes('shadow damage over time') || lowerKey.includes('affected by shadow'))) {
                if (conds.shadowDot) applies = true; console.log('applies became true at');;
            }
            
            let isDotStat = lowerKey.includes('over time') || lowerKey.includes('dot');
            let isShadowStat = lowerKey.includes('shadow') || lowerKey.includes('darkness');
            
            if (isShadowStat && !isDotStat && !lowerKey.includes('damage to')) {
                if (tags.includes('skill_shadow') || tags.includes('search_shadow') || tags.includes('skill_darkness') || dType === 'shadow') applies = true; console.log('applies became true at');;
            }
            if (lowerKey.includes('bone') && (tags.includes('skill_bone') || tags.includes('search_bone') || dType === 'bone')) applies = true; console.log('applies became true at');;
            if (lowerKey.includes('blood') && tags.includes('skill_blood')) applies = true; console.log('applies became true at');;
            if (lowerKey.includes('core') && tags.includes('keyword_core')) applies = true; console.log('applies became true at');;
            if (lowerKey.includes('macabre') && (tags.includes('keyword_macabre') || tags.some(t => t.toLowerCase().includes('macabre')) || ['Bone Prison', 'Blood Mist', 'Golem', 'Bone Spirit'].includes(skill.name))) applies = true; console.log('applies became true at');;
            if (lowerKey.includes('cold') && (tags.includes('skill_cold') || tags.includes('search_cold') || dType === 'cold')) applies = true; console.log('applies became true at');;
            if (lowerKey.includes('poison') && (tags.includes('skill_poison') || tags.includes('search_poison') || dType === 'poison')) applies = true; console.log('applies became true at');;
            if (lowerKey.includes('lightning') && (tags.includes('skill_lightning') || tags.includes('search_lightning') || dType === 'lightning')) applies = true; console.log('applies became true at');;
            if (lowerKey.includes('physical') && (tags.includes('skill_physical') || tags.includes('search_physical') || dType === 'physical')) applies = true; console.log('applies became true at');;
            
            if (lowerKey === 'wither damage [x]') {
                if (tags.includes('skill_darkness') || tags.includes('search_darkness') || tags.includes('skill_shadow') || tags.includes('search_shadow') || dType === 'shadow') applies = true; console.log('applies became true at');;
                if (tags.includes('skill_cold') || tags.includes('search_cold') || dType === 'cold') applies = true; console.log('applies became true at');;
            }
            if (lowerKey === 'blood begets blood damage [x]') applies = true; console.log('applies became true at');;
            if (lowerKey === 'frailty damage [x]' && conds.cursed) applies = true; console.log('applies became true at');;
            if (lowerKey.includes('cult leader')) {
                let sName = skill.name.toLowerCase();
                if (sName.includes('golem') || sName.includes(' mage') || sName.includes('warrior') || tags.some(t => t.includes('minion'))) applies = true; console.log('applies became true at');;
            }
            if (lowerKey === 'hulking monstrosity damage [x]') {
                if (skill.name.toLowerCase().includes('golem')) applies = true; console.log('applies became true at');;
            }
            if (lowerKey === 'reaper sacrifice damage [x]') {
                applies = true; console.log('applies became true at');;
            }
            if (lowerKey === 'cold mage sacrifice damage [x]' && conds.vulnerable) applies = true; console.log('applies became true at');;
            if (lowerKey === 'bone mage sacrifice damage [x]' && buffs.overpower > 0) applies = true; console.log('applies became true at');;
            if (lowerKey === 'bloodbath (legendary node)' && buffs.overpower > 0) applies = true; console.log('applies became true at');;
            if (lowerKey === 'iron golem sacrifice damage [x]' && conds.critical) applies = true; console.log('applies became true at');;
            
            if (lowerKey.includes('deadraiser') || lowerKey.includes('commander')) {
                let sName = skill.name.toLowerCase();
                if (sName.includes('golem') || sName.includes(' mage') || sName.includes('warrior') || tags.some(t => t.includes('minion'))) applies = true; console.log('applies became true at');;
            }
            if (lowerKey.includes('golem (legendary bonus)') || lowerKey.includes('golem (additional bonus)')) {
                if (skill.name.toLowerCase().includes('golem')) applies = true; console.log('applies became true at');;
            }
            if (lowerKey.includes('amplify')) {
                if (conds.cursed) applies = true; console.log('applies became true at');;
            }
            if (lowerKey.includes('control (legendary bonus)')) {
                if (conds.cc) applies = true; console.log('applies became true at');;
            }
            if (lowerKey.includes('scent of death') && conds.corpsesNearby) applies = true; console.log('applies became true at');;
            if (lowerKey.includes('territorial') && conds.close) applies = true; console.log('applies became true at');;
            
            // Catch-all for purely generic aspect multipliers
            if (!lowerKey.includes('cult leader') && !lowerKey.includes('deadraiser') && !lowerKey.includes('commander') && !lowerKey.includes('golem') && !lowerKey.includes('amplify') && !lowerKey.includes('control') && !lowerKey.includes('scent of death') && !lowerKey.includes('territorial') && !lowerKey.includes('damage') && !lowerKey.includes('critical') && !isDotStat && !isShadowStat && !lowerKey.includes('bone') && !lowerKey.includes('blood') && !lowerKey.includes('core') && !lowerKey.includes('macabre') && !lowerKey.includes('vulnerable') && !lowerKey.includes('cold') && !lowerKey.includes('poison') && !lowerKey.includes('lightning') && !lowerKey.includes('physical')) {
                applies = true; console.log('applies became true at');;
            }
            
            // Explicit Damage over Time check
            if (isDotStat && !lowerKey.includes('damage to')) {
                if (tags.includes('search_dot') || tags.includes('search_shadowdot')) {
                    applies = true; console.log('applies became true at');;
                    if (isShadowStat) {
                        if (!(dType === 'shadow' || tags.includes('skill_shadow') || tags.includes('search_shadow') || tags.includes('skill_darkness') || tags.includes('search_darkness'))) {
                            applies = false;
                        }
                    }
                }
            }
            
            // Universal Skill-Specific Multiplier Check
            if (lowerKey.startsWith('skill: ' + skill.name.toLowerCase())) {
                applies = true; console.log('applies became true at');;
            }
            if (lowerKey.startsWith('skill (secondary): ' + skill.name.toLowerCase()) && skill.isSecondary) {
                applies = true; console.log('applies became true at');;
            }

            if (applies) {
                let valMult = (1 + (val / 100));
                bucket *= valMult;
                
                let displayName = key;
                if (isSkillSpecific) {
                    let cleanKey = key.replace(/Skill \(Secondary\): |Skill: /ig, '');
                    let match = cleanKey.match(/\(([^)]+)\)/);
                    if (match && match[1]) {
                        displayName = match[1] + ' (Upgrade) [x]';
                    } else {
                        displayName = cleanKey;
                    }
                }
                
                components.push({ name: displayName, value: valMult });
            }
        }
    }
    
    
            // ----------------------------------------------------
            // Inject Glyph Multiplicative Bonuses
            // ----------------------------------------------------
            if (typeof currentBuild !== 'undefined' && currentBuild.paragon && currentBuild.glyphs) {
                for (let i = 0; i < 5; i++) {
                    let pData = currentBuild.paragon[i];
                    if (window.isGlyphSocketed(pData)) {
                        let gData = window.D4_PARAGON_DATA?.paragonGlyphs?.[pData.glyph.id];
                        if (gData) {
                            let gName = gData.name;
                            let addVals = typeof getAdditionalBonusValues === 'function' ? getAdditionalBonusValues() : [0,0,0,0,0];
                            let legVals = typeof getLegendaryBonusValues === 'function' ? getLegendaryBonusValues() : [0,0,0,0,0];
                            let addVal = addVals[i] || 0;
                            let legVal = legVals[i] || 0;
                            
                            let addApplies = false;
                            let legApplies = false;
                            
                            switch(gName) {
                                case 'Abyssal':
                                    if (dType !== 'physical') { addApplies = true; legApplies = true; }
                                    break;
                                case 'Amplify':
                                    if (conds.cursed) addApplies = true;
                                    legApplies = true;
                                    break;
                                case 'Blood-drinker':
                                    legApplies = true;
                                    break;
                                case 'Control':
                                    if (conds.cc) { addApplies = true; legApplies = true; }
                                    break;
                                case 'Corporeal':
                                    if (dType === 'physical') { addApplies = true; legApplies = true; }
                                    break;
                                case 'Darkness':
                                    if (dType === 'shadow') legApplies = true;
                                    break;
                                case 'Deadraiser':
                                    if (tags.some(t => t.includes('summon'))) addApplies = true;
                                    legApplies = true;
                                    break;
                                case 'Desecration':
                                    if (dType === 'shadow') addApplies = true;
                                    if (tags.includes('subpower_desecratedground') || tags.includes('search_desecratedground')) legApplies = true;
                                    break;
                                case 'Dominate':
                                    if (buffs.overpower > 0) addApplies = true;
                                    legApplies = true;
                                    break;
                                case 'Eliminator':
                                    if (conds.monsterType === 'elite' || conds.monsterType === 'boss') { addApplies = true; legApplies = true; }
                                    break;

                                case 'Exhumation':
                                    legApplies = true;
                                    break;
                                case 'Exploit':
                                    if (conds.vulnerable) { addApplies = true; legApplies = true; }
                                    break;
                                case 'Golem':
                                    if (skill.name.toLowerCase().includes('golem')) addApplies = true;
                                    legApplies = true;
                                    break;
                                case 'Gravekeeper':
                                    addVal = 18;
                                    addApplies = true;
                                    legApplies = true;
                                    break;
                                case 'Imbiber':
                                    addVal = 20;
                                    addApplies = true;
                                    legApplies = true;
                                    break;
                                case 'Mage':
                                    if (tags.some(t => t.includes('summon'))) addApplies = true;
                                    legApplies = true;
                                    break;
                                case 'Revenge':
                                    addVal = 10;
                                    addApplies = true;
                                    legApplies = true;
                                    break;
                                case 'Sacrificial':
                                    addApplies = true;
                                    legApplies = true;
                                    break;
                                case 'Scourge':
                                    if (conds.shadowDot && (dType === 'shadow' || dType === 'cold') && (tags.includes('dot') || tags.includes('search_dot') || tags.includes('search_shadowdot'))) addApplies = true;
                                    legApplies = true;
                                    break;
                                case 'Territorial':
                                    legApplies = true;
                                    break;
                                case 'Undaunted':
                                    legApplies = true;
                                    break;
                                case 'Warrior':
                                    if (tags.some(t => t.includes('summon'))) addApplies = true;
                                    legApplies = true;
                                    break;
                            }
                            
                            if (addApplies && addVal > 0) {
                                let mult = (1 + (addVal / 100));
                                bucket *= mult;
                                components.push({ name: gName + ' (Additional Bonus) [x]', value: mult });
                            }
                            
                            if (legApplies && legVal > 0) {
                                let mult = (1 + (legVal / 100));
                                bucket *= mult;
                                components.push({ name: gName + ' (Legendary Bonus) [x]', value: mult });
                            }
                        }
                    }
                }
            }

    // Razorplate Unique Aspect Logic
    if (tags.includes('thorns') && stats['Razorplate']) {
        let razorValue = stats['Razorplate'].final;
        if (razorValue > 0) {
            let avgPct = razorValue * 0.10;
            let mult = 1 + (avgPct / 100);
            bucket *= mult;
            components.push({ name: 'Razorplate (Average) [x]', value: mult });
        }
    }

    if (skill.baseName === 'Golem' || skill.name === 'Golem' || tags.includes('golem') || (skill.name && skill.name.includes('Golem'))) {
        let isSacrificed = typeof currentBuild !== 'undefined' && currentBuild && currentBuild.bookOfTheDead && currentBuild.bookOfTheDead.golems && currentBuild.bookOfTheDead.golems.node === 'sacrifice';
        if (isSacrificed) {
            bucket *= 0.5;
            components.push({ name: 'Golem Sacrificed Penalty [x]', value: 0.5 });
        }
    }

    return { total: bucket, components: components };
}

function renderCalcSkills() {
    const container = document.getElementById('calc-pane-skills');
    if (!container) return;
    
    container.innerHTML = `
      <h2 style="color: #fff; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 15px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
         <span class="icon" style="color: #c9a55c;">⚔️</span> Damage Engine
      </h2>
    `;

    if (typeof skillsDatabase === 'undefined' || !window.selectedSkills) {
        container.innerHTML += `<p style="color: #aaa; font-style: italic;">Allocate points in your Skill Tree into skills that deal damage to see them appear here.</p>`;
        return;
    }

    // Dynamic Skill Sliders state init
    window.skillSliderValues = window.skillSliderValues || {};

    let foundSkills = 0;
    
    for (const cat in skillsDatabase) {
        skillsDatabase[cat].forEach(baseSkill => {
            const modSkill = typeof applyActiveModifiers === 'function' ? applyActiveModifiers(baseSkill) : baseSkill;
            
            // Render base skills that have points and deal damage (either base or via modified secondary scalars)
            let hasDamage = modSkill.baseDamageScalar > 0 || (modSkill.secondaryScalars && Object.keys(modSkill.secondaryScalars).length > 0);
            if (baseSkill.name === 'Bone Prison' && window.selectedSkills['Bramble'] > 0) hasDamage = true;
            
            if (window.selectedSkills[baseSkill.name] > 0 && hasDamage) {
                foundSkills++;
                
                const card = document.createElement('div');
                card.className = 'd4-panel calc-skill-card';
                card.style.background = 'rgba(20,20,25,0.9)';
                card.style.border = '1px solid #334';
                card.style.borderRadius = '8px';
                card.style.padding = '20px';
                card.style.marginBottom = '15px';
                card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
                
                let displayImgName = baseSkill.name;
                if (baseSkill.modifiers) {
                    // Only check the first 3 modifiers (index 0, 1, 2) which are the diamonds/modifiers.
                    // Upgrades (circles) are index 3+ and should not change the skill's identity.
                    let maxIndex = Math.min(2, baseSkill.modifiers.length - 1);
                    for (let i = maxIndex; i >= 0; i--) {
                        if (window.selectedSkills[baseSkill.modifiers[i].name] > 0) {
                            displayImgName = baseSkill.modifiers[i].name;
                            break;
                        }
                    }
                }
                let imgName = displayImgName.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
                let clsName = (typeof currentBuild !== 'undefined' && currentBuild && currentBuild.class) ? currentBuild.class : 'Necromancer';
                let baseNameSlug = baseSkill.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
                
                let finalIconName = baseNameSlug; // Default to base skill if all else fails
                if (window.NECRO_ICONS) {
                    if (window.NECRO_ICONS.has(imgName)) {
                        finalIconName = imgName;
                    } else if (window.NECRO_ICONS.has(imgName + '-' + baseNameSlug)) {
                        finalIconName = imgName + '-' + baseNameSlug;
                    }
                }
                
                let iconUrl = `assets/Skills/${clsName}/${finalIconName}.png`;
                let iconHtml = `<img src="${iconUrl}" style="width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px;" onerror="this.outerHTML='<div style=\'width: 48px; height: 48px; border: 1px solid #c9a55c; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #222; color: #888;\'>?</div>'">`;
                
                let titleText = displayImgName;
                if (['Skeleton Warrior', 'Skeleton Mage', 'Golem'].includes(baseSkill.name) && currentBuild && currentBuild.bookOfTheDead) {
                    let botdType = '';
                    if (baseSkill.name === 'Skeleton Warrior') botdType = 'warriors';
                    if (baseSkill.name === 'Skeleton Mage') botdType = 'mages';
                    if (baseSkill.name === 'Golem') botdType = 'golems';
                    
                    let spec = currentBuild.bookOfTheDead[botdType]?.spec;
                    let node = currentBuild.bookOfTheDead[botdType]?.node;
                    
                    if (spec && node !== null) {
                        let shortSpec = spec.replace(' Mage', '').replace(' Golem', '');
                        let nodeStr = node === 'sacrifice' ? 'Sacrifice' : 'Upgrade ' + node;
                        titleText += ` <span style="color: #c9a55c; font-size: 0.85em; font-weight: normal;">(${shortSpec} / ${nodeStr})</span>`;
                    }
                }
                
                card.innerHTML = `
                  <div style="display: flex; align-items: flex-start; gap: 15px;">
                    ${iconHtml}
                    <div style="flex: 1;">
                      <h3 style="margin: 0; color: #fff; font-size: 1.2rem; display: flex; justify-content: space-between;">
                        <span>${titleText}</span>
                        <span style="font-size: 0.9rem; color: #888;">Rank ${window.selectedSkills[baseSkill.name]}</span>
                      </h3>
                      <div style="color: #aaa; font-size: 0.9rem; margin-top: 10px; font-family: monospace;">
                        ${(function() {
                            let html = '';
                            let rank = window.selectedSkills[baseSkill.name] || 1;
                            let wpMin = window.weaponMinDmg || 0;
                            let wpMax = window.weaponMaxDmg || 0;

                            let b = getSkillDamageBreakdown(modSkill, rank);
                              let finalScalar = b.finalScalar;

                              if (modSkill.baseDamageScalar) {
                                  let pct = (modSkill.baseDamageScalar * b.rankMultiplier * 100).toFixed(1).replace('.0', '');
                                  let addStr = Number(((b.additiveMult - 1) * 100).toFixed(6));
                                  let baseLabel = modSkill.baseLabelOverride ? modSkill.baseLabelOverride : ((['Bone Storm', 'Blood Mist', 'Devouring Mist', 'Blood Transfusion', 'Blood Rush'].includes(modSkill.name)) ? 'Per Tick Damage' : (!b.isHit ? 'DoT Damage' : 'Damage'));
                                  let pctDisplay = b.addedThorns ? `${pct}% + ${b.addedThorns.toLocaleString()} Thorns` : `${pct}%`;
                                  html += `<details style="margin-bottom: 4px;">
                                    <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none;">
                                      <span style="color: #555;">├</span> ${baseLabel} (${pctDisplay}): <span style="color: #fff; font-weight: bold;">${b.minStr} - ${b.maxStr}</span>
                                    </summary>
                                    <div style="margin-left: 20px; font-size: 0.9em; color: #aaa; margin-top: 6px; border-left: 1px solid #444; padding-left: 10px; margin-bottom: 6px;">
                                      <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                        <span style="color: #555;">└</span> ${b.mainStatName} Multiplier: <span style="color: #fff;">x${Number(b.mainStatMult.toFixed(6))}</span>
                                      </div>
                                      <div style="margin-bottom: 3px;">
                                        <div style="display: flex; align-items: center; gap: 5px;">
                                          <span style="color: #555;">└</span> Additive Multiplier: <span style="color: #fff;">1 + (${addStr}%)</span>
                                        </div>
                                        ${(b.additiveComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: +${(comp.value * 100).toFixed(1).replace('.0', '')}%</div>`).join('')}
                                      </div>
                                      <div>
                                        <div style="display: flex; align-items: center; gap: 5px;">
                                          <span style="color: #555;">└</span> Multiplicative Multiplier: <span style="color: #fff;">x${Number(b.multiMult.toFixed(6))}</span>
                                        </div>
                                        ${(b.multiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name.replace('Skill: ', '')}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                      </div>
                                    </div>
                                    ${!b.isHit ? '' : `<details style="margin-left: 20px; font-size: 0.9em; margin-bottom: 6px;">
                                      <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;">
                                        <span style="color: #555;">└</span> Critical Hit (${Number(b.critChance.toFixed(1))}%): <span style="font-weight: bold;">${b.critStrMin} - ${b.critStrMax}</span>
                                      </summary>
                                      <div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">
                                        <div style="font-size: 0.85em; color: #888; margin-bottom: 4px;">
                                          ${(b.critChanceComponents || []).map(comp => `<div style="display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: ${comp.value > 0 ? '+' : ''}${Number(comp.value.toFixed(1))}%</div>`).join('')}
                                        </div>
                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                                          <span style="color: #555;">├</span> Base Critical Multiplier: x1.5
                                        </div>
                                        ${(b.critMultiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-top: 2px;">
                                          <span style="color: #555;">├</span> Additive Critical Bonus: +${Number(((b.critAdditiveMult - b.additiveMult) * 100).toFixed(1))}%
                                        </div>
                                      </div>
                                    </details>`}
                                    ${!b.lhcTotal ? '' : `<details style="margin-left: 20px; font-size: 0.9em; margin-bottom: 6px;">
                                      <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #9fdfa7;">
                                        <span style="color: #555;">└</span> Lucky Hit (Tooltip): <span style="font-weight: bold;">${Number(b.lhcTotal.toFixed(1))}%</span>
                                      </summary>
                                      <div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">
                                        <div style="font-size: 0.85em; color: #888; margin-bottom: 4px;">
                                          ${(b.lhcComponents || []).map((comp, idx) => `<div style="display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: ${idx === 0 ? '' : '+'}${Number(comp.value.toFixed(1))}%</div>`).join('')}
                                        </div>
                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                                          <span style="color: #555;">├</span> Formula: ${Number(b.lhcComponents[0].value.toFixed(1))}% * (100% + ${Number(b.lhcBonus.toFixed(1))}%)
                                        </div>
                                      </div>
                                    </details>`}
                                  </details>`;
                              }
                              
                              if (baseSkill.name === 'Skeleton Warrior' && typeof currentBuild !== 'undefined' && currentBuild && currentBuild.bookOfTheDead && currentBuild.bookOfTheDead.warriors) {
                                  if (currentBuild.bookOfTheDead.warriors.spec === 'Defender' && currentBuild.bookOfTheDead.warriors.node === '1') {
                                      let level = document.getElementById('character-level') ? parseInt(document.getElementById('character-level').value) || 50 : 50;
                                      let warriorRank = window.selectedSkills['Skeleton Warrior'] || 1;
                                      let powVal = Math.pow(level - 1, 3.6292);
                                      let rankMultNode = 1.0 + ((warriorRank - 1) * 0.10); 
                                      let thornsBase = (0.0007377 * powVal) + 2 + ((1 + Math.round(level * 0.1)) * warriorRank);
                                      let nodeThorns = Math.floor(Math.max(thornsBase * rankMultNode, 1));
                                      let basePlayerThorns = (window.D4_COMPILED_STATS && window.D4_COMPILED_STATS['Thorns']) ? window.D4_COMPILED_STATS['Thorns'].final : 0;
                                      let inheritThornsBonus = 0;
                                      if (window.D4_COMPILED_STATS) {
                                          for (let k in window.D4_COMPILED_STATS) {
                                              if (k.toLowerCase().includes('inherit') && k.toLowerCase().includes('thorns')) {
                                                  inheritThornsBonus += (window.D4_COMPILED_STATS[k].final || 0);
                                              }
                                          }
                                      }
                                      let inheritMult = 1.0 + (inheritThornsBonus / 100);
                                      let playerThorns = Math.floor(basePlayerThorns * inheritMult);
                                      let totalThorns = nodeThorns + playerThorns;
                                      
                                      let thornsSkillObj = {
                                          name: 'Defender Thorns',
                                          baseName: 'Defender Thorns',
                                          tags: ['Minion', 'Summoning', 'Thorns', 'Physical', 'Damage'],
                                          damageType: 'Physical',
                                          isHit: true
                                      };
                                      let bThorns = getSkillDamageBreakdown(thornsSkillObj, warriorRank, true);
                                      
                                      let thornsDamage = Math.floor(totalThorns * bThorns.mainStatMult * bThorns.additiveMult * bThorns.multiMult);
                                      let splinterDamage = Math.floor(thornsDamage * 0.50);
                                      
                                      let addStrThorns = Number(((bThorns.additiveMult - 1) * 100).toFixed(6));
                                      
                                      html += `<details style="margin-bottom: 4px;">
                                        <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #a170c4;">
                                          <span style="color: #555;">├</span> Defender Thorns (Total ${totalThorns.toLocaleString()}): <span style="color: #fff; font-weight: bold;">${thornsDamage.toLocaleString()} Damage</span>
                                        </summary>
                                        <div style="margin-left: 20px; font-size: 0.9em; color: #aaa; margin-top: 6px; border-left: 1px solid #444; padding-left: 10px; margin-bottom: 6px;">
                                          <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                            <span style="color: #555;">└</span> Node Thorns: <span style="color: #fff;">${nodeThorns.toLocaleString()}</span>
                                          </div>
                                          <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                            <span style="color: #555;">└</span> Player Thorns: <span style="color: #fff;">${playerThorns.toLocaleString()}</span> ${inheritMult > 1 ? `<span style="color:#aaa; font-size:0.85em;">(Base: ${basePlayerThorns.toLocaleString()} x ${inheritMult.toFixed(2)})</span>` : ''}
                                          </div>
                                          
                                          <div style="margin-bottom: 3px;">
                                            <div style="display: flex; align-items: center; gap: 5px;">
                                              <span style="color: #555;">└</span> Additive Multiplier: <span style="color: #fff;">1 + (${addStrThorns}%)</span>
                                            </div>
                                            ${(bThorns.additiveComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">└</span> ${comp.name}: +${(comp.value * 100).toFixed(1).replace('.0', '')}%</div>`).join('')}
                                          </div>
                                          
                                          <div style="margin-bottom: 3px;">
                                            <div style="display: flex; align-items: center; gap: 5px;">
                                              <span style="color: #555;">└</span> Multiplicative Multiplier: <span style="color: #fff;">x${Number(bThorns.multiMult.toFixed(6))}</span>
                                            </div>
                                            ${(bThorns.multiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">└</span> ${comp.name.replace('Skill: ', '')}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                          </div>
                                          
                                          <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px; color: #f39c12;">
                                            <span style="color: #555;">└</span> Splinter Damage (50%): <span style="color: #fff; font-weight: bold;">${splinterDamage.toLocaleString()}</span>
                                          </div>
                                        </div>
                                      </details>`;
                                  }
                              }
                              
                              if (baseSkill.name === 'Golem' && typeof currentBuild !== 'undefined' && currentBuild && currentBuild.bookOfTheDead && currentBuild.bookOfTheDead.golems) {
                                  if (currentBuild.bookOfTheDead.golems.spec === 'Bone Golem') {
                                      let rank = window.selectedSkills['Golem'] || 1;
                                      let basePlayerThorns = (window.D4_COMPILED_STATS && window.D4_COMPILED_STATS['Thorns']) ? window.D4_COMPILED_STATS['Thorns'].final : 0;
                                      let inheritThornsBonus = 0;
                                      if (window.D4_COMPILED_STATS) {
                                          for (let k in window.D4_COMPILED_STATS) {
                                              if (k.toLowerCase().includes('inherit') && k.toLowerCase().includes('thorns')) {
                                                  inheritThornsBonus += (window.D4_COMPILED_STATS[k].final || 0);
                                              }
                                          }
                                      }
                                      let inheritMult = 1.0 + (inheritThornsBonus / 100);
                                      let playerThorns = Math.floor(basePlayerThorns * inheritMult);
                                      
                                      let playerArmor = (window.D4_COMPILED_STATS && window.D4_COMPILED_STATS['Armor']) ? window.D4_COMPILED_STATS['Armor'].final : 0;
                                      let armorThorns = Math.floor(playerArmor * 0.50);
                                      let totalThorns = playerThorns + armorThorns;
                                      
                                      let thornsSkillObj = {
                                          name: 'Bone Golem Thorns',
                                          baseName: 'Bone Golem Thorns',
                                          tags: ['Minion', 'Summoning', 'Thorns', 'Physical', 'Damage'],
                                          damageType: 'Physical',
                                          isHit: true
                                      };
                                      let bThorns = getSkillDamageBreakdown(thornsSkillObj, rank, true);
                                      
                                      let thornsDamage = Math.floor(totalThorns * bThorns.mainStatMult * bThorns.additiveMult * bThorns.multiMult);
                                      let addStrThorns = Number(((bThorns.additiveMult - 1) * 100).toFixed(6));
                                      
                                      html += `<details style="margin-bottom: 4px; margin-top: 6px;">
                                        <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #a983b8;">
                                          <span style="color: #555;">└</span> Bone Golem Thorns <span style="font-size: 0.85em;">(Total ${totalThorns.toLocaleString()})</span>: <span style="font-weight: bold; color: #fff;">${thornsDamage.toLocaleString()}</span> Damage
                                        </summary>
                                        <div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">
                                          <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                            <span style="color: #555;">└</span> Armor Thorns (50%): <span style="color: #fff;">${armorThorns.toLocaleString()}</span>
                                          </div>
                                          <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                            <span style="color: #555;">└</span> Player Thorns: <span style="color: #fff;">${playerThorns.toLocaleString()}</span> ${inheritMult > 1 ? `<span style="color:#aaa; font-size:0.85em;">(Base: ${basePlayerThorns.toLocaleString()} x ${inheritMult.toFixed(2)})</span>` : ''}
                                          </div>
                                          
                                          <div style="margin-bottom: 3px;">
                                            <div style="display: flex; align-items: center; gap: 5px;">
                                              <span style="color: #555;">└</span> Additive Multiplier: <span style="color: #fff;">1 + (${addStrThorns}%)</span>
                                            </div>
                                            ${(bThorns.additiveComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">└</span> ${comp.name}: +${(comp.value * 100).toFixed(1).replace('.0', '')}%</div>`).join('')}
                                          </div>
                                          
                                          <div style="margin-bottom: 3px;">
                                            <div style="display: flex; align-items: center; gap: 5px;">
                                              <span style="color: #555;">└</span> Multiplicative Multiplier: <span style="color: #fff;">x${Number(bThorns.multiMult.toFixed(6))}</span>
                                            </div>
                                            ${(bThorns.multiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">└</span> ${comp.name.replace('Skill: ', '')}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                          </div>
                                        </div>
                                      </details>`;
                                  }
                              }
                            if (modSkill.secondaryScalars) {
                                for (const [key, val] of Object.entries(modSkill.secondaryScalars)) {
                                    if (val === null || val === undefined) continue;
                                    let label = (typeof val === 'object' && val.labelOverride) ? val.labelOverride : key.replace(/_/g, ' ').replace(/tooltip /i, '').replace(/dot/i, 'DoT').replace(/\b\w/g, c => c.toUpperCase());
                                    let scalarVal = typeof val === 'object' ? val.scalar : val;
                                    let secSkill = JSON.parse(JSON.stringify(modSkill));
                                    if (typeof val === 'object' && val.tags) secSkill.tags = [...val.tags];
                                    if (typeof val === 'object' && val.addTags) {
                                        secSkill.tags = secSkill.tags || [];
                                        secSkill.tags.push(...val.addTags);
                                    }
                                    if (typeof val === 'object' && val.nameOverride) {
                                        secSkill.name = val.nameOverride;
                                    }
                                    secSkill.baseDamageScalar = scalarVal;
                                    secSkill.isSecondary = true;
                                    let isHit = (typeof val === 'object' && val.isHit !== undefined) ? val.isHit : !key.toLowerCase().includes('dot');
                                    let b2 = getSkillDamageBreakdown(secSkill, rank, isHit);
                                    let pct = (scalarVal * b2.rankMultiplier * 100).toFixed(1).replace('.0', '');
                                    let minStr = Math.floor(wpMin * scalarVal * b2.finalScalar).toLocaleString();
                                    let maxStr = Math.floor(wpMax * scalarVal * b2.finalScalar).toLocaleString();
                                    
                                    let addStr2 = Number(((b2.additiveMult - 1) * 100).toFixed(6));
                                    let canCrit = !key.toLowerCase().includes('dot');
                                    let critMinStr = Math.floor(wpMin * scalarVal * b2.finalScalar * (b2.critAdditiveMult / b2.additiveMult) * (b2.critMultiMult / b2.multiMult)).toLocaleString();
                                    let critMaxStr = Math.floor(wpMax * scalarVal * b2.finalScalar * (b2.critAdditiveMult / b2.additiveMult) * (b2.critMultiMult / b2.multiMult)).toLocaleString();
                                      
                                    html += `<details style="margin-bottom: 4px;">
                                      <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none;">
                                        <span style="color: #555;">├</span> ${label} (${pct}%): <span style="color: #fff; font-weight: bold;">${minStr} - ${maxStr}</span>
                                      </summary>
                                      <div style="margin-left: 20px; font-size: 0.9em; color: #aaa; margin-top: 6px; border-left: 1px solid #444; padding-left: 10px; margin-bottom: 6px;">
                                        <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                          <span style="color: #555;">└</span> ${b2.mainStatName} Multiplier: <span style="color: #fff;">x${Number(b2.mainStatMult.toFixed(6))}</span>
                                        </div>
                                        <div style="margin-bottom: 3px;">
                                          <div style="display: flex; align-items: center; gap: 5px;">
                                            <span style="color: #555;">└</span> Additive Multiplier: <span style="color: #fff;">1 + (${addStr2}%)</span>
                                          </div>
                                          ${(b2.additiveComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: +${(comp.value * 100).toFixed(1).replace('.0', '')}%</div>`).join('')}
                                        </div>
                                        <div>
                                          <div style="display: flex; align-items: center; gap: 5px;">
                                            <span style="color: #555;">└</span> Multiplicative Multiplier: <span style="color: #fff;">x${Number(b2.multiMult.toFixed(6))}</span>
                                          </div>
                                          ${(b2.multiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name.replace('Skill: ', '')}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                        </div>
                                      </div>
                                      ${canCrit ? `
                                      <details style="margin-left: 20px; font-size: 0.9em; margin-bottom: 6px;">
                                        <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;">
                                          <span style="color: #555;">└</span> Critical Hit (${Number(b2.critChance.toFixed(1))}%): <span style="font-weight: bold;">${critMinStr} - ${critMaxStr}</span>
                                        </summary>
                                        <div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">
                                          <div style="font-size: 0.85em; color: #888; margin-bottom: 4px;">
                                            ${(b2.critChanceComponents || []).map(comp => `<div style="display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: ${comp.value > 0 ? '+' : ''}${Number(comp.value.toFixed(1))}%</div>`).join('')}
                                          </div>
                                          <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                                            <span style="color: #555;">├</span> Base Critical Multiplier: x1.5
                                          </div>
                                          ${(b2.critMultiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                          <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-top: 2px;">
                                            <span style="color: #555;">├</span> Additive Critical Bonus: +${Number(((b2.critAdditiveMult - b2.additiveMult) * 100).toFixed(1))}%
                                          </div>
                                        </div>
                                      </details>` : ''}
                                      ${!b2.lhcTotal ? '' : `<details style="margin-left: 20px; font-size: 0.9em; margin-bottom: 6px;">
                                        <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #9fdfa7;">
                                          <span style="color: #555;">└</span> Lucky Hit (Tooltip): <span style="font-weight: bold;">${Number(b2.lhcTotal.toFixed(1))}%</span>
                                        </summary>
                                        <div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">
                                          <div style="font-size: 0.85em; color: #888; margin-bottom: 4px;">
                                            ${(b2.lhcComponents || []).map((comp, idx) => `<div style="display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: ${idx === 0 ? '' : '+'}${Number(comp.value.toFixed(1))}%</div>`).join('')}
                                          </div>
                                          <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                                            <span style="color: #555;">├</span> Formula: ${Number(b2.lhcComponents[0].value.toFixed(1))}% * (100% + ${Number(b2.lhcBonus.toFixed(1))}%)
                                          </div>
                                        </div>
                                      </details>`}
                                    </details>`;
                                }
                            }

                            if (modSkill.name === 'Bone Prison' && window.selectedSkills['Bramble'] > 0) {
                                let thornsPlayer = (window.D4_COMPILED_STATS && window.D4_COMPILED_STATS['Thorns']) ? window.D4_COMPILED_STATS['Thorns'].final : 0;
                                let brambleObj = {
                                    name: 'Bramble Segment Damage',
                                    baseName: 'Bramble Segment Damage',
                                    tags: ['Physical', 'Macabre', 'Bone', 'Damage'],
                                    baseDamageScalar: 0,
                                    isSecondary: true
                                };
                                let bBramble = getSkillDamageBreakdown(brambleObj, rank, true);
                                // Override base damage logic to use Thorns instead of weapon damage
                                let brambleDmg = Math.floor(thornsPlayer * 1.0 * bBramble.mainStatMult * bBramble.additiveMult * bBramble.multiMult);
                                let addStrBramble = Number(((bBramble.additiveMult - 1) * 100).toFixed(6));
                                let brambleCritStr = Math.floor(thornsPlayer * 1.0 * bBramble.mainStatMult * bBramble.additiveMult * bBramble.multiMult * (bBramble.critAdditiveMult / bBramble.additiveMult) * (bBramble.critMultiMult / bBramble.multiMult)).toLocaleString();
                                
                                html += `<details style="margin-bottom: 4px; margin-top: 6px;">
                                    <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #a5c95c;">
                                      <span style="color: #555;">├</span> Bramble Segment Damage (100% Thorns): <span style="color: #fff; font-weight: bold;">${brambleDmg.toLocaleString()}</span>
                                    </summary>
                                    <div style="margin-left: 20px; font-size: 0.9em; color: #aaa; margin-top: 6px; border-left: 1px solid #444; padding-left: 10px; margin-bottom: 6px;">
                                      <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                        <span style="color: #555;">└</span> Base Thorns: <span style="color: #fff;">${thornsPlayer.toLocaleString()}</span>
                                      </div>
                                      <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                                        <span style="color: #555;">└</span> ${bBramble.mainStatName} Multiplier: <span style="color: #fff;">x${Number(bBramble.mainStatMult.toFixed(6))}</span>
                                      </div>
                                      <div style="margin-bottom: 3px;">
                                        <div style="display: flex; align-items: center; gap: 5px;">
                                          <span style="color: #555;">└</span> Additive Multiplier: <span style="color: #fff;">1 + (${addStrBramble}%)</span>
                                        </div>
                                        ${(bBramble.additiveComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: +${(comp.value * 100).toFixed(1).replace('.0', '')}%</div>`).join('')}
                                      </div>
                                      <div>
                                        <div style="display: flex; align-items: center; gap: 5px;">
                                          <span style="color: #555;">└</span> Multiplicative Multiplier: <span style="color: #fff;">x${Number(bBramble.multiMult.toFixed(6))}</span>
                                        </div>
                                        ${(bBramble.multiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name.replace('Skill: ', '')}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                      </div>
                                    </div>
                                    <details style="margin-left: 20px; font-size: 0.9em; margin-bottom: 6px;">
                                      <summary style="cursor: pointer; display: flex; align-items: center; gap: 5px; outline: none; color: #f9d85c;">
                                        <span style="color: #555;">└</span> Critical Hit: <span style="font-weight: bold;">${brambleCritStr}</span>
                                      </summary>
                                      <div style="margin-left: 15px; margin-top: 5px; border-left: 1px solid #444; padding-left: 10px;">
                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                                          <span style="color: #555;">├</span> Base Critical Multiplier: x1.5
                                        </div>
                                        ${(bBramble.critMultiplicativeComponents || []).map(comp => `<div style="margin-left: 20px; font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px;"><span style="color: #555;">├</span> ${comp.name}: x${Number(comp.value.toFixed(6))}</div>`).join('')}
                                        <div style="font-size: 0.85em; color: #888; display: flex; align-items: center; gap: 5px; margin-top: 2px;">
                                          <span style="color: #555;">├</span> Additive Critical Bonus: +${Number(((bBramble.critAdditiveMult - bBramble.additiveMult) * 100).toFixed(1))}%
                                        </div>
                                      </div>
                                    </details>
                                  </details>`;
                            }
                            return html;
                        })()}

                        
                        <div style="margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">├</span> Attack Rate: <span style="color: #fff;">TBD frames</span>
                        </div>
                        <div style="margin-left: 15px; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                          <span style="color: #555;">└</span> Attack: <span style="color: #fff;">0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
                
                // Append skill-specific sliders
                if (baseSkill.name === 'Bone Prison' && window.selectedSkills['Bramble'] > 0) {
                    let curVal = window.skillSliderValues['Bramble Enemies'] !== undefined ? window.skillSliderValues['Bramble Enemies'] : 1;
                    let sliderDiv = document.createElement('div');
                    sliderDiv.style.marginTop = '15px';
                    sliderDiv.style.borderTop = '1px solid #334';
                    sliderDiv.style.paddingTop = '15px';
                    sliderDiv.innerHTML = `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <label style="color: #ccc; font-size: 0.85em;">Bramble: Enemies Trapped</label>
                            <span id="slider-val-bramble" style="color: #c9a55c; font-size: 0.85em; font-weight: bold;">${curVal}</span>
                        </div>
                        <input type="range" min="0" max="20" step="1" value="${curVal}" style="width: 100%; accent-color: #c9a55c;" 
                               oninput="document.getElementById('slider-val-bramble').innerText = this.value; window.skillSliderValues['Bramble Enemies'] = parseInt(this.value); window.calculate();">
                    `;
                    card.appendChild(sliderDiv);
                }

                if (baseSkill.name === 'Army of the Dead' && window.selectedSkills['Pile the Bodies'] > 0) {
                    let curVal = window.skillSliderValues['Pile the Bodies'] !== undefined ? window.skillSliderValues['Pile the Bodies'] : 300;
                    let sliderDiv = document.createElement('div');
                    sliderDiv.style.marginTop = '15px';
                    sliderDiv.style.borderTop = '1px solid #334';
                    sliderDiv.style.paddingTop = '15px';
                    sliderDiv.innerHTML = `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <label style="color: #ccc; font-size: 0.85em;">Pile the Bodies (Modifier Scaling)</label>
                            <span id="slider-val-pile" style="color: #c9a55c; font-size: 0.85em; font-weight: bold;">${curVal}%</span>
                        </div>
                        <input type="range" min="0" max="300" step="10" value="${curVal}" style="width: 100%; accent-color: #c9a55c;" 
                               oninput="document.getElementById('slider-val-pile').innerText = this.value + '%'; window.skillSliderValues['Pile the Bodies'] = parseInt(this.value); window.calculate();">
                    `;
                    card.appendChild(sliderDiv);
                }

                if ((baseSkill.name === 'Bone Spear' || baseSkill.baseName === 'Bone Spear') && window.selectedSkills['Pierce Damage Bonus'] > 0) {
                    let curVal = window.skillSliderValues['Pierce Damage Bonus'] !== undefined ? window.skillSliderValues['Pierce Damage Bonus'] : 0;
                    let sliderDiv = document.createElement('div');
                    sliderDiv.style.marginTop = '15px';
                    sliderDiv.style.borderTop = '1px solid #334';
                    sliderDiv.style.paddingTop = '15px';
                    sliderDiv.innerHTML = `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <label style="color: #ccc; font-size: 0.85em;">Pierce Damage Bonus (Enemies Pierced)</label>
                            <span id="slider-val-pierce" style="color: #c9a55c; font-size: 0.85em; font-weight: bold;">${curVal}</span>
                        </div>
                        <input type="range" min="0" max="5" step="1" value="${curVal}" style="width: 100%; accent-color: #c9a55c;" 
                               oninput="document.getElementById('slider-val-pierce').innerText = this.value; window.skillSliderValues['Pierce Damage Bonus'] = parseInt(this.value); window.calculate();">
                    `;
                    card.appendChild(sliderDiv);
                }

                if ((baseSkill.name === 'Bone Spear' || baseSkill.baseName === 'Bone Spear') && window.selectedSkills['First Hit Damage Bonus'] > 0) {
                    let isChecked = window.skillSliderValues['First Hit Damage Bonus'] === 1;
                    let checkDiv = document.createElement('div');
                    checkDiv.style.marginTop = '15px';
                    checkDiv.style.borderTop = '1px solid #334';
                    checkDiv.style.paddingTop = '15px';
                    checkDiv.innerHTML = `
                        <label style="color: #ccc; font-size: 0.85em; display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" ${isChecked ? 'checked' : ''} style="accent-color: #c9a55c;"
                                   onchange="window.skillSliderValues['First Hit Damage Bonus'] = this.checked ? 1 : 0; window.calculate();">
                            First Hit Damage Bonus
                        </label>
                    `;
                    card.appendChild(checkDiv);
                }

                if ((baseSkill.name === 'Bone Spirit' || baseSkill.baseName === 'Bone Spirit') && window.selectedSkills['Damage Bonus (Bone Spirit)'] > 0) {
                    let curVal = window.skillSliderValues['Bone Spirit Damage Bonus'] !== undefined ? window.skillSliderValues['Bone Spirit Damage Bonus'] : 0;
                    let sliderDiv = document.createElement('div');
                    sliderDiv.style.marginTop = '15px';
                    sliderDiv.style.borderTop = '1px solid #334';
                    sliderDiv.style.paddingTop = '15px';
                    sliderDiv.innerHTML = `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <label style="color: #ccc; font-size: 0.85em;">Damage Bonus (Seconds Waited)</label>
                            <span id="slider-val-bs-dmg" style="color: #c9a55c; font-size: 0.85em; font-weight: bold;">${curVal}</span>
                        </div>
                        <input type="range" min="0" max="3" step="1" value="${curVal}" style="width: 100%; accent-color: #c9a55c;" 
                               oninput="document.getElementById('slider-val-bs-dmg').innerText = this.value; window.skillSliderValues['Bone Spirit Damage Bonus'] = parseInt(this.value); window.calculate();">
                    `;
                    card.appendChild(sliderDiv);
                }

                container.appendChild(card);
            }
        });
    }
    
    if (foundSkills === 0) {
        container.innerHTML += `<p style="color: #aaa; font-style: italic;">Allocate points in your Skill Tree into skills that deal damage to see them appear here.</p>`;
    }
}


function calculateSkillCritChance(skillObj) {
    let components = [];
    let baseCrit = window.D4_COMPILED_STATS && window.D4_COMPILED_STATS['Critical Strike Chance'] ? window.D4_COMPILED_STATS['Critical Strike Chance'].final : 5.0;
    let totalCrit = baseCrit;
    
    components.push({ name: 'Global Critical Strike Chance', value: baseCrit });
    
    if (window.selectedSkills) {
        if ((skillObj.name === 'Reap' || skillObj.baseName === 'Reap') && window.selectedSkills['Critical Strike Chance (Reap)'] > 0) {
            totalCrit += 10.0;
            components.push({ name: 'Skill Upgrade', value: 10.0 });
        }
        
        if (window.selectedSkills['Decrepify'] > 0 && window.selectedSkills['Critical Strike Chance (Decrepify)'] > 0) {
            if (typeof getActiveConditions === 'function' && getActiveConditions().cursed) {
                totalCrit += 5.0;
                components.push({ name: 'Decrepify (Upgrade vs Cursed) [+]', value: 5.0 });
            }
        }
    }
    
    return {
        total: Math.min(totalCrit, 100),
        components: components
    };
}

function calculateLuckyHitChance(skillObj) {
    let components = [];
    let baseLHC = skillObj.luckyHitChance || 0;
    
    // Some skills have luckyHitChance as null but specify it in their description (e.g. Decompose, Blight, Corpse Tendrils)
    if (baseLHC === 0 && skillObj.description) {
        let match = skillObj.description.match(/Lucky Hit Chance.*?Mod\(\d+\)\?\d+:(\d+)/);
        if (match) {
            baseLHC = parseInt(match[1]);
        } else {
            let match2 = skillObj.description.match(/Lucky Hit Chance.*?{c_resource}(\d+)%/);
            if (match2) {
                baseLHC = parseInt(match2[1]);
            } else {
                let match3 = skillObj.description.match(/Lucky Hit Chance.*?(\d+)%/);
                if (match3) {
                    baseLHC = parseInt(match3[1]);
                }
            }
        }
    }
    
    if (baseLHC === 0) return { total: 0, components: [], bonusSum: 0 };
    
    components.push({ name: 'Base Lucky Hit Chance', value: baseLHC });
    
    let bonusLHC = 0;
    
    if (window.D4_COMPILED_STATS && window.D4_COMPILED_STATS['Lucky Hit Chance']) {
        bonusLHC += window.D4_COMPILED_STATS['Lucky Hit Chance'].final;
        if (window.D4_COMPILED_STATS['Lucky Hit Chance'].final > 0) {
            components.push({ name: 'Global Bonus [+]', value: window.D4_COMPILED_STATS['Lucky Hit Chance'].final });
        }
    }
    
    let baseName = skillObj.baseName || skillObj.name;
    if (window.selectedSkills && window.selectedSkills[`Lucky Hit Chance (${baseName})`] > 0) {
        let upgradeBonus = 0;
        if (baseName === 'Decompose') {
            upgradeBonus = 30;
        } else if (baseName === 'Blight') {
            upgradeBonus = 20;
        } else if (baseName === 'Corpse Tendrils') {
            upgradeBonus = 40;
        }
        
        if (upgradeBonus > 0) {
            bonusLHC += upgradeBonus;
            components.push({ name: 'Skill Upgrade [+]', value: upgradeBonus });
        }
    }
    
    let totalLHC = baseLHC * (1 + (bonusLHC / 100));
    
    return {
        total: totalLHC,
        components: components,
        bonusSum: bonusLHC
    };
}


let skill = {name: 'Skeleton Warrior', tags: ['Skill_Primary_Summoning', 'Skill_Primary_Corpse'], dType: 'Physical'}; global.window = {D4_COMPILED_STATS: {'Skill: Corpse Explosion (Bloody Mess) Damage [x]': {final: 50}}}; global.getActiveBuffs = () => ({overpower: 0}); global.getActiveConditions = () => ({vulnerable: true, close: true, corpsesNearby: true, shadowDot: false, cc: false, cursed: false}); calculateSkillMultiplicativeBucket(skill);