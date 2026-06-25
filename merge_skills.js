const fs = require('fs');

const rawCategories = {
  "Basic": ["Decompose", "Reap", "Hemorrhage", "Bone Splinters"],
  "Core": ["Bone Spear", "Sever", "Blight", "Skeleton Mage", "Blood Surge", "Blood Lance"],
  "Macabre": ["Corpse Explosion", "Skeleton Warrior", "Blood Mist", "Bone Prison", "Bone Spirit", "Golem"],
  "Corruption": ["Corpse Tendrils", "Decrepify", "Iron Maiden"],
  "Ultimate": ["Soulrift", "Bone Storm", "Army of the Dead", "Blood Wave"]
};

// Extracted from D4Builds
const fullSkillsList = [
    {
      "base_skill": "Reap",
      "enhancements": ["Ferocity", "Corpse Generation", "Essence Generation", "Critical Strike Chance"],
      "choices": ["Chilled to the Bone", "Cull the Weak", "Harvest"]
    },
    {
      "base_skill": "Decompose",
      "enhancements": ["Crowd Control", "Lucky Hit Chance", "Damage Bonus", "Barrier"],
      "choices": ["Rip and Tear", "Putrid Burst", "Dry Rot"]
    },
    {
      "base_skill": "Hemorrhage",
      "enhancements": ["Cast Speed", "Blood Orb", "Weaken", "Overpower"],
      "choices": ["Blood Boil", "Blood Runs Cold", "Soul Rip"]
    },
    {
      "base_skill": "Bone Splinters",
      "enhancements": ["Projectiles", "Essence Generation", "Resolve", "Vulnerable"],
      "choices": ["Bouncing Spines", "Bloody Splinter", "Shadow Seekers"]
    },
    {
      "base_skill": "Bone Spear",
      "enhancements": ["First Hit Damage Bonus", "Cost Reduction", "Pierce Damage Bonus", "Resolve"],
      "choices": ["Bone Spikes", "Blood Spear", "Shadow Splitter"]
    },
    {
      "base_skill": "Sever",
      "enhancements": ["Damage Bonus", "Cost Reduction", "Ferocity", "Crowd Control and Corpse Generation"],
      "choices": ["Reaping Lotus", "Inexorable Reaper", "Cold Pursuit"]
    },
    {
      "base_skill": "Blight",
      "enhancements": ["Area Damage Bonus", "Size Bonus", "Lucky Hit Chance", "Crowd Control Damage Bonus"],
      "choices": ["Piercing Darkness", "Whirlpool", "Volatile Blood"]
    },
    {
      "base_skill": "Skeleton Mage",
      "enhancements": ["Ferocity, Resolve, or Overpower", "Crowd Control Damage Bonus", "Critical Strike Chance", "Duration Damage Bonus"],
      "choices": ["Singularity", "Gift of Death", "Coven"]
    },
    {
      "base_skill": "Blood Surge",
      "enhancements": ["Overpower", "Weaken", "Damage Bonus", "Fortify"],
      "choices": ["Pins and Needles", "You And What Army?", "Bloodbath"]
    },
    {
      "base_skill": "Blood Lance",
      "enhancements": ["Overpower", "Cost Reduction", "Ricochet", "Fortify"],
      "choices": ["Festering Wound", "Gore Quills", "Blood Seeker"]
    },
    {
      "base_skill": "Corpse Explosion",
      "enhancements": ["Multiple Corpses", "Corpse Efficiency", "Blood Orb", "Essence Generation"],
      "choices": ["Bloody Mess", "Miasma", "Shrapnel"]
    },
    {
      "base_skill": "Skeleton Warrior",
      "enhancements": ["Damage Bonus", "Healing", "Resolve", "Vulnerable"],
      "choices": ["Master of Puppets", "Service and Sacrifice", "Litany of Death"]
    },
    {
      "base_skill": "Corpse Tendrils",
      "enhancements": ["Critical Strike Chance", "Essence Generation", "Lucky Hit Chance", "Vulnerable"],
      "choices": ["Bitter Harvest", "Get Over Here!", "Jaws of Death"]
    },
    {
      "base_skill": "Bone Spirit",
      "enhancements": ["Charges", "Core Skill", "Maximum Essence", "Damage Bonus"],
      "choices": ["Poltergeists", "Unfinished Business", "Astral Projection"]
    },
    {
      "base_skill": "Golem",
      "enhancements": ["Unstoppable", "Damage Bonus", "Weaken", "Resolve, Overpower, or Ferocity"],
      "choices": ["Gravebloom", "Fel Gluttony", "Gargantua"]
    },
    {
      "base_skill": "Blood Mist",
      "enhancements": ["Overpower", "Vulnerable and Slow", "Movement Speed", "Critical Strike"],
      "choices": ["Devouring Mist", "Blood Rush", "Blood Transfusion"]
    },
    {
      "base_skill": "Bone Prison",
      "enhancements": ["Resolve", "Vulnerable", "Cooldown Reduction", "Essence Generation"],
      "choices": ["Life Imprisonment", "Plunging Darkness", "Bramble"]
    },
    {
      "base_skill": "Decrepify",
      "enhancements": ["Critical Strike Chance", "Cooldown Reduction", "Movement Speed", "Resolve"],
      "choices": ["Dizzying Curse", "Life Tap", "Unholy Frenzy"]
    },
    {
      "base_skill": "Iron Maiden",
      "enhancements": ["Essence Generation", "Execute and Fortify", "Ferocity and Overpower", "Vulnerable"],
      "choices": ["Schadenfreude", "Torture Artist", "Blood Maiden"]
    },
    {
      "base_skill": "Soulrift",
      "enhancements": ["Damage Bonus", "Barrier", "Ferocity", "Vulnerable and Crowd Control"],
      "choices": ["Distilled Anima", "Soul Vortex", "Frozen Wasteland"]
    },
    {
      "base_skill": "Bone Storm",
      "enhancements": ["Damage Reduction", "Duration Increase", "Barrier", "Vulnerable"],
      "choices": ["Roll the Bones", "Shadow and Bone", "Hungry Cyclone"]
    },
    {
      "base_skill": "Army of the Dead",
      "enhancements": ["Corpse Generation", "Passive Bonus", "Damage Bonus", "Cooldown Reduction"],
      "choices": ["Dead Cold", "Pile the Bodies", "Unyielding Commander"]
    },
    {
      "base_skill": "Blood Wave",
      "enhancements": ["Damage Bonus", "Damage Reduction", "Overpower", "Blood Orb"],
      "choices": ["Tides of Blood", "Path to Darkness", "Hematolagnia"]
    }
];

const finalDb = {};

for (const [category, skillNames] of Object.entries(rawCategories)) {
  finalDb[category] = [];
  
  skillNames.forEach(name => {
    const data = fullSkillsList.find(s => s.base_skill === name);
    if (data) {
      finalDb[category].push({
        name: data.base_skill,
        maxRank: 15,
        enhancement: {
          name: "Enhanced " + data.base_skill,
          maxRank: 1,
          branches: data.choices.map(c => ({ name: c, maxRank: 1 }))
        }
      });
    }
  });
}

fs.writeFileSync('assets/skills_data.json', JSON.stringify(finalDb, null, 2));
fs.writeFileSync('assets/skills.js', 'const skillsDatabase = ' + JSON.stringify(finalDb, null, 2) + ';');
