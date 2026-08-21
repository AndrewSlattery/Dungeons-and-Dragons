# THREE WAYS TO PLAY A BRAVO

## Character concepts for the homebrew Fighter (Bravo) subclass

*Built against the 2024 Player's Handbook rules in this repository, the Bravo subclass in `Homebrew/homebrew-fighter-bravo.md`, and the homebrew backgrounds and species in `Homebrew/`. Each concept is placed in one of the three regions of the shared setting (`Campaigns/unified-geography.md`), but all three port cleanly to any table.*

---

## Part 0: What the Bravo Actually Rewards

Before the concepts, the design constraints that shaped all three. Every Bravo feature scales off Intelligence and **none** of them specify a weapon, an armour category, or a range band. That is unusual — it means the subclass constrains your *ability array* tightly and your *build* barely at all. Hence three genuinely different characters.

**1. Intelligence is a second primary ability, not a dump stat.** Savvy, Calculated Violence, Cut and Run, Ready for Anything, Exploit Error, and Lethal Pragmatism all key off it. A Bravo wants INT 16 by level 3 and INT 20 by the mid-teens. Practically, that means a Bravo has *three* stats to fund (STR-or-DEX, CON, INT) and must genuinely dump the other three. All three builds below run CHA 8.

**2. Savvy grants no skill proficiencies — only two languages and a bonus.** It adds your INT modifier to Deception, Intimidation, and Insight *checks*, whether or not you are proficient. Proficiency has to come from somewhere else, and this matters: **the Fighter class skill list does not include Deception.** It has Insight, Intimidation, Persuasion, Perception, Athletics, Acrobatics, Animal Handling, History, and Survival. If you want proficiency in Deception you must take it from your background, your species, or the Skilled feat. Each of the three concepts below solves this differently.

**3. A Bravo face does not need Charisma.** Savvy adds INT to the two Charisma skills that matter for a fighter — Deception and Intimidation. Running CHA 8 costs you Persuasion, Performance, and Charisma saves, and nothing else. This is not a compromise; it is a characterisation. A Bravo lies and threatens well and *charms badly*, because their social competence is calculation rather than warmth.

**4. Second Wind stops being an emergency heal and becomes your opening move.** Calculated Violence rides on it, so you want to spend a use on turn one of most fights, at full health, to mark a target. You have 2 uses (3 at level 4, 4 at level 10), you regain one on a Short Rest, and Tactical Shift at level 5 lets the same Bonus Action reposition you half your Speed without provoking. Turn one of a Bravo's combat is almost always: Bonus Action Second Wind, mark the priority target, drift into position, attack.

**5. Action Surge stops being purely offensive and becomes your ejector seat.** Cut and Run at level 7 bolts Dash, Disengage, and +INT AC onto it. One Action Surge per Short Rest can now be spent either as a burst turn *or* as "I leave this room alive." Two uses at level 17.

**6. Ready for Anything makes the Alert feat largely redundant from level 10.** Setting an initiative floor equal to your INT score (18–20) overlaps heavily with Alert's +PB to the roll. Alert's Initiative Swap is still useful, and Alert is genuinely great at levels 1–9 — but don't spend a *general* feat on it, and don't pick a background for it if you plan to play past level 10.

**7. Exploit Error rewards being shot at and missed.** Anything that manufactures misses feeds it: the Sap mastery property, Defensive Duelist's Reaction, Cut and Run's AC spike, a high base AC, and (from level 13) Studied Attacks. This is the single feature that most changes how you build — it is why one of these three characters is a wall.

**8. Calculated Violence is per damage roll, not per turn.** "You gain a bonus to damage rolls against that creature" applies to every damage roll you make against the marked target until the end of your next turn. At level 11 with three attacks and INT 20, that is +15 damage in one turn, and it applies again on your next turn.

### Two questions to settle with your DM before session one

- **Does Tactical Mind trigger Calculated Violence?** Tactical Mind (level 2) lets you *expend a use of your Second Wind* to add 1d10 to a failed ability check. Calculated Violence triggers "when you use your Second Wind." Read strictly, the Bonus Action activation is "using Second Wind" and Tactical Mind is a different feature that merely spends the resource — but the wording is loose enough that a permissive DM could let you mark a target off a failed Insight check. Ask. It is a meaningful difference in a social-heavy campaign, and note that a *failed* Tactical Mind check doesn't expend the use at all.
- **Does Cut and Run's Dash/Disengage cost you the Action Surge action?** As written it doesn't — you gain the *benefits* of those actions in addition to the extra action, so you can Action Surge into four attacks and still move at double speed without provoking. Confirm, because it is a strong reading of a strong feature.

### The three at a glance

| | **The Sharp** | **The Provost** | **The Collector** |
|---|---|---|---|
| **Role** | Duellist / face / spike damage | Anchor / control / damage sponge | Skirmisher / scout / opener |
| **Primary** | Dexterity | Strength | Dexterity |
| **Range band** | 5 ft, and inside your guard | 5–10 ft, and not past him | 60–150 ft, and never closer |
| **Armour** | Studded leather (AC 16) | Chain mail + shield (AC 19→21) | Studded leather (AC 16) |
| **Species** | Stobor, faience *(homebrew)* | Goliath, storm giant | Halfling |
| **Background** | Gambler *(homebrew)* | Guard | Scribe |
| **Deception from** | Background | — *(Intimidation instead)* | Skilled feat |
| **Key feats** | Defensive Duelist, Skill Expert, Observant | Sentinel, Shield Master | Sharpshooter, Skulker, Observant |
| **Feature it's built around** | Savvy + Calculated Violence | Exploit Error + Cut and Run | Ready for Anything |
| **Region** | Corraith (Campaign 3) | The Fenway Coast (Campaign 1) | The Thornvael (Campaign 2) |

