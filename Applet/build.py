"""Generate data.js from all JSON source files so index.html works without a web server."""
import json, os

BASE = os.path.dirname(os.path.abspath(__file__))

def load(path):
    with open(os.path.join(BASE, path), encoding='utf-8') as f:
        return json.load(f)

app_data = {
    'classes':       load('classes/classes.json'),
    'classFeatures': load('classes/class-features-level1.json'),
    'backgrounds':   load('backgrounds/backgrounds.json'),
    'species':       load('species/species.json'),
    'languages':     load('core/languages.json'),
    'skills':        load('core/skills.json'),
    'abilities':     load('core/abilities.json'),
    'alignments':    load('core/alignments.json'),
    'spells':        load('spells/spells.json'),
    'spellLists':    load('spells/spell-lists.json'),
    'trinkets':      load('core/trinkets.json'),
    'fightingStyles':load('feats/fighting-styles.json'),
    'originFeats':   load('feats/origin.json'),
    'tools':         load('equipment/tools.json'),
    'armor':         load('equipment/armor.json'),
    'weapons':       load('equipment/weapons/weapons.json'),
    'gear':          load('equipment/adventuring-gear.json'),
    'packs':         load('equipment/adventuring-packs.json'),
    'focuses':       load('equipment/spellcasting-focuses.json'),
    'creationFlow':  load('core/creation-flow.json'),
}

out = 'window.APP_DATA = ' + json.dumps(app_data, ensure_ascii=False) + ';\n'
with open(os.path.join(BASE, 'data.js'), 'w', encoding='utf-8') as f:
    f.write(out)

print('data.js generated successfully.')
