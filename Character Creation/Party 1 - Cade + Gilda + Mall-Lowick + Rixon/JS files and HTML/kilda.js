// ==========================================
// 1. Ability Scores & Proficiency Bonus
// ==========================================
const pb = 2; 

const strScore = 8;
const dexScore = 14;
const conScore = 13;
const intScore = 16;
const wisScore = 10;
const chaScore = 14;

const getMod = (score) => Math.floor((score - 10) / 2);

const strMod = getMod(strScore);
const dexMod = getMod(dexScore);
const conMod = getMod(conScore);
const intMod = getMod(intScore);
const wisMod = getMod(wisScore);
const chaMod = getMod(chaScore);

const fmt = (mod) => (mod >= 0 ? "+" + mod : "\u2212" + Math.abs(mod));

// ==========================================
// 3. Character Data Object
// ==========================================
window.CHARACTER_DATA = {
    name: "Kilda",
    class: "Wizard",
    level: 1,
    race: "Dwarf",
    background: "Merchant",
    alignment: "N",
    portrait: "../Headshots/portrait-kilda.png",

    ac: 12, // 10 + DEX, or 15 with Mage Armour
    hpMax: 8, // Wizard d6 (6) + CON (1) + Dwarf Toughness (1)
    speed: "30 FT",
    initiative: fmt(dexMod),
    passivePerception: 10 + wisMod,
    profBonus: fmt(pb),
    hitDice: { die: "d6", count: 1 },
    longRestGrantsInspiration: true,

    abilities: [
        { name: "STR", score: strScore, mod: fmt(strMod), save: fmt(strMod),      saveProficient: false },
        { name: "DEX", score: dexScore, mod: fmt(dexMod), save: fmt(dexMod),      saveProficient: false },
        { name: "CON", score: conScore, mod: fmt(conMod), save: fmt(conMod),      saveProficient: false },
        { name: "INT", score: intScore, mod: fmt(intMod), save: fmt(intMod + pb), saveProficient: true },
        { name: "WIS", score: wisScore, mod: fmt(wisMod), save: fmt(wisMod + pb), saveProficient: true },
        { name: "CHA", score: chaScore, mod: fmt(chaMod), save: fmt(chaMod),      saveProficient: false }
    ],

    skills: [
        { name: "Acrobatics",      ability: "DEX", mod: fmt(dexMod),      proficient: false },
        { name: "Animal Handling", ability: "WIS", mod: fmt(wisMod + pb), proficient: true }, // Merchant
        { name: "Arcana",          ability: "INT", mod: fmt(intMod + pb), proficient: true }, // Wizard
        { name: "Athletics",       ability: "STR", mod: fmt(strMod),      proficient: false },
        { name: "Deception",       ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "History",         ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Insight",         ability: "WIS", mod: fmt(wisMod),      proficient: false },
        { name: "Intimidation",    ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "Investigation",   ability: "INT", mod: fmt(intMod + pb), proficient: true }, // Wizard
        { name: "Medicine",        ability: "WIS", mod: fmt(wisMod),      proficient: false },
        { name: "Nature",          ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Perception",      ability: "WIS", mod: fmt(wisMod),      proficient: false },
        { name: "Performance",     ability: "CHA", mod: fmt(chaMod),      proficient: false },
        { name: "Persuasion",      ability: "CHA", mod: fmt(chaMod + pb), proficient: true }, // Merchant
        { name: "Religion",        ability: "INT", mod: fmt(intMod),      proficient: false },
        { name: "Sleight of Hand", ability: "DEX", mod: fmt(dexMod),      proficient: false },
        { name: "Stealth",         ability: "DEX", mod: fmt(dexMod),      proficient: false },
        { name: "Survival",        ability: "WIS", mod: fmt(wisMod),      proficient: false }
    ],

    proficiencies: [
        { category: "Weapons",   value: "Simple Weapons" },
        { category: "Armour",    value: "None" },
        { category: "Tools",     value: "Navigator's Tools" },
        { category: "Languages", value: "Common; Dwarvish, Halfling" }
    ],

    attacks: [
        {
            name: "Quarterstaff",
            hit: fmt(intMod + pb), // Using True Strike
            mastery: "",
            properties: "Arcane Focus",
            modes: [
                { label: "2H", damage: "1d8" + fmt(intMod) + " Rad/Blg" }
            ]
        },
        {
            name: "Dagger",
            hit: fmt(dexMod + pb),
            mastery: "",
            properties: "Fin, Lgt, Thr 20/60",
            modes: [
                { label: "1H, Thr", damage: "1d4" + fmt(dexMod) + " Pcg" },
            ]
        }
    ],

    masteryLegend: [],

    magic: {
        ability: "INT",
        spellAttack: fmt(intMod + pb),
        saveDC: String(8 + intMod + pb),
        slots: { "Lvl 1": 2 },
        spells: [
            { name: "Mind Sliver", type: "Cnp", casting: "Act", duration: "Inst", desc: "1d6 Psych dmg; target -1d4 on next save." },
            { name: "Prestidigitation", type: "Cnp", casting: "Act", duration: "1 hr", desc: "Minor sensory effects and utility tricks." },
            { name: "True Strike", type: "Cnp", casting: "Act", duration: "Inst", desc: "Use INT for weapon attack/damage; deal Radiant damage." },
            { name: "Chromatic Orb", type: "Lvl 1", casting: "Act", duration: "Inst", desc: "3d8 elemental dmg. Leaps on doubles." },
            { name: "Mage Armour", type: "Lvl 1", casting: "Act", duration: "8 hrs", desc: "AC becomes 13 + DEX (15 total)." },
            { name: "Thunderwave", type: "Lvl 1", casting: "Act", duration: "Inst", desc: "2d8 Thun dmg and 10ft push in 15ft cube." },
            { name: "Identify", type: "Lvl 1", casting: "Act (R)", duration: "Inst", desc: "Learn properties of objects/creatures." },
            { name: "Alarm", type: "Lvl 1", prepared: false, casting: "Act (R)", duration: "8 hrs", desc: "Set a mental or audible alarm in an area." },
            { name: "Tenser's Floating Disk", type: "Lvl 1", prepared: false, casting: "Act (R)", duration: "1 hr", desc: "Creates a floating plane to carry 500 lbs." }
        ]
    },

    features: [
        { name: "Arcane Recovery", desc: "Recover one Lvl 1 slot on Short Rest.", trackerLabel: "Uses", trackerNote: "1/LR", tracker: { count: 1, restoreAmountOnShort: 0 } },
        { name: "Ritual Casting", desc: "Cast Wizard spells as rituals if they have the tag and are in your Spellbook." },
        { name: "Dwarven Resilience", desc: "Adv on saves vs. Poison; Resistance to Poison damage." },
        { name: "Dwarven Toughness", desc: "HP max increases by 1 per level." },
        { name: "Stonecunning", desc: "BA: Gain 60ft Tremorsense on stone for 10 min.", trackerLabel: "Uses", trackerNote: "PB/LR", tracker: { count: pb, restoreAmountOnShort: 0 } },
        { name: "Lucky (Origin Feat)", desc: "Spend to gain Adv on d20 Test or give Disadv on attack vs you.", trackerLabel: "Points", trackerNote: "PB/LR", tracker: { count: pb, restoreAmountOnShort: 0 } }
    ],

    equipment: {
        groups: [
            { label: "Worn & Equipped", items: [{ name: "Quarterstaff", detail: "Arcane Focus | 4 lb" }, { name: "Dagger (x2)", detail: "2 lb" }, { name: "Robe", detail: "Fine Merchant quality | 4 lb" }] },
            { label: "Backpack & Pouches", items: [{ name: "Spellbook", detail: "3 lb" }, { name: "Navigator's Tools", detail: "2 lb" }, { name: "Scholar's Pack", detail: "Book, ink, pen, parchment, sand, knife | 10 lb" }, { name: "Traveller's Clothes", detail: "4 lb" }] }
        ],
        weightSummary: "Total Carried: 29 lb (Capacity: 240 lb)",
        lifestyle: "Wealthy"
    },

    defaults: { gold: 27, rations: 0, inspiration: false }
};