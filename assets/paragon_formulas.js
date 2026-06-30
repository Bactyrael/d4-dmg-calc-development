window.D4_PARAGON_FORMULAS = {
  "attributeFormulas": {
    "BinaryCostScalar_IsTorment": [
      {
        "power": 1,
        "formula": "CurrentWorldTier()>3?1:0"
      }
    ],
    "S08_Druid_Unique_Armor_Flat": [
      {
        "power": 0,
        "formula": "20+Round(0.1490566037735849*(IPower()-10))+FloatRandomRangeWithInterval(10,1,5)"
      },
      {
        "power": 590,
        "formula": "300+Round(0.2833333333333333*(IPower()-590))+FloatRandomRangeWithInterval(10,1,10)"
      },
      {
        "power": 750,
        "formula": "450+FloatRandomRangeWithInterval(10,1,10)"
      },
      {
        "power": 800,
        "formula": "675+FloatRandomRangeWithInterval(10,1,10)"
      }
    ],
    "S04_AffixResistance_Single_Flat": [
      {
        "power": 0,
        "formula": "5+Round(0.20754716981132076*(IPower()-10))+FloatRandomRangeWithInterval(10,1,10)"
      },
      {
        "power": 590,
        "formula": "200+Round(0.16666666666666666*(IPower()-590))+FloatRandomRangeWithInterval(25,1,25)"
      },
      {
        "power": 750,
        "formula": "320+FloatRandomRangeWithInterval(30,1,30)"
      },
      {
        "power": 800,
        "formula": "440+FloatRandomRangeWithInterval(50,1,50)"
      }
    ],
    "S11_Sanctify_AdditionalQuality_Lesser": [
      {
        "power": 0,
        "formula": "RandomInt(1,10)"
      }
    ],
    "S11_Sanctify_AdditionalQuality": [
      {
        "power": 0,
        "formula": "RandomInt(1,15)"
      }
    ],
    "S11_AffixResistance_Single_Flat_Inherent": [
      {
        "power": 0,
        "formula": "25"
      },
      {
        "power": 590,
        "formula": "300"
      },
      {
        "power": 750,
        "formula": "450"
      },
      {
        "power": 800,
        "formula": "600"
      }
    ],
    "S11_AffixResistance_Single_Flat_Higher": [
      {
        "power": 0,
        "formula": "25+Round(0.20754716981132076*(IPower()-10))+FloatRandomRangeWithInterval(10,1,10)"
      },
      {
        "power": 590,
        "formula": "300+Round(0.16666666666666666*(IPower()-590))+FloatRandomRangeWithInterval(25,1,25)"
      },
      {
        "power": 750,
        "formula": "420+FloatRandomRangeWithInterval(30,1,30)"
      },
      {
        "power": 800,
        "formula": "549+FloatRandomRangeWithInterval(51,1,51)"
      }
    ],
    "S04_AffixResistance_Flat": [
      {
        "power": 0,
        "formula": "5+Round(0.018867924528301886*(IPower()-10))+FloatRandomRangeWithInterval(10,1,5)"
      },
      {
        "power": 590,
        "formula": "20+Round(0.08333333333333333*(IPower()-590))+FloatRandomRangeWithInterval(10,1,5)"
      },
      {
        "power": 750,
        "formula": "40+FloatRandomRangeWithInterval(10,1,10)"
      },
      {
        "power": 800,
        "formula": "55+FloatRandomRangeWithInterval(15,1,15)"
      }
    ],
    "S11_AffixResistance_Flat_Higher": [
      {
        "power": 0,
        "formula": "10+Round(0.018867924528301886*(IPower()-10))+FloatRandomRangeWithInterval(10,1,5)"
      },
      {
        "power": 590,
        "formula": "25+Round(0.08333333333333333*(IPower()-590))+FloatRandomRangeWithInterval(10,1,5)"
      },
      {
        "power": 750,
        "formula": "45+FloatRandomRangeWithInterval(10,1,10)"
      },
      {
        "power": 800,
        "formula": "65+FloatRandomRangeWithInterval(15,1,15)"
      }
    ],
    "TemperedAffix_Resistance_All_Flat_Tier3": [
      {
        "power": 0,
        "formula": "RandomInt(60,70)"
      }
    ],
    "TemperedAffix_Resistance_Single_Flat_Tier3": [
      {
        "power": 0,
        "formula": "RandomInt(440,490)"
      }
    ],
    "TemperedAffix_Life_Flat_Tier3": [
      {
        "power": 0,
        "formula": "RandomInt(1000,1500)"
      }
    ],
    "TemperedAffix_Armor_Flat_Tier3": [
      {
        "power": 0,
        "formula": "RandomInt(1250,2000)"
      }
    ],
    "TemperedAffix_Resistance_All_Flat_Tier2": [
      {
        "power": 0,
        "formula": "RandomInt(30,40)"
      }
    ],
    "TemperedAffix_Resistance_Single_Flat_Tier2": [
      {
        "power": 0,
        "formula": "RandomInt(240,280)"
      }
    ],
    "TemperedAffix_Life_Flat_Tier2": [
      {
        "power": 0,
        "formula": "RandomInt(400,500)"
      }
    ],
    "TemperedAffix_Armor_Flat_Tier2": [
      {
        "power": 0,
        "formula": "RandomInt(600,900)"
      }
    ],
    "GearAffix_Armor_Greater": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(183,183,366)"
      },
      {
        "power": 200,
        "formula": "FloatRandomRangeWithInterval(183,367,550)"
      },
      {
        "power": 300,
        "formula": "FloatRandomRangeWithInterval(46,551,734)"
      },
      {
        "power": 400,
        "formula": "FloatRandomRangeWithInterval(51,735,917)"
      },
      {
        "power": 500,
        "formula": "FloatRandomRangeWithInterval(183,918,1101)"
      },
      {
        "power": 540,
        "formula": "FloatRandomRangeWithInterval(119,1102,1221)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(155,1222,1377)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(182,1378,1560)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(401,1561,1962)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(487,1963,2450)"
      }
    ],
    "GearAffix_Armor": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(91,91,182)"
      },
      {
        "power": 200,
        "formula": "FloatRandomRangeWithInterval(91,183,274)"
      },
      {
        "power": 300,
        "formula": "FloatRandomRangeWithInterval(91,275,366)"
      },
      {
        "power": 400,
        "formula": "FloatRandomRangeWithInterval(91,367,458)"
      },
      {
        "power": 500,
        "formula": "FloatRandomRangeWithInterval(91,459,550)"
      },
      {
        "power": 540,
        "formula": "FloatRandomRangeWithInterval(59,551,610)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(77,611,688)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(90,689,779)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(200,780,980)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(244,981,1225)"
      }
    ],
    "GearAffix_AttackSpeed": [
      {
        "power": 0,
        "formula": "(1.9+0.1*FloatRandomRangeWithInterval(31,1,31))/100"
      },
      {
        "power": 590,
        "formula": "(4.9+0.1*FloatRandomRangeWithInterval(31,1,31))/100"
      },
      {
        "power": 860,
        "formula": "(7.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      }
    ],
    "GearAffix_CC_Duration_Reduction": [
      {
        "power": 0,
        "formula": "(2.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 590,
        "formula": "(4.9+0.1*FloatRandomRangeWithInterval(31,1,31))/100"
      },
      {
        "power": 860,
        "formula": "(7.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      }
    ],
    "GearAffix_CooldownReductionCDR": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,3,4)/100"
      },
      {
        "power": 360,
        "formula": "FloatRandomRangeWithInterval(2,4,5)/100"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(6,5,8)/100"
      }
    ],
    "GearAffix_CoreStat": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(6,1,7)"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,7,9)"
      },
      {
        "power": 210,
        "formula": "FloatRandomRangeWithInterval(2,10,12)"
      },
      {
        "power": 270,
        "formula": "FloatRandomRangeWithInterval(3,13,15)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(3,16,19)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(4,20,24)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(5,20,30)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(7,31,37)"
      },
      {
        "power": 620,
        "formula": "FloatRandomRangeWithInterval(8,38,46)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(9,47,56)"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(11,57,68)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(14,69,83)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(16,83,99)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(21,100,121)"
      }
    ],
    "GearAffix_CoreStat_Greater": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(3,11,14)"
      },
      {
        "power": 210,
        "formula": "FloatRandomRangeWithInterval(3,15,18)"
      },
      {
        "power": 270,
        "formula": "FloatRandomRangeWithInterval(4,19,23)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(5,24,29)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(6,30,36)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(8,37,45)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(10,46,56)"
      },
      {
        "power": 620,
        "formula": "FloatRandomRangeWithInterval(12,57,69)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(14,70,84)"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(17,85,102)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(17,103,124)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(24,125,149)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(30,150,180)"
      }
    ],
    "GearAffix_CoreStat_All": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,1,10)"
      },
      {
        "power": 300,
        "formula": "9+FloatRandomRangeWithInterval(11,1,11)"
      },
      {
        "power": 590,
        "formula": "24+FloatRandomRangeWithInterval(16,1,16)"
      },
      {
        "power": 760,
        "formula": "44+FloatRandomRangeWithInterval(26,1,26)"
      },
      {
        "power": 860,
        "formula": "74+FloatRandomRangeWithInterval(26,1,26)"
      }
    ],
    "GearAffix_CritChance": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,0.5,1)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(1,1,1.5)/100"
      },
      {
        "power": 350,
        "formula": "FloatRandomRangeWithInterval(1,1.5,2)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(1,2,2.5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(1,2.5,3)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(1,3,3.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,3.5,5)/100"
      }
    ],
    "GearAffix_CritChance_Greater": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,0.5,1.5)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,1.5,2.5)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,2.5,3.5)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,3.5,4.5)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,4.5,5.5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(2,5.5,6.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,6.5,8.5)/100"
      }
    ],
    "GearAffix_CritDamage": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,5,6)/100"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(1,6,7)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,7,8)/100"
      },
      {
        "power": 470,
        "formula": "FloatRandomRangeWithInterval(1,8,10)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(7,10,11)/100"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(2,11,13)/100"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(12,13,25)/100"
      }
    ],
    "GearAffix_CritDamage_Greater": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,10,12)/100"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(1,13,14)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(1,15,16)/100"
      },
      {
        "power": 470,
        "formula": "FloatRandomRangeWithInterval(2,17,19)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,20,22)/100"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(2,23,25)/100"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(24,26,50)/100"
      }
    ],
    "GearAffix_Damage_All": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,3,4)/100"
      },
      {
        "power": 140,
        "formula": "FloatRandomRangeWithInterval(2,3,5)/100"
      },
      {
        "power": 350,
        "formula": "FloatRandomRangeWithInterval(3,3,6)/100"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(3,4,7)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(3,5,8)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(4,6,10)/100"
      }
    ],
    "GearAffix_Damage_All_Greater": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,6,8)/100"
      },
      {
        "power": 140,
        "formula": "FloatRandomRangeWithInterval(4,6,10)/100"
      },
      {
        "power": 350,
        "formula": "FloatRandomRangeWithInterval(6,6,12)/100"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(6,8,14)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(6,10,16)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(8,12,20)/100"
      }
    ],
    "GearAffix_Damage_Category_Basics": [
      {
        "power": 0,
        "formula": "(4.5+0.5*FloatRandomRangeWithInterval(41,1,41))/100"
      },
      {
        "power": 590,
        "formula": "(24.5+0.5*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 760,
        "formula": "(34.5+0.5*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 860,
        "formula": "(44.5+0.5*FloatRandomRangeWithInterval(31,1,31))/100"
      }
    ],
    "GearAffix_Damage_Category_CoreSpenders": [
      {
        "power": 0,
        "formula": "(9.5+0.5*FloatRandomRangeWithInterval(31,1,31))/100"
      },
      {
        "power": 590,
        "formula": "(24.5+0.5*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 760,
        "formula": "(34.5+0.5*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 860,
        "formula": "(44.5+0.5*FloatRandomRangeWithInterval(31,1,31))/100"
      }
    ],
    "GearAffix_Damage_DoT": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(3,6,9)/100"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(2,7,9)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(1,8,9)/100"
      },
      {
        "power": 470,
        "formula": "FloatRandomRangeWithInterval(2,9,11)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(1,11,12)/100"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(2,12,15)/100"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(15,15,30)/100"
      }
    ],
    "GearAffix_Damage_DoT_Greater": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,12,14)/100"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(1,15,16)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(1,17,18)/100"
      },
      {
        "power": 470,
        "formula": "FloatRandomRangeWithInterval(2,19,21)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,22,24)/100"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(4,25,29)/100"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(30,30,60)/100"
      }
    ],
    "GearAffix_Damage_to_Vulnerable": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,4,6)/100"
      },
      {
        "power": 200,
        "formula": "FloatRandomRangeWithInterval(3,4,7)/100"
      },
      {
        "power": 400,
        "formula": "FloatRandomRangeWithInterval(4,4,8)/100"
      },
      {
        "power": 500,
        "formula": "FloatRandomRangeWithInterval(4,6,10)/100"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(4,7,11)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(6,8,14)/100"
      }
    ],
    "GearAffix_Damage_to_Vulnerable_Greater": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(4,8,12)/100"
      },
      {
        "power": 200,
        "formula": "FloatRandomRangeWithInterval(6,8,14)/100"
      },
      {
        "power": 400,
        "formula": "FloatRandomRangeWithInterval(8,8,16)/100"
      },
      {
        "power": 500,
        "formula": "FloatRandomRangeWithInterval(8,12,20)/100"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(8,14,22)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(12,16,28)/100"
      }
    ],
    "GearAffix_DamageReduction": [
      {
        "power": 0,
        "formula": "(0.5+0.5*FloatRandomRangeWithInterval(7,1,7))/100"
      },
      {
        "power": 590,
        "formula": "(3.5+0.5*FloatRandomRangeWithInterval(7,1,7))/100"
      },
      {
        "power": 760,
        "formula": "(6.5+0.5*FloatRandomRangeWithInterval(9,1,9))/100"
      },
      {
        "power": 860,
        "formula": "(10.5+0.5*FloatRandomRangeWithInterval(9,1,9))/100"
      }
    ],
    "GearAffix_HealingPercent": [
      {
        "power": 0,
        "formula": "(0.5+0.5*FloatRandomRangeWithInterval(7,1,7))/100"
      },
      {
        "power": 590,
        "formula": "(3.5+0.5*FloatRandomRangeWithInterval(7,1,7))/100"
      },
      {
        "power": 760,
        "formula": "(6.5+0.5*FloatRandomRangeWithInterval(9,1,9))/100"
      },
      {
        "power": 860,
        "formula": "(10.5+0.5*FloatRandomRangeWithInterval(9,1,9))/100"
      }
    ],
    "GearAffix_Life": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(3,1,4)"
      },
      {
        "power": 180,
        "formula": "FloatRandomRangeWithInterval(3,5,8)"
      },
      {
        "power": 240,
        "formula": "FloatRandomRangeWithInterval(6,9,15)"
      },
      {
        "power": 300,
        "formula": "FloatRandomRangeWithInterval(11,16,27)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(15,28,43)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(26,44,70)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(44,71,115)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(59,116,175)"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(79,176,255)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(94,256,350)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(189,351,540)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(199,541,740)"
      },
      {
        "power": 820,
        "formula": "FloatRandomRangeWithInterval(274,741,1015)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(209,1016,1225)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(224,1226,1450)"
      }
    ],
    "GearAffix_LifePerHit_2H": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,1)"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(1,2,3)"
      },
      {
        "power": 180,
        "formula": "FloatRandomRangeWithInterval(1,3,4)"
      },
      {
        "power": 210,
        "formula": "FloatRandomRangeWithInterval(1,4,5)"
      },
      {
        "power": 240,
        "formula": "FloatRandomRangeWithInterval(1,6,7)"
      },
      {
        "power": 270,
        "formula": "FloatRandomRangeWithInterval(2,8,10)"
      },
      {
        "power": 300,
        "formula": "FloatRandomRangeWithInterval(3,11,14)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(9,14,23)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(14,23,37)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(23,38,61)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(33,60,93)"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(39,96,135)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(48,138,186)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(102,189,291)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(105,294,399)"
      },
      {
        "power": 820,
        "formula": "FloatRandomRangeWithInterval(144,402,546)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(132,657,789)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(159,789,948)"
      }
    ],
    "GearAffix_LifePerHit_Greater": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,1)"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 210,
        "formula": "FloatRandomRangeWithInterval(1,3,4)"
      },
      {
        "power": 240,
        "formula": "FloatRandomRangeWithInterval(1,4,5)"
      },
      {
        "power": 270,
        "formula": "FloatRandomRangeWithInterval(2,5,7)"
      },
      {
        "power": 300,
        "formula": "FloatRandomRangeWithInterval(2,7,9)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(6,9,15)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(9,16,25)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(13,26,39)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(22,40,62)"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(26,64,90)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(32,92,124)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(68,126,194)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(70,196,266)"
      },
      {
        "power": 820,
        "formula": "FloatRandomRangeWithInterval(96,268,364)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(88,438,526)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(106,526,632)"
      }
    ],
    "GearAffix_LifePerHit": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,1)"
      },
      {
        "power": 240,
        "formula": "FloatRandomRangeWithInterval(1,2,3)"
      },
      {
        "power": 300,
        "formula": "FloatRandomRangeWithInterval(1,3,4)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(2,5,7)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(4,8,12)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(6,13,19)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(11,20,31)"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(13,32,45)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(16,46,62)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(34,63,97)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(35,98,133)"
      },
      {
        "power": 820,
        "formula": "FloatRandomRangeWithInterval(48,134,182)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(44,219,263)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(53,263,316)"
      }
    ],
    "GearAffix_LifeRegen": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,1)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(1,2,3)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,3,5)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(3,5,8)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(9,17,26)"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(11,27,38)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(13,39,52)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(28,53,81)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(29,82,111)"
      },
      {
        "power": 820,
        "formula": "FloatRandomRangeWithInterval(40,112,152)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(37,183,220)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(44,220,264)"
      }
    ],
    "GearAffix_LifeRegen_Lesser": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,1)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(1,2,3)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(3,3,5)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(7,11,18)"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(8,18,26)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(9,27,36)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(19,37,56)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(20,57,77)"
      },
      {
        "power": 820,
        "formula": "FloatRandomRangeWithInterval(28,78,106)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(25,128,153)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(31,153,184)"
      }
    ],
    "GearAffix_Luck": [
      {
        "power": 0,
        "formula": "(1.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 590,
        "formula": "(3.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 760,
        "formula": "(5.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 860,
        "formula": "(7.9+0.1*FloatRandomRangeWithInterval(11,1,11))/100"
      }
    ],
    "GearAffix_LuckJewelry": [
      {
        "power": 0,
        "formula": "(0.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 590,
        "formula": "(2.9+0.1*FloatRandomRangeWithInterval(11,1,11))/100"
      },
      {
        "power": 760,
        "formula": "(3.9+0.1*FloatRandomRangeWithInterval(11,1,11))/100"
      },
      {
        "power": 860,
        "formula": "(5.9+0.1*FloatRandomRangeWithInterval(11,1,11))/100"
      }
    ],
    "CharmAffix_Movement_Speed": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,4,6)/100"
      },
      {
        "power": 250,
        "formula": "FloatRandomRangeWithInterval(2,7,9)/100"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(3,10,13)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(3,13,16)/100"
      }
    ],
    "GearAffix_Movement_Speed": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,8,10)/100"
      },
      {
        "power": 250,
        "formula": "FloatRandomRangeWithInterval(3,11,14)/100"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(4,15,19)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(4,20,24)/100"
      }
    ],
    "GearAffix_PotionCharges": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(3,1,3)"
      },
      {
        "power": 860,
        "formula": "1+FloatRandomRangeWithInterval(2,1,2)"
      }
    ],
    "GearAffix_Resistance_All": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(25,203,228)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(30,229,259)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(66,260,326)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(65,327,392)"
      }
    ],
    "GearAffix_Resistance_Single": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,1,10)"
      },
      {
        "power": 100,
        "formula": "29+FloatRandomRangeWithInterval(21,1,21)"
      },
      {
        "power": 150,
        "formula": "54+FloatRandomRangeWithInterval(51,1,51)"
      },
      {
        "power": 250,
        "formula": "109+FloatRandomRangeWithInterval(51,1,51)"
      },
      {
        "power": 350,
        "formula": "164+FloatRandomRangeWithInterval(46,1,46)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(41,325,366)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(48,367,415)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(107,416,523)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(106,524,630)"
      }
    ],
    "GearAffix_Resource_Cost_Reduction_AllClasses": [
      {
        "power": 0,
        "formula": "(0.9+0.1*FloatRandomRangeWithInterval(11,1,11))/100"
      },
      {
        "power": 590,
        "formula": "(1.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 760,
        "formula": "(3.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 860,
        "formula": "(5.9+0.1*FloatRandomRangeWithInterval(11,1,11))/100"
      }
    ],
    "GearAffix_Resource_Cost_Reduction_AllClasses_Lesser": [
      {
        "power": 0,
        "formula": "(0.9+0.1*FloatRandomRangeWithInterval(11,1,11))/100"
      },
      {
        "power": 590,
        "formula": "(1.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 760,
        "formula": "(3.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 860,
        "formula": "(5.9+0.1*FloatRandomRangeWithInterval(11,1,11))/100"
      }
    ],
    "GearAffix_Resource_Max_AllClasses": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(5,1,5)"
      },
      {
        "power": 590,
        "formula": "4+FloatRandomRangeWithInterval(6,1,6)"
      },
      {
        "power": 760,
        "formula": "9+FloatRandomRangeWithInterval(6,1,6)"
      },
      {
        "power": 860,
        "formula": "14+FloatRandomRangeWithInterval(6,1,6)"
      }
    ],
    "GearAffix_Resource_Max_AllClasses_Jewelry": [
      {
        "power": 0,
        "formula": "(0.9+0.1*FloatRandomRangeWithInterval(11,1,11))/100"
      },
      {
        "power": 590,
        "formula": "(1.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 760,
        "formula": "(3.9+0.1*FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 860,
        "formula": "(5.9+0.1*FloatRandomRangeWithInterval(11,1,11))/100"
      }
    ],
    "GearAffix_Resource_On_Kill_Warlock": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,2)/10"
      }
    ],
    "GearAffix_Resource_On_Kill": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      }
    ],
    "GearAffix_Resource_Per_Second": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 400,
        "formula": "FloatRandomRangeWithInterval(1,2,3)"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(1,3,4)"
      }
    ],
    "GearAffix_ResourceGain": [
      {
        "power": 0,
        "formula": "(1.9+0.1*FloatRandomRangeWithInterval(31,1,31))/100"
      },
      {
        "power": 590,
        "formula": "(4.9+0.1*FloatRandomRangeWithInterval(31,1,31))/100"
      },
      {
        "power": 760,
        "formula": "(7.9+0.1*FloatRandomRangeWithInterval(31,1,31))/100"
      },
      {
        "power": 860,
        "formula": "(10.9+0.1*FloatRandomRangeWithInterval(41,1,41))/100"
      }
    ],
    "GearAffix_SkillRankBonus": [
      {
        "power": 0,
        "formula": "Round(FloatRandomRangeWithInterval(1,1,2)*GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round(FloatRandomRangeWithInterval(1,2,3)*GetTotalAffixBonus())"
      }
    ],
    "GearAffix_Thorns": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,1,10)/100"
      },
      {
        "power": 590,
        "formula": "(9+FloatRandomRangeWithInterval(16,1,16))/100"
      },
      {
        "power": 760,
        "formula": "(39+FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 860,
        "formula": "(79+FloatRandomRangeWithInterval(21,1,21))/100"
      }
    ],
    "GearAffix_Thorns_Shields": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,1,10)/100"
      },
      {
        "power": 590,
        "formula": "(9+FloatRandomRangeWithInterval(16,1,16))/100"
      },
      {
        "power": 760,
        "formula": "(39+FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 860,
        "formula": "(79+FloatRandomRangeWithInterval(21,1,21))/100"
      }
    ],
    "GearAffix_BarrierGeneration": [
      {
        "power": 0,
        "formula": "(1.5+0.5*FloatRandomRangeWithInterval(5,1,5))/100"
      },
      {
        "power": 590,
        "formula": "(3.5+0.5*FloatRandomRangeWithInterval(9,1,9))/100"
      },
      {
        "power": 760,
        "formula": "(7.5+0.5*FloatRandomRangeWithInterval(9,1,9))/100"
      },
      {
        "power": 860,
        "formula": "(11.5+0.5*FloatRandomRangeWithInterval(7,1,7))/100"
      }
    ],
    "GearAffix_FortifyGeneration": [
      {
        "power": 0,
        "formula": "(1.5+0.5*FloatRandomRangeWithInterval(5,1,5))/100"
      },
      {
        "power": 590,
        "formula": "(3.5+0.5*FloatRandomRangeWithInterval(9,1,9))/100"
      },
      {
        "power": 760,
        "formula": "(7.5+0.5*FloatRandomRangeWithInterval(9,1,9))/100"
      },
      {
        "power": 860,
        "formula": "(11.5+0.5*FloatRandomRangeWithInterval(7,1,7))/100"
      }
    ],
    "GearAffix_LifeOnKill_Warlock": [
      {
        "power": 0,
        "formula": "RandomInt(1,2)"
      },
      {
        "power": 270,
        "formula": "RandomInt(2,3)"
      },
      {
        "power": 330,
        "formula": "RandomInt(3,5)"
      },
      {
        "power": 450,
        "formula": "RandomInt(5,8)"
      },
      {
        "power": 605,
        "formula": "RandomInt(8,11)"
      },
      {
        "power": 710,
        "formula": "RandomInt(11,15)"
      },
      {
        "power": 820,
        "formula": "RandomInt(15,18)"
      },
      {
        "power": 900,
        "formula": "RandomInt(18,22)"
      }
    ],
    "GearAffix_LifeOnKill": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,1)"
      },
      {
        "power": 300,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(1,2,3)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(3,3,6)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(4,6,10)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(11,20,31)"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(13,32,45)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(16,46,62)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(34,63,97)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(35,98,133)"
      },
      {
        "power": 820,
        "formula": "FloatRandomRangeWithInterval(48,134,182)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(44,219,263)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(53,263,316)"
      }
    ],
    "GearAffix_LifeOnKill_Greater_Warlock": [
      {
        "power": 0,
        "formula": "RandomInt(2,3)"
      },
      {
        "power": 270,
        "formula": "RandomInt(3,5)"
      },
      {
        "power": 330,
        "formula": "RandomInt(5,8)"
      },
      {
        "power": 450,
        "formula": "RandomInt(8,12)"
      },
      {
        "power": 605,
        "formula": "RandomInt(12,16)"
      },
      {
        "power": 710,
        "formula": "RandomInt(16,22)"
      },
      {
        "power": 820,
        "formula": "RandomInt(22,27)"
      },
      {
        "power": 900,
        "formula": "RandomInt(27,33)"
      }
    ],
    "GearAffix_LifeOnKill_Greater": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,1)"
      },
      {
        "power": 240,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 300,
        "formula": "FloatRandomRangeWithInterval(2,2,4)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(2,4,6)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(6,6,12)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(8,12,20)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(22,40,62)"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(26,64,90)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(32,92,124)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(68,126,194)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(70,196,266)"
      },
      {
        "power": 820,
        "formula": "FloatRandomRangeWithInterval(96,268,364)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(88,438,526)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(106,526,632)"
      }
    ],
    "GearAffix_DamageType": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,3,4)/100"
      },
      {
        "power": 170,
        "formula": "FloatRandomRangeWithInterval(2,4,6)/100"
      },
      {
        "power": 370,
        "formula": "FloatRandomRangeWithInterval(3,4,7)/100"
      },
      {
        "power": 470,
        "formula": "FloatRandomRangeWithInterval(3,5,8)/100"
      },
      {
        "power": 620,
        "formula": "FloatRandomRangeWithInterval(4,6,10)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,7,10)/100"
      }
    ],
    "GearAffix_DamageType_Greater": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,6,8)/100"
      },
      {
        "power": 170,
        "formula": "FloatRandomRangeWithInterval(4,8,12)/100"
      },
      {
        "power": 370,
        "formula": "FloatRandomRangeWithInterval(6,8,14)/100"
      },
      {
        "power": 470,
        "formula": "FloatRandomRangeWithInterval(6,10,16)/100"
      },
      {
        "power": 620,
        "formula": "FloatRandomRangeWithInterval(8,12,20)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(10,14,24)/100"
      }
    ],
    "GearAffix_Evade_Attack_Reset": [
      {
        "power": 0,
        "formula": "(49+FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 590,
        "formula": "(69+FloatRandomRangeWithInterval(31,1,31))/100"
      },
      {
        "power": 760,
        "formula": "(99+FloatRandomRangeWithInterval(21,1,21))/100"
      },
      {
        "power": 860,
        "formula": "(119+FloatRandomRangeWithInterval(31,1,31))/100"
      }
    ],
    "GearAffix_Evade_Charges": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(2,1,2)"
      },
      {
        "power": 860,
        "formula": "FloatRandomRangeWithInterval(3,1,3)"
      }
    ],
    "GearAffix_Evade_MovementSpeed": [
      {
        "power": 0,
        "formula": "(49+FloatRandomRangeWithInterval(26,1,26))/100"
      },
      {
        "power": 590,
        "formula": "(74+FloatRandomRangeWithInterval(26,1,26))/100"
      },
      {
        "power": 760,
        "formula": "(99+FloatRandomRangeWithInterval(26,1,26))/100"
      },
      {
        "power": 860,
        "formula": "(124+FloatRandomRangeWithInterval(26,1,26))/100"
      }
    ],
    "GearAffix_Lucky_Hit_Resource_Flat": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 200,
        "formula": "FloatRandomRangeWithInterval(1,3,4)"
      }
    ],
    "TemperedAffix_Resistance_All_Flat_Tier1": [
      {
        "power": 0,
        "formula": "RandomInt(5,10)"
      }
    ],
    "TemperedAffix_Resistance_Single_Flat_Tier1": [
      {
        "power": 0,
        "formula": "RandomInt(40,70)"
      }
    ],
    "TemperedAffix_Life_Flat_Tier1": [
      {
        "power": 0,
        "formula": "RandomInt(90,120)"
      }
    ],
    "TemperedAffix_Armor_Flat_Tier1": [
      {
        "power": 0,
        "formula": "RandomInt(100,350)"
      }
    ],
    "S04_AffixArmor_Flat": [
      {
        "power": 0,
        "formula": "1+Round(0.1490566037735849*(IPower()-10))+FloatRandomRangeWithInterval(10,1,5)"
      },
      {
        "power": 590,
        "formula": "150+Round(0.2833333333333333*(IPower()-590))+FloatRandomRangeWithInterval(10,1,10)"
      },
      {
        "power": 750,
        "formula": "225+FloatRandomRangeWithInterval(25,1,25)"
      },
      {
        "power": 900,
        "formula": "300+FloatRandomRangeWithInterval(50,1,50)"
      }
    ],
    "CraftingScalingMatsTemperingLegendary": [
      {
        "power": 0,
        "formula": "0"
      },
      {
        "power": 350,
        "formula": "0"
      },
      {
        "power": 750,
        "formula": "1"
      },
      {
        "power": 800,
        "formula": "2"
      }
    ],
    "CraftingScalingMatsEnchantingLegendary": [
      {
        "power": 0,
        "formula": "0"
      },
      {
        "power": 350,
        "formula": "0"
      },
      {
        "power": 750,
        "formula": "1"
      },
      {
        "power": 800,
        "formula": "2"
      }
    ],
    "CraftingScalingMatsEnchantingRare": [
      {
        "power": 0,
        "formula": "2"
      },
      {
        "power": 350,
        "formula": "5"
      },
      {
        "power": 750,
        "formula": "10"
      },
      {
        "power": 800,
        "formula": "20"
      }
    ],
    "CraftingScalingMatsEnchantingCommon": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 350,
        "formula": "2"
      },
      {
        "power": 750,
        "formula": "3"
      },
      {
        "power": 800,
        "formula": "6"
      }
    ],
    "CraftingScalingGold": [
      {
        "power": 0,
        "formula": "0.1"
      },
      {
        "power": 30,
        "formula": "5"
      },
      {
        "power": 70,
        "formula": "10"
      },
      {
        "power": 110,
        "formula": "17.5"
      },
      {
        "power": 150,
        "formula": "25"
      },
      {
        "power": 190,
        "formula": "37.5"
      },
      {
        "power": 230,
        "formula": "50"
      },
      {
        "power": 270,
        "formula": "75"
      },
      {
        "power": 310,
        "formula": "100"
      },
      {
        "power": 350,
        "formula": "150"
      },
      {
        "power": 390,
        "formula": "200"
      },
      {
        "power": 430,
        "formula": "300"
      },
      {
        "power": 470,
        "formula": "400"
      },
      {
        "power": 510,
        "formula": "500"
      },
      {
        "power": 550,
        "formula": "550"
      },
      {
        "power": 590,
        "formula": "600"
      },
      {
        "power": 630,
        "formula": "650"
      },
      {
        "power": 670,
        "formula": "700"
      },
      {
        "power": 710,
        "formula": "750"
      },
      {
        "power": 750,
        "formula": "800"
      },
      {
        "power": 800,
        "formula": "1000"
      }
    ],
    "CraftingScaling_SanctifyGold": [
      {
        "power": 0,
        "formula": "0"
      },
      {
        "power": 750,
        "formula": "1"
      }
    ],
    "CraftingScalingMatsTempering": [
      {
        "power": 0,
        "formula": "2"
      },
      {
        "power": 350,
        "formula": "3"
      },
      {
        "power": 750,
        "formula": "5"
      },
      {
        "power": 800,
        "formula": "8"
      }
    ],
    "CraftingScalingMatsCOPRare": [
      {
        "power": 0,
        "formula": "3"
      },
      {
        "power": 350,
        "formula": "7"
      },
      {
        "power": 750,
        "formula": "10"
      },
      {
        "power": 800,
        "formula": "15"
      }
    ],
    "CraftingScalingMatsCOPLegendary": [
      {
        "power": 0,
        "formula": "0"
      },
      {
        "power": 350,
        "formula": "3"
      },
      {
        "power": 750,
        "formula": "5"
      },
      {
        "power": 800,
        "formula": "8"
      }
    ],
    "CraftingScalingMats": [
      {
        "power": 0,
        "formula": "0.5"
      },
      {
        "power": 70,
        "formula": "0.6"
      },
      {
        "power": 100,
        "formula": "0.7"
      },
      {
        "power": 140,
        "formula": "0.8"
      },
      {
        "power": 170,
        "formula": "0.9"
      },
      {
        "power": 210,
        "formula": "1.05"
      },
      {
        "power": 240,
        "formula": "1.25"
      },
      {
        "power": 280,
        "formula": "1.5"
      },
      {
        "power": 310,
        "formula": "1.8"
      },
      {
        "power": 350,
        "formula": "2.15"
      },
      {
        "power": 380,
        "formula": "2.6"
      },
      {
        "power": 420,
        "formula": "3.15"
      },
      {
        "power": 450,
        "formula": "3.85"
      },
      {
        "power": 490,
        "formula": "4.7"
      },
      {
        "power": 520,
        "formula": "5.7"
      },
      {
        "power": 560,
        "formula": "6.85"
      },
      {
        "power": 590,
        "formula": "8.150001"
      },
      {
        "power": 630,
        "formula": "9.650001"
      },
      {
        "power": 660,
        "formula": "11.35"
      },
      {
        "power": 750,
        "formula": "13.25"
      },
      {
        "power": 800,
        "formula": "15.35"
      }
    ],
    "CraftingScalingMatsAncestralMSWKRank1": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 800,
        "formula": "2"
      }
    ],
    "CraftingScalingMatsAncestralMSWKRank2": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 800,
        "formula": "2"
      }
    ],
    "CraftingScalingMatsAncestralMSWKRank3": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 800,
        "formula": "2"
      }
    ],
    "CraftingScalingMatsAncestralMSWKRank4": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 800,
        "formula": "2"
      }
    ],
    "CraftingScalingRareMatsTempering": [
      {
        "power": 0,
        "formula": "2"
      },
      {
        "power": 350,
        "formula": "5"
      },
      {
        "power": 750,
        "formula": "10"
      },
      {
        "power": 800,
        "formula": "15"
      }
    ],
    "MountArmor": [
      {
        "power": 0,
        "formula": "0.2"
      },
      {
        "power": 80,
        "formula": "0.25"
      },
      {
        "power": 120,
        "formula": "0.3"
      },
      {
        "power": 160,
        "formula": "0.35"
      },
      {
        "power": 200,
        "formula": "0.4"
      },
      {
        "power": 240,
        "formula": "0.45"
      },
      {
        "power": 280,
        "formula": "0.55"
      },
      {
        "power": 320,
        "formula": "0.6"
      },
      {
        "power": 360,
        "formula": "0.65"
      },
      {
        "power": 400,
        "formula": "0.8"
      },
      {
        "power": 440,
        "formula": "0.9"
      },
      {
        "power": 480,
        "formula": "1"
      }
    ],
    "MountBoots_Normal": [
      {
        "power": 0,
        "formula": "0.08"
      },
      {
        "power": 120,
        "formula": "0.1"
      },
      {
        "power": 280,
        "formula": "0.15"
      },
      {
        "power": 380,
        "formula": "0.2"
      }
    ],
    "MountBoots_Legendary": [
      {
        "power": 0,
        "formula": "0.2"
      },
      {
        "power": 400,
        "formula": "0.25"
      },
      {
        "power": 480,
        "formula": "0.3"
      }
    ],
    "GearAffix_SkillRankBonus_1to2": [
      {
        "power": 0,
        "formula": "Round(GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round(FloatRandomRangeWithInterval(1,1,2)*GetTotalAffixBonus())"
      }
    ],
    "AffixIgnoreModifiers1to2": [
      {
        "power": 0,
        "formula": "Round(GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round(FloatRandomRangeWithInterval(1,1,2)*GetTotalAffixBonus())"
      }
    ],
    "AffixIgnoreModifiers2to3": [
      {
        "power": 0,
        "formula": "Round(FloatRandomRangeWithInterval(1,1,2)*GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round(FloatRandomRangeWithInterval(1,2,3)*GetTotalAffixBonus())"
      }
    ],
    "AffixIgnoreModifiers3to4": [
      {
        "power": 0,
        "formula": "Round(FloatRandomRangeWithInterval(1,2,3)*GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round(FloatRandomRangeWithInterval(1,3,4)*GetTotalAffixBonus())"
      }
    ],
    "TalismanAffix_IgnoreModifiers2to3": [
      {
        "power": 0,
        "formula": "Round(GetTotalAffixBonus())"
      },
      {
        "power": 450,
        "formula": "Round(FloatRandomRangeWithInterval(1,1,2)*GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round(FloatRandomRangeWithInterval(1,2,3)*GetTotalAffixBonus())"
      }
    ],
    "AffixSkillRankSkillCategory1.5x": [
      {
        "power": 0,
        "formula": "0.8+0.6*RandomInt(1,2)"
      },
      {
        "power": 750,
        "formula": "Max(1.4,RandomInt(1,3))"
      }
    ],
    "AffixSkillRankSkillCategory1x_TemperTier3": [
      {
        "power": 0,
        "formula": "0.8+0.6*RandomInt(1,2)"
      }
    ],
    "AffixSkillRankSkillCategory1x": [
      {
        "power": 0,
        "formula": "1.4"
      },
      {
        "power": 750,
        "formula": "0.8+0.6*RandomInt(1,2)"
      }
    ],
    "AffixSkillRankSingle2x": [
      {
        "power": 0,
        "formula": "2"
      },
      {
        "power": 350,
        "formula": "RandomInt(2,3)"
      },
      {
        "power": 750,
        "formula": "RandomInt(3,4)"
      },
      {
        "power": 800,
        "formula": "RandomInt(4,6)"
      }
    ],
    "AffixSkillRankSingle1.66x": [
      {
        "power": 0,
        "formula": "RandomInt(2,2)"
      },
      {
        "power": 350,
        "formula": "RandomInt(2,3)"
      },
      {
        "power": 750,
        "formula": "RandomInt(3,4)"
      },
      {
        "power": 800,
        "formula": "RandomInt(4,5)"
      }
    ],
    "AffixSkillRankSingle1.33x_TemperTier3": [
      {
        "power": 0,
        "formula": "RandomInt(3,4)"
      }
    ],
    "AffixSkillRankSingle1.33x": [
      {
        "power": 0,
        "formula": "1.4"
      },
      {
        "power": 350,
        "formula": "RandomInt(2,2)"
      },
      {
        "power": 750,
        "formula": "RandomInt(2,3)"
      },
      {
        "power": 800,
        "formula": "RandomInt(3,4)"
      }
    ],
    "AffixSkillRankSingle1x_TemperTier3": [
      {
        "power": 0,
        "formula": "RandomInt(2,3)"
      }
    ],
    "AffixIncreasedGemEffect": [
      {
        "power": 0,
        "formula": "(74+RandomInt(1,26))/100"
      }
    ],
    "AffixSkillRankSingle1x": [
      {
        "power": 0,
        "formula": "1.4"
      },
      {
        "power": 350,
        "formula": "0.8+0.6*RandomInt(1,2)"
      },
      {
        "power": 750,
        "formula": "RandomInt(2,2)"
      },
      {
        "power": 800,
        "formula": "RandomInt(2,3)"
      }
    ],
    "AffixSkillRankSingle2/3x": [
      {
        "power": 0,
        "formula": "0.5"
      },
      {
        "power": 350,
        "formula": "1"
      },
      {
        "power": 750,
        "formula": "0.5+0.5*RandomInt(1,2)"
      },
      {
        "power": 800,
        "formula": "1+0.5*RandomInt(1,2)"
      }
    ],
    "AffixSkillRank_Always1_TemperTier3": [
      {
        "power": 0,
        "formula": "1"
      }
    ],
    "AffixPotionDoses_GREATER": [
      {
        "power": 0,
        "formula": "3"
      },
      {
        "power": 350,
        "formula": "4"
      },
      {
        "power": 800,
        "formula": "4"
      }
    ],
    "AffixPotionDoses": [
      {
        "power": 0,
        "formula": "RandomInt(1,2)"
      },
      {
        "power": 350,
        "formula": "RandomInt(1,3)"
      },
      {
        "power": 800,
        "formula": "1+RandomInt(1,2)"
      }
    ],
    "AffixCoreStat": [
      {
        "power": 0,
        "formula": "Max(1,4+Round(0.06037735849056604*(IPower()-10))+FloatRandomRangeWithInterval(3,1,3)-4)"
      },
      {
        "power": 590,
        "formula": "54+Round(0.14166666666666666*(IPower()-590))+FloatRandomRangeWithInterval(8,1,8)-4"
      },
      {
        "power": 750,
        "formula": "92+Round(0.18*(IPower()-750))+RandomInt(1,8+Round(0.03*(IPower()-750)))-4"
      },
      {
        "power": 900,
        "formula": "147+RandomInt(1,15)-4"
      }
    ],
    "AffixCoreStat2x": [
      {
        "power": 0,
        "formula": "4+Round(0.03725490196078431*(IPower()-10))+RandomInt(1,3+Round(0.00980392156862745*(IPower()-10)))"
      },
      {
        "power": 590,
        "formula": "46+Round(0.09375*(IPower()-550))+RandomInt(1,8+Round(0.01875*(IPower()-550)))"
      },
      {
        "power": 750,
        "formula": "104+RandomInt(1,15)"
      },
      {
        "power": 800,
        "formula": "156+RandomInt(1,15)"
      }
    ],
    "AffixCoreStat1.75x": [
      {
        "power": 0,
        "formula": "4+Round(0.052830188679245285*(IPower()-10))+FloatRandomRangeWithInterval(3,1,3)-4"
      },
      {
        "power": 590,
        "formula": "48+Round(0.14166666666666666*(IPower()-590))+FloatRandomRangeWithInterval(8,1,8)-4"
      },
      {
        "power": 750,
        "formula": "85+FloatRandomRangeWithInterval(11,1,11)-4"
      },
      {
        "power": 800,
        "formula": "102+FloatRandomRangeWithInterval(15,1,15)-4"
      }
    ],
    "AffixCoreStat1.5x": [
      {
        "power": 0,
        "formula": "3+Round(0.045283018867924525*(IPower()-10))+FloatRandomRangeWithInterval(3,1,3)-3"
      },
      {
        "power": 590,
        "formula": "41+Round(0.14166666666666666*(IPower()-590))+FloatRandomRangeWithInterval(8,1,8)-3"
      },
      {
        "power": 750,
        "formula": "75+FloatRandomRangeWithInterval(11,1,11)-3"
      },
      {
        "power": 800,
        "formula": "90+FloatRandomRangeWithInterval(15,1,15)-3"
      }
    ],
    "AffixCoreStat1.25x": [
      {
        "power": 0,
        "formula": "3+Round(0.03773584905660377*(IPower()-10))+FloatRandomRangeWithInterval(3,1,3)-3"
      },
      {
        "power": 590,
        "formula": "35+Round(0.14166666666666666*(IPower()-590))+FloatRandomRangeWithInterval(8,1,8)-3"
      },
      {
        "power": 750,
        "formula": "68+FloatRandomRangeWithInterval(11,1,11)-3"
      },
      {
        "power": 800,
        "formula": "82+FloatRandomRangeWithInterval(15,1,15)-3"
      }
    ],
    "AffixCoreStat1x": [
      {
        "power": 0,
        "formula": "2+Round(0.03018867924528302*(IPower()-10))+FloatRandomRangeWithInterval(3,1,3)-2"
      },
      {
        "power": 590,
        "formula": "27+Round(0.05*(IPower()-590))+FloatRandomRangeWithInterval(8,1,8)-2"
      },
      {
        "power": 750,
        "formula": "43+Round(0.09*(IPower()-750))+RandomInt(1,8+Round(0.03*(IPower()-750)))-2"
      },
      {
        "power": 900,
        "formula": "71+RandomInt(1,15)-2"
      }
    ],
    "AffixCoreStat2/3x": [
      {
        "power": 0,
        "formula": "4+Round(0.013725490196078431*(IPower()-10))+RandomInt(1,2+Round(0.0058823529411764705*(IPower()-10)))"
      },
      {
        "power": 590,
        "formula": "16+Round(0.025*(IPower()-590))+RandomInt(1,5+Round(0.016666666666666666*(IPower()-590)))"
      },
      {
        "power": 750,
        "formula": "32+RandomInt(1,9)"
      },
      {
        "power": 800,
        "formula": "48+RandomInt(1,9)"
      }
    ],
    "AffixCoreStat1/2.5x": [
      {
        "power": 0,
        "formula": "3+Round(0.00980392156862745*(IPower()-10))+RandomInt(1,1+Round(0.00784313725490196*(IPower()-10)))"
      },
      {
        "power": 590,
        "formula": "12+Round(0.016666666666666666*(IPower()-590))+RandomInt(1,5+Round(0.016666666666666666*(IPower()-590)))"
      },
      {
        "power": 750,
        "formula": "24+RandomInt(1,9)"
      },
      {
        "power": 800,
        "formula": "36+RandomInt(1,9)"
      }
    ],
    "AffixCoreStat (Grandfather)": [
      {
        "power": 0,
        "formula": "2*(2+Round(0.029411764705882353*(IPower()-10))+RandomInt(1,2+Round(0.0058823529411764705*(IPower()-10))))"
      },
      {
        "power": 590,
        "formula": "2*(34+Round(0.016666666666666666*(IPower()-590))+RandomInt(1,5+Round(0.016666666666666666*(IPower()-590))))"
      },
      {
        "power": 750,
        "formula": "2*(61+RandomInt(1,7+Round(0.04*(IPower()-750))))"
      },
      {
        "power": 800,
        "formula": "2*(92+RandomInt(1,9))"
      }
    ],
    "AffixFlatResource1.67xIgnoreModifiers": [
      {
        "power": 0,
        "formula": "1+Round(0.013725490196078431*(IPower()-10))+RandomInt(1,3+Round(0.0058823529411764705*(IPower()-10))*GetTotalAffixBonus())"
      },
      {
        "power": 590,
        "formula": "16+Round(0.016666666666666666*(IPower()-590))+RandomInt(1,6+Round(0.008333333333333333*(IPower()-590))*GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round(31+RandomInt(1,9)*GetTotalAffixBonus())"
      },
      {
        "power": 800,
        "formula": "Round(47+RandomInt(1,9)*GetTotalAffixBonus())"
      }
    ],
    "AffixFlatResource1.67x": [
      {
        "power": 0,
        "formula": "1+Round(0.013725490196078431*(IPower()-10))+RandomInt(1,3+Round(0.0058823529411764705*(IPower()-10)))"
      },
      {
        "power": 590,
        "formula": "16+Round(0.016666666666666666*(IPower()-590))+RandomInt(1,6+Round(0.008333333333333333*(IPower()-590)))"
      },
      {
        "power": 750,
        "formula": "31+RandomInt(1,9)"
      },
      {
        "power": 800,
        "formula": "47+RandomInt(1,9)"
      }
    ],
    "AffixFlatResource1.4xIgnoreModifiers": [
      {
        "power": 0,
        "formula": "Round(0.013725490196078431*(IPower()-10)+RandomInt(1,2+Round(0.00392156862745098*(IPower()-10)))*GetTotalAffixBonus())"
      },
      {
        "power": 590,
        "formula": "7+(Round(0.025*(IPower()-590))+RandomInt(1,4+Round(0.016666666666666666*(IPower()-590)))*GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round((10+RandomInt(1,9))*GetTotalAffixBonus())"
      },
      {
        "power": 800,
        "formula": "Round((12+RandomInt(1,9))*GetTotalAffixBonus())"
      }
    ],
    "AffixFlatResource1.4x": [
      {
        "power": 0,
        "formula": "Round(0.013725490196078431*(IPower()-10))+RandomInt(1,2+Round(0.00392156862745098*(IPower()-10)))"
      },
      {
        "power": 590,
        "formula": "7+Round(0.025*(IPower()-590))+RandomInt(1,4+Round(0.016666666666666666*(IPower()-590)))"
      },
      {
        "power": 750,
        "formula": "10+RandomInt(1,9)"
      },
      {
        "power": 800,
        "formula": "12+RandomInt(1,9)"
      }
    ],
    "AffixFlatResource1xIgnoreModifiers": [
      {
        "power": 0,
        "formula": "2+Round(0.0037735849056603774*(IPower()-10))+RandomInt(1,3+Round(0.005660377358490566*(IPower()-10))*GetTotalAffixBonus())"
      },
      {
        "power": 590,
        "formula": "4+Round(0.008333333333333333*(IPower()-590))+RandomInt(1,6+Round(0.008333333333333333*(IPower()-590))*GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round(5+RandomInt(1,9)*GetTotalAffixBonus())"
      },
      {
        "power": 800,
        "formula": "Round(7+RandomInt(1,9)*GetTotalAffixBonus())"
      }
    ],
    "AffixFlatResource1x": [
      {
        "power": 0,
        "formula": "2+Round(0.0037735849056603774*(IPower()-10))+RandomInt(1,3+Round(0.005660377358490566*(IPower()-10)))"
      },
      {
        "power": 590,
        "formula": "4+Round(0.008333333333333333*(IPower()-590))+RandomInt(1,6+Round(0.008333333333333333*(IPower()-590)))"
      },
      {
        "power": 750,
        "formula": "5+Round(0.02*(IPower()-750))+RandomInt(1,7+Round(0.02*(IPower()-750)))"
      },
      {
        "power": 900,
        "formula": "9+RandomInt(1,9)"
      }
    ],
    "AffixFlatResource0.66xIgnoreModifiers": [
      {
        "power": 0,
        "formula": "Round(0.005660377358490566*(IPower()-10))+RandomInt(1,2+Round(0.0037735849056603774*(IPower()-10))*GetTotalAffixBonus())"
      },
      {
        "power": 590,
        "formula": "2+Round(0.008333333333333333*(IPower()-590))+RandomInt(1,4+Round(0.008333333333333333*(IPower()-590))*GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round(3+RandomInt(1,7)*GetTotalAffixBonus())"
      },
      {
        "power": 800,
        "formula": "Round(5+RandomInt(1,7)*GetTotalAffixBonus())"
      }
    ],
    "AffixFlatResource0.66x": [
      {
        "power": 0,
        "formula": "Round(0.005660377358490566*(IPower()-10))+RandomInt(1,2+Round(0.0037735849056603774*(IPower()-10)))"
      },
      {
        "power": 590,
        "formula": "2+Round(0.008333333333333333*(IPower()-590))+RandomInt(1,4+Round(0.008333333333333333*(IPower()-590)))"
      },
      {
        "power": 750,
        "formula": "3+Round(0.02*(IPower()-750))+RandomInt(1,5+Round(0.02*(IPower()-750)))"
      },
      {
        "power": 900,
        "formula": "6+RandomInt(1,7)"
      }
    ],
    "AffixFlatResourceUpto5IgnoreModifiers": [
      {
        "power": 0,
        "formula": "Round(1+FloatRandomRangeWithInterval(1,1,2)*GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round(2+FloatRandomRangeWithInterval(1,1,2)*GetTotalAffixBonus())"
      },
      {
        "power": 800,
        "formula": "Round(3+FloatRandomRangeWithInterval(1,1,2)*GetTotalAffixBonus())"
      }
    ],
    "AffixFlatResourceUpto5": [
      {
        "power": 0,
        "formula": "1+FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 750,
        "formula": "2+FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 800,
        "formula": "3+FloatRandomRangeWithInterval(1,1,2)"
      }
    ],
    "AffixFlatResourceUpto10IgnoreModifiers": [
      {
        "power": 0,
        "formula": "Round(2+FloatRandomRangeWithInterval(1,1,4)*GetTotalAffixBonus())"
      },
      {
        "power": 750,
        "formula": "Round(4+FloatRandomRangeWithInterval(1,1,4)*GetTotalAffixBonus())"
      },
      {
        "power": 800,
        "formula": "Round(6+FloatRandomRangeWithInterval(1,1,4)*GetTotalAffixBonus())"
      }
    ],
    "AffixFlatResourceUpto10": [
      {
        "power": 0,
        "formula": "2+FloatRandomRangeWithInterval(1,1,4)"
      },
      {
        "power": 750,
        "formula": "4+FloatRandomRangeWithInterval(1,1,4)"
      },
      {
        "power": 800,
        "formula": "6+FloatRandomRangeWithInterval(1,1,4)"
      }
    ],
    "AffixResourceOnKill": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 750,
        "formula": "1"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(2,1,2)"
      }
    ],
    "AffixFlatResourceUpto4": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 750,
        "formula": "1+FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 800,
        "formula": "2+FloatRandomRangeWithInterval(1,1,2)"
      }
    ],
    "AffixMovementSpeedUniqueHigher": [
      {
        "power": 0,
        "formula": "(9.3+0.0047169811320754715*(IPower()-10)+0.5*RandomInt(1,11))/100"
      },
      {
        "power": 590,
        "formula": "(14+0.016666666666666666*(IPower()-590)+0.5*RandomInt(1,11+Round(0.041666666666666664*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(19.5+0.02*(IPower()-750)+0.5*RandomInt(1,15+Round(0.08*(IPower()-750))))/100"
      }
    ],
    "AffixMovementSpeed": [
      {
        "power": 0,
        "formula": "(4.3+0.0047169811320754715*(IPower()-10)+0.5*RandomInt(1,11))/100"
      },
      {
        "power": 590,
        "formula": "(9+0.016666666666666666*(IPower()-590)+0.5*RandomInt(1,11+Round(0.041666666666666664*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(14.5+0.02*(IPower()-750)+0.5*RandomInt(1,15+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(18+0.5*RandomInt(1,12))/100"
      }
    ],
    "AffixResourceGain": [
      {
        "power": 0,
        "formula": "(0.75+0.006603773584905661*(IPower()-10)+0.25*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(4.5+0.020833333333333332*(IPower()-590)+0.5*RandomInt(1,3+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(7+0.01*(IPower()-750)+0.5*RandomInt(1,6+Round(0.02*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(9+0.5*RandomInt(1,8))/100"
      }
    ],
    "AffixResourceCostReductionLesser": [
      {
        "power": 0,
        "formula": "(0.8+0.0033018867924528303*(IPower()-10)+0.15*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(3+0.0033333333333333335*(IPower()-590)+0.2*RandomInt(1,3+Round(0.041666666666666664*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(3.4+0.013999999999999999*(IPower()-750)+0.2*RandomInt(1,8+Round(0.03*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(5.4+0.2*RandomInt(1,11))/100"
      }
    ],
    "AffixResourceCostReduction": [
      {
        "power": 0,
        "formula": "(0.75+0.008490566037735849*(IPower()-10)+0.25*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(5.75+0.025*(IPower()-590)+0.25*RandomInt(1,3+Round(0.016666666666666666*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(9.75+0.0025*(IPower()-750)+0.25*RandomInt(1,5+Round(0.03*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(10+0.25*RandomInt(1,8))/100"
      }
    ],
    "S11AffixBarrierPercent": [
      {
        "power": 0,
        "formula": "(2.5+0.5*RandomInt(1,11))/100"
      },
      {
        "power": 590,
        "formula": "(4.5+0.5*RandomInt(1,11))/100"
      },
      {
        "power": 750,
        "formula": "(6.5+0.5*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(9.5+0.5*RandomInt(1,11))/100"
      }
    ],
    "AffixHealingPercent": [
      {
        "power": 0,
        "formula": "(0.9+0.0033962264150943396*(IPower()-10)+0.1*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(5.75+0.010416666666666666*(IPower()-590)+0.25*RandomInt(1,10+Round(0.03333333333333333*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(10.75+0.25*RandomInt(1,21))/100"
      },
      {
        "power": 800,
        "formula": "(14.75+0.25*RandomInt(1,21))/100"
      },
      {
        "power": 900,
        "formula": "(14.75+0.25*RandomInt(1,21))/100"
      }
    ],
    "AffixLife1.5x": [
      {
        "power": 0,
        "formula": "(6+0.02608695652173913*(IPower()-10)+FloatRandomRangeWithInterval(4,1,4))/100*1.5"
      },
      {
        "power": 241,
        "formula": "(11+-0.016722408026755852*(IPower()-241)+FloatRandomRangeWithInterval(3,1,3))/100*1.5"
      },
      {
        "power": 590,
        "formula": "(24+0.09416666666666668*(IPower()-590)+FloatRandomRangeWithInterval(5,1,4+Round(0.02*(IPower()-590))))/100*1.5"
      },
      {
        "power": 750,
        "formula": "(60+FloatRandomRangeWithInterval(5,1,8))/100*1.5"
      },
      {
        "power": 800,
        "formula": "(90+FloatRandomRangeWithInterval(5,1,8))/100*1.5"
      }
    ],
    "AffixLife0.33x": [
      {
        "power": 0,
        "formula": "(6+0.02608695652173913*(IPower()-10)+FloatRandomRangeWithInterval(4,1,4))/100*0.33"
      },
      {
        "power": 241,
        "formula": "(11+-0.016722408026755852*(IPower()-241)+FloatRandomRangeWithInterval(3,1,3))/100*0.33"
      },
      {
        "power": 590,
        "formula": "(24+0.09416666666666668*(IPower()-590)+FloatRandomRangeWithInterval(5,1,4+Round(0.02*(IPower()-590))))/100*0.33"
      },
      {
        "power": 750,
        "formula": "(60+FloatRandomRangeWithInterval(5,1,8))/100*0.33"
      },
      {
        "power": 800,
        "formula": "(90+FloatRandomRangeWithInterval(5,1,8))/100*0.33"
      }
    ],
    "AffixLife0.25x": [
      {
        "power": 0,
        "formula": "(6+0.02608695652173913*(IPower()-10)+FloatRandomRangeWithInterval(4,1,4))/100*0.25"
      },
      {
        "power": 241,
        "formula": "(11+-0.016722408026755852*(IPower()-241)+FloatRandomRangeWithInterval(3,1,3))/100*0.25"
      },
      {
        "power": 590,
        "formula": "(24+0.09416666666666668*(IPower()-590)+FloatRandomRangeWithInterval(5,1,4+Round(0.02*(IPower()-590))))/100*0.25"
      },
      {
        "power": 750,
        "formula": "(60+FloatRandomRangeWithInterval(5,1,8))/100*0.25"
      },
      {
        "power": 800,
        "formula": "(90+FloatRandomRangeWithInterval(5,1,8))/100*0.25"
      }
    ],
    "AffixLife0.5x": [
      {
        "power": 0,
        "formula": "(6+0.02608695652173913*(IPower()-10)+FloatRandomRangeWithInterval(4,1,4))/100*0.5"
      },
      {
        "power": 241,
        "formula": "(11+-0.016722408026755852*(IPower()-241)+FloatRandomRangeWithInterval(3,1,3))/100*0.5"
      },
      {
        "power": 590,
        "formula": "(24+0.09416666666666668*(IPower()-590)+FloatRandomRangeWithInterval(5,1,4+Round(0.02*(IPower()-590))))/100*0.5"
      },
      {
        "power": 750,
        "formula": "(60+FloatRandomRangeWithInterval(5,1,8))/100*0.5"
      },
      {
        "power": 800,
        "formula": "(90+FloatRandomRangeWithInterval(5,1,8))/100*0.5"
      }
    ],
    "AffixLife1.25x": [
      {
        "power": 0,
        "formula": "(6+0.02608695652173913*(IPower()-10)+FloatRandomRangeWithInterval(4,1,4))/100*1.25"
      },
      {
        "power": 241,
        "formula": "(11+-0.016722408026755852*(IPower()-241)+FloatRandomRangeWithInterval(3,1,3))/100*1.25"
      },
      {
        "power": 590,
        "formula": "(24+0.09416666666666668*(IPower()-590)+FloatRandomRangeWithInterval(5,1,4+Round(0.02*(IPower()-590))))/100*1.25"
      },
      {
        "power": 750,
        "formula": "(60+FloatRandomRangeWithInterval(5,1,8))/100*1.25"
      },
      {
        "power": 800,
        "formula": "(90+FloatRandomRangeWithInterval(5,1,8))/100*1.25"
      }
    ],
    "AffixLife": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(3,1,4)"
      },
      {
        "power": 180,
        "formula": "FloatRandomRangeWithInterval(3,5,8)"
      },
      {
        "power": 240,
        "formula": "FloatRandomRangeWithInterval(6,9,15)"
      },
      {
        "power": 300,
        "formula": "FloatRandomRangeWithInterval(11,16,27)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(15,28,43)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(26,44,70)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(44,71,115)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(59,116,175)"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(79,176,255)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(94,256,350)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(189,351,540)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(199,541,740)"
      },
      {
        "power": 820,
        "formula": "FloatRandomRangeWithInterval(274,741,1015)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(209,1016,1225)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(224,1226,1450)"
      }
    ],
    "AffixThorns": [
      {
        "power": 0,
        "formula": "(1.75+Round(0.007075471698113208*(IPower()-10))+0.25*RandomInt(1,2))/100"
      },
      {
        "power": 590,
        "formula": "(11+Round(0.1*(IPower()-590))+0.25*RandomInt(1,5+Round(0.016666666666666666*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(39+Round(0.2*(IPower()-750))+0.25*RandomInt(1,7+Round(0.02*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(89+0.25*RandomInt(1,9))/100"
      }
    ],
    "AffixPotionSpecial (Int)": [
      {
        "power": 0,
        "formula": "10"
      },
      {
        "power": 750,
        "formula": "20"
      }
    ],
    "AffixPotionMoveSpeed": [
      {
        "power": 0,
        "formula": "0.2"
      },
      {
        "power": 750,
        "formula": "0.3"
      }
    ],
    "AffixPotionSpecial": [
      {
        "power": 0,
        "formula": "0.1"
      },
      {
        "power": 750,
        "formula": "0.2"
      }
    ],
    "StaticAffix_0.75to1to1.25": [
      {
        "power": 0,
        "formula": "0.75"
      },
      {
        "power": 750,
        "formula": "1"
      },
      {
        "power": 800,
        "formula": "1.25"
      }
    ],
    "Affix0.2to0.3": [
      {
        "power": 0,
        "formula": "RandomInt(2,3)*0.1"
      }
    ],
    "Affix0.1to0.2": [
      {
        "power": 0,
        "formula": "RandomInt(2,4)*0.05"
      }
    ],
    "AffixEvadeCDR": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 750,
        "formula": "1.2"
      },
      {
        "power": 800,
        "formula": "1.5"
      }
    ],
    "AffixEvadeCDRRandom": [
      {
        "power": 0,
        "formula": "0.4+0.2*RandomInt(1,2)"
      }
    ],
    "Affix0.5to1Static": [
      {
        "power": 0,
        "formula": "0.4+0.3*RandomInt(1,2)"
      }
    ],
    "Affix1to2": [
      {
        "power": 0,
        "formula": "1.4"
      },
      {
        "power": 750,
        "formula": "2"
      }
    ],
    "Affix1to2Random": [
      {
        "power": 0,
        "formula": "0.8+0.6*RandomInt(1,2)"
      }
    ],
    "AffixUnique_Lifesteal": [
      {
        "power": 0,
        "formula": "(12.5+0.5*RandomInt(1,15))/1000"
      }
    ],
    "InherentAffixSingleResist_LEGACY": [
      {
        "power": 0,
        "formula": "0.02+0.00017721518987341773*(IPower()-10)"
      }
    ],
    "InherentAffixAllResist_Jewelry_Flat": [
      {
        "power": 0,
        "formula": "0"
      },
      {
        "power": 590,
        "formula": "0"
      },
      {
        "power": 750,
        "formula": "0"
      },
      {
        "power": 800,
        "formula": "0"
      }
    ],
    "InherentAffixAllResist_Amulet": [
      {
        "power": 0,
        "formula": "0.05+0.00021428571428571427*(IPower()-10)"
      },
      {
        "power": 750,
        "formula": "0.25"
      },
      {
        "power": 800,
        "formula": "0.3"
      }
    ],
    "InherentAffixAnyResist_Ring3x": [
      {
        "power": 0,
        "formula": "(0.015+0.00008571428571428571*(IPower()-10))*3"
      },
      {
        "power": 750,
        "formula": "0.3"
      },
      {
        "power": 800,
        "formula": "0.375"
      }
    ],
    "InherentAffixAnyResist_Ring": [
      {
        "power": 0,
        "formula": "0.015+0.00008571428571428571*(IPower()-10)"
      },
      {
        "power": 750,
        "formula": "0.1"
      },
      {
        "power": 800,
        "formula": "0.125"
      }
    ],
    "InherentAffixAnyResist_Ring0.4x": [
      {
        "power": 0,
        "formula": "0.01+0.00002857142857142857*(IPower()-10)"
      },
      {
        "power": 750,
        "formula": "0.04"
      },
      {
        "power": 800,
        "formula": "0.05"
      }
    ],
    "AffixPercentage18x_TemperTier3": [
      {
        "power": 0,
        "formula": "(174+6*RandomInt(1,13))/100"
      }
    ],
    "AffixPercentage18x": [
      {
        "power": 0,
        "formula": "(12+Round(0.16470588235294117*(IPower()-10))+6*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(96+Round(0.15*(IPower()-590))+6*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(114+Round(0.96*(IPower()-750))+6*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(162+6*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage12.5x": [
      {
        "power": 0,
        "formula": "(9+Round(0.11568627450980393*(IPower()-10))+4*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(68+Round(0.10833333333333334*(IPower()-590))+4*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(81+Round(0.48*(IPower()-750))+4*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(105+4*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage12x": [
      {
        "power": 0,
        "formula": "(8+Round(0.10980392156862745*(IPower()-10))+4*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(64+Round(0.1*(IPower()-590))+4*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(76+Round(0.64*(IPower()-750))+4*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(108+4*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage9x": [
      {
        "power": 0,
        "formula": "(6+Round(0.08235294117647059*(IPower()-10))+3*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(6+Round(0.08235294117647059*(IPower()-10))+3*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 750,
        "formula": "(57+Round(0.48*(IPower()-750))+3*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(81+3*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage8.33x": [
      {
        "power": 0,
        "formula": "(4.5+Round(0.07450980392156863*(IPower()-10))+3*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(42.5+Round(0.0625*(IPower()-590))+3*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(50+Round(0.44*(IPower()-750))+3*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(72+3*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage6x": [
      {
        "power": 0,
        "formula": "(4+Round(0.054901960784313725*(IPower()-10))+2*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(32+Round(0.05*(IPower()-590))+2*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(38+Round(0.32*(IPower()-750))+2*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(54+2*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage5x": [
      {
        "power": 0,
        "formula": "(2+Round(0.043137254901960784*(IPower()-10))+2*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(24+Round(0.03333333333333333*(IPower()-590))+2*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(28+Round(0.24*(IPower()-750))+2*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(40+2*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage4.5x": [
      {
        "power": 0,
        "formula": "(3+Round(0.041176470588235294*(IPower()-10))+1.5*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(24+Round(0.0375*(IPower()-590))+1.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(29+Round(0.24*(IPower()-750))+1.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(41+1.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage4x": [
      {
        "power": 0,
        "formula": "(2+Round(0.03529411764705882*(IPower()-10))+1.5*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(20+Round(0.029166666666666667*(IPower()-590))+1.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(24+Round(0.2*(IPower()-750))+1.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(34+1.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage3.75x": [
      {
        "power": 0,
        "formula": "(1.5+Round(0.03235294117647059*(IPower()-10))+1.5*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(18+Round(0.025*(IPower()-590))+1.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(21+Round(0.18*(IPower()-750))+1.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(30+1.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage3.5x": [
      {
        "power": 0,
        "formula": "(1+Round(0.029411764705882353*(IPower()-10))+1.5*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(16+Round(0.020833333333333332*(IPower()-590))+1.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(19+Round(0.16*(IPower()-750))+1.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(27+1.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage3.33x": [
      {
        "power": 0,
        "formula": "(0.5+Round(0.027450980392156862*(IPower()-10))+1.5*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(15+Round(0.020833333333333332*(IPower()-590))+1.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(18+Round(0.14*(IPower()-750))+1.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(25+1.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage3x (Flat)": [
      {
        "power": 0,
        "formula": "0.04+0.00028431372549019604*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.185+0.0003333333333333333*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.315"
      },
      {
        "power": 800,
        "formula": "0.315"
      }
    ],
    "AffixPercentage3x": [
      {
        "power": 0,
        "formula": "(0.5+Round(0.03207547169811321*(IPower()-10))+0.5*RandomInt(1,4))/100"
      },
      {
        "power": 590,
        "formula": "(35+Round(0.0375*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(67+Round(0.34*(IPower()-750))+0.5*RandomInt(1,11+Round(0.04*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(152+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage2.85x": [
      {
        "power": 0,
        "formula": "(1+Round(0.018627450980392157*(IPower()-10))+RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(10.5+Round(0.0125*(IPower()-590))+RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(12+Round(0.11*(IPower()-750))+RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(17.5+RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage2.5x (Flat)": [
      {
        "power": 0,
        "formula": "0.035+0.00025490196078431374*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.165+0.0002916666666666667*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.28"
      },
      {
        "power": 800,
        "formula": "0.28"
      }
    ],
    "AffixPercentage2.5x": [
      {
        "power": 0,
        "formula": "(1+Round(0.021568627450980392*(IPower()-10))+RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(12+Round(0.016666666666666666*(IPower()-590))+RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(14+Round(0.12*(IPower()-750))+RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(20+RandomInt(1,15))/100"
      }
    ],
    "AffixLHVulnerable": [
      {
        "power": 0,
        "formula": "(4.5+Round(0.026415094339622643*(IPower()-10))+0.5*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(28.5+0.5*RandomInt(1,9))/100"
      },
      {
        "power": 750,
        "formula": "(42.75+0.5*RandomInt(1,9))/100"
      }
    ],
    "AffixPercentage2.25x": [
      {
        "power": 0,
        "formula": "(0.5+Round(0.018627450980392157*(IPower()-10))+RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(10+Round(0.0125*(IPower()-590))+RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(11.5+Round(0.1*(IPower()-750))+RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(16.5+RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage2x (Flat)": [
      {
        "power": 0,
        "formula": "0.025+0.0001862745294117647*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.12+0.00025*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.15+0.0012*(IPower()-750)"
      },
      {
        "power": 800,
        "formula": "0.21"
      }
    ],
    "AffixPercentage2x": [
      {
        "power": 0,
        "formula": "(Round(0.01568627450980392*(IPower()-10))+RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(8+Round(0.008333333333333333*(IPower()-590))+RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(9+Round(0.08*(IPower()-750))+RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(13+RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage1.85x": [
      {
        "power": 0,
        "formula": "(2+Round(0.01568627450980392*(IPower()-10))+0.5*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(10+Round(0.020833333333333332*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(12.5+Round(0.12*(IPower()-750))+0.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(18.5+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage1.67x (Flat)": [
      {
        "power": 0,
        "formula": "0.03+0.0001666666666666667*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.115+0.00020833333333333335*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.14+0.0012*(IPower()-750)"
      },
      {
        "power": 800,
        "formula": "0.2"
      }
    ],
    "AffixPercentage1.67x": [
      {
        "power": 0,
        "formula": "(1.5+Round(0.014705882352941176*(IPower()-10))+0.5*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(9+Round(0.016666666666666666*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(11+Round(0.1*(IPower()-750))+0.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(16+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage1.5x (Flat)": [
      {
        "power": 0,
        "formula": "0.03+0.0001176470588235294*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.09+0.0002916666666666667*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.125+0.001*(IPower()-750)"
      },
      {
        "power": 800,
        "formula": "0.175"
      }
    ],
    "AffixPercentage1.5x": [
      {
        "power": 0,
        "formula": "(1+Round(0.013725490196078431*(IPower()-10))+0.5*RandomInt(1,4+Round(0.00784313725490196*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(8+Round(0.0125*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(9.5+Round(0.08*(IPower()-750))+0.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(13.5+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage1.4x": [
      {
        "power": 0,
        "formula": "(0.5+Round(0.012264150943396227*(IPower()-10))+0.25*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(14+Round(0.029166666666666667*(IPower()-590))+0.25*RandomInt(1,5+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(29.75+Round(0.14875*(IPower()-750))+0.25*RandomInt(1,8+Round(0.03*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(66.93751+0.25*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage1.25x": [
      {
        "power": 0,
        "formula": "(0.5+Round(0.010784313725490196*(IPower()-10))+0.5*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(6+Round(0.008333333333333333*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(7+Round(0.06*(IPower()-750))+0.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(10+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage1.2x": [
      {
        "power": 0,
        "formula": "(0.5+Round(0.00980392156862745*(IPower()-10))+0.5*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(5.5+Round(0.008333333333333333*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(6.5+Round(0.05*(IPower()-750))+0.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(9+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage1x (Flat)": [
      {
        "power": 0,
        "formula": "0.02+0.00007843137254901961*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.06+0.00008333333333333333*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.07+0.0006*(IPower()-750)"
      },
      {
        "power": 800,
        "formula": "0.1"
      }
    ],
    "AffixPercentage1x": [
      {
        "power": 0,
        "formula": "(0.5+Round(0.006862745098039216*(IPower()-10))+0.5*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(4+Round(0.004166666666666667*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(4.5+Round(0.04*(IPower()-750))+0.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(6.5+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage0.85x": [
      {
        "power": 0,
        "formula": "(0.5+Round(0.00392156862745098*(IPower()-10))+0.5*RandomInt(1,2+Round(0.011764705882352941*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(2.5+Round(0.004166666666666667*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(3+Round(0.03*(IPower()-750))+0.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(4.5+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage0.80x": [
      {
        "power": 0,
        "formula": "(0.5+Round(0.00392156862745098*(IPower()-10))+0.5*RandomInt(1,2+Round(0.011764705882352941*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(2.5+Round(0.009166666666666667*(IPower()-590))+0.4*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(3.6+Round(0.027999999999999997*(IPower()-750))+0.4*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(5+0.4*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage0.75x (Flat)": [
      {
        "power": 0,
        "formula": "0.015+0.0000588235294117647*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.045+0.00008333333333333333*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.055+0.0003*(IPower()-750)"
      },
      {
        "power": 800,
        "formula": "0.07"
      }
    ],
    "AffixPercentage0.75x": [
      {
        "power": 0,
        "formula": "(0.6+Round(0.004313725490196079*(IPower()-10))+0.4*RandomInt(1,2+Round(0.011764705882352941*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(2.8+Round(0.0025*(IPower()-590))+0.4*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(3.1+Round(0.018000000000000002*(IPower()-750))+0.4*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(4+0.4*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage0.6x": [
      {
        "power": 0,
        "formula": "(1.6+Round(0.00196078431372549*(IPower()-10))+0.3*RandomInt(1,2+Round(0.011764705882352941*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(2.6+Round(0.005*(IPower()-590))+0.3*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(3.2+Round(0.026000000000000002*(IPower()-750))+0.3*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(4.5+0.3*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage0.5x": [
      {
        "power": 0,
        "formula": "(0.8+Round(0.0031372549019607846*(IPower()-10))+0.2*RandomInt(1,2+Round(0.011764705882352941*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(2.4+Round(0.0033333333333333335*(IPower()-590))+0.2*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(2.8+Round(0.024*(IPower()-750))+0.2*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(4+0.2*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentage0.4x (Flat)": [
      {
        "power": 0,
        "formula": "0.016+0.000023529411764705884*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.028+0.00005833333333333333*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.035+0.00021999999999999998*(IPower()-750)"
      },
      {
        "power": 800,
        "formula": "0.046"
      }
    ],
    "AffixPercentage0.4x": [
      {
        "power": 0,
        "formula": "(1.2+Round(0.001372549019607843*(IPower()-10))+0.2*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(1.9+Round(0.0033333333333333335*(IPower()-590))+0.2*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(2.3+Round(0.013999999999999999*(IPower()-750))+0.2*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(3+0.2*RandomInt(1,15))/100"
      }
    ],
    "AffixPercentageBoost": [
      {
        "power": 0,
        "formula": "Pin(IPower()*0.0006-0.29,0.01,0.2)"
      }
    ],
    "AffixInversePercentage6x": [
      {
        "power": 0,
        "formula": "(5.5+Round(0.03431372549019608*(IPower()-10))+2*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(23+Round(0.016666666666666666*(IPower()-590))+2*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(25+Round(0.09*(IPower()-750))+2*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(29.5+2*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage5x": [
      {
        "power": 0,
        "formula": "(3.5+Round(0.028431372549019607*(IPower()-10))+2*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(18+Round(0.008333333333333333*(IPower()-590))+2*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(19+Round(0.08*(IPower()-750))+2*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(23+2*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage4x (Flat)": [
      {
        "power": 0,
        "formula": "0.06+0.00031372549019607844*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.22+0.0004166666666666667*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.27+0.0016*(IPower()-750)"
      },
      {
        "power": 800,
        "formula": "0.35"
      }
    ],
    "AffixInversePercentage4x": [
      {
        "power": 0,
        "formula": "(3+Round(0.025490196078431372*(IPower()-10))+1.5*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(16+Round(0.016666666666666666*(IPower()-590))+1.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(18+Round(0.1*(IPower()-750))+1.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(23+1.5*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage3.33x": [
      {
        "power": 0,
        "formula": "(2+Round(0.0196078431372549*(IPower()-10))+1.5*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(12+Round(0.008333333333333333*(IPower()-590))+1.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(13+Round(0.08*(IPower()-750))+1.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(17+1.5*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage3x": [
      {
        "power": 0,
        "formula": "(1.5+Round(0.016666666666666666*(IPower()-10))+1.5*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(10+Round(0.004166666666666667*(IPower()-590))+1.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(10.5+Round(0.07*(IPower()-750))+1.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(14+1.5*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage2.5x (Flat)": [
      {
        "power": 0,
        "formula": "0.04+0.00021568627450980392*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.15+0.00025*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.18+0.0013*(IPower()-750)"
      },
      {
        "power": 800,
        "formula": "0.245"
      }
    ],
    "AffixInversePercentage2.5x": [
      {
        "power": 0,
        "formula": "(2+Round(0.01764705882352941*(IPower()-10))+RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(11+Round(0.008333333333333333*(IPower()-590))+RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(12+Round(0.09*(IPower()-750))+RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(16.5+RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage2.33x": [
      {
        "power": 0,
        "formula": "(1.5+Round(0.01568627450980392*(IPower()-10))+RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(9.5+Round(0.0125*(IPower()-590))+RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(11+Round(0.07*(IPower()-750))+RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(14.5+RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage2x": [
      {
        "power": 0,
        "formula": "(1+Round(0.011764705882352941*(IPower()-10))+RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(7+Round(0.008333333333333333*(IPower()-590))+RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(8+Round(0.06*(IPower()-750))+RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(11+RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage1.67x": [
      {
        "power": 0,
        "formula": "(1.5+Round(0.014705882352941176*(IPower()-10))+0.5*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(9+Round(0.0125*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(10.5+Round(0.08*(IPower()-750))+0.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(14.5+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage1.5x": [
      {
        "power": 0,
        "formula": "(1+Round(0.012745098039215686*(IPower()-10))+0.5*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(7.5+Round(0.0125*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(9+Round(0.07*(IPower()-750))+0.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(12.5+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage1.2x": [
      {
        "power": 0,
        "formula": "(1+Round(0.008823529411764706*(IPower()-10))+0.5*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(5.5+Round(0.008333333333333333*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(6.5+Round(0.05*(IPower()-750))+0.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(9+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage1x (Per Point)": [
      {
        "power": 0,
        "formula": "Pin(Round((1-1-IPower()*0.00013)*1000)/1000,0.01,0.1)"
      }
    ],
    "AffixInversePercentage1x (Flat)": [
      {
        "power": 0,
        "formula": "0.02+0.00007843137254901961*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.06+0.00008333333333333333*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.07+0.0006*(IPower()-750)"
      },
      {
        "power": 800,
        "formula": "0.1"
      }
    ],
    "AffixInversePercentage1x": [
      {
        "power": 0,
        "formula": "(0.75+Round(0.012264150943396227*(IPower()-10))+0.25*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(14.5+Round(0.016666666666666666*(IPower()-590))+0.25*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(28.05+Round(0.14025*(IPower()-750))+0.25*RandomInt(1,11+Round(0.04*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(63.1125+0.25*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage0.85x": [
      {
        "power": 0,
        "formula": "(0.5+Round(0.00392156862745098*(IPower()-10))+0.5*RandomInt(1,2+Round(0.011764705882352941*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(2.5+Round(0.004166666666666667*(IPower()-590))+0.5*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(3+Round(0.03*(IPower()-750))+0.5*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(4.5+0.5*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage0.75x": [
      {
        "power": 0,
        "formula": "(0.6+Round(0.004313725490196079*(IPower()-10))+0.4*RandomInt(1,2+Round(0.011764705882352941*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(2.8+Round(0.0025*(IPower()-590))+0.4*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(3.1+Round(0.027999999999999997*(IPower()-750))+0.4*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(4.5+0.4*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage0.60x": [
      {
        "power": 0,
        "formula": "(0.9+Round(0.0031372549019607846*(IPower()-10))+0.3*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 200,
        "formula": "(2.5+Round(0.0025*(IPower()-590))+0.3*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 350,
        "formula": "(2.8+Round(0.026000000000000002*(IPower()-750))+0.3*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 500,
        "formula": "(4.1+0.3*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage0.5xLife": [
      {
        "power": 0,
        "formula": "0.015"
      },
      {
        "power": 200,
        "formula": "(0.7+Round(0.00196078431372549*(IPower()-10))+0.3*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(1.7+Round(0.0008333333333333334*(IPower()-590))+0.3*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(1.8+Round(0.02*(IPower()-750))+0.3*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(2.8+0.3*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage0.5x": [
      {
        "power": 0,
        "formula": "(0.4+Round(0.0024528301886792454*(IPower()-10))+0.1*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(3.4+Round(0.008333333333333333*(IPower()-590))+0.3*RandomInt(1,3+Round(0.06666666666666667*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(7.48+Round(0.0374*(IPower()-750))+0.3*RandomInt(1,11+Round(0.04*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(16.83+0.3*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage0.40x": [
      {
        "power": 0,
        "formula": "0.01"
      },
      {
        "power": 200,
        "formula": "(0.8+Round(0.0017647058823529412*(IPower()-10))+0.2*RandomInt(1,3+Round(0.00980392156862745*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(1.7+Round(0.0016666666666666668*(IPower()-590))+0.2*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(1.9+Round(0.018000000000000002*(IPower()-750))+0.2*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(2.8+0.2*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage0.33x (Flat)": [
      {
        "power": 0,
        "formula": "0.015+0.000009803921568627451*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.02+0.000033333333333333335*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.024+0.0002*(IPower()-750)"
      },
      {
        "power": 800,
        "formula": "0.034"
      }
    ],
    "AffixInversePercentage0.1xLife": [
      {
        "power": 0,
        "formula": "(1+0.2*RandomInt(1,11))/100"
      },
      {
        "power": 590,
        "formula": "(1.5+0.2*RandomInt(1,11))/100"
      },
      {
        "power": 750,
        "formula": "(7+0.333*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(12+0.471326*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage0.4xLife": [
      {
        "power": 0,
        "formula": "(0.8+0.2*RandomInt(1,11))/100"
      },
      {
        "power": 590,
        "formula": "(6.8+0.2*RandomInt(1,11))/100"
      },
      {
        "power": 750,
        "formula": "(24+0.45*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(36+0.7069889*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage0.2xLife": [
      {
        "power": 0,
        "formula": "(0.4+0.2*RandomInt(1,11))/100"
      },
      {
        "power": 590,
        "formula": "(3.4+0.2*RandomInt(1,11))/100"
      },
      {
        "power": 750,
        "formula": "(12.06+Round(0.0594*(IPower()-750))+0.45*RandomInt(1,11))/100"
      },
      {
        "power": 900,
        "formula": "(24+0.706898*RandomInt(1,15))/100"
      }
    ],
    "AffixInversePercentage0.33xLife": [
      {
        "power": 0,
        "formula": "(0.8+Round(0.000588235294117647*(IPower()-10))+0.2*RandomInt(1,5+Round(0.0058823529411764705*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(1.1+Round(0.0008333333333333334*(IPower()-590))+0.2*RandomInt(1,8+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(1.2+Round(0.012*(IPower()-750))+0.2*RandomInt(1,11+Round(0.08*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(1.8+0.2*RandomInt(1,15))/100"
      }
    ],
    "AffixCritChance1.5": [
      {
        "power": 0,
        "formula": "(0.75+Round(0.0058823529411764705*(IPower()-10))+0.75*RandomInt(1,3+Round(0.0058823529411764705*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(3.75+0.75*RandomInt(1,6+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(3.75+0.75*RandomInt(1,9+Round(0.04*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(3.75+0.75*RandomInt(1,11))/100"
      }
    ],
    "AffixCritChance_GREATER": [
      {
        "power": 0,
        "formula": "0.026+0.00010196078431372549*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.078+0.00010833333333333333*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.104"
      }
    ],
    "AffixCritChance_TemperTier3": [
      {
        "power": 0,
        "formula": "(2.5+0.5*RandomInt(1,11))/100"
      }
    ],
    "AffixCritChance": [
      {
        "power": 0,
        "formula": "(0.5+Round(0.00392156862745098*(IPower()-10))+0.5*RandomInt(1,3+Round(0.0058823529411764705*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(2.5+0.5*RandomInt(1,6+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(2.5+0.5*RandomInt(1,11))/100"
      }
    ],
    "AffixCritChance2/3_GREATER": [
      {
        "power": 0,
        "formula": "0.018+0.0000411764705882353*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.039+0.00010833333333333333*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.065"
      }
    ],
    "AffixCritChance2/3_TemperTier3": [
      {
        "power": 0,
        "formula": "(1.4+0.4*RandomInt(1,9))/100"
      }
    ],
    "AffixCritChance2/3": [
      {
        "power": 0,
        "formula": "(0.6+Round(0.0007843137254901962*(IPower()-10))+0.4*RandomInt(1,2+Round(0.0058823529411764705*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(1+Round(0.0016666666666666668*(IPower()-590))+0.4*RandomInt(1,5+Round(0.016666666666666666*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(1.4+0.4*RandomInt(1,9))/100"
      }
    ],
    "AffixShieldBlockDamagePercentage": [
      {
        "power": 0,
        "formula": "0.25+0.00019607843137254904*(IPower()-10)"
      },
      {
        "power": 199,
        "formula": "0.35+0.00025*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.41"
      },
      {
        "power": 800,
        "formula": "0.45"
      }
    ],
    "LegendaryVulnerableTime": [
      {
        "power": 0,
        "formula": "RandomInt(4,8)/2"
      }
    ],
    "LegendaryResourceRegenVulnerable": [
      {
        "power": 0,
        "formula": "RandomInt(19.839599999999997,30.06)"
      }
    ],
    "LegendaryResourceReductionWCondition": [
      {
        "power": 0,
        "formula": "RandomInt(19.8,30)"
      }
    ],
    "LegendaryDamageReduction": [
      {
        "power": 0,
        "formula": "RandomInt(19.800000000000004,30.000000000000004)"
      }
    ],
    "LegendaryCooldownReductionInSeconds": [
      {
        "power": 0,
        "formula": "RandomInt(10,20)/10"
      }
    ],
    "ParagonNodeBerserkDuration_RareMinor": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeBerserkDuration_RareMajor": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeBerserkDuration_Magic": [
      {
        "power": 0,
        "formula": "0.037500000000000006"
      }
    ],
    "ParagonNodeResourceBonus_RareMinor": [
      {
        "power": 0,
        "formula": "4"
      }
    ],
    "ParagonNodeResourceCostReduction_RareMinor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeResourceCostReductionSkillCat_RareMinor": [
      {
        "power": 0,
        "formula": "0.053332"
      }
    ],
    "ParagonNodeResourceCostReductionSkillCat_RareMajor": [
      {
        "power": 0,
        "formula": "0.053332"
      }
    ],
    "ParagonNodeResourceCostReductionSkillCat_Magic": [
      {
        "power": 0,
        "formula": "0.026666"
      }
    ],
    "ParagonNodeResourceCostReduction_Magic": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonNodeResourceCostReduction_RareMajor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeResourceBonus_RareMajor": [
      {
        "power": 0,
        "formula": "4"
      }
    ],
    "ParagonNodeAttackSpeedPetSingle_Magic": [
      {
        "power": 0,
        "formula": "0.0425"
      }
    ],
    "ParagonNodeAttackSpeedPetSingle_RareMajor": [
      {
        "power": 0,
        "formula": "0.04000000000000001"
      }
    ],
    "ParagonNodeAttackSpeedPetSingle_RareMinor": [
      {
        "power": 0,
        "formula": "0.04000000000000001"
      }
    ],
    "ParagonNodeDamageBonusPetSingle_RareMinor": [
      {
        "power": 0,
        "formula": "0.085"
      }
    ],
    "ParagonNodeDamageBonusPetSingle_RareMajor": [
      {
        "power": 0,
        "formula": "0.25"
      }
    ],
    "ParagonNodeDamageBonusPetSingle_Magic": [
      {
        "power": 0,
        "formula": "0.125"
      }
    ],
    "ParagonNodeDamageBonusPetSkeleton_Magic": [
      {
        "power": 0,
        "formula": "0.0333325"
      }
    ],
    "ParagonNodeDamageBonusPetSkeleton_RareMinor": [
      {
        "power": 0,
        "formula": "0.066665"
      }
    ],
    "ParagonNodeDamageBonusPetSkeleton_RareMajor": [
      {
        "power": 0,
        "formula": "0.066665"
      }
    ],
    "ParagonNodeDamageBonusPet_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusPet_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonusPet_RareMinor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonusPrimary_RareMinor": [
      {
        "power": 0,
        "formula": "0.17500000000000002"
      }
    ],
    "ParagonNodeDamageBonusTag_LegendaryMinor": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "ParagonNodeDamageBonusTag_RareMajor": [
      {
        "power": 0,
        "formula": "0.17500000000000002"
      }
    ],
    "ParagonNodeDamageBonusPrimary_RareMajor": [
      {
        "power": 0,
        "formula": "0.17500000000000002"
      }
    ],
    "ParagonNodeDamageBonusSecondary_RareMinor": [
      {
        "power": 0,
        "formula": "0.13999999999999999"
      }
    ],
    "ParagonNodeDamageBonusSecondary_RareMajor": [
      {
        "power": 0,
        "formula": "0.13999999999999999"
      }
    ],
    "ParagonNodeDamageBonusSecondary_Magic": [
      {
        "power": 0,
        "formula": "0.06999999999999999"
      }
    ],
    "ParagonNodeDamageBonusPrimary_Magic": [
      {
        "power": 0,
        "formula": "0.08750000000000001"
      }
    ],
    "ParagonNodeDamageBonusOnPickBloodOrbDuration": [
      {
        "power": 0,
        "formula": "4"
      }
    ],
    "ParagonNodeDamageBonusOnPickBloodOrb_RareMinor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonusOnPickBloodOrb_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonusOnPickBloodOrb_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusWithActivePet_RareMinor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusWithActivePet_RareMajor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusWithActivePet_Magic": [
      {
        "power": 0,
        "formula": "0.025"
      }
    ],
    "ParagonNodeDamageBonusImbued_RareMajor": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "ParagonNodeDamageBonusImbued_RareMinor": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeDamageBonusImbued_Magic": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeMoveSpeed_Magic": [
      {
        "power": 0,
        "formula": "0.025"
      }
    ],
    "ParagonNodeDamageBonus_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusToElite_Magic": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeDamageBonusToElite_RareMajor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeHPRegen_RareMinor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeHPRegen_RareMajor": [
      {
        "power": 0,
        "formula": "0.092"
      }
    ],
    "ParagonNodeBlockChance_Magic": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonNodeHPRegen_Magic": [
      {
        "power": 0,
        "formula": "0.025"
      }
    ],
    "ParagonNodeHPMaxBonusPet_RareMinor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeHPMaxBonusPet_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeHPMaxBonusPet_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeHPMaxBonus_Magic": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonNodeHPMaxBonus_RareMajor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeHPMaxBonus_RareMinor_Sorc": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeHPMaxBonus_RareMinor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeCritDamageFortified_RareMinor": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeCritDamageFortified_RareMajor": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeCritDamageFortified_Magic": [
      {
        "power": 0,
        "formula": "0.037500000000000006"
      }
    ],
    "ParagonNodeCritDamageToVulnerable_Magic": [
      {
        "power": 0,
        "formula": "0.037500000000000006"
      }
    ],
    "ParagonNodeCritDamageToVulnerable_RareMajor": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeCritDamageToVulnerable_RareMinor": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeDamageBonusBerserk_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusBerserk_RareMinor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeCritChanceBySkillTag_RareMajor": [
      {
        "power": 0,
        "formula": "0.010000000000000002"
      }
    ],
    "ParagonNodeDamageBonusBerserk_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeCritDamageToCC_RareMinor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeCritDamageToCC_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeCritDamageToNear_RareMinor": [
      {
        "power": 0,
        "formula": "0.09000000000000001"
      }
    ],
    "ParagonNodeCritDamageToNear_RareMajor": [
      {
        "power": 0,
        "formula": "0.09000000000000001"
      }
    ],
    "ParagonNodeCritDamageToFar_RareMinor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeCritDamageToFar_RareMajor": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "ParagonNodeCritDamageToFar_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeCritDamageToNear_Magic": [
      {
        "power": 0,
        "formula": "0.045000000000000005"
      }
    ],
    "ParagonNodeCritDamageToCC_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeHealingBonus_Magic": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeHealingBonus_RareMajor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeHealingBonus_RareMinor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodePotionHealingBonus_RareMinor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodePotionHealingBonus_RareMajor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodePotionHealingBonus_Magic": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonNodeCritDamageImbued_RareMinor": [
      {
        "power": 0,
        "formula": "0.125"
      }
    ],
    "ParagonNodeCritDamageImbued_RareMajor": [
      {
        "power": 0,
        "formula": "0.125"
      }
    ],
    "ParagonNodeCritDamageImbued_Magic": [
      {
        "power": 0,
        "formula": "0.0625"
      }
    ],
    "ParagonNodeCritDamage_Magic": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeThorns_RareMajor": [
      {
        "power": 0,
        "formula": "0.75"
      }
    ],
    "ParagonNodeCritDamage_RareMajor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeThorns_Magic": [
      {
        "power": 0,
        "formula": "0.375"
      }
    ],
    "ParagonNodeThorns_RareMinor": [
      {
        "power": 0,
        "formula": "0.75"
      }
    ],
    "ParagonNodeCritDamage_RareMinor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeDamageBonusToCC_RareMinor": [
      {
        "power": 0,
        "formula": "0.17500000000000002"
      }
    ],
    "ParagonNodeCCDuration_RareMinor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeCCDuration_RareMajor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeCCDuration_Magic": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeCCDurationReduction_RareMajor": [
      {
        "power": 0,
        "formula": "0.12"
      }
    ],
    "ParagonNodeCCDurationReduction_RareMinor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeCCDurationReduction_Magic": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeExecute_RareMinor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeExecute_RareMajor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeExecute_Magic": [
      {
        "power": 0,
        "formula": "0.025"
      }
    ],
    "ParagonNodeHealingOnPickBloodOrb_RareMinor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeHealingOnPickBloodOrb_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeHealingOnPickBloodOrb_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeChillBonus_RareMinor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeChillBonus_RareMajor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeChillBonus_Magic": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeDamageReductionFromFar_Magic": [
      {
        "power": 0,
        "formula": "0.045"
      }
    ],
    "ParagonNodeDamageReductionFromFar_RareMinor": [
      {
        "power": 0,
        "formula": "0.09"
      }
    ],
    "ParagonNodeDamageReductionFromFar_RareMajor": [
      {
        "power": 0,
        "formula": "0.09"
      }
    ],
    "ParagonNodeDamageBonusToFar_RareMinor": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "ParagonNodeDamageBonusToFar_RareMajor": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "ParagonNodeDamageReductionWhileHealthy_Magic": [
      {
        "power": 0,
        "formula": "0.035"
      }
    ],
    "ParagonNodeDamageReductionWhileHealthy_RareMajor": [
      {
        "power": 0,
        "formula": "0.07"
      }
    ],
    "ParagonNodeDamageReductionWhileHealthy_RareMinor": [
      {
        "power": 0,
        "formula": "0.07"
      }
    ],
    "ParagonNodeDamageReductionFromNear_Magic": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeDamageReductionFromNear_RareMajor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeDamageReductionFromNear_RareMinor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeDamageBonusToNear_RareMinor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeDamageBonusToNear_RareMajor": [
      {
        "power": 0,
        "formula": "0.12"
      }
    ],
    "ParagonNodeDamageBonusToNear_Magic": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeDamageBonusToFar_Magic": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonusAbyss_RareMajor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeDamageBonusAbyss_RareMinor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeDamageBonusAbyss_Magic": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeDamageBonusHellfire_RareMajor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeDamageBonusHellfire_RareMinor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeDamageBonusHellfire_Magic": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeDamageBonusConjuration_RareMajor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeDamageBonusConjuration_RareMinor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeDamageBonusConjuration_Magic": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeDamageBonusAgility_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusAgility_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonusAgility_RareMinor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonusToTrapped_RareMinor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusToTrapped_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonusToTrapped_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageReductionFromTrapped_RareMajor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeDamageReductionFromTrapped_RareMinor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeDamageReductionFromTrapped_Magic": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeDamageBonusToCC_Magic": [
      {
        "power": 0,
        "formula": "0.08750000000000001"
      }
    ],
    "ParagonNodeDamageBonusToCC_RareMajor": [
      {
        "power": 0,
        "formula": "0.17500000000000002"
      }
    ],
    "ParagonNodeDamageBonusToElite_RareMinor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeDamageBonusToVulnerable_RareMajor": [
      {
        "power": 0,
        "formula": "0.125"
      }
    ],
    "ParagonNodeDamageBonusToVulnerable_Magic": [
      {
        "power": 0,
        "formula": "0.0625"
      }
    ],
    "ParagonNodeDamageBonusToVulnerable_RareMinor": [
      {
        "power": 0,
        "formula": "0.125"
      }
    ],
    "ParagonNodeLuckyHitBonus_RareMajor": [
      {
        "power": 0,
        "formula": "0.025"
      }
    ],
    "ParagonNodeCritChance_RareMinor": [
      {
        "power": 0,
        "formula": "0.010000000000000002"
      }
    ],
    "ParagonNodeBlockChance_RareMinor": [
      {
        "power": 0,
        "formula": "0.025"
      }
    ],
    "ParagonNodeLuckyHitBonus_RareMinor": [
      {
        "power": 0,
        "formula": "0.025"
      }
    ],
    "ParagonNodeLuckyHitBonus_Magic": [
      {
        "power": 0,
        "formula": "0.0125"
      }
    ],
    "ParagonNodeDamageBonusToLowHP_RareMinor": [
      {
        "power": 0,
        "formula": "0.125"
      }
    ],
    "ParagonNodeBarrierDamage_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusToLowHP_Magic": [
      {
        "power": 0,
        "formula": "0.0625"
      }
    ],
    "ParagonNodeDamageBonusToLowHP_RareMajor": [
      {
        "power": 0,
        "formula": "0.125"
      }
    ],
    "ParagonNodeDamageBonusToDotted_RareMinor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusToDotted_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusToDotted_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonusDot_Magic": [
      {
        "power": 0,
        "formula": "0.07500000000000001"
      }
    ],
    "ParagonNodeDamageBonusDot_RareMajor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeDamageBonusDot_RareMinor": [
      {
        "power": 0,
        "formula": "0.15000000000000002"
      }
    ],
    "ParagonNodeDamageBonus_RareMinor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageReductionFromCC_RareMinor": [
      {
        "power": 0,
        "formula": "0.09"
      }
    ],
    "ParagonNodeDamageReductionFromCC_RareMajor": [
      {
        "power": 0,
        "formula": "0.09"
      }
    ],
    "ParagonNodeDamageReductionFromElite_RareMinor": [
      {
        "power": 0,
        "formula": "0.065"
      }
    ],
    "ParagonNodeDamageReductionFromElite_RareMajor": [
      {
        "power": 0,
        "formula": "0.065"
      }
    ],
    "ParagonNodeDamageReductionFromVulnerable_RareMinor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageReductionFromVulnerable_RareMajor_Sorc": [
      {
        "power": 0,
        "formula": "0.07"
      }
    ],
    "ParagonNodeDamageReductionFromVulnerable_RareMajor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeDamageReductionWhileCC_RareMinor": [
      {
        "power": 0,
        "formula": "0.066668"
      }
    ],
    "ParagonNodeDamageReductionWhileCC_RareMajor": [
      {
        "power": 0,
        "formula": "0.066668"
      }
    ],
    "ParagonNodeDamageReductionWhileFortified_RareMinor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeDamageReductionWhileFortified_RareMajor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeDamageReductionWhileStanding_Magic": [
      {
        "power": 0,
        "formula": "0.026666"
      }
    ],
    "ParagonNodeDamageReductionWhileStanding_RareMinor": [
      {
        "power": 0,
        "formula": "0.053332"
      }
    ],
    "ParagonNodeDamageReductionWhileMoving_RareMinor": [
      {
        "power": 0,
        "formula": "0.053332"
      }
    ],
    "ParagonNodeDamageReductionWhileMoving_RareMajor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeDamageReductionWhileStanding_RareMajor": [
      {
        "power": 0,
        "formula": "0.053332"
      }
    ],
    "ParagonNodeDamageReductionWhileFortified_Magic": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeDamageReductionWhileCC_Magic": [
      {
        "power": 0,
        "formula": "0.033334"
      }
    ],
    "ParagonNodeDamageReductionFromVulnerable_Magic": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeDamageReductionFromElite_Magic": [
      {
        "power": 0,
        "formula": "0.0325"
      }
    ],
    "ParagonNodeDamageReductionFromCC_Magic": [
      {
        "power": 0,
        "formula": "0.045"
      }
    ],
    "ParagonNodeDamageReductionFromDotted_Magic": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeDamageReductionFromDotted_RareMajor_Sorc": [
      {
        "power": 0,
        "formula": "0.07"
      }
    ],
    "ParagonNodeDamageReductionFromDotted_RareMajor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeDodgeDamageDuration": [
      {
        "power": 0,
        "formula": "4"
      }
    ],
    "ParagonNodeDamageReductionFromDotted_RareMinor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeDamageReduction_RareMinor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeDamageReductionPet_RareMinor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeDamageReductionPet_RareMajor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeDamageReductionPet_Magic": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeDamageReduction_Magic": [
      {
        "power": 0,
        "formula": "0.025"
      }
    ],
    "ParagonNodeBarrierPotency_Magic": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeDamageReductionFromDot_RareMinor": [
      {
        "power": 0,
        "formula": "0.065"
      }
    ],
    "ParagonNodeDamageReductionFromDot_Magic": [
      {
        "power": 0,
        "formula": "0.0325"
      }
    ],
    "ParagonNodeDamageReductionFromDot_RareMajor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageReductionOnPetCrit_RareMinor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeDamageReductionOnPetCrit_RareMajor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeDamageReduction_RareMajor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeBarrierDamage_RareMinor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeBarrierDamage_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeBarrierPotency_RareMajor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeResistance_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeResistAllPet_RareMinor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeResistAllPet_RareMajor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeMaxLifePetSingle_Magic": [
      {
        "power": 0,
        "formula": "0.07"
      }
    ],
    "ParagonNodeMaxLifePetSingle_RareMajor": [
      {
        "power": 0,
        "formula": "0.14"
      }
    ],
    "ParagonNodeMaxLifePetSingle_RareMinor": [
      {
        "power": 0,
        "formula": "0.14"
      }
    ],
    "ParagonNodeResistAllPetSingle_RareMinor": [
      {
        "power": 0,
        "formula": "0.16"
      }
    ],
    "ParagonNodeResistAllPetSingle_RareMajor": [
      {
        "power": 0,
        "formula": "0.16"
      }
    ],
    "ParagonNodeResistAllPetSingle_Magic": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeResistAllPet_Magic": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeResistAll_Magic": [
      {
        "power": 0,
        "formula": "0.015"
      }
    ],
    "ParagonNodeResistAll_RareMajor": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeResourceOnKill_RareMinor": [
      {
        "power": 0,
        "formula": "2"
      }
    ],
    "ParagonNodeResourceOnKill_RareMajor": [
      {
        "power": 0,
        "formula": "2"
      }
    ],
    "ParagonNodeResourceOnKill_Magic": [
      {
        "power": 0,
        "formula": "1"
      }
    ],
    "ParagonNodeResistAll_RareMinor": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeDodge_RareMinor": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonNodeDodge_RareMajor": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonNodeResistance_RareMajor": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeResistance_RareMinor": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonNodeDamageBonusOverpower_RareMinor": [
      {
        "power": 0,
        "formula": "0.020000000000000004"
      }
    ],
    "ParagonNodeDamageBonusOverpower_Magic": [
      {
        "power": 0,
        "formula": "0.010000000000000002"
      }
    ],
    "ParagonNodeDamageBonusOverpower_RareMajor": [
      {
        "power": 0,
        "formula": "0.020000000000000004"
      }
    ],
    "ParagonNodeDamageBonusWhileFortified_RareMinor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeFortifyBonus_RareMinor": [
      {
        "power": 0,
        "formula": "0.032"
      }
    ],
    "ParagonNodeFortifyBonus_Magic": [
      {
        "power": 0,
        "formula": "0.016"
      }
    ],
    "ParagonNodeFortifyBonus_RareMajor": [
      {
        "power": 0,
        "formula": "0.032"
      }
    ],
    "ParagonNodeDamageBonusWhileStanding_RareMinor": [
      {
        "power": 0,
        "formula": "0.066665"
      }
    ],
    "ParagonNodeDamageBonusWhileStanding_RareMajor": [
      {
        "power": 0,
        "formula": "0.066665"
      }
    ],
    "ParagonNodeDamageBonusWhileStanding_Magic": [
      {
        "power": 0,
        "formula": "0.0333325"
      }
    ],
    "ParagonNodeDamageBonusToHealthy_Magic": [
      {
        "power": 0,
        "formula": "0.0625"
      }
    ],
    "ParagonNodeDamageBonusToHealthy_RareMinor": [
      {
        "power": 0,
        "formula": "0.125"
      }
    ],
    "ParagonNodeDamageBonusToHealthy_RareMajor": [
      {
        "power": 0,
        "formula": "0.125"
      }
    ],
    "ParagonNodeDamageBonusWhileHealthy_RareMinor": [
      {
        "power": 0,
        "formula": "0.125"
      }
    ],
    "ParagonNodeDamageBonusWhileHealthy_RareMajor": [
      {
        "power": 0,
        "formula": "0.125"
      }
    ],
    "ParagonNodeDamageBonusWhileHealthy_Magic": [
      {
        "power": 0,
        "formula": "0.0625"
      }
    ],
    "ParagonNodeAttackSpeedWhileFortified_RareMinor": [
      {
        "power": 0,
        "formula": "0.0125"
      }
    ],
    "ParagonNodeAttackSpeedWhileFortified_RareMajor": [
      {
        "power": 0,
        "formula": "0.0125"
      }
    ],
    "ParagonNodeAttackSpeedWhileFortified_Magic": [
      {
        "power": 0,
        "formula": "0.00625"
      }
    ],
    "ParagonNodeDamageBonusWhileFortified_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeDamageBonusWhileFortified_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeCracklingEnergyDamageBonus_Magic": [
      {
        "power": 0,
        "formula": "0.1125"
      }
    ],
    "ParagonNodeCracklingEnergyDamageBonus_RareMinor": [
      {
        "power": 0,
        "formula": "0.225"
      }
    ],
    "ParagonNodeCracklingEnergyDamageBonus_RareMajor": [
      {
        "power": 0,
        "formula": "0.225"
      }
    ],
    "ParagonNodeDamageBonusInDemonform_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonus_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeResourceBonus_Magic": [
      {
        "power": 0,
        "formula": "2"
      }
    ],
    "ParagonNodeResourceRegen_RareMinor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeResourceRegen_RareMajor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeEssenceRegen_Magic": [
      {
        "power": 0,
        "formula": "0.0625"
      }
    ],
    "ParagonNodeResourceRegen_Magic": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonNodeCDRSkillCat_RareMinor": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeCDRSkillCat_RareMajor": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeCDR_RareMinor": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonNodeCDR_RareMajor": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonNodeDodgeChance_Magic": [
      {
        "power": 0,
        "formula": "0.01"
      }
    ],
    "ParagonNodeCDR_Magic": [
      {
        "power": 0,
        "formula": "0.01"
      }
    ],
    "ParagonNodeCDRSkillCat_Magic": [
      {
        "power": 0,
        "formula": "0.015"
      }
    ],
    "ParagonNodeDamageReductionFromShout_RareMinor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeDamageReductionFromShout_RareMajor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeDamageReductionFromShout_Magic": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeCritChance_Magic": [
      {
        "power": 0,
        "formula": "0.01"
      }
    ],
    "ParagonNodeCoreStat_Magic": [
      {
        "power": 0,
        "formula": "7"
      }
    ],
    "ParagonNodeCoreStat_RareMinor": [
      {
        "power": 0,
        "formula": "10"
      }
    ],
    "ParagonNodeLifeOnHit_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeLifeOnHit_RareMajor": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "ParagonNodeCoreStat_RareMajor": [
      {
        "power": 0,
        "formula": "10"
      }
    ],
    "ParagonNodeCoreStat_Normal": [
      {
        "power": 0,
        "formula": "5"
      }
    ],
    "ParagonNodeShoutDuration_RareMinor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeShoutDuration_RareMajor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeShoutDuration_Magic": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeAttackSpeedPet_RareMajor": [
      {
        "power": 0,
        "formula": "0.025"
      }
    ],
    "ParagonNodeAttackSpeedPet_Magic": [
      {
        "power": 0,
        "formula": "0.0125"
      }
    ],
    "ParagonNodeAttackSpeedPet_RareMinor": [
      {
        "power": 0,
        "formula": "0.025"
      }
    ],
    "ParagonNodeArmorBonusPet_RareMinor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeArmorBonusPetSingle_Magic": [
      {
        "power": 0,
        "formula": "0.07"
      }
    ],
    "ParagonNodeArmorBonusPetSingle_RareMinor": [
      {
        "power": 0,
        "formula": "0.14"
      }
    ],
    "ParagonNodeArmorBonusPetSingle_RareMajor": [
      {
        "power": 0,
        "formula": "0.14"
      }
    ],
    "ParagonNodeArmorBonusPet_RareMajor": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "ParagonNodeArmorBonusPet_Magic": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeArmorBonusWithActivePet_RareMinor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeArmorBonusWithActivePet_RareMajor": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "ParagonNodeArmorBonusWithActivePet_Magic": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeArmorBonus_Magic": [
      {
        "power": 0,
        "formula": "0.015"
      }
    ],
    "ParagonNodeArmorBonus_RareMajor": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeAttackSpeedBySkillTag_RareMinor": [
      {
        "power": 0,
        "formula": "0.025"
      }
    ],
    "ParagonNodeAttackSpeed_RareMinor": [
      {
        "power": 0,
        "formula": "0.0125"
      }
    ],
    "ParagonNodeMoveSpeedEliteKillDuration": [
      {
        "power": 0,
        "formula": "4"
      }
    ],
    "ParagonNodeMoveSpeedEliteKill_RareMinor": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "ParagonNodeMoveSpeed_RareMajor": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "ParagonNodeMoveSpeedEliteKill_RareMajor": [
      {
        "power": 0,
        "formula": "0.14"
      }
    ],
    "ParagonNodeMoveSpeedEliteKill_Magic": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeAttackSpeedAfterDodge_RareMinor": [
      {
        "power": 0,
        "formula": "0.0125"
      }
    ],
    "ParagonNodeDamageBonusAfterDodge_Magic": [
      {
        "power": 0,
        "formula": "0.03125"
      }
    ],
    "ParagonNodeDamageBonusAfterDodge_RareMinor": [
      {
        "power": 0,
        "formula": "0.0625"
      }
    ],
    "ParagonNodeDamageBonusAfterDodge_RareMajor": [
      {
        "power": 0,
        "formula": "0.0625"
      }
    ],
    "ParagonNodeAttackSpeedAfterDodge_RareMajor": [
      {
        "power": 0,
        "formula": "0.0125"
      }
    ],
    "ParagonNodeAttackSpeedAfterDodge_Magic": [
      {
        "power": 0,
        "formula": "0.00625"
      }
    ],
    "ParagonNodeAttackSpeed_Magic": [
      {
        "power": 0,
        "formula": "0.00625"
      }
    ],
    "ParagonNodeAttackSpeedBySkillTag_Magic": [
      {
        "power": 0,
        "formula": "0.0125"
      }
    ],
    "ParagonNodeAttackSpeed_RareMajor": [
      {
        "power": 0,
        "formula": "0.0125"
      }
    ],
    "ParagonNodeArmorBonusFlat_RareMinor": [
      {
        "power": 0,
        "formula": "30"
      }
    ],
    "ParagonNodeArmorBonusFlat_RareMajor": [
      {
        "power": 0,
        "formula": "30"
      }
    ],
    "ParagonNodeArmorBonusFlatResistance_RareMajor": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeArmorBonusFlatResistance_RareMinor": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "ParagonNodeArmorBonusFlatResistance_Magic": [
      {
        "power": 0,
        "formula": "1.5"
      }
    ],
    "ParagonNodeArmorBonusFlat_Magic": [
      {
        "power": 0,
        "formula": "15"
      }
    ],
    "ParagonNodeArmorBonus_RareMinor": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonGlyphAdditive_Magic_StatMain": [
      {
        "power": 0,
        "formula": "0.001"
      }
    ],
    "ParagonGlyphAdditive_Magic_StatSide": [
      {
        "power": 0,
        "formula": "0.0015"
      }
    ],
    "ParagonGlyphAdditive_Rare_Vampiric_1": [
      {
        "power": 0,
        "formula": "0.000066"
      }
    ],
    "ParagonGlyphAdditive_Rare_Vampiric": [
      {
        "power": 0,
        "formula": "0.002"
      }
    ],
    "ParagonGlyphAdditive_Rare_StatMain": [
      {
        "power": 0,
        "formula": "0.00132"
      }
    ],
    "ParagonGlyphAdditive_Rare_StatSide": [
      {
        "power": 0,
        "formula": "0.00198"
      }
    ],
    "ParagonGlyphAdditive_Rare_BonusToNodes_Vampiric": [
      {
        "power": 0,
        "formula": "0.05+Floor(ParagonGetGlyphLevel(1720059)/10)*0.01"
      }
    ],
    "ParagonGlyphAdditive_Legendary_BonusToAllNodes": [
      {
        "power": 0,
        "formula": "0.0005"
      }
    ],
    "ParagonGlyphAdditive_Rare_BonusToNodes": [
      {
        "power": 0,
        "formula": "0.001"
      }
    ],
    "CraftingScalingSeneschalStones": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 240,
        "formula": "1.1"
      },
      {
        "power": 280,
        "formula": "1.15"
      },
      {
        "power": 320,
        "formula": "1.2"
      },
      {
        "power": 360,
        "formula": "1.25"
      },
      {
        "power": 400,
        "formula": "1.3"
      },
      {
        "power": 440,
        "formula": "1.4"
      },
      {
        "power": 480,
        "formula": "1.45"
      },
      {
        "power": 520,
        "formula": "1.5"
      },
      {
        "power": 560,
        "formula": "1.6"
      },
      {
        "power": 600,
        "formula": "1.65"
      },
      {
        "power": 660,
        "formula": "1.7"
      },
      {
        "power": 720,
        "formula": "1.8"
      },
      {
        "power": 800,
        "formula": "1.85"
      },
      {
        "power": 840,
        "formula": "1.9"
      },
      {
        "power": 900,
        "formula": "2"
      }
    ],
    "CraftingScalingGoldItemUpgrade": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 240,
        "formula": "1.2"
      },
      {
        "power": 280,
        "formula": "1.4"
      },
      {
        "power": 320,
        "formula": "1.6"
      },
      {
        "power": 360,
        "formula": "1.8"
      },
      {
        "power": 400,
        "formula": "2"
      },
      {
        "power": 440,
        "formula": "2.2"
      },
      {
        "power": 480,
        "formula": "2.4"
      },
      {
        "power": 520,
        "formula": "2.6"
      },
      {
        "power": 560,
        "formula": "2.8"
      },
      {
        "power": 600,
        "formula": "3"
      },
      {
        "power": 660,
        "formula": "3.2"
      },
      {
        "power": 720,
        "formula": "3.4"
      },
      {
        "power": 800,
        "formula": "3.6"
      },
      {
        "power": 840,
        "formula": "3.8"
      },
      {
        "power": 900,
        "formula": "4"
      }
    ],
    "legendary_sorc_106_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.25)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.25)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.25)*1.5"
      }
    ],
    "1HSword_Unique_Generic_001_damage_scaling": [
      {
        "power": 0,
        "formula": "1.3"
      },
      {
        "power": 750,
        "formula": "1.625"
      },
      {
        "power": 800,
        "formula": "1.9500000000000002"
      }
    ],
    "Helm_Unique_Generic_001_damage_scaling": [
      {
        "power": 0,
        "formula": "2.25"
      },
      {
        "power": 750,
        "formula": "2.8125"
      },
      {
        "power": 800,
        "formula": "3.375"
      }
    ],
    "Helm_Unique_Druid_101_fortify_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,0.002,0.004)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,0.002,0.004)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,0.002,0.004)*1.5"
      }
    ],
    "Chest_Unique_Generic_100_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,2,2.75)/4"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,2,2.75)*1.25/4"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,2,2.75)*1.5/4"
      }
    ],
    "Boots_Unique_Necro_100_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(6,0.3,0.42)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(6,0.3,0.42)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(6,0.3,0.42)*1.5"
      }
    ],
    "Amulet_Unique_Sorc_100_damage_scaling": [
      {
        "power": 0,
        "formula": "RandomInt(62,80)/100"
      },
      {
        "power": 750,
        "formula": "RandomInt(62,80)/100*1.25"
      },
      {
        "power": 800,
        "formula": "RandomInt(62,80)/100*1.5"
      }
    ],
    "Amulet_Unique_Necro_100_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(5,0.15,0.2)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(5,0.15,0.2)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(5,0.15,0.2)*1.5"
      }
    ],
    "2HSword_Unique_Barb_002_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(8,0.22,0.38)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(8,0.22,0.38)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(8,0.22,0.38)*1.5"
      }
    ],
    "2HMace_Unique_Barb_001_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(5,0.85,1.1)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(5,0.85,1.1)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(5,0.85,1.1)*1.5"
      }
    ],
    "Helm_Unique_Necro_100_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,0.25,0.35)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,0.25,0.35)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,0.25,0.35)*1.5"
      }
    ],
    "legendary_barb_002_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRangeWithInterval(0,15,0.53,0.83)"
      },
      {
        "power": 750,
        "formula": "FloatRangeWithInterval(0,15,0.53,0.83)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRangeWithInterval(0,15,0.53,0.83)*1.5"
      }
    ],
    "legendary_barb_017_fortify_scaling": [
      {
        "power": 0,
        "formula": "0.0028+CurrentLegendaryRank()*0.0023"
      },
      {
        "power": 750,
        "formula": "(0.0028+CurrentLegendaryRank()*0.0023)*1.25"
      },
      {
        "power": 800,
        "formula": "(0.0028+CurrentLegendaryRank()*0.0023)*1.5"
      }
    ],
    "legendary_barb_018_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,1.5,1.8)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,1.5,1.8)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,1.5,1.8)*1.5"
      }
    ],
    "legendary_barb_019_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.17,0.32)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.17,0.32)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.17,0.32)*1.5"
      }
    ],
    "legendary_barb_023_damage_scaling": [
      {
        "power": 0,
        "formula": "0.6900001+CurrentLegendaryRank()*0.01"
      },
      {
        "power": 750,
        "formula": "(0.6900001+CurrentLegendaryRank()*0.01)*1.25"
      },
      {
        "power": 800,
        "formula": "(0.6900001+CurrentLegendaryRank()*0.01)*1.5"
      }
    ],
    "legendary_barb_026_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRangeWithInterval(0,15,0.7,0.85)"
      },
      {
        "power": 750,
        "formula": "FloatRangeWithInterval(0,15,0.7,0.85)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRangeWithInterval(0,15,0.7,0.85)*1.5"
      }
    ],
    "legendary_barb_027_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.17,0.32)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.17,0.32)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.17,0.32)*1.5"
      }
    ],
    "legendary_barb_055_fortify_scaling": [
      {
        "power": 0,
        "formula": "0.16+CurrentLegendaryRank()*0.05"
      },
      {
        "power": 750,
        "formula": "(0.16+CurrentLegendaryRank()*0.05)*1.25"
      },
      {
        "power": 800,
        "formula": "(0.16+CurrentLegendaryRank()*0.05)*1.5"
      }
    ],
    "Legendary_Rogue_125_barrier_scaling": [
      {
        "power": 0,
        "formula": "0.055+(CurrentLegendaryRank()-1)*0.0225"
      },
      {
        "power": 750,
        "formula": "(0.055+(CurrentLegendaryRank()-1)*0.0225)*1.25"
      },
      {
        "power": 800,
        "formula": "(0.055+(CurrentLegendaryRank()-1)*0.0225)*1.5"
      }
    ],
    "legendary_generic_011_barrier_scaling": [
      {
        "power": 0,
        "formula": "0.75+(CurrentLegendaryRank()-1)*0.3"
      },
      {
        "power": 590,
        "formula": "(0.75+(CurrentLegendaryRank()-1)*0.3)*1.25"
      },
      {
        "power": 750,
        "formula": "(0.75+(CurrentLegendaryRank()-1)*0.3)*1.5"
      }
    ],
    "legendary_generic_117_armor_scaling": [
      {
        "power": 0,
        "formula": "(10+(CurrentLegendaryRank()-1)*0.2)*0.1"
      },
      {
        "power": 750,
        "formula": "(10+(CurrentLegendaryRank()-1)*0.2)*0.1"
      },
      {
        "power": 800,
        "formula": "(8.88+(CurrentLegendaryRank()-1)*0.2)*0.1"
      }
    ],
    "legendary_barb_105_fortify_scaling": [
      {
        "power": 0,
        "formula": "0.09+CurrentLegendaryRank()*0.05"
      },
      {
        "power": 750,
        "formula": "(0.09+CurrentLegendaryRank()*0.05)*1.25"
      },
      {
        "power": 800,
        "formula": "(0.09+CurrentLegendaryRank()*0.05)*1.5"
      }
    ],
    "Legendary_Barb_108_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.28,0.38)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.28,0.38)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.28,0.38)*1.5"
      }
    ],
    "Legendary_Barb_109_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.23,0.38)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.23,0.38)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.23,0.38)*1.5"
      }
    ],
    "legendary_druid_026_barrier_scaling": [
      {
        "power": 0,
        "formula": "0.055+(CurrentLegendaryRank()-1)*0.018"
      },
      {
        "power": 750,
        "formula": "(0.055+(CurrentLegendaryRank()-1)*0.018)*1.25"
      },
      {
        "power": 800,
        "formula": "(0.055+(CurrentLegendaryRank()-1)*0.018)*1.5"
      }
    ],
    "legendary_druid_028_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRangeWithInterval(0,15,0.7,1)"
      },
      {
        "power": 750,
        "formula": "FloatRangeWithInterval(0,15,0.7,1)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRangeWithInterval(0,15,0.7,1)*1.5"
      }
    ],
    "Ring_Unique_Druid_003_heal_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(20,0.1,0.5)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(20,0.1,0.5)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(20,0.1,0.5)*1.5"
      }
    ],
    "legendary_rogue_108_heal_scaling": [
      {
        "power": 0,
        "formula": "0.05+(CurrentLegendaryRank()-1)*0.002"
      },
      {
        "power": 750,
        "formula": "(0.05+(CurrentLegendaryRank()-1)*0.002)*1.25"
      },
      {
        "power": 800,
        "formula": "(0.05+(CurrentLegendaryRank()-1)*0.002)*1.5"
      }
    ],
    "legendary_rogue_104_heal_scaling": [
      {
        "power": 0,
        "formula": "0.06+(CurrentLegendaryRank()-1)*0.015"
      },
      {
        "power": 750,
        "formula": "(0.06+(CurrentLegendaryRank()-1)*0.015)*1.25"
      },
      {
        "power": 800,
        "formula": "(0.06+(CurrentLegendaryRank()-1)*0.015)*1.5"
      }
    ],
    "legendary_generic_065_health_scaling": [
      {
        "power": 0,
        "formula": "0.005+(CurrentLegendaryRank()-1)*0.001"
      },
      {
        "power": 750,
        "formula": "(0.005+(CurrentLegendaryRank()-1)*0.001)*1.25"
      },
      {
        "power": 800,
        "formula": "(0.005+(CurrentLegendaryRank()-1)*0.001)*1.5"
      }
    ],
    "legendary_druid_042_health_scaling": [
      {
        "power": 0,
        "formula": "0.06+(CurrentLegendaryRank()-1)*0.004"
      },
      {
        "power": 750,
        "formula": "(0.06+(CurrentLegendaryRank()-1)*0.004)*1.25"
      },
      {
        "power": 800,
        "formula": "(0.06+(CurrentLegendaryRank()-1)*0.004)*1.5"
      }
    ],
    "legendary_druid_066_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.35,0.5)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.35,0.5)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.35,0.5)*1.5"
      }
    ],
    "legendary_druid_111_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,1.4,1.8)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,1.4,1.8)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,1.4,1.8)*1.5"
      }
    ],
    "Legendary_Druid_115_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.65,0.8)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.65,0.8)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.65,0.8)*1.5"
      }
    ],
    "legendary_necro_032_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.24,0.31)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.24,0.31)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.24,0.31)*1.5"
      }
    ],
    "legendary_necro_023_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.5,0.6)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.5,0.6)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.5,0.6)*1.5"
      }
    ],
    "Legendary_Necro_121_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.43,0.48)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.43,0.48)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.43,0.48)*1.5"
      }
    ],
    "legendary_necro_038_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.045,0.06)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.045,0.06)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.045,0.06)*1.5"
      }
    ],
    "legendary_rogue_013_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.26,0.35)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.26,0.35)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.26,0.35)*1.5"
      }
    ],
    "legendary_rogue_018_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.1,0.2)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.1,0.2)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.1,0.2)*1.5"
      }
    ],
    "legendary_rogue_019_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.3)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.3)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.3)*1.5"
      }
    ],
    "legendary_rogue_020_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.28,0.55)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.28,0.55)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.28,0.55)*1.5"
      }
    ],
    "legendary_rogue_023_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.3)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.3)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.3)*1.5"
      }
    ],
    "legendary_rogue_024_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.3,0.48)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.3,0.48)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.3,0.48)*1.5"
      }
    ],
    "legendary_rogue_028_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,1.08,1.35)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,1.08,1.35)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,1.08,1.35)*1.5"
      }
    ],
    "legendary_rogue_029_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,1.25,1.52)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,1.25,1.52)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,1.25,1.52)*1.5"
      }
    ],
    "legendary_rogue_109_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.6,0.9)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.6,0.9)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.6,0.9)*1.5"
      }
    ],
    "legendary_sorc_043_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.25,0.4)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.25,0.4)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.25,0.4)*1.5"
      }
    ],
    "legendary_sorc_107_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.25,0.35)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.25,0.35)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.25,0.35)*1.5"
      }
    ],
    "legendary_sorc_116_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.3,0.4)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.3,0.4)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.3,0.4)*1.5"
      }
    ],
    "Ring_Unique_Sorc_100_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,0.25,0.35)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,0.25,0.35)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,0.25,0.35)*1.5"
      }
    ],
    "legendary_sorc_109_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.25,0.35)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.25,0.35)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.25,0.35)*1.5"
      }
    ],
    "Ring_Unique_Generic_102_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,5,6)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,5,6)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,5,6)*1.5"
      }
    ],
    "Ring_Unique_Necro_100_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,3,4)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,3,4)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,3,4)*1.5"
      }
    ],
    "1HWand_Unique_Sorc_100_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,0.2,0.3)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,0.2,0.3)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,0.2,0.3)*1.5"
      }
    ],
    "1HSword_Unique_Barb_102_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,0.75,1.5)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,0.75,1.5)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,0.75,1.5)*1.5"
      }
    ],
    "1HMace_Unique_Druid_001_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,0.5,1)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,0.5,1)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,0.5,1)*1.5"
      }
    ],
    "legendary_rogue_127_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.3)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.3)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,0.2,0.3)*1.5"
      }
    ],
    "AffixPercentage4.5x (Flat)": [
      {
        "power": 0,
        "formula": "0.07+0.0004705882352941176*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.62+0.00125*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "1.309"
      },
      {
        "power": 800,
        "formula": "1.9635"
      }
    ],
    "InherentAffixUncommonConditional": [
      {
        "power": 0,
        "formula": "0.045+0.00014705882352941175*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.28+0.000375*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.5"
      },
      {
        "power": 800,
        "formula": "0.65"
      }
    ],
    "InherentAffixCommonConditional": [
      {
        "power": 0,
        "formula": "0.015+0.00014705882352941175*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.18+0.000375*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.33"
      },
      {
        "power": 800,
        "formula": "0.5"
      }
    ],
    "AffixPercentage1.4x (Flat)": [
      {
        "power": 0,
        "formula": "0.015+0.00014705882352941175*(IPower()-10)"
      },
      {
        "power": 590,
        "formula": "0.18+0.000375*(IPower()-590)"
      },
      {
        "power": 750,
        "formula": "0.3825"
      },
      {
        "power": 800,
        "formula": "0.57375"
      }
    ],
    "legendary_druid_010_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRangeWithInterval(0,15,0.75,1.25)"
      },
      {
        "power": 750,
        "formula": "FloatRangeWithInterval(0,15,0.75,1.25)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRangeWithInterval(0,15,0.75,1.25)*1.5"
      }
    ],
    "legendary_generic_121_damage_scaling": [
      {
        "power": 0,
        "formula": "1.5+(CurrentLegendaryRank()-1)*0.1"
      },
      {
        "power": 750,
        "formula": "(1.5+(CurrentLegendaryRank()-1)*0.1)*1.25"
      },
      {
        "power": 800,
        "formula": "(1.5+(CurrentLegendaryRank()-1)*0.1)*1.5"
      }
    ],
    "legendary_generic_123_damage_scaling": [
      {
        "power": 0,
        "formula": "0.5+(CurrentLegendaryRank()-1)*0.05"
      },
      {
        "power": 750,
        "formula": "(0.5+(CurrentLegendaryRank()-1)*0.05)*1.25"
      },
      {
        "power": 800,
        "formula": "(0.5+(CurrentLegendaryRank()-1)*0.05)*1.5"
      }
    ],
    "Affix120%_CoreTripled": [
      {
        "power": 0,
        "formula": "RandomInt(30,35+Round(0.029411764705882353*(IPower()-10)))/100"
      },
      {
        "power": 590,
        "formula": "RandomInt(40,45+Round(0.125*(IPower()-590)))/100"
      },
      {
        "power": 750,
        "formula": "RandomInt(60,80)/100"
      },
      {
        "power": 800,
        "formula": "RandomInt(80,100)/100"
      }
    ],
    "Affix80%_CoreDoubled": [
      {
        "power": 0,
        "formula": "RandomInt(30,35+Round(0.029411764705882353*(IPower()-10)))/100"
      },
      {
        "power": 590,
        "formula": "RandomInt(40,45+Round(0.125*(IPower()-590)))/100"
      },
      {
        "power": 750,
        "formula": "RandomInt(60,80)/100"
      },
      {
        "power": 800,
        "formula": "RandomInt(80,100)/100"
      }
    ],
    "Affix75%": [
      {
        "power": 0,
        "formula": "RandomInt(30,35+Round(0.0196078431372549*(IPower()-10)))/100"
      },
      {
        "power": 590,
        "formula": "RandomInt(45,50+Round(0.08333333333333333*(IPower()-590)))/100"
      },
      {
        "power": 750,
        "formula": "RandomInt(60,75)/100"
      },
      {
        "power": 800,
        "formula": "RandomInt(75,90)/100"
      }
    ],
    "Affix60%_OverpowerDoT": [
      {
        "power": 0,
        "formula": "(9+Round(0.052830188679245285*(IPower()-10))+RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(39+Round(0.008333333333333333*(IPower()-590))+RandomInt(1,5+Round(0.041666666666666664*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(44+Round(0.1*(IPower()-750))+RandomInt(1,11))/100"
      },
      {
        "power": 900,
        "formula": "(64+RandomInt(1,11))/100"
      }
    ],
    "Affix50%_CritDamage": [
      {
        "power": 0,
        "formula": "(4+Round(0.04339622641509434*(IPower()-10))+RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(29+Round(0.025*(IPower()-590))+RandomInt(1,5+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(34+Round(0.05*(IPower()-750))+RandomInt(1,8+Round(0.03*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(45+RandomInt(1,11))/100"
      }
    ],
    "Affix40%_CoreVuln": [
      {
        "power": 0,
        "formula": "(9.5+Round(0.026415094339622643*(IPower()-10))+0.5*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(24+Round(0.025*(IPower()-590))+RandomInt(1,5+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(34+Round(0.05*(IPower()-750))+RandomInt(1,8+Round(0.03*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(44+RandomInt(1,11))/100"
      }
    ],
    "Affix40%_SingleResist": [
      {
        "power": 0,
        "formula": "(12+Round(0.017924528301886792*(IPower()-10))+0.5*RandomInt(1,5))/100"
      },
      {
        "power": 590,
        "formula": "(23.5+Round(0.05416666666666667*(IPower()-590))+0.5*RandomInt(1,5+Round(0.025*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(34.5+Round(0.045*(IPower()-750))+0.5*RandomInt(1,8+Round(0.03*(IPower()-750))))/100"
      },
      {
        "power": 800,
        "formula": "(44+RandomInt(1,11))/100"
      }
    ],
    "Affix30%_DamageRegular": [
      {
        "power": 0,
        "formula": "(1.75+Round(0.014150943396226415*(IPower()-10))+0.25*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(9+Round(0.05*(IPower()-590))+RandomInt(1,3+Round(0.016666666666666666*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(19+Round(0.13*(IPower()-750))+RandomInt(1,5))/100"
      },
      {
        "power": 800,
        "formula": "(40+RandomInt(5,8))/100"
      }
    ],
    "Affix25%_Armor": [
      {
        "power": 0,
        "formula": "RandomInt(10,15)/100"
      },
      {
        "power": 590,
        "formula": "RandomInt(15,20)/100"
      },
      {
        "power": 750,
        "formula": "RandomInt(20,25)/100"
      },
      {
        "power": 800,
        "formula": "RandomInt(25,30)/100"
      }
    ],
    "Affix15%": [
      {
        "power": 0,
        "formula": "0.5*RandomInt(12,17+Round(0.00196078431372549*(IPower()-10)))/100"
      },
      {
        "power": 590,
        "formula": "0.5*RandomInt(16,21+Round(0.025*(IPower()-590)))/100"
      },
      {
        "power": 750,
        "formula": "0.5*RandomInt(20,30)/100"
      },
      {
        "power": 800,
        "formula": "0.5*RandomInt(30,38)/100"
      }
    ],
    "Affix10%_ResistAll": [
      {
        "power": 0,
        "formula": "(0.75+Round(0.008490566037735849*(IPower()-10))+0.25*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(5.25+Round(0.016666666666666666*(IPower()-590))+0.25*RandomInt(1,3+Round(0.016666666666666666*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(6.75+Round(0.01*(IPower()-750))+0.25*RandomInt(1,5+Round(0.03*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(8.75+0.25*RandomInt(1,9))/100"
      }
    ],
    "Affix9%_AttackSpeed": [
      {
        "power": 0,
        "formula": "(0.75+Round(0.008490566037735849*(IPower()-10))+0.25*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(6+Round(0.008333333333333333*(IPower()-590))+0.25*RandomInt(1,3+Round(0.016666666666666666*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(7+Round(0.01*(IPower()-750))+0.25*RandomInt(1,5+Round(0.03*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(9+0.25*RandomInt(1,8))/100"
      }
    ],
    "Affix8%_CritChanceLuckRegular": [
      {
        "power": 0,
        "formula": "(1.75+Round(0.0047169811320754715*(IPower()-10))+0.25*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(4.75+Round(0.008333333333333333*(IPower()-590))+0.25*RandomInt(1,5))/100"
      },
      {
        "power": 750,
        "formula": "(7+Round(0.01*(IPower()-750))+0.25*RandomInt(1,5+Round(0.03*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(9+0.25*RandomInt(1,8))/100"
      }
    ],
    "Affix8%_CDReduction": [
      {
        "power": 0,
        "formula": "(0.9+Round(0.004528301886792453*(IPower()-10))+0.1*RandomInt(1,3+Round(0.0037735849056603774*(IPower()-10))))/100"
      },
      {
        "power": 590,
        "formula": "(6+Round(0.008333333333333333*(IPower()-590))+0.1*RandomInt(1,5))/100"
      },
      {
        "power": 750,
        "formula": "(7+Round(0.01*(IPower()-750))+0.1*RandomInt(1,5+Round(0.03*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(9+0.1*RandomInt(1,8))/100"
      }
    ],
    "Affix6%_CritChanceLuckJewelry": [
      {
        "power": 0,
        "formula": "(0.9+Round(0.0033962264150943396*(IPower()-10))+0.1*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(2.8+Round(0.01*(IPower()-590))+0.2*RandomInt(1,5))/100"
      },
      {
        "power": 750,
        "formula": "(3.8+Round(0.012*(IPower()-750))+0.2*RandomInt(1,5))/100"
      },
      {
        "power": 900,
        "formula": "(6+0.2*RandomInt(5,5))/100"
      }
    ],
    "Affix6%_Dodge": [
      {
        "power": 0,
        "formula": "(0.9+Round(0.0033962264150943396*(IPower()-10))+0.1*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(2.75+Round(0.004166666666666667*(IPower()-590))+0.25*RandomInt(1,3+Round(0.016666666666666666*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(3.75+Round(0.02*(IPower()-750))+0.25*RandomInt(1,5))/100"
      }
    ],
    "legendary_generic_124_damage_scaling": [
      {
        "power": 0,
        "formula": "1.5+(CurrentLegendaryRank()-1)*0.75"
      },
      {
        "power": 750,
        "formula": "(1.5+(CurrentLegendaryRank()-1)*0.75)*1.25"
      },
      {
        "power": 800,
        "formula": "(1.5+(CurrentLegendaryRank()-1)*0.75)*1.5"
      }
    ],
    "Pants_Unique_Barb_100_Scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(20,0.7,1.5)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(20,0.7,1.5)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(20,0.7,1.5)*1.5"
      }
    ],
    "CraftingScalingMatsTemperingForgottenSouls": [
      {
        "power": 0,
        "formula": "0"
      },
      {
        "power": 800,
        "formula": "1"
      }
    ],
    "Amulet_Unique_Necro_101": [
      {
        "power": 0,
        "formula": "2+(CurrentLegendaryRank()-1)*0.08"
      },
      {
        "power": 750,
        "formula": "(2+(CurrentLegendaryRank()-1)*0.08)*1.25"
      },
      {
        "power": 800,
        "formula": "(2+(CurrentLegendaryRank()-1)*0.08)*1.5"
      }
    ],
    "AffixEvadeAttackSpeed": [
      {
        "power": 0,
        "formula": "0.08"
      },
      {
        "power": 700,
        "formula": "0.09"
      },
      {
        "power": 800,
        "formula": "0.1"
      }
    ],
    "InherentAffix_2.5_EvadeCDR_Higher": [
      {
        "power": 0,
        "formula": "1.5"
      },
      {
        "power": 700,
        "formula": "2"
      },
      {
        "power": 800,
        "formula": "2.5"
      }
    ],
    "StaticAffix_2to3to4": [
      {
        "power": 0,
        "formula": "2"
      },
      {
        "power": 700,
        "formula": "3"
      },
      {
        "power": 800,
        "formula": "4"
      }
    ],
    "StaticAffix_1to2to3": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 700,
        "formula": "2"
      },
      {
        "power": 800,
        "formula": "3"
      }
    ],
    "StaticAffix_1to2": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 700,
        "formula": "2"
      }
    ],
    "StaticAffix_0.6to0.8to1": [
      {
        "power": 0,
        "formula": "0.6"
      },
      {
        "power": 700,
        "formula": "0.8"
      },
      {
        "power": 800,
        "formula": "1"
      }
    ],
    "InherentAffix_2060 (Flat) Special": [
      {
        "power": 0,
        "formula": "1000"
      },
      {
        "power": 700,
        "formula": "1500"
      },
      {
        "power": 800,
        "formula": "2060"
      }
    ],
    "InherentAffix_130 (Ring_Armor)": [
      {
        "power": 0,
        "formula": "(1+Round(0.1490566037735849*(IPower()-10))+5)/2.5"
      },
      {
        "power": 590,
        "formula": "(100+Round(0.2833333333333333*(IPower()-590))+10)/2.5"
      },
      {
        "power": 750,
        "formula": "80"
      },
      {
        "power": 800,
        "formula": "130"
      }
    ],
    "InherentAffix200% (Flat)": [
      {
        "power": 0,
        "formula": "1.25"
      },
      {
        "power": 700,
        "formula": "1.5"
      },
      {
        "power": 800,
        "formula": "2"
      }
    ],
    "InherentAffix175% (Flat)": [
      {
        "power": 0,
        "formula": "1.25"
      },
      {
        "power": 700,
        "formula": "1.5"
      },
      {
        "power": 800,
        "formula": "1.75"
      }
    ],
    "InherentAffix150% (Flat)": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 700,
        "formula": "1.25"
      },
      {
        "power": 800,
        "formula": "1.5"
      }
    ],
    "InherentAffix125% (Flat)": [
      {
        "power": 0,
        "formula": "0.9"
      },
      {
        "power": 700,
        "formula": "1.1"
      },
      {
        "power": 800,
        "formula": "1.25"
      }
    ],
    "InherentAffix100% (Flat)": [
      {
        "power": 0,
        "formula": "0.7"
      },
      {
        "power": 700,
        "formula": "0.85"
      },
      {
        "power": 800,
        "formula": "1"
      }
    ],
    "InherentAffix85% (Flat)": [
      {
        "power": 0,
        "formula": "0.55"
      },
      {
        "power": 700,
        "formula": "0.7"
      },
      {
        "power": 800,
        "formula": "0.85"
      }
    ],
    "InherentAffix65% (Flat)": [
      {
        "power": 0,
        "formula": "0.55"
      },
      {
        "power": 700,
        "formula": "0.6"
      },
      {
        "power": 800,
        "formula": "0.65"
      }
    ],
    "InherentAffix50% (Flat)": [
      {
        "power": 0,
        "formula": "0.4"
      },
      {
        "power": 700,
        "formula": "0.45"
      },
      {
        "power": 800,
        "formula": "0.5"
      }
    ],
    "InherentAffix30% (Flat)": [
      {
        "power": 0,
        "formula": "0.2"
      },
      {
        "power": 625,
        "formula": "0.25"
      },
      {
        "power": 780,
        "formula": "0.3"
      }
    ],
    "InherentAffix12.6% (Flat)": [
      {
        "power": 0,
        "formula": "0.1"
      },
      {
        "power": 625,
        "formula": "0.111"
      },
      {
        "power": 780,
        "formula": "0.126"
      }
    ],
    "InherentAffix10% (Flat)": [
      {
        "power": 0,
        "formula": "0.08"
      },
      {
        "power": 700,
        "formula": "0.09"
      },
      {
        "power": 800,
        "formula": "0.1"
      }
    ],
    "InherentAffix8% (Flat)": [
      {
        "power": 0,
        "formula": "0.06"
      },
      {
        "power": 625,
        "formula": "0.07"
      },
      {
        "power": 780,
        "formula": "0.08"
      }
    ],
    "InherentAffix7% (Flat)": [
      {
        "power": 0,
        "formula": "0.03"
      },
      {
        "power": 625,
        "formula": "0.05"
      },
      {
        "power": 780,
        "formula": "0.07"
      }
    ],
    "InherentAffix1 (Flat)": [
      {
        "power": 0,
        "formula": "0.6"
      },
      {
        "power": 625,
        "formula": "0.8"
      },
      {
        "power": 780,
        "formula": "1"
      }
    ],
    "InherentAffix_FlatDamage_ElementalSurge (Flat)": [
      {
        "power": 0,
        "formula": "750"
      },
      {
        "power": 700,
        "formula": "1750"
      },
      {
        "power": 800,
        "formula": "6000"
      }
    ],
    "InherentAffix_FlatDamage_ElementalSurge_0.5x (Flat)": [
      {
        "power": 0,
        "formula": "300"
      },
      {
        "power": 700,
        "formula": "600"
      },
      {
        "power": 800,
        "formula": "2500"
      }
    ],
    "NormalAffix_2962.66_10Steps_Special": [
      {
        "power": 0,
        "formula": "600+30*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 700,
        "formula": "1250+40*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 800,
        "formula": "Min(2962.6666666666665,2063+90*FloatRandomRangeWithInterval(9,1,10))"
      }
    ],
    "NormalAffix_444_10Steps_Special": [
      {
        "power": 0,
        "formula": "229+6*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 700,
        "formula": "240+11*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 800,
        "formula": "314+13*FloatRandomRangeWithInterval(9,1,10)"
      }
    ],
    "NormalAffix_296_10Steps_Special": [
      {
        "power": 0,
        "formula": "165+6*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 700,
        "formula": "180+7*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 800,
        "formula": "216+8*FloatRandomRangeWithInterval(9,1,10)"
      }
    ],
    "NormalAffix_2500_10Steps": [
      {
        "power": 0,
        "formula": "600+30*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 700,
        "formula": "1050+40*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 800,
        "formula": "2000+50*FloatRandomRangeWithInterval(9,1,10)"
      }
    ],
    "NormalAffix_650%_10Steps": [
      {
        "power": 0,
        "formula": "(410+10*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(430+15*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(450+20*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_500%_10Steps": [
      {
        "power": 0,
        "formula": "(250+10*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(305+12*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(350+15*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_425%_10Steps": [
      {
        "power": 0,
        "formula": "(210+9*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(240+11*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(295+13*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_350%_10Steps": [
      {
        "power": 0,
        "formula": "(180+7*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(210+9*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(240+11*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_325%_10Steps": [
      {
        "power": 0,
        "formula": "(165+6*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(195+8*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(225+10*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_300%_10Steps": [
      {
        "power": 0,
        "formula": "(150+5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(180+7*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(210+9*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_275%_10Steps": [
      {
        "power": 0,
        "formula": "(165+6*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(180+7*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(195+8*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_273.1%_10Steps_Special": [
      {
        "power": 0,
        "formula": "(165+6*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 625,
        "formula": "(180+7*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 780,
        "formula": "Min(273.1,194+8*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_250%_10Steps": [
      {
        "power": 0,
        "formula": "(125+4.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(150+5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(180+7*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_225%_10Steps": [
      {
        "power": 0,
        "formula": "(125+4.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(150+5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(165+6*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_200%_10Steps": [
      {
        "power": 0,
        "formula": "(105+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(125+4.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(150+5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_185%_10Steps": [
      {
        "power": 0,
        "formula": "(105+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(120+4*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(140+4.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_182.0666%_10Steps_Special": [
      {
        "power": 0,
        "formula": "(105+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 625,
        "formula": "(120+4*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 780,
        "formula": "Min(182.06666666666666,138+4.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_170%_10Steps": [
      {
        "power": 0,
        "formula": "(95+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(110+4*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(125+4.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_160%_10Steps": [
      {
        "power": 0,
        "formula": "(90+3*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(105+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(120+4*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_150%_10Steps": [
      {
        "power": 0,
        "formula": "(90+3*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(100+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(110+4*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_145%_10Steps": [
      {
        "power": 0,
        "formula": "(95+3*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(105+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(110+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_140%_10Steps": [
      {
        "power": 0,
        "formula": "(90+3*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(95+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(105+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_135%_10Steps": [
      {
        "power": 0,
        "formula": "(85+3*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(95+3*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(100+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_130%_10Steps": [
      {
        "power": 0,
        "formula": "(80+3*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(90+3*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(95+3.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_125%_10Steps": [
      {
        "power": 0,
        "formula": "(80+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(85+3*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(95+3*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_120%_10Steps": [
      {
        "power": 0,
        "formula": "(75+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(80+3*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(90+3*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_115%_10Steps": [
      {
        "power": 0,
        "formula": "(75+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(80+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(85+3*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_110%_10Steps": [
      {
        "power": 0,
        "formula": "(75+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(80+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(80+3*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_105%_10Steps": [
      {
        "power": 0,
        "formula": "(70+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(75+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(80+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_100%_10Steps": [
      {
        "power": 0,
        "formula": "(65+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(70+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(75+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_95%_10Steps": [
      {
        "power": 0,
        "formula": "(60+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(65+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(70+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_90%_10Steps": [
      {
        "power": 0,
        "formula": "(55+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(60+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(65+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_85%_10Steps": [
      {
        "power": 0,
        "formula": "(55+2*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(55+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(60+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_80%_10Steps": [
      {
        "power": 0,
        "formula": "(50+2*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(55+2*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(55+2.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_75%_10Steps": [
      {
        "power": 0,
        "formula": "(45+2*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(50+2*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(55+2*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_70%_10Steps": [
      {
        "power": 0,
        "formula": "(45+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(45+2*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(50+2*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_67.33%_10Steps_Special": [
      {
        "power": 0,
        "formula": "(40+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(45+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "Min(67.33333333333333,48+2*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_65%_10Steps": [
      {
        "power": 0,
        "formula": "(40+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(45+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(45+2*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_60%_10Steps": [
      {
        "power": 0,
        "formula": "(35+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(40+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(45+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_55%_10Steps": [
      {
        "power": 0,
        "formula": "(30+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(35+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(40+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_51.8%_HighVariance_Special": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(126,10,518)/1000"
      }
    ],
    "NormalAffix_50%_10Steps": [
      {
        "power": 0,
        "formula": "(27.5+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(30+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(35+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_45%_10Steps": [
      {
        "power": 0,
        "formula": "(25+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(27.5+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(30+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_44.4%_10Steps_Special": [
      {
        "power": 0,
        "formula": "(25+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(27.5+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(29.4+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_42.5%_10Steps": [
      {
        "power": 0,
        "formula": "(27.5+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(25+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(27.5+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_40%_10Steps": [
      {
        "power": 0,
        "formula": "(25+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(27.5+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(25+1.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_37.5%_10Steps": [
      {
        "power": 0,
        "formula": "(22.5+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(25+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(27.5+FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_35%_10Steps": [
      {
        "power": 0,
        "formula": "(20+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(22.5+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(25+FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_32.5%_10Steps": [
      {
        "power": 0,
        "formula": "(17.5+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(20+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(22.5+FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_30%_10Steps": [
      {
        "power": 0,
        "formula": "(15+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(17.5+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(20+FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_29.6%_10Steps_Special": [
      {
        "power": 0,
        "formula": "(15+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(17.5+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "Min(29.6,20+FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_27.5%_10Steps": [
      {
        "power": 0,
        "formula": "(12.5+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(15+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(17.5+FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_25%_10Steps": [
      {
        "power": 0,
        "formula": "(15+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(12.5+FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(15+FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_22.5%_10Steps": [
      {
        "power": 0,
        "formula": "(12.5+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(15+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(12.5+FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_20%_10Steps": [
      {
        "power": 0,
        "formula": "(10+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(12.5+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(15+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_17.5%_10Steps": [
      {
        "power": 0,
        "formula": "(7.5+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 700,
        "formula": "(10+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(12.5+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_15%_10Steps": [
      {
        "power": 0,
        "formula": "(8.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 700,
        "formula": "(7.5+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      },
      {
        "power": 800,
        "formula": "(10+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_12.5%_10Steps": [
      {
        "power": 0,
        "formula": "(7.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 700,
        "formula": "(8.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 800,
        "formula": "(7.5+0.5*FloatRandomRangeWithInterval(9,1,10))/100"
      }
    ],
    "NormalAffix_11%_5Steps": [
      {
        "power": 0,
        "formula": "(6.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 700,
        "formula": "(7.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 800,
        "formula": "(8.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      }
    ],
    "NormalAffix_10%_5Steps": [
      {
        "power": 0,
        "formula": "(5.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 700,
        "formula": "(6.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 800,
        "formula": "(7.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      }
    ],
    "NormalAffix_9%_5Steps": [
      {
        "power": 0,
        "formula": "(4.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 700,
        "formula": "(5.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 800,
        "formula": "(6.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      }
    ],
    "NormalAffix_8.66%_HighVariance_Special": [
      {
        "power": 0,
        "formula": "Min(86.66666666666667,FloatRandomRangeWithInterval(42,1,87))/1000"
      }
    ],
    "NormalAffix_8%_5Steps": [
      {
        "power": 0,
        "formula": "(3.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 700,
        "formula": "(4.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 800,
        "formula": "(5.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      }
    ],
    "NormalAffix_7.5%_5Steps": [
      {
        "power": 0,
        "formula": "(2.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 700,
        "formula": "(3.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 800,
        "formula": "(5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      }
    ],
    "NormalAffix_7%_5Steps": [
      {
        "power": 0,
        "formula": "(2.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 700,
        "formula": "(3.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 800,
        "formula": "(4.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      }
    ],
    "NormalAffix_6%_5Steps": [
      {
        "power": 0,
        "formula": "(2+0.5*FloatRandomRangeWithInterval(3,1,4))/100"
      },
      {
        "power": 700,
        "formula": "(2.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      },
      {
        "power": 800,
        "formula": "(3.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      }
    ],
    "NormalAffix_5%_5Steps": [
      {
        "power": 0,
        "formula": "(1.5+0.5*FloatRandomRangeWithInterval(2,1,3))/100"
      },
      {
        "power": 700,
        "formula": "(2+0.5*FloatRandomRangeWithInterval(3,1,4))/100"
      },
      {
        "power": 800,
        "formula": "(2.5+0.5*FloatRandomRangeWithInterval(4,1,5))/100"
      }
    ],
    "NormalAffix_4%_4Steps": [
      {
        "power": 0,
        "formula": "(1+0.5*FloatRandomRangeWithInterval(2,1,3))/100"
      },
      {
        "power": 700,
        "formula": "(1.5+0.5*FloatRandomRangeWithInterval(2,1,3))/100"
      },
      {
        "power": 800,
        "formula": "(2+0.5*FloatRandomRangeWithInterval(3,1,4))/100"
      }
    ],
    "NormalAffix_3%_3Steps": [
      {
        "power": 0,
        "formula": "(0.7+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      },
      {
        "power": 700,
        "formula": "(1+0.5*FloatRandomRangeWithInterval(2,1,3))/100"
      },
      {
        "power": 800,
        "formula": "(1.5+0.5*FloatRandomRangeWithInterval(2,1,3))/100"
      }
    ],
    "NormalAffix_2.5%_3Steps": [
      {
        "power": 0,
        "formula": "(0.4+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      },
      {
        "power": 700,
        "formula": "(0.7+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      },
      {
        "power": 800,
        "formula": "(1+0.5*FloatRandomRangeWithInterval(2,1,3))/100"
      }
    ],
    "NormalAffix_2%_3Steps": [
      {
        "power": 0,
        "formula": "(0.4+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      },
      {
        "power": 625,
        "formula": "(0.8+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      },
      {
        "power": 780,
        "formula": "(1.3+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      }
    ],
    "NormalAffix_1.5%_3Steps": [
      {
        "power": 0,
        "formula": "(0.1+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      },
      {
        "power": 700,
        "formula": "(0.4+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      },
      {
        "power": 800,
        "formula": "(0.8+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      }
    ],
    "NormalAffix_1%_3Steps": [
      {
        "power": 0,
        "formula": "(0.1+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      },
      {
        "power": 700,
        "formula": "(0.4+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      }
    ],
    "NormalAffix_0.5%_3Steps": [
      {
        "power": 0,
        "formula": "(0.1+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      }
    ],
    "NormalAffix_FlatDamage_Tier3.5": [
      {
        "power": 0,
        "formula": "350+50*FloatRandomRangeWithInterval(8,1,9)"
      },
      {
        "power": 700,
        "formula": "550+75*FloatRandomRangeWithInterval(8,1,9)"
      },
      {
        "power": 800,
        "formula": "940+160*FloatRandomRangeWithInterval(10,1,11)"
      }
    ],
    "NormalAffix_FlatDamage_Tier4": [
      {
        "power": 0,
        "formula": "570+35*FloatRandomRangeWithInterval(8,1,9)"
      },
      {
        "power": 700,
        "formula": "700+100*FloatRandomRangeWithInterval(8,1,9)"
      },
      {
        "power": 800,
        "formula": "4000+250*FloatRandomRangeWithInterval(10,1,11)"
      }
    ],
    "NormalAffix_FlatDamage_Tier3": [
      {
        "power": 0,
        "formula": "275+25*FloatRandomRangeWithInterval(8,1,9)"
      },
      {
        "power": 700,
        "formula": "550+50*FloatRandomRangeWithInterval(8,1,9)"
      },
      {
        "power": 800,
        "formula": "750+150*FloatRandomRangeWithInterval(10,1,11)"
      }
    ],
    "NormalAffix_FlatDamage_Tier2": [
      {
        "power": 0,
        "formula": "275+25*FloatRandomRangeWithInterval(8,1,9)"
      },
      {
        "power": 700,
        "formula": "550+50*FloatRandomRangeWithInterval(8,1,9)"
      }
    ],
    "NormalAffix_FlatDamage_Tier1": [
      {
        "power": 0,
        "formula": "275+25*FloatRandomRangeWithInterval(8,1,9)"
      }
    ],
    "NormalAffix_225_10Steps": [
      {
        "power": 0,
        "formula": "95+8*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 625,
        "formula": "120+8*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 780,
        "formula": "145+8*FloatRandomRangeWithInterval(9,1,10)"
      }
    ],
    "NormalAffix_180_10Steps": [
      {
        "power": 0,
        "formula": "80+6*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 625,
        "formula": "100+6*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 780,
        "formula": "120+6*FloatRandomRangeWithInterval(9,1,10)"
      }
    ],
    "NormalAffix_135_10Steps": [
      {
        "power": 0,
        "formula": "65+4*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 625,
        "formula": "80+4*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 780,
        "formula": "95+4*FloatRandomRangeWithInterval(9,1,10)"
      }
    ],
    "NormalAffix_65_10Steps": [
      {
        "power": 0,
        "formula": "25+2*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 700,
        "formula": "35+2*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 800,
        "formula": "45+2*FloatRandomRangeWithInterval(9,1,10)"
      }
    ],
    "NormalAffix_45_10Steps": [
      {
        "power": 0,
        "formula": "25+FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 700,
        "formula": "30+FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 800,
        "formula": "35+FloatRandomRangeWithInterval(9,1,10)"
      }
    ],
    "NormalAffix_40_10Steps": [
      {
        "power": 0,
        "formula": "14+FloatRandomRangeWithInterval(6,1,7)"
      },
      {
        "power": 700,
        "formula": "25+FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 800,
        "formula": "30+FloatRandomRangeWithInterval(9,1,10)"
      }
    ],
    "NormalAffix_35_10Steps": [
      {
        "power": 0,
        "formula": "14+FloatRandomRangeWithInterval(6,1,7)"
      },
      {
        "power": 700,
        "formula": "20+FloatRandomRangeWithInterval(6,1,7)"
      },
      {
        "power": 800,
        "formula": "25+FloatRandomRangeWithInterval(9,1,10)"
      }
    ],
    "NormalAffix_26_7Steps": [
      {
        "power": 0,
        "formula": "11+FloatRandomRangeWithInterval(6,1,7)"
      },
      {
        "power": 700,
        "formula": "14+FloatRandomRangeWithInterval(6,1,7)"
      },
      {
        "power": 800,
        "formula": "19+FloatRandomRangeWithInterval(6,1,7)"
      }
    ],
    "NormalAffix_21_7Steps": [
      {
        "power": 0,
        "formula": "8+FloatRandomRangeWithInterval(6,1,7)"
      },
      {
        "power": 700,
        "formula": "11+FloatRandomRangeWithInterval(6,1,7)"
      },
      {
        "power": 800,
        "formula": "14+FloatRandomRangeWithInterval(6,1,7)"
      }
    ],
    "NormalAffix_18_7Steps": [
      {
        "power": 0,
        "formula": "9+FloatRandomRangeWithInterval(4,1,5)"
      },
      {
        "power": 700,
        "formula": "8+FloatRandomRangeWithInterval(6,1,7)"
      },
      {
        "power": 800,
        "formula": "11+FloatRandomRangeWithInterval(6,1,7)"
      }
    ],
    "NormalAffix_15_7Steps": [
      {
        "power": 0,
        "formula": "7+FloatRandomRangeWithInterval(4,1,5)"
      },
      {
        "power": 700,
        "formula": "9+FloatRandomRangeWithInterval(4,1,5)"
      },
      {
        "power": 800,
        "formula": "8+FloatRandomRangeWithInterval(6,1,7)"
      }
    ],
    "NormalAffix_14_5Steps": [
      {
        "power": 0,
        "formula": "5+FloatRandomRangeWithInterval(4,1,5)"
      },
      {
        "power": 700,
        "formula": "7+FloatRandomRangeWithInterval(4,1,5)"
      },
      {
        "power": 800,
        "formula": "9+FloatRandomRangeWithInterval(4,1,5)"
      }
    ],
    "AffixIgnoreModifiers3to5": [
      {
        "power": 0,
        "formula": "Round(FloatRandomRangeWithInterval(1,2,3)*GetTotalAffixBonus())"
      },
      {
        "power": 700,
        "formula": "Round((1+FloatRandomRangeWithInterval(2,1,3))*GetTotalAffixBonus())"
      },
      {
        "power": 800,
        "formula": "Round((2+FloatRandomRangeWithInterval(2,1,3))*GetTotalAffixBonus())"
      }
    ],
    "AffixIgnoreModifiers4to6": [
      {
        "power": 0,
        "formula": "Round((1+FloatRandomRangeWithInterval(2,1,3))*GetTotalAffixBonus())"
      },
      {
        "power": 700,
        "formula": "Round((2+FloatRandomRangeWithInterval(2,1,3))*GetTotalAffixBonus())"
      },
      {
        "power": 800,
        "formula": "Round((3+FloatRandomRangeWithInterval(2,1,3))*GetTotalAffixBonus())"
      }
    ],
    "AffixIgnoreModifiers5to7": [
      {
        "power": 0,
        "formula": "Round((2+FloatRandomRangeWithInterval(2,1,3))*GetTotalAffixBonus())"
      },
      {
        "power": 700,
        "formula": "Round((3+FloatRandomRangeWithInterval(2,1,3))*GetTotalAffixBonus())"
      },
      {
        "power": 800,
        "formula": "Round((4+FloatRandomRangeWithInterval(2,1,3))*GetTotalAffixBonus())"
      }
    ],
    "AffixIgnoreModifiers6to8": [
      {
        "power": 0,
        "formula": "Round((3+FloatRandomRangeWithInterval(2,1,3))*GetTotalAffixBonus())"
      },
      {
        "power": 700,
        "formula": "Round((4+FloatRandomRangeWithInterval(2,1,3))*GetTotalAffixBonus())"
      },
      {
        "power": 800,
        "formula": "Round((5+FloatRandomRangeWithInterval(2,1,3))*GetTotalAffixBonus())"
      }
    ],
    "AffixIgnoreModifiers8to12": [
      {
        "power": 0,
        "formula": "Round((5+FloatRandomRangeWithInterval(4,1,5))*GetTotalAffixBonus())"
      },
      {
        "power": 625,
        "formula": "Round((7+FloatRandomRangeWithInterval(4,1,5))*GetTotalAffixBonus())"
      }
    ],
    "NormalAffix_12_5Steps": [
      {
        "power": 0,
        "formula": "5+FloatRandomRangeWithInterval(4,1,5)"
      },
      {
        "power": 700,
        "formula": "7+FloatRandomRangeWithInterval(4,1,5)"
      }
    ],
    "NormalAffix_10_5Steps": [
      {
        "power": 0,
        "formula": "5+FloatRandomRangeWithInterval(4,1,5)"
      }
    ],
    "AffixIgnoreModifiers1Always": [
      {
        "power": 0,
        "formula": "Round(GetTotalAffixBonus())"
      }
    ],
    "AffixIgnoreModifiers2Always": [
      {
        "power": 0,
        "formula": "Round(2*GetTotalAffixBonus())"
      }
    ],
    "NormalAffix_2Always": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 700,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 800,
        "formula": "2"
      }
    ],
    "NormalAffix_1to1.5to2_Scaled2H": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,1.5)"
      },
      {
        "power": 700,
        "formula": "FloatRandomRangeWithInterval(2,1,2)"
      }
    ],
    "NormalAffix_1to2": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 700,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      }
    ],
    "NormalAffix_3.0_5Steps": [
      {
        "power": 0,
        "formula": "2*(0.6+0.1*FloatRandomRangeWithInterval(4,1,5))"
      },
      {
        "power": 700,
        "formula": "2*(0.8+0.1*FloatRandomRangeWithInterval(4,1,5))"
      },
      {
        "power": 800,
        "formula": "2*(1+0.1*FloatRandomRangeWithInterval(4,1,5))"
      }
    ],
    "NormalAffix_1.5_5Steps": [
      {
        "power": 0,
        "formula": "0.6+0.1*FloatRandomRangeWithInterval(4,1,5)"
      },
      {
        "power": 700,
        "formula": "0.8+0.1*FloatRandomRangeWithInterval(4,1,5)"
      },
      {
        "power": 800,
        "formula": "1+0.1*FloatRandomRangeWithInterval(4,1,5)"
      }
    ],
    "NormalAffix_1.3_5Steps": [
      {
        "power": 0,
        "formula": "0.4+0.1*FloatRandomRangeWithInterval(4,1,5)"
      },
      {
        "power": 700,
        "formula": "0.6+0.1*FloatRandomRangeWithInterval(4,1,5)"
      },
      {
        "power": 800,
        "formula": "0.8+0.1*FloatRandomRangeWithInterval(4,1,5)"
      }
    ],
    "NormalAffix_1.1_5Steps": [
      {
        "power": 0,
        "formula": "0.4+0.1*FloatRandomRangeWithInterval(4,1,5)"
      },
      {
        "power": 700,
        "formula": "0.6+0.1*FloatRandomRangeWithInterval(4,1,5)"
      }
    ],
    "NormalAffix_0.9_5Steps": [
      {
        "power": 0,
        "formula": "0.4+0.1*FloatRandomRangeWithInterval(4,1,5)"
      }
    ],
    "NormalAffix_0.8_5Steps": [
      {
        "power": 0,
        "formula": "0.3+0.1*FloatRandomRangeWithInterval(4,1,5)"
      }
    ],
    "NormalAffix_0.4to0.6": [
      {
        "power": 0,
        "formula": "0.1+0.1*FloatRandomRangeWithInterval(2,1,3)"
      },
      {
        "power": 700,
        "formula": "0.2+0.1*FloatRandomRangeWithInterval(2,1,3)"
      },
      {
        "power": 800,
        "formula": "0.3+0.1*FloatRandomRangeWithInterval(2,1,3)"
      }
    ],
    "NormalAffix_0.3to0.5": [
      {
        "power": 0,
        "formula": "0.1+0.1*FloatRandomRangeWithInterval(2,1,3)"
      },
      {
        "power": 700,
        "formula": "0.2+0.1*FloatRandomRangeWithInterval(2,1,3)"
      }
    ],
    "NormalAffix_0.2to0.4": [
      {
        "power": 0,
        "formula": "0.1+0.1*FloatRandomRangeWithInterval(2,1,3)"
      }
    ],
    "NormalAffix_0.1to0.3": [
      {
        "power": 0,
        "formula": "0.1*FloatRandomRangeWithInterval(2,1,3)"
      }
    ],
    "TemperedAffix_350%": [
      {
        "power": 0,
        "formula": "(299+RandomInt(1,51))/100"
      }
    ],
    "TemperedAffix_325%": [
      {
        "power": 0,
        "formula": "(274+RandomInt(1,51))/100"
      }
    ],
    "TemperedAffix_300%": [
      {
        "power": 0,
        "formula": "(249+RandomInt(1,51))/100"
      }
    ],
    "TemperedAffix_275%": [
      {
        "power": 0,
        "formula": "(224+RandomInt(1,51))/100"
      }
    ],
    "TemperedAffix_250%": [
      {
        "power": 0,
        "formula": "(199+RandomInt(1,51))/100"
      }
    ],
    "TemperedAffix_225%": [
      {
        "power": 0,
        "formula": "(184+RandomInt(1,41))/100"
      }
    ],
    "TemperedAffix_200%": [
      {
        "power": 0,
        "formula": "(159+RandomInt(1,41))/100"
      }
    ],
    "TemperedAffix_185%": [
      {
        "power": 0,
        "formula": "(149+RandomInt(1,36))/100"
      }
    ],
    "TemperedAffix_170%": [
      {
        "power": 0,
        "formula": "(139+RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_150%": [
      {
        "power": 0,
        "formula": "(124+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_120%": [
      {
        "power": 0,
        "formula": "(89+RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_DifficultConditionalHigher_Legendary": [
      {
        "power": 0,
        "formula": "RandomInt(45,65)/100"
      }
    ],
    "TemperedAffix_110%": [
      {
        "power": 0,
        "formula": "(79+RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_DifficultConditional_Legendary": [
      {
        "power": 0,
        "formula": "RandomInt(40,60)/100"
      }
    ],
    "TemperedAffix_105%": [
      {
        "power": 0,
        "formula": "(79+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_100%": [
      {
        "power": 0,
        "formula": "(74+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_UncommonConditionalHigher_Legendary": [
      {
        "power": 0,
        "formula": "RandomInt(35,55)/100"
      }
    ],
    "TemperedAffix_95%": [
      {
        "power": 0,
        "formula": "(69+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_90%": [
      {
        "power": 0,
        "formula": "(64+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_UncommonConditional_Legendary": [
      {
        "power": 0,
        "formula": "RandomInt(30,50)/100"
      }
    ],
    "TemperedAffix_85%": [
      {
        "power": 0,
        "formula": "(59+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_80%": [
      {
        "power": 0,
        "formula": "(54+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_CommonConditionalHigher_Legendary": [
      {
        "power": 0,
        "formula": "RandomInt(25,45)/100"
      }
    ],
    "TemperedAffix_75%": [
      {
        "power": 0,
        "formula": "(49+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_70%": [
      {
        "power": 0,
        "formula": "(44+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_CommonConditional_Legendary": [
      {
        "power": 0,
        "formula": "RandomInt(20,40)/100"
      }
    ],
    "TemperedAffix_65%": [
      {
        "power": 0,
        "formula": "(39+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_DifficultConditionalHigher_Rare": [
      {
        "power": 0,
        "formula": "RandomInt(25,45)/100"
      }
    ],
    "TemperedAffix_60%": [
      {
        "power": 0,
        "formula": "(34+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_DifficultConditional_Rare": [
      {
        "power": 0,
        "formula": "RandomInt(22,40)/100"
      }
    ],
    "TemperedAffix_55%": [
      {
        "power": 0,
        "formula": "(29+RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_OverpowerStack_Legendary": [
      {
        "power": 0,
        "formula": "RandomInt(7,10)/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_Base_Legendary": [
      {
        "power": 0,
        "formula": "RandomInt(15,30)/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_UncommonConditionalHigher_Rare": [
      {
        "power": 0,
        "formula": "RandomInt(20,35)/100"
      }
    ],
    "TemperedAffix_50%": [
      {
        "power": 0,
        "formula": "(29+RandomInt(1,21))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_UncommonConditional_Rare": [
      {
        "power": 0,
        "formula": "RandomInt(18,30)/100"
      }
    ],
    "TemperedAffix_45%": [
      {
        "power": 0,
        "formula": "(24+RandomInt(1,21))/100"
      }
    ],
    "TemperedAffix_42.5%": [
      {
        "power": 0,
        "formula": "(27+0.5*RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_CommonConditionalHigher_Rare": [
      {
        "power": 0,
        "formula": "RandomInt(15,25)/100"
      }
    ],
    "TemperedAffix_40%": [
      {
        "power": 0,
        "formula": "(24.5+0.5*RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_37.5%": [
      {
        "power": 0,
        "formula": "(24.5+0.5*RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_CommonConditional_Rare": [
      {
        "power": 0,
        "formula": "RandomInt(12,20)/100"
      }
    ],
    "TemperedAffix_35%": [
      {
        "power": 0,
        "formula": "(24.5+0.5*RandomInt(1,21))/100"
      }
    ],
    "TemperedAffix_32.5%": [
      {
        "power": 0,
        "formula": "(22+0.5*RandomInt(1,21))/100"
      }
    ],
    "TemperedAffix_30%": [
      {
        "power": 0,
        "formula": "(19.5+0.5*RandomInt(1,21))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_DifficultConditionalHigher_Magic": [
      {
        "power": 0,
        "formula": "RandomInt(20,25)/100"
      }
    ],
    "TemperedAffix_27.5%": [
      {
        "power": 0,
        "formula": "(17+0.5*RandomInt(1,21))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_OverpowerStack_Rare": [
      {
        "power": 0,
        "formula": "RandomInt(4,7)/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_Base_Rare": [
      {
        "power": 0,
        "formula": "RandomInt(10,15)/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_DifficultConditional_Magic": [
      {
        "power": 0,
        "formula": "RandomInt(17,22)/100"
      }
    ],
    "TemperedAffix_25%": [
      {
        "power": 0,
        "formula": "(14.5+0.5*RandomInt(1,21))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_UncommonConditionalHigher_Magic": [
      {
        "power": 0,
        "formula": "RandomInt(15,20)/100"
      }
    ],
    "TemperedAffix_22.5%": [
      {
        "power": 0,
        "formula": "(19.9+0.1*RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_UncommonConditional_Magic": [
      {
        "power": 0,
        "formula": "RandomInt(13,18)/100"
      }
    ],
    "TemperedAffix_20%": [
      {
        "power": 0,
        "formula": "(16.9+0.1*RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_CommonConditionalHigher_Magic": [
      {
        "power": 0,
        "formula": "RandomInt(10,15)/100"
      }
    ],
    "TemperedAffix_17.5%": [
      {
        "power": 0,
        "formula": "(14.9+0.1*RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_CommonConditional_Magic": [
      {
        "power": 0,
        "formula": "RandomInt(7,12)/100"
      }
    ],
    "TemperedAffix_15%": [
      {
        "power": 0,
        "formula": "(11.9+0.1*RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_OverpowerStack_Magic": [
      {
        "power": 0,
        "formula": "RandomInt(2,4)/100"
      }
    ],
    "TemperedAffix_AdditiveDamage_Base_Magic": [
      {
        "power": 0,
        "formula": "RandomInt(5,10)/100"
      }
    ],
    "TemperedAffix_12.5%": [
      {
        "power": 0,
        "formula": "(9.9+0.1*RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_11%": [
      {
        "power": 0,
        "formula": "(8.4+0.1*RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_10%": [
      {
        "power": 0,
        "formula": "(6.9+0.1*RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_9%": [
      {
        "power": 0,
        "formula": "(5.9+0.1*RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_8%": [
      {
        "power": 0,
        "formula": "(4.9+0.1*RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_7.5%": [
      {
        "power": 0,
        "formula": "(4.4+0.1*RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_7%": [
      {
        "power": 0,
        "formula": "(3.9+0.1*RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_6%": [
      {
        "power": 0,
        "formula": "(2.9+0.1*RandomInt(1,31))/100"
      }
    ],
    "TemperedAffix_5%": [
      {
        "power": 0,
        "formula": "(2.4+0.1*RandomInt(1,26))/100"
      }
    ],
    "TemperedAffix_4%": [
      {
        "power": 0,
        "formula": "(1.9+0.1*RandomInt(1,21))/100"
      }
    ],
    "TemperedAffix_3%": [
      {
        "power": 0,
        "formula": "(0.9+0.1*RandomInt(1,21))/100"
      }
    ],
    "TemperedAffix_2.5%": [
      {
        "power": 0,
        "formula": "(0.9+0.1*RandomInt(1,16))/100"
      }
    ],
    "TemperedAffix_1.5%": [
      {
        "power": 0,
        "formula": "(0.7+0.1*RandomInt(1,8))/100"
      }
    ],
    "TemperedAffix_1%": [
      {
        "power": 0,
        "formula": "(0.4+0.1*FloatRandomRangeWithInterval(6,1,6))/100"
      }
    ],
    "TemperedAffix_0.5%": [
      {
        "power": 0,
        "formula": "(0.1+0.1*FloatRandomRangeWithInterval(6,1,7))/100"
      }
    ],
    "TemperedAffix_FlatDamage_Tier3": [
      {
        "power": 0,
        "formula": "(14.5+0.5*RandomInt(1,19))*100"
      }
    ],
    "TemperedAffix_FlatDamage_Tier2": [
      {
        "power": 0,
        "formula": "RandomInt(80,100)"
      }
    ],
    "TemperedAffix_FlatDamage_Tier1": [
      {
        "power": 0,
        "formula": "RandomInt(30,50)"
      }
    ],
    "TemperedAffix_LifeOnHit_Tier3": [
      {
        "power": 0,
        "formula": "(21+0.2*RandomInt(1,10))/100"
      }
    ],
    "TemperedAffix_LifeOnHit_Tier2": [
      {
        "power": 0,
        "formula": "(12+0.2*RandomInt(1,10))/100"
      }
    ],
    "TemperedAffix_LifeOnHit_Tier1": [
      {
        "power": 0,
        "formula": "(2+0.2*RandomInt(1,10))/100"
      }
    ],
    "TemperedAffix_21": [
      {
        "power": 0,
        "formula": "RandomInt(10,21)"
      }
    ],
    "TemperedAffix_18": [
      {
        "power": 0,
        "formula": "RandomInt(10,18)"
      }
    ],
    "TemperedAffix_15": [
      {
        "power": 0,
        "formula": "RandomInt(7,15)"
      }
    ],
    "TemperedAffix_14": [
      {
        "power": 0,
        "formula": "RandomInt(7,14)"
      }
    ],
    "TemperedAffix_12": [
      {
        "power": 0,
        "formula": "RandomInt(5,12)"
      }
    ],
    "TemperedAffix_10": [
      {
        "power": 0,
        "formula": "RandomInt(5,10)"
      }
    ],
    "TemperedAffix_IgnoreModifiers1to2": [
      {
        "power": 0,
        "formula": "Round(RandomInt(1,2)*GetTotalAffixBonus())"
      }
    ],
    "TemperedAffix_IgnoreModifiers1to4": [
      {
        "power": 0,
        "formula": "Round(RandomInt(1,4)*GetTotalAffixBonus())"
      }
    ],
    "TemperedAffix_IgnoreModifiers1to5": [
      {
        "power": 0,
        "formula": "Round(RandomInt(1,5)*GetTotalAffixBonus())"
      }
    ],
    "TemperedAffix_IgnoreModifiers2to3": [
      {
        "power": 0,
        "formula": "Round(RandomInt(2,3)*GetTotalAffixBonus())"
      }
    ],
    "TemperedAffix_IgnoreModifiers2to6": [
      {
        "power": 0,
        "formula": "Round(RandomInt(2,6)*GetTotalAffixBonus())"
      }
    ],
    "TemperedAffix_1.5": [
      {
        "power": 0,
        "formula": "(0.4+0.1*RandomInt(1,11))/100"
      }
    ],
    "TemperedAffix_1.3_5Steps": [
      {
        "power": 0,
        "formula": "0.8+0.1*FloatRandomRangeWithInterval(4,1,5)"
      }
    ],
    "TemperedAffix_1.1_5Steps": [
      {
        "power": 0,
        "formula": "0.6+0.1*FloatRandomRangeWithInterval(4,1,5)"
      }
    ],
    "TemperedAffix_0.9_5Steps": [
      {
        "power": 0,
        "formula": "0.4+0.1*FloatRandomRangeWithInterval(4,1,5)"
      }
    ],
    "TemperedAffix_0.4to0.6": [
      {
        "power": 0,
        "formula": "0.3+0.1*FloatRandomRangeWithInterval(2,1,3)"
      }
    ],
    "TemperedAffix_0.3to0.5": [
      {
        "power": 0,
        "formula": "0.2+0.1*FloatRandomRangeWithInterval(2,1,3)"
      }
    ],
    "TemperedAffix_0.2to0.4": [
      {
        "power": 0,
        "formula": "0.1+0.1*FloatRandomRangeWithInterval(2,1,3)"
      }
    ],
    "TemperedAffix_IgnoreModifiers1Always": [
      {
        "power": 0,
        "formula": "Round(GetTotalAffixBonus())"
      }
    ],
    "S05_BSK_Rogue_004_scaling": [
      {
        "power": 0,
        "formula": "3"
      },
      {
        "power": 700,
        "formula": "4"
      },
      {
        "power": 800,
        "formula": "5"
      }
    ],
    "S05_BSK_Generic_007_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(15,3,5)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(15,3,5)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(15,3,5)*1.5"
      }
    ],
    "AffixSkillRankSingle1.99x": [
      {
        "power": 0,
        "formula": "RandomInt(3,4)"
      },
      {
        "power": 350,
        "formula": "RandomInt(4,5)"
      },
      {
        "power": 750,
        "formula": "RandomInt(5,6)"
      },
      {
        "power": 800,
        "formula": "RandomInt(6,8)"
      }
    ],
    "AffixPercentage18x_UniqueRange": [
      {
        "power": 0,
        "formula": "(12+6*RandomInt(1,4))/100"
      },
      {
        "power": 200,
        "formula": "(45+6*RandomInt(1,6))/100"
      },
      {
        "power": 350,
        "formula": "(66+6*RandomInt(1,7))/100"
      },
      {
        "power": 500,
        "formula": "(96+6*RandomInt(1,8))/100"
      },
      {
        "power": 750,
        "formula": "(114+6*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(162+6*RandomInt(1,15))/100"
      }
    ],
    "AffixQuarterstaffBlockChancePercentage": [
      {
        "power": 0,
        "formula": "0.2"
      },
      {
        "power": 200,
        "formula": "0.25"
      },
      {
        "power": 350,
        "formula": "0.3"
      },
      {
        "power": 500,
        "formula": "0.35"
      },
      {
        "power": 750,
        "formula": "0.4"
      },
      {
        "power": 800,
        "formula": "0.45"
      }
    ],
    "AffixQuarterstaffBlockDamagePercentage": [
      {
        "power": 0,
        "formula": "0.05"
      },
      {
        "power": 200,
        "formula": "0.1"
      },
      {
        "power": 350,
        "formula": "0.15"
      },
      {
        "power": 500,
        "formula": "0.18"
      },
      {
        "power": 750,
        "formula": "0.21"
      },
      {
        "power": 800,
        "formula": "0.25"
      }
    ],
    "x1_Legendary_Barb_115_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,0.75,1.5)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,0.75,1.5)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,0.75,1.5)*1.5"
      }
    ],
    "x1_Legendary_Barb_114_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,0.25,0.75)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,0.25,0.75)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,0.25,0.75)*1.5"
      }
    ],
    "x1_Helm_Unique_Barb_101_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(10,2,2.75)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(10,2,2.75)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRandomRangeWithInterval(10,2,2.75)*1.5"
      }
    ],
    "x1_legendary_druid_124_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRangeWithInterval(0,10,0.8,1.2)"
      },
      {
        "power": 750,
        "formula": "FloatRangeWithInterval(0,10,0.8,1.2)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRangeWithInterval(0,10,0.8,1.2)*1.5"
      }
    ],
    "x1_legendary_rogue_130_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRangeWithInterval(0,10,0.4,0.8)"
      },
      {
        "power": 750,
        "formula": "FloatRangeWithInterval(0,10,0.4,0.8)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRangeWithInterval(0,10,0.4,0.8)*1.5"
      }
    ],
    "x1_legendary_rogue_129_damage_scaling": [
      {
        "power": 0,
        "formula": "FloatRangeWithInterval(0,10,0.2,0.4)"
      },
      {
        "power": 750,
        "formula": "FloatRangeWithInterval(0,10,0.2,0.4)*1.25"
      },
      {
        "power": 800,
        "formula": "FloatRangeWithInterval(0,10,0.2,0.4)*1.5"
      }
    ],
    "ParagonNodeDamageReductionWhileMoving_Magic": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "ParagonNodeLifeOnHit_RareMinor": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "AffixInversePercentage0.1xLifeOnHit": [
      {
        "power": 0,
        "formula": "(0.3+Round(0.010754716981132076*(IPower()-10))+0.2*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(12+Round(0.0016658333333333332*(IPower()-590))+0.2*RandomInt(1,3+Round(0.041666666666666664*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(20.74+Round(0.10369999999999999*(IPower()-750))+0.2*RandomInt(1,8+Round(0.03*(IPower()-750))))/100"
      },
      {
        "power": 900,
        "formula": "(46.665+0.2*RandomInt(1,15))/100"
      }
    ],
    "ParagonNodeDamageBonusEarthquake_Magic": [
      {
        "power": 0,
        "formula": "0.1125"
      }
    ],
    "AffixInversePercentage0.75xLife": [
      {
        "power": 0,
        "formula": "(4+0.4*RandomInt(1,5))/100"
      },
      {
        "power": 200,
        "formula": "(3+0.4*RandomInt(1,6))/100"
      },
      {
        "power": 350,
        "formula": "(2.4+0.4*RandomInt(1,7))/100"
      },
      {
        "power": 500,
        "formula": "(2.8+0.4*RandomInt(1,8))/100"
      },
      {
        "power": 750,
        "formula": "(3.1+0.4*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(4.5+0.4*RandomInt(1,15))/100"
      }
    ],
    "CraftingScalingMatsImprintCOP": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 350,
        "formula": "2"
      },
      {
        "power": 750,
        "formula": "3"
      },
      {
        "power": 800,
        "formula": "5"
      }
    ],
    "CraftingScalingSocketsMatsLegendary": [
      {
        "power": 0,
        "formula": "0"
      },
      {
        "power": 350,
        "formula": "1"
      },
      {
        "power": 750,
        "formula": "2"
      },
      {
        "power": 800,
        "formula": "5"
      }
    ],
    "CraftingScalingSocketsMatsRare": [
      {
        "power": 0,
        "formula": "0"
      },
      {
        "power": 350,
        "formula": "1"
      },
      {
        "power": 750,
        "formula": "2"
      },
      {
        "power": 800,
        "formula": "6"
      }
    ],
    "CraftingScalingSocketsMatsCommon": [
      {
        "power": 0,
        "formula": "1"
      },
      {
        "power": 350,
        "formula": "1.5"
      },
      {
        "power": 750,
        "formula": "2"
      },
      {
        "power": 800,
        "formula": "6"
      }
    ],
    "ParagonNodeResistanceMax_RareMinor": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "ParagonNodeResistanceMax_Magic": [
      {
        "power": 0,
        "formula": "0.01"
      }
    ],
    "SancAffix_12%": [
      {
        "power": 0,
        "formula": "(9.9+0.1*RandomInt(1,21))/100"
      }
    ],
    "SancAffix_10%": [
      {
        "power": 0,
        "formula": "(7.9+0.1*RandomInt(1,21))/100"
      }
    ],
    "ParagonNodeResourceBonus_RareMajorGlyph": [
      {
        "power": 0,
        "formula": "2"
      }
    ],
    "SancAffix_180": [
      {
        "power": 0,
        "formula": "149+RandomInt(1,31)"
      }
    ],
    "SancAffix_6%": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(4,4,6)/100"
      }
    ],
    "SancAffix_5%": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(3,3.5,5)/100"
      }
    ],
    "SancAffix_100": [
      {
        "power": 0,
        "formula": "RandomInt(80,100)"
      }
    ],
    "SancAffix_8%": [
      {
        "power": 0,
        "formula": "(5.9+0.1*RandomInt(1,21))/100"
      }
    ],
    "SancAffix_1.25%": [
      {
        "power": 0,
        "formula": "0.99+0.01*RandomInt(1,26)"
      }
    ],
    "SancAffix_30%": [
      {
        "power": 0,
        "formula": "(19+RandomInt(1,11))/100"
      }
    ],
    "SancAffix_20": [
      {
        "power": 0,
        "formula": "RandomInt(15,20)"
      }
    ],
    "S11_Masterworking_Refinement": [
      {
        "power": 0,
        "formula": "1+0.375*Item_Refinement_Total"
      }
    ],
    "Salvage_Masterworking_Scalar": [
      {
        "power": 0,
        "formula": "Item_Refinement_Total+Max(0,15*(Item_Refinement_Total/5-1))"
      }
    ],
    "S12_KillStreak_LuckyHitChance": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "S12_KillStreak_Massacre_DexterityPercent": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "S12_KillStreak_Massacre_IntelligencePercent": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "S12_KillStreak_Massacre_WillpowerPercent": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "S12_KillStreak_Massacre_StrengthPercent": [
      {
        "power": 0,
        "formula": "0.02"
      }
    ],
    "S12_KillStreak_Lifesteal": [
      {
        "power": 0,
        "formula": "100"
      }
    ],
    "S12_KillStreak_MaxLife": [
      {
        "power": 0,
        "formula": "0.03"
      }
    ],
    "S12_KillStreak_CooldownReduction": [
      {
        "power": 0,
        "formula": "0.06"
      }
    ],
    "S12_KillStreak_CriticalStrikeChance": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "S12_KillStreak_ResourceCostReduction": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "S12_KillStreak_AttackSpeed": [
      {
        "power": 0,
        "formula": "0.08"
      }
    ],
    "S12_KillStreak_MovementSpeed": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "S12_KillStreak_Feast_Chains": [
      {
        "power": 0,
        "formula": "3"
      }
    ],
    "S12_KillStreak_Feast_Bloodsplosion": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "S12_KillStreak_Feast_Bite": [
      {
        "power": 0,
        "formula": "2"
      }
    ],
    "S12_KillStreak_Feast_RestoreResource": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "S12_KillStreak_Feast_NextCastDamage": [
      {
        "power": 0,
        "formula": "40"
      }
    ],
    "S12_KillStreak_Feast_Evade": [
      {
        "power": 0,
        "formula": "1"
      }
    ],
    "S12_KillStreak_Feast_Demons": [
      {
        "power": 0,
        "formula": "1"
      }
    ],
    "S12_KillStreak_Feast_Rampage": [
      {
        "power": 0,
        "formula": "3"
      }
    ],
    "S12_KillStreak_Feast_CooldownReset": [
      {
        "power": 0,
        "formula": "1"
      }
    ],
    "S12_KillStreak_Hunger_LuckyHit": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "S12_KillStreak_Hunger_OnKIll": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "S12_KillStreak_Hunger_CooldownUsed": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "S12_KillStreak_Hunger_ResourceSpent": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "S12_KillStreak_Hunger_BasicSkill": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "Talisman_SetAffix_Damage_Uncommon": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "Talisman_SetAffix_Damage_Common": [
      {
        "power": 0,
        "formula": "0.15"
      }
    ],
    "Talisman_SetAffix_ResistanceSingle": [
      {
        "power": 0,
        "formula": "0.3"
      }
    ],
    "Talisman_SetAffix_CoreStatSingle": [
      {
        "power": 0,
        "formula": "35"
      }
    ],
    "Talisman_SetAffix_DamageOverTime": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "Talisman_SetAffix_Damage": [
      {
        "power": 0,
        "formula": "0.12"
      }
    ],
    "Affix40%_DamageCCed": [
      {
        "power": 0,
        "formula": "(2.5+Round(0.014150943396226415*(IPower()-10))+0.25*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(12+Round(0.05*(IPower()-590))+RandomInt(1,3+Round(0.016666666666666666*(IPower()-590))))/100"
      },
      {
        "power": 750,
        "formula": "(25+RandomInt(1,5))/100"
      },
      {
        "power": 800,
        "formula": "(36+RandomInt(1,8))/100"
      }
    ],
    "Talisman_SetAffix_ResourceMax": [
      {
        "power": 0,
        "formula": "10"
      }
    ],
    "Talisman_SetAffix_HealBonus": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "Talisman_SetAffix_ExperienceBonus": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "Talisman_SetAffix_EvadeCharge": [
      {
        "power": 0,
        "formula": "1"
      }
    ],
    "Talisman_SetAffix_HealOnHit": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "Talisman_SetAffix_DR_Common": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "Talisman_SetAffix_Fortify": [
      {
        "power": 0,
        "formula": "0.15"
      }
    ],
    "Talisman_SetAffix_AttackSpeed": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "Talisman_SetAffix_ResourceCostReduction": [
      {
        "power": 0,
        "formula": "0.04"
      }
    ],
    "Talisman_SetAffix_ResourceLuckyHit": [
      {
        "power": 0,
        "formula": "0.15"
      }
    ],
    "Talisman_SetAffix_CDR": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "Talisman_SetAffix_CritChance": [
      {
        "power": 0,
        "formula": "0.05"
      }
    ],
    "Talisman_SetAffix_CritDamage": [
      {
        "power": 0,
        "formula": "0.15"
      }
    ],
    "Talisman_SetAffix_OverpowerDamage": [
      {
        "power": 0,
        "formula": "0.12"
      },
      {
        "power": 400,
        "formula": "0.25"
      },
      {
        "power": 700,
        "formula": "0.5"
      }
    ],
    "Talisman_SetAffix_MovementSpeed": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "Talisman_SetAffix_VulDamage": [
      {
        "power": 0,
        "formula": "0.15"
      }
    ],
    "Talisman_SetAffix_ResourceGain": [
      {
        "power": 0,
        "formula": "0.2"
      }
    ],
    "Talisman_SetAffix_Lucky": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "Talisman_SetAffix_ResistanceAll": [
      {
        "power": 0,
        "formula": "0.15"
      }
    ],
    "Talisman_SetAffix_MaxLife": [
      {
        "power": 0,
        "formula": "0.15"
      }
    ],
    "Talisman_SetAffix_Armor": [
      {
        "power": 0,
        "formula": "0.15"
      }
    ],
    "ParagonNodeResourceBonus_LegendaryMajor": [
      {
        "power": 0,
        "formula": "5"
      }
    ],
    "ParagonNodeCritChance_RareMajor": [
      {
        "power": 0,
        "formula": "0.010000000000000002"
      }
    ],
    "ParagonNodeDamageBonusVolatile_RareMajor": [
      {
        "power": 0,
        "formula": "0.020000000000000004"
      }
    ],
    "ParagonNodeDamageBonusTag_Magic": [
      {
        "power": 0,
        "formula": "0.17500000000000002"
      }
    ],
    "ParagonNodeDamageBonusInDemonform_Magic": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonusInShadowform_Magic": [
      {
        "power": 0,
        "formula": "0.1"
      }
    ],
    "ParagonNodeDamageBonusVolatile_Magic": [
      {
        "power": 0,
        "formula": "0.020000000000000004"
      }
    ],
    "GearAffix_Life_Greater": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(5,1,6)"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,7,9)"
      },
      {
        "power": 180,
        "formula": "FloatRandomRangeWithInterval(2,10,12)"
      },
      {
        "power": 210,
        "formula": "FloatRandomRangeWithInterval(3,13,16)"
      },
      {
        "power": 240,
        "formula": "FloatRandomRangeWithInterval(5,17,22)"
      },
      {
        "power": 270,
        "formula": "FloatRandomRangeWithInterval(7,23,30)"
      },
      {
        "power": 300,
        "formula": "FloatRandomRangeWithInterval(9,31,40)"
      },
      {
        "power": 330,
        "formula": "FloatRandomRangeWithInterval(24,41,65)"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(39,66,105)"
      },
      {
        "power": 450,
        "formula": "FloatRandomRangeWithInterval(64,106,170)"
      },
      {
        "power": 510,
        "formula": "FloatRandomRangeWithInterval(94,171,265)"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(119,266,385)"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(139,386,525)"
      },
      {
        "power": 710,
        "formula": "FloatRandomRangeWithInterval(284,526,810)"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(299,811,1110)"
      },
      {
        "power": 820,
        "formula": "FloatRandomRangeWithInterval(414,1111,1525)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(304,1526,1830)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(369,1831,2200)"
      }
    ],
    "Talisman_Exp_Bonus": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,2,3)/100"
      },
      {
        "power": 100,
        "formula": "FloatRandomRangeWithInterval(3,2,5)/100"
      },
      {
        "power": 160,
        "formula": "FloatRandomRangeWithInterval(4,2,6)/100"
      },
      {
        "power": 220,
        "formula": "FloatRandomRangeWithInterval(5,2,7)/100"
      },
      {
        "power": 280,
        "formula": "FloatRandomRangeWithInterval(6,2,8)/100"
      },
      {
        "power": 340,
        "formula": "FloatRandomRangeWithInterval(7,2,9)/100"
      },
      {
        "power": 400,
        "formula": "FloatRandomRangeWithInterval(8,2,10)/100"
      }
    ],
    "GearAffix_Normal_Weapon_Damage": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,10,10)/10"
      },
      {
        "power": 120,
        "formula": "FloatRandomRangeWithInterval(13,20,33)/10"
      },
      {
        "power": 200,
        "formula": "FloatRandomRangeWithInterval(18,27,45)/10"
      },
      {
        "power": 280,
        "formula": "FloatRandomRangeWithInterval(26,39,65)/10"
      },
      {
        "power": 340,
        "formula": "FloatRandomRangeWithInterval(35,53,88)/10"
      },
      {
        "power": 400,
        "formula": "FloatRandomRangeWithInterval(45,68,113)/10"
      },
      {
        "power": 460,
        "formula": "FloatRandomRangeWithInterval(62,93,155)/10"
      },
      {
        "power": 520,
        "formula": "FloatRandomRangeWithInterval(85,127,212)/10"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(134,201,335)/10"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(200,301,501)/10"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(327,489,816)/10"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(41,616,1026)/10"
      },
      {
        "power": 810,
        "formula": "FloatRandomRangeWithInterval(461,690,1151)/10"
      },
      {
        "power": 830,
        "formula": "FloatRandomRangeWithInterval(507,760,1267)/10"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(563,844,1407)/10"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(691,1036,1727)/10"
      }
    ],
    "GearAffix_VeryFast_Weapon_Damage": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,10,10)/10"
      },
      {
        "power": 120,
        "formula": "FloatRandomRangeWithInterval(11,17,28)/10"
      },
      {
        "power": 200,
        "formula": "FloatRandomRangeWithInterval(15,23,38)/10"
      },
      {
        "power": 280,
        "formula": "FloatRandomRangeWithInterval(21,33,54)/10"
      },
      {
        "power": 340,
        "formula": "FloatRandomRangeWithInterval(29,44,73)/10"
      },
      {
        "power": 400,
        "formula": "FloatRandomRangeWithInterval(37,57,94)/10"
      },
      {
        "power": 460,
        "formula": "FloatRandomRangeWithInterval(51,78,129)/10"
      },
      {
        "power": 520,
        "formula": "FloatRandomRangeWithInterval(71,106,177)/10"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(111,168,279)/10"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(167,251,418)/10"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(272,408,680)/10"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(342,513,855)/10"
      },
      {
        "power": 810,
        "formula": "FloatRandomRangeWithInterval(384,575,959)/10"
      },
      {
        "power": 830,
        "formula": "FloatRandomRangeWithInterval(423,633,1056)/10"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(470,703,1173)/10"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(576,863,1439)/10"
      }
    ],
    "GearAffix_Slow_Weapon_Damage": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,10,10)/10"
      },
      {
        "power": 120,
        "formula": "FloatRandomRangeWithInterval(15,22,37)/10"
      },
      {
        "power": 200,
        "formula": "FloatRandomRangeWithInterval(20,30,50)/10"
      },
      {
        "power": 280,
        "formula": "FloatRandomRangeWithInterval(29,43,72)/10"
      },
      {
        "power": 340,
        "formula": "FloatRandomRangeWithInterval(39,59,98)/10"
      },
      {
        "power": 400,
        "formula": "FloatRandomRangeWithInterval(5,76,126)/10"
      },
      {
        "power": 460,
        "formula": "FloatRandomRangeWithInterval(69,103,172)/10"
      },
      {
        "power": 520,
        "formula": "FloatRandomRangeWithInterval(95,141,236)/10"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(149,223,372)/10"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(223,334,557)/10"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(364,543,907)/10"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(456,684,1140)/10"
      },
      {
        "power": 810,
        "formula": "FloatRandomRangeWithInterval(512,767,1279)/10"
      },
      {
        "power": 830,
        "formula": "FloatRandomRangeWithInterval(564,844,1408)/10"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(625,938,1563)/10"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(768,1151,1919)/10"
      }
    ],
    "GearAffix_Fast_Weapon_Damage": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,10,10)/10"
      },
      {
        "power": 120,
        "formula": "FloatRandomRangeWithInterval(12,18,30)/10"
      },
      {
        "power": 200,
        "formula": "FloatRandomRangeWithInterval(16,25,41)/10"
      },
      {
        "power": 280,
        "formula": "FloatRandomRangeWithInterval(24,35,59)/10"
      },
      {
        "power": 340,
        "formula": "FloatRandomRangeWithInterval(32,48,80)/10"
      },
      {
        "power": 400,
        "formula": "FloatRandomRangeWithInterval(41,62,103)/10"
      },
      {
        "power": 460,
        "formula": "FloatRandomRangeWithInterval(56,85,141)/10"
      },
      {
        "power": 520,
        "formula": "FloatRandomRangeWithInterval(78,115,193)/10"
      },
      {
        "power": 605,
        "formula": "FloatRandomRangeWithInterval(122,183,305)/10"
      },
      {
        "power": 665,
        "formula": "FloatRandomRangeWithInterval(181,274,455)/10"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(297,445,742)/10"
      },
      {
        "power": 790,
        "formula": "FloatRandomRangeWithInterval(373,560,933)/10"
      },
      {
        "power": 810,
        "formula": "FloatRandomRangeWithInterval(419,627,1046)/10"
      },
      {
        "power": 830,
        "formula": "FloatRandomRangeWithInterval(461,691,1152)/10"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(512,767,1279)/10"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(628,942,1570)/10"
      }
    ],
    "CharmAffix_PotionHealing_Percent": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1,2)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,2,3)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,3,4)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,4,5)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,5,6)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(2,6,7)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,7,8)/100"
      }
    ],
    "CharmAffix_Life_Percent": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1,2)/100"
      },
      {
        "power": 200,
        "formula": "FloatRandomRangeWithInterval(2,2,3)/100"
      },
      {
        "power": 350,
        "formula": "FloatRandomRangeWithInterval(2,3,4)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,4,5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(3,5,6.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,6.5,8)/100"
      }
    ],
    "CharmAffix_Resistance_Percent": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1,2)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,2,3)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,3,4)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,4,5)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,5,6)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(2,6,7)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,7,8)/100"
      }
    ],
    "CharmAffix_LuckyHit_FlatDamage": [
      {
        "power": 0,
        "formula": "25+5*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 350,
        "formula": "100+10*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 700,
        "formula": "300+25*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 800,
        "formula": "500+50*FloatRandomRangeWithInterval(9,1,10)"
      },
      {
        "power": 900,
        "formula": "FloatRandomRangeWithInterval(70,2800,3500)"
      }
    ],
    "CharmAffix_LuckyHit_CC": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1,2)/100"
      },
      {
        "power": 700,
        "formula": "FloatRandomRangeWithInterval(2,2,3)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(2,3,4)/100"
      }
    ],
    "CharmAffix_Armor_Percent": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1,2)/100"
      },
      {
        "power": 200,
        "formula": "FloatRandomRangeWithInterval(2,2,3)/100"
      },
      {
        "power": 350,
        "formula": "FloatRandomRangeWithInterval(2,3,4)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,4,5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(3,5,6.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,6.5,8)/100"
      }
    ],
    "SealAffix_GoldFind": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(5,1,5)/100"
      },
      {
        "power": 590,
        "formula": "4+FloatRandomRangeWithInterval(6,1,6)/100"
      },
      {
        "power": 760,
        "formula": "9+FloatRandomRangeWithInterval(6,1,6)/100"
      },
      {
        "power": 860,
        "formula": "14+FloatRandomRangeWithInterval(6,1,6)/100"
      }
    ],
    "SealAffix_CoreStat_Percent": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1.5,2.5)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,2.5,3.5)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,3.5,4.5)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,4.5,5.5)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,5.5,6.5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(2,6.5,7.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(5,7.5,10)/100"
      }
    ],
    "SealAffix_AllStats_Percent": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1,2)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,2,3)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(3,3,4.5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(3,4.5,6)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(4,6,8)/100"
      }
    ],
    "SealAffix_CritChance": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1.5,2.5)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,2.5,3.5)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,3.5,4.5)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,4.5,5.5)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,5.5,6.5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(2,6.5,7.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(5,7.5,10)/100"
      }
    ],
    "SealAffix_CooldownCDR": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1.5,2.5)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,2.5,3.5)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,3.5,4.5)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,4.5,5.5)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,5.5,6.5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(2,6.5,7.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(5,7.5,10)/100"
      }
    ],
    "SealAffix_Resource_Cost_Reduction_AllClasses": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1.5,2.5)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,2.5,3.5)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,3.5,4.5)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,4.5,5.5)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,5.5,6.5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(2,6.5,7.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(5,7.5,10)/100"
      }
    ],
    "SealAffix_Armor_Percent": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1.5,2.5)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,2.5,3.5)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,3.5,4.5)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,4.5,5.5)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,5.5,6.5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(2,6.5,7.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(5,7.5,10)/100"
      }
    ],
    "SealAffix_Resistance_Percent": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1.5,2.5)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,2.5,3.5)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,3.5,4.5)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,4.5,5.5)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,5.5,6.5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(2,6.5,7.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(5,7.5,10)/100"
      }
    ],
    "SealAffix_Life_Percent": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,1.5,2.5)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(2,2.5,3.5)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,3.5,4.5)/100"
      },
      {
        "power": 390,
        "formula": "FloatRandomRangeWithInterval(2,4.5,5.5)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,5.5,6.5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(2,6.5,7.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,6.5,8)/100"
      }
    ],
    "SealAffix_Berserk_ProcChance": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,0.5,1.5)/100"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(2,2.5,3.5)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(2,4.5,5.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,6.5,8.5)/100"
      }
    ],
    "SealAffix_Damage_WhileBerserk": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,3,4)/100"
      },
      {
        "power": 170,
        "formula": "FloatRandomRangeWithInterval(2,4,6)/100"
      },
      {
        "power": 370,
        "formula": "FloatRandomRangeWithInterval(3,4,7)/100"
      },
      {
        "power": 470,
        "formula": "FloatRandomRangeWithInterval(3,5,8)/100"
      },
      {
        "power": 620,
        "formula": "FloatRandomRangeWithInterval(4,6,10)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,7,10)/100"
      }
    ],
    "SealAffix_Max_Overpower": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(1,2,3)"
      }
    ],
    "SealAffix_Max_Ferocity": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(1,2,3)"
      }
    ],
    "SealAffix_Max_Resolve": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,1,2)"
      },
      {
        "power": 750,
        "formula": "FloatRandomRangeWithInterval(1,2,3)"
      }
    ],
    "SealAffix_Resource_Max_Percent": [
      {
        "power": 0,
        "formula": "(0.5+0.5*RandomInt(1,2))/100"
      },
      {
        "power": 590,
        "formula": "(2.5+0.4*RandomInt(1,8))/100"
      },
      {
        "power": 750,
        "formula": "(3.6+0.4*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(5+0.4*RandomInt(1,15))/100"
      }
    ],
    "SealAffix_Rupture_Chance": [
      {
        "power": 0,
        "formula": "(0.5+0.5*RandomInt(1,2))/100"
      },
      {
        "power": 590,
        "formula": "(2.5+0.4*RandomInt(1,8))/100"
      },
      {
        "power": 750,
        "formula": "(3.6+0.4*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(5+0.4*RandomInt(1,15))/100"
      }
    ],
    "SealAffix_Damage_DuringCallOfTheAncients": [
      {
        "power": 0,
        "formula": "(0.5+0.5*RandomInt(1,2))/100"
      },
      {
        "power": 590,
        "formula": "(2.5+0.5*RandomInt(1,8))/100"
      },
      {
        "power": 750,
        "formula": "(3+0.5*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(4.5+0.5*RandomInt(1,15))/100"
      }
    ],
    "SealAffix_Armor_Shapeshifted": [
      {
        "power": 0,
        "formula": "(0.5+0.5*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(5.5+0.5*RandomInt(1,8))/100"
      },
      {
        "power": 750,
        "formula": "(6.5+0.5*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(9+0.5*RandomInt(1,15))/100"
      }
    ],
    "SealAffix_Berserk_Duration": [
      {
        "power": 0,
        "formula": "(1+0.5*RandomInt(1,4))/100"
      },
      {
        "power": 590,
        "formula": "(8+0.5*RandomInt(1,8))/100"
      },
      {
        "power": 750,
        "formula": "(9.5+0.5*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(13.5+0.5*RandomInt(1,15))/100"
      }
    ],
    "SealAffix_Petrify_Duration": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(3,0.5,2)"
      },
      {
        "power": 590,
        "formula": "0.5+FloatRandomRangeWithInterval(3,0.5,2)"
      },
      {
        "power": 860,
        "formula": "1+FloatRandomRangeWithInterval(3,0.5,2)"
      }
    ],
    "SealAffix_PlusMana_MasterySkill": [
      {
        "power": 0,
        "formula": "1+FloatRandomRangeWithInterval(6,1,6)"
      },
      {
        "power": 590,
        "formula": "1+FloatRandomRangeWithInterval(8,1,8)"
      },
      {
        "power": 860,
        "formula": "2+FloatRandomRangeWithInterval(8,1,8)"
      }
    ],
    "SealAffix_Balazans_ProcChance": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(2,0.5,1.5)"
      },
      {
        "power": 290,
        "formula": "FloatRandomRangeWithInterval(3,0.5,2)"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(3,1,2.5)"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,1.5,3)"
      }
    ],
    "SealAffix_Thorns_PulseChance": [
      {
        "power": 0,
        "formula": "1+FloatRandomRangeWithInterval(3,3,6)"
      },
      {
        "power": 590,
        "formula": "1+FloatRandomRangeWithInterval(5,5,10)"
      },
      {
        "power": 860,
        "formula": "2+FloatRandomRangeWithInterval(8,5,13)"
      }
    ],
    "SealAffix_FeralRage_TriggerTime": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(3,0.5,2)"
      },
      {
        "power": 590,
        "formula": "0.5+FloatRandomRangeWithInterval(3,0.5,2)"
      },
      {
        "power": 860,
        "formula": "1+FloatRandomRangeWithInterval(3,0.5,2)"
      }
    ],
    "SealAffix_Prowess_Duration": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(3,0.5,2)"
      },
      {
        "power": 590,
        "formula": "0.5+FloatRandomRangeWithInterval(3,0.5,2)"
      },
      {
        "power": 860,
        "formula": "1+FloatRandomRangeWithInterval(3,0.5,2)"
      }
    ],
    "SealAffix_Rampage_Duration": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(3,0.5,2)"
      },
      {
        "power": 590,
        "formula": "0.5+FloatRandomRangeWithInterval(3,0.5,2)"
      },
      {
        "power": 860,
        "formula": "1+FloatRandomRangeWithInterval(3,0.5,2)"
      }
    ],
    "SealAffix_Aura_Potency": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(1,0.5,1)/100"
      },
      {
        "power": 150,
        "formula": "FloatRandomRangeWithInterval(1,1,1.5)/100"
      },
      {
        "power": 350,
        "formula": "FloatRandomRangeWithInterval(1,1.5,2)/100"
      },
      {
        "power": 590,
        "formula": "FloatRandomRangeWithInterval(1,2,2.5)/100"
      },
      {
        "power": 760,
        "formula": "FloatRandomRangeWithInterval(1,2.5,3)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(1,3,3.5)/100"
      },
      {
        "power": 850,
        "formula": "FloatRandomRangeWithInterval(3,3.5,5)/100"
      }
    ],
    "SealAffix_Grenade_SpawnChance": [
      {
        "power": 0,
        "formula": "FloatRandomRangeWithInterval(5,4,9)/100"
      },
      {
        "power": 625,
        "formula": "FloatRandomRangeWithInterval(5,6,11)/100"
      },
      {
        "power": 780,
        "formula": "FloatRandomRangeWithInterval(5,8,13)/100"
      }
    ],
    "SealAffix_BlockChance": [
      {
        "power": 0,
        "formula": "(1+0.5*RandomInt(1,5))/100"
      },
      {
        "power": 590,
        "formula": "(18+0.5*RandomInt(1,9))/100"
      },
      {
        "power": 750,
        "formula": "(9.5+0.5*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(13.5+0.5*RandomInt(1,15))/100"
      }
    ],
    "Seal_Affix_DodgeChance": [
      {
        "power": 0,
        "formula": "(0.8+0.2*RandomInt(1,4))/100"
      },
      {
        "power": 590,
        "formula": "(2.4+0.2*RandomInt(1,8))/100"
      },
      {
        "power": 750,
        "formula": "(2.8+0.2*RandomInt(1,10))/100"
      },
      {
        "power": 800,
        "formula": "(4+0.2*RandomInt(1,15))/100"
      }
    ],
    "SealAffix_Twist_Chance": [
      {
        "power": 0,
        "formula": "(0.5+0.5*RandomInt(1,3))/100"
      },
      {
        "power": 590,
        "formula": "(4+0.5*RandomInt(1,8))/100"
      },
      {
        "power": 750,
        "formula": "(4.5+0.5*RandomInt(1,11))/100"
      },
      {
        "power": 800,
        "formula": "(6.5+0.5*RandomInt(1,15))/100"
      }
    ]
  },
  "attributes": {
    "0": {
      "name": "Axe_Bad_Data",
      "defaultValue": 0
    },
    "1": {
      "name": "Stash_Slots_Total",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "Stash_Slots_Initial_And_Purchased + Stash_Slots_From_Entitlements"
    },
    "2": {
      "name": "Stash_Slots_Initial_And_Purchased",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "3": {
      "name": "Stash_Slots_From_Entitlements",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "4": {
      "name": "Strength",
      "defaultValue": 0
    },
    "5": {
      "name": "Intelligence",
      "defaultValue": 0
    },
    "6": {
      "name": "Willpower",
      "defaultValue": 0
    },
    "7": {
      "name": "Dexterity",
      "defaultValue": 0
    },
    "8": {
      "name": "Plus_All_Stats",
      "defaultValue": 0
    },
    "9": {
      "name": "Strength_Core",
      "defaultValue": 0
    },
    "10": {
      "name": "Intelligence_Core",
      "defaultValue": 0
    },
    "11": {
      "name": "Willpower_Core",
      "defaultValue": 0
    },
    "12": {
      "name": "Dexterity_Core",
      "defaultValue": 0
    },
    "13": {
      "name": "Strength_Percent_Bonus",
      "defaultValue": 0
    },
    "14": {
      "name": "Intelligence_Percent_Bonus",
      "defaultValue": 0
    },
    "15": {
      "name": "Willpower_Percent_Bonus",
      "defaultValue": 0
    },
    "16": {
      "name": "Dexterity_Percent_Bonus",
      "defaultValue": 0
    },
    "17": {
      "name": "All_Stats_Percent_Bonus",
      "defaultValue": 0
    },
    "18": {
      "name": "Strength_Total",
      "defaultValue": 0,
      "formula": "(Strength     + Strength_Core     + Plus_All_Stats + Core_Stats_Bonus_Strength)     * (1.0 + (Strength_Percent_Bonus     + All_Stats_Percent_Bonus))"
    },
    "19": {
      "name": "Intelligence_Total",
      "defaultValue": 0,
      "formula": "(Intelligence + Intelligence_Core + Plus_All_Stats + Core_Stats_Bonus_Intelligence) * (1.0 + (Intelligence_Percent_Bonus + All_Stats_Percent_Bonus))"
    },
    "20": {
      "name": "Willpower_Total",
      "defaultValue": 0,
      "formula": "(Willpower    + Willpower_Core    + Plus_All_Stats + Core_Stats_Bonus_Willpower)    * (1.0 + (Willpower_Percent_Bonus    + All_Stats_Percent_Bonus))"
    },
    "21": {
      "name": "Dexterity_Total",
      "defaultValue": 0,
      "formula": "(Dexterity    + Dexterity_Core    + Plus_All_Stats + Core_Stats_Bonus_Dexterity)    * (1.0 + (Dexterity_Percent_Bonus    + All_Stats_Percent_Bonus))"
    },
    "22": {
      "name": "Core_Stats_Bonus_Strength",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "23": {
      "name": "Core_Stats_Bonus_Intelligence",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "24": {
      "name": "Core_Stats_Bonus_Willpower",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "25": {
      "name": "Core_Stats_Bonus_Dexterity",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "26": {
      "name": "Core_Stat_Minor_Benefit_Scalar_Strength",
      "operator": 1,
      "defaultValue": 0
    },
    "27": {
      "name": "Core_Stat_Minor_Benefit_Scalar_Intelligence",
      "operator": 1,
      "defaultValue": 0
    },
    "28": {
      "name": "Core_Stat_Minor_Benefit_Scalar_Willpower",
      "operator": 1,
      "defaultValue": 0
    },
    "29": {
      "name": "Core_Stat_Minor_Benefit_Scalar_Dexterity",
      "operator": 1,
      "defaultValue": 0
    },
    "30": {
      "name": "Experience_Granted",
      "int": true,
      "defaultValue": 0
    },
    "31": {
      "name": "Experience_Next_Hi",
      "int": true,
      "defaultValue": 0
    },
    "32": {
      "name": "Experience_Next_Lo",
      "int": true,
      "defaultValue": 0
    },
    "33": {
      "name": "Paragon_Experience_Next_Hi",
      "int": true,
      "defaultValue": 0
    },
    "34": {
      "name": "Paragon_Experience_Next_Lo",
      "int": true,
      "defaultValue": 0
    },
    "35": {
      "name": "Rest_Experience_Hi",
      "int": true,
      "defaultValue": 0
    },
    "36": {
      "name": "Rest_Experience_Lo",
      "int": true,
      "defaultValue": 0
    },
    "37": {
      "name": "Rest_Experience_Bonus_Percent",
      "operator": 1,
      "defaultValue": 0
    },
    "38": {
      "name": "Gold_Granted",
      "int": true,
      "defaultValue": 0
    },
    "39": {
      "name": "Currency_Cap_Bonus_Amount",
      "paramType": 35,
      "int": true,
      "defaultValue": 0
    },
    "40": {
      "name": "Currency_Drop_Percent_Bonus",
      "paramType": 35,
      "defaultValue": 0
    },
    "41": {
      "name": "Subzone_Modifier_Event_Death_Percentage_Currency_Lost_Override",
      "paramType": 35,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "42": {
      "name": "Level",
      "int": true,
      "defaultValue": 0
    },
    "43": {
      "name": "Level_Cap",
      "int": true,
      "defaultValue": 0
    },
    "44": {
      "name": "Paragon_Level",
      "int": true,
      "defaultValue": 0
    },
    "45": {
      "name": "Difficulty_Tier_Offset_On_Player",
      "int": true,
      "defaultValue": 0
    },
    "46": {
      "name": "Difficulty_Tier_Offset_On_Player_Monster_Tag",
      "paramType": 15,
      "int": true,
      "defaultValue": 0
    },
    "47": {
      "name": "Intensity_Level",
      "defaultValue": 0
    },
    "48": {
      "name": "Monster_Combat_Scaling_Level",
      "int": true,
      "defaultValue": 0
    },
    "49": {
      "name": "Monster_Combat_Scaling_Level_Distribution",
      "defaultValue": 0
    },
    "50": {
      "name": "Monster_Level_Offset_For_Player",
      "int": true,
      "defaultValue": 0
    },
    "51": {
      "name": "Monster_Level_Override",
      "int": true,
      "defaultValue": 0
    },
    "52": {
      "name": "Pet_Flat_Health",
      "defaultValue": 0
    },
    "53": {
      "name": "Pet_Health_Bonus_Percent",
      "operator": 7,
      "defaultValue": 0
    },
    "54": {
      "name": "Pet_Armor_Bonus_Percent",
      "defaultValue": 0
    },
    "55": {
      "name": "Pet_All_Resistance_Bonus_Percent",
      "defaultValue": 0
    },
    "56": {
      "name": "Debug_Damage_Percent_Multiply",
      "operator": 7,
      "defaultValue": 0
    },
    "57": {
      "name": "Debug_Damage_Percent_Bonus",
      "operator": 7,
      "defaultValue": 0
    },
    "58": {
      "name": "Debug_Damage_Reduction_Percent_Bonus",
      "operator": 7,
      "defaultValue": 0
    },
    "59": {
      "name": "Debug_Stagger_Percent_Bonus",
      "operator": 7,
      "defaultValue": 0
    },
    "60": {
      "name": "Debug_Extra_Zone_Progress_Per_Zone",
      "paramType": 31,
      "int": true,
      "defaultValue": 0
    },
    "61": {
      "name": "Max_Completed_Level_KeyDun",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "62": {
      "name": "Last_Completed_Level_KeyDun",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "63": {
      "name": "Faster_Healing_Percent",
      "defaultValue": 0
    },
    "64": {
      "name": "Spending_Resource_Heals_Percent",
      "paramType": 7,
      "defaultValue": 0
    },
    "65": {
      "name": "Bonus_Healing_Received_Percent",
      "defaultValue": 0
    },
    "66": {
      "name": "Core_Stat_Bonus_Healing_Received_Percent",
      "defaultValue": 0,
      "formula": "Core_Stat_Minor_Benefit_Scalar_Willpower * Willpower_Total"
    },
    "67": {
      "name": "Reduced_Healing_Received_Percent",
      "defaultValue": 0
    },
    "68": {
      "name": "Resource_To_Health_Conversion_Rate",
      "operator": 7,
      "defaultValue": 0
    },
    "69": {
      "name": "Experience_Bonus",
      "defaultValue": 0
    },
    "70": {
      "name": "Experience_Bonus_Percent",
      "defaultValue": 0
    },
    "71": {
      "name": "Experience_Bonus_Percent_Total",
      "defaultValue": 0,
      "formula": "Experience_Bonus_Percent "
    },
    "72": {
      "name": "Experience_Bonus_Percent_Vs_Elites",
      "defaultValue": 0
    },
    "73": {
      "name": "Multiplicative_Experience_Bonus_Percent",
      "operator": 7,
      "defaultValue": 0
    },
    "74": {
      "name": "Resistance",
      "paramType": 0,
      "int": true,
      "defaultValue": 0
    },
    "75": {
      "name": "Resistance_Bonus",
      "paramType": 0,
      "int": true,
      "defaultValue": 0
    },
    "76": {
      "name": "Resistance_Bonus_Percent",
      "paramType": 0,
      "defaultValue": 0
    },
    "77": {
      "name": "Resistance_All",
      "int": true,
      "defaultValue": 0
    },
    "78": {
      "name": "Resistance_All_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "79": {
      "name": "Resistance_All_Bonus_Percent",
      "defaultValue": 0
    },
    "80": {
      "name": "Resistance_All_Core_Stat_Bonus",
      "int": true,
      "defaultValue": 0,
      "formula": "Round(Core_Stat_Minor_Benefit_Scalar_Intelligence * Intelligence_Total)"
    },
    "81": {
      "name": "Resistance_Total",
      "paramType": 0,
      "operator": 1,
      "int": true,
      "defaultValue": 0,
      "formula": "Round((Resistance + Resistance_Bonus + Resistance_All#NONE + Resistance_All_Bonus#NONE + Resistance_All_Core_Stat_Bonus#NONE) * (1.0 + Resistance_Bonus_Percent + Resistance_All_Bonus_Percent#NONE))"
    },
    "82": {
      "name": "Class_Damage_Reduction_Percent_PvE",
      "defaultValue": 0
    },
    "83": {
      "name": "Skill",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "84": {
      "name": "Skill_Special_Unlock",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "85": {
      "name": "Skill_Points_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "86": {
      "name": "Skill_Points_Earned",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "87": {
      "name": "Skill_Points_Earned_Total",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "Skill_Points_Earned + Skill_Points_Bonus",
      "formulaItem": "Skill_Points_Earned + Skill_Points_Bonus"
    },
    "88": {
      "name": "Skill_Points_Spent",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "89": {
      "name": "Skill_Tree_Skill_Unlocked",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "90": {
      "name": "Skill_Tree_Skill_Mod_Unlocked",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "91": {
      "name": "Mercenary_Skill_Points_Bonus",
      "paramType": 14,
      "int": true,
      "defaultValue": 0
    },
    "92": {
      "name": "Mercenary_Skill",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "93": {
      "name": "Mercenary_Skill_Points_Earned",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "94": {
      "name": "Mercenary_Skill_Points_Earned_Total",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "Mercenary_Skill_Points_Earned + Mercenary_Skill_Points_Bonus"
    },
    "95": {
      "name": "Mercenary_Skill_Points_Spent",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "96": {
      "name": "Generic_Skill_Points_Bonus",
      "paramType": 41,
      "int": true,
      "defaultValue": 0
    },
    "97": {
      "name": "Generic_Skill_Points_Earned",
      "paramType": 41,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "98": {
      "name": "Generic_Skill_Points_Earned_Total",
      "paramType": 41,
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "Generic_Skill_Points_Earned + Generic_Skill_Points_Bonus"
    },
    "99": {
      "name": "Generic_Skill_Points_Spent",
      "paramType": 41,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "100": {
      "name": "TeamID",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "101": {
      "name": "Team_Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "102": {
      "name": "Invulnerable",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "103": {
      "name": "Death_Triggered",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "104": {
      "name": "Death_Reason",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "105": {
      "name": "Dead",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "106": {
      "name": "Disable_Dur_Hit_On_Rez",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "107": {
      "name": "Loading",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "108": {
      "name": "Loading_Player_ACD",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "109": {
      "name": "Loading_Power_SNO",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "110": {
      "name": "Loading_Anim_Key",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "111": {
      "name": "No_Damage",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "112": {
      "name": "Take_Zero_Damage",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "113": {
      "name": "No_AutoPickup",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "114": {
      "name": "Hitpoints_Cur_Limit_Mult",
      "operator": 5,
      "defaultValue": 1
    },
    "115": {
      "name": "Hitpoints_Cur",
      "defaultValue": 0,
      "formula": "Min(Hitpoints_Cur.Agg, Hitpoints_Max_Total * Hitpoints_Cur_Limit_Mult)"
    },
    "116": {
      "name": "Hitpoints_Granted",
      "defaultValue": 0
    },
    "117": {
      "name": "Hitpoints_Over_Time_Granted_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "118": {
      "name": "Hitpoints_Max",
      "defaultValue": 0
    },
    "119": {
      "name": "Hitpoints_Max_Bonus",
      "defaultValue": 0
    },
    "120": {
      "name": "Hitpoints_Max_Total",
      "defaultValue": 0,
      "formula": "Max(0.01, Use_Prog2_Monster_HP_Formula ? Monster_HP_Max_Total : Default_HP_Max_Total)"
    },
    "121": {
      "name": "Hitpoints_Max_Base",
      "defaultValue": 0
    },
    "122": {
      "name": "Hitpoints_Percent",
      "defaultValue": 0
    },
    "123": {
      "name": "Hitpoints_Scalar",
      "paramType": 39,
      "defaultValue": 0
    },
    "124": {
      "name": "Monster_HP_Max_Total",
      "defaultValue": 0,
      "formula": "(Hitpoints_Max + TableHealthFromFlat(Flat_Hitpoints_Max_Bonus + Flat_Hitpoints_Max_Bonus_Unscaled_By_Player_Health, Level)) * (1 + Hitpoints_Max_Percent_Bonus) * Hitpoints_Scalar#DifficultyTier"
    },
    "125": {
      "name": "Default_HP_Max_Total",
      "defaultValue": 0,
      "formula": "(Hitpoints_Max + Hitpoints_Max_Bonus + TableHealthFromFlat(Flat_Hitpoints_Max_Bonus + Flat_Hitpoints_Max_Bonus_Unscaled_By_Player_Health, Level)) * (1 + Hitpoints_Max_Percent_Bonus) * (1 + Hitpoints_Max_Percent_Bonus_Item)"
    },
    "126": {
      "name": "Use_Prog2_Monster_HP_Formula",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "127": {
      "name": "Monster_Tag_Damage_Scalar",
      "defaultValue": 0
    },
    "128": {
      "name": "Flat_Hitpoints_Granted",
      "defaultValue": 0
    },
    "129": {
      "name": "Flat_Hitpoints_Granted_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "130": {
      "name": "Flat_Hitpoints_Over_Time_Granted",
      "defaultValue": 0
    },
    "131": {
      "name": "Flat_Hitpoints_Over_Time_Granted_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "132": {
      "name": "Percent_Hitpoints_Over_Time_Granted",
      "defaultValue": 0
    },
    "133": {
      "name": "Flat_Hitpoints_Max_Bonus",
      "defaultValue": 0
    },
    "134": {
      "name": "Flat_Hitpoints_Max_Bonus_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "135": {
      "name": "Hitpoints_Regen_Per_Second",
      "defaultValue": 0
    },
    "136": {
      "name": "Hitpoints_Regen_Per_Second_Bonus",
      "defaultValue": 0
    },
    "137": {
      "name": "Hitpoints_Regen_Bonus_Percent",
      "operator": 7,
      "defaultValue": 0
    },
    "138": {
      "name": "Hitpoints_Regen_Per_Second_Subtotal",
      "defaultValue": 0,
      "formula": "(Hitpoints_Regen_Per_Second + Hitpoints_Regen_Per_Second_Bonus) * (1 + Hitpoints_Regen_Bonus_Percent)"
    },
    "139": {
      "name": "Hitpoints_Regen_Reduction_Percent",
      "operator": 6,
      "defaultValue": 0
    },
    "140": {
      "name": "Hitpoints_Regen_Per_Second_Health_Globe",
      "defaultValue": 0
    },
    "141": {
      "name": "Hitpoints_Regen_Per_Second_Total",
      "defaultValue": 0,
      "formula": "(Hitpoints_Regen_Per_Second_Subtotal * Pin(1 - Hitpoints_Regen_Reduction_Percent, 0, 1)) + Hitpoints_Regen_Per_Second_Health_Globe"
    },
    "142": {
      "name": "Hitpoints_Max_Percent_Bonus",
      "defaultValue": 0
    },
    "143": {
      "name": "Hitpoints_Max_Percent_Bonus_Item",
      "defaultValue": 0
    },
    "144": {
      "name": "Hitpoints_Frozen",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "145": {
      "name": "DOT_Damage_Taken_Queued",
      "paramType": 8,
      "operator": 1,
      "defaultValue": 0
    },
    "146": {
      "name": "DOT_Damage_Taken_Queued_Scaled",
      "paramType": 8,
      "operator": 1,
      "defaultValue": 0
    },
    "147": {
      "name": "Damage_Shield_Amount_Queued",
      "paramType": 8,
      "operator": 1,
      "defaultValue": 0
    },
    "148": {
      "name": "DOT_Damage_Taken_Queued_Player",
      "operator": 1,
      "defaultValue": 0
    },
    "149": {
      "name": "DOT_Damage_Taken_Queued_Player_Scaled",
      "operator": 1,
      "defaultValue": 0
    },
    "150": {
      "name": "Resource_Type_Primary",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "151": {
      "name": "Resource_Type_Secondary",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "152": {
      "name": "Resource_Contribution_From_Strength",
      "paramType": 7,
      "operator": 1,
      "defaultValue": 0
    },
    "153": {
      "name": "Resource_Contribution_From_Dexterity",
      "paramType": 7,
      "operator": 1,
      "defaultValue": 0
    },
    "154": {
      "name": "Resource_Contribution_From_Intelligence",
      "paramType": 7,
      "operator": 1,
      "defaultValue": 0
    },
    "155": {
      "name": "Resource_Contribution_From_Willpower",
      "paramType": 7,
      "operator": 1,
      "defaultValue": 0
    },
    "156": {
      "name": "Resource_Contribution_From_Stats_Total",
      "paramType": 7,
      "defaultValue": 0,
      "formula": "(Strength_Total#NONE * Resource_Contribution_From_Strength) + (Dexterity_Total#NONE * Resource_Contribution_From_Dexterity) + (Intelligence_Total#NONE * Resource_Contribution_From_Intelligence) + (Willpower_Total#NONE * Resource_Contribution_From_Willpower)"
    },
    "157": {
      "name": "Resource_Cur_Limit_Mult",
      "paramType": 7,
      "operator": 5,
      "defaultValue": 1
    },
    "158": {
      "name": "Resource_Cur",
      "paramType": 7,
      "defaultValue": 0
    },
    "159": {
      "name": "Resource_Min",
      "paramType": 7,
      "defaultValue": 0
    },
    "160": {
      "name": "Resource_Max",
      "paramType": 7,
      "defaultValue": 0
    },
    "161": {
      "name": "Resource_Max_Bonus",
      "paramType": 7,
      "defaultValue": 0
    },
    "162": {
      "name": "Resource_All_Primary_Max_Bonus",
      "defaultValue": 0
    },
    "163": {
      "name": "Resource_Max_Per_Level",
      "paramType": 7,
      "defaultValue": 0
    },
    "164": {
      "name": "Resource_Max_Percent_Bonus",
      "paramType": 7,
      "defaultValue": 0
    },
    "165": {
      "name": "Resource_Max_Total",
      "paramType": 7,
      "defaultValue": 0,
      "formula": "Max((Resource_Max + ((Level#NONE - 1) * Resource_Max_Per_Level) + Resource_Max_Bonus + Resource_Contribution_From_Stats_Total) * (Resource_Max_Percent_Bonus + 1), 0)"
    },
    "166": {
      "name": "Resource_Regen_Per_Second",
      "paramType": 7,
      "defaultValue": 0
    },
    "167": {
      "name": "Resource_Regen_Bonus_Percent",
      "paramType": 7,
      "defaultValue": 0
    },
    "168": {
      "name": "Resource_Regen_All_Primary_Bonus_Percent",
      "defaultValue": 0
    },
    "169": {
      "name": "Resource_Regen_Percent_Per_Second",
      "paramType": 7,
      "defaultValue": 0
    },
    "170": {
      "name": "Resource_Regen_Scalar",
      "paramType": 7,
      "operator": 4,
      "defaultValue": 1
    },
    "171": {
      "name": "Resource_Regen_Total",
      "paramType": 7,
      "defaultValue": 0,
      "formula": "((Resource_Regen_Per_Second * (Resource_Regen_Bonus_Percent + 1) * (Resource_Gain_And_Regen_Bonus_Percent + 1)) + (Resource_Regen_Percent_Per_Second * Resource_Max_Total)) * Resource_Regen_Scalar"
    },
    "172": {
      "name": "Resource_STARTING_PERCENT",
      "paramType": 7,
      "operator": 1,
      "defaultValue": 0
    },
    "173": {
      "name": "Resource_Gained_Per_Percent_Damage_Taken",
      "paramType": 7,
      "defaultValue": 0
    },
    "174": {
      "name": "Resource_Cost_Reduction_Amount",
      "paramType": 7,
      "int": true,
      "defaultValue": 0
    },
    "175": {
      "name": "Resource_Cost_Reduction_Percent",
      "paramType": 7,
      "operator": 6,
      "defaultValue": 0
    },
    "176": {
      "name": "Resource_Cost_Reduction_Percent_All",
      "operator": 6,
      "defaultValue": 0
    },
    "177": {
      "name": "Resource_Ignores_Cost_Reduction_Percent_All",
      "paramType": 7,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "178": {
      "name": "Damage_Type_Resource_Cost_Reduction_Percent",
      "paramType": 0,
      "operator": 6,
      "defaultValue": 0
    },
    "179": {
      "name": "Skill_Tag_Resource_Cost_Reduction_Percent",
      "paramType": 33,
      "operator": 6,
      "defaultValue": 0
    },
    "180": {
      "name": "Power_Resource_Cost_Reduction_Amount",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "181": {
      "name": "Power_Resource_Cost_Reduction_Percent",
      "paramType": 5,
      "operator": 6,
      "defaultValue": 0
    },
    "182": {
      "name": "Resource_Gain_Bonus_Percent",
      "paramType": 7,
      "defaultValue": 0
    },
    "183": {
      "name": "Resource_Gain_Bonus_Percent_All_Primary",
      "defaultValue": 0
    },
    "184": {
      "name": "Resource_Gain_Bonus_Percent_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "185": {
      "name": "Resource_Gain_Bonus_Percent_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "186": {
      "name": "Resource_Gain_And_Regen_Bonus_Percent",
      "paramType": 7,
      "defaultValue": 0
    },
    "187": {
      "name": "Resource_Gain_And_Regen_Bonus_Percent_All_Primary",
      "defaultValue": 0
    },
    "188": {
      "name": "Resource_Gain_Reduction_Percent",
      "paramType": 7,
      "operator": 6,
      "defaultValue": 0
    },
    "189": {
      "name": "Primary_Resource_Gain_Bonus_Percent_Per_Weapon_Requirement",
      "paramType": 24,
      "defaultValue": 0
    },
    "190": {
      "name": "Primary_Resource_On_Cast_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "191": {
      "name": "Primary_Resource_On_Cast_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "192": {
      "name": "Movement_Scalar",
      "defaultValue": 0
    },
    "193": {
      "name": "Walking_Rate",
      "defaultValue": 0
    },
    "194": {
      "name": "Running_Rate",
      "defaultValue": 0
    },
    "195": {
      "name": "Sprinting_Rate",
      "defaultValue": 0
    },
    "196": {
      "name": "Strafing_Rate",
      "defaultValue": 0
    },
    "197": {
      "name": "Walking_Rate_Total",
      "defaultValue": 0,
      "formula": "Walking_Rate * Movement_Scalar_Total"
    },
    "198": {
      "name": "Running_Rate_Total",
      "defaultValue": 0,
      "formula": "Running_Rate * Movement_Scalar_Total"
    },
    "199": {
      "name": "Last_Running_Rate",
      "defaultValue": 0
    },
    "200": {
      "name": "Sprinting_Rate_Total",
      "defaultValue": 0,
      "formula": "Sprinting_Rate * Movement_Scalar_Total"
    },
    "201": {
      "name": "Strafing_Rate_Total",
      "defaultValue": 0,
      "formula": "Strafing_Rate * Movement_Scalar_Total"
    },
    "202": {
      "name": "Movement_Bonus_Total",
      "operator": 3,
      "defaultValue": 0,
      "formula": "Movement_Bonus_Run_Speed + Combined_Speed_Percent_Bonus",
      "formulaItem": "0"
    },
    "203": {
      "name": "Movement_Scalar_Subtotal",
      "defaultValue": 0,
      "formula": "Max(0.1, Movement_Scalar) * (1 + Movement_Bonus_Total) * (1 - Movement_Scalar_Reduction_Total)",
      "formulaItem": "0"
    },
    "204": {
      "name": "Movement_Scalar_Capped_Total",
      "defaultValue": 0,
      "formula": "Min(Movement_Scalar_Cap, Movement_Scalar_Subtotal)",
      "formulaItem": "0"
    },
    "205": {
      "name": "Movement_Scalar_Uncapped_Bonus",
      "defaultValue": 0
    },
    "206": {
      "name": "Movement_Scalar_Temporary_Bonus",
      "defaultValue": 0
    },
    "207": {
      "name": "Movement_Scalar_Total",
      "defaultValue": 0,
      "formula": "Movement_Scalar_Capped_Total + Movement_Scalar_Uncapped_Bonus + Min(Movement_Scalar_Temporary_Cap, Movement_Scalar_Temporary_Bonus)",
      "formulaItem": "0"
    },
    "208": {
      "name": "Movement_Bonus_Run_Speed",
      "defaultValue": 0
    },
    "209": {
      "name": "Movement_Scalar_Cap",
      "defaultValue": 0
    },
    "210": {
      "name": "Movement_Scalar_Temporary_Cap",
      "defaultValue": 0
    },
    "211": {
      "name": "Movement_Rate",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "212": {
      "name": "Force_Stationary",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "213": {
      "name": "Anim_Permutation_Group",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "214": {
      "name": "Anim_Permutation_Group_Override",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "215": {
      "name": "Invert_Player_Movement",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "216": {
      "name": "Turn_Speed",
      "operator": 1,
      "defaultValue": 0
    },
    "217": {
      "name": "Run_Turn_Speed",
      "operator": 1,
      "defaultValue": 0
    },
    "218": {
      "name": "Default_Attack_Turn_Speed",
      "operator": 1,
      "defaultValue": 0
    },
    "219": {
      "name": "Dynamic_Movement_Data_Override",
      "paramType": 15,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "220": {
      "name": "Knockback_Attack_Scalar",
      "defaultValue": 0
    },
    "221": {
      "name": "Attack_Speed_Percent_Bonus",
      "defaultValue": 0
    },
    "222": {
      "name": "Attack_Speed_Percent_Bonus_For_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "223": {
      "name": "Attack_Speed_Percent_Bonus_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "224": {
      "name": "Attack_Speed_Percent_Bonus_Total",
      "defaultValue": 0,
      "formula": "Attack_Speed_Percent_Bonus + Combined_Speed_Percent_Bonus"
    },
    "225": {
      "name": "Attack_Speed_Percent_Reduction",
      "defaultValue": 0
    },
    "226": {
      "name": "Weapon_Speed_Percent_Bonus",
      "defaultValue": 0
    },
    "227": {
      "name": "Weapon_Speed_Percent_Reduction",
      "defaultValue": 0
    },
    "228": {
      "name": "Attacks_Per_Second_Total",
      "defaultValue": 1,
      "formula": "(1.0 + Weapon_Speed_Percent_Bonus - Weapon_Speed_Percent_Reduction)"
    },
    "229": {
      "name": "Cast_Speed_Percent_Temp_Bonus",
      "defaultValue": 0
    },
    "230": {
      "name": "Cast_Speed_Percent_Temp_Reduction",
      "defaultValue": 0
    },
    "231": {
      "name": "Cast_Speed_Percent_Bonus_For_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "232": {
      "name": "Cast_Speed_Percent_Bonus_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "233": {
      "name": "Combined_Speed_Percent_Bonus",
      "defaultValue": 0
    },
    "234": {
      "name": "AI_Cooldown_Reduction_Percent",
      "defaultValue": 0,
      "formulaItem": "0"
    },
    "235": {
      "name": "Power_Cooldown_Min_Time",
      "defaultValue": 0
    },
    "236": {
      "name": "Power_Cooldown_Reduction_Percent",
      "paramType": 5,
      "operator": 6,
      "defaultValue": 0
    },
    "237": {
      "name": "Power_Cooldown_Reduction_Percent_All",
      "operator": 6,
      "defaultValue": 0
    },
    "238": {
      "name": "Skill_Tag_Cooldown_Reduction_Percent",
      "paramType": 33,
      "operator": 6,
      "defaultValue": 0
    },
    "239": {
      "name": "Power_Cooldown_Increase_Percent",
      "paramType": 5,
      "operator": 7,
      "defaultValue": 0
    },
    "240": {
      "name": "Power_Cooldown_Increase_Percent_All",
      "operator": 7,
      "defaultValue": 0
    },
    "241": {
      "name": "Power_Cooldown_Flat_Second_Increase_All",
      "defaultValue": 0
    },
    "242": {
      "name": "Disable_Cooldown_Reduction_On_All_Powers",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "243": {
      "name": "Disable_Cooldown_Reduction_Per_Power",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "244": {
      "name": "Force_Min_Cooldown_Per_Power",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "245": {
      "name": "Force_Min_Cooldown_Per_Skill_Tag",
      "paramType": 33,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "246": {
      "name": "Zero_Cooldown_Per_Power",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "247": {
      "name": "Zero_Cooldown_Per_Skill_Tag",
      "paramType": 33,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "248": {
      "name": "Zero_Resource_Cost_Per_Power",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "249": {
      "name": "Zero_Resource_Cost_Per_Skill_Tag",
      "paramType": 33,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "250": {
      "name": "Zero_Charge_Cost_Per_Power",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "251": {
      "name": "Damage_Actor_Scalar",
      "defaultValue": 0
    },
    "252": {
      "name": "Damage_Percent_All_From_Skills",
      "defaultValue": 0
    },
    "253": {
      "name": "Multiplicative_Damage_Percent_All_From_Skills",
      "operator": 7,
      "defaultValue": 0
    },
    "254": {
      "name": "Damage_Type_Percent_Bonus",
      "paramType": 0,
      "defaultValue": 0
    },
    "255": {
      "name": "Multiplicative_Damage_Type_Percent_Bonus",
      "paramType": 0,
      "operator": 7,
      "defaultValue": 0
    },
    "256": {
      "name": "NonPhysical_Damage_Percent_Bonus",
      "defaultValue": 0
    },
    "257": {
      "name": "Multiplicative_Nonphysical_Damage_Percent_Bonus",
      "operator": 7,
      "defaultValue": 0
    },
    "258": {
      "name": "Damage_Percent_Bonus_To_Targets_Affected_By_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "259": {
      "name": "Damage_Percent_Bonus_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "260": {
      "name": "Multiplicative_Damage_Percent_Bonus_Per_Skill_Tag",
      "paramType": 33,
      "operator": 7,
      "defaultValue": 0
    },
    "261": {
      "name": "Multiplicative_Damage_Percent_Bonus_Per_Skill_Tag_To_High_Health",
      "paramType": 33,
      "operator": 7,
      "defaultValue": 0
    },
    "262": {
      "name": "Multiplicative_Damage_Percent_Bonus_Per_Skill_Tag_Vs_CC_All",
      "paramType": 33,
      "operator": 7,
      "defaultValue": 0
    },
    "263": {
      "name": "Damage_Percent_Bonus_Per_Weapon_Requirement",
      "paramType": 24,
      "defaultValue": 0
    },
    "264": {
      "name": "Main_Hand_Damage_Percent_Bonus",
      "defaultValue": 0
    },
    "265": {
      "name": "Multiplicative_Damage_Percent_Bonus_Vs_Stunned_Per_Skill",
      "paramType": 5,
      "operator": 7,
      "defaultValue": 0
    },
    "266": {
      "name": "Multiplicative_Damage_Percent_Bonus_Vs_Frozen_Per_Skill",
      "paramType": 5,
      "operator": 7,
      "defaultValue": 0
    },
    "267": {
      "name": "Flat_Damage_Bonus",
      "paramType": 0,
      "defaultValue": 0
    },
    "268": {
      "name": "Flat_Damage_Bonus_Unscaled_By_Player_Health",
      "paramType": 0,
      "defaultValue": 0
    },
    "269": {
      "name": "Power_Flat_Damage_Bonus",
      "paramType": 5,
      "defaultValue": 0
    },
    "270": {
      "name": "Power_Flat_Damage_Bonus_Unscaled_By_Player_Health",
      "paramType": 5,
      "defaultValue": 0
    },
    "271": {
      "name": "Flat_Damage_On_Hit",
      "defaultValue": 0
    },
    "272": {
      "name": "Flat_Damage_On_Hit_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "273": {
      "name": "Proc_Flat_Element_Damage_On_Hit",
      "paramType": 0,
      "defaultValue": 0
    },
    "274": {
      "name": "Crit_Percent_Base",
      "defaultValue": 0
    },
    "275": {
      "name": "Crit_Percent_Bonus",
      "defaultValue": 0
    },
    "276": {
      "name": "Crit_Percent_Bonus_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "277": {
      "name": "Damage_Type_Crit_Percent_Bonus",
      "paramType": 0,
      "defaultValue": 0
    },
    "278": {
      "name": "Damage_Type_Crit_Percent_Bonus_Vs_Elites",
      "paramType": 0,
      "defaultValue": 0
    },
    "279": {
      "name": "Damage_Type_Crit_Percent_Bonus_To_Below_Half_Health",
      "paramType": 0,
      "defaultValue": 0
    },
    "280": {
      "name": "Crit_Percent_Bonus_Vs_CC_Target",
      "paramType": 20,
      "defaultValue": 0
    },
    "281": {
      "name": "Crit_Percent_Bonus_Vs_CC_Target_Any",
      "defaultValue": 0
    },
    "282": {
      "name": "Crit_Percent_Bonus_To_Vulnerable",
      "defaultValue": 0
    },
    "283": {
      "name": "Crit_Percent_Bonus_To_Weakened",
      "defaultValue": 0
    },
    "284": {
      "name": "Crit_Percent_Bonus_To_Low_Health",
      "defaultValue": 0
    },
    "285": {
      "name": "Crit_Percent_Bonus_To_High_Health",
      "defaultValue": 0
    },
    "286": {
      "name": "Crit_Percent_Bonus_Per_Weapon_Requirement",
      "paramType": 24,
      "defaultValue": 0
    },
    "287": {
      "name": "Lightning_Crit_Percent_Bonus_Vs_CC_Target",
      "paramType": 20,
      "defaultValue": 0
    },
    "288": {
      "name": "Crit_Damage_Percent",
      "defaultValue": 0
    },
    "289": {
      "name": "Multiplicative_Crit_Damage_Percent",
      "operator": 7,
      "defaultValue": 0
    },
    "290": {
      "name": "Crit_Damage_Percent_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "291": {
      "name": "Multiplicative_Crit_Damage_Percent_Per_Skill_Tag",
      "paramType": 33,
      "operator": 7,
      "defaultValue": 0
    },
    "292": {
      "name": "Damage_Type_Crit_Damage_Percent_Bonus",
      "paramType": 0,
      "defaultValue": 0
    },
    "293": {
      "name": "Multiplicative_Damage_Type_Crit_Damage_Percent_Bonus_To_Above_Half_Health",
      "paramType": 0,
      "operator": 7,
      "defaultValue": 0
    },
    "294": {
      "name": "Non_Physical_Crit_Damage_Percent_Bonus",
      "defaultValue": 0
    },
    "295": {
      "name": "Amplify_Damage_Crit_Percent",
      "defaultValue": 0
    },
    "296": {
      "name": "Multiplicative_Amplify_Damage_Crit_Percent",
      "operator": 7,
      "defaultValue": 0
    },
    "297": {
      "name": "Crit_Damage_Percent_Bonus_Vs_CC_Target_Any",
      "defaultValue": 0
    },
    "298": {
      "name": "Crit_Damage_Percent_Bonus_To_Vulnerable",
      "defaultValue": 0
    },
    "299": {
      "name": "Crit_Damage_Percent_Bonus_To_Weakened",
      "defaultValue": 0
    },
    "300": {
      "name": "Crit_Damage_Scalar_Reduction_Percent",
      "operator": 6,
      "defaultValue": 0
    },
    "301": {
      "name": "Crit_Damage_Percent_Per_Weapon_Requirement",
      "paramType": 24,
      "defaultValue": 0
    },
    "302": {
      "name": "Crit_Damage_Percent_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "303": {
      "name": "Multiplicative_Crit_Damage_Percent_Per_Power",
      "paramType": 5,
      "operator": 7,
      "defaultValue": 0
    },
    "304": {
      "name": "Multiplicative_Crit_Damage_Percent_Bonus_To_High_Health_Per_Power",
      "paramType": 5,
      "operator": 7,
      "defaultValue": 0
    },
    "305": {
      "name": "Crit_Damage_Deals_Max_Damage",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "306": {
      "name": "Damage_Variance_Min_Percent_Reduction",
      "operator": 6,
      "defaultValue": 0
    },
    "307": {
      "name": "Damage_Variance_Max_Percent_Bonus",
      "operator": 7,
      "defaultValue": 0
    },
    "308": {
      "name": "Overpower_Chance_Base",
      "defaultValue": 0
    },
    "309": {
      "name": "Overpower_Chance_Bonus",
      "defaultValue": 0
    },
    "310": {
      "name": "Overpower_Chance_Bonus_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "311": {
      "name": "Overpower_Chance_Bonus_Per_Skill",
      "paramType": 5,
      "defaultValue": 0
    },
    "312": {
      "name": "Overpower_Chance_Reduction_Percent",
      "operator": 6,
      "defaultValue": 0
    },
    "313": {
      "name": "Overpower_Duration_Bonus_Flat",
      "defaultValue": 0
    },
    "314": {
      "name": "Overpower_Crit_Damage_Bonus_Percent",
      "defaultValue": 0
    },
    "315": {
      "name": "Overpower_Crit_Chance_Bonus",
      "defaultValue": 0
    },
    "316": {
      "name": "Overpower_Stack_Limit_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "317": {
      "name": "Blood_Orb_Pickup_Damage_Percent_Bonus",
      "defaultValue": 0
    },
    "318": {
      "name": "Blood_Orb_Pickup_Damage_Bonus_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "319": {
      "name": "Blood_Orb_Pickup_Healing_Percent_Bonus",
      "defaultValue": 0
    },
    "320": {
      "name": "Blood_Orb_Pickup_Primary_Resource_Gain",
      "defaultValue": 0
    },
    "321": {
      "name": "Blood_Orb_Bonus_Chance_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "322": {
      "name": "Imbued_Skill_Damage_Percent_Bonus",
      "defaultValue": 0
    },
    "323": {
      "name": "Cold_Imbued_Skill_Damage_Percent_Bonus",
      "defaultValue": 0
    },
    "324": {
      "name": "Poison_Imbued_Skill_Damage_Percent_Bonus",
      "defaultValue": 0
    },
    "325": {
      "name": "Shadow_Imbued_Skill_Damage_Percent_Bonus",
      "defaultValue": 0
    },
    "326": {
      "name": "Imbued_Skill_Crit_Damage_Percent_Bonus",
      "defaultValue": 0
    },
    "327": {
      "name": "Imbued_Skill_Strength_Percent_Bonus",
      "operator": 7,
      "defaultValue": 0
    },
    "328": {
      "name": "Bonus_Ice_Armor_Shield_Percent",
      "defaultValue": 0
    },
    "329": {
      "name": "Trap_Arm_Time_Reduction_Seconds",
      "defaultValue": 0
    },
    "330": {
      "name": "Pierce_Chance",
      "defaultValue": 0
    },
    "331": {
      "name": "Block_Chance",
      "defaultValue": 0
    },
    "332": {
      "name": "Block_Damage_Percent",
      "defaultValue": 0
    },
    "333": {
      "name": "Flat_Block_Amount",
      "defaultValue": 0
    },
    "334": {
      "name": "Flat_Block_Amount_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "335": {
      "name": "Block_Damage_Percent_Bonus",
      "operator": 6,
      "defaultValue": 0
    },
    "336": {
      "name": "Block_Damage_Percent_Total",
      "operator": 1,
      "defaultValue": 0,
      "formula": "Min((Block_Damage_Percent + Block_Damage_Percent_Bonus), GetGlobalBlockDamageReductionPercentCap())"
    },
    "337": {
      "name": "Armor_Ignore_Damage_Percent",
      "defaultValue": 0
    },
    "338": {
      "name": "Damage_Armor",
      "defaultValue": 0
    },
    "339": {
      "name": "Dodge_Chance_Bonus",
      "operator": 6,
      "defaultValue": 0
    },
    "340": {
      "name": "Core_Stat_Dodge_Chance_Bonus",
      "defaultValue": 0,
      "formula": "Core_Stat_Minor_Benefit_Scalar_Dexterity * Dexterity_Total"
    },
    "341": {
      "name": "Dodge_Chance_Bonus_Melee",
      "operator": 6,
      "defaultValue": 0
    },
    "342": {
      "name": "Dodge_Chance_Bonus_Ranged",
      "operator": 6,
      "defaultValue": 0
    },
    "343": {
      "name": "Dodge_Chance_Bonus_Additive",
      "defaultValue": 0
    },
    "344": {
      "name": "Dodge_Chance_Bonus_Hide_From_Toughness",
      "defaultValue": 0
    },
    "345": {
      "name": "Dodge_Chance_Bonus_From_Dotted_Enemies",
      "paramType": 1,
      "defaultValue": 0
    },
    "346": {
      "name": "Dodge_Chance_Reduction_Percent",
      "operator": 6,
      "defaultValue": 0
    },
    "347": {
      "name": "Cannot_Dodge",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "348": {
      "name": "Last_Damage_MainActor",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "349": {
      "name": "Last_ACD_Attacked",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "350": {
      "name": "Immunity",
      "paramType": 0,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "351": {
      "name": "Ignores_Critical_Hits",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "352": {
      "name": "Untargetable",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "353": {
      "name": "Untargetable_By_Hostiles",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "354": {
      "name": "Is_Crowd_Control",
      "paramType": 19,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "355": {
      "name": "Crowd_Control_Immune",
      "paramType": 19,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "356": {
      "name": "Immune_To_Knockback",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "357": {
      "name": "Immune_To_Vulnerable",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "358": {
      "name": "CC_Duration_Bonus_Percent",
      "defaultValue": 0
    },
    "359": {
      "name": "CC_Duration_Bonus_Percent_Per_Type",
      "paramType": 19,
      "defaultValue": 0
    },
    "360": {
      "name": "CC_Duration_Bonus_Percent_All_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "361": {
      "name": "CC_Duration_Reduction",
      "operator": 6,
      "defaultValue": 0
    },
    "362": {
      "name": "CC_Duration_Reduction_Per_Type",
      "paramType": 19,
      "operator": 6,
      "defaultValue": 0
    },
    "363": {
      "name": "CC_Duration_Bonus_Percent_Per_Power",
      "paramType": 5,
      "operator": 7,
      "defaultValue": 0
    },
    "364": {
      "name": "Chill_Bonus_Percent",
      "operator": 7,
      "defaultValue": 0
    },
    "365": {
      "name": "Chill_Progressive_Bonus_Slow_Percent",
      "defaultValue": 0
    },
    "366": {
      "name": "Helpful_Buff_Duration_Bonus_Percent",
      "operator": 7,
      "defaultValue": 0
    },
    "367": {
      "name": "Harmful_Buff_Duration_Bonus_Percent",
      "operator": 7,
      "defaultValue": 0
    },
    "368": {
      "name": "Per_Damage_Type_Buff_Duration_Bonus_Percent",
      "paramType": 0,
      "operator": 7,
      "defaultValue": 0
    },
    "369": {
      "name": "Per_Skill_Tag_Buff_Duration_Bonus_Percent",
      "paramType": 33,
      "defaultValue": 0
    },
    "370": {
      "name": "Gethit_Immune",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "371": {
      "name": "AttackSpeed_Reduction_Immune",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "372": {
      "name": "Thorns_Percent",
      "defaultValue": 0
    },
    "373": {
      "name": "Thorns_Flat",
      "defaultValue": 0
    },
    "374": {
      "name": "Thorns_Flat_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "375": {
      "name": "Thorns_AOE_Radius",
      "defaultValue": 0
    },
    "376": {
      "name": "Thorns_Enabled_Flags",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "377": {
      "name": "Thorns_Flat_Percent_Bonus",
      "defaultValue": 0
    },
    "378": {
      "name": "Thorns_Flat_Total",
      "operator": 3,
      "defaultValue": 0,
      "formula": "(Thorns_Flat + Thorns_Flat_Unscaled_By_Player_Health) * (1 + Thorns_Flat_Percent_Bonus)"
    },
    "379": {
      "name": "Thorns_Percent_Bonus_While_Channeling",
      "defaultValue": 0
    },
    "380": {
      "name": "Thorns_Percent_Bonus_While_Fortified",
      "defaultValue": 0
    },
    "381": {
      "name": "Steal_Health_Percent",
      "defaultValue": 0
    },
    "382": {
      "name": "Steal_Mana_Percent",
      "defaultValue": 0
    },
    "383": {
      "name": "Resource_On_Hit",
      "paramType": 7,
      "defaultValue": 0
    },
    "384": {
      "name": "Proc_Resource_On_Hit_Flat",
      "paramType": 7,
      "defaultValue": 0
    },
    "385": {
      "name": "Proc_Resource_On_Hit_Percent",
      "paramType": 7,
      "defaultValue": 0
    },
    "386": {
      "name": "Proc_Resource_On_Hit_Flat_All_Primary",
      "defaultValue": 0
    },
    "387": {
      "name": "Proc_Resource_On_Hit_Percent_All_Primary",
      "defaultValue": 0
    },
    "388": {
      "name": "Resource_On_Hit_Bonus_Pct",
      "paramType": 7,
      "operator": 7,
      "defaultValue": 0
    },
    "389": {
      "name": "Resource_On_Hit_Bonus",
      "paramType": 7,
      "defaultValue": 0
    },
    "390": {
      "name": "Resource_On_Kill",
      "paramType": 7,
      "defaultValue": 0
    },
    "391": {
      "name": "Resource_On_Crit",
      "paramType": 7,
      "defaultValue": 0
    },
    "392": {
      "name": "Flat_Hitpoints_On_Hit",
      "defaultValue": 0
    },
    "393": {
      "name": "Flat_Hitpoints_On_Hit_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "394": {
      "name": "Percent_Life_On_Hit",
      "defaultValue": 0
    },
    "395": {
      "name": "Hitpoints_On_Hit_Total",
      "defaultValue": 0,
      "formula": "(Percent_Life_On_Hit * Hitpoints_Max_Total) + TableHealthFromFlat(Flat_Hitpoints_On_Hit, Level)"
    },
    "396": {
      "name": "Flat_Hitpoints_On_Kill",
      "defaultValue": 0
    },
    "397": {
      "name": "Flat_Hitpoints_On_Kill_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "398": {
      "name": "Percent_Life_On_Kill",
      "defaultValue": 0
    },
    "399": {
      "name": "Hitpoints_On_Kill_Total",
      "defaultValue": 0,
      "formula": "(Percent_Life_On_Kill * Hitpoints_Max_Total) + TableHealthFromFlat(Flat_Hitpoints_On_Kill + Flat_Hitpoints_On_Kill_Unscaled_By_Player_Health, Level)"
    },
    "400": {
      "name": "Last_Proc_Time",
      "operator": 2,
      "int": true,
      "defaultValue": 0
    },
    "401": {
      "name": "Flat_Damage_Shield_On_Kill",
      "defaultValue": 0
    },
    "402": {
      "name": "Flat_Damage_Shield_On_Kill_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "403": {
      "name": "Rope_Overlay",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "404": {
      "name": "General_Cooldown",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "405": {
      "name": "Power_Cooldown",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "406": {
      "name": "Power_Cooldown_Start",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": -2147483648
    },
    "407": {
      "name": "Skill_Slot_Cooldown",
      "paramType": 4,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "408": {
      "name": "Skill_Slot_Cooldown_Start",
      "paramType": 4,
      "operator": 1,
      "int": true,
      "defaultValue": -2147483648
    },
    "409": {
      "name": "Proc_Cooldown",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "410": {
      "name": "Emote_Cooldown",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "411": {
      "name": "Skill_Toggled_State",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "412": {
      "name": "Skill_Charges",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "413": {
      "name": "Skill_Recharge_Amount_Bonus",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "414": {
      "name": "Next_Charge_Gained_time",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "415": {
      "name": "Recharge_Start_Time",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "416": {
      "name": "Recharge_Cooldown_Override",
      "paramType": 5,
      "operator": 1,
      "defaultValue": 0
    },
    "417": {
      "name": "Bonus_Max_Skill_Charges_For_Power",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "418": {
      "name": "Bonus_Max_Skill_Charges_For_Skill_Tag",
      "paramType": 33,
      "int": true,
      "defaultValue": 0
    },
    "419": {
      "name": "Last_Damage_Amount",
      "operator": 2,
      "defaultValue": -1
    },
    "420": {
      "name": "Amplify_Damage_Type_Percent",
      "paramType": 0,
      "defaultValue": 0
    },
    "421": {
      "name": "Multiplicative_Amplify_Damage_Type_Percent",
      "paramType": 0,
      "operator": 7,
      "defaultValue": 0
    },
    "422": {
      "name": "Amplify_Damage_DOT_Type_Percent",
      "paramType": 1,
      "defaultValue": 0
    },
    "423": {
      "name": "Multiplicative_Amplify_Damage_DOT_Type_Percent",
      "paramType": 1,
      "operator": 7,
      "defaultValue": 0
    },
    "424": {
      "name": "Amplify_Damage_Skill_Percent",
      "paramType": 5,
      "defaultValue": 0
    },
    "425": {
      "name": "Multiplicative_Amplify_Damage_Skill_Percent",
      "paramType": 5,
      "operator": 7,
      "defaultValue": 0
    },
    "426": {
      "name": "Amplify_Damage_Percent",
      "defaultValue": 0
    },
    "427": {
      "name": "Amplify_Damage_Percent_For_Actor",
      "paramType": 26,
      "defaultValue": 0
    },
    "428": {
      "name": "Multiplicative_Amplify_Damage_Percent",
      "operator": 7,
      "defaultValue": 0
    },
    "429": {
      "name": "Multiplicative_Amplify_Damage_Percent_For_Actor",
      "paramType": 26,
      "operator": 7,
      "defaultValue": 0
    },
    "430": {
      "name": "Loot_Last_Damage",
      "int": true,
      "defaultValue": 0
    },
    "431": {
      "name": "Item_Quality_Level",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "432": {
      "name": "Item_Quality_Level_Identified",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "433": {
      "name": "Item_Quality_Modifier_Bits",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "434": {
      "name": "Item_Refinement",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "435": {
      "name": "Item_Refinement_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "436": {
      "name": "Item_Refinement_Total",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formulaItem": "Item_Refinement + Item_Refinement_Bonus"
    },
    "437": {
      "name": "Item_Cost_Percent_Bonus",
      "defaultValue": 0
    },
    "438": {
      "name": "Item_Equipped",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "439": {
      "name": "Item_Ping",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "440": {
      "name": "Item_Durability_Percent",
      "operator": 3,
      "defaultValue": 1
    },
    "441": {
      "name": "Item_Durability_Effectiveness",
      "operator": 3,
      "defaultValue": 1
    },
    "442": {
      "name": "Ignore_Durability_Loss",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "443": {
      "name": "Modify_Durability_Loss",
      "operator": 3,
      "defaultValue": 1
    },
    "444": {
      "name": "Requirement",
      "paramType": 2,
      "operator": 1,
      "defaultValue": 0,
      "formulaItem": "FLOOR(Requirement.Agg * (1 + Requirements_Ease_Percent#NONE))"
    },
    "445": {
      "name": "Requirements_Ease_Percent",
      "defaultValue": 0,
      "formula": "0"
    },
    "446": {
      "name": "Requirement_When_Equipped",
      "paramType": 2,
      "operator": 1,
      "defaultValue": 0
    },
    "447": {
      "name": "Sockets",
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "448": {
      "name": "Sockets_Filled",
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "449": {
      "name": "Item_Bound_To_ACD",
      "operator": 3,
      "int": true,
      "defaultValue": -1,
      "formula": "0"
    },
    "450": {
      "name": "Item_Binding_Level_Override",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "451": {
      "name": "Item_Targeted_Player_Class",
      "operator": 3,
      "int": true,
      "defaultValue": -1,
      "formula": "0"
    },
    "452": {
      "name": "Item_Content_License_Requirement",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "453": {
      "name": "ItemStackQuantityHi",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "454": {
      "name": "ItemStackQuantityLo",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "455": {
      "name": "Item_Power",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "456": {
      "name": "Item_Power_Bonus",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "457": {
      "name": "Item_Power_Total",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "Item_Power + Item_Power_Bonus",
      "formulaItem": "Item_Power + Item_Power_Bonus"
    },
    "458": {
      "name": "Item_Upgrade_Count",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "459": {
      "name": "Item_Masterwork_Rank",
      "paramType": 16,
      "int": true,
      "defaultValue": 0
    },
    "460": {
      "name": "Item_Masterwork_Attempts",
      "int": true,
      "defaultValue": 0
    },
    "461": {
      "name": "Effective_Item_Power",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "462": {
      "name": "Total_Weighted_Item_Power",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "463": {
      "name": "Total_Weighted_Item_Power_Override",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "464": {
      "name": "Base_Item_Power_Bonus_Percent",
      "defaultValue": 0
    },
    "465": {
      "name": "Item_Greater_Affix_Count",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "466": {
      "name": "Item_Dropped_World_Tier",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "467": {
      "name": "Item_Dropped_Dungeon_Level",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "468": {
      "name": "Item_Dropped_Keyed_Dungeon_Type",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "469": {
      "name": "Item_Dropped_Difficulty_Tier",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "470": {
      "name": "Debug_Loot_Log_Output_ID",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "471": {
      "name": "Weapon_Damage_Min",
      "int": true,
      "defaultValue": 0
    },
    "472": {
      "name": "Weapon_Damage_Delta",
      "int": true,
      "defaultValue": 0
    },
    "473": {
      "name": "Effective_Weapon_Damage_Min",
      "int": true,
      "defaultValue": 0,
      "formulaItem": "Weapon_Damage_Min * Item_Durability_Effectiveness"
    },
    "474": {
      "name": "Effective_Weapon_Damage_Delta",
      "int": true,
      "defaultValue": 0,
      "formulaItem": "Weapon_Damage_Delta * Item_Durability_Effectiveness"
    },
    "475": {
      "name": "Weapon_Damage_Min_Total",
      "int": true,
      "defaultValue": 0,
      "formula": "Effective_Weapon_Damage_Min"
    },
    "476": {
      "name": "Weapon_Damage_Delta_Total",
      "int": true,
      "defaultValue": 0,
      "formula": "Effective_Weapon_Damage_Delta"
    },
    "477": {
      "name": "Armor",
      "int": true,
      "defaultValue": 0
    },
    "478": {
      "name": "Effective_Armor",
      "int": true,
      "defaultValue": 0,
      "formulaItem": "Armor * Item_Durability_Effectiveness"
    },
    "479": {
      "name": "Armor_Total",
      "int": true,
      "defaultValue": 0,
      "formula": "Max(0, (Effective_Armor + Armor_Bonus + Core_Stat_Armor_Bonus) * (1.0 + Armor_Percent))"
    },
    "480": {
      "name": "Core_Stat_Armor_Bonus",
      "defaultValue": 0,
      "formula": "Core_Stat_Minor_Benefit_Scalar_Strength * Strength_Total"
    },
    "481": {
      "name": "Armor_Percent",
      "defaultValue": 0
    },
    "482": {
      "name": "Werebear_Armor_Percent",
      "defaultValue": 0
    },
    "483": {
      "name": "Werewolf_Armor_Percent",
      "defaultValue": 0
    },
    "484": {
      "name": "Armor_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "485": {
      "name": "Weapon_Damage_Override",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "486": {
      "name": "Armor_Override",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "487": {
      "name": "Incoming_Weapon_Damage_Override",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "488": {
      "name": "Incoming_Armor_Override",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "489": {
      "name": "Paragon_Points_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "490": {
      "name": "Paragon_Points_Earned",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "491": {
      "name": "Paragon_Points_Earned_Total",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "Paragon_Points_Earned + Paragon_Points_Bonus"
    },
    "492": {
      "name": "Paragon_Points_Available",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "493": {
      "name": "Paragon_Node_Is_Purchased",
      "paramType": 28,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "494": {
      "name": "Paragon_Glyph_Affix_Active",
      "paramType": 32,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "495": {
      "name": "Paragon_Glyph_Upgrade_Expected_Level",
      "int": true,
      "defaultValue": 0
    },
    "496": {
      "name": "Paragon_Glyph_Upgrade_Remaining_Attemps",
      "int": true,
      "defaultValue": 0
    },
    "497": {
      "name": "Near_Raid_Banner",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "498": {
      "name": "Run_Speed_Granted",
      "defaultValue": 0
    },
    "499": {
      "name": "Run_Speed_Duration",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "500": {
      "name": "Seed",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "501": {
      "name": "IsCrafted",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "502": {
      "name": "IsVendorBought",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "503": {
      "name": "IsTraded",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "504": {
      "name": "IsEscrowed",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "505": {
      "name": "Legacy_Item_Bits",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "506": {
      "name": "Dye",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "507": {
      "name": "ConsumableAddSockets",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "508": {
      "name": "HighlySalvageable",
      "operator": 1,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "509": {
      "name": "SavedForTownPortal",
      "operator": 1,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "510": {
      "name": "Enchanted_Affix",
      "operator": 3,
      "int": true,
      "defaultValue": -1,
      "formula": "0"
    },
    "511": {
      "name": "Enchanted_Affix_Seed",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "512": {
      "name": "Enchanted_Affix_Carry",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "513": {
      "name": "Enchant_Count",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "514": {
      "name": "Item_Tag_Count",
      "paramType": 15,
      "int": true,
      "defaultValue": 0
    },
    "515": {
      "name": "Item_Granted_Skill_Tree_Reward",
      "paramType": 15,
      "int": true,
      "defaultValue": 0
    },
    "516": {
      "name": "Always_Plays_GetHit",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "517": {
      "name": "Hidden",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "518": {
      "name": "Appearance Hidden",
      "paramType": 26,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "519": {
      "name": "Actor and Attachments Invisible",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "520": {
      "name": "Hide All Attachments",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "521": {
      "name": "Targeting Outline Hidden",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "522": {
      "name": "RActor_Fade_Group",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "523": {
      "name": "Alpha Attachments",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "524": {
      "name": "Ignore_Owner_Alpha_When_Attached",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "525": {
      "name": "Animset Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "526": {
      "name": "Hide_Attachment_By_Tag",
      "paramType": 25,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "527": {
      "name": "Hide Cosmetic Back Attachment",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "528": {
      "name": "Treasure_Class",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "529": {
      "name": "Treasure_Class_Override",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "530": {
      "name": "Removes_Body_On_Death",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "531": {
      "name": "Died_To_Resurrectable_Death",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "532": {
      "name": "Can_Be_Resurrected",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "533": {
      "name": "UntargetableByPets",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "534": {
      "name": "Damage_State_Current",
      "int": true,
      "defaultValue": 0
    },
    "535": {
      "name": "Is_Player_Decoy",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "536": {
      "name": "Custom_Target_Weight",
      "defaultValue": 0
    },
    "537": {
      "name": "Custom_Target_Weight_Per_Actor",
      "paramType": 26,
      "defaultValue": 0
    },
    "538": {
      "name": "Actor_Appearance_Addon_Type",
      "operator": 9,
      "int": true,
      "defaultValue": -1
    },
    "539": {
      "name": "Malignant_Monster_Appearance_Enabled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "540": {
      "name": "Boss_Monster_Hide_Healthbar",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "541": {
      "name": "Gizmo_State",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "542": {
      "name": "Gizmo_Charges",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "543": {
      "name": "Chest_Open",
      "paramType": 4,
      "int": true,
      "defaultValue": 0
    },
    "544": {
      "name": "Door_Timer",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "545": {
      "name": "Gizmo_Disabled_By_Script",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "546": {
      "name": "Gizmo_Operator_ACDID",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "547": {
      "name": "Triggering_Count",
      "int": true,
      "defaultValue": 0
    },
    "548": {
      "name": "Gizmo_Operation_Radius_Override",
      "operator": 1,
      "defaultValue": 0
    },
    "549": {
      "name": "Gizmo_Is_Quest_Restricted",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "550": {
      "name": "Gizmo_Visibility_Is_Quest_Restricted",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "551": {
      "name": "Gizmo_Chair_Occupied",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "552": {
      "name": "Gizmo_Has_Been_Operated",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "553": {
      "name": "Gizmo_Power_Operate",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "554": {
      "name": "Gizmo_Power_Operator",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "555": {
      "name": "Gizmo_Animation_Playback_Speed",
      "defaultValue": 0
    },
    "556": {
      "name": "Gizmo_Scripted_Portal_Destination_Subzone",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "557": {
      "name": "Pet_Owner_ANN",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "558": {
      "name": "Pet_Type",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "559": {
      "name": "DropsNoLoot",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "560": {
      "name": "ForceLootDropOnDeath",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "561": {
      "name": "GrantsNoXP",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "562": {
      "name": "Mercenary_Class",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "563": {
      "name": "Is_Reinforcement_Merc",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "564": {
      "name": "Summoned_By_SNO",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "565": {
      "name": "Parent_Summoning_Skill_SNO",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "566": {
      "name": "Pet_Cannot_Be_Dismissed",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "567": {
      "name": "Follower_Quest",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "568": {
      "name": "Is_Unmanaged_Quest_Follower",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "569": {
      "name": "Pet_Can_Open_Door",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "570": {
      "name": "Pet_Equipped_Proc_Resource_On_Hit_Percent",
      "paramType": 7,
      "defaultValue": 0
    },
    "571": {
      "name": "Pet_Equipped_Solo_Attacker_Damage_Bonus",
      "defaultValue": 0
    },
    "572": {
      "name": "Pet_Equipped_Other_Attacker_Damage_Bonus",
      "defaultValue": 0
    },
    "573": {
      "name": "Pet_Equipped_Recently_Summoned_Damage_Bonus",
      "defaultValue": 0
    },
    "574": {
      "name": "Pet_Inherit_Attrib_Bonus_Pct",
      "defaultValue": 0
    },
    "575": {
      "name": "NecroArmy_Spec_For_Pet_Type",
      "paramType": 29,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "576": {
      "name": "NecroArmy_Specialization1_Upgrade_For_Pet_Type",
      "paramType": 29,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "577": {
      "name": "NecroArmy_Specialization2_Upgrade_For_Pet_Type",
      "paramType": 29,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "578": {
      "name": "NecroArmy_Specialization3_Upgrade_For_Pet_Type",
      "paramType": 29,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "579": {
      "name": "NecroArmy_Pet_Type_Health_Bonus_Pct",
      "paramType": 29,
      "operator": 7,
      "defaultValue": 0
    },
    "580": {
      "name": "NecroArmy_Pet_Type_Inherit_Thorns_Bonus_Pct",
      "paramType": 29,
      "defaultValue": 0
    },
    "581": {
      "name": "NecroArmy_All_Pet_Types_Inherit_Thorns_Bonus_Pct",
      "defaultValue": 0
    },
    "582": {
      "name": "NecroArmy_Pet_Type_Inherit_Crit_Bonus_Pct",
      "paramType": 29,
      "defaultValue": 0
    },
    "583": {
      "name": "NecroArmy_All_Pet_Types_Inherit_Crit_Bonus_Pct",
      "defaultValue": 0
    },
    "584": {
      "name": "NecroArmy_Pet_Type_All_Resist_Bonus_Pct",
      "paramType": 29,
      "defaultValue": 0
    },
    "585": {
      "name": "NecroArmy_Pet_Type_Damage_Bonus_Pct",
      "paramType": 29,
      "defaultValue": 0
    },
    "586": {
      "name": "Multiplicative_NecroArmy_Pet_Type_Damage_Bonus_Pct",
      "paramType": 29,
      "operator": 7,
      "defaultValue": 0
    },
    "587": {
      "name": "NecroArmy_Pet_Type_Armor_Bonus_Pct",
      "paramType": 29,
      "defaultValue": 0
    },
    "588": {
      "name": "NecroArmy_Pet_Type_Attack_Speed_Bonus_Pct",
      "paramType": 29,
      "defaultValue": 0
    },
    "589": {
      "name": "NecroArmy_Damage_Bonus_With_Active_Pet_Type",
      "paramType": 29,
      "defaultValue": 0
    },
    "590": {
      "name": "NecroArmy_Flat_Armor_Bonus_With_Active_Pet_Type",
      "paramType": 29,
      "int": true,
      "defaultValue": 0
    },
    "591": {
      "name": "NecroArmy_Armor_Percent_Bonus_With_Active_Pet_Type",
      "paramType": 29,
      "defaultValue": 0
    },
    "592": {
      "name": "Pet_Max_Count_Bonus_Per_Pet_Type",
      "paramType": 38,
      "int": true,
      "defaultValue": 0
    },
    "593": {
      "name": "Is_NPC",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "594": {
      "name": "NPC_Is_Operatable",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "595": {
      "name": "NPC_Is_Escorting",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "596": {
      "name": "NPC_Has_Interact_Options",
      "paramType": 8,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "597": {
      "name": "Conversation_Icon",
      "paramType": 8,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "598": {
      "name": "Conversation_Icon_Quest",
      "paramType": 8,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "599": {
      "name": "Callout_Cooldown",
      "paramType": 13,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "600": {
      "name": "Banter_Cooldown",
      "paramType": 13,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "601": {
      "name": "Conversation_Heard_Count",
      "paramType": 13,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "602": {
      "name": "Last_Tick_Shop_Entered",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "603": {
      "name": "Bow",
      "defaultValue": 0
    },
    "604": {
      "name": "Crossbow",
      "defaultValue": 0
    },
    "605": {
      "name": "BowAny",
      "defaultValue": 0,
      "formula": "Pin(Bow + Crossbow, 0, 1)",
      "formulaItem": "Pin(Bow + Crossbow, 0, 1)"
    },
    "606": {
      "name": "Spawned_by_ACDID",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "607": {
      "name": "Summoned_By_ACDID",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "608": {
      "name": "Summoner_ID",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "609": {
      "name": "Use_Summoner_Damage_Stats",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "610": {
      "name": "Current_WeaponClass",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "611": {
      "name": "Disabled_WeaponClass",
      "paramType": 37,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "612": {
      "name": "Follower_Sheath_Action",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "613": {
      "name": "Weapons_Sheathed",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "614": {
      "name": "Held_In_OffHand",
      "operator": 1,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "615": {
      "name": "Active_Weapon_Slot",
      "paramType": 17,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "616": {
      "name": "In_Combat",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "617": {
      "name": "Last_In_Combat_Time",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "618": {
      "name": "Combat_Start_Time",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "619": {
      "name": "Scripted_In_Combat",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "620": {
      "name": "Combat_Bloodiness",
      "operator": 1,
      "defaultValue": 0
    },
    "621": {
      "name": "Shapeshifting_Stay_In_Form",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "622": {
      "name": "Shapeshifting_Queue_Back_To_Human",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "623": {
      "name": "Shapeshift_Form",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "624": {
      "name": "Skill_Shapeshift_Form_Wolf_Override",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "625": {
      "name": "Skill_Shapeshift_Form_Bear_Override",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "626": {
      "name": "Default_Shapeshift_Form_Wolf_Override",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "627": {
      "name": "Default_Shapeshift_Form_Bear_Override",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "628": {
      "name": "In_Conversation",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "629": {
      "name": "Last_Tick_Potion_Used",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "630": {
      "name": "Potion_Bonus_Heal_Percent",
      "defaultValue": 0
    },
    "631": {
      "name": "Potion_Cooldown_Reduction_Percent",
      "operator": 6,
      "defaultValue": 0
    },
    "632": {
      "name": "Potion_Converts_Initial_Heal_To_Barrier_Percent",
      "defaultValue": 0
    },
    "633": {
      "name": "Potion_Doses",
      "operator": 1,
      "int": true,
      "defaultValue": -1,
      "formula": "Min(Potion_Doses.Agg, Potion_Max_Doses_Total)"
    },
    "634": {
      "name": "Potion_Max_Doses_Base",
      "int": true,
      "defaultValue": 0
    },
    "635": {
      "name": "Potion_Max_Doses_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "636": {
      "name": "Potion_Max_Doses_Total",
      "int": true,
      "defaultValue": 0,
      "formula": "Potion_Max_Doses_Base + Potion_Max_Doses_Bonus"
    },
    "637": {
      "name": "Potion_Special_Doses",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "638": {
      "name": "Potion_Special_Dose_Power",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "639": {
      "name": "Potion_Charge",
      "defaultValue": 0
    },
    "640": {
      "name": "Potion_Charge_Generation_Bonus_Pct",
      "defaultValue": 0
    },
    "641": {
      "name": "Potion_Charge_Yield_Bonus_Pct",
      "defaultValue": 0
    },
    "642": {
      "name": "Potion_Use_Granted_Barrier_Percent",
      "defaultValue": 0
    },
    "643": {
      "name": "Potion_Use_Granted_Primary_Resource_Amount",
      "int": true,
      "defaultValue": 0
    },
    "644": {
      "name": "Potion_Use_Granted_Unstoppable_Seconds",
      "defaultValue": 0
    },
    "645": {
      "name": "Potion_Dose_Drop_Total_Thresholds",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "646": {
      "name": "Last_Potion_Dose_Drop_Interval",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "647": {
      "name": "Can_Use_Potion_While_Full_Health",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "648": {
      "name": "No_Damage_Taken_Flat_Hitpoints_Regen_Per_Second",
      "defaultValue": 0
    },
    "649": {
      "name": "No_Damage_Taken_Flat_Hitpoints_Regen_Per_Second_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "650": {
      "name": "OOC_Flat_Hitpoints_Regen_Per_Second",
      "defaultValue": 0
    },
    "651": {
      "name": "OOC_Flat_Hitpoints_Regen_Per_Second_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "652": {
      "name": "Out_Of_Combat_Hitpoints_Regen_Delay_On_Leave_Combat",
      "int": true,
      "defaultValue": 0
    },
    "653": {
      "name": "Out_Of_Combat_Resource_Regen",
      "paramType": 7,
      "defaultValue": 0
    },
    "654": {
      "name": "Out_Of_Combat_Resource_Regen_Delay_On_Spend_Resource",
      "paramType": 7,
      "int": true,
      "defaultValue": 0
    },
    "655": {
      "name": "Out_Of_Combat_Resource_Regen_Delay_On_Leave_Combat",
      "paramType": 7,
      "int": true,
      "defaultValue": 0
    },
    "656": {
      "name": "Out_Of_Combat_Resource_Regen_Allowed_Time",
      "paramType": 7,
      "int": true,
      "defaultValue": 0
    },
    "657": {
      "name": "Last_Damage_ACD",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "658": {
      "name": "Attached_To_ACD",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "659": {
      "name": "Attachment_ACD",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "660": {
      "name": "Attachment_Override_Hardpoint",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "661": {
      "name": "Knockback_Attachment_ACD",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "662": {
      "name": "Normal_Attack_Replacement_Power_SNO",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "663": {
      "name": "Expensive_Proc_Count",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "664": {
      "name": "Base_Element",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "665": {
      "name": "Enable_Base_Element_Damage_Type_Override",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "666": {
      "name": "Cheat_Force_Enable_Elementally_Enhanced",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "667": {
      "name": "Projectile_Forced_Target",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "668": {
      "name": "Projectile_Reflect_Chance",
      "defaultValue": 0
    },
    "669": {
      "name": "Projectile_Reflect_Damage_Scalar",
      "operator": 1,
      "defaultValue": 1
    },
    "670": {
      "name": "Projectile_Reflect_Damage_Amount_Override",
      "operator": 1,
      "defaultValue": 0
    },
    "671": {
      "name": "Projectile_Reflect_Damage_Owner",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "672": {
      "name": "Projectile_Bouncing_Enabled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "673": {
      "name": "Projectile_Gravity_Multiplier",
      "operator": 3,
      "defaultValue": 0
    },
    "674": {
      "name": "Projectile_Seek_Rotation_Rate",
      "operator": 1,
      "defaultValue": 0
    },
    "675": {
      "name": "Projectile_Facing_Yaw_Rotation_Rate",
      "defaultValue": 0
    },
    "676": {
      "name": "Projectile_Turn_Instantly",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "677": {
      "name": "Projectile_Origin_Power",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "678": {
      "name": "Projectile_Power_Override",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "679": {
      "name": "Buff_Visual_Effect",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "680": {
      "name": "Player_Show_Unlimited_Resource_Visual",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "681": {
      "name": "Active_Weapon_Effect_Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "682": {
      "name": "Could_Have_Ragdolled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "683": {
      "name": "Scale_Bonus",
      "defaultValue": 0
    },
    "684": {
      "name": "Scale_Bonus_Is_Immediate",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "685": {
      "name": "Scale_Bonus_Per_Tick",
      "defaultValue": 0
    },
    "686": {
      "name": "Deleted_On_Server",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "687": {
      "name": "Scripted_Fade_Time",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "688": {
      "name": "Scripted_Look_Override",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "689": {
      "name": "Pet_Fade_Out",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "690": {
      "name": "Does_No_Damage",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "691": {
      "name": "SlowTime_Debuff",
      "defaultValue": 0
    },
    "692": {
      "name": "Blocks_Projectiles",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "693": {
      "name": "Blocks_Projectiles_With_Feedback",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "694": {
      "name": "Summon_Expiration_Tick",
      "int": true,
      "defaultValue": 0
    },
    "695": {
      "name": "Summon_Count",
      "int": true,
      "defaultValue": 0
    },
    "696": {
      "name": "Uninterruptible",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "697": {
      "name": "Queue Death",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "698": {
      "name": "Death Power Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "699": {
      "name": "Special Death Power Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "700": {
      "name": "CantStartDisplayedPowers",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "701": {
      "name": "PlayerSkillSuppressingDisplayedPowers",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "702": {
      "name": "DPS",
      "operator": 1,
      "defaultValue": 0
    },
    "703": {
      "name": "DOT_DPS",
      "defaultValue": 0
    },
    "704": {
      "name": "DOT_Total",
      "defaultValue": 0
    },
    "705": {
      "name": "DOT_Infinite_Total",
      "defaultValue": 0
    },
    "706": {
      "name": "DOT_DPS_Bonus_Percent",
      "defaultValue": 0
    },
    "707": {
      "name": "Multiplicative_DOT_DPS_Bonus_Percent",
      "operator": 7,
      "defaultValue": 0
    },
    "708": {
      "name": "DOT_DPS_Bonus_Percent_Per_Damage_Type",
      "paramType": 0,
      "defaultValue": 0
    },
    "709": {
      "name": "Multiplicative_DOT_DPS_Bonus_Percent_Per_Damage_Type",
      "paramType": 0,
      "operator": 7,
      "defaultValue": 0
    },
    "710": {
      "name": "DOT_DPS_Reduction_Percent",
      "operator": 6,
      "defaultValue": 0
    },
    "711": {
      "name": "DOT_DPS_Reduction_Percent_Per_Damage_Type",
      "paramType": 0,
      "operator": 6,
      "defaultValue": 0
    },
    "712": {
      "name": "DOT_Speed_Bonus_Percent_Per_Damage_Type",
      "paramType": 0,
      "defaultValue": 0
    },
    "713": {
      "name": "Disable_Health_Prediction",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "714": {
      "name": "HOT_HPS",
      "defaultValue": 0
    },
    "715": {
      "name": "HOT_Total",
      "defaultValue": 0
    },
    "716": {
      "name": "Multiplicative_Direct_Damage_Percent_Bonus",
      "operator": 7,
      "defaultValue": 0
    },
    "717": {
      "name": "DamageCap_Percent",
      "operator": 1,
      "defaultValue": 0
    },
    "718": {
      "name": "Item_Time_Sold",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "719": {
      "name": "Hide_Affixes",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "720": {
      "name": "Displays_Team_Effect",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "721": {
      "name": "Cannot_Be_Added_To_AI_Target_List",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "722": {
      "name": "SkillKit",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "723": {
      "name": "Generic_SkillKit",
      "paramType": 41,
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "724": {
      "name": "Generic_Skill_Tree_Associated_Actor",
      "paramType": 41,
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "725": {
      "name": "In_Retreat_Volume",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "726": {
      "name": "Damage_Shield",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "727": {
      "name": "Damage_Shield_Accumulated_Amount",
      "defaultValue": 0
    },
    "728": {
      "name": "Damage_Shield_Max",
      "defaultValue": 0
    },
    "729": {
      "name": "Damage_Shield_Bonus_Percent_Damage",
      "defaultValue": 0
    },
    "730": {
      "name": "Flat_Heal_Absorb",
      "defaultValue": 0
    },
    "731": {
      "name": "Flat_Heal_Absorb_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "732": {
      "name": "Is_Berserk",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "733": {
      "name": "Is_Invoke_Active",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "734": {
      "name": "Vulnerable",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "735": {
      "name": "Vulnerable_Health_Damage_Bonus",
      "defaultValue": 0
    },
    "736": {
      "name": "Multiplicative_Vulnerable_Health_Damage_Bonus",
      "operator": 7,
      "defaultValue": 0
    },
    "737": {
      "name": "Multiplicative_Vulnerable_Health_Damage_Bonus_Vs_Elites",
      "operator": 7,
      "defaultValue": 0
    },
    "738": {
      "name": "Vulnerable_Reduction_Percent",
      "operator": 6,
      "defaultValue": 0
    },
    "739": {
      "name": "Weakened",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "740": {
      "name": "Damage_Bonus_Percent_To_Weakened",
      "defaultValue": 0
    },
    "741": {
      "name": "Multiplicative_Damage_Bonus_Percent_To_Weakened",
      "operator": 7,
      "defaultValue": 0
    },
    "743": {
      "name": "Weakened_Duration_Reduction_Percent",
      "operator": 6,
      "defaultValue": 0
    },
    "744": {
      "name": "Fortified_Health",
      "operator": 3,
      "defaultValue": 0
    },
    "745": {
      "name": "Fortified_Health_Damage_Reduction_Bonus",
      "operator": 6,
      "defaultValue": 0
    },
    "746": {
      "name": "Fortified_Health_Application_Bonus",
      "defaultValue": 0
    },
    "747": {
      "name": "Damage_Percent_Bonus_When_Fortified",
      "defaultValue": 0
    },
    "748": {
      "name": "Damage_Percent_Bonus_To_Fortified",
      "defaultValue": 0
    },
    "749": {
      "name": "Fortified_Health_Drain_Per_Second_Min",
      "operator": 1,
      "defaultValue": 0
    },
    "750": {
      "name": "Fortified_Health_Drain_Per_Second_Max",
      "operator": 1,
      "defaultValue": 0
    },
    "751": {
      "name": "Fortified_Health_Drain_Per_Second_Bonus_Pct",
      "defaultValue": 0
    },
    "752": {
      "name": "Follow_Target_ACDID",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "753": {
      "name": "Follow_Target_Type",
      "operator": 2,
      "int": true,
      "defaultValue": 0
    },
    "754": {
      "name": "NPC_Talk_Target_ANN",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "755": {
      "name": "Look_Target_Server_ANN",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "756": {
      "name": "Look_Target_Broadcast_Intensity",
      "defaultValue": 0
    },
    "757": {
      "name": "Look_Target_Broadcast_Radius",
      "defaultValue": 0
    },
    "758": {
      "name": "Stealthed",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "759": {
      "name": "GemQuality",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "760": {
      "name": "Gem_Attributes_Multiplier",
      "operator": 7,
      "defaultValue": 0
    },
    "761": {
      "name": "ItemBuffIcon",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "762": {
      "name": "Gizmo_Actor_SNO_To_Spawn",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "763": {
      "name": "Gizmo_Actor_To_Spawn_Scale",
      "operator": 1,
      "defaultValue": 0
    },
    "764": {
      "name": "Attachment_Handled_By_Client",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "765": {
      "name": "Forced_Enemy_ACDID",
      "operator": 8,
      "int": true,
      "defaultValue": -1
    },
    "766": {
      "name": "AI_In_Special_State",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "767": {
      "name": "AI_Used_Scripted_Spawn_Anim",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "768": {
      "name": "AI_Spawned_By_Inactive_Marker",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "769": {
      "name": "AI_Disable_Wander",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "770": {
      "name": "AI_Idle_Awareness_Radius_Override",
      "operator": 1,
      "defaultValue": 0
    },
    "771": {
      "name": "AI_Combat_Awareness_Radius_Override",
      "operator": 1,
      "defaultValue": 0
    },
    "772": {
      "name": "Headstone_Player_ANN",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "773": {
      "name": "Movement_Scalar_Reduction_Percent",
      "operator": 1,
      "defaultValue": 0
    },
    "774": {
      "name": "Movement_Scalar_Reduction_Resistance",
      "defaultValue": 0
    },
    "775": {
      "name": "Movement_Scalar_Reduction_Total",
      "operator": 3,
      "defaultValue": 0,
      "formula": "Min(0.8, Movement_Scalar_Reduction_Percent * (1 - Min(1, Movement_Scalar_Reduction_Resistance)))",
      "formulaItem": "0"
    },
    "776": {
      "name": "World_Seed",
      "int": true,
      "defaultValue": 0
    },
    "777": {
      "name": "Observer",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "778": {
      "name": "Resurrect_As_Observer",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "779": {
      "name": "Registered_To_Tracked_Checkpoints",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "780": {
      "name": "Checkpoint_Resurrection_Allowed_Game_Time",
      "int": true,
      "defaultValue": 0
    },
    "781": {
      "name": "Checkpoint_Resurrection_Forced_Game_Time",
      "int": true,
      "defaultValue": 0
    },
    "782": {
      "name": "Corpse_Resurrection_Allowed_Game_Time",
      "int": true,
      "defaultValue": 0
    },
    "783": {
      "name": "Corpse_Resurrection_Charges",
      "int": true,
      "defaultValue": 0
    },
    "784": {
      "name": "Busy",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "785": {
      "name": "Afk",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "786": {
      "name": "RTC Playing",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "787": {
      "name": "Portal Next Time",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "788": {
      "name": "Operatable",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "789": {
      "name": "Spawner_Concurrent_Count_ID",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "790": {
      "name": "Disabled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "791": {
      "name": "Skill_Override",
      "paramType": 4,
      "operator": 11,
      "int": true,
      "defaultValue": -1
    },
    "792": {
      "name": "Skill_Override_Active",
      "paramType": 4,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "793": {
      "name": "Skill_Override_Active_Any",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "794": {
      "name": "Skill_Override_Ended",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "795": {
      "name": "Skill_Override_Ended_Active",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "796": {
      "name": "Skill_Icon_Override_Normal",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": -2147483648
    },
    "797": {
      "name": "Skill_Icon_Override_Mouse_Over",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": -2147483648
    },
    "798": {
      "name": "Skill_Icon_Override_Pushed",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": -2147483648
    },
    "799": {
      "name": "Skill_Icon_Override_Inactive",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": -2147483648
    },
    "800": {
      "name": "Skill_Icon_Ignore_Skill_Mod_Overrides",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "801": {
      "name": "Rogue_Skill_Imbue_Type",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "802": {
      "name": "Evade_Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "803": {
      "name": "Limited_Evade_Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "804": {
      "name": "Combat_Evade_Last_Equipped",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "805": {
      "name": "Potion_Skill_Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "806": {
      "name": "Town_Portal_Skill_Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "807": {
      "name": "Non_Combat_Dismount_Skill_Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "808": {
      "name": "Unlocked_Skill_Enchant_Slots",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "809": {
      "name": "Unlocked_Skill_Passive_Slots",
      "paramType": 26,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "810": {
      "name": "Rogue_Specialization",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "811": {
      "name": "Druid_Spirit_Bond_Unlocked",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "812": {
      "name": "Druid_Spirit_Bond",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "813": {
      "name": "Rogue_Inner_Sight_Gauge",
      "operator": 1,
      "defaultValue": 0
    },
    "814": {
      "name": "Spiritborn_Chosen_Sun_Spirit",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "815": {
      "name": "Spiritborn_Chosen_Moon_Spirit",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "816": {
      "name": "Paladin_Chosen_Oath",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "817": {
      "name": "Paladin_Fervor_Stack_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "818": {
      "name": "Warlock_Shard_Type",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "819": {
      "name": "Warlock_Fragment_Index",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "820": {
      "name": "Weapon_Expertise_Level",
      "paramType": 27,
      "int": true,
      "defaultValue": 0
    },
    "821": {
      "name": "Weapon_Expertise_Experience",
      "paramType": 27,
      "int": true,
      "defaultValue": 0
    },
    "822": {
      "name": "Active_Technique_Slot",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "823": {
      "name": "Skill_Arsenal_Slot",
      "paramType": 17,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "824": {
      "name": "Arsenal_Slot_Disabled",
      "paramType": 17,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "825": {
      "name": "Is_Power_Proxy",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "826": {
      "name": "Flippy_ID",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "827": {
      "name": "Set_Item_Count",
      "paramType": 14,
      "int": true,
      "defaultValue": 0
    },
    "828": {
      "name": "Talisman_Seal_Data",
      "paramType": 26,
      "int": true,
      "defaultValue": 0
    },
    "829": {
      "name": "Unique_Charm_Count_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "830": {
      "name": "Spawner_Countdown_Percent",
      "operator": 1,
      "defaultValue": 0
    },
    "831": {
      "name": "Spawner_Loc_Type_Filter",
      "paramType": 15,
      "operator": 9,
      "int": true,
      "defaultValue": -1
    },
    "832": {
      "name": "Spawner_Monster_Group_Type_Filter",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "833": {
      "name": "Power_Disabled",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "834": {
      "name": "Power_Manual_Activation_Disabled",
      "paramType": 5,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "835": {
      "name": "Last_ACD_Attacked_By",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "836": {
      "name": "Gold_PickUp_Radius",
      "defaultValue": 0
    },
    "837": {
      "name": "Client Only Effect",
      "paramType": 8,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "838": {
      "name": "Power_Saved_Attribute",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "839": {
      "name": "Looping_Animation_Suppress_Item_Tooltips",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "840": {
      "name": "Looping_Animation_Start_Time",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "841": {
      "name": "Looping_Animation_End_Time",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "842": {
      "name": "Looping_Animation_Text_SNO",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "843": {
      "name": "Looping_Animation_Text_Label",
      "operator": 1,
      "int": true,
      "defaultValue": -2147483648
    },
    "844": {
      "name": "Looping_Animation_Context_ANN",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "845": {
      "name": "Looping_Animation_Show_Favorite_Icon",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "846": {
      "name": "Heal_Effect_Last_Played_Tick",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "847": {
      "name": "Resource_Effect_Last_Played_tick",
      "paramType": 7,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "848": {
      "name": "Thorns_Effect_Last_Played_tick",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "849": {
      "name": "Turn_Rate_Scalar",
      "operator": 4,
      "defaultValue": 1
    },
    "850": {
      "name": "No_Health_Drop",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "851": {
      "name": "Custom_Potion_Drop_Range_Degree_Min",
      "operator": 1,
      "defaultValue": 0
    },
    "852": {
      "name": "Custom_Potion_Drop_Range_Degree_Delta",
      "operator": 1,
      "defaultValue": 0
    },
    "853": {
      "name": "Custom_Potion_Drop_Range_Distance_Min",
      "operator": 1,
      "defaultValue": 0
    },
    "854": {
      "name": "Custom_Potion_Drop_Range_Distance_Delta",
      "operator": 1,
      "defaultValue": 0
    },
    "855": {
      "name": "Leader",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "856": {
      "name": "IsContentRestrictedActor",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "857": {
      "name": "God",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "858": {
      "name": "EasyKill",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "859": {
      "name": "EasyDie",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "860": {
      "name": "NeverDie",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "861": {
      "name": "NeverDieBuffID",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "862": {
      "name": "IAmDeath",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "863": {
      "name": "FreeCastCheat",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "864": {
      "name": "FreeCastCDCheat",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "865": {
      "name": "CDCheat",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "866": {
      "name": "NoDamageRange",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "867": {
      "name": "FreeCrafting",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "868": {
      "name": "CraftingCritCheat",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "869": {
      "name": "SkillReqsDisabled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "870": {
      "name": "SkillSlotReqsDisabled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "871": {
      "name": "DrawPathfinds",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "872": {
      "name": "DisablePotionDrops",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "873": {
      "name": "EnableWorldTierItemRestrictions",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "874": {
      "name": "ForceSeasonalTabEnabled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "875": {
      "name": "AllowAllProducts",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "876": {
      "name": "PlayerDropFlags",
      "paramType": 26,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "877": {
      "name": "UnlockTalisman",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "878": {
      "name": "MinimapActive",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "879": {
      "name": "Minimap_Icon_Hidden",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "880": {
      "name": "Last_Blocked_ACD",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "881": {
      "name": "Last_Blocked_Time",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "882": {
      "name": "Weapons_Hidden",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "883": {
      "name": "Main_Hand_Weapon_Hidden",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "884": {
      "name": "Off_Hand_Weapon_Hidden",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "885": {
      "name": "Actor_Updates_Attributes_From_Owner",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "886": {
      "name": "Taunt_Target_ACD",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "887": {
      "name": "Charm_Source_ACD",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "888": {
      "name": "Fear_Source_ACD",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "889": {
      "name": "Update_Interval_Override",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "890": {
      "name": "Projectile_Effect_SNO",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "891": {
      "name": "Power_Effect_Size",
      "operator": 1,
      "defaultValue": 0
    },
    "892": {
      "name": "Power_Effect_Intensity",
      "operator": 1,
      "defaultValue": 0
    },
    "893": {
      "name": "Power_Effect_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "894": {
      "name": "Power_Effect_Size_Per_Power",
      "paramType": 5,
      "operator": 1,
      "defaultValue": 0
    },
    "895": {
      "name": "Power_Effect_Intensity_Per_Power",
      "paramType": 5,
      "operator": 1,
      "defaultValue": 0
    },
    "896": {
      "name": "Power_Effect_Intensity_Per_ComplexEffectID",
      "paramType": 26,
      "operator": 1,
      "defaultValue": 0
    },
    "897": {
      "name": "Power_Effect_Duration_Per_Power",
      "paramType": 5,
      "operator": 1,
      "defaultValue": 0
    },
    "898": {
      "name": "Power_Effect_Length",
      "operator": 1,
      "defaultValue": 0
    },
    "899": {
      "name": "Power_Effect_Width",
      "operator": 1,
      "defaultValue": 0
    },
    "900": {
      "name": "Power_Effect_Height",
      "operator": 1,
      "defaultValue": 0
    },
    "901": {
      "name": "Power_Effect_Length_Per_Power",
      "paramType": 5,
      "operator": 1,
      "defaultValue": 0
    },
    "902": {
      "name": "Power_Effect_Width_Per_Power",
      "paramType": 5,
      "operator": 1,
      "defaultValue": 0
    },
    "903": {
      "name": "Power_Effect_Height_Per_Power",
      "paramType": 5,
      "operator": 1,
      "defaultValue": 0
    },
    "904": {
      "name": "Power_Effect_Custom_Value_1",
      "operator": 3,
      "defaultValue": -3.4028234663852886e+38
    },
    "905": {
      "name": "Power_Effect_Custom_Value_2",
      "operator": 3,
      "defaultValue": -3.4028234663852886e+38
    },
    "906": {
      "name": "Power_Effect_Custom_Value_3",
      "operator": 3,
      "defaultValue": -3.4028234663852886e+38
    },
    "907": {
      "name": "Power_Effect_Custom_Value_4",
      "operator": 3,
      "defaultValue": -3.4028234663852886e+38
    },
    "908": {
      "name": "Power_Effect_Routing_Function_A",
      "operator": 3,
      "defaultValue": 1
    },
    "909": {
      "name": "Power_Effect_Routing_Function_B",
      "operator": 3,
      "defaultValue": 1
    },
    "910": {
      "name": "Power_Effect_Routing_Function_C",
      "operator": 3,
      "defaultValue": 1
    },
    "911": {
      "name": "Power_Effect_Rope_Rigidity",
      "operator": 3,
      "defaultValue": 1
    },
    "912": {
      "name": "Power_Effect_Routing_Function_A_Per_Power",
      "paramType": 14,
      "operator": 3,
      "defaultValue": 1
    },
    "913": {
      "name": "Power_Effect_Routing_Function_B_Per_Power",
      "paramType": 14,
      "operator": 3,
      "defaultValue": 1
    },
    "914": {
      "name": "Power_Effect_Routing_Function_C_Per_Power",
      "paramType": 14,
      "operator": 3,
      "defaultValue": 1
    },
    "915": {
      "name": "Power_Effect_Rope_Rigidity_Per_Power",
      "paramType": 14,
      "operator": 3,
      "defaultValue": 1
    },
    "916": {
      "name": "On_Hit_CC_Proc_Chance",
      "paramType": 19,
      "defaultValue": 0
    },
    "917": {
      "name": "On_Crit_CC_Proc_Chance",
      "paramType": 19,
      "defaultValue": 0
    },
    "918": {
      "name": "On_Hit_Knockback_Proc_Chance",
      "defaultValue": 0
    },
    "919": {
      "name": "On_Hit_Vulnerable_Proc_Chance",
      "defaultValue": 0
    },
    "920": {
      "name": "On_Hit_Vulnerable_Proc_Duration_Seconds",
      "operator": 1,
      "defaultValue": 0
    },
    "921": {
      "name": "On_Hit_Weakened_Proc_Chance",
      "defaultValue": 0
    },
    "922": {
      "name": "On_Hit_Weakened_Proc_Duration_Seconds",
      "operator": 1,
      "defaultValue": 0
    },
    "923": {
      "name": "On_Hit_Execute_Low_Health_Non_Elite_Chance",
      "defaultValue": 0
    },
    "924": {
      "name": "On_Hit_Berserk_Proc_Chance",
      "defaultValue": 0
    },
    "925": {
      "name": "Movement_Bonus_On_Elite_Kill",
      "defaultValue": 0
    },
    "926": {
      "name": "Movement_Bonus_On_Elite_Kill_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "927": {
      "name": "Damage_Bonus_On_Elite_Kill",
      "defaultValue": 0
    },
    "928": {
      "name": "Damage_Bonus_On_Elite_Kill_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "929": {
      "name": "Damage_Reduction_On_Elite_Kill",
      "operator": 6,
      "defaultValue": 0
    },
    "930": {
      "name": "Damage_Reduction_On_Elite_Kill_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "931": {
      "name": "Hitpoints_On_Elite_Kill",
      "defaultValue": 0
    },
    "932": {
      "name": "On_Hit_Damage_Bonus_Proc_Chance",
      "operator": 1,
      "defaultValue": 0
    },
    "933": {
      "name": "On_Hit_Damage_Bonus_Percent",
      "defaultValue": 0
    },
    "934": {
      "name": "On_Hit_Random_Multiplicative_Damage_Percent_Min",
      "operator": 7,
      "defaultValue": 0
    },
    "935": {
      "name": "On_Hit_Random_Multiplicative_Damage_Percent_Max",
      "operator": 7,
      "defaultValue": 0
    },
    "936": {
      "name": "On_Hit_Damage_Bonus_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "937": {
      "name": "Damage_Done_Reduction_Percent_On_Pet_Crit",
      "operator": 6,
      "defaultValue": 0
    },
    "938": {
      "name": "Damage_Done_Reduction_On_Pet_Crit_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "939": {
      "name": "Attack_Speed_Bonus_On_Dodge",
      "defaultValue": 0
    },
    "940": {
      "name": "Attack_Speed_Bonus_On_Dodge_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "941": {
      "name": "Damage_Bonus_Percent_On_Dodge",
      "defaultValue": 0
    },
    "942": {
      "name": "Damage_Bonus_Percent_On_Dodge_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "943": {
      "name": "Fortified_When_Struck_Percent_Chance",
      "defaultValue": 0
    },
    "944": {
      "name": "Fortified_When_Struck_Amount",
      "operator": 1,
      "defaultValue": 0
    },
    "945": {
      "name": "Barrier_When_Struck_Percent_Chance",
      "defaultValue": 0
    },
    "946": {
      "name": "Proc_Flat_Hitpoints_On_Hit",
      "defaultValue": 0
    },
    "947": {
      "name": "Proc_Flat_Hitpoints_On_Hit_Unscaled_By_Player_Health",
      "defaultValue": 0
    },
    "948": {
      "name": "Damage_Done_Percent_Reduction",
      "operator": 6,
      "defaultValue": 0
    },
    "949": {
      "name": "Damage_Percent_Reduction_From_Elites",
      "operator": 6,
      "defaultValue": 0
    },
    "950": {
      "name": "Damage_Percent_Bonus_Vs_Elites",
      "defaultValue": 0
    },
    "951": {
      "name": "Multiplicative_Damage_Percent_Bonus_Vs_Elites",
      "operator": 7,
      "defaultValue": 0
    },
    "952": {
      "name": "Damage_Type_Percent_Bonus_Vs_Elites",
      "paramType": 0,
      "defaultValue": 0
    },
    "953": {
      "name": "Multiplicative_Damage_Percent_Bonus_Vs_Bosses",
      "operator": 7,
      "defaultValue": 0
    },
    "954": {
      "name": "Damage_Percent_Bonus_Vs_CC_Target",
      "paramType": 20,
      "defaultValue": 0
    },
    "955": {
      "name": "Multiplicative_Damage_Percent_Bonus_Vs_CC_Target",
      "paramType": 20,
      "operator": 7,
      "defaultValue": 0
    },
    "956": {
      "name": "Damage_Percent_Bonus_Vs_CC_All",
      "defaultValue": 0
    },
    "957": {
      "name": "Multiplicative_Damage_Percent_Bonus_Vs_CC_All",
      "operator": 7,
      "defaultValue": 0
    },
    "958": {
      "name": "Damage_Percent_Bonus_Vs_Unstoppable",
      "operator": 7,
      "defaultValue": 0
    },
    "959": {
      "name": "Damage_Percent_Bonus_Against_Dot_Type",
      "paramType": 1,
      "defaultValue": 0
    },
    "960": {
      "name": "Damage_Percent_Bonus_While_Shapeshifted",
      "defaultValue": 0
    },
    "961": {
      "name": "Multiplicative_Damage_Percent_Bonus_While_Shapeshifted",
      "operator": 7,
      "defaultValue": 0
    },
    "962": {
      "name": "Damage_Percent_Bonus_Per_Shapeshift_Form",
      "paramType": 30,
      "defaultValue": 0
    },
    "963": {
      "name": "Multiplicative_Damage_Percent_Bonus_Per_Shapeshift_Form",
      "paramType": 30,
      "operator": 7,
      "defaultValue": 0
    },
    "964": {
      "name": "Damage_Percent_Bonus_When_Weapon_Swapping",
      "defaultValue": 0
    },
    "965": {
      "name": "Damage_Percent_Bonus_While_Affected_By_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "966": {
      "name": "Damage_Percent_Reduction_From_Dotted_Enemy",
      "paramType": 1,
      "operator": 6,
      "defaultValue": 0
    },
    "967": {
      "name": "All_Damage_Percent_Reduction_From_Dotted_Enemy",
      "operator": 6,
      "defaultValue": 0
    },
    "968": {
      "name": "Damage_Percent_Reduction_From_CCed_Target",
      "paramType": 20,
      "operator": 6,
      "defaultValue": 0
    },
    "969": {
      "name": "Damage_Percent_Reduction_From_CCed_Target_Any",
      "operator": 6,
      "defaultValue": 0
    },
    "970": {
      "name": "Damage_Percent_Reduction_From_Vulnerable_Target",
      "operator": 6,
      "defaultValue": 0
    },
    "971": {
      "name": "Damage_Percent_Reduction_From_Targets_With_Skill_Tag",
      "paramType": 33,
      "operator": 6,
      "defaultValue": 0
    },
    "972": {
      "name": "Item_Manipulation_Timeout",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "973": {
      "name": "Picked_Up_Time",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "974": {
      "name": "Unequipped Time",
      "paramType": 17,
      "operator": 3,
      "int": true,
      "defaultValue": 1
    },
    "975": {
      "name": "Last_ACD_Killed_Time",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "976": {
      "name": "CannotDieDuring",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "977": {
      "name": "Weapon_On_Hit_Percent_Bleed_Proc_Chance",
      "defaultValue": 0
    },
    "978": {
      "name": "Weapon_On_Hit_Percent_Bleed_Proc_Damage",
      "defaultValue": 0
    },
    "979": {
      "name": "Multiplicative_Weapon_On_Hit_Percent_Bleed_Proc_Damage",
      "operator": 7,
      "defaultValue": 0
    },
    "980": {
      "name": "Weapon_On_Hit_Percent_Bleed_Proc_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "981": {
      "name": "Power_Damage_Percent_Bonus",
      "paramType": 5,
      "defaultValue": 0
    },
    "982": {
      "name": "Multiplicative_Power_Damage_Percent_Bonus",
      "paramType": 5,
      "operator": 7,
      "defaultValue": 0
    },
    "983": {
      "name": "Power_Damage_Percent_Penalty",
      "paramType": 5,
      "operator": 6,
      "defaultValue": 0
    },
    "984": {
      "name": "Power_Instance_Damage_Percent_Bonus",
      "paramType": 18,
      "defaultValue": 0
    },
    "985": {
      "name": "Multiplicative_Power_Instance_Damage_Percent_Bonus",
      "paramType": 18,
      "operator": 7,
      "defaultValue": 0
    },
    "986": {
      "name": "Power_Instance_Crit_Chance_Bonus",
      "paramType": 18,
      "defaultValue": 0
    },
    "987": {
      "name": "Power_Instance_Crit_Damage_Bonus",
      "paramType": 18,
      "defaultValue": 0
    },
    "988": {
      "name": "Multiplicative_Power_Instance_Crit_Damage_Bonus",
      "paramType": 18,
      "operator": 7,
      "defaultValue": 0
    },
    "989": {
      "name": "Power_Instance_Overpower_Chance_Bonus",
      "paramType": 18,
      "defaultValue": 0
    },
    "990": {
      "name": "Power_Cooldown_Reduction",
      "paramType": 5,
      "defaultValue": 0
    },
    "991": {
      "name": "Power_Duration_Bonus_Pct",
      "paramType": 5,
      "defaultValue": 0
    },
    "992": {
      "name": "Power_Crit_Percent_Bonus",
      "paramType": 5,
      "defaultValue": 0
    },
    "993": {
      "name": "Bonus_Count_Per_Power",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "994": {
      "name": "Bonus_Percent_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "995": {
      "name": "Item_Level_Requirement_Reduction",
      "int": true,
      "defaultValue": 0
    },
    "996": {
      "name": "Waiting_To_Accept_Resurrection",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "997": {
      "name": "Ghosted",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "998": {
      "name": "Perk_Buff_Poll_Next_Time",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "999": {
      "name": "Known_By_Owner",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "1000": {
      "name": "Never_Deactivates",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1001": {
      "name": "Projectile_Detonate_Time",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1002": {
      "name": "Projectile_Uncapped_Lifetime",
      "int": true,
      "defaultValue": 0
    },
    "1003": {
      "name": "Percent_Bonus_Projectiles_All",
      "defaultValue": 0
    },
    "1004": {
      "name": "Percent_Bonus_Projectiles_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "1005": {
      "name": "Percent_Bonus_Projectiles_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "1006": {
      "name": "Effect_Owner_ANN",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1007": {
      "name": "Elite_Engaged",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1008": {
      "name": "Engaged_Rare_Time",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1009": {
      "name": "CrowdControl_Projected_End_Time",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1010": {
      "name": "Has_Dropped_Special_loot",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1011": {
      "name": "Scroll_Buff",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1012": {
      "name": "Buff_Exclusive_Type_Max",
      "paramType": 15,
      "operator": 1,
      "int": true,
      "defaultValue": 1
    },
    "1013": {
      "name": "Actor_Forwards_Buffs",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1014": {
      "name": "Item_Marked_As_Junk",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1015": {
      "name": "Item_Saved_In_Loadout",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1016": {
      "name": "Item_Is_BOE",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1017": {
      "name": "Season",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1018": {
      "name": "Item_Base_Cost",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1019": {
      "name": "Item_Enchantment_Cost",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1020": {
      "name": "DamageDoneTotalTrackedHi",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1021": {
      "name": "DamageDoneTotalTrackedLo",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1022": {
      "name": "DamageDoneTrackingStartTick",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1023": {
      "name": "PowerPersistsAcrossGames",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "1024": {
      "name": "Experience_Bonus_Percent_IGR_Buff",
      "defaultValue": 0
    },
    "1025": {
      "name": "Experience_Bonus_Percent_Anniversary_Buff",
      "defaultValue": 0
    },
    "1026": {
      "name": "Experience_Bonus_Percent_Community_Buff",
      "defaultValue": 0
    },
    "1027": {
      "name": "Experience_Bonus_Percent_Super_Scalar",
      "defaultValue": 0
    },
    "1028": {
      "name": "Experience_Bonus_Percent_Super_Scalar_Total",
      "defaultValue": 0,
      "formula": "Experience_Bonus_Percent_Super_Scalar + Experience_Bonus_Percent_Community_Buff + Experience_Bonus_Percent_IGR_Buff + Experience_Bonus_Percent_Anniversary_Buff"
    },
    "1029": {
      "name": "AlwaysShowFloatingNumbers",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1030": {
      "name": "Supress_Thorns_Effect",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1031": {
      "name": "Dynamic_Entrance_GUID",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1032": {
      "name": "Bonus_Chance_To_Be_Crit_Hit",
      "defaultValue": 0
    },
    "1033": {
      "name": "Bonus_Chance_To_Be_Crit_Hit_By_Actor",
      "paramType": 26,
      "defaultValue": 0
    },
    "1034": {
      "name": "Power Bonus Attack Radius",
      "paramType": 5,
      "defaultValue": 0
    },
    "1035": {
      "name": "Power Bonus Attack Radius Percent",
      "paramType": 5,
      "defaultValue": 0
    },
    "1036": {
      "name": "Power Reduction Attack Radius",
      "paramType": 5,
      "defaultValue": 0
    },
    "1037": {
      "name": "AoE_Size_Bonus_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "1038": {
      "name": "Movement_Speed_Bonus_Percent_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "1039": {
      "name": "Cleave_Damage_Bonus_Percent_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "1040": {
      "name": "Damage_Bonus_Percent_Per_Combo_Point",
      "defaultValue": 0
    },
    "1041": {
      "name": "Item_Store_Player_High",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1042": {
      "name": "Item_Store_Player_Low",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1043": {
      "name": "Item_Equipped_But_Disabled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1044": {
      "name": "Affix_Disabled",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1045": {
      "name": "Attribute_Projectile_Pass_Through",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1046": {
      "name": "Set_Item_Discount",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1047": {
      "name": "Dont_Update_Camera_While_Attached",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1048": {
      "name": "Linked Dynamic Entrance GUID",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1049": {
      "name": "Boost_TC_Index",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1050": {
      "name": "Boost_TC_NextTime",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1051": {
      "name": "Item_Rest_Bonus_Pool",
      "operator": 3,
      "defaultValue": 0
    },
    "1052": {
      "name": "Item_Unlucky_Bonus_Secs",
      "paramType": 40,
      "operator": 3,
      "defaultValue": 0
    },
    "1053": {
      "name": "Item_Unlucky_Bonus_Allow",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1054": {
      "name": "Random_Item_Unlucky_Bonus",
      "paramType": 17,
      "operator": 3,
      "defaultValue": 0
    },
    "1055": {
      "name": "Avenger_Buildup_Secs",
      "operator": 3,
      "defaultValue": 0
    },
    "1056": {
      "name": "Evade_Max_Charges",
      "int": true,
      "defaultValue": 0
    },
    "1057": {
      "name": "Evade_Reduce_Cooldown_On_Attack",
      "defaultValue": 0
    },
    "1058": {
      "name": "Evade_Movement_Dodge_Chance",
      "defaultValue": 0
    },
    "1059": {
      "name": "Evade_Movement_Speed",
      "defaultValue": 0
    },
    "1060": {
      "name": "Evade_Movement_Speed_Duration",
      "operator": 1,
      "defaultValue": 0
    },
    "1061": {
      "name": "Prevent_Evade_During",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1062": {
      "name": "Item_Assigned_Account_High",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1063": {
      "name": "Item_Assigned_Account_Low",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1064": {
      "name": "Pierce_Charge",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1065": {
      "name": "Resurrected",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1066": {
      "name": "Thorns_AOE_Radius_Next_Time",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1067": {
      "name": "Movement_Destroys_Waller_Walls",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1068": {
      "name": "Forced Move",
      "operator": 2,
      "int": true,
      "defaultValue": 0
    },
    "1069": {
      "name": "CurrentPowerHitCount",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1070": {
      "name": "LastTimeBlockedAnAttack",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1071": {
      "name": "Last_Time_Damaged",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1072": {
      "name": "Last_Time_Inflicted_Damage",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1073": {
      "name": "Disable_Proximity_Checks",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1074": {
      "name": "Mounted",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1075": {
      "name": "Mount_Is_Enthralled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1076": {
      "name": "Current_Mount",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1077": {
      "name": "Current_Mount_Type",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1078": {
      "name": "Mount_Dismount_Dmg_Bonus",
      "defaultValue": 0
    },
    "1079": {
      "name": "Mount_Fear_Current",
      "operator": 1,
      "defaultValue": 0
    },
    "1080": {
      "name": "Mount_Fear_Reduction_Pct",
      "defaultValue": 0
    },
    "1081": {
      "name": "Mount_Fear_Increase_Rate_Per_Second",
      "operator": 1,
      "defaultValue": 0
    },
    "1082": {
      "name": "Mount_Aggro_Reduction_Base_Pct",
      "operator": 1,
      "defaultValue": 0
    },
    "1083": {
      "name": "Mount_Aggro_Reduction_Bonus_Pct",
      "defaultValue": 0
    },
    "1084": {
      "name": "Mount_Aggro_Reduction_Total",
      "defaultValue": 0,
      "formula": "Mount_Aggro_Reduction_Base_Pct * (1 + Mount_Aggro_Reduction_Bonus_Pct)"
    },
    "1085": {
      "name": "Mount_Carrot_Max_Base",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1086": {
      "name": "Mount_Carrot_Max_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "1087": {
      "name": "Mount_Carrot_Max_Total",
      "int": true,
      "defaultValue": 0,
      "formula": "Mount_Carrot_Max_Base + Mount_Carrot_Max_Bonus"
    },
    "1088": {
      "name": "Mount_Carrot_Regen_Base",
      "operator": 1,
      "defaultValue": 0
    },
    "1089": {
      "name": "Mount_Carrot_Regen_Bonus_Pct",
      "defaultValue": 0
    },
    "1090": {
      "name": "Mount_Carrot_Regen_Total",
      "defaultValue": 0,
      "formula": "Mount_Carrot_Regen_Base * (1 + Mount_Carrot_Regen_Bonus_Pct)"
    },
    "1091": {
      "name": "Mounted_ACD",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1092": {
      "name": "Rider_ACD",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1093": {
      "name": "Gizmo_Player_State",
      "paramType": 21,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1094": {
      "name": "Gizmo_Player_Cooldown_Ends_At",
      "paramType": 21,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1095": {
      "name": "Gizmo_Anim_Player_State",
      "paramType": 21,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1096": {
      "name": "Gizmo_Max_DRLG_Operate_Count",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1097": {
      "name": "Gizmo_Anim_Player_Global_Idle_Overridden",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1098": {
      "name": "Gizmo_DeferredConsumable_GetActiveContents",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1099": {
      "name": "Retreating",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1100": {
      "name": "Retreat Radius Override",
      "operator": 1,
      "defaultValue": 0
    },
    "1101": {
      "name": "Retreat Soft Disable",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1102": {
      "name": "Damage_Bonus_To_Near",
      "defaultValue": 0
    },
    "1103": {
      "name": "Multiplicative_Damage_Bonus_To_Near",
      "operator": 7,
      "defaultValue": 0
    },
    "1104": {
      "name": "Damage_Bonus_To_Far",
      "defaultValue": 0
    },
    "1105": {
      "name": "Multiplicative_Damage_Bonus_To_Far",
      "operator": 7,
      "defaultValue": 0
    },
    "1106": {
      "name": "Crit_Chance_Bonus_To_Near",
      "defaultValue": 0
    },
    "1107": {
      "name": "Crit_Chance_Bonus_To_Far",
      "defaultValue": 0
    },
    "1108": {
      "name": "Crit_Damage_Bonus_To_Near",
      "defaultValue": 0
    },
    "1109": {
      "name": "Crit_Damage_Bonus_To_Far",
      "defaultValue": 0
    },
    "1110": {
      "name": "Damage_Reduction_From_Near",
      "operator": 6,
      "defaultValue": 0
    },
    "1111": {
      "name": "Damage_Reduction_From_Far",
      "operator": 6,
      "defaultValue": 0
    },
    "1112": {
      "name": "Damage_Increase_From_Near",
      "defaultValue": 0
    },
    "1113": {
      "name": "Damage_Increase_From_Far",
      "defaultValue": 0
    },
    "1114": {
      "name": "Damage_Bonus_To_Low_Health",
      "defaultValue": 0
    },
    "1115": {
      "name": "Multiplicative_Damage_Bonus_To_Low_Health",
      "operator": 7,
      "defaultValue": 0
    },
    "1116": {
      "name": "Damage_Bonus_To_High_Health",
      "defaultValue": 0
    },
    "1117": {
      "name": "Multiplicative_Damage_Bonus_To_High_Health",
      "operator": 7,
      "defaultValue": 0
    },
    "1118": {
      "name": "Damage_Reduction_At_Low_Health",
      "operator": 6,
      "defaultValue": 0
    },
    "1119": {
      "name": "Damage_Reduction_At_High_Health",
      "operator": 6,
      "defaultValue": 0
    },
    "1120": {
      "name": "Damage_Bonus_At_High_Health",
      "defaultValue": 0
    },
    "1121": {
      "name": "Multiplicative_Damage_Bonus_At_High_Health",
      "operator": 7,
      "defaultValue": 0
    },
    "1122": {
      "name": "Damage_Reduction",
      "operator": 6,
      "defaultValue": 0
    },
    "1123": {
      "name": "Damage_Reduction_While_Having_Shield",
      "operator": 6,
      "defaultValue": 0
    },
    "1124": {
      "name": "Damage_Increase_While_Having_Shield",
      "defaultValue": 0
    },
    "1125": {
      "name": "Damage_Reduction_While_Crowd_Controlled",
      "operator": 6,
      "defaultValue": 0
    },
    "1126": {
      "name": "Damage_Reduction_While_Stationary",
      "operator": 6,
      "defaultValue": 0
    },
    "1127": {
      "name": "Damage_Increase_While_Stationary",
      "defaultValue": 0
    },
    "1128": {
      "name": "Damage_Reduction_While_Moving",
      "operator": 6,
      "defaultValue": 0
    },
    "1129": {
      "name": "Damage_Increase_While_Moving",
      "defaultValue": 0
    },
    "1130": {
      "name": "Damage_Type_Damage_Reduction",
      "paramType": 0,
      "operator": 6,
      "defaultValue": 0
    },
    "1131": {
      "name": "Unstoppable",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1132": {
      "name": "Crowd_Control_Build_Up",
      "defaultValue": 0
    },
    "1133": {
      "name": "Crowd_Control_Build_Up_Threshold_Base",
      "defaultValue": 0
    },
    "1134": {
      "name": "Crowd_Control_Build_Up_Threshold",
      "defaultValue": 0
    },
    "1135": {
      "name": "Stagger_Threshold_Additional_Player",
      "defaultValue": 0
    },
    "1136": {
      "name": "Stagger_Decay_Rate_Base",
      "defaultValue": 0
    },
    "1137": {
      "name": "Stagger_Decay_Rate_Additional_Player",
      "defaultValue": 0
    },
    "1138": {
      "name": "Boss_In_Combat_ANN",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1139": {
      "name": "Health_Bar_Visibility",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1140": {
      "name": "Health_Bar_Visibility_Per_Player",
      "paramType": 8,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1141": {
      "name": "Cannot_Be_Staggered",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1142": {
      "name": "Staggered",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1143": {
      "name": "Staggered_Time_Remaining",
      "operator": 1,
      "defaultValue": 0
    },
    "1144": {
      "name": "Stagger_Done_Bonus",
      "defaultValue": 0
    },
    "1145": {
      "name": "Stagger_Received_Reduction",
      "operator": 6,
      "defaultValue": 0
    },
    "1146": {
      "name": "Necro_Corpse_Charges",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1147": {
      "name": "Necro_Corpse_Source_Actor_SNO",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1148": {
      "name": "AI_Prop_Type",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1149": {
      "name": "AI_Prop_Partner_ANN",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1150": {
      "name": "AI_Prop_Pairing_Name",
      "operator": 2,
      "int": true,
      "defaultValue": 0
    },
    "1151": {
      "name": "Talent_Rank",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "1152": {
      "name": "Talent_Rank_Bonus",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "1153": {
      "name": "Talent_Rank_Bonus_All",
      "int": true,
      "defaultValue": 0
    },
    "1154": {
      "name": "Skill_Rank_Bonus",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "1155": {
      "name": "Skill_Rank_Skill_Tag_Bonus",
      "paramType": 33,
      "int": true,
      "defaultValue": 0
    },
    "1156": {
      "name": "Skill_Rank_All_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "1157": {
      "name": "Skill_Rank_Bonus_Temporary",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "1158": {
      "name": "Skill_Rank_Skill_Tag_Bonus_Temporary",
      "paramType": 33,
      "int": true,
      "defaultValue": 0
    },
    "1159": {
      "name": "Skill_Rank_All_Bonus_Temporary",
      "int": true,
      "defaultValue": 0
    },
    "1160": {
      "name": "Skill_Rank_Grant",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "1161": {
      "name": "Skill_Rank_Skill_TagGrant",
      "paramType": 33,
      "int": true,
      "defaultValue": 0
    },
    "1162": {
      "name": "Skill_Rank_All_Grant",
      "int": true,
      "defaultValue": 0
    },
    "1163": {
      "name": "Cheat_Skill_Rank_All",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1164": {
      "name": "Custom_Power_Value_1",
      "paramType": 22,
      "defaultValue": 0
    },
    "1165": {
      "name": "Custom_Power_Value_2",
      "paramType": 22,
      "defaultValue": 0
    },
    "1166": {
      "name": "Custom_Power_Flat_Value_1",
      "paramType": 22,
      "defaultValue": 0
    },
    "1167": {
      "name": "Custom_Power_Flat_Value_1_Unscaled_By_Player_Health",
      "paramType": 22,
      "defaultValue": 0
    },
    "1168": {
      "name": "Custom_Power_Flat_Value_2",
      "paramType": 22,
      "defaultValue": 0
    },
    "1169": {
      "name": "Custom_Power_Flat_Value_2_Unscaled_By_Player_Health",
      "paramType": 22,
      "defaultValue": 0
    },
    "1170": {
      "name": "Affix_Value_1",
      "paramType": 16,
      "operator": 1,
      "defaultValue": 0
    },
    "1171": {
      "name": "Affix_Value_2",
      "paramType": 16,
      "operator": 1,
      "defaultValue": 0
    },
    "1172": {
      "name": "Affix_Flat_Value_1",
      "paramType": 16,
      "operator": 1,
      "defaultValue": 0
    },
    "1173": {
      "name": "Affix_Flat_Value_1_Unscaled_By_Player_Health",
      "paramType": 16,
      "operator": 1,
      "defaultValue": 0
    },
    "1174": {
      "name": "Affix_Flat_Value_2",
      "paramType": 16,
      "operator": 1,
      "defaultValue": 0
    },
    "1175": {
      "name": "Affix_Flat_Value_2_Unscaled_By_Player_Health",
      "paramType": 16,
      "operator": 1,
      "defaultValue": 0
    },
    "1176": {
      "name": "Legendary_Affix_Equipped",
      "paramType": 16,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1177": {
      "name": "Condition_Rune_Scalar",
      "paramType": 22,
      "operator": 3,
      "defaultValue": 1
    },
    "1178": {
      "name": "Effect_Rune_Magnitude",
      "paramType": 22,
      "operator": 3,
      "defaultValue": 1
    },
    "1179": {
      "name": "Effect_Rune_Magnitude_Flat",
      "paramType": 22,
      "operator": 3,
      "defaultValue": 1
    },
    "1180": {
      "name": "Effect_Rune_Magnitude_Flat_Unscaled_By_Player_Health",
      "paramType": 22,
      "operator": 3,
      "defaultValue": 1
    },
    "1181": {
      "name": "Effect_Rune_Magnitude_Total",
      "paramType": 22,
      "operator": 3,
      "defaultValue": 1,
      "formulaItem": "Effect_Rune_Magnitude * Effect_Rune_Magnitude_Flat * Condition_Rune_Scalar"
    },
    "1182": {
      "name": "Current_Runic_Power",
      "paramType": 5,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1183": {
      "name": "Effect_Rune_Triggered_Ticks",
      "paramType": 5,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1184": {
      "name": "Condition_Runic_Power_Bonus_Per_Slot",
      "paramType": 17,
      "defaultValue": 1
    },
    "1185": {
      "name": "ShopRestockTimeHi",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1186": {
      "name": "ShopRestockTimeLo",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1187": {
      "name": "RaidWeeklyEndTimeHi",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1188": {
      "name": "RaidWeeklyEndTimeLo",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1189": {
      "name": "RaidWeeklyStartTimeHi",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1190": {
      "name": "RaidWeeklyStartTimeLo",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1191": {
      "name": "Last_Resurrection_Update",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1192": {
      "name": "Resurrection_at_Headstone_Allowed",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1193": {
      "name": "Players_Contributing_To_Resurrection",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1194": {
      "name": "ANNs_Contributing_To_Resurrection",
      "paramType": 26,
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "1195": {
      "name": "Headstone_Resurrection_Progress",
      "operator": 1,
      "defaultValue": 0
    },
    "1196": {
      "name": "Headstone_Resurrection_Progress_Client",
      "operator": 1,
      "defaultValue": 0
    },
    "1197": {
      "name": "Headstone_Actor_Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1198": {
      "name": "Resurrection_Aggregatge_Time_Modifier",
      "operator": 1,
      "defaultValue": 0
    },
    "1199": {
      "name": "Resurrection_Reviver_Time_Modifier",
      "operator": 1,
      "defaultValue": 0
    },
    "1200": {
      "name": "ManuallyTrackedQuestSNO",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1201": {
      "name": "OverrideTrackedQuestSNO",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1202": {
      "name": "ManuallyTrackedAchievementSNO",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1203": {
      "name": "OverrideTrackedAchievementSNO",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1204": {
      "name": "Combat_Effect_Chance_Bonus",
      "defaultValue": 0
    },
    "1205": {
      "name": "Combat_Effect_Chance_Bonus_Per_Damage_Type",
      "paramType": 0,
      "defaultValue": 0
    },
    "1206": {
      "name": "Combat_Effect_Chance_Bonus_Per_Skill",
      "paramType": 5,
      "defaultValue": 0
    },
    "1207": {
      "name": "Combat_Effect_Chance_Bonus_Barrier_Active",
      "defaultValue": 0
    },
    "1208": {
      "name": "Hit_Effect_Chance_Bonus_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "1209": {
      "name": "Slowkill",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1210": {
      "name": "NoThorns",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1211": {
      "name": "NoEnemyThorns",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1212": {
      "name": "NoLoot",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1213": {
      "name": "XPDisable",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1214": {
      "name": "InstantRez",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1215": {
      "name": "Force_Crit",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1216": {
      "name": "Force_Overpower",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1217": {
      "name": "Force_Hit_Effect",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1218": {
      "name": "Knockback",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1219": {
      "name": "IgnoreAttackAndDefense",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1220": {
      "name": "AlwaysPlayGetHit",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1221": {
      "name": "Phasing Disabled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1222": {
      "name": "DebugLoggingTypesEnabled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1223": {
      "name": "RevealMinimapAllScenes",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1224": {
      "name": "GigaBarrier",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1225": {
      "name": "Barrier_Bonus_Percent",
      "defaultValue": 0
    },
    "1226": {
      "name": "Barrier_Duration_Bonus_Percent",
      "defaultValue": 0
    },
    "1227": {
      "name": "Shrine_Elixir_Duration_Bonus",
      "defaultValue": 0
    },
    "1228": {
      "name": "Gold_Find",
      "defaultValue": 0
    },
    "1229": {
      "name": "Gizmo_Active_cooldown_end_time",
      "int": true,
      "defaultValue": 0
    },
    "1230": {
      "name": "Pet_Damage_Bonus_Percent",
      "defaultValue": 0
    },
    "1231": {
      "name": "Multiplicative_Damage_Percent_Bonus_Type_All_Pets",
      "operator": 7,
      "defaultValue": 0
    },
    "1232": {
      "name": "Pet_Damage_Bonus_Percent_Per_Pet_Type",
      "paramType": 38,
      "defaultValue": 0
    },
    "1233": {
      "name": "Pet_Damage_Reduction_Percent",
      "operator": 6,
      "defaultValue": 0
    },
    "1234": {
      "name": "Pet_Attack_Speed_Bonus_Percent",
      "defaultValue": 0
    },
    "1235": {
      "name": "Pet_Move_Speed_Bonus_Percent",
      "defaultValue": 0
    },
    "1236": {
      "name": "Previous_Health_Percent",
      "operator": 3,
      "defaultValue": 1
    },
    "1237": {
      "name": "Health_Percent_Callback_Count",
      "int": true,
      "defaultValue": 0
    },
    "1238": {
      "name": "Max_Concurrent_Summons_Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1239": {
      "name": "Player_Is_AI_Controlled",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1240": {
      "name": "Player_Is_Trading",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1241": {
      "name": "Player_Is_Party_Invitable",
      "operator": 3,
      "int": true,
      "defaultValue": 1
    },
    "1242": {
      "name": "Item_Find",
      "paramType": 23,
      "defaultValue": 0
    },
    "1243": {
      "name": "NPC_Replaced_By_Follower",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1244": {
      "name": "NPC_Cloned_From_Actor",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1245": {
      "name": "NPC_Cloned_From_Actor_SNO",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1246": {
      "name": "NPC_Clone_Visibility",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1247": {
      "name": "NPC_Cloned_For_Quest",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1248": {
      "name": "Actor_Ignore_Boss_Encounter_Spawning",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1249": {
      "name": "Chatter_Cooldown",
      "paramType": 13,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1250": {
      "name": "Imprinted_Affix",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "1251": {
      "name": "Imprinted_Affix_Seed",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "1252": {
      "name": "Imprinted_Affix_Carry",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "0"
    },
    "1253": {
      "name": "Imprinted_Affix_Item_Power",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1254": {
      "name": "Imprinted_Affix_From_Definition",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1255": {
      "name": "Tempered_Affix",
      "paramType": 26,
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "1256": {
      "name": "Tempered_Affix_Seed",
      "paramType": 26,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1257": {
      "name": "Tempered_Affix_Carry",
      "paramType": 26,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1258": {
      "name": "Tempered_Affix_Category",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1259": {
      "name": "Temper_Count",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1260": {
      "name": "Reset_Temper_Count",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1261": {
      "name": "Transfigure_Count",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1262": {
      "name": "Legendary_Affix_Rank",
      "paramType": 14,
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1263": {
      "name": "Carryable_Receptacle_Count",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1264": {
      "name": "Carryable_Being_Carried",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1265": {
      "name": "Carryable_Is_Picked_Up",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1266": {
      "name": "Carryable_Accumulated_Damage",
      "operator": 1,
      "defaultValue": 0
    },
    "1267": {
      "name": "Chargeable_Gizmo_Progress",
      "operator": 1,
      "defaultValue": 0
    },
    "1268": {
      "name": "Chargeable_Paused",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1269": {
      "name": "Crafting_Crit_Chance_Percent_Bonus",
      "paramType": 23,
      "defaultValue": 0
    },
    "1270": {
      "name": "Use_Alternate_Name",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1271": {
      "name": "Death_Message_Actor_Override",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1272": {
      "name": "Death_Message_String_Override",
      "operator": 10,
      "int": true,
      "defaultValue": 0
    },
    "1273": {
      "name": "Use_Boss_Camera",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1274": {
      "name": "Boss_Camera_Follows_Player",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1275": {
      "name": "Boss_Camera_Override",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1276": {
      "name": "Invisible_To_Spawning",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1277": {
      "name": "Is_AutoCast_Effect",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1278": {
      "name": "Is_Last_Shot_Effect",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1279": {
      "name": "Quest_Referencing_Actor",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1280": {
      "name": "Quest_Callback_Referencing_Actor",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1281": {
      "name": "Monster_Flavor_Text_Override",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1282": {
      "name": "Vessel_Of_Hatred_Progress",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1283": {
      "name": "Owning_Quest",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "1284": {
      "name": "Bounty_Points",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1285": {
      "name": "Weighted_Bounty_Points",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1286": {
      "name": "Capped_Item_Spawned_By",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1287": {
      "name": "Item Visible To Class Bit",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1288": {
      "name": "Power Interrupt Remaining Damage",
      "operator": 1,
      "defaultValue": 0
    },
    "1289": {
      "name": "Class_Damage_Reduction_Percent_PvP",
      "defaultValue": 0
    },
    "1290": {
      "name": "Event_Participant_Timeout",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1291": {
      "name": "Local_or_World_Event_SNO",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "1292": {
      "name": "Town_Portal_Return_Delete_Timer",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "1293": {
      "name": "Portal_In_Progress",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1294": {
      "name": "Portal_Maintained_LevelAreaID",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "1295": {
      "name": "Gizmo_Triggered_Bounty_SNO_Target",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "1296": {
      "name": "Gizmo_Triggered_Bounty_Target_Disabled",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1297": {
      "name": "Assassinate_Bounty_Target_Gizmo",
      "operator": 3,
      "int": true,
      "defaultValue": -1
    },
    "1298": {
      "name": "Gizmo_Starts_Side_Quest",
      "paramType": 8,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1299": {
      "name": "Side_Quest_Started_By_Gizmo_",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1300": {
      "name": "Gizmo_Triggered_Bounty_SNO_Target_Player",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1301": {
      "name": "Last_Survey_Played_Secs",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1302": {
      "name": "Quest_Referencing_Item",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1303": {
      "name": "Ignored_By_Quest_Objectives",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1304": {
      "name": "Last_New_User_Survey_Version",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1305": {
      "name": "Player_Has_Reward_Choice_Available",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1306": {
      "name": "Partition_Highest_Player_Level",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1307": {
      "name": "Quest_Phase_Referencing_Actor",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1308": {
      "name": "Dynamic_Prefab_Id",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1309": {
      "name": "Player_In_Town_Level_Area",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1310": {
      "name": "Favor_Next_Hi",
      "int": true,
      "defaultValue": 0
    },
    "1311": {
      "name": "Favor_Next_Lo",
      "int": true,
      "defaultValue": 0
    },
    "1312": {
      "name": "Favor_Level",
      "int": true,
      "defaultValue": 0
    },
    "1313": {
      "name": "Last_Viewed_Favor_Next_Hi",
      "int": true,
      "defaultValue": 0
    },
    "1314": {
      "name": "Last_Viewed_Favor_Next_Lo",
      "int": true,
      "defaultValue": 0
    },
    "1315": {
      "name": "Last_Viewed_Favor_Level",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1316": {
      "name": "Blessing_Level",
      "paramType": 26,
      "int": true,
      "defaultValue": 0
    },
    "1317": {
      "name": "Blessing_Unlock_Points",
      "int": true,
      "defaultValue": 0
    },
    "1318": {
      "name": "Blessing_Refund_Count",
      "int": true,
      "defaultValue": 0
    },
    "1319": {
      "name": "Current_TownPortalCosmetic",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1320": {
      "name": "Mercenary_Hidden_Timer",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1321": {
      "name": "Current_NMDPortalCosmetic",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1322": {
      "name": "Monster_Kill_XP_Bonus",
      "operator": 1,
      "defaultValue": 0
    },
    "1323": {
      "name": "Item_Sell_Bonus",
      "operator": 1,
      "defaultValue": 0
    },
    "1324": {
      "name": "Salvage_Rarity_Bonus",
      "operator": 1,
      "defaultValue": 0
    },
    "1325": {
      "name": "Elixir_Duration_Bonus",
      "operator": 1,
      "defaultValue": 0
    },
    "1326": {
      "name": "Helltide_Loot_Bonus",
      "operator": 1,
      "defaultValue": 0
    },
    "1327": {
      "name": "Helltide_Chest_Obol_Bonus",
      "operator": 1,
      "defaultValue": 0
    },
    "1328": {
      "name": "Seasonal_Loot_Bonus",
      "operator": 1,
      "defaultValue": 0
    },
    "1329": {
      "name": "Bounty_Loot_Bonus",
      "operator": 1,
      "defaultValue": 0
    },
    "1330": {
      "name": "Bonus_Glyph_Upgrade_Chance",
      "operator": 1,
      "defaultValue": 0
    },
    "1331": {
      "name": "Collectible_Power_Value_1",
      "paramType": 36,
      "defaultValue": 0
    },
    "1332": {
      "name": "Collectible_Power_Value_2",
      "paramType": 36,
      "defaultValue": 0
    },
    "1333": {
      "name": "Collectible_Power_Flat_Value_1",
      "paramType": 36,
      "defaultValue": 0
    },
    "1334": {
      "name": "Collectible_Power_Flat_Value_1_Unscaled_By_Player_Health",
      "paramType": 36,
      "defaultValue": 0
    },
    "1335": {
      "name": "Collectible_Power_Flat_Value_2",
      "paramType": 36,
      "defaultValue": 0
    },
    "1336": {
      "name": "Collectible_Power_Flat_Value_2_Unscaled_By_Player_Health",
      "paramType": 36,
      "defaultValue": 0
    },
    "1337": {
      "name": "Seasonal_Rank",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1338": {
      "name": "Seasonal_Laurel",
      "paramType": 15,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1339": {
      "name": "Season_Rank_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "1340": {
      "name": "Halo",
      "paramType": 15,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1341": {
      "name": "Player Title Override",
      "paramType": 15,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1342": {
      "name": "Hide Title Override",
      "operator": 2,
      "int": true,
      "defaultValue": 0
    },
    "1343": {
      "name": "Reputation_Bonus_Percent",
      "paramType": 14,
      "defaultValue": 0
    },
    "1344": {
      "name": "Reputation_PLAYER_HAS_CLAIMABLE_REWARD",
      "paramType": 14,
      "int": true,
      "defaultValue": 0
    },
    "1345": {
      "name": "Map_Show_Wipe_Warning",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1346": {
      "name": "Map_Pvp_Reveal_Hostile_Players_Radius",
      "operator": 1,
      "defaultValue": 0
    },
    "1347": {
      "name": "Map_Reveal_Hostile_Monsters_Radius",
      "operator": 1,
      "defaultValue": 0
    },
    "1348": {
      "name": "Map_Reveal_Gizmo_Radius",
      "operator": 1,
      "defaultValue": 0
    },
    "1349": {
      "name": "Extra_Lives",
      "int": true,
      "defaultValue": 0
    },
    "1350": {
      "name": "Damage_Mitigation",
      "paramType": 15,
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1351": {
      "name": "Track_Toggle_Lighting",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1352": {
      "name": "Track_Toggle_Cast",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1353": {
      "name": "Track_Toggle_Secondary",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1354": {
      "name": "Track_Toggle_A",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1355": {
      "name": "Track_Toggle_B",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1356": {
      "name": "Player_Kill_Streak_Active",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1357": {
      "name": "Player_Kill_Streak_Phase_Index",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1358": {
      "name": "Player_Kill_Streak_Kill_Count",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1359": {
      "name": "Player_Kill_Streak_Kill_Count_Bonus",
      "int": true,
      "defaultValue": 0
    },
    "1360": {
      "name": "Player_Kill_Streak_Kill_Count_Total",
      "operator": 3,
      "int": true,
      "defaultValue": 0,
      "formula": "Player_Kill_Streak_Kill_Count + Player_Kill_Streak_Kill_Count_Bonus"
    },
    "1361": {
      "name": "Player_Kill_Streak_Remaning_Time",
      "operator": 1,
      "defaultValue": 0
    },
    "1362": {
      "name": "Player_Kill_Streak_Paused",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1363": {
      "name": "Cosmetics_Kill_Streak_Active",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1364": {
      "name": "Cosmetics_Kill_Streak_Kill_Count",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1365": {
      "name": "Earned_Favor_Next_Hi",
      "int": true,
      "defaultValue": 0
    },
    "1366": {
      "name": "Earned_Favor_Next_Lo",
      "int": true,
      "defaultValue": 0
    },
    "1367": {
      "name": "Earned_Favor_Level",
      "int": true,
      "defaultValue": 0
    },
    "1368": {
      "name": "Last_Viewed_Earned_Favor_Next_Hi",
      "int": true,
      "defaultValue": 0
    },
    "1369": {
      "name": "Last_Viewed_Earned_Favor_Next_Lo",
      "int": true,
      "defaultValue": 0
    },
    "1370": {
      "name": "Last_Viewed_Earned_Favor_Level",
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1371": {
      "name": "Disabled_Monster_Affixes",
      "paramType": 14,
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "1372": {
      "name": "Gizmo_Dungeon_Affix_SNOs",
      "paramType": 4,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1373": {
      "name": "Item_Game_Session_Hash",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1374": {
      "name": "Gizmo_String_Override",
      "paramType": 4,
      "operator": 10,
      "int": true,
      "defaultValue": 0
    },
    "1375": {
      "name": "Gizmo_Stringlist_Sno_Override",
      "paramType": 4,
      "operator": 1,
      "int": true,
      "defaultValue": -1
    },
    "1376": {
      "name": "Gizmo_Player_Choice_Indexes",
      "operator": 2,
      "int": true,
      "defaultValue": -1
    },
    "1377": {
      "name": "Max_Player_Distance_Fom_Boss_Camera_Override",
      "operator": 1,
      "defaultValue": -1
    },
    "1378": {
      "name": "Boss_Camera_Bias_From_Player_Min_Override",
      "operator": 1,
      "defaultValue": -1
    },
    "1379": {
      "name": "Boss_Camera_Bias_From_Player_Max_Override",
      "operator": 1,
      "defaultValue": -1
    },
    "1380": {
      "name": "Boss_Camera_Bias_Distance_Min_Override",
      "operator": 1,
      "defaultValue": -1
    },
    "1381": {
      "name": "Boss_Camera_Bias_Distance_Max_Override",
      "operator": 1,
      "defaultValue": -1
    },
    "1382": {
      "name": "Boss_Camera_Max_move_Rate_Per_second_Override",
      "operator": 1,
      "defaultValue": -1
    },
    "1383": {
      "name": "Boss_Camera_Smoothing_Override",
      "operator": 1,
      "defaultValue": -1
    },
    "1384": {
      "name": "Boss_Camera_Activation_Radius_Override",
      "operator": 1,
      "defaultValue": -1
    },
    "1385": {
      "name": "Boss_Camera_Deactivation_Radius_Override",
      "operator": 1,
      "defaultValue": -1
    },
    "1386": {
      "name": "Boss_Camera_Zoom_Intro_Time_Override",
      "operator": 1,
      "defaultValue": -1
    },
    "1387": {
      "name": "Boss_Camera_Zoom_Outro_Time_Override",
      "operator": 1,
      "defaultValue": -1
    },
    "1388": {
      "name": "Item_Unmodifiable",
      "operator": 3,
      "int": true,
      "defaultValue": 0
    },
    "1389": {
      "name": "Allow_Door_Operate_During_Power",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "-2147483648": {
      "name": "Flurry_Consume_2",
      "int": true,
      "defaultValue": 0
    },
    "-2147483647": {
      "name": "Flurry_Consume_1",
      "int": true,
      "defaultValue": 0
    },
    "-2147483646": {
      "name": "Hammer_Of_The_Ancients_Earthquake",
      "int": true,
      "defaultValue": 0
    },
    "-2147483645": {
      "name": "BSK_Bonus_Int",
      "paramType": 33,
      "int": true,
      "defaultValue": 0
    },
    "-2147483644": {
      "name": "Resource_On_Kill_Warlock",
      "paramType": 7,
      "defaultValue": 0
    },
    "-2147483643": {
      "name": "Witchcraft_Summoning",
      "int": true,
      "defaultValue": 0
    },
    "-2147483642": {
      "name": "Socketable_WitchingHour",
      "defaultValue": 0
    },
    "-2147483641": {
      "name": "Socketable_VoiceOfTheStars",
      "defaultValue": 0
    },
    "-2147483640": {
      "name": "S09_FocusSkill",
      "paramType": 26,
      "int": true,
      "defaultValue": 0
    },
    "-2147483639": {
      "name": "S09_SchoolofDenial",
      "int": true,
      "defaultValue": 0
    },
    "-2147483638": {
      "name": "S09_SchoolofPower",
      "int": true,
      "defaultValue": 0
    },
    "-2147483637": {
      "name": "S09_SchoolofControl",
      "int": true,
      "defaultValue": 0
    },
    "-2147483636": {
      "name": "Socketable_Willbreaker",
      "defaultValue": 0
    },
    "-2147483635": {
      "name": "Socketable_ReverieHorn",
      "defaultValue": 0
    },
    "-2147483634": {
      "name": "Socketable_LiminalEcho",
      "defaultValue": 0
    },
    "-2147483633": {
      "name": "Socketable_TheStarflux",
      "defaultValue": 0
    },
    "-2147483632": {
      "name": "Socketable_EideticMemory",
      "defaultValue": 0
    },
    "-2147483631": {
      "name": "Socketable_LuminateEye",
      "defaultValue": 0
    },
    "-2147483630": {
      "name": "Socketable_SparkofCreation",
      "defaultValue": 0
    },
    "-2147483629": {
      "name": "Socketable_MyriadStone",
      "defaultValue": 0
    },
    "-2147483628": {
      "name": "Socketable_IdolFromBelow",
      "defaultValue": 0
    },
    "-2147483627": {
      "name": "Socketable_VernalLight",
      "defaultValue": 0
    },
    "-2147483626": {
      "name": "Socketable_HoradricCrest",
      "defaultValue": 0
    },
    "-2147483625": {
      "name": "Socketable_SealofDenial",
      "defaultValue": 0
    },
    "-2147483624": {
      "name": "Socketable_SealofPower",
      "defaultValue": 0
    },
    "-2147483623": {
      "name": "Socketable_SealofControl",
      "defaultValue": 0
    },
    "-2147483622": {
      "name": "Socketable_VilePhylactery",
      "defaultValue": 0
    },
    "-2147483621": {
      "name": "Socketable_PointedFinger",
      "defaultValue": 0
    },
    "-2147483620": {
      "name": "Socketable_PhantomString",
      "defaultValue": 0
    },
    "-2147483619": {
      "name": "Socketable_MindWreath",
      "defaultValue": 0
    },
    "-2147483618": {
      "name": "Socketable_FriendOfTheBog",
      "defaultValue": 0
    },
    "-2147483617": {
      "name": "Socketable_ElderSigil",
      "defaultValue": 0
    },
    "-2147483616": {
      "name": "Socketable_TyrantBane",
      "defaultValue": 0
    },
    "-2147483615": {
      "name": "Socketable_VultureTalon",
      "defaultValue": 0
    },
    "-2147483614": {
      "name": "Socketable_SpiralCoin",
      "defaultValue": 0
    },
    "-2147483613": {
      "name": "Socketable_KillingWind",
      "defaultValue": 0
    },
    "-2147483612": {
      "name": "Socketable_BreadAndRoses",
      "defaultValue": 0
    },
    "-2147483611": {
      "name": "Socketable_HungeringVoid",
      "int": true,
      "defaultValue": 0
    },
    "-2147483610": {
      "name": "Socketable_DustStone",
      "defaultValue": 0
    },
    "-2147483609": {
      "name": "Socketable_MoonlightWard",
      "int": true,
      "defaultValue": 0
    },
    "-2147483608": {
      "name": "Socketable_Potency_Infusion",
      "defaultValue": 0
    },
    "-2147483607": {
      "name": "Socketable_Potency_Unique",
      "defaultValue": 0
    },
    "-2147483606": {
      "name": "Socketable_Potency_Growth",
      "defaultValue": 0
    },
    "-2147483605": {
      "name": "Socketable_Potency_Psyche",
      "defaultValue": 0
    },
    "-2147483604": {
      "name": "Socketable_Potency_Eldritch",
      "defaultValue": 0
    },
    "-2147483603": {
      "name": "Witch_Psyche_Unique",
      "int": true,
      "defaultValue": 0
    },
    "-2147483602": {
      "name": "Witch_Psyche",
      "int": true,
      "defaultValue": 0
    },
    "-2147483601": {
      "name": "Witch_GrowthAndRot_Unique",
      "int": true,
      "defaultValue": 0
    },
    "-2147483600": {
      "name": "Witch_GrowthAndRot",
      "int": true,
      "defaultValue": 0
    },
    "-2147483599": {
      "name": "Witch_Eldritch_Unique",
      "int": true,
      "defaultValue": 0
    },
    "-2147483598": {
      "name": "Witch_Eldritch",
      "int": true,
      "defaultValue": 0
    },
    "-2147483597": {
      "name": "Necro_BoneSpear_WaveCDR",
      "int": true,
      "defaultValue": 0
    },
    "-2147483596": {
      "name": "BSK_Bonus_Will",
      "int": true,
      "defaultValue": 0
    },
    "-2147483595": {
      "name": "Necro_BloodWave_Fortify",
      "defaultValue": 0
    },
    "-2147483594": {
      "name": "BSK_Bonus_Dex",
      "int": true,
      "defaultValue": 0
    },
    "-2147483593": {
      "name": "BSK_Bonus_Str",
      "int": true,
      "defaultValue": 0
    },
    "-2147483592": {
      "name": "BSK_DoT_Damage",
      "int": true,
      "defaultValue": 0
    },
    "-2147483591": {
      "name": "Blessing_BSK_Consumable",
      "defaultValue": 0
    },
    "-2147483590": {
      "name": "Blessing_BSK_Reputation",
      "defaultValue": 0
    },
    "-2147483589": {
      "name": "Blessing_BSK_Legendary",
      "defaultValue": 0
    },
    "-2147483588": {
      "name": "Armor_Cap",
      "operator": 3,
      "defaultValue": 1000,
      "formula": "1000"
    },
    "-2147483587": {
      "name": "Sorc_Conjurations_BonusSummons_Chance",
      "paramType": 5,
      "defaultValue": 0
    },
    "-2147483586": {
      "name": "S9_CosmicAnomaly_Equipped",
      "int": true,
      "defaultValue": 0
    },
    "-2147483585": {
      "name": "S9_AstralPillar_Equipped",
      "int": true,
      "defaultValue": 0
    },
    "-2147483584": {
      "name": "S9_Propulsion_Equipped",
      "int": true,
      "defaultValue": 0
    },
    "-2147483583": {
      "name": "Spiritborn_Eagle_Main_Active",
      "int": true,
      "defaultValue": 0
    },
    "-2147483582": {
      "name": "S9_Disintegrate_Equipped",
      "int": true,
      "defaultValue": 0
    },
    "-2147483581": {
      "name": "S9_CelestialSurge_Equipped",
      "int": true,
      "defaultValue": 0
    },
    "-2147483580": {
      "name": "Sorc_Hydra_Bonus_Heads",
      "int": true,
      "defaultValue": 0
    },
    "-2147483579": {
      "name": "Sorc_ArcLash_Bonus_Swipes",
      "defaultValue": 0
    },
    "-2147483578": {
      "name": "Rogue_DarkShroud_MaximumLife",
      "defaultValue": 0
    },
    "-2147483577": {
      "name": "Rogue_HealthPotion_MaxResist",
      "defaultValue": 0
    },
    "-2147483576": {
      "name": "Minions_Fortify_On_Attack_Chance",
      "defaultValue": 0
    },
    "-2147483575": {
      "name": "AoE_Size_Bonus_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "-2147483574": {
      "name": "Rogue_DarkShroud_DamagePer",
      "defaultValue": 0
    },
    "-2147483573": {
      "name": "Warlock_Dominance_Reserve_Amount",
      "operator": 4,
      "defaultValue": 1
    },
    "-2147483572": {
      "name": "Rogue_DoK_Dodge",
      "defaultValue": 0
    },
    "-2147483571": {
      "name": "Rogue_Special_DamageAfterStealth",
      "defaultValue": 0
    },
    "-2147483570": {
      "name": "Mobility_Grants_MovementSpeed",
      "defaultValue": 0
    },
    "-2147483569": {
      "name": "Evade_Grants_AttackSpeed",
      "defaultValue": 0
    },
    "-2147483568": {
      "name": "Barb_WalkingArsenal_MovementSpeedPer",
      "defaultValue": 0
    },
    "-2147483567": {
      "name": "Barb_Berserking_Multiplicative_Damage",
      "defaultValue": 0
    },
    "-2147483566": {
      "name": "Barb_Berserking_DamageReduction",
      "defaultValue": 0
    },
    "-2147483565": {
      "name": "Barb_Berserking_CastSpeed",
      "defaultValue": 0
    },
    "-2147483564": {
      "name": "Barb_Berserking_AttackSpeed",
      "defaultValue": 0
    },
    "-2147483563": {
      "name": "Barb_FrenzyChance",
      "defaultValue": 0
    },
    "-2147483562": {
      "name": "Barb_Berserking_MovementSpeed",
      "defaultValue": 0
    },
    "-2147483561": {
      "name": "Rogue_Precision_AttackSpeedPer",
      "defaultValue": 0
    },
    "-2147483560": {
      "name": "Rogue_InnerSight_MovementSpeed",
      "defaultValue": 0
    },
    "-2147483559": {
      "name": "Multiplicative_Damage_Percent_Bonus_To_Imbued_Skills",
      "defaultValue": 0
    },
    "-2147483558": {
      "name": "Rogue_RapidFire_EnhancedCritBonus",
      "defaultValue": 0
    },
    "-2147483557": {
      "name": "Spiritborn_Resolve_ResourceOnLoss",
      "int": true,
      "defaultValue": 0
    },
    "-2147483556": {
      "name": "Rogue_StunGrenade_ResourceOnExplode",
      "int": true,
      "defaultValue": 0
    },
    "-2147483555": {
      "name": "Sorc_Fireball_ResourceOnHit",
      "int": true,
      "defaultValue": 0
    },
    "-2147483554": {
      "name": "Sorc_Fireball_ProjectileSpeed",
      "defaultValue": 0
    },
    "-2147483553": {
      "name": "Sorc_CracklingEnergy_MovementSpeed",
      "defaultValue": 0
    },
    "-2147483552": {
      "name": "Sorc_CracklingEnergy_DamageReductionPer",
      "defaultValue": 0
    },
    "-2147483551": {
      "name": "Sorc_FrozenOrb_ConjurationCDR",
      "defaultValue": 0
    },
    "-2147483550": {
      "name": "Sorc_IceSpike_ChanceToExplodeTwice",
      "defaultValue": 0
    },
    "-2147483549": {
      "name": "Sorc_IceSpike_FreezeDuration",
      "defaultValue": 0
    },
    "-2147483548": {
      "name": "Sorc_BallLightning_Damage_Reduction_Per",
      "defaultValue": 0
    },
    "-2147483547": {
      "name": "Sorc_BallLightning_TemperSwap_SuperBallLightning",
      "defaultValue": 0
    },
    "-2147483546": {
      "name": "Sorc_BallLightning_Cast_While_Moving",
      "defaultValue": 0
    },
    "-2147483545": {
      "name": "Sorc_BallLightning_Movement_Speed",
      "defaultValue": 0
    },
    "-2147483544": {
      "name": "Sorc_CracklingEnergy_ChanceToNotConsumeCharge",
      "defaultValue": 0
    },
    "-2147483543": {
      "name": "Sorc_CracklingEnergy_HitAdditionalTargets",
      "defaultValue": 0
    },
    "-2147483542": {
      "name": "Sorc_Enchantment_Potency",
      "operator": 6,
      "defaultValue": 0
    },
    "-2147483541": {
      "name": "Sorc_Shatter_Damage",
      "defaultValue": 0
    },
    "-2147483540": {
      "name": "Druid_StormStrike_HitAdditionalTargets",
      "int": true,
      "defaultValue": 0
    },
    "-2147483539": {
      "name": "Druid_Cataclysm_MovementSpeed",
      "defaultValue": 0
    },
    "-2147483538": {
      "name": "Druid_Werewolf_MovementSpeed",
      "defaultValue": 0
    },
    "-2147483537": {
      "name": "Druid_Hurricane_MovementSpeed",
      "defaultValue": 0
    },
    "-2147483536": {
      "name": "Druid_UrsineStrength_BonusAll",
      "defaultValue": 0
    },
    "-2147483535": {
      "name": "Druid_LupineFerocity_Damage",
      "defaultValue": 0
    },
    "-2147483534": {
      "name": "Druid_SpiritBoon_Packleader_LuckyHitChance",
      "defaultValue": 0
    },
    "-2147483533": {
      "name": "Druid_HumanForm_MovementSpeed",
      "defaultValue": 0
    },
    "-2147483532": {
      "name": "Druid_HumanForm_Armor",
      "int": true,
      "defaultValue": 0
    },
    "-2147483531": {
      "name": "Druid_AnimaOfTheForest",
      "defaultValue": 0
    },
    "-2147483530": {
      "name": "Druid_BloodHowl_GrantsStealth",
      "defaultValue": 0
    },
    "-2147483529": {
      "name": "Necro_BoneStorm_Armor",
      "int": true,
      "defaultValue": 0
    },
    "-2147483528": {
      "name": "Necro_BoneStorm_DamageReduction",
      "defaultValue": 0
    },
    "-2147483527": {
      "name": "Necro_HewedFlesh_GrantsBarrier",
      "defaultValue": 0
    },
    "-2147483526": {
      "name": "Necro_ColdMage_AttackSpeed",
      "defaultValue": 0
    },
    "-2147483525": {
      "name": "Rogue_ShadowClone_Execute",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "-2147483524": {
      "name": "Rogue_MaxPoisonTraps",
      "int": true,
      "defaultValue": 0
    },
    "-2147483523": {
      "name": "Rogue_Traps_Are_Core",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "-2147483522": {
      "name": "Necro_Evade_LeavesDesecratedGround",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "-2147483521": {
      "name": "Necro_CorpseExplosion_Fear",
      "defaultValue": 0
    },
    "-2147483520": {
      "name": "Necro_BloodSurge_EssencePerDrain",
      "int": true,
      "defaultValue": 0
    },
    "-2147483519": {
      "name": "Necro_BloodSurge_ExtraDrainsvsBoss",
      "int": true,
      "defaultValue": 0
    },
    "-2147483518": {
      "name": "Necro_PassiveRanks_AllMinionMastery",
      "int": true,
      "defaultValue": 0
    },
    "-2147483517": {
      "name": "Necro_Bonus_Max_Golems",
      "int": true,
      "defaultValue": 0
    },
    "-2147483516": {
      "name": "Necro_Bonus_Max_Mages",
      "int": true,
      "defaultValue": 0
    },
    "-2147483515": {
      "name": "Necro_Damage_MacabreOrCorpse",
      "defaultValue": 0
    },
    "-2147483514": {
      "name": "Spiritborn_Soar_Barrier",
      "defaultValue": 0
    },
    "-2147483513": {
      "name": "Spiritborn_Resolve_DamageForDuration",
      "defaultValue": 0
    },
    "-2147483512": {
      "name": "Spiritborn_Soar_DamagePerDistance",
      "defaultValue": 0
    },
    "-2147483511": {
      "name": "Spiritborn_CoreStats_All_PerFerocityAndResolve",
      "int": true,
      "defaultValue": 0
    },
    "-2147483510": {
      "name": "Generic_AttackSpeed_After_Using_Defensive",
      "defaultValue": 0
    },
    "-2147483509": {
      "name": "Rogue_SkillRanks_Marksman_Cutthroat",
      "int": true,
      "defaultValue": 0
    },
    "-2147483508": {
      "name": "Generic_LuckyHit_Berserking_Manual",
      "defaultValue": 0
    },
    "-2147483507": {
      "name": "Generic_SkillRanks_AllFireIsh",
      "int": true,
      "defaultValue": 0
    },
    "-2147483506": {
      "name": "Generic_SkillRanks_AllColdIsh",
      "int": true,
      "defaultValue": 0
    },
    "-2147483505": {
      "name": "Generic_ResourceGain_And_ResourceMax_Combined",
      "defaultValue": 0
    },
    "-2147483504": {
      "name": "Generic_DamageReduction_WhileUnstoppable",
      "defaultValue": 0
    },
    "-2147483503": {
      "name": "Generic_Damage_Vs_AngelsAndDemons",
      "defaultValue": 0
    },
    "-2147483502": {
      "name": "Generic_Damage_FireOrCold",
      "defaultValue": 0
    },
    "-2147483501": {
      "name": "Generic_Evade_Unhindered",
      "defaultValue": 0
    },
    "-2147483500": {
      "name": "Generic_LuckyHit_CC_Any",
      "defaultValue": 0
    },
    "-2147483499": {
      "name": "Generic_Potion_GrantsMovementSpeed_AnyHP",
      "defaultValue": 0
    },
    "-2147483498": {
      "name": "Generic_Chance_For_Hit_Twice_Per_SkillTag",
      "paramType": 33,
      "defaultValue": 0
    },
    "-2147483497": {
      "name": "Generic_Chance_For_Double_Damage_Per_SkillTag",
      "paramType": 33,
      "defaultValue": 0
    },
    "-2147483496": {
      "name": "Generic_MovementSpeed_AfterKillAny",
      "defaultValue": 0
    },
    "-2147483495": {
      "name": "Generic_AttacksReduceUltimateCDR",
      "defaultValue": 0
    },
    "-2147483494": {
      "name": "UBERUNIQUE_Sleepsong_All_Talents",
      "defaultValue": 0
    },
    "-2147483493": {
      "name": "UBERUNIQUE_Ahavarion_ResourceOnHit_AllClasses_Combined",
      "int": true,
      "defaultValue": 0
    },
    "-2147483492": {
      "name": "UBERUNIQUE_DoT_Duration",
      "defaultValue": 0
    },
    "-2147483491": {
      "name": "UBERUNIQUE_Ahavarion_CritDamage_VulnDamage_OverpowerDamage_Combined",
      "defaultValue": 0
    },
    "-2147483490": {
      "name": "Spiritborn_Spirit_Bonus",
      "paramType": 5,
      "defaultValue": 0
    },
    "-2147483489": {
      "name": "Warlock_Pet_Potency",
      "paramType": 38,
      "defaultValue": 0
    },
    "-2147483488": {
      "name": "Bonus_Percent_Per_Power_2",
      "paramType": 5,
      "defaultValue": 0
    },
    "-2147483487": {
      "name": "Warlock_BonusSummonCount",
      "paramType": 2,
      "int": true,
      "defaultValue": 0
    },
    "-2147483486": {
      "name": "Bonus_Percent_Per_Power_3",
      "paramType": 5,
      "defaultValue": 0
    },
    "-2147483485": {
      "name": "MaxStacks",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "-2147483484": {
      "name": "MinStacks",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "-2147483483": {
      "name": "BuffDuration",
      "paramType": 5,
      "defaultValue": 0
    },
    "-2147483482": {
      "name": "SpecialResourceCostReductionPerPower",
      "paramType": 5,
      "operator": 6,
      "defaultValue": 0
    },
    "-2147483481": {
      "name": "SpecialResourceCostReduction",
      "paramType": 7,
      "operator": 6,
      "defaultValue": 0
    },
    "-2147483480": {
      "name": "Chance_For_Double_Damage_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "-2147483479": {
      "name": "Chance_To_Consume_No_Charges_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "-2147483478": {
      "name": "Chance_To_Hit_Twice_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "-2147483477": {
      "name": "Boost_ExtraGamblerItem_CN",
      "defaultValue": 0
    },
    "-2147483476": {
      "name": "Blessing_ExtraGamblerItem",
      "defaultValue": 0
    },
    "-2147483475": {
      "name": "Blessing_S06_Realmwalker_ExtraOpal",
      "defaultValue": 0
    },
    "-2147483474": {
      "name": "Rune_Ura_SpawnedMonsterTag",
      "operator": 2,
      "int": true,
      "defaultValue": 0
    },
    "-2147483473": {
      "name": "Blessing_Glyph_Upgrade_Chance_Bonus",
      "defaultValue": 0
    },
    "-2147483472": {
      "name": "Blessing_Final_Reputation_Cache_Bonus",
      "defaultValue": 0
    },
    "-2147483471": {
      "name": "Boost_Whisper_Ancestral_Cache_Bonus_CN",
      "defaultValue": 0
    },
    "-2147483470": {
      "name": "Blessing_Whisper_Ancestral_Cache_Bonus",
      "defaultValue": 0
    },
    "-2147483469": {
      "name": "Blessing_Belial_Ambush_Bonus",
      "defaultValue": 0
    },
    "-2147483468": {
      "name": "Blessing_Season08_Reputation_Bonus",
      "defaultValue": 0
    },
    "-2147483467": {
      "name": "Boost_MWK_Material_Bonus_CN",
      "defaultValue": 0
    },
    "-2147483466": {
      "name": "Blessing_MWK_Material_Bonus",
      "defaultValue": 0
    },
    "-2147483465": {
      "name": "S09_HoradricPhialsArtifact_BlessingBonus",
      "defaultValue": 0
    },
    "-2147483464": {
      "name": "S09_AstarothGear_BlessingBonus",
      "defaultValue": 0
    },
    "-2147483463": {
      "name": "S09_EscalationSigil_BlessingBonus",
      "defaultValue": 0
    },
    "-2147483462": {
      "name": "S10_Chaos_Armor_Chance_Blessing",
      "defaultValue": 0
    },
    "-2147483461": {
      "name": "IH_10Wave_Sigil_Blessing",
      "defaultValue": 0
    },
    "-2147483460": {
      "name": "S10_Chaos_Shrine_Blessing",
      "defaultValue": 0
    },
    "-2147483459": {
      "name": "S10_Chaos_NMD_Blessing",
      "defaultValue": 0
    },
    "-2147483458": {
      "name": "S07_Blessing_SeasonalCurrencyBonus",
      "defaultValue": 0
    },
    "-2147483457": {
      "name": "Paladin_Juggernaut_Damage_When_Spending_Resolve",
      "defaultValue": 0
    },
    "-2147483456": {
      "name": "Paladin_Juggernaut_Ability_Size",
      "defaultValue": 0
    },
    "-2147483455": {
      "name": "Paladin_Arbiter_WingStrike_Damage",
      "defaultValue": 0
    },
    "-2147483454": {
      "name": "Paladin_Judgement_DamageTakenWhileJudged",
      "defaultValue": 0
    },
    "-2147483453": {
      "name": "Paladin_Judgement_Damage",
      "defaultValue": 0
    },
    "-2147483452": {
      "name": "Paladin_Arbiter_AdditionalArmor",
      "defaultValue": 0
    },
    "-2147483451": {
      "name": "Paladin_Aura_Enhancement_Potency",
      "defaultValue": 0
    },
    "-2147483450": {
      "name": "Paladin_Aura_Potency_Per_Skill",
      "paramType": 5,
      "defaultValue": 0
    },
    "-2147483449": {
      "name": "Paladin_Retribution_Chance",
      "defaultValue": 0
    },
    "-2147483448": {
      "name": "Paladin_Minimum_Resolve",
      "int": true,
      "defaultValue": 0
    },
    "-2147483447": {
      "name": "Paladin_Arbiter_Oath",
      "operator": 1,
      "int": true,
      "defaultValue": 0
    },
    "-2147483446": {
      "name": "S12_KillStreak_Massacre_IntelligencePercent",
      "defaultValue": 0
    },
    "-2147483445": {
      "name": "S12_KillStreak_Massacre_WillpowerPercent",
      "defaultValue": 0
    },
    "-2147483444": {
      "name": "S12_KillStreak_Massacre_StrengthPercent",
      "defaultValue": 0
    },
    "-2147483443": {
      "name": "S12_KillStreak_Massacre_DexterityPercent",
      "defaultValue": 0
    },
    "-2147483442": {
      "name": "S12_KillStreak_Massacre_MovementSpeed",
      "defaultValue": 0
    },
    "-2147483441": {
      "name": "S12_KillStreak_Massacre_LuckyHitChance",
      "defaultValue": 0
    },
    "-2147483440": {
      "name": "S12_KillStreak_Massacre_Lifesteal",
      "defaultValue": 0
    },
    "-2147483439": {
      "name": "S12_KillStreak_Massacre_MaxLife",
      "defaultValue": 0
    },
    "-2147483438": {
      "name": "S12_KillStreak_Massacre_CooldownReduction",
      "defaultValue": 0
    },
    "-2147483437": {
      "name": "S12_KillStreak_Massacre_CriticalStrikeChance",
      "defaultValue": 0
    },
    "-2147483436": {
      "name": "S12_KillStreak_Massacre_ResourceCostReduction",
      "defaultValue": 0
    },
    "-2147483435": {
      "name": "S12_KillStreak_Massacre_AttackSpeed",
      "defaultValue": 0
    },
    "-2147483434": {
      "name": "S12_KillStreak_Feast_Rampage",
      "defaultValue": 0
    },
    "-2147483433": {
      "name": "S12_KillStreak_Feast_Demons",
      "defaultValue": 0
    },
    "-2147483432": {
      "name": "S12_KillStreak_Feast_Evade",
      "defaultValue": 0
    },
    "-2147483431": {
      "name": "S12_KillStreak_Feast_NextCastDamage",
      "defaultValue": 0
    },
    "-2147483430": {
      "name": "S12_KillStreak_Feast_Bloodsplosion",
      "defaultValue": 0
    },
    "-2147483429": {
      "name": "S12_KillStreak_Feast_Bite",
      "defaultValue": 0
    },
    "-2147483428": {
      "name": "S12_KillStreak_Feast_Chains",
      "defaultValue": 0
    },
    "-2147483427": {
      "name": "S12_KillStreak_Feast_RestoreResource",
      "defaultValue": 0
    },
    "-2147483426": {
      "name": "S12_KillStreak_Feast_CooldownReset",
      "defaultValue": 0
    },
    "-2147483425": {
      "name": "S12_KillStreak_Hunger_LuckyHit",
      "defaultValue": 0
    },
    "-2147483424": {
      "name": "S12_KillStreak_Hunger_OnKIll",
      "defaultValue": 0
    },
    "-2147483423": {
      "name": "S12_KillStreak_Hunger_CooldownUsed",
      "defaultValue": 0
    },
    "-2147483422": {
      "name": "S12_KillStreak_Hunger_ResourceSpent",
      "defaultValue": 0
    },
    "-2147483421": {
      "name": "S12_KillStreak_Hunger_Ancestral_Condition",
      "int": true,
      "defaultValue": 0
    },
    "-2147483420": {
      "name": "S12_KillStreak_Hunger_Ancestral",
      "defaultValue": 0
    },
    "-2147483419": {
      "name": "S12_KillStreak_Hunger_Salvage",
      "defaultValue": 0
    },
    "-2147483418": {
      "name": "S12_KillStreak_Hunger_Runes",
      "defaultValue": 0
    },
    "-2147483417": {
      "name": "S12_KillStreak_Hunger_Gold",
      "defaultValue": 0
    },
    "-2147483416": {
      "name": "S12_KillStreak_Hunger_KillstreakRep",
      "defaultValue": 0
    },
    "-2147483415": {
      "name": "S12_KillStreak_Hunger_KillstreakXP",
      "defaultValue": 0
    },
    "-2147483414": {
      "name": "S12_KillStreak_Hunger_FeastItems",
      "defaultValue": 0
    },
    "-2147483413": {
      "name": "S12_KillStreak_Hunger_RampageItems_Condition",
      "int": true,
      "defaultValue": 0
    },
    "-2147483412": {
      "name": "S12_KillStreak_Hunger_RampageItems",
      "defaultValue": 0
    },
    "-2147483411": {
      "name": "S12_KillStreak_Hunger_HungerItems",
      "defaultValue": 0
    },
    "-2147483410": {
      "name": "S12_KillStreak_Hunger_ItemAffixAccumulative",
      "defaultValue": 0,
      "formula": "S12_KillStreak_Hunger_RampageItems + S12_KillStreak_Hunger_HungerItems + S12_KillStreak_Hunger_FeastItems"
    },
    "-2147483409": {
      "name": "S12_KillStreak_Hunger_BasicSkill",
      "defaultValue": 0
    },
    "-2147483408": {
      "name": "S12_AprilFools_Unique_DamageToPoultry",
      "defaultValue": 0
    },
    "-2147483407": {
      "name": "S12_AprilFools_Unique_NegativeInt",
      "int": true,
      "defaultValue": 0
    },
    "-2147483406": {
      "name": "S12_AprilFools_Unique_Bow_CluckThrice",
      "defaultValue": 0
    },
    "-2147483405": {
      "name": "S12_Blessing_BloodiedKeys",
      "defaultValue": 0
    },
    "-2147483404": {
      "name": "S12_Blessing_Slaughterhouse",
      "defaultValue": 0
    },
    "-2147483403": {
      "name": "S12_Blessing_FreshMeat",
      "defaultValue": 0
    },
    "-2147483402": {
      "name": "Multiplicative_Overpower_Damage_Bonus_Per_Stack",
      "operator": 4,
      "defaultValue": 0
    },
    "-2147483401": {
      "name": "Overpower_Damage_Bonus_Per_Stack",
      "defaultValue": 0
    },
    "-2147483400": {
      "name": "Overpower_Stack_Refund_Chance",
      "defaultValue": 0
    },
    "-2147483399": {
      "name": "Warlock_Shadowform_Damage_Bonus",
      "defaultValue": 0
    },
    "-2147483398": {
      "name": "Multiplicative_Warlock_Shadowform_Damage_Bonus",
      "operator": 7,
      "defaultValue": 0
    },
    "-2147483397": {
      "name": "Warlock_Demonform_Damage_Bonus",
      "defaultValue": 0
    },
    "-2147483396": {
      "name": "Multiplicative_Warlock_Demonform_Damage_Bonus",
      "defaultValue": 0
    },
    "-2147483395": {
      "name": "Damage_Percent_Bonus_While_Volatile",
      "defaultValue": 0
    },
    "-2147483394": {
      "name": "Multiplicative_Damage_Percent_Bonus_While_Volatile",
      "defaultValue": 0
    },
    "-2147483393": {
      "name": "Warlock_GreaterDemonPet_MaxHealth_Bonus",
      "defaultValue": 0
    },
    "-2147483392": {
      "name": "Warlock_Eviscerate_Chance_Bonus_Multi",
      "operator": 4,
      "defaultValue": 0
    },
    "-2147483391": {
      "name": "Warlock_Eviscerate_Chance_Bonus",
      "defaultValue": 0
    },
    "-2147483390": {
      "name": "Paladin_Aura_Potency",
      "defaultValue": 0
    },
    "-2147483389": {
      "name": "S11_Blessing_Sanctification_Chance",
      "defaultValue": 0
    },
    "-2147483388": {
      "name": "S11_Blessing_WorldBoss_Gear",
      "defaultValue": 0
    },
    "-2147483387": {
      "name": "Boost_EliteChampion_Gear_CN",
      "defaultValue": 0
    },
    "-2147483386": {
      "name": "Warlock_SummonConversationChanceIncrease",
      "defaultValue": 0
    },
    "-2147483385": {
      "name": "S11_Blessing_EliteChampion_Gear",
      "defaultValue": 0
    },
    "-2147483384": {
      "name": "Bonus_Flat_Resource_Per_Power",
      "paramType": 5,
      "int": true,
      "defaultValue": 0
    },
    "-2147483383": {
      "name": "Life_Cost_Reduction",
      "operator": 6,
      "int": true,
      "defaultValue": 0
    },
    "-2147483382": {
      "name": "Projectile_Speed_Bonus_Per_Power",
      "paramType": 5,
      "defaultValue": 0
    },
    "-2147483381": {
      "name": "Max_Summons_Per_Skill_Tag",
      "paramType": 33,
      "int": true,
      "defaultValue": 0
    },
    "-2147483380": {
      "name": "Rogue_Additional_Shade_Chance",
      "defaultValue": 0
    },
    "-2147483379": {
      "name": "Bucketed_Multiplicative_DoT_Damage",
      "defaultValue": 0
    },
    "-2147483378": {
      "name": "Bucketed_Multiplicative_Damage_Type",
      "paramType": 0,
      "defaultValue": 0
    },
    "-2147483377": {
      "name": "Bucketed_Multiplicative_Damage",
      "defaultValue": 0
    },
    "-2147483376": {
      "name": "Bucketed_Multiplicative_Vulnerable_Health_Damage",
      "defaultValue": 0
    },
    "-2147483375": {
      "name": "Bucketed_Multiplicative_Crit_Damage",
      "defaultValue": 0
    },
    "-2147483374": {
      "name": "Experience_Bonus_Bucketed_And_Penalized_At_Max_Level",
      "defaultValue": 0
    },
    "-2147483373": {
      "name": "Rogue_Imbuement_Potency",
      "defaultValue": 0
    },
    "-2147483372": {
      "name": "Custom_Duration_Bonus_Per_Skill_Tag",
      "paramType": 33,
      "defaultValue": 0
    },
    "-2147483371": {
      "name": "Skill_Effect_Duration_Per_SkillTag",
      "paramType": 33,
      "defaultValue": 0
    }
  },
  "attributeDescriptions": {
    "Druid_BloodHowl_GrantsStealth": "{c_important}Blood Howl{/c} Grants Stealth for +[{value}|1|] Seconds",
    "AoE_Size_Bonus_Per_Power#Barbarian_Rupture": "+[{value2}*100|1%|] {c_important}Enhanced {value1}{/c} Explosion Size",
    "Sorc_Shatter_Damage": "+[{value}*100|1%|] to {c_important}Shatter's{/c} Damage Echo",
    "Sorc_IceSpike_ChanceToExplodeTwice": "+[{value2}*100|1%|] Chance for {c_important}Ice Spikes{/c} to Explode Twice",
    "Necro_BloodSurge_EssencePerDrain": "+[{value}||] Essence per Enemy Drained by {c_important}Blood Surge{/c}",
    "Generic_DamageReduction_WhileUnstoppable": "[{value}*100|1%|] Damage Reduction while Unstoppable",
    "Generic_ResourceGain_And_ResourceMax_Combined": "[{value}*100|1%|] Resource Generation and Maximum",
    "Flat_Block_Amount": "[{value}||] {c:FF888888}Shield Block Value{/c:FF888888}",
    "Crit_Percent_Bonus": "+[{value}*100|1%|] Critical Strike Chance",
    "Crit_Damage_Percent": "+[{value}*100|%|] Critical Strike Damage",
    "Damage_Type_Percent_Bonus": "+[{value2}*100|%|] {value1} Damage",
    "Faster_Healing_Percent": "+{value%} Potion Healing Speed",
    "Gold_Find": "[{value}*100|~%|] Gold Drop Rate",
    "Hitpoints_Max_Bonus": "[{value}|~|] Maximum Life",
    "Hitpoints_Percent": "+[{value}*100|~%|] Life",
    "Proc_Flat_Hitpoints_On_Hit": "{c_label}Lucky Hit:{/c} Up to a 15% Chance to Heal +[{value}||] Life",
    "Flat_Hitpoints_On_Kill": "[{value}|~|] Life On Kill",
    "Hitpoints_Regen_Per_Second": "+[{value}||] Healing Over Time",
    "Immunity": "{value1} Damage Immunity",
    "Item_Cost_Percent_Bonus": "+[{value}*100|1%|] Sell Value",
    "Mana_Restriction": "(Sorcerer Only)",
    "Spirit_Restriction": "(Druid Only)",
    "Arcanum_Restriction": "(Wizard Only)",
    "Movement_Bonus_Run_Speed": "+[{value}*100|%|] Movement Speed",
    "Run_Speed_Duration": "Increases movement speed for [{value}||] seconds. Effect ends if you deal or receive damage.",
    "Pierce_Chance": "+[{value}*100|1%|] Pierce Chance",
    "Requirements_Ease_Percent": "[{value}*100|~%|] Requirements",
    "Resistance": "+[{value2}||] {value1} Resistance",
    "Resistance_All": "+[{value}||] Resistance to All Elements",
    "ClassRestriction": "({s1} Only)",
    "Sockets": "Sockets ([{value}-{value2}||])",
    "Steal_Health_Percent": "+[{value}*100|1%|] Life Steal",
    "Steal_Mana_Percent": "Restore [{value}*100|1%|] of Damage Dealt as Resource",
    "Experience_Bonus": "[{value}|~|] Experience On Kill",
    "Experience_Bonus_Percent": "+[{value}*100|1%|] Bonus Experience",
    "Willpower": "[{value}|~|] Willpower",
    "Hitpoints_Max_Percent_Bonus_Item": "[{value}*100|1%|] Maximum Life",
    "Attack_Speed_Percent_Bonus": "+[{value}*100|1%|] Attack Speed",
    "Resource_Max_Percent_Bonus": "[{value2}*100|1%|] Maximum {value1}",
    "Resource_Max_Bonus": "+[{value2}||] Maximum {value1}",
    "Resource_On_Kill": "[{value2}|~|] {value1} On Kill",
    "Resource_On_Crit": "+{value2} {value1} on Critical Strike",
    "HighlySalvageable": "Highly Salvageable",
    "CC_Duration_Reduction": "[{value}*100|1%|] Impairment Reduction",
    "Hatred_Restriction": "(Demon Hunter Only)",
    "Dodge_Chance_Bonus": "[{value}*100|1%|] Dodge Chance",
    "Gold_PickUp_Radius": "+[{value}||] Pickup Radius",
    "On_Hit_Knockback_Proc_Chance": "{c_label}Lucky Hit:{/c} Up to a +[{value}*100|1%|] Chance to Knockback",
    "Damage_Percent_Bonus_Vs_Elites": "+[{value}*100|1%|] Damage to Elites",
    "Damage_Percent_Reduction_From_Elites": "[{value}*100|1%|] Damage Reduction from Elites",
    "Item_Level_Requirement_Reduction": "Level Requirement Reduced by [{value}||]",
    "Ignore_Durability_Loss": "Indestructible",
    "Item_Is_BOE": "Binds to Account When Equipped",
    "Item_Is_BOE_Bound": "Account Bound",
    "Power_Cooldown_Reduction_Percent_All": "[{value1}*100|1%|] Cooldown Reduction",
    "Set_Item_Discount": "Reduces the number of items needed for set bonuses by 1 (to a minimum of 2).",
    "Resource_Cost_Reduction_Percent_All": "[{value}*100|1%|] Resource Cost Reduction",
    "Weapon_On_Hit_Percent_Bleed_Proc_Chance_Combined": "{c_label}Lucky Hit:{/c} Up to a +[{value1}*100|1%|] Chance to Deal [{value2}*100|1%|] Bleeding Damage over {value3} seconds",
    "Armor_Ignore_Damage_Percent": "+[{value}*100|1%|] Chance to Ignore Damage Taken",
    "Gethit_Immune": "Immune to Stagger.",
    "Power_Resource_Cost_Reduction_Percent": "[{value2}*100|1%|] {c_important}{value1}{/c} Resource Cost Reduction",
    "Damage_Percent_All_From_Skills": "+[{value}*100|%|] Damage",
    "Damage_Bonus_To_Near": "+[{value}*100|1%|] Damage to Close Enemies",
    "Damage_Bonus_To_Far": "+[{value}*100|1%|] Damage to Distant Enemies",
    "Damage_Reduction_From_Near": "[{value}*100|1%|] Damage Reduction from Close Enemies",
    "Damage_Reduction_From_Far": "[{value}*100|1%|] Damage Reduction from Distant Enemies",
    "On_Hit_CC_Proc_Chance": "{c_label}Lucky Hit:{/c} Up to a +[{value2}*100|1%|] Chance to {value1} for 2 Seconds",
    "On_Crit_CC_Proc_Chance": "{c_label}Lucky Hit:{/c} Critical Strikes Have Up to a +[{value2}*100|1%|] Chance to {value1} for 2 Seconds",
    "CC_Duration_Bonus_Percent": "+[{value}*100|1%|] Crowd Control Duration",
    "Movement_Speed_Bonus_On_Elite_Kill": "+[{value1}*100|%|] Movement Speed for {value2} |4Second:Seconds; After Killing an Elite",
    "Damage_Bonus_On_Elite_Kill_Combined": "+[{value}*100|1%|] Damage for {value2} |4Second:Seconds; After Killing an Elite",
    "Damage_Reduction_On_Elite_Kill_Combined": "[{value}*100|1%|] Damage Reduction for {value2} |4Second:Seconds; After Killing an Elite",
    "Hitpoints_On_Elite_Kill": "+[{value}*100||] Life On Elite Kill",
    "Flat_Damage_Bonus": "+{value2} {value1} Damage",
    "Flat_Damage_On_Hit": "{c_label}Lucky Hit:{/c} Up to a 5% Chance to Deal [{value}||] Damage",
    "Flat_Hitpoints_Max_Bonus": "+[{value}||] Maximum Life",
    "Flat_Hitpoints_Granted": "Restores [{value}||] Life",
    "OOC_Flat_Hitpoints_Regen_Per_Second": "+[{value}||] Life Regeneration",
    "DOT_DPS_Bonus_Percent": "+[{value}*100|%|] Damage Over Time",
    "Shrine_Elixir_Duration_Bonus": "+[{value}*100|1%|] Shrine Buff Duration",
    "Bonus_Healing_Received_Percent": "+[{value}*100|1%|] Healing Received",
    "Barrier_Bonus_Percent": "+[{value}*100|1%|] Barrier Generation",
    "Damage_Reduction_At_Low_Health": "[{value}*100|1%|] Damage Reduction while Injured",
    "Combat_Effect_Chance_Bonus": "+[{value}*100|1%|] Lucky Hit Chance",
    "Amplify_Damage_From_Pets_Per_Player_Percent": "+[{value}*100|1%|] Summon Damage",
    "Pet_Damage_Bonus_Percent": "+[{value}*100|1%|] {c_important}Summon{/c} Damage",
    "Material_Find": "+[{value}*100|1%|] Crafting Material Drop Rate",
    "CC_Duration_Bonus_Percent_Per_Type": "+[{value2}*100|1%|] {value1} Duration",
    "Damage_Percent_Bonus_Vs_CC_Target": "+[{value2}*100|1%|] Damage to {value1} Enemies",
    "Experience_Bonus_Percent_Vs_Elites": "+[{value}*100|1%|] Bonus Experience from Elites",
    "Resource_Cost_Reduction_Percent": "[{value2}*100|1%|] {value1} Cost Reduction",
    "Vulnerable_Health_Damage_Bonus": "+[{value}*100|%|] Vulnerable Damage",
    "Crit_Chance_Bonus_To_Near": "+[{value}*100|1%|] Critical Strike Chance Against Close Enemies",
    "Crit_Chance_Bonus_To_Far": "+[{value}*100|1%|] Critical Strike Chance Against Distant Enemies",
    "Mount_Armor": "[{value}*1000|~|] Mount Armor",
    "Pet_Equipped_Solo_Attacker_Damage_Bonus": "+[{value}*100|1%|] Damage while no other {c_important}Summons{/c} are Attacking the Enemy",
    "Pet_Equipped_Other_Attacker_Damage_Bonus": "+[{value}*100|1%|] Damage for Each Other {c_important}Summon{/c} Attacking the Enemy",
    "Pet_Equipped_Recently_Summoned_Damage_Bonus": "+[{value}*100|1%|] Damage for 8 Seconds After Being Summoned",
    "Fury_Restriction": "(Barbarian Only)",
    "Potion_Bonus_Heal_Percent": "+[{value}*100|1%|] Potion Healing",
    "Potion_Cooldown_Reduction_Percent": "[{value}*100|1%|] Potion Cooldown Cooldown",
    "Gem_Attributes_Multiplier": "[{value}*100|1%|] Gem Strength in this Item",
    "Damage_Bonus_At_High_Health": "+[{value}*100|1%|] Damage while Healthy",
    "Flat_Damage_Shield_On_Kill": "+[{value}||] Life as Barrier On Kill",
    "Attack_Speed_Percent_Bonus_For_Power": "+[{value2}*100|1%|] {c_important}{value1}{/c} Attack Speed",
    "Damage_Bonus_To_Low_Health": "+[{value}*100|1%|] Damage to Injured Enemies",
    "Damage_Bonus_To_High_Health": "+[{value}*100|1%|] Damage to Healthy Enemies",
    "Flat_Heal_Absorb": "{c_label}Lucky Hit:{/c} Up to a 5% Chance to Absorb [{value}||] Life",
    "Damage_Reduction_During_Evade": "[{value}*100|1%|] Damage Reduction while Evading",
    "No_Damage_Taken_Flat_Hitpoints_Regen_Per_Second": "+[{value}*5||] Life per 5 Seconds",
    "Thorns_Flat": "+[{value}||] Thorns",
    "DOT_DPS_Reduction_Percent": "[{value}*100|1%|] Damage Taken Over Time Reduction",
    "Pet_Inherit_Attrib_Bonus_Pct": "{c_important}Summons{/c} Inherit +[{value}*100|1%|] of Your Stats",
    "Strength": "[{value}|~|] Strength",
    "Intelligence": "[{value}|~|] Intelligence",
    "Dexterity": "[{value}|~|] Dexterity",
    "Plus_All_Stats": "[{value}|~|] All Stats",
    "Weapon_Speed_Percent_Bonus": "+[{value}*100|1%|] Weapon Speed",
    "On_Hit_Execute_Low_Health_Non_Elite_Chance": "{c_label}Lucky Hit:{/c} Up to a +[{value}*100|1%|] Chance to Execute Injured Non-Elites",
    "Proc_Resource_On_Hit_Percent": "{c_label}Lucky Hit:{/c} Up to a 15% Chance to Restore +[{value2}*100|1%|] {value1}",
    "Pet_Equipped_Proc_Resource_On_Hit_Percent": "Chance per Hit to gain [{value2}*100|~%|] {value1}",
    "Energy_Restriction": "(Rogue Only)",
    "Damage_Increase_From_Near": "+[{value}*100|1%|] Damage Taken from Close Enemies",
    "Damage_Increase_From_Far": "+[{value}*100|1%|] Damage Taken from Distant Enemies",
    "Damage_Type_Crit_Damage_Percent_Bonus": "+[{value2}*100|%|] {value1} Critical Strike Damage",
    "Damage_Type_Crit_Percent_Bonus": "+[{value2}*100|1%|] {value1} Critical Strike Chance",
    "Flat_Hitpoints_On_Hit": "+[{value}|0|] Life On Hit",
    "Fortified_Health_Damage_Reduction_Bonus": "[{value}*100|1%|] Damage Reduction while Fortified",
    "Fortified_Health_Application_Bonus": "+[{value}*100|1%|] Fortify Generation",
    "Combat_Effect_Chance_Bonus_Per_Skill": "+[{value2}*100|1%|] {c_important}{value1}{/c} Lucky Hit Chance",
    "Damage_Reduction_While_Crowd_Controlled": "[{value}*100|1%|] Damage Reduction while Impaired",
    "Damage_Reduction_While_Stationary": "[{value}*100|1%|] Damage Reduction while Standing Still",
    "Helpful_Buff_Duration_Bonus_Percent": "[{value}*100|1%|] Helpful Effect Duration",
    "Harmful_Buff_Duration_Bonus_Percent": "[{value}*100|1%|] Harmful Effect Duration",
    "DOT_DPS_Bonus_Percent_Per_Damage_Type": "+[{value2}*100|1%|] {value1} Damage Over Time",
    "DOT_DPS_Reduction_Percent_Per_Damage_Type": "[{value2}*100|1%|] {value1} Damage Taken Over Time Reduction",
    "Hitpoints_Max_Percent_Bonus": "[{value}*100|1%|] Maximum Life",
    "Damage_Percent_Bonus_Vs_CC_All": "+[{value}*100|1%|] Damage to Crowd Controlled Enemies",
    "Resource_Gain_Bonus_Percent": "[{value2}*100|1%|] {value1} Generation",
    "Damage_Increase_While_Stationary": "+[{value}*100|1%|] Damage while Standing Still",
    "Crit_Percent_Bonus_Vs_CC_Target": "+[{value2}*100|1%|] Critical Strike Chance Against {value1} Enemies",
    "Crit_Percent_Bonus_Vs_CC_Target_Any": "+[{value}*100|1%|] Critical Strike Chance Against Crowd Controlled Enemies",
    "Damage_Type_Crit_Percent_Bonus_Vs_Elites": "+[{value2}*100|1%|] {value1} Critical Strike Chance Against Elites",
    "Damage_Percent_Bonus_When_Fortified": "+[{value}*100|1%|] Damage while Fortified",
    "Crit_Damage_Bonus_To_Near": "+[{value}*100|1%|] Critical Strike Damage to Close Enemies",
    "Crit_Damage_Bonus_To_Far": "+[{value}*100|1%|] Critical Strike Damage to Distant Enemies",
    "Damage_Percent_Reduction_From_Dotted_Enemy": "[{value2}*100|1%|] Damage Reduction from {value1} Enemies",
    "Dodge_Chance_Bonus_From_Dotted_Enemies": "+[{value2}*100|1%|] Dodge Chance Against {value1} Enemies",
    "Damage_Percent_Reduction_From_CCed_Target": "[{value2}*100|1%|] Damage Reduction from {value1} Enemies",
    "Damage_Percent_Reduction_From_Vulnerable_Target": "[{value}*100|1%|] Damage Reduction from Vulnerable Enemies",
    "Crit_Damage_Percent_Bonus_Vs_CC_Target_Any": "+[{value}*100|1%|] Critical Strike Damage to Crowd Controlled Enemies",
    "Crit_Damage_Percent_Bonus_To_Vulnerable": "+[{value}*100|1%|] Critical Strike Damage to Vulnerable Enemies",
    "Crit_Percent_Bonus_To_Vulnerable": "+[{value}*100|1%|] Critical Strike Chance Against Vulnerable Enemies",
    "Armor_Bonus": "+[{value}||] Armor",
    "Weapon_Damage_Bonus": "[{value}|~|] Weapon Damage",
    "NonPhysical_Damage_Percent_Bonus": "+[{value}*100|1%|] Non-Physical Damage",
    "Crit_Percent_Bonus_To_Low_Health": "+[{value}*100|1%|] Critical Strike Chance Against Injured Enemies",
    "Pet_Health_Bonus_Percent": "[{value}*100|1%|] Maximum {c_important}Summon{/c} Life",
    "Pet_Armor_Bonus_Percent": "+[{value}*100|1%|] Armor for Your {c_important}Summons{/c}",
    "Pet_All_Resistance_Bonus_Percent": "+[{value}*100|1%|] Resistance to All Elements for Your {c_important}Summons{/c} ",
    "Chill_Bonus_Percent": "[{value}*100|1%|] Chill Application",
    "Skill_Rank_Bonus": "+{value2} to {c_important}{value1}{/c}",
    "Skill_Rank_All_Bonus": "+[{value1}||] to All Skills",
    "Per_Damage_Type_Buff_Duration_Bonus_Percent": "[{value2}*100|1%|] {value1} Damage Over Time Duration",
    "Proc_Resource_On_Hit_Percent_All_Primary": "{c_label}Lucky Hit:{/c} Up to a 15% Chance to Restore +[{value}*100|1%|] Primary Resource",
    "Talent_Rank_Bonus": "+{value2} to {c_important}{value1}{/c}",
    "Strength_Core": "[{value}|~|] Strength",
    "Dexterity_Core": "[{value}|~|] Dexterity",
    "Willpower_Core": "[{value}|~|] Willpower",
    "Intelligence_Core": "[{value}|~|] Intelligence",
    "Percent_Life_On_Kill": "+[{value}*100|1%|] Life On Kill",
    "Overpower_Chance_Bonus": "+[{value}*100|1%|] Overpower Chance",
    "Overpower_Damage_Percent_Bonus": "+[{value}*100|1%|] Overpower Damage",
    "Pet_Damage_Reduction_Percent": "[{value}*100|1%|] Damage Reduction for Your {c_important}Summons{/c}",
    "Power_Duration_Bonus_Pct": "+[{value2}*100|1%|] {c_important}{value1}{/c} Duration",
    "Attack_Speed_Bonus_After_Dodge": "+[{value}*100|1%|] Attack Speed for {value2} |4Second:Seconds; After Dodging an Attack",
    "Damage_Bonus_Percent_After_Dodge": "+[{value}*100|1%|] Damage for {value2} |4Second:Seconds; After Dodging an Attack",
    "Damage_Percent_Bonus_Per_Weapon_Requirement": "+[{value2}*100|1%|] Damage with {value1}",
    "Crit_Percent_Bonus_Per_Weapon_Requirement": "+[{value2}*100|1%|] {value1} Critical Strike Chance",
    "Crit_Damage_Percent_Per_Weapon_Requirement": "+[{value2}*100|1%|] Critical Strike Damage with {value1}",
    "Attack_Speed_Percent_Bonus_While_Fortified": "+[{value}*100|1%|] Attack Speed while Fortified",
    "Non_Physical_Crit_Damage_Percent_Bonus": "+[{value}*100|1%|] Non-Physical Critical Strike Damage",
    "Werebear_Armor_Percent": "+[{value}*100|1%|] Total Armor while in Werebear Form",
    "Werewolf_Armor_Percent": "+[{value}*100|1%|] Total Armor while in Werewolf Form",
    "Imbued_Skill_Damage_Percent_Bonus": "+[{value}*100|1%|] {c_important}Imbued{/c} Damage",
    "Imbued_Skill_Crit_Damage_Percent_Bonus": "+[{value}*100|1%|] {c_important}Imbued{/c} Critical Strike Damage",
    "Imbued_Skill_Damage_Percent_Bonus_To_Vulnerable": "+[{value}*100|1%|] {c_important}Imbued{/c} Vulnerable Damage",
    "Fortified_When_Struck_Chance": "+[{value}*100|1%|] Chance When Struck to Fortify for {value2} Life",
    "NecroArmy_Pet_Type_All_Resist_Bonus_Pct": "+[{value2}*100|1%|] {c_important}{value1}{/c} Resistance to All Elements",
    "NecroArmy_Pet_Type_Damage_Bonus_Pct": "+[{value2}*100|1%|] {c_important}{value1}{/c} Damage",
    "NecroArmy_Pet_Type_Armor_Bonus_Pct": "+[{value2}*100|1%|] {c_important}{value1}{/c} Armor",
    "NecroArmy_Pet_Type_Attack_Speed_Bonus_Pct": "+[{value2}*100|1%|] {c_important}{value1}{/c} Attack Speed",
    "On_Hit_Vulnerable_Proc": "{c_label}Lucky Hit:{/c} Up to a +[{value}*100|1%|] Chance to Make Enemies Vulnerable for {value2} Seconds",
    "Pet_Attack_Speed_Bonus_Percent": "+[{value}*100|1%|] {c_important}Summon{/c} Attack Speed",
    "Pet_Move_Speed_Bonus_Percent": "+[{value}*100|1%|] {c_important}Summon{/c} Movement Speed",
    "NecroArmy_Damage_Bonus_With_Active_Pet_Type": "+[{value2}*100|1%|] Damage while {c_important}{value1}{/c} are Active",
    "NecroArmy_Flat_Armor_Bonus_With_Active_Pet_Type": "+{value2} Armor while {c_important}{value1}{/c} are Active",
    "Blood_Orb_Pickup_Damage_Combined": "+[{value}*100|1%|] Damage for {value2} |4Second:Seconds; After Picking Up a {c_important}Blood Orb{/c}",
    "Blood_Orb_Pickup_Healing_Percent_Bonus": "+[{value}*100|1%|] {c_important}Blood Orb{/c} Healing",
    "Trap_Arm_Time_Reduction_Seconds": "{c_important}Traps{/c} Arm [{value}|1|] |4Second:Seconds; Faster",
    "Damage_Done_Reduction_On_Pet_Crit": "{c_label}Lucky Hit:{/c} Critical Strikes From Your {c_important}Summons{/c} Have Up to a 5% Chance to Reduce Enemy Damage Dealt by [{value}*100|1%|] for {value2} Seconds",
    "Barrier_When_Struck_Chance": "+[{value}*100|1%|] Chance When Struck to Gain {s1} Life as Barrier for {s2} |4Second:Seconds;",
    "Damage_Type_Percent_Bonus_Vs_Elites": "+[{value2}*100|1%|] {value1} Damage to Elites",
    "Cold_Imbued_Skill_Damage_Percent_Bonus": "+[{value}*100|1%|] Cold Imbued Skill Damage",
    "Bonus_Ice_Armor_Shield_Percent": "+[{value}*100|1%|] Barrier from {c_important}Ice Armor{/c}",
    "Power_Damage_Percent_Bonus": "+[{value2}*100|1%|] {c_important}{value1}{/c} Damage",
    "NecroArmy_Armor_Percent_Bonus_With_Active_Pet_Type": "+[{value2}*100|1%|] Total Armor while {c_important}{value1}{/c} are Active",
    "Damage_Reduction": "[{value}*100|1%|] Damage Reduction",
    "Hitpoints_Regen_Bonus_Percent": "[{value}*100|1%|] Healing Over Time",
    "Overpower_Damage_Percent_Bonus_Per_Weapon_Requirement": "+[{value2}*100|1%|] Overpower Damage with {value1}",
    "Armor_Percent": "+[{value}*100|1%|] Total Armor",
    "Damage_Percent_Bonus_Per_Shapeshift_Form": "+[{value2}*100|1%|] Damage while in {value1}",
    "Damage_Percent_Bonus_When_Weapon_Swapping": "+[{value}*100|1%|] Damage when Swapping Weapons",
    "Damage_Percent_Bonus_While_Affected_By_Power": "+[{value2}*100|1%|] Damage while {c_important}{value1}{/c} is Active",
    "Damage_Percent_Bonus_While_Shapeshifted": "+[{value}*100|1%|] Damage while Shapeshifted",
    "Resource_Regen_Bonus_Percent": "[{value2}*100|1%|] {value1} Regeneration per Second",
    "Damage_Percent_Bonus_Against_Dot_Type": "+[{value2}*100|1%|] Damage to {value1} Enemies",
    "Resource_Gain_Bonus_Percent_All_Primary": "[{value}*100|1%|] Resource Generation",
    "Crit_Damage_Percent_For_Power": "+[{value2}*100|1%|] {c_important}{value1}{/c} Critical Strike Damage",
    "Poison_Imbued_Skill_Damage_Percent_Bonus": "+[{value}*100|1%|] {c_important}Poison Imbued{/c} Skill Damage",
    "Shadow_Imbued_Skill_Damage_Percent_Bonus": "+[{value}*100|1%|] {c_important}Shadow Imbued{/c} Skill Damage",
    "Combat_Effect_Chance_Bonus_Per_Damage_Type": "+[{value2}*100|1%|] {value1} Lucky Hit Chance",
    "Strength_Total": "[{value}||] Strength",
    "Dexterity_Total": "[{value}||] Dexterity",
    "Intelligence_Total": "[{value}||] Intelligence",
    "Willpower_Total": "[{value}||] Willpower",
    "Essence_Restriction": "(Necromancer Only)",
    "NecroArmy_Pet_Type_Health_Bonus_Pct": "[{value2}*100|1%|] {c_important}{value1}{/c} Maximum Life",
    "Evade_Max_Charges": "+[{value}||] Maximum Evade |4Charge:Charges;",
    "Evade_Reduce_Cooldown_On_Attack": "Attacks Reduce Evade's Cooldown by [{value}|1|] |4Second:Seconds;",
    "Evade_Movement_Dodge_Chance": "Evade Grants +[{value}*100|%|] Movement Speed for 1 Second",
    "Main_Hand_Damage_Percent_Bonus": "+[{value}*100|%|] Main Hand Weapon Damage",
    "Block_Chance": "[{value}*100|%1|] Block Chance",
    "Block_Damage_Percent": "[{value}*100|%|] Blocked Damage Reduction",
    "Skill_Rank_Skill_Tag_Bonus": "+[{value2}|0|] to {c_important}{value1}{/c} Skills",
    "Crit_Damage_Percent_Per_Skill_Tag": "+[{value2}*100|1%|] {c_important}{value1}{/c} Critical Strike Damage",
    "Crit_Percent_Bonus_Per_Skill_Tag": "+[{value2}*100|1%|] {c_important}{value1}{/c} Critical Strike Chance",
    "Damage_Percent_Bonus_Per_Skill_Tag": "+[{value2}*100|1%|] {c_important}{value1}{/c} Damage",
    "Damage_Percent_Bonus_To_Targets_Affected_By_Skill_Tag": "+[{value2}*100|1%|] Damage to Enemies Affected by {c_important}{value1}{/c} Skills",
    "Damage_Percent_Reduction_From_Targets_With_Skill_Tag": "[{value2}*100|1%|] Damage Reduction from Enemies Affected by {c_important}{value1}{/c} Skills",
    "Overpower_Damage_Percent_Bonus_Per_Skill_Tag": "+[{value2}*100|1%|] {c_important}{value1}{/c} Overpower Damage",
    "Per_Skill_Tag_Buff_Duration_Bonus_Percent": "+[{value2}*100|1%|] {c_important}{value1}{/c} Duration",
    "Skill_Tag_Cooldown_Reduction_Percent": "[{value2}*100|1%|] {c_important}{value1}{/c} Cooldown Reduction",
    "Skill_Tag_Resource_Cost_Reduction_Percent": "[{value2}*100|1%|] {c_important}{value1}{/c} Resource Cost Reduction",
    "Strength_Percent_Bonus": "+[{value2}*100|1%|] Strength",
    "Intelligence_Percent_Bonus": "+[{value2}*100|1%|] Intelligence",
    "Dexterity_Percent_Bonus": "+[{value2}*100|1%|] Dexterity",
    "Willpower_Percent_Bonus": "+[{value2}*100|1%|] Willpower",
    "Core_Stat_Bonus_Healing_Received_Percent": "+[{value}*100|1%|] Healing",
    "Potion_Max_Doses_Bonus": "+{value2} Potion Capacity",
    "Potion_Use_Granted_Barrier_Percent": "While Injured, Your Potion Also Grants [{value2}*100|%|] Maximum Life as Barrier",
    "Potion_Use_Granted_Unstoppable_Seconds": "While Injured, Your Potion Also Grants [{value2}*100|%|] Movement Speed for 2 Seconds",
    "Potion_Use_Granted_Primary_Resource_Amount": "While Injured, Your Potion Also Restores [{value2}|%|] Resource",
    "Potion_Charge_Generation_Bonus_Pct": "+[{value2}*100|1%|] Potion Drop Rate",
    "Damage_Reduction_While_Having_Shield": "[{value}*100|1%|] Damage Reduction while You Have a Barrier",
    "Damage_Reduction_At_High_Health": "[{value}*100|1%|] Damage Reduction while Healthy",
    "Damage_Percent_Bonus_Per_Skill_Tag#Ultimate_Gem": "+[{value}*100|1%|] {c_important}Ultimate{/c} Damage",
    "NecroArmy_Pet_Type_Inherit_Thorns_Bonus_Pct": "{c_important}{value1}{/c} Inherit +[{value2}*100|1%|] of Your Thorns",
    "Combat_Effect_Chance_Bonus_Barrier_Active": "+[{value}*100|1%|] Lucky Hit Chance while You Have a Barrier",
    "Hitpoints_Regen_Per_Second_Bonus": "+[{value}||] Healing Over Time",
    "CC_Duration_Reduction_Per_Type": "[{value2}*100|1%|] {value1} Duration Reduction",
    "Attack_Speed_Percent_Bonus_Per_Skill_Tag": "+[{value2}*100|1%|] {c_important}{value1}{/c} Attack Speed",
    "Power_Cooldown_Reduction_Percent": "[{value2}*100|1%|] {c_important}{value1}{/c} Cooldown Reduction",
    "Damage_Percent_Bonus_Per_Skill_Tag#Basic_Gem": "+[{value}*100|1%|] {c_important}Basic{/c} Damage",
    "Imbued_Skill_Strength_Percent_Bonus": "[{value}*100|1%|] {c_important}Imbuement{/c} Potency",
    "Overpower_Damage_Bonus_Per_Skill": "+[{value2}*100|1%|] {c_important}{value1}{/c} Overpower Damage",
    "Power_Resource_Cost_Reduction_Amount": "[{value2}*100|1|] {c_important}{value1}{/c} Resource Cost Reduction",
    "Resource_Gained_Per_Percent_Damage_Taken": "+{value2} {value1} per Percentage of Maximum Life Lost when Damaged",
    "Resource_Gain_Bonus_Percent_Per_Power": "[{value2}*100|1%|] {c_important}{value1}{/c} Resource Generation",
    "Resource_Gain_Bonus_Percent_Per_Skill_Tag": "[{value2}*100|1%|] {c_important}{value1}{/c} Resource Generation",
    "Resource_Regen_All_Primary_Bonus_Percent": "[{value2}*100|1%|] Resource Regeneration per Second",
    "Dodge_Chance_Bonus_Melee": "[{value}*100|1%|] Dodge Chance Against Close Enemies",
    "Dodge_Chance_Bonus_Ranged": "[{value}*100|1%|] Dodge Chance Against Distant Enemies",
    "Dodge_Chance_Bonus_Additive": "+[{value}*100|1%|] Dodge Chance",
    "Resource_Gain_And_Regen_Bonus_Percent_All_Primary": "[{value}*100|1%|] Resource Generation",
    "Resistance_Max_Bonus": "+[{value2}*100|1%|] Maximum {value1} Resistance",
    "NecroArmy_All_Pet_Types_Inherit_Thorns_Bonus_Pct": "{c_important}Minions{/c} Inherit +[{value}*100|1%|] of Your Thorns ",
    "Resource_All_Primary_Max_Bonus": "+[{value2}||] Maximum Resource",
    "On_Hit_Damage_Bonus_Combined": "{c_label}Lucky Hit:{/c} Up to a [{value1}*100|%|] Chance to Gain +[{value2}*100|1%|] Damage for [{value3}||] Seconds",
    "Evade_Movement_Speed_Combined": "Evade Grants +[{value1}*100|%|] Movement Speed for [{value2}|1|] |4Second:Seconds;",
    "Multiplicative_Damage_Percent_All_From_Skills": "[{value}*100|1%x|] Damage",
    "AoE_Size_Bonus_Per_Power": "+[{value2}*100|1%|] {c_important}{value1}{/c} Size",
    "Power_Crit_Percent_Bonus": "+[{value2}*100|1%|] {c_important}{value1}{/c} Critical Strike Chance",
    "Hit_Effect_Chance_Bonus_Per_Skill_Tag": "+[{value2}*100|1%|] {c_important}{value1}{/c} Lucky Hit Chance",
    "Percent_Bonus_Projectiles_Per_Power": "+[{value2}*100|1%|] Chance for {c_important}{value1}{/c} Projectiles to Cast Twice",
    "Percent_Bonus_Projectiles_Per_Skill_Tag": "+[{value2}*100|1%|] Chance for {c_important}{value1}{/c} Projectiles to Cast Twice",
    "Percent_Bonus_Projectiles_All": "+[{value}*100|1%|] Chance for Projectiles to Cast Twice",
    "Percent_Bonus_Projectiles_Per_Power#Rogue_DarkShroud": "+[{value2}*100|1%|] Movement Speed per {c_important}Dark Shroud{/c} Shadow",
    "Power Bonus Attack Radius": "+[{value2}*100|1|] {c_important}{value1}{/c} Range",
    "On_Hit_Berserk_Proc_Chance": "{c_label}Lucky Hit:{/c} Up to a +[{value}*100|1%|] Chance to Become {c_important}Berserking{/c}",
    "On_Hit_Flat_Elemental_Damage": "{c_label}Lucky Hit:{/c} Up to a 5% Chance to deal [{value2}||] {value1} Damage",
    "Resistance#Cold_Gem": "+[{value}||] Cold Resistance",
    "Resistance#Shadow_Gem": "+[{value}||] Shadow Resistance",
    "Resistance#Fire_Gem": "+[{value}||] Fire Resistance",
    "Resistance#Lightning_Gem": "+[{value}||] Lightning Resistance",
    "Resistance#Poison_Gem": "+[{value}||] Poison Resistance",
    "Percent_Bonus_Projectiles_Per_Power#Barbarian_LungingStrike": "+[{value2}*100|1%|] {c_important}Lunging Strike{/c} Healing",
    "Percent_Bonus_Projectiles_Per_Power#Rogue_Flurry": "+[{value2}*100|1%|] {c_important}Flurry{/c} Healing",
    "Percent_Bonus_Projectiles_Per_Power#Necromancer_BloodMist": "+[{value2}*100|1%|] Movement Speed during {c_important}Blood Mist{/c}",
    "Percent_Bonus_Projectiles_Per_Power#Necromancer_BloodOrb_Pickup": "{c_important}Blood Orbs{/c} Restore +[{value2}|0|] Essence",
    "AoE_Size_Bonus_Per_Power#Necromancer_Golem": "+[{value2}*100|1%|] {c_important}{value1}{/c} Active Size",
    "Resistance_All_Max_Bonus": "+[{value}*100|1%|] Maximum Resistance to All Elements",
    "Percent_Bonus_Projectiles_Per_Power#Necromancer_SkeletonMage": "+[{value2}*100|1%|] Chance for {c_important}Skeletal Mage{/c} Attacks to Cast Twice",
    "Percent_Bonus_Projectiles_Per_Power#Rogue_RainofArrows": "+[{value2}*100|1%|] Chance for {c_important}Rain of Arrows{/c} Waves to Cast Twice",
    "Percent_Bonus_Projectiles_Per_Power#Barbarian_DustDevils": "+[{value2}*100|1%|] Chance for {c_important}Dust Devils{/c} to Cast Twice",
    "Power_Cooldown_Reduction_Percent#Necromancer_Golem": "[{value2}*100|1%|] {c_important}Golem{/c} Active Cooldown Reduction",
    "Resource_Regen_Per_Second": "[{value2}|~|] {value1} Regeneration",
    "Bonus_Percent_Per_Power#Barbarian_Upheaval": "{c_important}Upheaval{/c} Overpowers Stun for +[{value2}|1|] |4Second:Seconds;",
    "Bonus_Percent_Per_Power#Barbarian_SteelGrasp": "{c_important}Steel Grasp{/c} Stuns for +[{value2}|1|] |4Second:Seconds;",
    "Damage_Bonus_Percent_Per_Combo_Point": "+[{value}*100|1%|] Damage per {c_important}Combo Point{/c} Spent",
    "Cleave_Damage_Bonus_Percent_Per_Power#Barbarian_Bash": "{c_important}Bash{/c} Cleaves for +[{value2}*100|1%|] Damage",
    "Movement_Speed_Bonus_Percent_Per_Power#Rogue_BladeShift": "+[{value2}*100|1%|] Movement Speed from {c_important}Blade Shift{/c}",
    "Bonus_Percent_Per_Power#Rogue_TwistingBlades": "{c_important}Twisting Blades{/c} Returns +[{value2}*100|1%|] Faster",
    "Bonus_Percent_Per_Power#Rogue_InvigoratingStrike": "+[{value2}*100|1%|] {c_important}Invigorating Strike{/c} Energy Regeneration",
    "Bonus_Count_Per_Power#Rogue_PoisonImbue": "{c_important}Poison Imbue{/c} Lasts For +[{value2}|0|] |4Cast:Casts;",
    "Bonus_Count_Per_Power#Rogue_ShadowImbue": "{c_important}Shadow Imbue{/c} Lasts For +[{value2}|0|] |4Cast:Casts;",
    "Bonus_Count_Per_Power#Rogue_ColdImbue": "{c_important}Cold Imbue{/c} Lasts For +[{value2}|0|] |4Cast:Casts;",
    "Bonus_Percent_Per_Power#Barbarian_Kick": "+[{value2}*100|1%|] {c_important}Kick{/c} Vulnerable Duration",
    "Proc_Flat_Element_Damage_On_Hit": "{c_label}Lucky Hit:{/c} Up to a 40% Chance to Deal +[{value2}|0|] {value1} Damage",
    "Blood_Orb_Pickup_Primary_Resource_Gain": "{c_important}Blood Orbs{/c} Restore +{value2} Essence",
    "Thorns_Percent_Bonus_While_Channeling": "+[{value}*100|1%|] Thorns while Channeling",
    "Thorns_Percent_Bonus_While_Fortified": "+[{value}*100|1%|] Thorns while Fortified",
    "Primary_Resource_On_Cast_Per_Power": "Casting {c_important}{value1}{/c} Restores +[{value2}|0|] Primary Resource",
    "Primary_Resource_On_Cast_Per_Skill_Tag": "Casting {c_important}{value1}{/c} Skills Restores +[{value2}|0|] Primary Resource",
    "Blood_Orb_Bonus_Chance_Per_Power": "+[{value2}*100|1%|] Chance for {c_important}{value1}{/c} to Form {c_important}Blood Orbs{/c}",
    "Bonus_Count_Per_Power": "+[{value2}|0|] {c_important}{value1}{/c} Count",
    "Bonus_Percent_Per_Power": "+[{value2}*100|1%|] {c_important}{value1}{/c} Effect",
    "Power Bonus Attack Radius Percent": "+[{value2}*100|1%|] {c_important}{value1}{/c} Range",
    "Pet_Damage_Bonus_Percent_Per_Pet_Type": "+[{value2}*100|1%|] {c_important}{value1}{/c}",
    "Pet_Max_Count_Bonus_Per_Pet_Type": "+{value2} Maximum {c_important}{value1}{/c}",
    "Movement_Speed_Bonus_Percent_Per_Power": "+[{value2}*100|1%|] Movement Speed from {c_important}{value1}{/c}",
    "Cleave_Damage_Bonus_Percent_Per_Power": "{c_important}{value1}{/c} Cleaves for +[{value2}*100|1%|] Damage",
    "Thorns_Percent": "+[{value}*100|1%|] Thorns",
    "Bonus_Percent_Per_Power#Necromancer_Blight": "+[{value2}*100|1%|] {c_important}Blight{/c} Chill Potency",
    "Chill_Progressive_Bonus_Slow_Percent": "+[{value}*100|1%|] Chill Slow Potency",
    "Damage_Percent_Bonus_While_Affected_By_Power#Barbarian_Proc_Berserk": "+[{value2}*100|1%|] Damage while {c_important}{value1}{/c}",
    "AoE_Size_Bonus_Per_Power#Necromancer_Hemorrhage": "+[{value2}*100|1%|] {c_important}{value1}{/c} Explosion Size",
    "AoE_Size_Bonus_Per_Power#Necromancer_Decompose": "+[{value2}*100|1%|] {c_important}{value1}{/c} Explosion Size",
    "AoE_Size_Bonus_Per_Power#Necromancer_BloodSurge": "+[{value2}*100|1%|] {c_important}{value1}{/c} Nova Size",
    "AoE_Size_Bonus_Per_Power#Necromancer_BoneSpirit": "+[{value2}*100|1%|] {c_important}{value1}{/c} Explosion Size",
    "Damage_Percent_Bonus_To_Targets_Affected_By_Skill_Tag#Skill_Primary_Curse": "+[{value2}*100|1%|] Damage to {c_important}Cursed{/c} Enemies",
    "Damage_Percent_Bonus_To_Targets_Affected_By_Skill_Tag#Skill_Trap": "+[{value2}*100|1%|] Damage to {c_important}Trapped{/c} Enemies",
    "AoE_Size_Bonus_Per_Power#Sorcerer_Teleport": "+[{value2}*100|1%|] {c_important}{value1}{/c} Nova Size",
    "AoE_Size_Bonus_Per_Power#Barbarian_Leap": "+[{value2}*100|1%|] {c_important}{value1}{/c} Slam Size",
    "Primary_Resource_Gain_Bonus_Percent_Per_Weapon_Requirement": "+[{value2}*100|1%|] Resource Generation with {value1}",
    "Primary_Resource_Gain_Bonus_Percent_Per_Weapon_Requirement#Scythe": "+[{value2}*100|1%|] Resource Generation while Wielding a Scythe",
    "Primary_Resource_Gain_Bonus_Percent_Per_Weapon_Requirement#Shield": "+[{value2}*100|1%|] Resource Generation while Wielding a Shield",
    "AoE_Size_Bonus_Per_Power#Druid_Ravens": "+[{value2}*100|1%|] {c_important}{value1}{/c} Active Size",
    "AoE_Size_Bonus_Per_Power#Druid_CycloneArmor": "+[{value2}*100|1%|] {c_important}{value1}{/c} Active Size",
    "Sorc_ArcLash_Bonus_Swipes": "+[{value}*100|1%|] Chance for {c_important}Arc Lash{/c} to Swipe Twice",
    "Rogue_DarkShroud_MaximumLife": "+[{value}*100|1%|] Maximum Life while {c_important}Dark Shroud{/c} is Active",
    "Rogue_HealthPotion_MaxResist": "Your Potion Also Grants +[{value}*100|1%|] Maximum Resistances for 5 Seconds",
    "Sorc_Conjurations_BonusSummons_Chance": "+[{value2}*100|1%|] Chance for a Second {c_important}{value1}{/c} When Cast",
    "Sorc_Hydra_Bonus_Heads": "Casted {c_important}Hydras{/c} Have +{value2} |4Head:Heads;",
    "AoE_Size_Bonus_Per_Skill_Tag": "+[{value2}*100|1%|] {c_important}{value1}{/c} Size",
    "Minions_Fortify_On_Attack_Chance": "+[{value}*100|1%|] Chance For {c_important}Minion{/c} Attacks to Fortify You for 3% Maximum Life",
    "Rogue_DarkShroud_DamagePer": "+[{value}*100|1%|] Damage per {c_important}Dark Shroud{/c} Shadow",
    "Rogue_Special_DamageAfterStealth": "+[{value}*100|1%|] Damage on Next Attack After Entering Stealth",
    "Evade_Grants_AttackSpeed": "Evade Grants +[{value}*100|%|] Attack Speed for 3 Seconds",
    "Barb_WalkingArsenal_MovementSpeedPer": "+[{value}*100|%|] Movement Speed per {c_important}Walking Arsenal{/c} Bonus",
    "Barb_Berserking_MovementSpeed": "+[{value}*100|%|] Movement Speed while {c_important}Berserking{/c}",
    "Barb_Berserking_AttackSpeed": "+[{value}*100|1%|] Attack Speed while {c_important}Berserking{/c}",
    "Rogue_Precision_AttackSpeedPer": "+[{value}*100|1%|] {c_important}Marksman{/c} Attack Speed per {c_important}Precison{/c} Stack",
    "Rogue_InnerSight_MovementSpeed": "+[{value}*100|1%|] Movement Speed while the {c_important}Inner Sight{/c} Gauge is Full",
    "Rogue_RapidFire_EnhancedCritBonus": "+[{value}*100|1%|] Critical Strike Chance to each {c_important}Enhanced Rapid Fire{/c} Bonus",
    "Rogue_StunGrenade_ResourceOnExplode": "+[{value2}||] Energy when a {c_important}Stun Grenade{/c} Explodes",
    "Sorc_Fireball_ProjectileSpeed": "+[{value2}*100|1%|] {c_important}Fireball{/c} Projectile Speed ",
    "Sorc_Fireball_ResourceOnHit": "+[{value2}||] Mana when a {c_important}Fireball{/c} Explodes",
    "Sorc_CracklingEnergy_MovementSpeed": "+[{value}*100|1%|] Movement Speed for 4 Seconds After Picking Up {c_important}Crackling Energy{/c}",
    "Sorc_CracklingEnergy_DamageReductionPer": "[{value}*100|1%|] Damage Reduction per {c_important}Crackling Energy{/c} Charge",
    "Sorc_FrozenOrb_ConjurationCDR": "{c_important}Conjuration{/c} Cooldowns are Reduced by +[{value}|1|] Seconds when a {c_important}Frozen Orb{/c} Explodes",
    "Sorc_IceSpike_FreezeDuration": "{c_important}Ice Spikes{/c} Freeze Enemies for [{value}|1|] |4Second:Seconds;",
    "Druid_StormStrike_HitAdditionalTargets": "{c_important}Storm Strike{/c} Chains to +[{value}||] |4Target:Targets;",
    "Druid_LupineFerocity_Damage": "+[{value}*100|1%|] to {c_important}Lupine Ferocity's{/c} Damage Bonus",
    "Druid_UrsineStrength_BonusAll": "+[{value}*100|1%|] to {c_important}Ursine Strength's{/c} Bonuses",
    "Druid_SpiritBoon_Packleader_LuckyHitChance": "+[{value}*100|1%|] to the {c_important}Pack Leader{/c} Spirit Boon's Lucky Hit Chance",
    "Druid_Cataclysm_MovementSpeed": "+[{value}*100|%|] Movement Speed while {c_important}Cataclysm{/c} is Active",
    "Druid_Hurricane_MovementSpeed": "+[{value}*100|%|] Movement Speed while {c_important}Hurricane{/c} is Active",
    "Necro_BoneStorm_Armor": "+[{value}*100|1%|] Total Armor while {c_important}Bone Storm{/c} is Active",
    "Necro_BoneStorm_DamageReduction": "+[{value}*100|1%|] to {c_important}Prime Bone Storm's{/c} Damage Reduction",
    "Necro_ColdMage_AttackSpeed": "+[{value}*100|1%|] {c_important}Cold Mage{/c} Attack Speed",
    "Resource_On_Hit": "[{value2}|~|] {value1} On Hit",
    "Necro_Evade_LeavesDesecratedGround": "Evade Leaves Behind {c_important}Desecrated Ground{/c} for 2 Seconds",
    "Necro_CorpseExplosion_Fear": "{c_important}Corpse Explosion{/c} Fears and Slows for [{value}|1|] |4Second:Seconds;",
    "Necro_BloodSurge_ExtraDrainsvsBoss": "{c_important}Blood Surge{/c} Drains +[{value}||] |4Time:Times; from Elites",
    "Necro_PassiveRanks_AllMinionMastery": "+[{value}||] to {c_important}Skeletal Warrior Mastery{/c}, {c_important}Skeletal Mage Mastery{/c}, and {c_important}Golem Mastery{/c}",
    "Generic_SkillRanks_AllFireIsh": "+[{value}||] to {c_important}Upheaval{/c}, {c_important}Cutthroat{/c}, {c_important}Pyromancy{/c}, {c_important}Earth{/c}, or {c_important}Blood{/c}",
    "Generic_SkillRanks_AllColdIsh": "+[{value}||] to {c_important}Steel Grasp{/c}, {c_important}Cold Imbuement{/c}, {c_important}Frost{/c}, {c_important}Hurricane{/c}, or {c_important}Skeletal Mage Mastery{/c}",
    "Generic_Damage_FireOrCold": "+[{value}*100|1%|] Fire and Cold Damage",
    "Generic_Evade_Unhindered": "Evade Grants Unhindered for [{value}|1|] |4Second:Seconds;",
    "Generic_LuckyHit_CC_Any": "{c_label}Lucky Hit:{/c} Up to a +[{value}*100|1%|] Chance to Apply a Random Crowd Control Effect for 2 Seconds",
    "Generic_Potion_GrantsMovementSpeed_AnyHP": "Drinking a Potion Grants [{value}*100|%|] Movement Speed for 2 Seconds",
    "UBERUNIQUE_Ahavarion_ResourceOnHit_AllClasses_Combined": "[{value}|~|] Resource On Hit",
    "UBERUNIQUE_Ahavarion_CritDamage_VulnDamage_OverpowerDamage_Combined": "+[{value}*100|1%|] Critical Strike and Vulnerable Damage",
    "All_Stats_Percent_Bonus": "+[{value}*100|1%|] All Stats",
    "Ultimate_Cooldown_Reduction#Ultimate_Gem": "+[{value}*100|1%|] {c_important}Ultimate{/c} Cooldown Reduction",
    "Spiritborn_Spirit_Bonus": "+[{value2}*100|1%|] {c_important}{value1}{/c} Spirit Potency",
    "Bonus_Percent_Per_Power_2": "+[{value2}*100|1%|] {c_important}{value1}{/c} Effect",
    "Bonus_Percent_Per_Power_3": "+[{value2}*100|1%|] {c_important}{value1}{/c} Effect",
    "MaxStacks": "+[{value2}||] {c_important}{value1}{/c} Maximum Stacks",
    "MaxStacks#Spiritborn_Gorilla_Passive": "+[{value2}||] Maximum {c_important}Resolve{/c} Stacks",
    "MaxStacks#Spiritborn_Plains_Passive": "+[{value2}||] Maximum {c_important}Ferocity{/c} Stacks",
    "Spiritborn_Spirit_Bonus#spiritborn_centipede_sun_passive": "+[{value2}*100|1%|] Primary Centipede Spirit Hall Damage",
    "Spiritborn_Spirit_Bonus#spiritborn_eagle_moon_passive_alternate": "+[{value2}*100|1%|] Secondary Eagle Spirit Hall Potency",
    "Spiritborn_Spirit_Bonus#spiritborn_gorilla_moon_passive": "+[{value2}*100|1%|] Secondary Gorilla Spirit Hall Potency",
    "Spiritborn_Spirit_Bonus#spiritborn_jaguar_moon_passive": "+[{value2}*100|1%|] Secondary Jaguar Spirit Hall Potency",
    "Spiritborn_Spirit_Bonus#spiritborn_centipede_moon_passive": "+[{value2}*100|1%|] Secondary Centipede Spirit Hall Potency",
    "Spiritborn_Spirit_Bonus#spiritborn_eagle_sun_passive_alternate": "+[{value2}*100|1%|] Primary Eagle Spirit Hall Damage",
    "Spiritborn_Spirit_Bonus#spiritborn_gorilla_sun_passive": "+[{value2}*100|1%|] Primary Gorilla Spirit Hall Damage",
    "Spiritborn_Spirit_Bonus#spiritborn_jaguar_sun_passive": "+[{value2}*100|1%|] Primary Jaguar Spirit Hall Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Gorilla_Defensive1": "+[{value2}*100|1%|] {c_important}Armored Hide{/c} Active Duration",
    "Bonus_Percent_Per_Power_2#Spiritborn_Gorilla_Defensive1": "+[{value2}*100|1%|] {c_important}Armored Hide{/c} Resolve Generation Rate",
    "Bonus_Percent_Per_Power_3#Spiritborn_Gorilla_Defensive1": "+[{value2}*100|1%|] {c_important}Armored Hide{/c} Active Thorns Bonus",
    "Bonus_Percent_Per_Power_2#Spiritborn_Gorilla_Defensive2": "+[{value2}*100|1%|] {c_important}Concussive Stomp{/c} Barrier Generation",
    "Bonus_Percent_Per_Power_2#Spiritborn_Gorilla_Core": "+[{value2}*100|1%|] {c_important}Crushing Hand{/c} Barrier Generation",
    "Bonus_Percent_Per_Power#Spiritborn_Gorilla_Core": "+[{value2}*100|1%|] Chance for {c_important}Crushing Hand{/c} to Extra Hit",
    "Bonus_Percent_Per_Power_2#Spiritborn_Gorilla_Ultimate": "+[{value2}*100|1%|] {c_important}The Protector{/c} Barrier Generation",
    "Bonus_Percent_Per_Power#Spiritborn_Jaguar_Core": "+[{value2}*100|1%|] Chance for {c_important}Rake{/c} to Extra Hit",
    "Bonus_Percent_Per_Power#Spiritborn_Jaguar_Focus": "+[{value2}*100|1%|] {c_important}Ravager{/c} On Kill Duration Extension",
    "Bonus_Percent_Per_Power#Spiritborn_Gorilla_Passive": "+[{value2}||] {c_important}Resolve{/c} Generated",
    "Bonus_Percent_Per_Power_2#Spiritborn_Gorilla_Basic": "+[{value2}*100|1%|] {c_important}Rock Splitter{/c} Block Chance Bonus",
    "Bonus_Percent_Per_Power#Spiritborn_Centipede_Core": "+[{value2}*100|1%|] Chance for {c_important}Stinger{/c} to Extra Hit",
    "Bonus_Percent_Per_Power_3#Spiritborn_Centipede_Potency": "+[{value2}*100|1%|] {c_important}Touch of Death{/c} Swarm Duration",
    "Bonus_Percent_Per_Power_2#Spiritborn_Centipede_Potency": "+[{value2}*100|1%|] {c_important}Touch of Death{/c} Healing Bonus",
    "Bonus_Percent_Per_Power#Spiritborn_RuneArea": "+[{value2}*100|1%|] {c_important}Mystic Circle{/c} Potency",
    "Bonus_Percent_Per_Power#Spiritborn_Feather_Spawn": "+[{value2}*100|1%|] {c_important}Storm Feather{/c} Potency",
    "Bonus_Percent_Per_Power#Spiritborn_Plains_Passive": "+[{value2}*100|1%|] {c_important}Ferocity{/c} Potency",
    "Bonus_Percent_Per_Power_2#Spiritborn_Jaguar_Focus": "+[{value2}*100|1%|] Chance for {c_important}Ravager{/c} to Deal Double Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Centipede_Defensive": "+[{value2}*100|1%|] {c_important}Scourge{/c} Poisoning Duration",
    "Bonus_Percent_Per_Power#Spiritborn_Swarm": "+[{value2}*100|1%|] {c_important}Pestilent Swarm{/c} Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Centipede_Potency": "+[{value2}*100|1%|] Chance for {c_important}Touch of Death{/c} Swarms To Reinfect On Hit",
    "Bonus_Max_Skill_Charges_For_Power": "+[{value2}||] {c_important}{value1}{/c} Charges",
    "AoE_Size_Bonus_Per_Power#Spiritborn_Eagle_Core": "+[{value2}||] {c_important}{value1}{/c} Extra Projectiles",
    "Damage_Reduction_While_Moving": "[{value}*100|1%|] Damage Reduction while Moving",
    "Damage_Increase_While_Having_Shield": "+[{value}*100|1%|] Damage while You Have a Barrier",
    "Chance_For_Double_Damage_Per_Power": "+[{value2}*100|1%|] Chance for {c_important}{value1}{/c} to Deal Double Damage",
    "Chance_To_Hit_Twice_Per_Power": "+[{value2}*100|1%|] Chance for {c_important}{value1}{/c} to Hit Twice",
    "Chance_To_Hit_Twice_Per_Power#Necromancer_SkeletonWarrior": "+[{value2}*100|1%|] Chance for {c_important}Skeleton Warriors{/c} to Hit Twice",
    "Chance_To_Consume_No_Charges_Per_Power": "+[{value2}*100|1%|] Chance for {c_important}{value1}{/c} to Consume No Charges",
    "Bonus_Percent_Per_Power#Spiritborn_Gorilla_Basic": "+[{value2}*100|1%|] Chance for {c_important}Rock Splitter{/c} to Deal Double Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Gorilla_Ultimate": "+[{value2}*100|1%|] Chance for {c_important}The Protector{/c} to Deal Double Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Jaguar_Basic": "+[{value2}*100|1%|] Chance for {c_important}Thrash{/c} to Deal Double Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Jaguar_Ultimate": "+[{value2}*100|1%|] Chance for {c_important}The Hunter{/c} to Deal Double Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Centipede_Basic": "+[{value2}*100|1%|] Chance for {c_important}Withering Fist{/c} to Deal Double Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Centipede_Ultimate": "+[{value2}*100|1%|] Chance for {c_important}The Devourer{/c} to Deal Double Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Eagle_Basic": "+[{value2}*100|1%|] Chance for {c_important}Thunderspike{/c} to Deal Double Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Eagle_Ultimate": "+[{value2}*100|1%|] Chance for {c_important}The Seeker{/c} to Deal Double Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Eagle_Focus": "+[{value2}*100|1%|] Chance for {c_important}Vortex{/c} to Extra Hit",
    "Bonus_Percent_Per_Power#Spiritborn_Eagle_Focus2": "+[{value2}*100|1%|] Chance for {c_important}Soar{/c} to Deal Double Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Jaguar_Potency": "+[{value2}*100|1%|] Chance for {c_important}Rushing Claw{/c} to Deal Double Damage",
    "Bonus_Percent_Per_Power#Spiritborn_Gorilla_Defensive2": "+[{value2}*100|1%|] Chance for {c_important}Concussive Stomp{/c} to Extra Hit",
    "Bonus_Percent_Per_Power#Spiritborn_Gorilla_Potency": "+[{value2}*100|1%|] Chance for {c_important}Payback{/c} to Deal Double Damage",
    "UBERUNIQUE_Sleepsong_All_Talents": "+[{value}||] to All Passives",
    "Necro_HewedFlesh_GrantsBarrier": "{c_important}Hewed Flesh{/c} Grants [{value}*100|1%|] Maximum Life as Barrier for 4 Seconds",
    "Percent_Bonus_Projectiles_Per_Power#Barbarian_Earthquake": "+[{value2}*100|1%|] Chance for {c_important}Earthquakes{/c} to Cast Twice",
    "Spiritborn_Soar_Barrier": "{c_important}Soar{/c} Grants [{value}*100|1%|] Maximum Life as Barrier for 1.5 Seconds",
    "Spiritborn_Soar_DamagePerDistance": "{c_important}Soar{/c} Deals Up to +[{value}*100|1%|] Damage Based on Distance Traveled",
    "AoE_Size_Bonus_Per_Power#X1_Sorcerer_Familiar": "+[{value2}*100|1%|] {c_important}{value1}{/c} Explosion Size",
    "AoE_Size_Bonus_Per_Power#X1_Barbarian_WeaponThrow": "+[{value2}*100|1%|] {c_important}{value1}{/c} Pulse Size",
    "Generic_Damage_Vs_AngelsAndDemons": "+[{value}*100|1%|] Damage to Angels and Demons",
    "Chance_To_Hit_Twice_Per_Power#Sorcerer_Familiar_Attack": "+[{value2}*100|1%|] Chance for {c_important}Familiars{/c} to Hit Twice",
    "Percent_Bonus_Projectiles_Per_Power#Druid_StoneBurst": "+[{value2}*100|1%|] Chance for {c_important}Stone Burst{/c} to Cast Twice",
    "Percent_Life_On_Hit": "+[{value}*100|1%|] Life On Hit",
    "Multiplicative_Damage_Type_Percent_Bonus": "[{value2}*100|1%x|] {value1} Damage",
    "Multiplicative_Crit_Damage_Percent_Per_Skill_Tag": "[{value2}*100|1%x|] {c_important}{value1}{/c} Critical Strike Damage",
    "Multiplicative_Damage_Percent_Bonus_Per_Skill_Tag": "[{value2}*100|1%x|] {c_important}{value1}{/c} Damage",
    "Multiplicative_Overpower_Damage_Percent_Bonus": "[{value}*100|1x%|] Overpower Damage",
    "Multiplicative_Vulnerable_Health_Damage_Bonus": "[{value}*100|1x%|] Vulnerable Damage",
    "Multiplicative_Damage_Percent_Bonus_Per_Shapeshift_Form": "[{value2}*100|1x%|] Damage while in {value1}",
    "Multiplicative_Damage_Bonus_At_High_Health": "[{value}*100|1x%|] Damage while Healthy",
    "Multiplicative_Crit_Damage_Percent": "[{value}*100|1x%|] Critical Strike Damage",
    "Multiplicative_Damage_Bonus_To_Low_Health": "[{value}*100|1x%|] Damage to Injured Enemies",
    "Multiplicative_Damage_Percent_Bonus_Vs_CC_All": "[{value}*100|1x%|] Damage to Crowd Controlled Enemies",
    "Multiplicative_Damage_Percent_Bonus_Vs_Elites": "[{value}*100|1x%|] Damage to Elites",
    "Multiplicative_Damage_Bonus_To_High_Health": "[{value}*100|1x%|] Damage to Healthy Enemies",
    "Multiplicative_Damage_Bonus_To_Near": "[{value}*100|1x%|] Damage to Close Enemies",
    "Multiplicative_Damage_Percent_Bonus_Vs_CC_Target": "[{value2}*100|1x%|] Damage to {value1} Enemies",
    "Spiritborn_Resolve_DamageForDuration": "+[{value}*100|1%|] Damage for 4 |4Second:Seconds; After Gaining {c_important}Resolve{/c}",
    "Spiritborn_CoreStats_All_PerFerocityAndResolve": "[{value}|~|] All Stats per {c_important}Ferocity{/c} or {c_important}Resolve{/c} Stack",
    "Generic_Chance_For_Hit_Twice_Per_SkillTag": "+[{value2}*100|1%|] Chance for {c_important}{value1}{/c} Skills to Hit Twice",
    "Generic_Chance_For_Double_Damage_Per_SkillTag": "+[{value2}*100|1%|] Chance for {c_important}{value1}{/c} Skills to Deal Double Damage",
    "Generic_MovementSpeed_AfterKillAny": "+[{value}*100|%|] Movement Speed for 2 |4Second:Seconds; After Killing an Enemy",
    "Generic_AttacksReduceUltimateCDR": "Attacks Reduce {c_important}Ultimate{/c} Cooldown by [{value}|1|] |4Second:Seconds;",
    "Multiplicative_Nonphysical_Damage_Percent_Bonus": "[{value}*100|1x%|] Non-Physical Damage",
    "Multiplicative_Damage_Percent_Bonus_While_Shapeshifted": "[{value}*100|1x%|] Damage while Shapeshifted",
    "UBERUNIQUE_DoT_Duration": "+[{value}*100|%|] Damage Over Time Duration",
    "Chance_To_Hit_Twice_Per_Power#Druid_Shred_NEW": "+[{value2}*100|1%|] Chance for {c_important}Shred{/c} to Deal Double Damage",
    "Necro_BloodWave_Fortify": "Casting {c_important}Blood Wave{/c} {c_important}Fortifies{/c} You For +[{value}*100|1%|] Maximum Life",
    "Necro_BoneSpear_WaveCDR": "Casting {c_important}Bone Spear{/c} Reduces {c_important}Blood Wave's{/c} Cooldown by [{value}||] Seconds. ",
    "Sorc_BallLightning_Damage_Reduction_Per": "+[{value}*100|1%|] Damage Reduction for Each Active {c_important}Ball Lightning{/c}.",
    "Generic_AttackSpeed_After_Using_Defensive": "+[{value}*100|%|] Attack Speed for 5 seconds after Casting a Defensive Skill",
    "Sorc_BallLightning_Movement_Speed": "+[{value}*100|%|] {c_important}Ball Lightning{/c} Projectile Speed",
    "Sorc_BallLightning_Cast_While_Moving": "{c_important}Ball Lightning{/c} Can be Cast while Moving.",
    "Sorc_BallLightning_TemperSwap_SuperBallLightning": "Chance for {c_important}Ball Lightning{/c} Projectiles to Cast Twice is converted to Chance to Cast a {c_important}Super Ball Lightning{/c}.",
    "Hammer_Of_The_Ancients_Earthquake": "+[{value}*100|x%|] {c_important}Hammer of the Ancients{/c} Damage for {c_number}5{/c} Seconds After an {c_important}Earthquake{/c} Explodes",
    "Rogue_Traps_Are_Core": "Your {c_important}Trap{/c} Skills are also considered {c_important}Core{/c} Skills",
    "Socketable_Potency_Eldritch": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}Your Common{/c} {c_important}Eldritch{/c} {c_legendary}Witch Powers are{/c} {c_number}25%{c_lightgray}\\[+\\]{/c}{/c} {c_legendary}more potent{/c}{c_legendary}.{/c}",
    "Socketable_Potency_Psyche": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}Your Common{/c} {c_important}Psyche{/c} {c_legendary}Witch Powers are{/c} {c_number}25%{c_lightgray}\\[+\\]{/c}{/c} {c_legendary}more potent{/c}{c_legendary}.{/c}",
    "Socketable_Potency_Growth": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}Your Common{/c} {c_important}Growth & Decay{/c} {c_legendary}Witch Powers are{/c} {c_number}35%{c_lightgray}\\[+\\]{/c}{/c} {c_legendary}more potent{/c}{c_legendary}.{/c}",
    "Socketable_Potency_Unique": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}Your{/c} {c_unique}Unique{/c} {c_important}Witch Powers{/c} {c_legendary}deal{/c} {c_number}40%{c_lightgray}\\[x\\]{/c}{/c} {c_legendary}increased damage.{/c}",
    "Rogue_ShadowClone_Execute": "{c_important}Shadow Clones{/c} Execute Injured Non-Elite Enemies.",
    "Mobility_Grants_MovementSpeed": "{c_important}Mobility{/c} Skills Grant +[{value1}*100|%|] Movement Speed for 2 seconds.",
    "Rogue_SkillRanks_Marksman_Cutthroat": "+[{value}||] to Marksman and Cutthroat Skills",
    "Socketable_TyrantBane": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}After you deal Damage Over Time to an enemy, they take {/c}{c_number}0.33%{c_lightgray}\\[x\\]{/c}{/c}{c_unique} more Damage Over Time from you {c_important}forever{/c}{c_unique}.",
    "Socketable_KillingWind": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}While you have three or more{/c}\u00a0{c_important}Eldritch{/c} {c_legendary}Witch Powers\u00a0equipped:\r\n{icon:bullet} You gain{/c} {c_number}[{value}*100*3|0%+|]{/c}\u00a0{c_legendary}Critical Strike Chance and {/c}{c_number}[{value}*100*5|0%+|]{/c} {c_legendary}Movement Speed.{/c}",
    "Socketable_MoonlightWard": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}For each Rank in your equipped{/c}\u00a0{c_unique}Unique{/c} {c_legendary}Witch Power{/c}{c_legendary}, you gain{/c} {c_number}[{value}*3|0%|]{/c}\u00a0{c_legendary}Damage Reduction and{/c} {c_number}[{value}*0.5|1%+|]{/c}\u00a0{c_legendary}Maximum Resistance to All Elements.{/c}",
    "Socketable_HungeringVoid": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}While you have an{/c}\u00a0{c_important}Aura{/c}\u00a0{c_legendary}active:\r\n{icon:bullet} Every {c_number}[{value}||]{/c}\u00a0seconds, you Pull In Nearby enemies.{/c}",
    "Socketable_DustStone": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}For each of your{/c} {c_important}Auras{/c} {c_legendary}or{/c}\u00a0{c_important}Hexes{/c}\u00a0{c_legendary}an enemy is afflicted with, they take{/c} {c_number}[{value}|1%x|]{/c} {c_legendary}increased damage from you.{/c}",
    "Socketable_BreadAndRoses": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}While you have three or more{/c} {c_important}Growth & Decay{/c} {c_legendary}Witch Powers\u00a0equipped:\r\n{icon:bullet} You gain{/c} {c_number}[{value}*100|0%x|]{/c} {c_legendary}more{/c} {c_important}{u}Barrier{/u}{/c}{c_legendary}, {c_important}{u}Fortify{/u}{/c}{c_legendary}, and {c_important}Thorns{/c}{c_legendary}.{/c}",
    "Socketable_ElderSigil": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}Your{/c} {c_important}Agility{/c}{c_legendary},{/c}\u00a0{c_important}Corpse{/c}{c_legendary}, {/c}{c_important}Mastery{/c}{c_legendary},{/c} {c_important}Weapon Mastery{/c}{c_legendary},{/c} {c_important}Wrath{/c}{c_legendary}, and{/c} {c_important}Potency{/c} {c_legendary}Skills deal{/c} {c_number}[{value}*100|0%x|]{/c} {c_legendary}increased direct damage to{/c} {c_important}Hexed{/c}\u00a0{c_legendary}enemies.{/c}",
    "Socketable_FriendOfTheBog": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}While you have three or more{/c} {c_important}Growth & Decay{/c} {c_legendary}Witch Powers\u00a0equipped:\r\n{icon:bullet} You gain{/c} {c_number}8%{c_lightgray}\\[x\\]{/c}{/c} {c_legendary}Primary Core Stat,{/c} {c_number}[{value}*100|%x|]{/c} {c_legendary}Maximum Life,\u00a0and {/c}{c_important}{u}Unhindered{/u}{/c}{c_legendary}.{/c}",
    "Socketable_MindWreath": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}While you have three or more{/c}\u00a0{c_important}Psyche{/c} {c_legendary}Witch Powers\u00a0equipped:\r\n{icon:bullet} You gain {c_number}20%{/c} {c_important}Defensive{/c}, {c_important}Macabre{/c}{c_legendary},\u00a0and{/c} {c_important}Trap{/c} Cooldown Reduction.{/c}",
    "Socketable_PhantomString": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}You deal{/c} {c_number}[{value}*100|0%x|]{/c} {c_legendary}increased{/c}\u00a0{c_important}{u}Overpower{/u}{/c} {c_legendary}Damage to{/c}\u00a0{c_important}Hexed{/c}\u00a0{c_legendary}enemies.{/c}",
    "Socketable_PointedFinger": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}Your{/c} {c_important}Summons{/c}\u00a0{c_legendary}deal{/c} {c_number}[{value}*100|0%x|]{/c} {c_legendary}increased direct damage to{/c}\u00a0{c_important}Hexed{/c}{c_legendary} Elites.{/c}",
    "Socketable_VilePhylactery": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}While you have a{/c} {c_important}Summon{/c} {c_legendary}Witch Power equipped:\r\n{icon:bullet} If you would take fatal damage, you instead Sacrifice your {c_important}Summon{/c} Witch Powers to gain a {c_important}{u}Barrier{/u}{/c} equal to {c_number}[{value}*100*4|0%|]{/c} of your Maximum Life. You return to normal after {c_number}6{/c} seconds. \r\nCan only occur once every \r\n{c_number}[{value}*100*3||]{/c} seconds.{/c}",
    "Socketable_VoiceOfTheStars": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}While you have an{/c} {c_important}Aura{/c}\u00a0{c_legendary}active:\r\n{icon:bullet} Your {c_important}Ultimate{/c} Skills are also treated as {c_important}Eldritch{/c}, {c_important}Growth & Decay{/c}, and {c_important}Psyche{/c}.\r\n{icon:bullet} Your {c_important}Ultimate{/c} Skills deal {c_number}[{value}*100|0%x|]{/c} increased damage.{/c}",
    "Socketable_WitchingHour": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}While you have three or more{/c} {c_important}Eldritch{/c} {c_legendary}Witch Powers\u00a0equipped:\r\n{icon:bullet} Every{/c} {c_number}[{value}*100||]{/c} {c_legendary}seconds, the next{/c}\u00a0{c_important}Core{/c} {c_legendary}Skill you cast is also treated as {/c}{c_important}Eldritch{/c}.",
    "Socketable_VultureTalon": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}While you have an{/c} {c_important}Aura{/c}\u00a0{c_legendary}active:\r\n{icon:bullet} Your Damage Over Time effects tick{/c} {c_number}[{value}*100|0%+|]{/c} {c_legendary}faster.{/c}",
    "Socketable_SpiralCoin": "+160 Armor and 8% Resistance to All Elements\r\n\r\n{c_legendary}While you have three or more{/c} {c_important}Psyche{/c} {c_legendary}Witch Powers\u00a0equipped:\r\n{icon:bullet} You gain {c_number}[{value}*100*2|0%+|]{/c}\u00a0Lucky Hit Chance and {c_number}[{value}*100*6|0%+|]{/c}\u00a0Crowd Control Duration.{/c}",
    "Percent_Bonus_Projectiles_Per_Power#Spiritborn_Eagle_Potency1": "+[{value2}*100|1%|] Chance for {c_important}Razor Wings{/c} to Deal Double Damage",
    "Spiritborn_Resolve_ResourceOnLoss": "+[{value2}||] Vigor when {c_important}Resolve{/c} is Lost",
    "Damage_Percent_Bonus_Per_Skill_Tag#Skill_Primary_Summoning": "+[{value2}*100|1%|] Summon Damage",
    "Multiplicative_Damage_Percent_Bonus_Per_Skill_Tag#Skill_Primary_Summoning": "[{value2}*100|1%x|] Summon Damage",
    "Druid_Werewolf_MovementSpeed": "+[{value}*100|%|] Movement Speed while Shapeshifted into a {c_important}Werewolf{/c}",
    "DOT_DPS_Bonus_Percent_Per_Damage_Type#Shadow": "+[{value2}*100|1%|] Corrupting Damage",
    "DOT_DPS_Reduction_Percent_Per_Damage_Type#Shadow": "[{value2}*100|1%|] Corrupting Damage Reduction",
    "Damage_Percent_Reduction_From_Dotted_Enemy#Shadow": "[{value2}*100|1%|] Damage Reduction from Corrupted Enemies",
    "Damage_Percent_Bonus_Against_Dot_Type#Shadow": "+[{value2}*100|1%|] Damage to Corrupted Enemies",
    "DOT_DPS_Bonus_Percent_Per_Damage_Type#Fire": "+[{value2}*100|1%|] Burning Damage",
    "DOT_DPS_Bonus_Percent_Per_Damage_Type#Poison": "+[{value2}*100|1%|] Poisoning Damage",
    "DOT_DPS_Bonus_Percent_Per_Damage_Type#Physical": "+[{value2}*100|1%|] Bleeding Damage",
    "Flurry_Consume_1": "Your {c_important}Stun Grenades{/c} deal +[{value}*30|x%|] of their total damage done as additional Burning damage over {c_number}5{/c} seconds",
    "Flurry_Consume_2": "{c_important}Caltrops{/c}, {c_important}Smoke Grenade{/c}, and {c_important}Death Trap{/c} receive your {c_important}Stun Grenade{/c} benefits ",
    "Druid_HumanForm_Armor": "+[{value}||] Armor while in Human Form",
    "Druid_HumanForm_MovementSpeed": "+[{value}*100|%|] Movement Speed while in Human Form",
    "Barb_FrenzyChance": "{c_label}Lucky Hit:{/c} Up to a [{value}*100|%|] Chance to Gain a Stack of {c_important}Frenzy{/c}",
    "Druid_AnimaOfTheForest": "Anima of the Forest grants [{value}*100|%|] Attack Speed",
    "Percent_Bonus_Projectiles_Per_Power#Rogue_PoisonTrap": "+[{value2}*100|1%|] Chance for {c_important}Poison Trap{/c} to Cast Twice",
    "Rogue_MaxPoisonTraps": "+[{value}||] Maximum Poison Traps",
    "Generic_LuckyHit_Berserking_Manual": "{c_label}Lucky Hit:{/c} Up to a [{value}*100|%|] Chance to Become {c_important}Berserking{/c}",
    "Socketable_Potency_Infusion": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}Your {/c}{c_important}Infusions{/c}{c_unique} are {/c}{c_number}150%{c_lightgray}\\[x\\]{/c}{/c}{c_unique} more potent.",
    "Socketable_SealofControl": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements{/c}\r\n\r\n{c_unique}While you have two or more{/c} {c_important}Arcana{/c} {c_unique}from the{/c} {c_important}School of Control{/c} {c_unique}equipped, gain{/c} {c_number}45%{c_lightgray}\\[x\\]{/c}{/c}{c_gray}{/c} {c_unique}Crowd Control Duration and{/c} {c_number}30%{c_lightgray}\\[+\\]{/c}{/c} {c_unique}Lucky Hit Chance.",
    "Socketable_SealofPower": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements{/c}\r\n\r\n{c_unique}While you have two or more{/c} {c_important}Arcana{/c} {c_unique}from the{/c} {c_important}School of Power{/c}{c_unique} equipped, gain {/c}{c_number}25%{c_lightgray}\\[+\\]{/c}{/c} {c_unique}Movement Speed and {c_number}15%{c_lightgray}\\[+\\]{/c}{/c} Critical Strike Chance.",
    "Socketable_SealofDenial": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}While you have two or more{/c} {c_important}Arcana{/c} {c_unique}from the{/c} {c_important}School of Denial{/c}{c_unique} equipped, gain {/c}{c_number}30%{c_lightgray}\\[x\\]{/c}{/c} {c_unique}more {c_important}{u}Barrier{/u}{/c}{c_unique}, {/c}{c_important}{u}Fortify{/u}{/c}{c_unique}, and {/c}{c_important}Thorns{/c}{c_unique}.{/c}",
    "Socketable_HoradricCrest": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}For each{/c} {c_important}Arcana{/c} {c_unique}from a unique{/c} {c_important}School{/c}{c_unique} you have equipped, gain {/c}{c_number}5%{/c} {c_unique}Damage Reduction and {/c}{c_number}1%{c_lightgray}\\[+\\]{/c}{/c} {c_unique}Maximum Resistance to All Elements.{/c}",
    "Socketable_ReverieHorn": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}After you injure or kill an enemy, your {c_important}Summons{/c} are empowered, growing larger and dealing{/c} {c_number}50%{c_lightgray}\\[x\\]{/c}{/c} {c_unique}more damage for{/c} {c_number}4 {c_unique}seconds.",
    "Socketable_VernalLight": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}You deal {c_number}20%{c_lightgray}\\[x\\]{/c}{/c}{c_unique} more Elemental damage and take{/c} {c_number}10%{c_lightgray}\\[x\\]{/c}{/c} {c_unique}more.",
    "Socketable_LiminalEcho": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}If you would take fatal damage, instead prevent that damage, invoke {c_important}Propulsion{/c}{c_unique}, and become {c_important}Invulnerable{/c}{c_unique} for {/c}{c_number}3{/c}{c_unique} seconds.\r\n\r\nThis can only occur once every {/c}{c_number}75{/c} {c_unique} seconds.",
    "Socketable_IdolFromBelow": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}You gain{/c} {c_number}6%{c_lightgray}\\[x\\]{/c}{/c} {c_unique}Primary Core Stat, {c_number}6%{c_lightgray}\\[x\\]{/c}{/c}{c_unique} Maximum Life, and {/c}{c_important}{u}Unhindered{/c}{/u}{c_unique}.\r\n\r\nHowever, you will be hunted in Sanctuary's darkest places by {/c}{c_important}Jewel Guardians{/c}{c_unique} who were entombed to protect this relic.",
    "Socketable_MyriadStone": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}After you cast your{/c} {c_important}Catalytic Skill{/c}{c_unique}, if it is an {c_important}Ultimate{/c}{c_unique}, gain{/c} {c_number}30%{c_lightgray}\\[+\\]{/c}{/c} {c_unique}Attack Speed for{/c} {c_number}10{/c}{c_unique} seconds.",
    "Socketable_SparkofCreation": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}After you cast your{/c} {c_important}Catalytic Skill{/c}{c_unique}, gain{/c} {c_number}5{/c} {c_unique}Primary Resource.{/c}",
    "Socketable_LuminateEye": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}Your{/c} {c_important}Catalytic Skill{/c}{c_unique} gains{/c} {c_number}25%{c_lightgray}\\[x\\]{/c}{/c} {c_unique}Cooldown Reduction.{/c}",
    "Socketable_EideticMemory": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}Your {/c}{c_important}Catalytic Skill{/c} {c_unique}deals{/c} {c_number}33%{/c} {c_unique}Weapon Damage of your {/c}{c_important}Infusion's{/c}{c_unique} Element over {/c}{c_number}3{/c}{c_unique} seconds.\r\n\r\n{/c_label}Lucky Hit{/c}{c_unique}: Dealing damage of your {/c}{c_important}Infusion's{/c}{c_unique} Element has up to a {/c}{c_number}33%{/c}{c_unique} chance to trigger its secondary effect.",
    "Socketable_TheStarflux": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}Your {/c}{c_important}Catalysts{/c}{c_unique} deal {/c}{c_number}100%{c_lightgray}\\[x\\]{/c}{/c} {c_unique}more damage.\r\n\r\nHowever, you lose control over {/c}{c_important}Horadric Spellcraft{/c}{c_unique}, causing your {/c}{c_important}Catalyst{/c}{c_unique} to inherit {/c}{c_important}Infusions{/c}{c_unique} randomly.",
    "Socketable_Willbreaker": "{c:FFB3A99B}+120 Armor and 6% Resistance to All Elements\r\n\r\n{c_unique}Physical damage you deal shatters enemies' spirits, causing them to take {c_number}40%{c_lightgray}\\[x\\]{/c}{/c} {c_unique}more Physical damage for {c_number}6{/c} {c_unique}seconds. \r\n\r\nThis effect applies when first damaging a Boss or Elite, or when they are affected by Crowd Control.",
    "Proc_Resource_On_Hit_Flat_All_Primary": "{c_label}Lucky Hit:{/c} Up to a 15% Chance to Restore +[{value}||] Primary Resource",
    "Sorc_CracklingEnergy_HitAdditionalTargets": "+[{value2}*100|1%|] Chance for {c_important}Crackling Energy{/c} to Zap up to Three Additional Targets",
    "Resistance_All_Bonus": "+[{value}||] Resistance to All Elements",
    "Resistance#Physical_Gem": "+[{value}||] Physical Resistance",
    "Rogue_DoK_Dodge": "+[{value}*100|%|] Dodge Chance while Channeling {c_important}Dance of Knives{/c}",
    "Paladin_Judgement_Damage": "+[{value2}*100|1%|] {c_important}Judgement{/c} Damage",
    "Paladin_Arbiter_WingStrike_Damage": "+[{value2}*100|1%|] {c_important}Wing Strike{/c} Damage",
    "Paladin_Judgement_DamageTakenWhileJudged": "+[{value2}*100|1%|] Damage to {c_important}Judged{/c} Enemies",
    "Paladin_Arbiter_AdditionalArmor": "+[{value2}*100|1%|] Armor in {c_important}Arbiter{/c} Form",
    "Damage_Percent_Bonus_While_Affected_By_Power#Paladin_Sub_Angel": "+[{value2}*100|1%|] Damage while in {c_important}Arbiter{/c} Form",
    "Paladin_Aura_Potency": "+[{value2}*100|1%|] {c_important}Aura{/c} Potency",
    "Paladin_Aura_Enhancement_Potency": "+[{value2}*100|1%|] {c_important}Aura{/c} Enhancement Potency",
    "Paladin_Juggernaut_Damage_When_Spending_Resolve": "+[{value2}*100|1%|] Damage when Spending {c_important}Resolve{/c}",
    "CC_Duration_Bonus_Percent_Per_Power": "+[{value2}*100|1%|] {c_important}{value1}{/c} Crowd Control Duration",
    "Paladin_Aura_Potency_Per_Skill": "+[{value2}*100|1%|] {c_important}{value1}{/c} Potency",
    "Damage_Bonus_Percent_To_Weakened": "+[{value}*100|1%|] Damage to Weakened Enemies",
    "Item_Refinement_Bonus": "+[{value}||] Item Quality",
    "S12_KillStreak_Massacre_MovementSpeed": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}*100|%|] Movement Speed per Kill Streak Tier",
    "S12_KillStreak_Massacre_AttackSpeed": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}*100|%|] Attack Speed per Kill Streak Tier",
    "Spending_Resource_Heals_Percent": "Heal for [{value2}*100|1%|] of Resource Spent",
    "S12_KillStreak_Massacre_ResourceCostReduction": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}*100|%|] Resource Cost Reduction per Kill Streak Tier",
    "S12_KillStreak_Massacre_LuckyHitChance": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}*100|%|] Lucky Hit Chance per Kill Streak Tier",
    "S12_KillStreak_Massacre_Lifesteal": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}||] Life On Hit per Kill Streak Tier",
    "S12_KillStreak_Massacre_MaxLife": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}*100|%|] Maximum Life per Kill Streak Tier",
    "S12_KillStreak_Massacre_CooldownReduction": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}*100|1%|] Cooldown Reduction per Kill Streak Tier",
    "S12_KillStreak_Massacre_CriticalStrikeChance": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}*100|%|] Critical Strike Chance per Kill Streak Tier",
    "S12_KillStreak_Feast_CooldownReset": "{c:FFf74444}{i}Feast{/i}:{/c} Every {c_number}40{/c} Kills, reset [{value}||] random |4Cooldown:Cooldowns;",
    "S12_KillStreak_Hunger_BasicSkill": "{c:FFf74444}{i}Hunger{/i}:{/c} After you Cast a Basic Skill, [{value}*100|%|] chance for +1 Kill to your Kill Streak",
    "S12_KillStreak_Feast_Rampage": "{c:FFf74444}{i}Feast{/i}:{/c} Every {c_number}25{/c} Kills, gain Berserking for [{value}||] |4second:seconds; ",
    "S12_KillStreak_Feast_NextCastDamage": "{c:FFf74444}{i}Feast{/i}:{/c} Every {c_number}15{/c} Kills, your next Core Skill Cast deals [{value}||] additional damage",
    "S12_KillStreak_Feast_Bloodsplosion": "{c:FFf74444}{i}Feast{/i}:{/c} Every {c_number}10{/c} Kills, release a Bloodsplosion for [(Weapon_Damage_Min_Total+Weapon_Damage_Delta_Total)*{value}||] damage",
    "S12_KillStreak_Feast_Bite": "{c:FFf74444}{i}Feast{/i}:{/c} Every {c_number}20{/c} Kills, savagely bite [{value}||] |4time:times; for {c_number}[(Weapon_Damage_Min_Total+Weapon_Damage_Delta_Total)*1.5||]{/c} damage and apply Vulnerable",
    "S12_KillStreak_Feast_Chains": "{c:FFf74444}{i}Feast{/i}:{/c} Every {c_number}30{/c} Kills, chains hook [{value}||] nearby enemies",
    "S12_KillStreak_Hunger_LuckyHit": "{c:FFf74444}{i}Hunger{/i}:{/c} Lucky Hit: Up to a [{value}*100|%|] chance for +1 Kill to your Kill Streak",
    "S12_KillStreak_Hunger_OnKIll": "{c:FFf74444}{i}Hunger{/i}:{/c} After you kill an enemy, [{value}*100|%|] chance for +1 Kill to your Kill Streak",
    "S12_KillStreak_Hunger_CooldownUsed": "{c:FFf74444}{i}Hunger{/i}:{/c} After you Cast a Cooldown, +1 Kill to your Kill Streak",
    "S12_KillStreak_Hunger_ResourceSpent": "{c:FFf74444}{i}Hunger{/i}:{/c} Every {c_number}100{/c} Resource, [{value}*100|%|] chance for +1 Kill to your Kill Streak",
    "S12_KillStreak_Hunger_FeastItems": "{c:FFf74444}{i}Hunger{/i}:{/c} [{value}*10|%|] increased chance for Feast Items during your Kill Streaks",
    "S12_KillStreak_Hunger_Ancestral": "{c:FFf74444}{i}Hunger{/i}:{/c} Elites drop [{value}*5|%|] more Ancestral Items during your Kill Streak.",
    "S12_KillStreak_Hunger_Gold": "{c:FFf74444}{i}Hunger{/i}:{/c} [{value}*25|%|] increased chance for additional Gold during Kill Streaks",
    "S12_KillStreak_Hunger_HungerItems": "{c:FFf74444}{i}Hunger{/i}:{/c} [{value}*10|%|] increased chance for Hunger Items during Kill Streaks",
    "S12_KillStreak_Hunger_KillStreakRep": "{c:FFf74444}{i}Hunger{/i}:{/c} [{value}*15|%|] increased Reputation from Kill Streaks",
    "S12_KillStreak_Hunger_KillStreakXP": "{c:FFf74444}{i}Hunger{/i}:{/c} [{value}*15|%|] increased Experience from Kill Streaks",
    "S12_KillStreak_Hunger_RampageItems": "{c:FFf74444}{i}Hunger{/i}:{/c} [{value}*10|%|] increased chance for Rampage Items during Kill Streaks",
    "S12_KillStreak_Hunger_Runes": "{c:FFf74444}{i}Hunger{/i}:{/c} [{value}*10|%|] increased chance for Runes during your Kill Streaks",
    "S12_KillStreak_Hunger_Salvage": "{c:FFf74444}{i}Hunger{/i}:{/c} [{value}*20|%|] increased chance for additional Salvage Materials during your Kill Streaks",
    "S12_KillStreak_Feast_RestoreResource": "{c:FFf74444}{i}Feast{/i}:{/c} Every {c_number}15{/c} Kills, restore [{value}*100|%|] of your maximum Primary Resource",
    "S12_AprilFools_Unique_Bow_CluckThrice": "+[{value}*100|%|] Chance to Cluck Thrice",
    "S12_AprilFools_Unique_DamageToPoultry": "+[{value}*100|%|] Damage to Poultry",
    "S12_AprilFools_Unique_NegativeInt": "-[{value}||] Intelligence",
    "S12_KillStreak_Massacre_DexterityPercent": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}*100|%|] Dexterity per Kill Streak Tier",
    "S12_KillStreak_Massacre_IntelligencePercent": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}*100|%|] Intelligence per Kill Streak Tier",
    "S12_KillStreak_Massacre_WillpowerPercent": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}*100|%|] Willpower per Kill Streak Tier",
    "S12_KillStreak_Massacre_StrengthPercent": "{c:FFf74444}{i}Rampage{/i}:{/c} +[{value}*100|%|] Strength per Kill Streak Tier",
    "Resistance_All_Bonus_Percent": "+[{value}*100|1%|] Resistance to All Elements",
    "Overpower_Damage_Bonus_Per_Stack": "+[{value}*100|1%|] Damage Per Overpower Stack",
    "Damage_Percent_Bonus_While_Volatile": "+[{value}*100|1%|] Volatility Damage Bonus",
    "Multiplicative_Damage_Percent_Bonus_While_Volatile": "[{value}*100|1x%|] Volatility Damage Bonus",
    "Multiplicative_Warlock_Shadowform_Damage_Bonus": "[{value}*100|1x%|] Damage while in Shadowform",
    "Multiplicative_Warlock_Demonform_Damage_Bonus": "[{value}*100|1x%|] Demonform Damage Bonus",
    "Warlock_Shadowform_Damage_Bonus": "+[{value}*100|1%|] Damage while in Shadowform",
    "Warlock_Demonform_Damage_Bonus": "+[{value}*100|1%|] Demonform Damage Bonus",
    "Warlock_GreaterDemonPet_MaxHealth_Bonus": "+[{value}*100|1%|] Maximum {c_important}Greater Demon{/c} Life",
    "Flat_Hitpoints_Max_Bonus_Unscaled_By_Player_Health": "+[{value}||] Maximum Life",
    "Flat_Hitpoints_on_Hit_Unscaled_By_Player_Health": "+[{value}||] Life On Hit",
    "Flat_Hitpoints_on_Kill_Unscaled_By_Player_Health": "[{value}|~|] Life on Kill",
    "No_Damage_Taken_Flat_Hitpoints_Regen_Per_Second_Unscaled_By_Player_Health": "+[{value}||] Life Regeneration",
    "Experience_Bonus_Percent_Total": "+[{value}*100|1%|] Total Bonus Experience",
    "Multiplicative_Experience_Bonus_Percent": "+[{value}*100|1%|] Bonus Experience",
    "Overpower_Crit_Damage_Bonus_Percent": "+[{value}*100|1%|] Overpower Critical Damage",
    "Experience_Bonus_Bucketed_And_Penalized_At_Max_Level": "+[{value}*100|%|] Bonus Kill Experience ([{value}*10|1%|] at level 70)",
    "Block_Damage_Percent_Bonus": "[{value}*100|%|] Blocked Damage Reduction",
    "Bucketed_Multiplicative_Damage_Type": "x[{value2}*100|%|] {value1} Damage Multiplier",
    "Bucketed_Multiplicative_DoT_Damage": "x[{value}*100|%|] Damage Over Time Multiplier",
    "Bucketed_Multiplicative_Damage": "x[{value}*100|%|] All Damage Multiplier",
    "Bucketed_Multiplicative_Vulnerable_Health_Damage": "x[{value}*100|%|] Vulnerable Damage Multiplier",
    "Bucketed_Multiplicative_Crit_Damage": "x[{value}*100|%|] Critical Strike Damage Multiplier",
    "Gem_DamageType_Shadow_Bonus": "x[{value}*100|%|] Shadow Damage Multiplier",
    "Gem_DamageType_All_Bonus": "x[{value}*100|%|] All Damage Multiplier",
    "Gem_DamageType_Cold_Bonus": "x[{value}*100|%|] Cold Damage Multiplier",
    "Gem_DamageType_Poison_Bonus": "x[{value}*100|%|] Poison Damage Multiplier",
    "Gem_DamageType_HolyFire_Bonus": "x[{value}*100|%|] Fire and Holy Damage Multiplier",
    "Gem_DamageType_Physical_Bonus": "x[{value}*100|%|] Physical Damage Multiplier",
    "Gem_DamageType_Lightning_Bonus": "x[{value}*100|%|] Lightning Damage Multiplier",
    "Weapon_Damage_Min": "+[{value}||] Weapon Damage",
    "Rogue_Imbuement_Potency": "[{value}*100|1%|] {c_important}Imbuement{/c} Potency",
    "Resource_On_Kill_Warlock": "[{value2}*10|~|] {value1} every 10 Kills",
    "Bonus_Percent_Per_Power_2#Warlock_HexDebuff": "[{value2}*100|1x%|] Hex Damage Bonus",
    "Bonus_Percent_Per_Power#Warlock_HexDebuff": "+[{value2}*100|1%|] Hex Damage Bonus",
    "Custom_Duration_Bonus_Per_Skill_Tag": "+[{value2}*100|1%|] {c_important}{value1}{/c} Duration",
    "On_Hit_Weakened_Proc": "{c_label}Lucky Hit:{/c} Up to a +[{value}*100|1%|] Chance to Weaken Enemies for {value2} Seconds"
  }
,"paragonThresholds": {"WillPowerSide2":{"attributes":[{"id":20,"value":"210+75*ParagonBoardEquipIndex"}],"classFilter":[true,false,true,false,true,false,true,false]},"WillPowerSide1":{"attributes":[{"id":20,"value":"190+75*ParagonBoardEquipIndex"}],"classFilter":[true,false,true,false,true,false,true,false]},"WillPowerSide3":{"attributes":[{"id":20,"value":"230+75*ParagonBoardEquipIndex"}],"classFilter":[true,false,true,false,true,false,true,false]},"StrengthSide1":{"attributes":[{"id":18,"value":"190+75*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,true,false,true,false,true]},"StrengthSide2":{"attributes":[{"id":18,"value":"210+75*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,true,false,true,false,true]},"StrengthSide3":{"attributes":[{"id":18,"value":"230+75*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,true,false,true,false,true]},"StrengthMain2":{"attributes":[{"id":18,"value":"760+455*ParagonBoardEquipIndex"}],"classFilter":[false,false,true,false,false,false,true,false]},"StrengthMain1":{"attributes":[{"id":18,"value":"630+455*ParagonBoardEquipIndex"}],"classFilter":[false,false,true,false,false,false,true,false]},"StrengthMain3":{"attributes":[{"id":18,"value":"890+455*ParagonBoardEquipIndex"}],"classFilter":[false,false,true,false,false,false,true,false]},"IntelligenceSide1":{"attributes":[{"id":19,"value":"190+75*ParagonBoardEquipIndex"}],"classFilter":[false,true,false,true,false,true,true,true]},"IntelligenceSide2":{"attributes":[{"id":19,"value":"210+75*ParagonBoardEquipIndex"}],"classFilter":[false,true,false,true,false,true,true,true]},"IntelligenceSide3":{"attributes":[{"id":19,"value":"230+75*ParagonBoardEquipIndex"}],"classFilter":[false,true,false,true,false,true,true,true]},"IntelligenceMain1":{"attributes":[{"id":19,"value":"630+455*ParagonBoardEquipIndex"}],"classFilter":[true,false,false,false,true,false,false,false]},"IntelligenceMain2":{"attributes":[{"id":19,"value":"760+455*ParagonBoardEquipIndex"}],"classFilter":[true,false,false,false,true,false,false,false]},"IntelligenceMain3":{"attributes":[{"id":19,"value":"890+455*ParagonBoardEquipIndex"}],"classFilter":[true,false,false,false,true,false,false,false]},"DexteritySide1":{"attributes":[{"id":21,"value":"190+75*ParagonBoardEquipIndex"}],"classFilter":[true,true,true,false,true,false,false,false]},"DexteritySide2":{"attributes":[{"id":21,"value":"210+75*ParagonBoardEquipIndex"}],"classFilter":[true,true,true,false,true,false,false,false]},"DexteritySide3":{"attributes":[{"id":21,"value":"230+75*ParagonBoardEquipIndex"}],"classFilter":[true,true,true,false,true,false,false,false]},"DexterityMain1":{"attributes":[{"id":21,"value":"630+455*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,true,false,true,false,false]},"DexterityMain2":{"attributes":[{"id":21,"value":"760+455*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,true,false,true,false,false]},"DexterityMain3":{"attributes":[{"id":21,"value":"890+455*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,true,false,true,false,false]},"Sorc_Intelligence+Willpower":{"attributes":[{"id":19,"value":"700+455*ParagonBoardEquipIndex"},{"id":20,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[true,false,false,false,false,false,false,false]},"Sorc_Intelligence+Dexterity":{"attributes":[{"id":19,"value":"700+455*ParagonBoardEquipIndex"},{"id":21,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[true,false,false,false,false,false,false,false]},"Sorc_Willpower+Dexterity":{"attributes":[{"id":20,"value":"190+70*ParagonBoardEquipIndex"},{"id":21,"value":"185+70*ParagonBoardEquipIndex"}],"classFilter":[true,false,false,false,false,false,false,false]},"Rogue_Dexterity+Intelligence":{"attributes":[{"id":21,"value":"700+455*ParagonBoardEquipIndex"},{"id":19,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,true,false,false,false,false]},"Rogue_Dexterity+Strength":{"attributes":[{"id":21,"value":"700+455*ParagonBoardEquipIndex"},{"id":18,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,true,false,false,false,false]},"Rogue_Intelligence+Strength":{"attributes":[{"id":19,"value":"190+70*ParagonBoardEquipIndex"},{"id":18,"value":"185+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,true,false,false,false,false]},"Barb_Strength+Dexterity":{"attributes":[{"id":18,"value":"700+455*ParagonBoardEquipIndex"},{"id":21,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,true,false,false,false,false,false]},"Barb_Strength+Willpower":{"attributes":[{"id":18,"value":"700+455*ParagonBoardEquipIndex"},{"id":20,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,true,false,false,false,false,false]},"Necro_Dexterity+Willpower":{"attributes":[{"id":21,"value":"190+70*ParagonBoardEquipIndex"},{"id":20,"value":"185+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,false,true,false,false,false]},"Necro_Intelligence+Willpower":{"attributes":[{"id":19,"value":"700+455*ParagonBoardEquipIndex"},{"id":20,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,false,true,false,false,false]},"Necro_Intelligence+Dexterity":{"attributes":[{"id":19,"value":"700+455*ParagonBoardEquipIndex"},{"id":21,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,false,true,false,false,false]},"Glyph_Intelligence_Main":{"attributes":[{"id":10,"value":40}],"classFilter":[true,true,false,false,true,false,false,false]},"Druid_Willpower+Dexterity":{"attributes":[{"id":20,"value":"700+455*ParagonBoardEquipIndex"},{"id":21,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,true,false,false,false,false,false,false]},"Druid_Willpower+Intelligence":{"attributes":[{"id":20,"value":"700+455*ParagonBoardEquipIndex"},{"id":19,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,true,false,false,false,false,false,false]},"Glyph_Strength_Main":{"attributes":[{"id":9,"value":40}],"classFilter":[false,false,true,false,false,false,true,false]},"Glyph_Dexterity_Main":{"attributes":[{"id":12,"value":40}],"classFilter":[false,true,false,true,false,true,false,false]},"Glyph_Dexterity_Side":{"attributes":[{"id":12,"value":25}],"classFilter":[true,true,true,false,true,true,true,false]},"Glyph_Willpower_Side":{"attributes":[{"id":11,"value":25}],"classFilter":[true,false,true,false,true,true,true,false]},"Glyph_Intelligence_Side":{"attributes":[{"id":10,"value":25}],"classFilter":[false,true,false,true,false,true,true,true]},"Glyph_Strength_Side":{"attributes":[{"id":9,"value":25}],"classFilter":[false,false,false,true,false,true,false,true]},"WillpowerMain1":{"attributes":[{"id":20,"value":"630+455*ParagonBoardEquipIndex"}],"classFilter":[false,true,false,false,false,false,false,true]},"WillpowerMain2":{"attributes":[{"id":20,"value":"760+455*ParagonBoardEquipIndex"}],"classFilter":[false,true,false,false,false,false,false,true]},"Glyph_Willpower_Main":{"attributes":[{"id":11,"value":40}],"classFilter":[false,true,false,false,false,false,false,true]},"Spiritborn_Dexterity+Intelligence":{"attributes":[{"id":21,"value":"700+455*ParagonBoardEquipIndex"},{"id":19,"value":"185+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,false,false,true,false,false]},"Spiritborn_Dexterity+Strength":{"attributes":[{"id":21,"value":"700+455*ParagonBoardEquipIndex"},{"id":18,"value":"185+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,false,false,true,false,false]},"Spiritborn_Strength+Intelligence":{"attributes":[{"id":18,"value":"190+70*ParagonBoardEquipIndex"},{"id":19,"value":"185+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,false,false,true,false,false]},"Paladin_Strength+Willpower":{"attributes":[{"id":18,"value":"700+455*ParagonBoardEquipIndex"},{"id":20,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,false,false,false,true,false]},"Paladin_Strength+Intelligence":{"attributes":[{"id":18,"value":"700+455*ParagonBoardEquipIndex"},{"id":19,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,false,false,false,true,false]},"Warlock_Willpower+Intelligence":{"attributes":[{"id":20,"value":"700+455*ParagonBoardEquipIndex"},{"id":19,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,false,false,false,false,true]},"Warlock_Willpower+Strength":{"attributes":[{"id":20,"value":"700+455*ParagonBoardEquipIndex"},{"id":18,"value":"190+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,false,false,false,false,true]},"Warlock_Strength+Intelligence":{"attributes":[{"id":18,"value":"190+70*ParagonBoardEquipIndex"},{"id":19,"value":"185+70*ParagonBoardEquipIndex"}],"classFilter":[false,false,false,false,false,false,false,true]}}};