---
---

# CONCEPT I — THE SHARP

## Ilvet Sarrow, called "Fairweather"

**Faience Stobor · Gambler · Fighter (Bravo) · she/her · Lawful Neutral**

> *"I don't bluff. Bluffing is for people whose faces move."*

### The pitch

A card-table professional with a porcelain complexion and a painted smile that has never once changed, who solves problems by working out exactly what a person is going to do and then being somewhere else when they do it. She fights the way she plays: patiently, one clean cut at a time, having already decided who dies first. The subclass's two social features and its damage-spike feature are all doing work every single session.

This is the Bravo played as the *candlelit duel* half of the subclass's own description — the face of the party who is also its most efficient single-target killer.

### Origin and lore

Ilvet was born in the Daerrow, on the floodplain south of the Sullow Quarter, to a family of Stobor whose ancestors were glaze-figurine votives in a temple that no longer has a name. Faience lineage runs strong in her: poreless waxy skin, a flush across the cheekbones with a hard painted edge that does not blend, and three fine gold seams — genuine *kintsugi* scar tissue — running from her right jaw into her collar, where a Guild Warden-Inspector once broke her face with a cudgel and it healed the way her people heal.

She learned to count cards in Madame Oressa's houses on Lampblack Lane before she was old enough to sit at a table legally, and she learned the more important lesson there too: that her face was worth more than her hands. Stobor faces don't tell. No micro-expression, no tell, no flicker — she can hold a dead hand at a table of professionals and take the pot on presence alone. She has never needed to be charming. She has only ever needed to be *unreadable*, and correct about everyone else.

The trouble began when she got too good to be tolerated. A run at a chartered house on the Bridgeway put her across the table from a factor of the Guild of Chartered Commerce, and she took eleven hundred crowns off him over four nights. The Guild does not lose money to unlicensed persons. The cudgel came a week later, in an alley off Canal Street, and the gold in her jaw is the receipt. She has been a professional of a different sort ever since — the person you hire when a job needs someone who can sit across a table from a mark for two hours, and then, if it comes to it, kill him in a stairwell without waking the house.

She is not a criminal by temperament. She is *scrupulously* fair — she has never once cheated at cards, a point of genuine pride, because the whole argument of her life is that she wins by arithmetic and nerve rather than by trickery. She takes contracts, honours them exactly, and does not take contracts she considers dishonest. She is also entirely willing to kill for money, and sees no contradiction in this, which is the most frightening thing about her.

**What drives her to adventure:** the eleven hundred crowns were never the point. She wants the Guild's charter records — the sealed ones, in Charter Hall on Foundry Street — because she believes they will show her family's temple was dissolved for a debt that was never owed. She is building toward a job she cannot yet do.

### The build

| | |
|---|---|
| **Species** | Stobor (faience lineage), Medium, Speed 30 ft |
| **Background** | Gambler *(homebrew)* |
| **Class** | Fighter (Bravo) |
| **Alignment** | Lawful Neutral |

**Species traits.** *Stobor Lineage (Faience)* — Intelligence chosen as the spellcasting ability, which is the whole reason this species and this subclass fit: **every one of her lineage spells scales off the same stat as her subclass.** *Thaumaturgy* at level 1 (a card-room theatrical: the candles gutter when she raises), *Dissonant Whispers* at character level 3, *Suggestion* at character level 5, each once per Long Rest without a slot. *Maker's Mark* — proficiency with Glassblower's Tools and the Investigation skill. *Habitual Stillness* — Advantage on saves against Paralyzed and Petrified.

**Background.** Gambler grants the **Lucky** origin feat (Luck Points equal to Proficiency Bonus: buy Advantage on a D20 Test, or impose Disadvantage on an attack against you — note the second use also manufactures a miss, which feeds Exploit Error at level 15), proficiency in **Deception** and **Insight**, and proficiency with a Gaming Set (Playing Cards). Ability increases: **+2 DEX, +1 INT.**

#### Ability scores (27-point buy)

| Ability | Base | Cost | Background | Start | Mod |
|:---|:---:|:---:|:---:|:---:|:---:|
| STR | 8 | 0 | — | 8 | −1 |
| DEX | 15 | 9 | +2 | **17** | +3 |
| CON | 13 | 5 | — | 13 | +1 |
| INT | 15 | 9 | +1 | **16** | +3 |
| WIS | 12 | 4 | — | 12 | +1 |
| CHA | 8 | 0 | — | 8 | −1 |
| | | **27** | | | |

*Standard array alternative: 15 DEX / 14 INT / 13 CON / 12 WIS / 10 STR / 8 CHA, then +2 DEX / +1 INT → DEX 17, INT 15. One point of INT worse; take it if your table doesn't use point buy.*

*Design note on WIS 12 over CON 14.* Insight is one of the three Savvy skills and it is the one Ilvet actually lives by — she wins by reading people. The two points come out of Constitution, which is a real cost (she is a d10 class running +1 CON at level 3). She buys the hit points back at level 8. Until then she is a fragile duellist, which is correct: her defence is not being hit, not absorbing hits.

