// ==========================================
// 1. Ability Scores & Proficiency Bonus
// ==========================================
const pb = 2;       // Proficiency Bonus

// Define raw scores here
const strScore = 13;
const dexScore = 12;
const conScore = 14;
const intScore = 8;
const wisScore = 16;
const chaScore = 12; 

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
    name: "Cade",
    class: "Cleric",
    level: 1,
    race: "Goliath (Storm)",
    background: "Sailor",
    alignment: "LG",
    portrait: "../Headshots/portrait-cade.png",

    // -- Core Stats --
    ac: 16, // Chain Shirt (13) + DEX (1) + Shield (2)
    hpMax: 10,
    speed: "35 FT",
    initiative: fmt(dexMod),
    passivePerception: 10 + wisMod + pb, 
    profBonus: fmt(pb),
    hitDice: { die: "d8", count: 1 },
    longRestGrantsInspiration: true,

    // -- Abilities --
    abilities: [
        { name: "STR", score: strScore, mod: fmt(strMod), save: fmt(strMod),      saveProficient: false },
        { name: "DEX", score: dexScore, mod: fmt(dexMod), save: fmt(dexMod),      saveProficient: false },
        { name: "CON", score: conScore, mod: fmt(conMod), save: fmt(conMod),      saveProficient: false },
        { name: "INT", score: intScore, mod: fmt(intMod), save: fmt(intMod),      saveProficient: false },
        { name: "WIS", score: wisScore, mod: fmt(wisMod), save: fmt(wisMod + pb), saveProficient: true },
        { name: "CHA", score: chaScore, mod: fmt(chaMod), save: fmt(chaMod + pb), saveProficient: true }
    ],

    // -- Skills --
    skills: [
        { name: "Acrobatics",      ability: "DEX", mod: fmt(dexMod + pb), proficient: true }, // Sailor
        { name: "Animal Handling", ability: "WIS", mod: fmt(wisMod),      proficient: false },
        { name: "Arcana",          ability: "INT", mod: fmt(intMod + wisMod), proficient: false, note: "+3 Thaumaturge" }, 
        { name: "Athletics",       ability: "STR", mod: fmt(strMod),      proficient: false },
        { name: "Deception",       ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "History",         ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Insight",         ability: "WIS", mod: fmt(wisMod + pb), proficient: true }, // Cleric
        { name: "Intimidation",    ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "Investigation",   ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Medicine",        ability: "WIS", mod: fmt(wisMod + pb), proficient: true }, // Cleric
        { name: "Nature",          ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Perception",      ability: "WIS", mod: fmt(wisMod + pb), proficient: true }, // Sailor
        { name: "Performance",     ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "Persuasion",      ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "Religion",        ability: "INT", mod: fmt(intMod + wisMod), proficient: false, note: "+3 Thaumaturge" },
        { name: "Sleight of Hand", ability: "DEX", mod: fmt(dexMod),      proficient: false },
        { name: "Stealth",         ability: "DEX", mod: fmt(dexMod),      proficient: false },
        { name: "Survival",        ability: "WIS", mod: fmt(wisMod),      proficient: false }
    ],

    // -- Proficiencies --
    proficiencies: [
        { category: "Weapons",   value: "Simple, Improvised" },
        { category: "Armour",    value: "Light, Medium, Shields" },
        { category: "Tools",     value: "Navigator's Tools, Water Vehicles" },
        { category: "Languages", value: "Common; Dwarvish, Giant" }
    ],

    // -- Attacks --
    attacks: [
        {
            name: "Unarmed Strike",
            hit: fmt(strMod + pb),
            mastery: "",
            properties: "Tavern Brawler (reroll 1s; push 5 ft/turn)",
            modes: [{ label: "1H", damage: "1d4" + fmt(strMod) + " Blg" }]
        },
        {
            name: "Dagger",
            hit: fmt(strMod + pb), 
            mastery: "",
            properties: "Fin, Lgt, Thr 20/60",
            modes: [
                { label: "1H", damage: "1d4" + fmt(strMod) + " Pcg" },
                { label: "Thr", damage: "1d4" + fmt(strMod) + " Pcg" }
            ]
        }
    ],

    masteryLegend: [],

    // -- Magic --
    magic: {
        ability: "WIS",
        spellAttack: fmt(wisMod + pb),
        saveDC: String(8 + wisMod + pb),
        slots: { "Lvl 1": 2 },
        spells: [
            { name: "Guidance", type: "Cnp", casting: "Act", duration: "Conc, 1 min", desc: "Touch willing creature. They add 1d4 to one ability check." },
            { name: "Mending", type: "Cnp", casting: "1 min", duration: "Inst", desc: "Repairs a single break or tear in an object you touch." },
            { name: "Thaumaturgy", type: "Cnp", casting: "Act", duration: "1 min", desc: "Manifest a minor wonder within 30 ft (booming voice, tremors, etc)." },
            { name: "Word of Radiance", type: "Cnp", casting: "Act", duration: "Inst", desc: "Creatures within 5 ft succeed CON save or take 1d6 Rad dmg." },
            { name: "Command", type: "Lvl 1", casting: "Act", duration: "1 rd", desc: "One-word command; target must succeed WIS save or obey." },
            { name: "Create or Destroy Water", type: "Lvl 1", casting: "Act", duration: "Inst", desc: "Create/destroy 10 gallons of water or fog in a 30-foot cube." },
            { name: "Healing Word", type: "Lvl 1", casting: "BA", duration: "Inst", desc: "Creature within 60 ft regains 2d4" + fmt(wisMod) + " HP." },
            { name: "Shield of Faith", type: "Lvl 1", casting: "BA", duration: "Conc, 10 min", desc: "Creature within 60 ft gains a +2 bonus to AC." }
        ]
    },

    // -- Features & Traits --
    features: [
        { name: "Divine Order: Thaumaturge", desc: "Know one extra cantrip (Mending). Add WIS mod to Arcana and Religion checks." },
        { name: "Large Form (Goliath)", desc: "Adv on saves to end Grappled. Count as Large for carrying capacity." },
        { name: "Storm Giant Ancestry", desc: "When damaged, use Rxn to deal 1d8 Thun dmg to attacker within 30 ft.", trackerLabel: "Rxn", trackerNote: "PB/LR", tracker: { count: pb, restoreAmountOnShort: 0 } },
        { name: "Tavern Brawler", desc: "Reroll 1s on Unarmed Strike damage. Deal 1d4+STR Blg. Push target 5 ft once per turn on hit." },
        { name: "Spellcasting", desc: "Prepare spells daily from Cleric list. 2 Lvl 1 slots available." }
    ],

    inactiveNote: "",

    // -- Equipment --
    equipment: {
        groups: [
            { label: "Worn & Equipped", items: [ { name: "Chain Shirt", detail: "13 AC + DEX | 20 lb" }, { name: "Shield", detail: "+2 AC | 6 lb" }, { name: "Holy Symbol", detail: "Amulet / Emblem | 1 lb" }, { name: "Traveller's Clothes", detail: "4 lb" } ] },
            { label: "Backpack", items: [ { name: "Dagger", detail: "1 lb" }, { name: "Navigator's Tools", detail: "2 lb" }, { name: "Hempen Rope", detail: "50 ft | 10 lb" }, { name: "Priest's Pack", detail: "Blanket, candles, tinderbox, incense, vestments, waterskin | 25 lb" } ] }
        ],
        weightSummary: "Total Carried: 69 lb (Capacity: 420 lb)",
        lifestyle: "Modest (1 GP/day)"
    },

    // -- Default State Values --
    defaults: { gold: 27, rations: 2, inspiration: false }
};