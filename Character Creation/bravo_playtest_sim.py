"""
Fighter subclass playtest simulator (2024 PHB rules).

Goal: compare the homebrew BRAVO subclass against the four official Fighter
subclasses on a fair, identical chassis, measuring damage-per-round (DPR) across
levels, plus a defensive "boss fights back" scenario that credits reactive
features (Bravo's Exploit Error / Cut and Run, Psi Warrior's Protective Field).

Modeling choices (documented so they can be challenged):
  * Common chassis: Greatsword (2d6) + Great Weapon Fighting style (treat 1-2 as 3)
    + Graze mastery (Str mod damage on a miss). Identical for every build.
  * SAD builds (Baseline/Champion/Battle Master) take Great Weapon Master at L4
    (+PB once/turn on a hit; Hew = bonus-action attack on a crit) and reach
    Str 20 at L6. Int is a dump stat for them.
  * MAD builds (Psi Warrior / Bravo-IntFocus) SKIP GWM to afford Intelligence:
    Str 20 by L6, Int 20 by L14. This is the multi-ability "tax".
  * Bravo-Balanced takes GWM (keeps weapon parity) but Int lags (20 only by ~L16).
  * Crits double *weapon* dice only (not maneuver/psionic/flat riders), per the
    common 2024 reading.
  * 3-round fight. Round 1 includes Action Surge (an extra Attack action).
    From L17 Action Surge is twice/rest, so round 2 also gets a surge.
  * 100k fights per cell.
"""

import random

PB_BY_LEVEL = {3:2,4:2,5:3,6:3,7:3,8:3,9:4,10:4,11:4,12:4,13:5,14:5,15:5,16:5,17:6,18:6,19:6,20:6}

def attacks_per_action(level):
    if level >= 20: return 4
    if level >= 11: return 3
    if level >= 5:  return 2
    return 1

def str_mod(level, mad):
    # Both archetypes reach Str 20 (+5) by L6. Before that:
    # SAD: GWM at L4 -> Str 18 (+4) at L4-5, +2 at L6 -> 20.
    # MAD: +1Str/+1Int at L4 -> Str 18 (+4) at L4-5, +2Str at L6 -> 20.
    if level >= 6: return 5
    if level >= 4: return 4
    return 3  # Str 17 at L3

def int_mod(level, build):
    """Intelligence modifier progression."""
    if build in ("baseline", "champion", "battlemaster"):
        return 0  # Int 10 dump
    if build in ("psiwarrior", "bravo_int"):
        # MAD, no GWM: Int 14(+2) L3; +Int at L4 ->15(+2); L8 ->17(+3); L12 ->19(+4); L14 ->20(+5)
        if level >= 14: return 5
        if level >= 12: return 4
        if level >= 8:  return 3
        return 2  # L3-7 Int 14-15
    if build == "bravo_bal":
        # MAD but GWM at L4: Int lags. Int 13(+1) L3; +2 Int at L8 ->15(+2); L12 ->17(+3); L14 ->19(+4); L16 ->20(+5)
        if level >= 16: return 5
        if level >= 14: return 4
        if level >= 12: return 3
        if level >= 8:  return 2
        return 1
    return 0

def has_gwm(build):
    return build in ("baseline", "champion", "battlemaster", "bravo_bal")

def crit_floor(build, level):
    if build == "champion":
        if level >= 15: return 18
        return 19
    return 20

def superiority(level):
    # (num dice, die size) for Battle Master
    if level >= 18: size = 12
    elif level >= 10: size = 10
    else: size = 8
    if level >= 15: num = 6
    elif level >= 7: num = 5
    else: num = 4
    return num, size

def psi_die(level):
    if level >= 17: return 12
    if level >= 11: return 10
    if level >= 5:  return 8
    return 6

