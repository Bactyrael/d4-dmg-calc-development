const skillsDatabase = {
  "Basic": [
    {
      "name": "Decompose",
        tags: ["Skill_Shadow", "Skill_Channeled", "Search_Shadow", "Skill_Primary_Basic"],
        baseDamageScalar: 1.5,
        resourceCost: 0,
        description: "{if:AffixIsEquipped(1944498)>0}{c_label}Essence Cost: {/c}{c_resource}[{resource cost}|2?|] per second{/c}\\n{/if}{c_label}Generate Essence:{/c_label} {c_resource}[13*PowerFinalizedAttackSpeed|2?|]{/c_resource} per second\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[Mod(2686060764)?70:40|%|]{/c}\\n{/if}Tear the flesh from an enemy, dealing {c_number}[{dot:decomposing}|2?|]{/c} Corrupting damage per second and forming a usable Corpse with the flesh every {c_number}1{/c} second.",
      "maxRank": 15,
      "damageType": "Shadow",
      "tags": [
        "Basic",
        "Darkness",
        "Channeled",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Rip and Tear",
            tags: ["Damage_Override_Physical", "Skill_Bone", "Search_Physical"],
            description: "{c_important}Decompose{/c} becomes a {c_important}Bone{/c} Skill that deals Physical damage.\\n\\n{c_important}Decompose{/c} now hits all other enemies in between you and the primary target.",
          "maxRank": 1
        },
        {
          "name": "Putrid Burst",
            tags: ["Search_Damage"],
            description: "{c_important}Decompose{/c} causes a burst around the target every second, dealing an additional {c_number}[{payload:burst}|2?|]{/c} damage to them and nearby enemies.",
          "maxRank": 1
        },
        {
          "name": "Dry Rot",
          "maxRank": 1
        },
        {
          "name": "Crowd Control",
            description: "{c_important}Decompose{/c} Slows enemies by {c_number}50%{/c}.",
          "maxRank": 1
        },
        {
          "name": "Lucky Hit Chance",
            tags: ["Search_LuckyHit"],
            description: "{c_important}Corpse Tendrils{/c} gains an additional {c_number}40%{c_lightgray}\\[+\\]{/c}{/c} Lucky Hit Chance.",
          "maxRank": 1
        },
        {
          "name": "Damage Bonus",
            tags: ["Search_Damage"],
            description: "Commanding your {c_important}Skeleton Warriors{/c} causes them to deal {c_number}25%{c_lightgray}\\[x\\]{/c}{/c} increased damage for {c_number}10{/c} seconds.",
          "maxRank": 1
        },
        {
          "name": "Barrier",
            tags: ["Keyword_Barrier"],
            description: "Every soul absorbed by {c_important}Soulrift{/c} grants a {c_important}{u}Barrier{/c}{/u} for {c_number}0.5%{/c} of your Maximum Life {c_number}([Max(1,PlayerHealthMax()*0.005)|0|]){/c}. \\n\\nThis {c_important}{u}Barrier{/c}{/u} persists for {c_number}5{/c} seconds after {c_important}Soulrift{/c} ends.",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Reap",
        tags: ["Skill_Shadow", "Skill_Primary_Basic"],
        baseDamageScalar: 0.5,
        resourceCost: 0,
        description: "{if:AffixIsEquipped(1944498)>0}{c_label}Essence Cost: {/c}{c_resource}[{resource cost}|2?|]{/c}\\n{/if}{c_label}Generate Essence:{/c_label} {c_resource}[Mod(2686060762)?17:15|2?|]{/c_resource}\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}Sweep an ethereal scythe in front of you, dealing {c_number}[{payload:damage}|2?|]{/c} damage.",
      "maxRank": 15,
      "damageType": "Shadow",
      "tags": [
        "Basic",
        "Darkness",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Chilled To The Bone",
            tags: ["Keyword_Chill", "Damage_Override_Cold", "Search_CastSpeed", "Search_Cold"],
            description: "{c_important}Reap{/c} deals {c_number}[{payload:damage_cold}|2?|]{/c} Cold damage and {c_important}{u}Chills{/u}{/c} for {c_number}[15*Table(34,sLevel)|%|]{/c}.\\n\\n{c_important}Reap{/c} gains an additional {c_number}30%{c_lightgray}\\[+\\]{/c}{/c} Cast Speed.",
          "maxRank": 1
        },
        {
          "name": "Cull The Weak",
            tags: ["Search_Damage", "Keyword_Blood_Orb", "Skill_Blood", "Damage_Override_Physical", "Keyword_Execute", "Search_Physical"],
            description: "{c_important}Reap{/c} becomes a {c_important}Blood{/c} Skill that deals {c_number}[{payload:damage_blood}|2?|]{/c} Physical damage.\\n\\n{c_important}Reap{/c} will {c_important}{u}Execute{/c}{/u} enemies and has a {c_number}50%{/c} chance to form a {c_important}{u}Blood Orb{/u}{/c} if they are killed by it.",
          "maxRank": 1
        },
        {
          "name": "Harvest",
            tags: ["Search_Damage", "Search_ResourceEssence"],
            description: "{c_important}Reap{/c} sweeps a second time, dealing {c_number}[{payload:damage_echo}|2?|]{/c} damage and generating {c_number}7.5{/c} Essence.",
          "maxRank": 1
        },
        {
          "name": "Ferocity",
            description: "Every {c_number}30{/c} souls absorbed by {c_important}Soulrift{/c} grants {c_number}1{/c} stack of {c_important}{u}Ferocity{/c}{/u}.",
          "maxRank": 1
        },
        {
          "name": "Corpse Generation",
          "maxRank": 1
        },
        {
          "name": "Essence Generation",
            tags: ["Search_ResourceEssence"],
            description: "Casting {c_important}Corpse Tendrils{/c} generates {c_number}35{/c} Essence.",
          "maxRank": 1
        },
        {
          "name": "Critical Strike Chance",
            description: "You gain an additional {c_number}5%{c_lightgray}\\[+\\]{/c}{/c} Critical Strike Chance against enemies damaged by {c_important}Skeleton Mages{/c}.",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Hemorrhage",
        tags: ["Skill_Blood", "Keyword_Blood_Orb", "Skill_Primary_Basic"],
        baseDamageScalar: 0.8,
        resourceCost: 0,
        description: "{if:AffixIsEquipped(1944498)>0}{c_label}Essence Cost: {/c}{c_resource}[{resource cost}|2?|]{/c}\\n{/if}{c_label}Generate Essence:{/c_label} {c_resource}13{/c_resource}\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}Burst an enemy's blood, dealing {c_number}[{payload:damage}|2?|]{/c} damage. {c_important}Hemorrhage{/c} has a {c_number}[0.2*(1+Blood_Orb_Bonus_Chance_Per_Power(484661))*100|%|]{/c} chance to form a {c_important}{u}Blood Orb{/u}{/c}.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Basic",
        "Blood",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Blood Boil",
            tags: ["Search_Damage"],
            description: "{c_important}Hemorrhage{/c} also deals {c_number}[{payload:damage_aoe}|2?|]{/c} damage to enemies around your target.",
          "maxRank": 1
        },
        {
          "name": "Blood Runs Cold",
            tags: ["Damage_Override_Cold", "Keyword_Freeze", "Keyword_Blood_Orb", "Search_Cold"],
            description: "{c_important}Hemorrhage{/c} deals {c_number}[{payload:damage_cold}|2?|]{/c} Cold damage and {c_important}{u}Freezes{/c}{/u} enemies for {c_number}[{buffduration:freeze}|2?|]{/c} seconds. An enemy can be {c_important}{u}Frozen{/c}{/u} this way once every {c_number}6{/c} seconds.\\n\\nIf {c_important}Hemorrhage{/c} hits an enemy already {c_important}{u}Frozen{/u}{/c}, it has an additional {c_number}50%{/c} chance to form a {c_important}{u}Blood Orb{/u}{/c}.",
          "maxRank": 1
        },
        {
          "name": "Soul Rip",
            tags: ["Skill_Shadow", "Damage_Override_Shadow", "Keyword_Blood_Orb", "Search_Shadow", "Skill_Primary_Summoning"],
            description: "{c_important}Hemorrhage{/c} becomes a {c_important}Darkness{/c} Skill that deals {c_number}[{payload:damage_shadow}|2?|]{/c} Shadow damage.\\n\\nInstead of forming a {c_important}{u}Blood Orb{/c}{/u}, {c_important}Hemorrhage{/c} Summons a {c_important}Volatile Skeleton{/c} that deals {c_number}[{payload:volatile_skeleton}|2?|]{/c} damage.",
          "maxRank": 1
        },
        {
          "name": "Cast Speed",
            description: "{c_important}Hemorrhage{/c} gains an additional {c_number}20%{c_lightgray}\\[+\\]{/c}{/c} Cast Speed.",
          "maxRank": 1
        },
        {
          "name": "Blood Orb",
          "maxRank": 1
        },
        {
          "name": "Weaken",
            tags: ["Keyword_Weaken"],
            description: "{c_important}Hemorrhage{/c} {c_important}{u}Weakens{/c}{/u} enemies for {c_number}4{/c} seconds.",
          "maxRank": 1
        },
        {
          "name": "Overpower",
            description: "Casting {c_important}Blood Wave{/c} overfills your {c_important}{u}Overpower{/c}{/u} by {c_number}2{/c}.",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Bone Splinters",
        tags: ["Skill_Bone", "Skill_Primary_Basic"],
        baseDamageScalar: 0.3,
        resourceCost: 0,
        description: "{if:AffixIsEquipped(1944498)>0}{c_label}Essence Cost: {/c}{c_resource}[{resource cost}|2?|]{/c}\\n{/if}{c_label}Generate Essence:{/c} {c_resource}10{/c}\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}Fire {c_number}3{/c} splinters of bone, dealing {c_number}[{payload:damage}|2?|]{/c} damage each.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Basic",
        "Bone",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Bouncing Spines",
            tags: ["Search_Damage"],
            description: "{c_important}Bone Splinters{/c} now deals {c_number}[{payload:bounce_damage}|2?|]{/c} damage with each splinter, bounces off walls, and travels further.",
          "maxRank": 1
        },
        {
          "name": "Bloody Splinter",
            tags: ["Skill_Blood", "Search_Healing"],
            description: "{c_important}Bone Splinters{/c} becomes a {c_important}Blood{/c} Skill that deals {c_number}[{payload:blood_damage}|2?|]{/c} damage and pierces {c_number}1{/c} time.\\n\\nEach time a splinter hits an enemy you Heal for {c_number}[0.02*Table(34,sLevel)*100|1%|]{/c} of your Maximum Life {c_number}([PlayerHealthMax()*(0.02*Table(34,sLevel))||]){/c}.",
          "maxRank": 1
        },
        {
          "name": "Shadow Seekers",
          "maxRank": 1
        },
        {
          "name": "Projectiles",
            tags: ["Search_Damage"],
            description: "{c_important}Bone Splinters{/c} fires {c_number}1{/c} additional splinter.",
          "maxRank": 1
        },
        {
          "name": "Essence Generation",
          "maxRank": 1
        },
        {
          "name": "Vulnerable",
            tags: ["Keyword_Vulnerable"],
            description: "{c_important}Skeleton Warriors{/c} have a {c_number}30%{/c} chance to make enemies {c_important}{u}Vulnerable{/c}{/u} for {c_number}4{/c} seconds.",
          "maxRank": 1
        },
        {
          "name": "Resolve",
            description: "Commanding your {c_important}Skeleton Warriors{/c} grants {c_number}3{/c} stacks of {c_important}{u}Resolve{/c}{/u}.",
          "maxRank": 1
        }
      ]
    }
  ],
  "Core": [
    {
      "name": "Bone Spear",
        tags: ["Skill_Bone", "Skill_Primary_Core"],
        baseDamageScalar: 1.3,
        resourceCost: 25,
        description: "{c_label}Essence Cost:{/c} {c_resource}[{resource cost}|2?|]{/c}\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}Conjure a bone spear from the ground that pierces enemies, dealing {c_number}[{payload:damage}|2?|]{/c} damage.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Core",
        "Bone",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Shadow Splitter",
            tags: ["Damage_Override_Shadow", "Skill_Shadow", "Search_Damage", "Search_Shadow"],
            description: "{c_important}Bone Spear{/c} becomes a {c_important}Darkness{/c} Skill that deals {c_number}[{payload:damage_shadow}|2?|]{/c} Shadow damage.\\n\\nInstead of piercing through, {c_important}Bone Spear{/c} forks into {c_number}2{/c} piercing spears each time it hits an enemy or wall, up to {c_number}2{/c} times.",
          "maxRank": 1
        },
        {
          "name": "Blood Spear",
            tags: ["Search_Damage", "Skill_Blood", "Search_Copy_Corpse", "Damage_Override_Physical"],
            description: "{c_important}Bone Spear{/c} becomes a {c_important}Blood{/c} Skill that deals {c_number}[{payload:damage_blood}|2?|]{/c} damage.\\n\\nCasting {c_important}Bone Spear{/c} consumes a nearby Corpse and conjures a second {c_important}Bone Spear{/c} from it, dealing {c_number}100%{/c} of normal damage.",
          "maxRank": 1
        },
        {
          "name": "Bone Spikes",
            tags: ["Search_Damage"],
            description: "{c_important}Bone Spear{/c} breaks into {c_number}3{/c} piercing bone shards when it is destroyed, dealing {c_number}[{payload:damage_boneshard}|2?|]{/c} damage each.",
          "maxRank": 1
        },
        {
          "name": "Resolve",
          "maxRank": 1
        },
        {
          "name": "Pierce Damage Bonus",
            description: "{c_important}Bone Spear{/c} deals {c_number}10%{c_lightgray}\\[x\\]{/c}{/c} increased damage per enemy pierced{if:Mod(582507896)} or forked{/if}, up to {c_number}50%{c_lightgray}\\[x\\]{/c}{/c}.",
          "maxRank": 1
        },
        {
          "name": "First Hit Damage Bonus",
            tags: ["Search_Damage"],
            description: "{c_important}Bone Spear{/c} deals {c_number}40%{c_lightgray}\\[x\\]{/c}{/c} increased damage to the first enemy hit.",
          "maxRank": 1
        },
        {
          "name": "Cost Reduction",
            description: "{c_important}Blood Lance's{/c} Essence cost is reduced by {c_number}3{/c}.",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Sever",
        tags: ["Skill_Shadow", "Skill_Primary_Core"],
        resourceCost: 20,
        description: "{c_label}Essence Cost: {/c}{c_resource}[{resource cost}|2?|]{/c}\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}A specter of you charges forward, dealing {c_number}[{payload:projectile_damage}|2?|]{/c} damage, then attacks with its scythe, dealing {c_number}[{payload:damage_out}|2?|]{/c} damage.",
      "maxRank": 15,
      "damageType": "Shadow",
      "tags": [
        "Core",
        "Darkness",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Cold Pursuit",
            tags: ["Damage_Override_Cold", "Search_Damage", "Keyword_Chill", "Search_Cold"],
            description: "{c_important}Sever{/c} deals Cold damage, {c_important}{u}Chills{/c}{/u} for {c_number}15%{/c}, and seeks another enemy to attack again.",
          "maxRank": 1
        },
        {
          "name": "Inexorable Reaper",
            tags: ["Skill_Mobility"],
            description: "{c_important}Sever{/c} is also a {c_important}Mobility{/c} Skill that dashes you forward to attack instead.",
          "maxRank": 1
        },
        {
          "name": "Reaping Lotus",
            tags: ["Search_Damage"],
            description: "{c_important}Sever{/c} sends out {c_number}3{/c} additional specters at its apex that expand out, dealing {c_number}[{payload:lotus_damage_out}|2?|]{/c} damage each.",
          "maxRank": 1
        },
        {
          "name": "Ferocity",
          "maxRank": 1
        },
        {
          "name": "Crowd Control and Corpse Generation",
            description: "{c_important}Sever{/c} Slows enemies by {c_number}40%{/c} for {c_number}3{/c} seconds and forms a Corpse.",
          "maxRank": 1
        },
        {
          "name": "Damage Bonus",
          "maxRank": 1
        },
        {
          "name": "Cost Reduction",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Blight",
        tags: ["Skill_Shadow", "Search_Shadow", "Skill_Primary_Core"],
        resourceCost: 20,
        description: "{c_label}Essence Cost: {/c}{c_resource}[{resource cost}|2?|]{/c}\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[Mod(2686060764)?60:40|%|]{/c}\\n{/if}Unleash concentrated blight that deals {c_number}[{payload:projectile_damage}|2?|]{/c} damage and leaves behind a defiled area, dealing {c_number}[{dot:tooltip_dot}|2?|]{/c} Corrupting damage over {c_number}[{buffduration:tooltip_dot}|2?|]{/c} seconds.",
      "maxRank": 15,
      "damageType": "Shadow",
      "tags": [
        "Core",
        "Darkness",
        "Damage",
        "Damage over Time"
      ],
      "modifiers": [
        {
          "name": "Volatile Blood",
            description: "{c_important}Blight{/c} becomes a {c_important}Blood{/c} skill that deals Physical damage. \\n\\n{c_important}Blight's{/c} defiled area instantly bursts, dealing {c_number}[{payload:modc_damage}|2?|]{/c} damage.",
          "maxRank": 1
        },
        {
          "name": "Whirlpool",
            tags: ["Search_CrowdControl", "Keyword_Chill", "Damage_Override_Cold", "Search_Cold"],
            description: "{c_important}Blight{/c} deals Cold and Frostbite damage. \\n\\nIts defiled area Pulls in enemies and {c_important}{u}Chills{/u}{/c} for {c_number}[Min(1,0.15*(1+Bonus_Percent_Per_Power(481293)))*100|%|]{/c} every second.",
          "maxRank": 1
        },
        {
          "name": "Piercing Darkness",
            description: "{c_important}Blight{/c} pierces {c_number}1{/c} time and can spawn an additional defiled area.",
          "maxRank": 1
        },
        {
          "name": "Lucky Hit Chance",
          "maxRank": 1
        },
        {
          "name": "Crowd Control Damage Bonus",
          "maxRank": 1
        },
        {
          "name": "Area Damage Bonus",
            tags: ["Search_Damage"],
            description: "{c_important}Blight's{/c} defiled area deals {c_number}40%{c_lightgray}\\[x\\]{/c}{/c} increased damage.",
          "maxRank": 1
        },
        {
          "name": "Size Bonus",
            description: "{c_important}Blight's{/c} Size is increased by {c_number}35%{/c}.",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Skeleton Mage",
        tags: ["Skill_Primary_Summoning", "Skill_Primary_Minion", "Skill_Primary_Core"],
        baseDamageScalar: 0.8,
        resourceCost: 30,
        description: "{c_label}Essence Cost: {/c}{c_resource}[{resource cost}|2?|]{/c}\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}Raise a skeletal mage, up to a maximum of {c_number}[Floor((3+Necro_Bonus_Max_Mages+(Mod(582507894)?2:0))*((NecroPetPassiveIsActive(931578)?0.5:1)*(NecroPetPassiveIsActive(931587)?0.5:1)*(NecroPetPassiveIsActive(931594)?0.5:1)))|2?|]{/c} mages. Skeletal mages deal {c_number}[{payload:tooltip_shadow}|2?|]{/c} damage with each attack.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Core",
        "Minion",
        "Summoning",
        "Mage",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Singularity",
            tags: ["Search_Damage", "Search_ResourceEssence"],
            description: "{c_important}Skeleton Mage{/c} will consume all of your remaining Essence on cast to raise a more powerful but temporary mage.\\n\\nThe skeletal mage deals {c_number}3%{c_lightgray}\\[x\\]{/c}{/c} increased damage and lasts for {c_number}0.1{/c} seconds for each point of Essence consumed.",
          "maxRank": 1
        },
        {
          "name": "Gift of Death",
            tags: ["Skill_Primary_Corpse", "Search_ResourceEssence", "Search_Copy_Corpse"],
          "maxRank": 1
        },
        {
          "name": "Coven",
            description: "{c_important}Skeleton Mage's{/c} maximum number of mages is increased by {c_number}2{/c}.",
          "maxRank": 1
        },
        {
          "name": "Ferocity, Resolve, or Overpower",
            tags: ["Keyword_Hunter", "Keyword_Guardian", "Keyword_Overpower"],
            description: "{c_important}Skeleton Mages{/c} have a {c_number}5%{/c} chance to grant {c_number}1{/c} stack of {c_important}{u}Ferocity{/c}{/u}, {c_important}{u}Resolve{/c}{/u}, or {c_important}{u}Overpower{/c}{/u} whenever they attack based on whether your {c_important}Skeleton Mage{/c} type is Shadow, Cold, or Bone respectively.",
          "maxRank": 1
        },
        {
          "name": "Crowd Control Damage Bonus",
          "maxRank": 1
        },
        {
          "name": "Duration Damage Bonus",
            tags: ["Search_Damage"],
            description: "{c_important}Skeleton Mages{/c} deal {c_number}15%{c_lightgray}\\[x\\]{/c}{/c} increased damage. This bonus increases by {c_number}1%{/c} every second that the skeletal mage is alive, up to {c_number}25%{c_lightgray}\\[x\\]{/c}{/c}.",
          "maxRank": 1
        },
        {
          "name": "Critical Strike Chance",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Blood Surge",
        tags: ["Skill_Blood", "Skill_Primary_Core"],
        resourceCost: 30,
        description: "{c_label}Essence Cost: {/c}{c_resource}[{resource cost}|2?|]{/c}\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}Draw blood from enemies, dealing {c_number}[{payload:outer_damage}|2?|]{/c} damage, then expel a blood nova, dealing {c_number}[{payload:inner_damage}|2?|]{/c} damage.\\n\\n{c_important}Blood Surge's{/c} nova damage is increased by {c_number}5%{c_lightgray}\\[x\\]{/c}{/c} for each enemy drawn from, up to {c_number}50%{c_lightgray}\\[x\\]{/c}{/c}.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Core",
        "Blood",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Pins and Needles",
            tags: ["Skill_Bone", "Damage_Override_Physical"],
            description: "{c_important}Blood Surge{/c} becomes a {c_important}Bone{/c} Skill and, instead of expelling a blood nova, expels {c_number}10{/c} piercing bone shards dealing {c_number}[{payload:shard_damage}|2?|]{/c} damage each.\\n\\nInstead of dealing increased damage, {c_important}Blood Surge{/c} expels {c_number}1{/c} additional shard for each enemy drawn from, up to {c_number}5{/c} additional shards.",
          "maxRank": 1
        },
        {
          "name": "You And What Army?",
            tags: ["Search_Minion"],
            description: "{c_important}Blood Surge{/c} expels smaller blood novas on your {c_important}Minions{/c}, dealing {c_number}[{payload:legendary_minion_nova}|2?|]{/c} damage.\\n\\n{c_important}Blood Surge's{/c} minion nova damage is increased by {c_number}5%{c_lightgray}\\[x\\]{/c}{/c} for each enemy drawn from, up to {c_number}50%{c_lightgray}\\[x\\]{/c}{/c}.",
          "maxRank": 1
        },
        {
          "name": "Bloodbath",
            tags: ["Search_Damage"],
            description: "{c_important}Blood Surge's{/c} nova echoes again after a short delay, dealing {c_number}[{payload:echo_damage}|2?|]{/c} damage.",
          "maxRank": 1
        },
        {
          "name": "Overpower",
          "maxRank": 1
        },
        {
          "name": "Weaken",
          "maxRank": 1
        },
        {
          "name": "Damage Bonus",
          "maxRank": 1
        },
        {
          "name": "Fortify",
            description: "{c_important}Blood Lance{/c} {c_important}{u}Fortifies{/c}{/u} you for {c_number}4%{/c} of your Maximum Life {c_number}([Max(1,{fortified:mod_fortify})|0|]){/c} if it hits an enemy already lanced.",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Blood Lance",
        tags: ["Skill_Blood", "Skill_Primary_Core"],
        baseDamageScalar: 1.3,
        resourceCost: 15,
        description: "{c_label}Essence Cost:{/c} {c_resource}[{resource cost}|2?|]{/c}\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}Throw a blood lance, dealing {c_number}[{payload:damage}|2?|]{/c} to an enemy that ricochets to another enemy. Enemies hit are lanced for {if:Mod(582507896)}almost forever{else}{c_number}[{buffduration:lanced}|2?|]{/c} seconds{/if}.\\n\\nWhen {c_important}Blood Lance{/c} hits an enemy, it deals damage to all other lanced enemies.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Core",
        "Blood",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Festering Wound",
            tags: ["Damage_Override_Shadow", "Skill_Shadow", "Search_Damage", "Search_ShadowDOT", "Search_Shadow"],
            description: "{c_important}Blood Lance{/c} becomes a {c_important}Darkness{/c} Skill and deals Shadow damage.\\n\\nEnemies hit are permanently lanced and the lance deals {c_number}[{dot:tooltip_darkness_dot}|2?|]{/c} Corrupting damage per second to them.",
          "maxRank": 1
        },
        {
          "name": "Gore Quills",
            tags: ["Keyword_Blood_Orb", "Search_Damage"],
            description: "Every {c_number}3rd{/c} cast of {c_important}Blood Lance{/c} forms a {c_important}{u}Blood Orb{/c}{/u} under the first enemy hit.\\n\\nCasting {c_important}Blood Lance{/c} will pick up a {c_important}{u}Blood Orb{/c}{/u} around you and conjure an additional lance from it, dealing {c_number}125%{/c} of normal damage.",
          "maxRank": 1
        },
        {
          "name": "Blood Seeker",
            tags: ["Search_Damage"],
            description: "{c_important}Blood Lance{/c} deals {c_number}45%{c_lightgray}\\[x\\]{/c}{/c} increased damage to its primary target per lanced enemy.",
          "maxRank": 1
        },
        {
          "name": "Overpower",
          "maxRank": 1
        },
        {
          "name": "Cost Reduction",
          "maxRank": 1
        },
        {
          "name": "Ricochet",
            description: "{c_important}Blood Lance{/c} ricochets to {c_number}1{/c} additional enemy.",
          "maxRank": 1
        },
        {
          "name": "Fortify",
          "maxRank": 1
        }
      ]
    }
  ],
  "Macabre": [
    {
      "name": "Corpse Explosion",
        tags: ["Skill_Corruption", "Skill_Primary_Corpse"],
        baseDamageScalar: 1.1,
        description: "{if:Mod(2686060764)}{c_label}Generate Essence:{/c_label} {c_resource}15{/c_resource}\\n{/if}{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}25%{/c}\\n{/if}Detonate a Corpse, dealing {c_number}[{payload:damage}|2?|]{/c} damage to enemies.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Macabre",
        "Corpse",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Shrapnel",
            description: "{c_important}Corpse Explosion{/c} is also a {c_important}Bone{/c} Skill and, instead of exploding, fires {c_number}8{/c} piercing bone shards dealing {c_number}[{payload:shard_damage}|2?|]{/c} damage each.",
          "maxRank": 1
        },
        {
          "name": "Miasma",
            tags: ["Skill_Shadow", "Damage_Override_Shadow", "Search_ShadowDOT", "Search_Damage", "Search_Shadow"],
            description: "{c_important}Corpse Explosion{/c} is also a {c_important}Darkness{/c} Skill and, instead of exploding, releases a vile miasma dealing {c_number}[{dot:miasma_dot_tooltip}|2?|]{/c} Corrupting damage over {c_number}6{/c} seconds.",
        description: "{c_label}Cooldown:{/c_label} {c_resource}[{cooldown time}|2?|]{/c_resource} seconds\\nRelease vile miasma from a corpse that deals {c_number}[{dot:dot_tooltip}|2?|]{/c} over -6 seconds.",
          "maxRank": 1
        },
        {
          "name": "Bloody Mess",
            tags: ["Search_Damage", "Search_Copy_Corpse", "Search_Size"],
            description: "{c_important}Corpse Explosion's{/c} Size is increased by {c_number}50%{/c} and damage is increased by {c_number}50%{c_lightgray}\\[x\\]{/c}{/c}.",
          "maxRank": 1
        },
        {
          "name": "Essence Generation",
          "maxRank": 1
        },
        {
          "name": "Blood Orb",
          "maxRank": 1
        },
        {
          "name": "Multiple Corpses",
            tags: ["Search_Copy_Corpse", "Search_Damage"],
            description: "{c_important}Corpse Explosion{/c} detonates up to {c_number}2{/c} additional corpses.",
          "maxRank": 1
        },
        {
          "name": "Corpse Efficiency",
            description: "Corpses consumed by {c_important}Corpse Explosion{/c} can be consumed {c_number}1{/c} additional time.",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Skeleton Warrior",
        tags: ["Skill_Primary_Summoning", "Skill_Primary_Corpse", "Skill_Primary_Minion"],
        description: "{c_label}Cooldown:{/c_label} {c_resource}[{cooldown time}|2?|]{/c_resource} seconds\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}{c_label}Passive:{/c} Raise a skeletal warrior from a nearby Corpse every {c_number}2{/c} seconds, up to a maximum of {c_number}[Floor((4+(NecroPetPassiveIsActive(931558)?2:0)+(Mod(582507894)?3:0)+Affix_Value_2(2587892)+Affix_Value_1(2587975))*(NecroPetPassiveIsActive(931560)?0.5:1)*(NecroPetPassiveIsActive(931563)?0.5:1)*(NecroPetPassiveIsActive(931566)?0.5:1))|2?|]{/c} warriors. Skeletal warriors deal {c_number}[{payload:tooltip_sword}|2?|]{/c} with each attack.\\n\\n{c_label}Active:{/c} Command your skeletal warriors to leap at an enemy and attack.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Macabre",
        "Minion",
        "Summoning",
        "Warrior",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Litany of Death",
            tags: ["Search_Damage", "Search_Healing", "Search_Critical"],
            description: "If all of your skeletal warriors have been Summoned, {c_important}Skeleton Warrior{/c} briefly Summons a {c_important}Skeleton Priest{/c} instead.\\n\\n{c_important}Skeleton Priest{/c} empowers your {c_important}Minions{/c} for {c_number}8{/c} seconds, increasing their Critical Strike Chance by {c_number}[0.15*Table(37,sLevel)*100|%+|]{/c} and healing them for {c_number}100%{/c} of their Maximum Life over the duration.",
          "maxRank": 1
        },
        {
          "name": "Service and Sacrifice",
            tags: ["Search_Damage"],
          "maxRank": 1
        },
        {
          "name": "Master of Puppets",
            description: "{c_important}Skeleton Warrior's{/c} maximum number of warriors is increased by {c_number}3{/c}.",
          "maxRank": 1
        },
        {
          "name": "Resolve",
          "maxRank": 1
        },
        {
          "name": "Vulnerable",
          "maxRank": 1
        },
        {
          "name": "Damage Bonus",
          "maxRank": 1
        },
        {
          "name": "Healing",
            description: "{c_important}Skeleton Warriors{/c} heal you for {c_number}2%{/c} of your Maximum Life {c_number}([PlayerHealthMax()*0.02||]){/c} whenever they attack.",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Blood Mist",
        tags: ["Skill_Blood", "Keyword_Immune", "Skill_Primary_Macabre"],
        baseDamageScalar: 0.35000000000000003,
        description: "{c_label}Cooldown:{/c_label} {c_resource}[{cooldown time}|2?|]{/c_resource} seconds \\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}9%{/c}\\n{/if}Disperse into a bloody mist, becoming {c_important}{u}Immune{/u}{/c} for {c_number}[{buffduration:mistform}|2?|]{/c} seconds. You deal {c_number}[{dot:tooltip_dot}|2?|]{/c} damage to enemies and Heal for {c_number}[0.005*Table(34,sLevel)*12*100|1%|]{/c} of your Maximum Life {c_number}([Max(1,PlayerHealthMax()*(0.005*Table(34,sLevel)*12))|0|]){/c} over the duration.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Macabre",
        "Blood",
        "Damage",
        "Immunity"
      ],
      "modifiers": [
          {
          "name": "Devouring Mist",
            tags: ["Skill_Darkness", "Damage_Override_Shadow", "Skill_Shadow", "Keyword_S02_VampCurse", "Search_Shadow"],
            description: "{c_important}Blood Mist{/c} becomes a {c_important}Darkness{/c} Skill that deals Shadow damage.\\n\\n{c_important}Blood Mist{/c} now deals {c_number}[{dot:tooltip_dot_shadow}|2?|]{/c} Shadow damage over its duration and applies {c_important}{u}Vampiric Curse{/c}{/u} to enemies.",
          "maxRank": 1
        },
          {
          "name": "Blood Rush",
            tags: ["Skill_Mobility", "Keyword_Unstoppable"],
            description: "{c_important}Blood Mist{/c} becomes a {c_important}Mobility{/c} Skill and its Cooldown is reduced to {c_number}8{/c} seconds.\\n\\nInstead of dispersing you into a bloody mist, {c_important}Blood Mist{/c} consumes a nearby corpse to teleport you to the target location and grants {c_important}{u}Unstoppable{/c}{/u} for {c_number}[3*Table(37,sLevel)|1|]{/c} seconds.",
          "maxRank": 1
        },
          {
          "name": "Blood Transfusion",
            tags: ["Keyword_Blood_Orb", "Keyword_Fortify"],
            description: "{c_important}Blood Mist{/c} {c_important}{u}Fortifies{/c}{/u} you for {c_number}30%{/c} of your Maximum Life {c_number}([Max(1,PlayerHealthMax()*0.30000000000000004)|0|]){/c} over its duration and forms a {c_important}{u}Blood Orb{/u}{/c} every second.",
          "maxRank": 1
        },
          {
          "name": "Overpower",
          "maxRank": 1
        },
          {
          "name": "Vulnerable and Slow",
            description: "{c_important}Blood Mist{/c} makes enemies {c_important}{u}Vulnerable{/c}{/u} and Slows them by {c_number}70%{/c} for {c_number}4{/c} seconds.",
          "maxRank": 1
        },
          {
          "name": "Critical Strike",
            tags: ["Search_Critical"],
            description: "{c_important}Blood Mist{/c} grants {c_number}5%{c_lightgray}\\[+\\]{/c}{/c} Critical Strike Chance for {c_number}5{/c} seconds after it ends.",
          "maxRank": 1
        },
          {
          "name": "Movement Speed",
            description: "{c_important}Blood Mist{/c} increases your Movement Speed by {c_number}30%{c_lightgray}\\[x\\]{/c}{/c} for {c_number}3{/c} seconds.",
          "maxRank": 1
        }
        ]
    },
    {
      "name": "Bone Prison",
        tags: ["Skill_Bone", "Necro_Skill_BonePrison", "Skill_Primary_Macabre"],
        baseDamageScalar: 0,
        description: "{c_label}Cooldown:{/c_label} {c_resource}[{cooldown time}|2?|]{/c_resource} seconds\\n{if:Mod(2686060762)}{c_label}Generate Essence:{/c_label} {c_resource}50{/c_resource}\\n{/if}Unearth a prison of bone with {c_number}[{pet_health:bonewall}|2?|]{/c} Life that surrounds the target area for {c_number}[{buffduration:wall_tracker}|2?|]{/c} seconds.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Macabre",
        "Bone",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Life Imprisonment",
            tags: ["Skill_Blood", "Search_ResourceEssence", "Search_AttackSpeed", "Damage_Override_Physical"],
            description: "{c_important}Bone Prison{/c} becomes a {c_important}Blood{/c} Skill, casting the prison around you. \\n\\nWhile standing within it your Essence Generation and Cast Speed are increased by {c_number}[0.2*Table(34,sLevel)*100|%|]{/c}, but it drains {c_number}5%{/c} of your Maximum Life every second.",
          "maxRank": 1
        },
        {
          "name": "Plunging Darkness",
            tags: ["Skill_Shadow", "Damage_Override_Shadow", "Search_ShadowDOT", "Search_Shadow", "Subpower_DesecratedGround"],
            description: "{c_important}Bone Prison{/c} becomes a {c_important}Darkness{/c} Skill.\\n\\n{c_important}Bone Prison{/c} forms a Corpse every second and spawns a pool of {c_important}{u}Desecrated Ground{/c}{/u}, dealing {c_number}[{dot:tooltip_dot}|2?|]{/c} Corrupting damage.",
          "maxRank": 1
        },
        {
          "name": "Bramble",
            tags: ["Search_Damage", "Search_Thorns"],
            description: "You gain {c_number}[Max((0.0007377*Pow(Level-1,3.6292)+2+(1+Round(Level*0.1))*sLevel)*Table(34,sLevel)/10,1)|2?|]{/c} Thorns for each enemy trapped by {c_important}Bone Prison{/c}.\\n\\nWhen a segment of {c_important}Bone Prison{/c} is destroyed or expires, it deals {c_number}100%{/c} of your Thorns around itself.",
          "maxRank": 1
        },
        {
          "name": "Resolve",
          "maxRank": 1
        },
        {
          "name": "Vulnerable",
          "maxRank": 1
        },
        {
          "name": "Cooldown Reduction",
            description: "{c_important}Army of the Dead's{/c} Cooldown is reduced by {c_number}20{/c} seconds.",
          "maxRank": 1
        },
        {
          "name": "Essence Generation",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Bone Spirit",
        tags: ["Skill_Bone", "Necro_Skill_BoneSpirit", "Skill_Primary_Macabre"],
        baseDamageScalar: 1.5,
        resourceCost: 0,
        description: "{if:1-Mod(2686060762)}{c_label}Charges:{/c} {c_resource}[2+(Mod(2686060761)?1:0)|2?|]{/c}\\n{c_label}Charge Cooldown:{/c_label} {c_resource}[{recharge time}|2?|]{/c} seconds\\n{/if}{if:Mod(2686060762)}{c_label}Essence Cost:{/c} {c_resource}[{resource cost}|2?|]{/c}\\n{/if}{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}Conjure a spirit of bone that seeks enemies and explodes, dealing {c_number}[{payload:damage}|2?|]{/c} damage.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Macabre",
        "Bone",
        "Damage"
      ],
      "modifiers": [
          {
          "name": "Poltergeists",
            description: "When {c_important}Bone Spirit{/c} explodes, it spawns {c_number}3{/c} smaller spirits that seek enemies and explode for {c_number}[{payload:damage_variant_a}|2?|]{/c} damage each.",
          "maxRank": 1
        },
          {
          "name": "Unfinished Business",
            tags: ["Skill_Shadow", "Damage_Override_Shadow", "Search_Shadow", "Search_ShadowDOT", "Subpower_DesecratedGround"],
            description: "{c_important}Bone Spirit{/c} becomes a {c_important}Darkness{/c} Skill that deals Shadow damage.\\n\\n{c_important}Bone Spirit{/c} leaves behind a pool of {c_important}{u}Desecrated Ground{/c}{/u} when it explodes, dealing {c_number}[{dot:tooltip_dot}|2?|]{/c} Corrupting damage.",
          "maxRank": 1
        },
          {
          "name": "Astral Projection",
            tags: ["Search_Damage"],
            description: "{c_important}Bone Spirit{/c} no longer seeks enemies and instead spirals around you, piercing through enemies and exploding for {c_number}[{payload:damage_variant_c}|2?|]{/c} damage when it hits them.",
          "maxRank": 1
        },
          {
          "name": "Charges",
            description: "{c_important}Bone Spirit{/c} gains {c_number}1{/c} additional Charge and its Charge Cooldown is reduced by {c_number}2{/c} seconds.",
          "maxRank": 1
        },
          {
          "name": "Core Skill",
            tags: ["Search_ResourceEssence", "Search_Damage", "Skill_Primary_Core", "Search_Copy_Core"],
            description: "{c_important}Bone Spirit{/c} becomes a {c_important}Core{/c} Skill, costs {c_number}30{/c} Essence, and no longer has a Cooldown.\\n\\n{c_important}Bone Spirit{/c} will consume all of your remaining Essence on cast, dealing {c_number}3%{c_lightgray}\\[x\\]{/c}{/c} increased damage for each point of Essence consumed.",
          "maxRank": 1
        },
          {
          "name": "Damage Bonus",
          "maxRank": 1
        },
          {
          "name": "Maximum Essence",
            description: "Each enemy hit by {c_important}Bone Spirit{/c} increases your Maximum Essence by {c_number}2{/c} for {c_number}15{/c} seconds, up to {c_number}20{/c} Essence.",
          "maxRank": 1
        }
        ]
    },
    {
      "name": "Golem",
        tags: ["Keyword_Unstoppable", "Skill_Primary_Summoning", "Skill_Primary_Macabre", "Skill_Primary_Minion"],
        baseDamageScalar: 1.25,
        description: "{if:NecroArmy_Spec_For_Pet_Type(2)==0}{c_label}Cooldown:{/c_label} {c_resource}[{cooldown time}|2?|]{/c_resource} seconds\\n{/if}{if:NecroArmy_Spec_For_Pet_Type(2)==1}{c_label}Cooldown:{/c_label} {c_resource}[{cooldown time}|2?|]{/c_resource} seconds\\n{/if}{if:NecroArmy_Spec_For_Pet_Type(2)==2}{c_label}Cooldown:{/c_label} {c_resource}[{cooldown time}|2?|]{/c_resource} seconds\\n{/if}{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}{c_label}Passive:{/c} Raise a Golem that attacks for {c_number}[{payload:tooltip_melee}|2?|]{/c} damage. When your Golem dies, it respawns after {c_number}10{/c} seconds.\\n\\n{if:NecroArmy_Spec_For_Pet_Type(2)==0}{c_label}Active:{/c} Command your Golem to leap to the target area. It becomes {c_important}{u}Unstoppable{/u}{/c}, Taunts Nearby enemies, and takes {c_number}30%{/c} reduced damage for the next {c_number}6{/c} seconds. It gains {c_number}50%{/c} of its Armor as Thorns for the duration.{/if}{if:NecroArmy_Spec_For_Pet_Type(2)==1}{c_label}Active:{/c} Command your Golem to leap to the target area. It becomes {c_important}{u}Unstoppable{/u}{/c} and drains the blood of enemies, dealing {c_number}[{payload:tooltip_blood_active}|2?|]{/c} damage and healing {c_number}[(1-Pow(0.95,Table(34,sLevel)))*100|%|]{/c} of its Life for each enemy drained. Healing received is tripled and damage is increased by {c_number}300%{c_lightgray}\\[x\\]{/c}{/c} if only one enemy is drained.{/if}{if:NecroArmy_Spec_For_Pet_Type(2)==2}{c_label}Active:{/c} Command your Golem to leap to the target area. It becomes {c_important}{u}Unstoppable{/u}{/c} and slams its fists into the ground, dealing {c_number}[{payload:tooltip_slam}|2?|]{/c} damage and Stunning surrounding enemies for {c_number}3{/c} seconds.{/if}",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Macabre",
        "Minion",
        "Summoning",
        "Golem",
        "Damage"
      ],
      "modifiers": [
          {
          "name": "Gargantua",
            description: "{c_important}Golem{/c} now raises a larger {c_important}Golem{/c} that gains an aura of command, increasing the Cast Speed and Movement Speed of your other {c_important}Minions{/c} by {c_number}[0.2*Table(34,sLevel)*100|%x|]{/c}.",
          "maxRank": 1
        },
          {
          "name": "Fel Gluttony",
            tags: ["Search_Damage", "Search_Copy_Corpse", "Search_Cooldown"],
            description: "Commanding your {c_important}Golem{/c} causes it to erupt, dealing {c_number}[{payload:explosion_damage}|2?|]{/c} damage to surrounding enemies.\\n\\nYour {c_important}Golem{/c} passively consumes nearby Corpses every second to reduce its Cooldown by {c_number}2{/c} seconds per Corpse consumed.",
          "maxRank": 1
        },
          {
          "name": "Gravebloom",
            tags: ["Search_Damage", "Search_AttackSpeed"],
            description: "{c_important}Golem{/c} now raises {c_number}3{/c} smaller {c_important}Golems{/c} that deal {c_number}60%{/c} of normal damage and gain {c_number}30%{c_lightgray}\\[+\\]{/c}{/c} Attack Speed.",
          "maxRank": 1
        },
          {
          "name": "Weaken",
          "maxRank": 1
        },
          {
          "name": "Resolve, Overpower, or Ferocity",
            tags: ["Keyword_Guardian", "Keyword_Overpower", "Keyword_Hunter"],
            description: "Commanding your {c_important}Golem{/c} grants {c_number}3{/c} stacks of {c_important}{u}Resolve{/c}{/u}, {c_important}{u}Overpower{/c}{/u}, or {c_important}{u}Ferocity{/c}{/u} based on whether your {c_important}Golem{/c} type is Bone, Blood, or Iron respectively.",
          "maxRank": 1
        },
          {
          "name": "Damage Bonus",
          "maxRank": 1
        },
          {
          "name": "Unstoppable",
            description: "Commanding your {c_important}Golem{/c} also grants you {c_important}{u}Unstoppable{/c}{/u} for {c_number}3{/c} seconds.",
          "maxRank": 1
        }
        ]
    }
  ],
  "Corruption": [
    {
      "name": "Corpse Tendrils",
        tags: ["Skill_Corruption", "Skill_Primary_Corpse"],
        baseDamageScalar: 0.2,
        description: "{c_label}Cooldown:{/c} {c_resource}[{cooldown time}|2?|]{/c} seconds\\n{if:Mod(2686060762)}{c_label}Generate Essence:{/c_label} {c_resource}35{/c_resource}\\n{/if}{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}Burst veins out of a Corpse, Slowing enemies by {c_number}50%{/c} for {c_number}1.5{/c} seconds before Pulling them in and dealing {c_number}[{payload:damage_pull}|2?|]{/c} damage.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Corruption",
        "Corpse",
        "Damage"
      ],
      "modifiers": [
        {
          "name": "Jaws Of Death",
            description: "{c_important}Corpse Tendrils{/c} now deals {c_number}[{payload:damage_pull_variantc}|2?|]{/c} damage and no longer has a delay before Pulling in enemies.",
          "maxRank": 1
        },
        {
          "name": "Get Over Here!",
            tags: ["Keyword_Fortify"],
            description: "{c_important}Corpse Tendrils{/c} is no longer cast on a Corpse and is cast on you instead. \\n\\n{c_important}Corpse Tendrils{/c} {c_important}{u}Fortifies{/c}{/u} you for {c_number}5%{/c} of your Maximum Life {c_number}([PlayerHealthMax()*0.05||]){/c} for each enemy it damages.",
          "maxRank": 1
        },
        {
          "name": "Bitter Harvest",
            tags: ["Search_CrowdControl", "Search_Copy_Corpse"],
            description: "{c_important}Corpse Tendrils{/c} no longer consumes the Corpse. Enemies are Immobilized for {c_number}3{/c} seconds after being Pulled in.",
          "maxRank": 1
        },
        {
          "name": "Lucky Hit Chance",
          "maxRank": 1
        },
        {
          "name": "Vulnerable",
          "maxRank": 1
        },
        {
          "name": "Critical Strike Chance",
          "maxRank": 1
        },
        {
          "name": "Essence Generation",
          "maxRank": 1
        }
      ]
    },
    {
      "name": "Decrepify",
        tags: ["Skill_Corruption", "Keyword_Weaken", "Skill_Primary_Curse"],
        baseDamageScalar: 0,
        resourceCost: 10,
        description: "{c_label}Essence Cost: {/c}{c_resource}[{resource cost}|2?|]{/c}\\nCurse the target area. Enemies afflicted by {c_important}Decrepify{/c} are {c_important}{u}Weakened{/c}{/u} and Slowed by {c_number}[0.4*Table(37,sLevel)*100|1%|]{/c} for {c_number}[{buffduration:decrepify_curse}|2?|]{/c} seconds.",
      "maxRank": 15,
      "damageType": "Shadow",
      "tags": [
        "Corruption",
        "Curse"
      ],
      "modifiers": [
          {
          "name": "Dizzying Curse",
            description: "The first time an enemy is afflicted with {c_important}Decrepify{/c} they are {c_important}{u}Dazed{/u}{/c} for {c_number}[3*Table(37,sLevel)|1|]{/c} seconds.",
          "maxRank": 1
        },
          {
          "name": "Life Tap",
            tags: ["Search_Healing", "Keyword_Blood_Orb", "Skill_Blood"],
            description: "{c_important}Decrepify{/c} is also a {c_important}Blood{/c} Skill, healing for {c_number}[0.1*Table(34,sLevel)*100|%1|]{/c} of your Maximum Life {c_number}([Max(1,PlayerHealthMax()*(0.1*Table(34,sLevel)))|0|]){/c} whenever you hit an enemy afflicted with it, up to once a second.\\n\\nEnemies that die while afflicted with {c_important}Decrepify{/c} have a {c_number}20%{/c} chance to form a {c_important}{u}Blood Orb{/c}{/u}.",
          "maxRank": 1
        },
          {
          "name": "Unholy Frenzy",
            tags: ["Search_AttackSpeed", "Search_MovementSpeed"],
            description: "Instead of afflicting enemies {c_important}Decrepify{/c} is now applied to your {c_important}Minions{/c}, granting them {c_number}[0.2*Table(34,sLevel)*100|%x|]{/c} increased Cast Speed and Movement Speed.",
          "maxRank": 1
        },
          {
          "name": "Critical Strike Chance",
          "maxRank": 1
        },
          {
          "name": "Cooldown Reduction",
          "maxRank": 1
        },
          {
          "name": "Resolve",
          "maxRank": 1
        },
          {
          "name": "Movement Speed",
          "maxRank": 1
        }
        ]
    },
    {
      "name": "Iron Maiden",
        tags: ["Skill_Corruption", "Search_Physical", "Skill_Primary_Curse"],
        baseDamageScalar: 0.3,
        resourceCost: 10,
        description: "{if:Mod(2686060761)}{c_label}Generate Essence:{/c} {c_resource}5{/c}\\n{else}{c_label}Essence Cost: {/c}{c_resource}[{resource cost}|2?|]{/c}\\n{/if}{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}Curse the target area. Enemies afflicted by {c_important}Iron Maiden{/c} take {c_number}[{payload:curse_periodic_damage}|2?|]{/c} damage every {c_number}2{/c} seconds and {c_number}[{payload:curse_damage}|2?|]{/c} damage each time they deal direct damage for {c_number}[{buffduration:ironmaiden_curse}|2?|]{/c} seconds.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Corruption",
        "Curse",
        "Damage"
      ],
      "modifiers": [
          {
          "name": "Blood Maiden",
            tags: ["Skill_Blood", "Keyword_Blood_Orb", "Search_Damage"],
            description: "{c_important}Iron Maiden{/c} is also a {c_important}Blood{/c} Skill, causing enemies damaged by it to have a {c_number}5%{/c} chance to form a {c_important}{u}Blood Orb{/c}{/u}. \\n\\nCasting {c_important}Iron Maiden{/c} picks up {c_number}4{/c} {c_important}{u}Blood Orbs{/c}{/u} in the target area and causes them to burst for {c_number}[{payload:blood_explosion}|2?|]{/c} damage.",
          "maxRank": 1
        },
          {
          "name": "Torture Artist",
            tags: ["Damage_Override_Shadow", "Skill_Shadow", "Search_CrowdControl", "Search_Shadow"],
            description: "{c_important}Iron Maiden{/c} is also a {c_important}Darkness{/c} Skill that deals Shadow damage. \\n\\nEnemies have {c_number}30%{/c} chance to be stunned for {c_number}2{/c} seconds when they take damage from {c_important}Iron Maiden{/c}.",
          "maxRank": 1
        },
          {
          "name": "Schadenfreude",
            tags: ["Search_Thorns"],
            description: "While at least {c_number}1{/c} enemy is afflicted with {c_important}Iron Maiden{/c}, you gain {c_number}[Max((0.0007377*Pow(Level-1,3.6292)+2+(1+Round(Level*0.1))*sLevel)*Table(34,sLevel),1)|2?|]{/c} Thorns.\\n\\n{c_important}Iron Maiden's{/c} damage is increased by {c_number}100%{/c} of your Thorns.",
          "maxRank": 1
        },
          {
          "name": "Ferocity and Overpower",
            tags: ["Keyword_Hunter", "Keyword_Overpower", "Search_LuckyHit"],
            description: "{c_label}Lucky Hit:{/c} Enemies hit while afflicted with {c_important}Iron Maiden{/c} have up to a {c_number}15%{/c} chance to randomly grant {c_number}1{/c} stack of {c_important}{u}Ferocity{/c}{/u} or {c_important}{u}Overpower{/c}{/u}.",
          "maxRank": 1
        },
          {
          "name": "Vulnerable",
          "maxRank": 1
        },
          {
          "name": "Execute and Fortify",
            tags: ["Keyword_Fortify", "Keyword_Execute"],
            description: "Enemies afflicted with {c_important}Iron Maiden{/c} will be {c_important}{u}Executed{/c}{/u}.\\n\\nYou are {c_important}{u}Fortified{/c}{/u} for {c_number}5%{/c} of your Maximum Life {c_number}([Max(1,{fortified:fortify})|0|]){/c} when an enemy dies while afflicted with {c_important}Iron Maiden.{/c}",
          "maxRank": 1
        },
          {
          "name": "Essence Generation",
          "maxRank": 1
        }
        ]
    }
  ],
  "Ultimate": [
    {
      "name": "Soulrift",
        tags: ["Skill_Shadow", "Search_ResourceEssence", "Search_Damage", "Search_Cooldown", "Search_Shadow", "Search_ShadowDOT", "Skill_Primary_Ultimate"],
        baseDamageScalar: 0,
        resourceCost: 0,
        description: "{c_label}Cooldown:{/c_label} {c_resource}[{cooldown time}|2?|]{/c_resource} seconds\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}{if:GetCollectiblePowerEquippedSlotIndex(2353919)>-1?1:0}{c_label}Essence Cost:{/c} {c_resource}[{resource cost}|2?|]{/c}\\nConsume surrounding enemies, dealing {c_number}[{dot:tooltip_total_damage}|2?|]{/c} Corrupting damage over {c_number}[{buffduration:caster_skill_active}|2?|]{/c} seconds.\\n\\nEvery {c_number}0.25{/c} seconds of this duration, you absorb the souls of up to {c_number}3{/c} enemies, dealing {c_number}[{payload:soul_damage_core}|2?|]{/c} damage to them. You absorb {c_number}3{/c} souls at a time from Bosses.\\n\\n {c_important}Soulrifts{/c} stacks up to {c_number}10{/c} times.{else}Consume surrounding enemies, dealing {c_number}[{dot:tooltip_total_damage}|2?|]{/c} Corrupting damage over {c_number}[{buffduration:caster_skill_active}|2?|]{/c} seconds.\\n\\nEvery {c_number}0.25{/c} seconds you absorb the souls of {c_number}3{/c} enemies, gaining {c_number}[(GetCollectiblePowerEquippedSlotIndex(2353919)>-1?1:0)?0:2|2?|]{/c} Essence per enemy. You absorb {c_number}3{/c} souls at a time from Bosses.{/if}",
      "maxRank": 15,
      "modifiers": [
          {
            "name": "Distilled Anima",
            tags: ["Keyword_Unhindered", "Search_MovementSpeed"],
            description: "While {c_important}Soulrift{/c} is active you are {c_important}{u}Unhindered{/u}{/c} and gain {c_number}1%{c_lightgray}\\[+\\]{/c}{/c} increased Movement Speed for every soul absorbed, up to {c_number}40%{c_lightgray}\\[+\\]{/c}{/c}.\\n\\nThis bonus persists for {c_number}5{/c} seconds after {c_important}Soulrift{/c} ends.",
            "maxRank": 1
          },
          {
          "name": "Soul Vortex",
            tags: ["Search_Damage", "Search_CrowdControl"],
            description: "{c_important}Soulrift{/c} is cast at the target location. Absorbing an enemy's soul deals {c_number}[{payload:soul_absorb_damage}|2?|]{/c} damage and Pulls them in.",
          "maxRank": 1
        },
          {
          "name": "Frozen Wasteland",
            tags: ["Damage_Override_Cold", "Search_Damage", "Keyword_Chill", "Keyword_Freeze", "Search_Cold"],
            description: "{c_important}Soulrift{/c} deals Frostbite damage and {c_important}{u}Chills{/c}{/u} for {c_number}30%{/c} every second. \\n\\nIf {c_important}Soulrift{/c} absorbs the soul of a {c_important}{u}Frozen{/c}{/u} enemy, they shatter and explode for {c_number}[{payload:frozen_damage}|2?|]{/c} damage.",
          "maxRank": 1
        },
          {
            "name": "Damage Bonus",
            "maxRank": 1
          },
          {
            "name": "Barrier",
            "maxRank": 1
          },
          {
            "name": "Vulnerable and Crowd Control",
            tags: ["Keyword_Vulnerable", "Search_CrowdControl"],
            description: "When {c_important}Soulrift{/c} absorbs an enemy's soul it makes them {c_important}{u}Vulnerable{/u}{/c} for {c_number}4{/c} seconds. \\n\\nAfter {c_important}Soulrift{/c} ends, all surrounding enemies are Feared and Slowed by {c_number}85%{/c} for {c_number}5{/c} seconds.",
            "maxRank": 1
          },
          {
            "name": "Ferocity",
            "maxRank": 1
          }
        ],
      "damageType": "Shadow",
      "tags": [
        "Ultimate",
        "Darkness",
        "Damage"
      ]
    },
    {
      "name": "Bone Storm",
        tags: ["Skill_Bone", "Skill_Primary_Ultimate"],
        resourceCost: 0,
        description: "{c_label}Cooldown:{/c} {c_resource}[{cooldown time}|2?|]{/c} seconds\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}40%{/c}\\n{/if}{if:GetCollectiblePowerEquippedSlotIndex(2353919)>-1?1:0}{c_label}Essence Cost:{/c} {c_resource}[{resource cost}|2?|]{/c}\\nA swirling storm of bones appears at a target location and around your Golem, dealing {c_number}{if:AffixIsEquipped(616076)}[{payload:tooltip_damage_shadow}|2?|]{else}[{payload:tooltip_damage}|2?|]{/if}{/c} damage to surrounding enemies over {c_number}[{buffduration:bonestorm}|2?|]{/c} seconds.{/if}{if:(GetCollectiblePowerEquippedSlotIndex(2353919)>-1?1:0)?0:1}A swirling storm of bones appears around you and your Golem, dealing {c_number}{if:AffixIsEquipped(616076)}[{payload:tooltip_damage_shadow}|2?|]{else}[{payload:tooltip_damage}|2?|]{/if}{/c} damage to surrounding enemies over {c_number}[{buffduration:bonestorm}|2?|]{/c} seconds.{/if}",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Ultimate",
        "Bone",
        "Damage"
      ],
      "modifiers": [
          {
          "name": "Roll The Bones",
            description: "{c_important}Bone Storm{/c} increases your Critical Strike Chance and Cast Speed by {c_number}[0.15*Table(34,sLevel)*100|+%|]{/c}.",
          "maxRank": 1
        },
          {
          "name": "Shadow And Bone",
            tags: ["Search_Damage", "Damage_Override_Shadow", "Skill_Shadow", "Search_ShadowDOT", "Search_Shadow"],
            description: "{c_important}Bone Storm{/c} becomes a {c_important}Darkness{/c} Skill that deals Shadow damage.\\n\\nEnemies damaged by it suffer an additional {c_number}[{payload:tooltip_dot_damage}|2?|]{/c} Corrupting damage over {c_number}2{/c} seconds.",
          "maxRank": 1
        },
          {
          "name": "Hungry Cyclone",
            description: "{c_important}Bone Storm{/c} is cast at the target location and seeks enemies. Its Cooldown is reduced by {c_number}[20*Table(37,sLevel)||]{/c} seconds.",
          "maxRank": 1
        },
          {
          "name": "Damage Reduction",
            description: "Casting {c_important}Blood Wave{/c} grants {c_number}10%{/c} Damage Reduction for {c_number}[{buffduration:buff_damage_reduction}|2?|]{/c} seconds.",
          "maxRank": 1
        },
          {
          "name": "Duration Increase",
            tags: ["Search_Copy_Corpse"],
            description: "{c_important}Bone Storm{/c} consumes up to {c_number}4{/c} corpses to increase its duration by {c_number}2{/c} seconds per corpse.",
          "maxRank": 1
        },
          {
          "name": "Vulnerable",
          "maxRank": 1
        },
          {
          "name": "Barrier",
          "maxRank": 1
        }
        ]
    },
    {
      "name": "Army of the Dead",
        tags: ["Skill_Primary_Summoning", "Search_CrowdControl", "Skill_Primary_Ultimate"],
        resourceCost: 0,
        description: "{c_label}Cooldown:{/c_label} {c_resource}[{cooldown time}|2?|]{/c_resource} seconds\\n{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[(1-Pow(0.9299999999999999,((GetCollectiblePowerEquippedSlotIndex(2353919)>-1?1:0)?2:7)*2))*100|%|]{/c}\\n{/if}{if:GetCollectiblePowerEquippedSlotIndex(2353919)>-1?1:0}{c_label}Essence Cost:{/c} {c_resource}[{resource cost}|2?|]{/c}\\nCall forth the deep buried dead. Volatile Skeletons rapidly emerge over the next {c_number}[{buffduration:raise_army}|2?|]{/c} seconds that explode when around enemies, dealing {c_number}[{payload:explosion_damage}|2?|]{/c} damage.{else}Call forth the deep buried dead. {c_important}Volatile Skeletons{/c} emerge over the next {c_number}[{buffduration:raise_army}|2?|]{/c} seconds that explode when around enemies, dealing {c_number}[{payload:explosion_damage}|2?|]{/c} damage and Stunning them for {c_number}[{buffduration:volatine_stun}|2?|]{/c} seconds.{/if}",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Ultimate",
        "Summoning",
        "Damage"
      ],
      "modifiers": [
          {
          "name": "Dead Cold",
            description: "{c_important}Army of the Dead{/c} now deals {c_number}[{payload:explosion_damage_cold}|2?|]{/c} Cold damage and {c_important}{u}Freezes{/c}{/u} enemies instead of Stunning them.",
          "maxRank": 1
        },
          {
          "name": "Pile the Bodies",
            tags: ["Search_Damage"],
            description: "{c_important}Army of the Dead{/c} will converge on your target. Each time a {c_important}Volatile Skeleton{/c} explodes on an enemy, they take {c_number}10%{c_lightgray}\\[x\\]{/c}{/c} increased damage from your {c_important}Army of the Dead{/c}, up to {c_number}300%{c_lightgray}\\[x\\]{/c}{/c}.",
          "maxRank": 1
        },
          {
          "name": "Unyielding Commander",
            tags: ["Search_Damage", "Search_DamageReduction"],
            description: "While {c_important}Army of the Dead{/c} is active, your {c_important}Minions{/c} take {c_number}90%{/c} reduced damage and you deal {c_number}50%{c_lightgray}\\[x\\]{/c}{/c} increased Summon Damage.",
          "maxRank": 1
        },
          {
          "name": "Corpse Generation",
          "maxRank": 1
        },
          {
          "name": "Passive Bonus",
            tags: ["Search_Minion"],
            description: "{c_important}Army of the Dead{/c} passively summons a {c_important}Volatile Skeleton{/c} every {c_number}4{/c} seconds.",
          "maxRank": 1
        },
          {
          "name": "Damage Bonus",
          "maxRank": 1
        },
          {
          "name": "Cooldown Reduction",
          "maxRank": 1
        }
        ]
    },
    {
      "name": "Blood Wave",
        tags: ["Skill_Blood", "Necro_Skill_BloodWave", "Skill_Primary_Ultimate"],
        baseDamageScalar: 3,
        resourceCost: 0,
        description: "{if:Mod(582507896)>0?0:1}{c_label}Cooldown:{/c_label} {c_resource}[{cooldown time}|2?|]{/c_resource} seconds\\n{/if}{if:Mod(582507896)}{c_label}Essence Cost:{/c} {c_resource}[{resource cost}|2?|]{/c}\\n{/if}{if:ADVANCED_TOOLTIP}{c_label}Lucky Hit Chance: {/c}{c_resource}[{combat effect chance}|%|]{/c}\\n{/if}Conjure a {if:Mod(582507896)>0?0:1}tidal{else}short{/if} wave of blood that deals {c_number}{if:AffixIsEquipped(616076)}[{payload:damage_shadow}|2?|]{else}[{payload:damage}|2?|]{/if}{/c} damage{if:Mod(582507896)>0?0:1} and Knocks Back enemies{/if}.",
      "maxRank": 15,
      "damageType": "Physical",
      "tags": [
        "Ultimate",
        "Blood",
        "Damage"
      ],
      "modifiers": [
          {
          "name": "Hematolagnia",
            tags: ["Skill_Primary_Core"],
            description: "{c_important}Blood Wave{/c} becomes a {c_important}Core{/c} Skill, has no Cooldown, but costs {c_number}50{/c} Essence.\\n\\n{c_important}Blood Wave{/c} conjures a shorter wave that deals {c_number}[{payload:damage_core}|2?|]{/c} damage and no longer Knocks Back enemies.",
          "maxRank": 1
        },
          {
          "name": "Path of Darkness",
            tags: ["Skill_Shadow", "Damage_Override_Shadow", "Search_Shadow", "Search_ShadowDOT", "Subpower_DesecratedGround"],
            description: "{c_important}Blood Wave{/c} becomes a {c_important}Darkness{/c} Skill that deals Shadow damage.\\n\\n{c_important}Blood Wave{/c} leaves behind a trail of {c_important}{u}Desecrated Ground{/c}{/u} as it travels that deals {c_number}[{dot:tooltip_dot}|2?|]{/c} Corrupting damage.",
          "maxRank": 1
        },
          {
          "name": "Tides of Blood",
        tags: ["Keyword_Healthy", "Keyword_Overpower"],
            description: "{c_important}Blood Wave{/c} launches {c_number}1{/c} additional wave, dealing {c_number}[{payload:damage_echo}|2?|]{/c} damage.",
        description: "Your {c_important}Blood{/c} Skills deal {c_number}[0.05*sLevel*100|%x|]{/c} increased {c_important}{u}Overpower{/u}{/c} damage. This bonus is doubled while you are {c_important}{u}Healthy{/u}{/c}.",
          "maxRank": 1
        },
          {
          "name": "Overpower",
          "maxRank": 1
        },
          {
          "name": "Blood Orb",
          "maxRank": 1
        },
          {
          "name": "Damage Reduction",
          "maxRank": 1
        },
          {
          "name": "Damage Bonus",
          "maxRank": 1
        }
        ]
    }
  ]
};
