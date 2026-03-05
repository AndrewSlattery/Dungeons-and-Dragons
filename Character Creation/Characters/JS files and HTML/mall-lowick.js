// ==========================================
// 1. Ability Scores & Proficiency Bonus
// ==========================================
const pb = 2;       // Proficiency Bonus

// Raw scores from character-sheet-mall-lowick.md
const strScore = 8; 
const dexScore = 17;
const conScore = 14;
const intScore = 12;
const wisScore = 14;
const chaScore = 10;

// ==========================================
// 2. Automated Modifier Calculations
// ==========================================
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
    name: "Mall-Lowick",
    class: "Ranger",
    level: 1,
    race: "Halfling (Small)",
    background: "Scribe",
    alignment: "CG",
    portrait: "../Headshots/portrait-mall-lowick.png",

    // -- Core Stats --
    ac: 12 + dexMod, // Studded Leather base (12) + DEX Mod
    hpMax: 10 + conMod, // Ranger base (10) + CON Mod
    speed: "30 FT",
    initiative: fmt(dexMod),
    passivePerception: 10 + wisMod + pb, // Proficient via Scribe background
    profBonus: fmt(pb),
    hitDice: { die: "d10", count: 1 },
    longRestGrantsInspiration: true,

    // -- Abilities --
    abilities: [
        { name: "STR", score: strScore, mod: fmt(strMod), save: fmt(strMod + pb), saveProficient: true },  // Ranger save
        { name: "DEX", score: dexScore, mod: fmt(dexMod), save: fmt(dexMod + pb), saveProficient: true },  // Ranger save
        { name: "CON", score: conScore, mod: fmt(conMod), save: fmt(conMod),      saveProficient: false },
        { name: "INT", score: intScore, mod: fmt(intMod), save: fmt(intMod),      saveProficient: false },
        { name: "WIS", score: wisScore, mod: fmt(wisMod), save: fmt(wisMod),      saveProficient: false },
        { name: "CHA", score: chaScore, mod: fmt(chaMod), save: fmt(chaMod),      saveProficient: false }
    ],

    // -- Skills --
    skills: [
        { name: "Acrobatics",      ability: "DEX", mod: fmt(dexMod + pb), proficient: true },  // Skilled Feat
        { name: "Animal Handling", ability: "WIS", mod: fmt(wisMod + pb), proficient: true },  // Ranger
        { name: "Arcana",          ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Athletics",       ability: "STR", mod: fmt(strMod),      proficient: false },
        { name: "Deception",       ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "History",         ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Insight",         ability: "WIS", mod: fmt(wisMod),      proficient: false },
        { name: "Intimidation",    ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "Investigation",   ability: "INT", mod: fmt(intMod + pb), proficient: true },  // Scribe
        { name: "Medicine",        ability: "WIS", mod: fmt(wisMod),      proficient: false },
        { name: "Nature",          ability: "INT", mod: fmt(intMod + pb), proficient: true },  // Ranger
        { name: "Perception",      ability: "WIS", mod: fmt(wisMod + pb), proficient: true },  // Scribe
        { name: "Performance",     ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "Persuasion",      ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "Religion",        ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Sleight of Hand", ability: "DEX", mod: fmt(dexMod),      proficient: false },
        { name: "Stealth",         ability: "DEX", mod: fmt(dexMod),      proficient: false },
        { name: "Survival",        ability: "WIS", mod: fmt(wisMod + pb), proficient: true }   // Ranger
    ],

    // -- Proficiencies --
    proficiencies: [
        { category: "Weapons",   value: "Simple, Martial" },
        { category: "Armour",    value: "Light, Medium, Shields" },
        { category: "Tools",     value: "Calligrapher's Supplies; Cartographer's Tools, Navigator's Tools" },
        { category: "Languages", value: "Common; Sign, Halfling" }
    ],

    // -- Attacks --
    attacks: [
        {
            name: "Longbow",
            hit: fmt(dexMod + pb),
            mastery: "Slow",
            properties: "Amm 150/600, Hvy, 2H",
            modes: [{ label: "", damage: "1d8" + fmt(dexMod) + " Pcg" }]
        },
        {
            name: "Shortsword",
            hit: fmt(dexMod + pb),
            mastery: "Vex",
            properties: "Fin, Lgt",
            modes: [{ label: "", damage: "1d6" + fmt(dexMod) + " Pcg" }]
        },
        {
            name: "Scimitar",
            hit: fmt(dexMod + pb),
            mastery: "",
            properties: "Fin, Lgt",
            modes: [{ label: "", damage: "1d6" + fmt(dexMod) + " Slg" }]
        },
        {
            name: "Unarmed Strike",
            hit: fmt(strMod + pb),
            mastery: "",
            properties: "",
            modes: [{ label: "", damage: Math.max(1, 1 + strMod) + " Blg" }]
        }
    ],

    masteryLegend: [
        { name: "Slow", desc: "On hit, reduce target's Spd by 10 ft until start of your next turn." },
        { name: "Vex", desc: "On hit, gain Adv on next attack roll against this target before end of next turn." }
    ],

    // -- Magic --
    magic: {
        ability: "WIS",
        spellAttack: fmt(wisMod + pb),
        saveDC: String(8 + wisMod + pb),
        slots: { "Lvl 1": 2 },
        spells: [
            {
                name: "Hunter's Mark",
                type: "Lvl 1",
                casting: "BA",
                duration: "Conc, 1 hr",
                desc: "Mark creature. Deal extra 1d6 Force dmg on hit. Adv on Perception/Survival checks to find it.",
                freeCast: true,
                freeCastLabel: "2/LR"
            },
            {
                name: "Ensnaring Strike",
                type: "Lvl 1",
                casting: "BA",
                duration: "Conc, 1 min",
                desc: "On hit, target makes STR save. Fail: Restrained, takes 1d6 Pcg dmg at start of its turns.",
                freeCast: false
            },
            {
                name: "Entangle",
                type: "Lvl 1",
                casting: "Act",
                duration: "Conc, 1 min",
                desc: "20-ft square is Difficult Terrain. Creatures in area must succeed on a STR save or be Restrained.",
                freeCast: false
            }
        ]
    },

    // -- Features & Traits --
    features: [
        { name: "Favored Enemy (Ranger)", desc: "Hunter's Mark is always prepared. You can cast it twice per LR without expending a spell slot." },
        { name: "Weapon Mastery (Ranger)", desc: "Use mastery properties of 2 weapons (Shortsword, Longbow). Swap 1 on LR." },
        { name: "Brave (Halfling)", desc: "Adv on saves vs. Frightened condition." },
        { name: "Halfling Nimbleness", desc: "Move through space of creatures one size larger." },
        { name: "Luck (Halfling)", desc: "Reroll 1s on d20 tests." },
        { name: "Naturally Stealthy", desc: "Hide behind creatures one size larger than you." },
        { name: "Skilled (Origin Feat)", desc: "Gain proficiency in 3 skills/tools (Acrobatics, Cartographer's Tools, Navigator's Tools)." }
    ],

    inactiveNote: "",

    // -- Equipment --
    equipment: {
        groups: [
            {
                label: "Worn & Equipped",
                items: [
                    { name: "Studded Leather Armour", detail: "AC 12 + DEX | 13 lb" },
                    { name: "Longbow", detail: "1d8 Pcg | 2 lb" },
                    { name: "Shortsword", detail: "1d6 Pcg | 2 lb" },
                    { name: "Scimitar", detail: "1d6 Slg | 3 lb" }
                ]
            },
            {
                label: "Backpack & Pouches",
                items: [
                    { name: "Quiver & 20 Arrows", detail: "2 lb" },
                    { name: "Druidic Focus", detail: "Mistletoe | 0 lb" },
                    { name: "Calligrapher's Supplies", detail: "5 lb" },
                    { name: "Fine Clothes", detail: "6 lb" },
                    { name: "Lamp & Oil (3 flasks)", detail: "4 lb" },
                    { name: "Parchment (12 sheets)", detail: "0 lb" },
                    { name: "Explorer's Pack", detail: "Bedroll, mess kit, tinderbox, torches, rations, waterskin, rope | 55 lb" }
                ]
            }
        ],
        weightSummary: "Total Carried: 92 lb (Capacity: 240 lb)",
        lifestyle: "Modest (1 GP/day)"
    },

    // -- Default State Values --
    defaults: {
        gold: 30,
        rations: 10,
        inspiration: false
    }
};