#### Level 1–3 choices

- **Fighter skills (2):** Intimidation, Perception. Combined with Deception and Insight from the Gambler background, **all three Savvy skills are proficient**, which is the whole point of pairing this background with this subclass.
- **Fighting Style:** **Dueling** (+2 damage with a one-handed melee weapon and nothing in the other hand).
- **Weapon Masteries (3):** **Rapier (Vex)**, **Dagger (Nick)**, **Light Crossbow (Slow)**.
- **Savvy languages (level 3):** Thieves' Cant and Infernal — the demimonde's trade language, and the Daerrow's.
- **Full language list:** Common, plus two from character creation (Elvish, Dwarvish), plus Thieves' Cant and Infernal from Savvy. Six languages is a lot; it is also exactly what a professional who works every quarter of a city should have.

*A rules trap worth flagging: the rapier is Finesse but **not** Light, so **rapier-plus-dagger does not give you the Light property's extra attack**. The Light extra attack requires attacking with a Light weapon and then making the extra attack with a **different** Light weapon. Her Dagger (Nick) mastery therefore only comes online in her paired-Light configuration — two daggers, or a shortsword and a dagger — which is her close-quarters and thrown-opener loadout, not her default. Default is rapier alone, one hand free, Dueling active.*

**Equipment.** Take Fighter option C (155 GP) plus Gambler option A (Playing Cards, Dagger, Fine Clothes, 2 Pouches, 31 GP) — 186 GP to spend.

| Item | Cost |
|---|---:|
| Rapier | 25 GP |
| Studded Leather Armor | 45 GP |
| 3 additional Daggers (4 total) | 6 GP |
| Light Crossbow + 20 Bolts | 26 GP |
| Explorer's Pack | 10 GP |
| Hooded Lantern | 5 GP |
| **Spent** | **117 GP** |
| **Remaining — her stake** | **69 GP** |

The remaining gold is not spare, it is her *bankroll*. She does not spend it on gear on principle: a professional who cannot buy into a game is not a professional. This is a roleplay hook with teeth — when the party needs 60 gold for bribes, there is a real decision.

#### Level 3 snapshot

| | |
|---|---|
| **AC** | 15 (Studded Leather 12 + DEX 3) |
| **HP** | 25 |
| **Initiative** | +3 |
| **Speed** | 30 ft |
| **Rapier** | +5 to hit, 1d8+5 Piercing *(DEX 3 + Dueling 2)* |
| **Second Wind** | 2 uses, 1d10+3 HP |
| **Calculated Violence** | +3 damage per damage roll against the marked creature |
| **Deception** | +4 *(−1 CHA, +2 prof, +3 Savvy)* |
| **Intimidation** | +4 |
| **Insight** | +6 *(+1 WIS, +2 prof, +3 Savvy)* |
| **Investigation** | +5 · **Passive Perception** 13 |
| **Lineage spells** | *Thaumaturgy* at will; *Dissonant Whispers* 1/Long Rest, save DC 13 |

#### Feat and ASI plan

| Level | Choice | Result |
|:---:|---|---|
| 4 | **Defensive Duelist** (+1 DEX) | DEX 18. Reaction: +PB to AC against a melee attack, and it *persists* against melee until the start of your next turn. Also add a 4th mastery: **Shortsword (Vex)**, completing the paired-Light option. |
| 6 | **Skill Expert** (+1 INT) | INT 17. Proficiency: Sleight of Hand. Expertise: **Deception**. |
| 8 | **ASI** +1 INT / +1 CON | INT 18, CON 14. The hit points arrive; the subclass hits its stride. |
| 12 | **ASI** +2 DEX | DEX 20. |
| 14 | **Observant** (+1 INT) | INT 19. Expertise: **Insight**. Search as a Bonus Action. |
| 16 | **ASI** +1 INT / +1 WIS | INT 20, WIS 13. |
| 19 | **Boon of Combat Prowess** or **Boon of Fate** | Either fits; Fate suits a gambler thematically. |

At level 8 she is DEX 18 / INT 18 with Expertise in Deception: **Deception +9, Insight +8, Intimidation +6** with Proficiency Bonus +3 and Charisma 8. That is the demonstration of principle — she is a better liar than most Bards' Persuasion, on a dumped Charisma.

#### How the Bravo features play for her

- **Savvy** is the engine of her out-of-combat identity, and the reason she works as a party face despite CHA 8. She cannot persuade anyone of anything. She lies beautifully, threatens credibly, and reads a room before she opens her mouth.
- **Calculated Violence** is turn-one, every fight: Bonus Action Second Wind, name the biggest threat, +3 (later +5) to every damage roll against it for two turns.
- **Cut and Run** (7) is her signature. She is a light-armour duellist with 16 AC — the +INT AC for a round is the difference between surviving a focus and not, and the free Disengage means she never eats an opportunity attack leaving a losing melee.
- **Ready for Anything** (10) means she acts first in essentially every combat, which for a spike-damage duellist means marking and opening before the enemy has a turn.
- **Exploit Error** (15) pairs directly with Defensive Duelist: she *makes* enemies miss with her Reaction, then gets +INT to attack them for it.
- **Lethal Pragmatism** (18) is 4–5 maximised rapier hits per Short Rest, free against anything Grappled or Restrained by an ally.

#### Signature turn (level 7)