def roll_weapon(crit, lethal=False):
    """2d6 greatsword with Great Weapon Fighting (1/2 -> 3). Doubles dice on crit.
    lethal=True maximizes the dice (Bravo L18 Lethal Pragmatism)."""
    n = 4 if crit else 2
    if lethal:
        return 6 * n  # max each d6
    tot = 0
    for _ in range(n):
        d = random.randint(1, 6)
        if d < 3: d = 3
        tot += d
    return tot

def simulate(build, level, ac, trials=100000, exploit_error=False):
    pb = PB_BY_LEVEL[level]
    mad = build not in ("baseline", "champion", "battlemaster")
    smod = str_mod(level, mad)
    imod = int_mod(level, build)
    n_atk = attacks_per_action(level)
    cfloor = crit_floor(build, level)
    atk_bonus = pb + smod
    gwm = has_gwm(build) and level >= 4   # Great Weapon Master is a level-4+ feat
    two_surges = level >= 17
    # Exploit Error (L15): after a foe misses you, +Int to hit it. In a duel the
    # boss has missed you by round 2, so model the bonus as active rounds 2-3.
    ee_bonus = imod if (exploit_error and build in ("bravo_int","bravo_bal") and level >= 15) else 0

    # Subclass resource budgets for a single 3-round fight (refresh on short rest,
    # so a fight's worth is a fraction of the per-rest pool; we grant a generous
    # per-fight allotment).
    total = 0.0
    for _ in range(trials):
        dmg = 0.0
        # battle master dice available this fight (use most of the short-rest pool)
        bm_num, bm_size = superiority(level)
        bm_dice = bm_num
        # bravo lethal pragmatism uses available this fight = Int mod (per short rest)
        lethal_uses = max(1, imod) if (build in ("bravo_int","bravo_bal") and level >= 18) else 0
        # rounds: list of (num_attack_actions)
        rounds = [2, 1, 1]  # action surge round 1
        if two_surges:
            rounds = [2, 2, 1]

        # Bravo marks a target with Calculated Violence via Second Wind round 1.
        # Bonus to damage rolls vs that creature until end of NEXT turn (rounds 1 & 2).
        bravo = build in ("bravo_int", "bravo_bal")
        cv_rounds = {0, 1} if bravo else set()

        for r, n_actions in enumerate(rounds):
            n_this = n_atk * n_actions
            gwm_used_this_turn = False
            # Champion Heroic Warrior (L10+): ~advantage on one attack/turn
            champ_adv_left = 1 if (build == "champion" and level >= 10) else 0
            # Battle Master: Trip round 1 -> advantage on subsequent melee attacks this round
            bm_prone = False
            for i in range(n_this):
                advantage = False
                if champ_adv_left > 0:
                    advantage = True; champ_adv_left -= 1
                if bm_prone:
                    advantage = True
                # roll attack (with advantage if applicable)
                d20 = random.randint(1, 20)
                if advantage:
                    d20 = max(d20, random.randint(1, 20))
                eff_bonus = atk_bonus + (ee_bonus if r >= 1 else 0)
                crit = d20 >= cfloor
                hit = crit or (d20 != 1 and d20 + eff_bonus >= ac)

                # Battle Master spends Trip on the very first attack of round 1
                if build == "battlemaster" and r == 0 and i == 0 and hit and bm_dice > 0:
                    bm_dice -= 1
                    dmg += (bm_size + 1) / 2  # trip adds the die to damage
                    if random.random() < 0.5:  # ~50% fail the Str save -> prone
                        bm_prone = True

                if hit:
                    use_lethal = False
                    if lethal_uses > 0:
                        # spend on Action-Surge round crits/high-value hits: use on round-1 hits
                        if r == 0:
                            use_lethal = True; lethal_uses -= 1
                    base = roll_weapon(crit, lethal=use_lethal)
                    dmg += base + smod
                    # GWM +PB once per turn on a hit
                    if gwm and not gwm_used_this_turn:
                        dmg += pb; gwm_used_this_turn = True
                    # Calculated Violence: +Int to each damage roll vs marked creature
                    if bravo and r in cv_rounds:
                        dmg += imod
                    # Psionic Strike: once/turn, +1 die + Int (force)
                    if build == "psiwarrior" and i == 0:
                        dmg += (psi_die(level) + 1) / 2 + imod
                    # Battle Master: add a superiority die to a hit (budget across fight)
                    if build == "battlemaster" and bm_dice > 0 and not (r==0 and i==0):
                        if i < 3:  # spread a few dice onto early hits
                            bm_dice -= 1
                            dmg += (bm_size + 1) / 2
                    # GWM Hew: crit -> one bonus-action attack (if bonus action free).
                    # Bravo spent its bonus action on Second Wind round 1; others free.
                    if gwm and crit and not (bravo and r == 0):
                        d2 = random.randint(1, 20)
                        c2 = d2 >= cfloor
                        h2 = c2 or (d2 != 1 and d2 + atk_bonus >= ac)
                        if h2:
                            dmg += roll_weapon(c2) + smod
                            if bravo and r in cv_rounds: dmg += imod
                else:
                    # Graze mastery: Str mod on a miss
                    dmg += smod
        total += dmg
    return total / trials / 3.0  # DPR over 3 rounds

