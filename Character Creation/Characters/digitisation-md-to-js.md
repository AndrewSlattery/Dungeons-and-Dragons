# D&D 2024 Digitisation Standardisation Specification (MD to JS)

This document outlines the standard abbreviations, formatting rules, and mathematical calculations to be used when converting a Markdown (`.md`) character sheet into a structured JavaScript (`.js`) data object.

---

## 1. Typography & Number Formatting

* **Modifiers:** Always explicitly include the mathematical sign for modifiers. Use a true minus sign (`\u2212`) for negative numbers in the JS output to ensure correct typographical rendering on the HTML sheet (e.g., `+3`, `\u22121`).
* **Booleans:** Use true booleans (`true`/`false`) for binary toggles like `proficient`, `saveProficient`, and `longRestGrantsInspiration`.

---

## 2. Core Calculations

When converting raw stats, verify or calculate the following standard values:

* **Hit Points (Level 1):** Maximum value of the Class Hit Die + Constitution Modifier.
* **Initiative:** Dexterity Modifier + other specific bonuses (e.g., add Proficiency Bonus if the character has the *Alert* feat).
* **Passive Perception:** 10 + Wisdom Modifier + Proficiency Bonus (if proficient in Perception) + Proficiency Bonus again (if Expert in Perception).
* **Spell Save DC:** 8 + Proficiency Bonus + Spellcasting Ability Modifier.
* **Spell Attack Bonus:** Proficiency Bonus + Spellcasting Ability Modifier (always include the `+` sign).
* **Armor Class (AC):**
    * *Unarmored:* 10 + DEX mod (unless overriding features like Unarmored Defense apply).
    * *Light Armor:* Base AC + DEX mod.
    * *Medium Armor:* Base AC + DEX mod (maximum of +2).
    * *Heavy Armor:* Base AC (DEX mod does not apply).
    * *Shields:* Add +2 to the total AC.

---

## 3. Proficiencies & Languages

Group standard proficiencies logically and sort any specific additions alphabetically, separated by a semicolon.

* **Weapon Proficiencies:** List broad categories first, followed by a semicolon, then specific weapons in alphabetical order. 
    *Format:* `Simple, Martial, Improvised; [Specific Weapons]`
    *Example:* `Simple; Longbow, Rapier`
* **Armour Proficiencies:** Use a standard, comma-separated hierarchy. 
    *Format:* `Light, Medium, Heavy, Shields`
* **Languages:** List Common first, followed by a semicolon, then all other languages in alphabetical order.
    *Format:* `Common; [Other Languages Alphabetically]`
    *Example:* `Common; Dwarvish, Elvish, Giant`
* **Tools:**
    Include the relevant ability score and any bonuses in parentheses if granted by a background/feature.
    *Example:* `Knavebones (+PB, Adv)`, `Thieves' Tools (DEX)`

---

## 4. Attacks, Damage & Weapon Modes

Keep weapon properties and damage strings concise to fit within the UI grid.

### Damage Types
* **Acid:** Acid
* **Bludgeoning:** Blg
* **Cold:** Cold
* **Fire:** Fire
* **Force:** Force
* **Lightning:** Ltg
* **Necrotic:** Nec
* **Piercing:** Pcg
* **Poison:** Psn
* **Psychic:** Psy
* **Radiant:** Rad
* **Slashing:** Slg
* **Thunder:** Thun

### Weapon Attack Modes (`label`)
* **One-Handed:** `1H`
* **Two-Handed:** `2H`
* **Thrown:** `Thr`
* **Off-hand / Dual Wielded:** `Off`

### Weapon Properties
Abbreviate standard properties in the `properties` string:
* **Ammunition:** Amm (Range/Max)
* **Finesse:** Fin
* **Heavy:** Hvy
* **Light:** Lgt
* **Reach:** Rch
* **Thrown:** Thr (Range/Max)
* **Two-Handed:** 2H
* **Versatile:** Ver

*Example Damage String:* `1d8+3 Pcg`
*Example Properties String:* `Fin, Lgt, Thr (20/60)`

---

## 5. Magic & Spells

Spell descriptions must be heavily truncated to focus solely on the mechanical effect.

### Casting Times
* **Action:** Act
* **Bonus Action:** BA
* **Reaction:** Rxn
* **Minute(s):** min
* **Hour(s):** hr

### Durations
* **Instantaneous:** Inst
* **Concentration:** Conc, [Time] (e.g., `Conc, 1 min`)
* **Round(s):** rd / rds

### Spell Levels
* **Cantrip:** Cnp
* **Level 1-9:** Lvl 1, Lvl 2, etc.

---

## 6. General Abbreviations

Use these standard abbreviations throughout the `notes`, `desc`, and `detail` fields:

* **Advantage:** Adv
* **Disadvantage:** Disadv
* **Proficiency Bonus:** PB
* **Hit Points:** HP
* **Temporary Hit Points:** THP
* **Armor Class:** AC
* **Difficulty Class:** DC
* **Short Rest:** SR
* **Long Rest:** LR
* **Experience Points:** XP
* **Damage:** dmg
* **Saving Throw:** save
* **Movement / Speed:** Spd
* **Pounds (Weight):** lb
* **Gold / Silver / Copper Pieces:** GP / SP / CP