INT 17, DEX 18, PB +3. AC 16. **Bonus Action:** Second Wind — heal 1d10+7, mark the captain, and Tactical Shift five feet to break line of sight from the crossbowman. **Action:** Attack twice with the rapier, +7 to hit, 1d8+9 each *(DEX 4 + Dueling 2 + Calculated Violence 3)*; the first hit's Vex gives Advantage on the second. **Action Surge → Cut and Run:** two more attacks, AC rises to 19 for the round, and she has Dash and Disengage banked — so after four attacks she walks out of the melee at 60 feet of movement without provoking, and stands somewhere the room cannot reach her.

Four attacks at an average of 13.5 damage each, a heal, a reposition, and an exit, in one turn.

#### What this build gives up

No Persuasion and no Charisma saves. No meaningful ranged damage — the light crossbow is a utility, not a plan. AC 16 is the ceiling until magic items arrive, and she has one Reaction that Defensive Duelist wants every round, so she can never also be the party's opportunity-attack threat. And she is genuinely squishy from levels 3 to 8. She is played correctly by being the one who decides where the fight happens.

#### Roleplay

- **Personality:** Precise, quiet, faintly amused. Answers questions with the smallest true sentence available. Sits very still — Stobor still, the unnerving kind, no breathing, no shifting.
- **Ideal:** *Arithmetic.* The world is legible if you are patient enough to count it.
- **Bond:** The sealed charter records in Charter Hall, and the temple her ancestors were made for.
- **Flaw:** She cannot let a debt stand — hers or anyone's. It has cost her more than the eleven hundred crowns ever did.
- **Trinket suggestion:** A deck of cards with one card missing, and no memory of which.
- **The gold in her jaw** is a conversation the DM can restart at any time.

---
---

# CONCEPT II — THE PROVOST

## Danek Ten-Count, of Greymantle

**Goliath (storm giant ancestry) · Guard · Fighter (Bravo) · he/him · Lawful Good**

> *"Ten. That's how long you've got to put it down."*

### The pitch

Seven and a half feet of highland Goliath in chain mail and a shield, who is not the party's muscle — he is the party's *arithmetic*. He stands in the doorway, makes enemies swing at him, and gets measurably better every time they miss. This is the Bravo built inside out: instead of avoiding damage, he courts attacks, because from level 15 every miss against him is a bonus to his own attacks.

This is the Bravo played as the *back-alley brawl* half of the description — the professional who has worked out that the cheapest way to win a fight is to make it happen where he chooses, and then not move.

### Origin and lore

Danek was born in Greymantle Keep, the highland Goliath settlement on the ridge above Stoneveil Reach — stone-built, practical, storm giant blood running through the old bloodlines and manifesting unevenly. It manifests in Danek as a low static charge in bad weather and a thunderclap that answers anyone who hurts him. His family expected him to go into stone or metal, as most of the Keep's sons do; Orrath Stone-Handed had gone down to Ashford twenty years earlier and there was a track worn in that direction.

Danek took the other road. He went down to the coast and hired on with the Fenway road's caravan trade as a guard, and he was, at first, a mediocre one. He was strong and slow and got hit a great deal. What changed him was a winter at Brindlemark where the walls got tested three times, and an old sergeant of the town watch — a human woman with two fingers and forty years — who told him the thing that reorganised his life: *most fights are decided before anyone swings, and the deciding is done by whoever understands the ground.*

So he learned to count. Doorways, sightlines, how long a hired blade will keep committing to a target he cannot hurt, how many seconds until the other side's nerve breaks. The name "Ten-Count" comes from a night at the Drover's Track junction when four men came at a grain wagon and he stood in the gap between the wagon and the wall and counted out loud while they tried to get past him. He reached ten. They did not get past him. The story travels the Fenway road better than he does.

He is now what the road communities call a provost — not a formal office, more a reputation. Caravan masters hire him. Villages without a constable send for him. He knows every inn between Kelstead Port and Thornwater and is owed favours at most of them. He is scrupulous about the difference between authority and force, having watched people who confuse the two, and he will explain that difference at length to anyone who lets him, which is his single most irritating quality.

**What drives him to adventure:** the road has been getting worse. Not dramatically — a shipment that never arrived, a stretch where the drovers won't camp any more, a harbour-master at Thornwater keeping unusually careful records. Danek has been counting, and the numbers have stopped adding up. He wants to know who is doing the subtraction.

### The build

| | |
|---|---|
| **Species** | Goliath (storm giant ancestry), Medium (7–8 ft), Speed 35 ft |
| **Background** | Guard |
| **Class** | Fighter (Bravo) |
| **Alignment** | Lawful Good |

**Species traits.** *Giant Ancestry — Storm's Thunder:* when a creature within 60 feet damages him, Reaction to deal 1d8 Thunder back, PB times per Long Rest. This is thematically perfect for the build (he punishes contact) and mechanically fine, though note it competes with Sentinel for his Reaction — see the design note below. *Large Form* at character level 5: Bonus Action to become Large for 10 minutes, Advantage on Strength checks, +10 Speed. *Powerful Build:* Advantage on saves to end Grappled, and counts as one size larger for carrying capacity.

**Background.** Guard grants the **Alert** origin feat, proficiency in **Athletics** and **Perception**, and a Gaming Set (Dice). Ability increases: **+1 STR, +2 INT.**

*Design note on the split.* Taking +1 STR / +2 INT rather than the usual +2 / +1 produces STR 16 (+3) and INT 16 (+3) instead of STR 17 (+3) and INT 15 (+2) — identical Strength modifier, one better Intelligence modifier, for free. On a Bravo this is almost always the right call. Check your background's odd/even maths before defaulting to +2 in your attack stat.