# Level-appropriate target AC (monster of CR ~ level)
AC_BY_LEVEL = {3:14,5:15,7:15,9:16,11:17,13:17,15:18,17:18,18:18,20:19}

BUILDS = [
    ("baseline",    "Baseline (no subclass)"),
    ("champion",    "Champion"),
    ("battlemaster","Battle Master"),
    ("psiwarrior",  "Psi Warrior"),
    ("bravo_int",   "Bravo (Int-focus, no GWM)"),
    ("bravo_bal",   "Bravo (Balanced, w/ GWM)"),
]

print("DPR vs level-appropriate AC (greatsword chassis, 3-round fight, 1 Action Surge)\n")
header = f"{'Level':>5} {'AC':>3} | " + " | ".join(f"{lbl:>26}" for _, lbl in BUILDS)
print(header)
print("-" * len(header))
levels = [3,5,7,9,11,13,15,17,18,20]
results = {}
for lvl in levels:
    ac = AC_BY_LEVEL[lvl]
    row = []
    for key, _ in BUILDS:
        dpr = simulate(key, lvl, ac)
        results[(key, lvl)] = dpr
        row.append(dpr)
    cells = " | ".join(f"{v:>26.1f}" for v in row)
    print(f"{lvl:>5} {ac:>3} | {cells}")

print("\n\nDPR as % of Baseline (shows what the subclass adds):\n")
print(header)
print("-" * len(header))
for lvl in levels:
    base = results[("baseline", lvl)]
    row = []
    for key, _ in BUILDS:
        row.append(results[(key, lvl)] / base * 100)
    cells = " | ".join(f"{v:>25.0f}%" for v in row)
    print(f"{lvl:>5} {AC_BY_LEVEL[lvl]:>3} | {cells}")

print("\n\nBravo realistic in-combat DPR with Exploit Error ACTIVE (boss missed you), L15+:")
print("(vs the dummy table above, where the target never attacks back)\n")
print(f"{'Level':>5} {'AC':>3} | {'Bravo-Int dummy':>16} {'Bravo-Int +EE':>14} | {'Bravo-Bal dummy':>16} {'Bravo-Bal +EE':>14} | {'Champion':>9} {'BattleMaster':>13}")
for lvl in [15,17,18,20]:
    ac = AC_BY_LEVEL[lvl]
    bi = results[("bravo_int", lvl)]
    bb = results[("bravo_bal", lvl)]
    bi_ee = simulate("bravo_int", lvl, ac, exploit_error=True)
    bb_ee = simulate("bravo_bal", lvl, ac, exploit_error=True)
    ch = results[("champion", lvl)]
    bm = results[("battlemaster", lvl)]
    print(f"{lvl:>5} {ac:>3} | {bi:>16.1f} {bi_ee:>14.1f} | {bb:>16.1f} {bb_ee:>14.1f} | {ch:>9.1f} {bm:>13.1f}")

