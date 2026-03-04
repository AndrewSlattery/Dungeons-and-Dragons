// ==========================================
// 1. Ability Scores & Proficiency Bonus
// ==========================================
const pb = 2;       // Proficiency Bonus

// Define raw scores here
const strScore = 17;
const dexScore = 8;
const conScore = 13;
const intScore = 15;
const wisScore = 10;
const chaScore = 12;

// ==========================================
// 2. Automated Modifier Calculations
// ==========================================
// Standard D&D math: floor((Score - 10) / 2)
const getMod = (score) => Math.floor((score - 10) / 2);

const strMod = getMod(strScore);
const dexMod = getMod(dexScore);
const conMod = getMod(conScore);
const intMod = getMod(intScore);
const wisMod = getMod(wisScore);
const chaMod = getMod(chaScore);

// Helper for typographical minus signs (per specification)
const fmt = (mod) => (mod >= 0 ? "+" + mod : "\u2212" + Math.abs(mod));

// ==========================================
// 3. Character Data Object
// ==========================================
window.CHARACTER_DATA = {
    // -- Identity --
    name: "Rixon",
    class: "Fighter",
    level: 1,
    race: "Human",
    background: "Guard",
    alignment: "NG",
    portrait: "../Headshots/rixon-headshot.png",

    // -- Core Stats (Programmatically Calculated) --
    ac: 18, // Chain Mail (16) + Shield (2); Heavy armor does not add DEX
    hpMax: 10 + conMod, // Fighter d10 (10) + CON Mod
    speed: "30 FT",
    initiative: fmt(dexMod + pb), // DEX + PB from Alert Feat
    passivePerception: 10 + wisMod + pb, // Proficient via Guard
    profBonus: fmt(pb),
    hitDice: { die: "d10", count: 1 },
    longRestGrantsInspiration: true,

    // -- Abilities --
    abilities: [
        { name: "STR", score: strScore, mod: fmt(strMod), save: fmt(strMod + pb), saveProficient: true }, // Fighter Save
        { name: "DEX", score: dexScore, mod: fmt(dexMod), save: fmt(dexMod),      saveProficient: false },
        { name: "CON", score: conScore, mod: fmt(conMod), save: fmt(conMod + pb), saveProficient: true }, // Fighter Save
        { name: "INT", score: intScore, mod: fmt(intMod), save: fmt(intMod),      saveProficient: false },
        { name: "WIS", score: wisScore, mod: fmt(wisMod), save: fmt(wisMod),      saveProficient: false },
        { name: "CHA", score: chaScore, mod: fmt(chaMod), save: fmt(chaMod),      saveProficient: false }
    ],

    // -- Skills --
    skills: [
        { name: "Acrobatics",      ability: "DEX", mod: fmt(dexMod),      proficient: false },
        { name: "Animal Handling", ability: "WIS", mod: fmt(wisMod),      proficient: false },
        { name: "Arcana",          ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Athletics",       ability: "STR", mod: fmt(strMod + pb), proficient: true }, // Guard
        { name: "Deception",       ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "History",         ability: "INT", mod: fmt(intMod + pb), proficient: true }, // Fighter
        { name: "Insight",         ability: "WIS", mod: fmt(wisMod),      proficient: false },
        { name: "Intimidation",    ability: "CHA", mod: fmt(chaMod + pb), proficient: true }, // Fighter
        { name: "Investigation",   ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Medicine",        ability: "WIS", mod: fmt(wisMod),      proficient: false },
        { name: "Nature",          ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Perception",      ability: "WIS", mod: fmt(wisMod + pb), proficient: true }, // Guard
        { name: "Performance",     ability: "CHA", mod: fmt(chaMod + pb), proficient: true }, // Human
        { name: "Persuasion",      ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "Religion",        ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Sleight of Hand", ability: "DEX", mod: fmt(dexMod),      proficient: false },
        { name: "Stealth",         ability: "DEX", mod: fmt(dexMod),      proficient: false, note: "Disadv" },
        { name: "Survival",        ability: "WIS", mod: fmt(wisMod),      proficient: false }
    ],

    // -- Proficiencies --
    proficiencies: [
        { category: "Weapons",   value: "Simple & Martial" },
        { category: "Armour",    value: "Light, Med, Heavy, Shields" },
        { category: "Tools",     value: "Knavebones (+PB, Adv)" },
        { category: "Languages", value: "Common, Sign, Giant" }
    ],

    // -- Attacks --
    attacks: [
        {
            name: "Longsword",
            hit: fmt(strMod + pb),
            mastery: "Sap",
            properties: "Versatile",
            modes: [
                { label: "1H", damage: "1d8" + fmt(strMod + 2) + " Slg" }, // +2 from Dueling
                { label: "2H", damage: "1d10" + fmt(strMod) + " Slg" }
            ]
        },
        {
            name: "Handaxe",
            hit: fmt(strMod + pb),
            mastery: "Vex",
            properties: "Light \u2022 Thrown 20/60",
            modes: [
                { label: "1H", damage: "1d6" + fmt(strMod + 2) + " Slg" }, // +2 from Dueling
                { label: "T", damage: "1d6" + fmt(strMod) + " Slg" }
            ]
        }
    ],

    masteryLegend: [
        { name: "Sap", desc: "Target has Disadvantage on next Attack Roll before your next turn." },
        { name: "Vex", desc: "Gain Advantage on your next Attack Roll against the target." }
    ],

    // -- Magic --
    magic: {
        ability: "INT",
        spellAttack: fmt(intMod + pb),
        saveDC: String(8 + intMod + pb),
        spells: [
            { name: "Blade Ward", type: "Cantrip", casting: "Action", duration: "Conc, 1 min", desc: "Attackers subtract 1d4 from attack rolls vs you.", freeCast: false },
            { name: "Light", type: "Cantrip", casting: "Action", duration: "1 hour", desc: "Object sheds 20 ft bright light + 20 ft dim light.", freeCast: false },
            { name: "Shield", type: "1st Level", casting: "Reaction", duration: "1 round", desc: "+5 AC, immune to Magic Missile.", freeCast: true, freeCastLabel: "1/LR" }
        ]
    },

    // -- Features & Traits --
    features: [
        { name: "Duelling", desc: "+2 damage with 1H melee weapon when no other weapons held.", tracker: null },
        { name: "Second Wind", desc: "Regain 1d10" + fmt(1) + " HP.", trackerLabel: "Bonus Act.", trackerNote: "2/LR, +1 on SR", tracker: { count: 2, restoreAmountOnShort: 1 } },
        { name: "Weapon Mastery", desc: "Unlock masteries (Halberd, Handaxe, Longsword). Swap 1 on Long Rest.", tracker: null },
        { name: "Resourceful", desc: "Gain Heroic Inspiration when finishing a Long Rest.", tracker: null },
        { name: "Alert", desc: "Add PB to Initiative. May swap Initiative with a willing ally.", tracker: null },
        { name: "Magic Initiate", desc: "Access to Wizard spell list. INT is your spellcasting ability.", tracker: null }
    ],

    inactiveNote: "Halberd (Cleave) \u2014 On hit, make 2nd attack vs different creature within 5 ft. (Weapon dice damage only).",

    // -- Equipment --
    equipment: {
        groups: [
            {
                label: "Worn & Equipped",
                items: [
                    { name: "Chain Mail (16 AC, 55 lb)" },
                    { name: "Shield (+2 AC, 6 lb)" },
                    { name: "Longsword (3 lb)" },
                    { name: "Handaxe \u00d72 (4 lb)" },
                    { name: "Traveller's Clothes (4 lb)" }
                ]
            },
            {
                label: "Backpack (19/30 lb)",
                items: [
                    { name: "Fine Clothes (6 lb)" },
                    { name: "Bedroll (7 lb)" },
                    { name: "Crowbar (5 lb)", detail: "Adv on STR (leverage)" },
                    { name: "Knavebones (1 lb)", detail: "Win: DC 20 INT | Spot cheat: DC 15 WIS" },
                    { name: "Map, Local (0 lb)", detail: "+5 Survival (navigate)" }
                ]
            }
        ],
        weightSummary: "Total Carried: 96 lb",
        lifestyle: "Modest Lifestyle (1 GP/day)"
    },

    // -- Default State Values --
    defaults: { gold: 65, rations: 4, inspiration: true }
};