*Design note on Alert.* Guard hands it to you whether you want it or not, and it is excellent from level 1 to 9 (this build has DEX 10, so Alert *is* his initiative). From level 10, Ready for Anything sets his initiative floor at his INT score and Alert's main benefit becomes marginal — but Initiative Swap stays useful, letting him hand his high initiative to the party's nuker. If you'd rather not have the overlap at all, **Miner** *(homebrew — STR/CON/INT, Tough feat, Athletics and Nature, Mason's Tools)* is a strictly reasonable swap: the Fenway highlands run to stone work, Tough is worth 2 HP per level on a character built to be hit, and the ability spread is the only one in the book that natively covers STR/CON/INT.

#### Ability scores (27-point buy)

| Ability | Base | Cost | Background | Start | Mod |
|:---|:---:|:---:|:---:|:---:|:---:|
| STR | 15 | 9 | +1 | **16** | +3 |
| DEX | 10 | 2 | — | 10 | +0 |
| CON | 14 | 7 | — | **14** | +2 |
| INT | 14 | 7 | +2 | **16** | +3 |
| WIS | 10 | 2 | — | 10 | +0 |
| CHA | 8 | 0 | — | 8 | −1 |
| | | **27** | | | |

DEX 10 is deliberate: he is in heavy armour, so Dexterity contributes nothing to his AC, and the points buy Constitution and Intelligence instead. The cost is Dexterity saving throws, which is a real and permanent weakness — see "What this build gives up."

#### Level 1–3 choices

- **Fighter skills (2):** **Insight** and **Intimidation** — with Athletics and Perception from Guard, this puts him at proficiency in two of the three Savvy skills. He is deliberately *not* proficient in Deception. Danek does not lie. He reads people and he leans on them, and that is the whole social kit.
- **Fighting Style:** **Defense** (+1 AC). Considered and rejected: *Protection* imposes Disadvantage on attacks against an adjacent ally, which is on-theme — but Exploit Error only triggers when a creature misses **you**, so raising your own AC feeds the engine and raising an ally's doesn't. *Interception* is the better of the two alternatives if your table is short on healing.
- **Weapon Masteries (3):** **Flail (Sap)**, **Warhammer (Push)**, **Javelin (Slow)**.
- **Savvy languages (level 3):** Giant and Dwarvish — the Keep's ancestral tongue, and the language of the holds south along the ridge.

*Why the flail.* Sap is the entire build in one property: hit a creature, and it has Disadvantage on its next attack roll before the start of your next turn. Disadvantage manufactures misses; misses against him become +INT to his attack rolls at level 15. **Sap → they miss → Exploit Error** is a closed loop that no other Fighter subclass gets to run. Warhammer's Push and Javelin's Slow give him movement control at 5 feet and at 30. From level 9, Tactical Master lets him convert *any* weapon's mastery into Push, Sap, or Slow at will, so his picks become flexible and the flail simply stays in his hand because it is the one he likes.

**Equipment.** Fighter option A (Chain Mail, Greatsword, Flail, 8 Javelins, Dungeoneer's Pack, 4 GP) plus Guard option A (Spear, Light Crossbow, 20 Bolts, Dice, Hooded Lantern, Manacles, Quiver, Traveler's Clothes, 12 GP). Buy a **Shield (10 GP)** from the 16 GP. Sell the greatsword he will never use (equipment fetches half price, so 25 GP) and buy ball bearings, a second bag of caltrops, and 50 more feet of rope — a provost's ground-shaping kit.

#### Level 3 snapshot

| | |
|---|---|
| **AC** | **19** (Chain Mail 16 + Shield 2 + Defense 1) |
| **HP** | 28 |
| **Initiative** | +2 *(DEX 0 + Alert PB)* |
| **Speed** | 35 ft |
| **Flail** | +5 to hit, 1d8+3 Bludgeoning, **Sap** |
| **Javelin** | +5 to hit, 1d6+3 Piercing at 30/120, **Slow** |
| **Second Wind** | 2 uses, 1d10+3 HP |
| **Calculated Violence** | +3 damage per damage roll against the marked creature |
| **Storm's Thunder** | Reaction, 1d8 Thunder, 2/Long Rest |
| **Athletics** | +5 · **Intimidation** +4 · **Insight** +5 · **Perception** +2 |

AC 19 at level 3 is high enough that most level-appropriate attackers miss him more often than they hit. That is not incidental — it is the resource the rest of the build spends.

#### Feat and ASI plan

| Level | Choice | Result |
|:---:|---|---|
| 4 | **Sentinel** (+1 STR) | STR 17. Opportunity attacks against anyone who Disengages or hits someone else near him; on hit, their Speed drops to 0. This is the level his job description becomes literal. 4th mastery: **Handaxe (Vex)** for a thrown option. |
| 6 | **Shield Master** (+1 STR) | STR 18. Shield Bash knocks targets Prone (Advantage for the whole party) and Interpose Shield turns his worst saving throw category into a survivable one. |
| 8 | **ASI** +2 INT | INT 18. |
| 12 | **ASI** +2 STR | STR 20. |
| 14 | **ASI** +2 INT | INT 20. Exploit Error and Cut and Run both hit +5. |
| 16 | **ASI** +2 CON | CON 16. Or **Heavy Armor Master** (+1 CON, reduce all bludgeoning/piercing/slashing by PB) if the campaign's damage is mostly mundane. |
| 19 | **Boon of Fortitude** or **Boon of Irresistible Offense** | |

