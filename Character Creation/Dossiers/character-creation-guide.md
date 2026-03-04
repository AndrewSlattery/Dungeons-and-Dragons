# D&D 2024 — Character Creation Guide

> This guide walks through character creation step by step, in an order designed to make each decision inform the next. At each step, notes indicate what to record immediately versus what to defer.

---

## Step 1: Class

**Reference:** `class-dossier-level-1.md`

Choose a class. Then record the following — some will be finalised now, others deferred to later steps as indicated.

**Record now:**
- Hit Die (used to calculate HP at Step 4)
- Primary Ability
- Saving Throw Proficiencies
- Skill Proficiencies — choose from your class's list
- Weapon Proficiencies
- Armour Training
- All Level 1 Features, noting any deferred choices:
  - **Fighting Style** (Fighter): defer to Step 7 when weapons are chosen — see `feats-fighting-styles.md`
  - **Divine Order** (Cleric): choose Protector or Thaumaturge now (Thaumaturge grants an extra cantrip)
  - **Primal Order** (Druid): choose Magician or Warden now (Magician grants an extra cantrip)
  - **Eldritch Invocations** (Warlock): choose now; if you pick Pact of the Tome, defer those 3 cantrips to Step 6
  - **Expertise** (Rogue): defer to after Step 2, so you can choose from all proficient skills (class + background)
  - **Weapon Mastery choices**: defer to Step 7 when weapons are chosen

**Record for later (Step 6):**
- Spellcasting Ability (INT / WIS / CHA as given by class)
- Number of cantrips at Level 1
- Number of prepared Level 1 spells
- Number of Level 1 spell slots
- Wizard: note that your Spellbook starts with 6 Level 1 spells of your choice (separate from your 4 prepared spells)

**Record for later (Step 7):**
- Starting Equipment options (Option A specific gear vs Option B gold value)

---

## Step 2: Background

**Reference:** `backgrounds-and-origin-feats-dossier.md`

Choose a background. Then record the following.

**Record now:**
- Skill Proficiencies (2 skills — add to those from Step 1)
- Tool Proficiency (1 tool)
- Origin Feat — choose and record now
  - If **Magic Initiate**: choose your spell list and spellcasting ability now, but defer the actual cantrip and spell picks to Step 6
  - All other Origin Feats can be fully resolved now
- Ability Score Increases — note which three scores and which option (two scores +2/+1, or all three +1), but **do not apply them yet** (Step 4)

**Hold until after Step 3:**
- Your 2 Language choices — wait until you've chosen your species, as you'll likely want one language to reflect your species background

**Record for later (Step 7):**
- Starting Equipment options (Option A specific gear vs Option B 50 GP)

> **Note (Rogue only):** Now that you have both class and background skill proficiencies, go back and finalise your Expertise choices from all skills you're proficient in.

---

## Step 3: Species

**Reference:** `species-and-languages-dossier.md`

Choose a species. Then resolve:

**Record now:**
- Size and Speed
- All fixed species traits
- Any internal species choices:
  - **Elf**: choose lineage (Drow / High Elf / Wood Elf) and spellcasting ability for racial cantrips
  - **Tiefling**: choose legacy (Abyssal / Chthonic / Infernal) and spellcasting ability
  - **Goliath**: choose Giant Ancestry boon
  - **Gnome**: choose lineage (Forest / Rock)
  - **Dragonborn**: choose Draconic Ancestry (damage type)
  - **Aasimar**: no choice needed at Level 1 (Celestial Revelation unlocks at Level 3)
  - **Human**: choose your bonus Origin Feat from the Versatile trait (this is in addition to the one from your Background)

**Now make your 2 Language choices** (from your Background) — pick from the Standard Languages table, informed by your species, your background flavour, and the campaign setting.

> **Species no longer grants bonus languages in 2024.** All language choices come from your Background.

---

## Step 4: Ability Scores

Assign your six ability scores using whichever method the DM has chosen (Standard Array, Point Buy, or rolled). Then apply your Background's Ability Score Increases.

**Standard Array:** 15, 14, 13, 12, 10, 8 — assign one to each ability score before applying increases.

**After assigning and applying increases:**
- Check no score exceeds 20
- Note modifiers for all six scores: modifier = floor((score − 10) / 2)

---

## Step 5: Calculate Derived Numbers

Now that you have ability scores, calculate:

| Stat | Formula |
|---|---|
| **Proficiency Bonus** | +2 at Level 1 |
| **HP** | Hit Die maximum (e.g. d10 = 10) + CON modifier. Add +1 if Dwarven Toughness; add 2 if Tough feat |
| **Initiative** | DEX modifier (add +PB if Alert feat) |
| **Passive Perception** | 10 + WIS modifier (add +PB if proficient in Perception) |
| **Saving Throw mods** | Ability modifier + PB if proficient |
| **Skill mods** | Ability modifier + PB if proficient; +PB again for Expertise |
| **Spell Save DC** *(casters)* | 8 + PB + spellcasting ability modifier |
| **Spell Attack Bonus** *(casters)* | PB + spellcasting ability modifier |
| **AC** | Depends on armour — can estimate now, finalise at Step 7 |

---

## Step 6: Spell Choices *(spellcasting characters only)*

**Reference:** `Spells/[class]-spell-list.md` for names; `Spells/Spell Descriptions/` for full descriptions

Work through the following for your class:

1. **Choose cantrips** — pick from your class's cantrip list, up to the count noted in Step 1
   - Cleric with Thaumaturge: one extra cantrip
   - Druid with Magician: one extra cantrip
   - Warlock with Pact of the Tome: 3 additional cantrips from any class list
   - Magic Initiate feat: 2 cantrips from the chosen list
2. **Choose Level 1 spells** — pick from your class's Level 1 spell list, up to the prepared count noted in Step 1
   - Wizard: first choose 6 spells for your Spellbook, then choose 4 to prepare from those 6
   - Magic Initiate feat (if deferred from Step 2): choose 1 Level 1 spell now
3. **Check Concentration** — you can only concentrate on one spell at a time; avoid over-loading on Concentration spells
4. **Check Ritual spells** — flag any spells with the Ritual tag, especially for Druids, Rangers, and Wizards who may want them unprepared-but-castable

---

## Step 7: Equipment

**Reference:** `equipment-dossier.md`

For each of your class and background, decide independently: take **Option A** (specific gear) or **Option B** (gold to spend freely).

**Option A — take the gear as listed** in the class/background entry.

**Option B — take the gold** and purchase from the equipment dossier. Option B gold values:

| Source | Gold |
|---|---|
| Most backgrounds | 50 GP |
| Class gold values | Listed per class (e.g. Fighter 155 GP, Wizard 55 GP) |

**After selecting gear:**
- **Weapon Masteries** — now that you know your weapons, choose which weapon types to apply your class's Weapon Mastery to (count from Step 1). Refer to the Mastery Properties section of the equipment dossier for what each mastery does.
- **Fighting Style** (Fighter) — now that you know your weapons, choose your Fighting Style feat from `feats-fighting-styles.md`
- **Finalise AC** — based on chosen armour and DEX modifier

---

## Step 8: Finishing Touches

- **Name, gender, age, appearance**
- **Personality traits, ideals, bonds, flaws** — the PHB suggests one of each, but any combination works
- **Alignment**
- **Backstory** — connections to the world, motivation for adventuring, relationship to other party members
- **Any remaining minor choices** not yet resolved

---

*End of Character Creation Guide*
