window.CHARACTER_DATA = {
    // -- Identity --
    name: "",
    class: "",
    level: 1,
    race: "",
    background: "",
    alignment: "",
    portrait: "", // e.g. "portrait.png"

    // -- Core Stats --
    ac: 10,
    hpMax: 0,
    speed: "30 FT",
    initiative: "+0",
    passivePerception: 10,
    profBonus: "+2",
    hitDice: { die: "d", count: 1 }, // e.g. die: "d8"
    longRestGrantsInspiration: true,

    // -- Abilities --
    abilities: [
        { name: "STR", score: 10, mod: "+0", save: "+0", saveProficient: false },
        { name: "DEX", score: 10, mod: "+0", save: "+0", saveProficient: false },
        { name: "CON", score: 10, mod: "+0", save: "+0", saveProficient: false },
        { name: "INT", score: 10, mod: "+0", save: "+0", saveProficient: false },
        { name: "WIS", score: 10, mod: "+0", save: "+0", saveProficient: false },
        { name: "CHA", score: 10, mod: "+0", save: "+0", saveProficient: false }
    ],

    // -- Skills --
    skills: [
        { name: "Acrobatics",      ability: "DEX", mod: "+0", proficient: false },
        { name: "Animal Handling", ability: "WIS", mod: "+0", proficient: false },
        { name: "Arcana",          ability: "INT", mod: "+0", proficient: false },
        { name: "Athletics",       ability: "STR", mod: "+0", proficient: false },
        { name: "Deception",       ability: "CHA", mod: "+0", proficient: false },
        { name: "History",         ability: "INT", mod: "+0", proficient: false },
        { name: "Insight",         ability: "WIS", mod: "+0", proficient: false },
        { name: "Intimidation",    ability: "CHA", mod: "+0", proficient: false },
        { name: "Investigation",   ability: "INT", mod: "+0", proficient: false },
        { name: "Medicine",        ability: "WIS", mod: "+0", proficient: false },
        { name: "Nature",          ability: "INT", mod: "+0", proficient: false },
        { name: "Perception",      ability: "WIS", mod: "+0", proficient: false },
        { name: "Performance",     ability: "CHA", mod: "+0", proficient: false },
        { name: "Persuasion",      ability: "CHA", mod: "+0", proficient: false },
        { name: "Religion",        ability: "INT", mod: "+0", proficient: false },
        { name: "Sleight of Hand", ability: "DEX", mod: "+0", proficient: false },
        { name: "Stealth",         ability: "DEX", mod: "+0", proficient: false }, // add note: "Disadv" if heavy armor
        { name: "Survival",        ability: "WIS", mod: "+0", proficient: false }
    ],

    // -- Proficiencies --
    proficiencies: [
        { category: "Weapons",   value: "" },
        { category: "Armour",    value: "" },
        { category: "Tools",     value: "" },
        { category: "Languages", value: "" }
    ],

    // -- Attacks --
    attacks: [
        {
            name: "", // e.g. "Longsword"
            hit: "+0",
            mastery: "", // e.g. "Sap"
            properties: "", // e.g. "Versatile"
            modes: [
                { label: "1H", damage: "1d8+0" },
                { label: "2H", damage: "1d10+0" }
            ]
        }
    ],

    masteryLegend: [
        // { name: "Sap", desc: "Target has Disadvantage on next Attack Roll before your next turn." }
    ],

    // -- Magic (Omit or leave blank if martial class with no magic) --
    magic: {
        ability: "", // e.g. "INT"
        spellAttack: "+0",
        saveDC: "10",
        spells: [
            // Example Spell Schema:
            // {
            //     name: "",
            //     type: "Cantrip",
            //     casting: "Action",
            //     duration: "Inst",
            //     desc: "",
            //     freeCast: false,
            //     freeCastLabel: "1/LR"
            // }
        ]
    },

    // -- Features & Traits --
    features: [
        {
            name: "",
            desc: "",
            // trackerLabel: "Bonus Act.", // Optional
            // trackerNote: "2/LR", // Optional
            // tracker: { count: 1, restoreAmountOnShort: 1 } // Optional
        }
    ],

    inactiveNote: "",

    // -- Equipment --
    equipment: {
        groups: [
            {
                label: "Worn & Equipped",
                items: [
                    // { name: "Chain Mail (16 AC, 55 lb)" },
                    // { name: "Shield (+2 AC, 6 lb)" }
                ]
            },
            {
                label: "Backpack",
                items: [
                    // { name: "Bedroll (7 lb)" },
                    // { name: "Crowbar (5 lb)", detail: "Adv on STR (leverage)" }
                ]
            }
        ],
        weightSummary: "", // e.g. "Total Carried: 96 lb"
        lifestyle: "" // e.g. "Modest Lifestyle (1 GP/day)"
    },

    // -- Default State Values --
    defaults: {
        gold: 0,
        rations: 0,
        inspiration: false
    }
};