Armour upgrades matter more to this character than to most: Splint (200 GP) takes him to AC 20 and Plate (1,500 GP) to AC 21. Buying plate should be a mid-campaign goal with narrative weight.

*Note on his Reaction economy.* Sentinel, Storm's Thunder, and Interpose Shield all want the same Reaction, and he only has one per round. This is a feature, not a bug — every round he chooses between punishing someone who tried to walk past him, answering the creature that hurt him, and negating a fireball. Making that choice well *is* playing this character.

#### How the Bravo features play for him

- **Savvy** on Intimidation and Insight, at INT +3 rising to +5, on a seven-and-a-half-foot Goliath with proficiency in both. He is the party's interrogator and its lie detector, and he cannot deceive anyone at all.
- **Calculated Violence** marks whoever he has decided is the actual problem, and the +INT applies to every attack he lands on it across two turns.
- **Cut and Run** (7) is his panic button *and* his repositioning tool: AC 19 becomes 22 for a round, and the free Dash plus Disengage lets a heavy-armour character abandon a bad position at 70 feet without provoking. For a character whose entire job is holding a spot, the ability to *change which spot* once per short rest is worth more than the extra attacks.
- **Ready for Anything** (10) fixes a DEX 10 character's worst structural weakness. He will act on initiative 18 and then 20 for the rest of his career.
- **Exploit Error** (15) is the payoff. At AC 21 with Sap up, enemies miss him constantly, and each miss is +5 to his attack rolls against them until the end of his next turn. Against a boss that focuses him — which bosses do, because he is standing in the way — he becomes progressively more accurate the longer the fight runs.
- **Lethal Pragmatism** (18) is 5 maximised flail hits per Short Rest, and free against anything Grappled by the party or Restrained. Shield Master's prone-knock sets up the party's grapplers to hand him those free uses.

#### Signature turn (level 7)

STR 18, INT 16, PB +3. AC 19. The party is falling back down a stair; he is the last one on it. **Bonus Action:** Second Wind, heal 1d10+7, mark the ogre. **Action:** Attack twice, +7 to hit, 1d8+7 each *(STR 4 + Calculated Violence 3)*; Sap on each hit means the ogre swings at Disadvantage. **Action Surge → Cut and Run:** he doesn't take the extra attacks — he takes the AC. AC 22 for the round, and he backs up the stair at 70 feet of movement without provoking, holding the choke the whole way. **Reaction:** anyone who tries to follow past him eats a Sentinel opportunity attack and their Speed drops to 0.

The party gets out. Nobody follows. That's the character.

#### What this build gives up

Dexterity saving throws are bad and stay bad (+0, and Indomitable at level 9 is the only patch until Shield Master at 6 covers the half-damage cases). Disadvantage on Stealth in chain mail means the party's stealth plans route around him, permanently. No Deception. Effectively no ranged damage beyond thrown javelins. And a genuine tempo problem at levels 3–6, before Sentinel and Shield Master arrive, where he is just a high-AC fighter who hits slightly harder than average — this build's power curve starts late and does not stop climbing.

#### Roleplay

- **Personality:** Deliberate to the point of exasperating. Answers slowly. Counts out loud when he's under pressure, which people find either reassuring or unbearable.
- **Ideal:** *Order without authority.* Someone has to keep the road safe; nobody appointed him; he does it anyway and is suspicious of anyone who wants the job made official.
- **Bond:** Greymantle Keep, which he has not been back to in nine years, and a debt to a two-fingered watch sergeant in Brindlemark who is now too old to work.
- **Flaw:** He will not leave a position he has decided to hold, including when leaving is obviously correct.
- **Trinket suggestion:** A tally-stick with forty-one notches, meaning unknown to everyone including him.

---
---

# CONCEPT III — THE COLLECTOR

## Wenna Crole, Clerk of the Thornvael Assize

**Halfling · Scribe · Fighter (Bravo) · they/them · Neutral Good**

> *"You have been served. Please don't run; I've had a long week and I'm a very good shot."*

### The pitch

A three-foot circuit clerk with a longbow, a warrant satchel, and an unbeatable initiative score, who fights every single combat from a hundred feet away and has already left by the time anyone works out where the arrows came from. This is the Bravo built around **Ready for Anything** — the most quietly transformative feature in the subclass — and around the observation that a Bravo does not have to be in melee to outfox anybody.

This is the Bravo as *professional*: not a duellist, not an enforcer, but the person the system sends when someone needs collecting.

### Origin and lore

The Thornvael has no standing court. Twice a year the assize rides the road from Kettleford down through Briar's Crossing to Ashgrove and back, hearing what has accumulated: land disputes, livestock, the occasional serious matter. Wenna Crole has clerked that circuit for eleven years. They keep the roll, they take the depositions in a small immaculate hand, they know every dispute in the region and most of the reasons behind them, and — because the assize has no bailiff and Constable Aldra Venn has one jurisdiction and no time — they also serve the warrants.

They did not intend to become the second thing. It happened gradually, the way it does: a man declined to appear, and someone had to go and get him, and Wenna was the one who knew where he'd be. They took a bow because a halfling clerk walking alone on the Thornvael road with a satchel of legal instruments is an obvious mark, and then they got good with it, and then they got *known*. Nobody in the lowlands calls them the bailiff. They're "the Collector," and the joke is that they collect three things: testimony, debts, and people.

