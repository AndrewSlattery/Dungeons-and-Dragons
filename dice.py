#!/usr/bin/env python3
"""D&D 5e Dice Roller — programmatic, fair, and transparent."""

import random
import sys
import json


def roll_dice(num, sides):
    """Roll num dice with given number of sides."""
    return [random.randint(1, sides) for _ in range(num)]


def roll_4d6_drop_lowest():
    """Roll 4d6, drop the lowest die."""
    rolls = roll_dice(4, 6)
    dropped = min(rolls)
    total = sum(rolls) - dropped
    return {"rolls": rolls, "dropped": dropped, "total": total}


def stat_generation():
    """Generate 6 ability scores using 4d6-drop-lowest."""
    return [roll_4d6_drop_lowest() for _ in range(6)]


def ability_check(modifier, dc):
    """Roll d20 + modifier against a Difficulty Class."""
    roll = roll_dice(1, 20)[0]
    total = roll + modifier
    return {
        "roll": roll,
        "modifier": modifier,
        "total": total,
        "dc": dc,
        "success": total >= dc,
        "nat20": roll == 20,
        "nat1": roll == 1,
    }


def attack_roll(modifier, ac, advantage=False, disadvantage=False):
    """Roll d20 + modifier against AC, with optional advantage/disadvantage."""
    if advantage:
        rolls = roll_dice(2, 20)
        roll = max(rolls)
        extra = {"advantage": True, "both_rolls": rolls}
    elif disadvantage:
        rolls = roll_dice(2, 20)
        roll = min(rolls)
        extra = {"disadvantage": True, "both_rolls": rolls}
    else:
        roll = roll_dice(1, 20)[0]
        extra = {}

    total = roll + modifier
    nat20 = roll == 20
    nat1 = roll == 1
    hit = nat20 or (not nat1 and total >= ac)

    return {
        "roll": roll,
        "modifier": modifier,
        "total": total,
        "ac": ac,
        "hit": hit,
        "critical": nat20,
        "nat1": nat1,
        **extra,
    }


def damage_roll(dice_expr, bonus=0, critical=False):
    """Roll damage. dice_expr like '2d6'. If critical, double the dice."""
    parts = dice_expr.lower().split("d")
    num = int(parts[0])
    sides = int(parts[1])
    if critical:
        num *= 2
    rolls = roll_dice(num, sides)
    total = sum(rolls) + bonus
    return {
        "dice": dice_expr,
        "rolls": rolls,
        "bonus": bonus,
        "critical": critical,
        "total": total,
    }


def saving_throw(modifier, dc):
    """Roll a saving throw (mechanically identical to ability check)."""
    result = ability_check(modifier, dc)
    result["type"] = "saving_throw"
    return result


def initiative_roll(modifier):
    """Roll initiative (d20 + Dex modifier)."""
    roll = roll_dice(1, 20)[0]
    return {"roll": roll, "modifier": modifier, "total": roll + modifier}


def generic_roll(dice_expr):
    """Roll any expression like '3d8+2' or '1d4-1'."""
    bonus = 0
    dice_part = dice_expr
    if "+" in dice_expr:
        dice_part, bonus_str = dice_expr.split("+", 1)
        bonus = int(bonus_str)
    elif "-" in dice_expr and dice_expr.index("-") > 0:
        dice_part, bonus_str = dice_expr.split("-", 1)
        bonus = -int(bonus_str)

    parts = dice_part.lower().split("d")
    num = int(parts[0])
    sides = int(parts[1])
    rolls = roll_dice(num, sides)
    total = sum(rolls) + bonus
    return {"expression": dice_expr, "rolls": rolls, "bonus": bonus, "total": total}


# ---------------------------------------------------------------------------
# CLI interface
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python dice.py <command> [args...]")
        sys.exit(1)

    cmd = sys.argv[1]

    if cmd == "stats":
        results = stat_generation()
        print("=== Ability Score Generation (4d6 drop lowest) ===")
        totals = []
        for i, r in enumerate(results, 1):
            dropped_idx = r["rolls"].index(r["dropped"])
            dice_strs = []
            for j, d in enumerate(r["rolls"]):
                dice_strs.append(f"({d})" if j == dropped_idx else f" {d} ")
            print(f"  Set {i}: {', '.join(dice_strs)}  =>  {r['total']}")
            totals.append(r["total"])
        print(f"\nYour six scores: {sorted(totals, reverse=True)}")

    elif cmd == "check":
        mod, dc = int(sys.argv[2]), int(sys.argv[3])
        r = ability_check(mod, dc)
        tag = "NAT 20!" if r["nat20"] else "NAT 1!" if r["nat1"] else ("PASS" if r["success"] else "FAIL")
        print(f"Ability Check — DC {dc}:  d20={r['roll']}  {mod:+d}  =>  {r['total']}  [{tag}]")

    elif cmd == "save":
        mod, dc = int(sys.argv[2]), int(sys.argv[3])
        r = saving_throw(mod, dc)
        tag = "NAT 20!" if r["nat20"] else "NAT 1!" if r["nat1"] else ("PASS" if r["success"] else "FAIL")
        print(f"Saving Throw — DC {dc}:  d20={r['roll']}  {mod:+d}  =>  {r['total']}  [{tag}]")

    elif cmd == "attack":
        mod, ac = int(sys.argv[2]), int(sys.argv[3])
        adv = len(sys.argv) > 4 and sys.argv[4] == "adv"
        dis = len(sys.argv) > 4 and sys.argv[4] == "dis"
        r = attack_roll(mod, ac, advantage=adv, disadvantage=dis)
        if r["critical"]:
            tag = "CRITICAL HIT!"
        elif r["nat1"]:
            tag = "CRITICAL MISS!"
        else:
            tag = "HIT" if r["hit"] else "MISS"
        extra = ""
        if adv:
            extra = f"  (advantage: rolled {r['both_rolls']})"
        elif dis:
            extra = f"  (disadvantage: rolled {r['both_rolls']})"
        print(f"Attack — AC {ac}:  d20={r['roll']}  {mod:+d}  =>  {r['total']}  [{tag}]{extra}")

    elif cmd == "damage":
        expr = sys.argv[2]
        bonus = int(sys.argv[3]) if len(sys.argv) > 3 else 0
        crit = len(sys.argv) > 4 and sys.argv[4] == "crit"
        r = damage_roll(expr, bonus, critical=crit)
        crit_str = " (CRITICAL — doubled dice)" if crit else ""
        print(f"Damage{crit_str}:  {r['rolls']}  {bonus:+d}  =>  {r['total']}")

    elif cmd == "initiative":
        mod = int(sys.argv[2])
        r = initiative_roll(mod)
        print(f"Initiative:  d20={r['roll']}  {mod:+d}  =>  {r['total']}")

    elif cmd == "roll":
        expr = sys.argv[2]
        r = generic_roll(expr)
        print(f"Roll {expr}:  {r['rolls']}  {r['bonus']:+d}  =>  {r['total']}")

    else:
        print(f"Unknown command: {cmd}")
        sys.exit(1)