They are extremely good at the work for reasons that have nothing to do with the bow. Eleven years of depositions means they have read more liars than anyone in the region. They can tell you which families in Kettleford have been feuding since before the bridge was rebuilt, and why the Ashgrove valley Orcs won't bring a dispute to the assize, and exactly which page of which roll would prove it. The bow is the last thing they use, and it is the only thing anyone remembers.

The last two circuits have been wrong. Depositions from the western farms describing things that don't happen. A shuttered market at Greenwild Edge, and traders from Mosshallow who simply didn't come. Wenna filed it all correctly, because that is the job, and then read the filings back to back and realised the roll was describing something nobody had said out loud. They have taken leave from the circuit that they did not, strictly speaking, request.

**What drives them to adventure:** the record is incomplete, and Wenna Crole finds incomplete records intolerable. Underneath that is something they'd deny — eleven years of writing down other people's lives, and a growing suspicion that they have been the clerk of the story rather than in it.

### The build

| | |
|---|---|
| **Species** | Halfling, Small, Speed 30 ft |
| **Background** | Scribe |
| **Class** | Fighter (Bravo) |
| **Alignment** | Neutral Good |

**Species traits.** *Brave* (Advantage against Frightened), *Halfling Nimbleness* (move through the space of any larger creature — a genuine escape tool for a Small skirmisher who gets surrounded), *Luck* (reroll a natural 1 on any D20 Test), *Naturally Stealthy* (can Hide when obscured only by a larger creature — i.e. behind their own party's front line, in the middle of a fight).

*Note: 2024's Heavy property keys off ability scores, not size — Heavy ranged weapons need DEX 13+, which Wenna comfortably exceeds. A Small character wields a longbow with no penalty under these rules.*

**Background.** Scribe grants the **Skilled** origin feat, proficiency in **Investigation** and **Perception**, and Calligrapher's Supplies. Ability increases: **+2 DEX, +1 INT.**

**Skilled feat choices: Stealth, Deception, Insight.** This is how this build solves the Savvy proficiency problem — Skilled is the most flexible source of Deception in the game, and Scribe is the only background that hands it to you alongside a DEX/INT spread. Combined with Savvy, Wenna is proficient in all three Savvy skills *and* Stealth, from a background whose flavour is "writes things down."

#### Ability scores (27-point buy)

| Ability | Base | Cost | Background | Start | Mod |
|:---|:---:|:---:|:---:|:---:|:---:|
| STR | 8 | 0 | — | 8 | −1 |
| DEX | 15 | 9 | +2 | **17** | +3 |
| CON | 14 | 7 | — | **14** | +2 |
| INT | 15 | 9 | +1 | **16** | +3 |
| WIS | 10 | 2 | — | 10 | +0 |
| CHA | 8 | 0 | — | 8 | −1 |
| | | **27** | | | |

#### Level 1–3 choices

- **Fighter skills (2):** Survival and Acrobatics. Final skill list: Investigation, Perception, Stealth, Deception, Insight, Survival, Acrobatics — seven proficiencies at level 1, which is Rogue territory and exactly right for a character whose competence is *knowing things*.
- **Fighting Style:** **Archery** (+2 to ranged attack rolls). At level 3 that is +7 to hit with a longbow, which is absurd and entirely the point.
- **Weapon Masteries (3):** **Longbow (Slow)**, **Shortsword (Vex)**, **Dagger (Nick)**.
- **Savvy languages (level 3):** Sylvan and Gnomish — the Greenwild's older tongue, and Mosshallow's.

*Why Slow on the longbow.* Hit a creature and its Speed drops 10 feet until the start of your next turn. On a character whose whole plan is *never let them reach me*, that is the mastery property doing the most work in the game. Combined with 30 feet of Speed, Cut and Run's free Dash, and Halfling Nimbleness, a Slowed melee enemy essentially cannot close on Wenna without spending its entire turn on it — during which it isn't attacking anyone.

**Equipment.** Fighter option B (Studded Leather, Scimitar, Shortsword, Longbow, 20 Arrows, Quiver, Dungeoneer's Pack, 11 GP) plus Scribe option A (Calligrapher's Supplies, Fine Clothes, Lamp, 3 flasks of Oil, 12 sheets of Parchment, 23 GP). From the 34 GP: 2 Daggers (4 GP), Manacles (2 GP), 60 additional Arrows (3 GP), Hooded Lantern (5 GP), Signal Whistle (5 CP), Caltrops (1 GP). Roughly 19 GP left over and a warrant satchel that is not, mechanically, anything at all, but which every NPC in the Thornvael recognises on sight.

#### Level 3 snapshot

| | |
|---|---|
| **AC** | 15 (Studded Leather 12 + DEX 3) |
| **HP** | 28 |
| **Initiative** | +3 |
| **Speed** | 30 ft |
| **Longbow** | **+7** to hit, 1d8+3 Piercing, 150/600 ft, **Slow** |
| **Shortsword** | +5 to hit, 1d6+3 Piercing, **Vex** |
| **Second Wind** | 2 uses, 1d10+3 HP |
| **Calculated Violence** | +3 damage per damage roll against the marked creature |
| **Stealth** | +5, plus *Naturally Stealthy* |
| **Deception** | +4 · **Insight** +5 · **Investigation** +5 · **Perception** +2 |

#### Feat and ASI plan

| Level | Choice | Result |
|:---:|---|---|
| 4 | **Sharpshooter** (+1 DEX) | DEX 18. Ignores Half and Three-Quarters Cover, no Disadvantage at long range, no Disadvantage shooting from inside melee. This last one matters enormously: it removes the archer's classic failure mode. 4th mastery: **Handaxe (Vex)** for thrown work. |
| 6 | **ASI** +2 INT | INT 18. |
| 8 | **Skulker** (+1 DEX) | DEX 19. Blindsight 10 ft, Advantage on Hide checks made in combat, and a *missed* attack from hiding doesn't reveal your position. With Naturally Stealthy, Wenna can hide behind an ally, shoot, miss, and stay hidden. |
| 12 | **ASI** +1 DEX / +1 INT | DEX 20, INT 19. |
| 14 | **Observant** (+1 INT) | INT 20. Expertise in **Perception**; Search as a Bonus Action. |
| 16 | **ASI** +2 CON | CON 16. |
| 19 | **Boon of Speed** or **Boon of the Night Spirit** | Both extend the "never be where they are" thesis. |

#### How the Bravo features play for them

- **Ready for Anything** (10) is *the* feature for this character and the reason to build them. INT 18 rising to 20 means Wenna's initiative is never below 18. An archer who acts first, every fight, before the enemy has closed a single foot of distance, gets a completely free round of damage at maximum range in essentially every encounter. Over a campaign this is worth more than any single combat feat.
- **Calculated Violence** turns that free round into a kill. Second Wind on turn one, mark the enemy caster, and every arrow that lands on it for the next two turns carries +INT.
- **Cut and Run** (7) is kiting made mechanical: Action Surge for four arrows *and* a free Dash *and* Disengage *and* +INT AC. Wenna can be surrounded, put four arrows into the room, and end the turn 60 feet away in cover having provoked nothing.
- **Savvy** makes them the party's deposition-taker. Insight at +5 rising to +9 is how a clerk gets to be right about people, and it is not an accident that this build's social kit is *reading* and *lying* rather than persuading.
- **Exploit Error** (15) is honestly the weakest feature for this build, and it should be said plainly: it triggers on attacks that miss *you*, and a well-played archer is rarely attacked. It still fires against enemy archers and spell attacks, and it fires the moment anything does close on them. Treat it as a consolation prize for a bad round.
- **Lethal Pragmatism** (18) is 5 maximised longbow hits per Short Rest, free against anything the party has Restrained or Blinded — which, on an archer, is exactly the setup a caster ally is already providing.

#### Signature turn (level 10)

DEX 19, INT 18, PB +4. Initiative floor 18 — they act first. **Bonus Action:** Second Wind, mark the ritualist across the clearing, Tactical Shift 15 feet into the treeline. **Action:** Attack twice, +10 to hit at 140 feet through cover *(Sharpshooter ignores it)*, 1d8+8 each *(DEX 4 + Calculated Violence 4)*; Slow on each hit strips 10 feet from anyone trying to reach them. **Action Surge → Cut and Run:** two more arrows, AC 20 for the round, then Dash out to 60 feet of new distance and Hide with Advantage.

Four arrows before the enemy has taken a turn, from a position nobody can identify, followed by relocation.

#### What this build gives up

Genuinely bad in melee — STR 8, a shortsword as a fallback, and Disadvantage shooting from inside melee until Sharpshooter fixes it at level 4. 28 HP at level 3 in light armour means one bad positioning error is lethal. Small size limits carrying capacity and puts a lot of terrain out of reach. And this build depends completely on the map having range in it — in a dungeon of ten-foot corridors, Wenna is a mediocre fighter with a lot of skills. Discuss the campaign's typical encounter geography with your DM before committing.

#### Roleplay

- **Personality:** Dry, procedural, unfailingly polite, and completely unmoved by anyone's opinion of the procedure. Writes everything down, including things people would rather they didn't.
- **Ideal:** *The record.* What happened should be known accurately. Everything else is negotiable.
- **Bond:** The Thornvael circuit roll, eleven years of it, currently in a locked chest in Kettleford that they did not have permission to leave.
- **Flaw:** Constitutionally incapable of letting an inconsistency go, including at the worst possible moments, including out loud, including to people holding weapons.
- **Trinket suggestion:** A deposition, taken four years ago, from a witness who does not appear in any parish record and whose name Wenna cannot now read.

---
---

## Part 4: Choosing Between Them

**Play the Sharp** if you want the Bravo's social features to be the reason you picked the subclass, you want to be the party's face without playing a Charisma class, and you enjoy characters whose combat contribution is precise rather than large. She is the most *fun* of the three out of combat and the most fragile in it.

**Play the Provost** if you want the subclass's late features to feel like a payoff, you like tactical positioning more than damage numbers, and you're comfortable with a build whose power curve starts slow and doesn't peak until level 15. He is the most durable, the most reliable, and the most likely to be the reason the party survives a bad encounter.

**Play the Collector** if you want to act first in every combat for the rest of the campaign, you like skill breadth, and you want a build where the subclass's most underrated feature — a guaranteed 18–20 initiative — quietly determines the shape of every fight. They are the highest-skill-count, highest-tempo, lowest-margin-for-error option of the three.

All three want the same two things settled at session zero: **the Tactical Mind / Calculated Violence question**, and **whether Cut and Run's Dash and Disengage stack with the Action Surge action**. Everything else is preference.
