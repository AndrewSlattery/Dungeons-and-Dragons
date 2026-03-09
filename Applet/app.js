/* ══════════════════════════════════════════════════════════
   D&D 2024 Character Creation Applet
   ══════════════════════════════════════════════════════════ */

// ── Data (injected by data.js as window.APP_DATA) ─────────
const D = window.APP_DATA;

// ── State ────────────────────────────────────────────────
const state = {
  step: 1,
  // Step 1
  cls: null,          // class object
  classChoices: {},   // e.g. { divineOrder: 'Protector', fightingStyle: 'Archery' }
  // Step 2
  background: null,
  // Step 3
  species: null,
  // Step 4
  languages: [],      // chosen language names (excluding auto-granted)
  // Step 5
  classSkills: [],    // chosen skill names
  speciesChoices: {}, // keyed by trait name slug, e.g. 'Draconic_Ancestry'
  featChoices: {},    // keyed by choice key, e.g. 'mi_list', 'crafter_tools'
  // Step 6
  scoreMethod: null,  // 'standardArray' | 'pointBuy' | 'diceRoll'
  scores: { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 },
  arrayAssign: {},    // { STR: '15', DEX: '14', ... }
  rolledPool: [],     // raw rolled sets [ [4,3,2,1], ... ] for diceRoll
  bgBoostMode: null,  // 'twoOne' | 'threeOne'
  bgBoosts: {},       // { STR: 2, DEX: 1 } etc.
  // Step 7
  alignment: null,
  // Step 8 – substep
  detailTab: 'identity',
  name: '', gender: '', age: '', height: '', weight: '',
  eyes: '', hair: '', skin: '', backstory: '', traits: '',
  ideals: '', bonds: '', flaws: '',
  equipClassOption: null, // 'A' | 'B'
  equipBgOption: null,    // 'A' | 'B'
  customItems: [],        // [{name, costGP, qty}]
  equipBrowserTab: 'Armor',
  equipBrowserSearch: '',
  spells: { cantrips: [], prepared: [] },
  trinket: null,
};

const STEPS = [
  { id: 'class',      label: 'Class' },
  { id: 'background', label: 'Background' },
  { id: 'species',    label: 'Species' },
  { id: 'languages',  label: 'Languages' },
  { id: 'classSkills',label: 'Skills' },
  { id: 'abilities',  label: 'Abilities' },
  { id: 'alignment',  label: 'Alignment' },
  { id: 'details',    label: 'Details' },
];

const ABILITY_KEYS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const ABILITY_NAMES = { STR:'Strength', DEX:'Dexterity', CON:'Constitution',
                        INT:'Intelligence', WIS:'Wisdom', CHA:'Charisma' };

// ── Utility ──────────────────────────────────────────────
const abilityMod = s => Math.floor((s - 10) / 2);
const modStr = m => (m >= 0 ? '+' : '') + m;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const h = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

function roll4d6dl() {
  const d = [1,2,3,4].map(() => Math.ceil(Math.random() * 6));
  d.sort((a, b) => a - b);
  return { dice: d, total: d[1] + d[2] + d[3] };
}

// Return final scores including background boosts
function finalScores() {
  const base = { ...state.scores };
  const boosts = state.bgBoosts;
  const out = {};
  for (const k of ABILITY_KEYS) {
    out[k] = clamp((base[k] || 8) + (boosts[k] || 0), 1, 20);
  }
  return out;
}

// Look up spellcasting info from class features
function spellcastingInfo(className) {
  const cf = D.classFeatures.find(f => f.class === className);
  if (!cf) return null;
  for (const feat of cf.features) {
    const sc = feat.effects?.spellcasting;
    if (sc?.level1) return sc;
  }
  return null;
}

function isSpellcaster(className) {
  return !!spellcastingInfo(className);
}

// Return list of auto-granted languages for current class+species
function autoLanguages() {
  const auto = ['Common'];
  if (state.cls?.name === 'Druid') auto.push("Druidic");
  if (state.cls?.name === 'Rogue') auto.push("Thieves' Cant");
  // Species languages
  const sp = state.species;
  if (sp) {
    for (const t of (sp.traits || [])) {
      const langs = t.effects?.languages;
      if (langs) for (const l of langs) if (!auto.includes(l)) auto.push(l);
    }
  }
  return auto;
}

// Skills already covered by background
function backgroundSkills() {
  if (!state.background) return [];
  return state.background.skillProficiencies || [];
}

// ── Step nav ──────────────────────────────────────────────
function renderStepNav() {
  const nav = document.getElementById('steps-nav');
  nav.innerHTML = '';
  STEPS.forEach((s, i) => {
    const n = i + 1;
    const tab = h('div', 'step-tab');
    tab.innerHTML = `<span class="step-num">${n}</span>${s.label}`;
    if (n < state.step) {
      tab.classList.add('done');
      tab.onclick = () => { state.step = n; render(); };
    } else if (n === state.step) {
      tab.classList.add('active');
    } else {
      tab.classList.add('locked');
    }
    nav.appendChild(tab);
  });

  document.getElementById('step-label').textContent =
    `Step ${state.step} of ${STEPS.length}: ${STEPS[state.step - 1].label}`;
  document.getElementById('btn-prev').disabled = state.step === 1;
  document.getElementById('btn-next').textContent =
    state.step === STEPS.length ? 'Finish ✓' : 'Next →';
}

function goNext() {
  if (state.step < STEPS.length) { state.step++; render(); }
  else renderFinished();
}
function goPrev() {
  if (state.step > 1) { state.step--; render(); }
}

// ── Main render dispatcher ────────────────────────────────
function render() {
  renderStepNav();
  const fns = [null, renderStep1, renderStep2, renderStep3,
                renderStep4, renderStep5, renderStep6,
                renderStep7, renderStep8];
  fns[state.step]();
  renderSummary();
  window.scrollTo(0, 0);
}

// ══════════════════════════════════════════════════════════
//  STEP 1 – Class
// ══════════════════════════════════════════════════════════
function renderStep1() {
  const content = document.getElementById('content');
  content.innerHTML = '';

  const hdr = h('div', 'step-header');
  hdr.innerHTML = '<h2>Choose Your Class</h2><p>Your class shapes your abilities, proficiencies, and level 1 features.</p>';
  content.appendChild(hdr);

  const grid = h('div', 'cards-grid');
  for (const cls of D.classes) {
    const card = h('div', 'card' + (state.cls?.name === cls.name ? ' selected' : ''));
    const armorStr = cls.armorTraining.length
      ? cls.armorTraining.map(a => a === 'Shield' ? 'Shields' : a).join(', ')
      : '—';
    card.innerHTML = `
      <div class="card-title">${cls.name}</div>
      <div class="card-subtitle">Hit Die: ${cls.hitDie} &nbsp;·&nbsp; Primary: ${cls.primaryAbility.join(', ')}</div>
      <div class="card-proflines">
        <div><span class="pfl">Saves:</span> ${cls.savingThrows.join(', ')}</div>
        <div><span class="pfl">Armor:</span> ${armorStr}</div>
        <div><span class="pfl">Weapons:</span> ${cls.weaponProficiencies.join(', ')}</div>
      </div>`;
    card.addEventListener('click', () => {
      state.cls = cls;
      state.classChoices = {};
      state.spells = { cantrips: [], prepared: [] };
      renderStep1();
      renderSummary();
    });
    grid.appendChild(card);
  }

  if (state.cls) {
    // Side-by-side: class list left, detail right
    const split = h('div', 'split-panel');
    const leftCol = h('div', 'split-left');
    leftCol.appendChild(grid);
    const rightCol = h('div', 'split-right');
    renderClassDetail(rightCol);
    split.append(leftCol, rightCol);
    content.appendChild(split);
  } else {
    content.appendChild(grid);
  }
}

function renderClassDetail(content) {
  const cls = state.cls;
  const cf = D.classFeatures.find(f => f.class === cls.name);
  const panel = h('div', 'detail-panel');

  // Header
  panel.innerHTML = `<h3>${cls.name}</h3>`;

  // Proficiency summary
  const profSec = h('div', 'detail-section');
  profSec.innerHTML = `<h4>Proficiencies</h4>
    <p style="font-size:.8rem"><strong>Armor:</strong> ${cls.armorTraining.join(', ') || '—'}<br>
    <strong>Weapons:</strong> ${cls.weaponProficiencies.join(', ')}<br>
    <strong>Saving Throws:</strong> ${cls.savingThrows.join(', ')}<br>
    <strong>Skills:</strong> Choose ${cls.skillProficiencies.choose} from ${
      cls.skillProficiencies.from === 'any' ? 'any skill' : cls.skillProficiencies.from.join(', ')
    }</p>`;
  panel.appendChild(profSec);

  // Level 1 features
  if (cf?.features?.length) {
    const featSec = h('div', 'detail-section');
    featSec.innerHTML = '<h4>Level 1 Features</h4>';
    for (const feat of cf.features) {
      if (feat.characterCreationChoice) {
        featSec.appendChild(renderInlineChoice(cls.name, feat));
      } else if (feat.effects?.weaponMastery) {
        featSec.appendChild(renderWeaponMasteryChoice(cls.name, feat));
      } else {
        const fi = h('div', 'feature-item');
        fi.innerHTML = `<div class="feature-name">${feat.name}</div>
          <div class="feature-desc">${feat.description.split('\n')[0]}</div>`;
        featSec.appendChild(fi);
      }
    }
    panel.appendChild(featSec);
  }

  content.appendChild(panel);
}

function renderInlineChoice(className, feat) {
  const choice = feat.characterCreationChoice;
  const block = h('div', 'feature-item');
  block.innerHTML = `<div class="feature-name">${feat.name}</div>
    <div class="feature-desc">${feat.description.split('\n')[0]}</div>`;

  const cb = h('div', 'choice-block');
  cb.innerHTML = `<h4>${choice.label}</h4>`;

  if (Array.isArray(choice.options)) {
    const key = `${className}_${feat.name}`.replace(/\s/g, '_');
    for (const opt of choice.options) {
      const row = h('div', 'choice-option' + (state.classChoices[key] === opt.name ? ' chosen' : ''));
      row.innerHTML = `<input type="radio" name="${key}" ${state.classChoices[key] === opt.name ? 'checked' : ''}>
        <label><strong>${opt.name}</strong>${opt.description}</label>`;
      row.addEventListener('click', () => {
        state.classChoices[key] = opt.name;
        renderStep1();
      });
      cb.appendChild(row);
    }
  } else if (className === 'Fighter') {
    // Fighting Style – pick from fightingStyles list
    const key = 'Fighter_FightingStyle';
    const sel = h('select');
    sel.innerHTML = '<option value="">— Choose a Fighting Style —</option>' +
      D.fightingStyles.map(fs => `<option value="${fs.name}" ${state.classChoices[key] === fs.name ? 'selected' : ''}>${fs.name}</option>`).join('');
    sel.addEventListener('change', () => { state.classChoices[key] = sel.value; renderSummary(); });
    cb.appendChild(sel);
    if (state.classChoices[key]) {
      const desc = D.fightingStyles.find(f => f.name === state.classChoices[key])?.description;
      if (desc) cb.appendChild(h('p', 'feature-desc', desc)).style.marginTop = '.35rem';
    }
  } else if (className === 'Rogue' && feat.name === 'Expertise') {
    cb.appendChild(h('p', 'feature-desc', 'Choose 2 expertise skills after selecting your skill proficiencies in Step 5.'));
  } else {
    cb.appendChild(h('p', 'feature-desc', typeof choice.options === 'string' ? choice.options : 'See details.'));
  }

  block.appendChild(cb);
  return block;
}

function renderWeaponMasteryChoice(className, feat) {
  const wm = feat.effects.weaponMastery;
  const count = wm.count;
  const eligible = wm.eligibleWeapons || 'Simple or Martial';
  const stateKey = `${className}_WeaponMastery`;
  const chosen = state.classChoices[stateKey] || [];

  const block = h('div', 'feature-item');
  block.innerHTML = `<div class="feature-name">${feat.name}</div>
    <div class="feature-desc">${feat.description.split('\n')[0]}</div>`;

  const cb = h('div', 'choice-block');
  cb.innerHTML = `<h4>Choose ${count} Weapon${count > 1 ? 's' : ''} <span style="color:var(--red)">(${chosen.length}/${count})</span></h4>`;

  let eligibleWeapons = (D.weapons || []);
  if (eligible === 'Simple') eligibleWeapons = eligibleWeapons.filter(w => w.category === 'Simple');
  else if (eligible === 'Martial') eligibleWeapons = eligibleWeapons.filter(w => w.category === 'Martial');
  // "Simple or Martial" → all weapons (default)

  const listDiv = h('div', '');
  listDiv.style.cssText = 'max-height:220px;overflow-y:auto;border:1px solid #c8b090;border-radius:4px;margin-top:.35rem';

  for (const w of eligibleWeapons) {
    const isChosen = chosen.includes(w.name);
    const row = h('div', 'choice-option' + (isChosen ? ' chosen' : ''));
    row.innerHTML = `<input type="checkbox" ${isChosen ? 'checked' : ''}>
      <label><strong>${w.name}</strong>
      <span class="feature-desc" style="display:inline;margin-left:.4rem">${w.damageDie} ${w.damageType} · Mastery: ${w.mastery || '—'}</span></label>`;
    row.querySelector('input').checked = isChosen;
    row.addEventListener('click', () => {
      const list = state.classChoices[stateKey] || [];
      const idx = list.indexOf(w.name);
      if (idx >= 0) list.splice(idx, 1);
      else if (list.length < count) list.push(w.name);
      state.classChoices[stateKey] = list;
      renderStep1();
    });
    listDiv.appendChild(row);
  }

  cb.appendChild(listDiv);
  block.appendChild(cb);
  return block;
}

// ══════════════════════════════════════════════════════════
//  STEP 2 – Background
// ══════════════════════════════════════════════════════════
function renderStep2() {
  const content = document.getElementById('content');
  content.innerHTML = '';
  content.appendChild(Object.assign(h('div', 'step-header'),
    { innerHTML: '<h2>Choose Your Background</h2><p>Backgrounds grant skill proficiencies, a tool proficiency, an origin feat, and starting equipment.</p>' }));

  const grid = h('div', 'cards-grid');
  for (const bg of D.backgrounds) {
    const card = h('div', 'card' + (state.background?.name === bg.name ? ' selected' : ''));
    const toolStr = typeof bg.toolProficiency === 'object'
      ? `1 ${bg.toolProficiency.from}` : bg.toolProficiency;
    card.innerHTML = `
      <div class="card-title">${bg.name}</div>
      <div class="card-subtitle">${bg.description}</div>
      <div class="card-tags">
        ${bg.skillProficiencies.map(s => `<span class="tag highlight">${s}</span>`).join('')}
        <span class="tag gold">${bg.originFeat}</span>
      </div>`;
    card.addEventListener('click', () => {
      state.background = bg;
      // Remove background skills from classSkills if they overlap
      state.classSkills = state.classSkills.filter(sk => !bg.skillProficiencies.includes(sk));
      state.bgBoosts = {};
      state.bgBoostMode = null;
      renderStep2();
      renderSummary();
    });
    grid.appendChild(card);
  }
  content.appendChild(grid);

  if (state.background) {
    const bg = state.background;
    const panel = h('div', 'detail-panel');
    const toolStr = typeof bg.toolProficiency === 'object'
      ? `Choose 1 from ${bg.toolProficiency.from}` : bg.toolProficiency;
    panel.innerHTML = `<h3>${bg.name}</h3>
      <div class="detail-section">
        <h4>Grants</h4>
        <p style="font-size:.8rem">
          <strong>Skills:</strong> ${bg.skillProficiencies.join(', ')}<br>
          <strong>Tool:</strong> ${toolStr}<br>
          <strong>Origin Feat:</strong> ${bg.originFeat}<br>
          <strong>Ability Boosts:</strong> ${bg.abilityScores.join(', ')}
        </p>
      </div>`;
    // Equipment options
    const eqSec = h('div', 'detail-section');
    eqSec.innerHTML = '<h4>Starting Equipment</h4>';
    for (const opt of (bg.startingEquipment || [])) {
      eqSec.innerHTML += `<p style="font-size:.78rem"><strong>Option ${opt.option}:</strong> ` +
        opt.items.map(i => i.gp ? `${i.gp} gp` : `${i.item}${i.quantity ? ` ×${i.quantity}` : ''}${i.note ? ` (${i.note})` : ''}`).join(', ') + '</p>';
    }
    panel.appendChild(eqSec);
    content.appendChild(panel);
  }
}

// ══════════════════════════════════════════════════════════
//  STEP 3 – Species
// ══════════════════════════════════════════════════════════
function renderStep3() {
  const content = document.getElementById('content');
  content.innerHTML = '';
  content.appendChild(Object.assign(h('div', 'step-header'),
    { innerHTML: '<h2>Choose Your Species</h2><p>Your species grants racial traits, size, speed, and sometimes languages or proficiencies.</p>' }));

  const grid = h('div', 'cards-grid');
  for (const sp of D.species) {
    const card = h('div', 'card' + (state.species?.name === sp.name ? ' selected' : ''));
    const sizes = Array.isArray(sp.size) ? sp.size.join('/') : sp.size;
    card.innerHTML = `
      <div class="card-title">${sp.name}</div>
      <div class="card-subtitle">${sp.creatureType} · ${sizes} · Speed ${sp.speed.walk} ft.</div>
      <div class="card-tags">
        ${sp.traits.slice(0, 3).map(t => `<span class="tag">${t.name}</span>`).join('')}
        ${sp.traits.length > 3 ? `<span class="tag">+${sp.traits.length - 3} more</span>` : ''}
      </div>`;
    card.addEventListener('click', () => {
      state.species = sp;
      // Reset auto languages; keep chosen ones that still make sense
      state.languages = state.languages.filter(l => !autoLanguages().includes(l));
      renderStep3();
      renderSummary();
    });
    grid.appendChild(card);
  }
  content.appendChild(grid);

  if (state.species) {
    const sp = state.species;
    const panel = h('div', 'detail-panel');
    panel.innerHTML = `<h3>${sp.name}</h3>
      <p style="font-size:.8rem;margin-bottom:.6rem">
        <strong>Type:</strong> ${sp.creatureType} &nbsp;·&nbsp;
        <strong>Size:</strong> ${Array.isArray(sp.size) ? sp.size.join(' or ') : sp.size} &nbsp;·&nbsp;
        <strong>Speed:</strong> ${sp.speed.walk} ft. walk${sp.speed.fly ? `, ${sp.speed.fly} ft. fly` : ''}
      </p>`;
    const traitSec = h('div', 'detail-section');
    traitSec.innerHTML = '<h4>Traits</h4>';
    for (const t of sp.traits) {
      const fi = h('div', 'feature-item');
      fi.innerHTML = `<div class="feature-name">${t.name}${t.levelRequirement ? ` (level ${t.levelRequirement})` : ''}</div>
        <div class="feature-desc">${t.description.split('\n')[0]}</div>`;
      traitSec.appendChild(fi);
    }
    panel.appendChild(traitSec);
    content.appendChild(panel);
  }
}

// ══════════════════════════════════════════════════════════
//  STEP 4 – Languages
// ══════════════════════════════════════════════════════════
function renderStep4() {
  const content = document.getElementById('content');
  content.innerHTML = '';
  content.appendChild(Object.assign(h('div', 'step-header'),
    { innerHTML: '<h2>Choose Languages</h2><p>Your character knows Common plus 2 additional standard languages.</p>' }));

  const auto = autoLanguages();
  const CHOOSE = 2;
  const chosen = state.languages;

  const info = h('div', 'info-box');
  info.innerHTML = `<strong>Auto-granted:</strong> ${auto.join(', ')}<br>
    Choose <strong>${CHOOSE}</strong> additional standard languages (${chosen.length}/${CHOOSE} chosen).`;
  content.appendChild(info);

  const allStandard = D.languages.standard.filter(l => !auto.includes(l.name));
  const grid = h('div', 'checkbox-grid');

  for (const lang of allStandard) {
    const isChosen = chosen.includes(lang.name);
    const item = h('div', 'check-item' + (isChosen ? ' checked' : ''));
    item.innerHTML = `<input type="checkbox" ${isChosen ? 'checked' : ''}>
      <div><span style="font-weight:bold">${lang.name}</span>
      <div class="check-sub">${lang.typicalSpeakers}</div></div>`;
    item.addEventListener('click', () => {
      const idx = state.languages.indexOf(lang.name);
      if (idx >= 0) {
        state.languages.splice(idx, 1);
      } else if (state.languages.length < CHOOSE) {
        state.languages.push(lang.name);
      }
      renderStep4();
      renderSummary();
    });
    grid.appendChild(item);
  }
  content.appendChild(grid);

  // Rare languages note
  const note = h('div', 'warn-box');
  note.textContent = 'Rare languages (Druidic, Thieves\' Cant, Primordial, etc.) are granted by class or special circumstances, not chosen freely here.';
  content.appendChild(note);
}

// ══════════════════════════════════════════════════════════
//  STEP 5 – Class Skill Proficiencies
// ══════════════════════════════════════════════════════════
function renderStep5() {
  const content = document.getElementById('content');
  content.innerHTML = '';
  content.appendChild(Object.assign(h('div', 'step-header'),
    { innerHTML: '<h2>Choose Class Skill Proficiencies</h2><p>Pick from your class\'s available skills. Background skills are already covered.</p>' }));

  if (!state.cls) {
    content.appendChild(h('p', 'info-box', 'Please choose a class first (Step 1).'));
    return;
  }

  const cls = state.cls;
  const bgSkills = backgroundSkills();
  const choose = cls.skillProficiencies.choose;
  const eligible = cls.skillProficiencies.from === 'any'
    ? D.skills.map(s => s.name)
    : cls.skillProficiencies.from;

  const info = h('div', 'info-box');
  info.innerHTML = `Choose <strong>${choose}</strong> skill(s) from your class list (${state.classSkills.length}/${choose} chosen).<br>
    Skills marked <em>Already Proficient</em> were granted by your background.`;
  content.appendChild(info);

  // ── Left column: skill checkboxes (+ Rogue expertise)
  const leftCol = h('div', 'split-left');

  const grid = h('div', 'checkbox-grid');
  for (const skillName of eligible) {
    const isBg = bgSkills.includes(skillName);
    const isChosen = state.classSkills.includes(skillName);
    const skill = D.skills.find(s => s.name === skillName);
    const item = h('div', isBg ? 'check-item auto' : ('check-item' + (isChosen ? ' checked' : '')));
    item.innerHTML = `<input type="checkbox" ${isChosen || isBg ? 'checked' : ''} ${isBg ? 'disabled' : ''}>
      <div><span style="font-weight:bold">${skillName}</span>
      <div class="check-sub">${skill?.ability || ''} ${isBg ? '· Already proficient' : ''}</div></div>`;
    if (!isBg) {
      item.addEventListener('click', () => {
        const idx = state.classSkills.indexOf(skillName);
        if (idx >= 0) {
          state.classSkills.splice(idx, 1);
        } else if (state.classSkills.length < choose) {
          state.classSkills.push(skillName);
        }
        renderStep5();
        renderSummary();
      });
    }
    grid.appendChild(item);
  }
  leftCol.appendChild(grid);

  // Rogue Expertise choice (deferred from step 1)
  if (state.cls?.name === 'Rogue') {
    const allSkills = [...new Set([...bgSkills, ...state.classSkills])];
    if (allSkills.length >= 2) {
      const expBlock = h('div', 'detail-panel');
      expBlock.style.marginTop = '1rem';
      expBlock.innerHTML = '<h3>Expertise <span style="font-size:.78rem;font-weight:normal">(choose 2 for double proficiency)</span></h3>';
      const expGrid = h('div', 'checkbox-grid');
      for (const sk of allSkills) {
        const isExp = (state.classChoices['Rogue_Expertise'] || []).includes(sk);
        const item = h('div', 'check-item' + (isExp ? ' checked' : ''));
        item.innerHTML = `<input type="checkbox" ${isExp ? 'checked' : ''}>
          <span style="font-weight:bold">${sk}</span>`;
        item.addEventListener('click', () => {
          const exp = state.classChoices['Rogue_Expertise'] || [];
          const idx = exp.indexOf(sk);
          if (idx >= 0) exp.splice(idx, 1);
          else if (exp.length < 2) exp.push(sk);
          state.classChoices['Rogue_Expertise'] = exp;
          renderStep5();
        });
        expGrid.appendChild(item);
      }
      expBlock.appendChild(expGrid);
      leftCol.appendChild(expBlock);
    }
  }

  // ── Right column: species choices + feat choices
  const rightCol = h('div', 'split-right');
  renderSpeciesChoicePanel(rightCol);
  renderFeatChoicePanel(rightCol);
  // Remove top margin from first panel in right col so it aligns with left col
  const firstPanel = rightCol.querySelector('.detail-panel');
  if (firstPanel) firstPanel.style.marginTop = '0';

  // Use split if there's right-column content, otherwise full-width left
  if (rightCol.children.length > 0) {
    const split = h('div', 'split-panel');
    split.append(leftCol, rightCol);
    content.appendChild(split);
  } else {
    content.appendChild(leftCol);
  }
}

// ══════════════════════════════════════════════════════════
//  STEP 5 HELPERS – Species & Feat Choices
// ══════════════════════════════════════════════════════════

function renderSpeciesChoicePanel(content) {
  const sp = state.species;
  if (!sp) return;
  const traitsWithChoices = (sp.traits || []).filter(t => t.characterCreationChoice);
  if (!traitsWithChoices.length) return;

  const panel = h('div', 'detail-panel');
  panel.style.marginTop = '1.25rem';
  panel.innerHTML = `<h3>${sp.name} Species Choices</h3>`;
  for (const trait of traitsWithChoices) renderOneSpeciesChoice(panel, trait);
  content.appendChild(panel);
}

function traitKey(traitName) { return traitName.replace(/[^a-zA-Z0-9]/g, '_'); }

function renderOneSpeciesChoice(container, trait) {
  const choice = trait.characterCreationChoice;
  const key = traitKey(trait.name);

  const sec = h('div', 'detail-section');
  sec.innerHTML = `<h4>${trait.name}</h4>
    <p class="feature-desc" style="margin-bottom:.5rem">${trait.description.split('\n')[0]}</p>`;

  const optBlock = h('div', 'choice-block');
  optBlock.innerHTML = `<h4>${choice.label}</h4>`;

  const opts = choice.options;

  if (opts === 'any skill') {
    // Human Skillful – any one skill
    const sel = document.createElement('select');
    sel.style.cssText = 'width:100%;padding:.3rem;border:1px solid #b8a080;border-radius:4px;background:var(--panel);font-family:inherit;font-size:.85rem;color:var(--ink);margin-top:.35rem';
    sel.innerHTML = '<option value="">— Choose a skill —</option>' +
      D.skills.map(s => `<option value="${s.name}" ${state.speciesChoices[key] === s.name ? 'selected' : ''}>${s.name} (${s.ability})</option>`).join('');
    sel.addEventListener('change', () => { state.speciesChoices[key] = sel.value; renderSummary(); });
    optBlock.appendChild(sel);

  } else if (opts === 'any Origin feat') {
    // Human Versatile – any origin feat
    const sel = document.createElement('select');
    sel.style.cssText = 'width:100%;padding:.3rem;border:1px solid #b8a080;border-radius:4px;background:var(--panel);font-family:inherit;font-size:.85rem;color:var(--ink);margin-top:.35rem';
    sel.innerHTML = '<option value="">— Choose an origin feat —</option>' +
      (D.originFeats || []).map(f => `<option value="${f.name}" ${state.speciesChoices[key] === f.name ? 'selected' : ''}>${f.name}</option>`).join('');
    sel.addEventListener('change', () => { state.speciesChoices[key] = sel.value; renderSummary(); });
    optBlock.appendChild(sel);

  } else if (Array.isArray(opts)) {
    const isStrings = typeof opts[0] === 'string';
    // Use a scrollable container when there are many options
    const needsScroll = opts.length > 4;
    const optContainer = needsScroll
      ? Object.assign(document.createElement('div'), { style: 'max-height:240px;overflow-y:auto;border:1px solid #c8b090;border-radius:4px;padding:.25rem' })
      : optBlock;

    if (isStrings) {
      // Simple string options (e.g. Keen Senses: Insight/Perception/Survival)
      for (const opt of opts) {
        const row = h('div', 'choice-option' + (state.speciesChoices[key] === opt ? ' chosen' : ''));
        row.innerHTML = `<input type="radio" name="sc_${key}"> <label><strong>${opt}</strong></label>`;
        row.querySelector('input').checked = state.speciesChoices[key] === opt;
        row.addEventListener('click', () => { state.speciesChoices[key] = opt; renderStep5(); });
        optContainer.appendChild(row);
      }
    } else {
      // Object options (Dragonborn ancestry, Goliath ancestry, Elven/Gnomish/Fiendish lineage)
      for (const opt of opts) {
        const row = h('div', 'choice-option' + (state.speciesChoices[key] === opt.name ? ' chosen' : ''));
        const sub = opt.damageType ? `${opt.damageType} damage`
                  : opt.description ? opt.description.slice(0, 70) + (opt.description.length > 70 ? '…' : '')
                  : '';
        row.innerHTML = `<input type="radio" name="sc_${key}">
          <label><strong>${opt.name}</strong>${sub ? `<span class="feature-desc" style="display:block;margin-top:1px"> ${sub}</span>` : ''}</label>`;
        row.querySelector('input').checked = state.speciesChoices[key] === opt.name;
        row.addEventListener('click', () => { state.speciesChoices[key] = opt.name; renderStep5(); });
        optContainer.appendChild(row);
      }
    }
    if (needsScroll) optBlock.appendChild(optContainer);

    // Secondary choice (e.g. spellcasting ability for Elven Lineage)
    if (choice.alsoChoose?.length && state.speciesChoices[key]) {
      for (const secondary of choice.alsoChoose) {
        const secKey = key + '__' + traitKey(secondary.label);
        optBlock.appendChild(h('hr', 'gold'));
        const secHdr = h('div', 'detail-section');
        secHdr.innerHTML = `<h4>${secondary.label}</h4>`;
        for (const secOpt of secondary.options) {
          const row = h('div', 'choice-option' + (state.speciesChoices[secKey] === secOpt ? ' chosen' : ''));
          row.innerHTML = `<input type="radio" name="sc_${secKey}"> <label><strong>${secOpt}</strong></label>`;
          row.querySelector('input').checked = state.speciesChoices[secKey] === secOpt;
          row.addEventListener('click', () => { state.speciesChoices[secKey] = secOpt; renderStep5(); });
          secHdr.appendChild(row);
        }
        optBlock.appendChild(secHdr);
      }
    }
  }

  sec.appendChild(optBlock);
  container.appendChild(sec);
}

// ── Feat Choices (background origin feats + Human Versatile that require selection) ──

function renderFeatChoicePanel(content) {
  // Background feat choices
  if (state.background) {
    const featName = state.background.originFeat || '';
    renderFeatChoicesFor(content, featName, '');
  }

  // Human Versatile species feat choices (separate state keys with 'vers_' prefix)
  if (state.species?.name === 'Human') {
    const versFeat = state.speciesChoices['Versatile'] || '';
    if (versFeat) {
      renderFeatChoicesFor(content, versFeat, 'vers_');
    }
  }
}

function renderFeatChoicesFor(content, featName, prefix) {
  if (!featName) return;
  if (featName.startsWith('Magic Initiate')) { renderMIPanel(content, featName, prefix); return; }
  if (featName === 'Crafter')               { renderCrafterPanel(content, prefix); return; }
  if (featName === 'Musician')              { renderMusicianPanel(content, prefix); return; }
  if (featName === 'Skilled')               { renderSkilledPanel(content, prefix); return; }
}

function featChoiceHeader(featName, prefix) {
  const p = h('div', 'detail-panel');
  p.style.marginTop = '1.25rem';
  const subtitle = prefix === 'vers_' ? ' <span style="font-size:.72rem;color:var(--ink-muted)">(Human Versatile)</span>' : '';
  p.innerHTML = `<h3>${featName} Choices${subtitle}</h3>`;
  return p;
}

function renderMIPanel(content, featName, prefix = '') {
  const LIST_KEY = prefix+'mi_list', CT_KEY = prefix+'mi_cantrips', SP_KEY = prefix+'mi_spell', AB_KEY = prefix+'mi_ability';

  // Check if spell list is locked by the feat name (e.g. "Magic Initiate (Cleric)")
  const lockMatch = featName.match(/Magic Initiate \((\w+)\)/);
  const lockedList = lockMatch ? lockMatch[1] : null;

  // Auto-set locked list if not already set
  if (lockedList && state.featChoices[LIST_KEY] !== lockedList) {
    state.featChoices[LIST_KEY] = lockedList;
    state.featChoices[CT_KEY] = [];
    state.featChoices[SP_KEY] = null;
  }

  const panel = featChoiceHeader(featName, prefix);

  // 1) Spell list
  const listSec = h('div', 'detail-section');
  if (lockedList) {
    listSec.innerHTML = `<h4>Spell List</h4>
      <div class="info-box" style="margin-top:.35rem">🔒 Locked to <strong>${lockedList}</strong> (specified by feat)</div>`;
  } else {
    listSec.innerHTML = '<h4>Spell List</h4>';
    const listSel = document.createElement('select');
    listSel.style.cssText = 'width:100%;padding:.3rem;border:1px solid #b8a080;border-radius:4px;background:var(--panel);font-family:inherit;font-size:.85rem;color:var(--ink)';
    listSel.innerHTML = '<option value="">— Choose Cleric, Druid, or Wizard —</option>' +
      ['Cleric', 'Druid', 'Wizard'].map(l => `<option value="${l}" ${state.featChoices[LIST_KEY] === l ? 'selected' : ''}>${l}</option>`).join('');
    listSel.addEventListener('change', () => {
      state.featChoices[LIST_KEY] = listSel.value;
      state.featChoices[CT_KEY] = [];
      state.featChoices[SP_KEY] = null;
      renderStep5();
    });
    listSec.appendChild(listSel);
  }
  panel.appendChild(listSec);

  if (state.featChoices[LIST_KEY]) {
    const chosenList = state.featChoices[LIST_KEY];
    const listSpellNames = D.spellLists[chosenList] || [];
    const cantrips = D.spells.filter(s => s.level === 0 && listSpellNames.includes(s.name));
    const level1s  = D.spells.filter(s => s.level === 1 && listSpellNames.includes(s.name));
    const picked = state.featChoices[CT_KEY] || [];

    // 2) 2 cantrips
    const ctSec = h('div', 'detail-section');
    ctSec.innerHTML = `<h4>Choose 2 Cantrips <span style="color:var(--red)">(${picked.length}/2)</span></h4>`;
    const ctList = h('div', 'spell-list');
    ctList.style.maxHeight = '200px';
    appendSpellCheckboxes(ctList, cantrips, CT_KEY, 2, false);
    ctSec.appendChild(ctList);
    panel.appendChild(ctSec);

    // 3) 1 level-1 spell (radio)
    const spSec = h('div', 'detail-section');
    spSec.innerHTML = `<h4>Choose 1 Level 1 Spell <span style="color:var(--red)">(${state.featChoices[SP_KEY] ? '1/1' : '0/1'})</span></h4>`;
    const spList = h('div', 'spell-list');
    spList.style.maxHeight = '200px';
    appendSpellCheckboxes(spList, level1s, SP_KEY, 1, true);
    spSec.appendChild(spList);
    panel.appendChild(spSec);

    // 4) Spellcasting ability
    const abSec = h('div', 'detail-section');
    abSec.innerHTML = '<h4>Spellcasting Ability</h4>';
    const abRow = h('div', '');
    abRow.style.display = 'flex'; abRow.style.gap = '.5rem'; abRow.style.flexWrap = 'wrap';
    for (const ab of ['Intelligence', 'Wisdom', 'Charisma']) {
      const btn = h('button', 'boost-mode-btn' + (state.featChoices[AB_KEY] === ab ? ' active' : ''), ab);
      btn.addEventListener('click', () => { state.featChoices[AB_KEY] = ab; renderStep5(); });
      abRow.appendChild(btn);
    }
    abSec.appendChild(abRow);
    panel.appendChild(abSec);
  }

  content.appendChild(panel);
}

// Helper: append spell items as checkboxes (radio=true → single select)
function appendSpellCheckboxes(container, spells, stateKey, max, radio) {
  for (const sp of spells) {
    const isArr = Array.isArray(state.featChoices[stateKey]);
    const chosen = isArr ? (state.featChoices[stateKey] || []).includes(sp.name)
                         : state.featChoices[stateKey] === sp.name;
    const item = h('div', 'spell-item' + (chosen ? ' selected' : ''));
    item.innerHTML = `<input type="${radio ? 'radio' : 'checkbox'}" name="fc_${stateKey}" ${chosen ? 'checked' : ''}>
      <div>
        <div class="spell-name">${sp.name}</div>
        <div class="spell-meta">${sp.school} · ${sp.castingTime} · ${sp.range} · ${sp.duration}${sp.concentration ? ' · Conc.' : ''}</div>
        <div class="spell-meta" style="font-style:italic">${sp.description.slice(0, 80)}…</div>
      </div>`;
    item.addEventListener('click', () => {
      if (radio) {
        state.featChoices[stateKey] = sp.name;
      } else {
        const list = state.featChoices[stateKey] || [];
        const idx = list.indexOf(sp.name);
        if (idx >= 0) list.splice(idx, 1);
        else if (list.length < max) list.push(sp.name);
        state.featChoices[stateKey] = list;
      }
      renderStep5();
    });
    container.appendChild(item);
  }
}

function renderCrafterPanel(content, prefix = '') {
  const panel = featChoiceHeader('Crafter', prefix);
  const KEY = prefix+'crafter_tools';
  const tools = (D.tools?.artisansTools || []).map(t => t.name);
  const chosen = state.featChoices[KEY] || [];
  const sec = h('div', 'detail-section');
  sec.innerHTML = `<h4>Choose 3 Artisan's Tools <span style="color:var(--red)">(${chosen.length}/3)</span></h4>`;
  const grid = h('div', 'checkbox-grid');
  for (const name of tools) {
    const on = chosen.includes(name);
    const item = h('div', 'check-item' + (on ? ' checked' : ''));
    item.innerHTML = `<input type="checkbox" ${on ? 'checked' : ''}><span style="font-weight:bold">${name}</span>`;
    item.addEventListener('click', () => {
      const list = state.featChoices[KEY] || [];
      const idx = list.indexOf(name);
      if (idx >= 0) list.splice(idx, 1);
      else if (list.length < 3) list.push(name);
      state.featChoices[KEY] = list;
      renderStep5();
    });
    grid.appendChild(item);
  }
  sec.appendChild(grid);
  panel.appendChild(sec);
  content.appendChild(panel);
}

function renderMusicianPanel(content, prefix = '') {
  const panel = featChoiceHeader('Musician', prefix);
  const KEY = prefix+'musician_instruments';
  const instruments = (D.tools?.musicalInstruments || []).map(t => t.name);
  const chosen = state.featChoices[KEY] || [];
  const sec = h('div', 'detail-section');
  sec.innerHTML = `<h4>Choose 3 Musical Instruments <span style="color:var(--red)">(${chosen.length}/3)</span></h4>`;
  const grid = h('div', 'checkbox-grid');
  for (const name of instruments) {
    const on = chosen.includes(name);
    const item = h('div', 'check-item' + (on ? ' checked' : ''));
    item.innerHTML = `<input type="checkbox" ${on ? 'checked' : ''}><span style="font-weight:bold">${name}</span>`;
    item.addEventListener('click', () => {
      const list = state.featChoices[KEY] || [];
      const idx = list.indexOf(name);
      if (idx >= 0) list.splice(idx, 1);
      else if (list.length < 3) list.push(name);
      state.featChoices[KEY] = list;
      renderStep5();
    });
    grid.appendChild(item);
  }
  sec.appendChild(grid);
  panel.appendChild(sec);
  content.appendChild(panel);
}

function renderSkilledPanel(content, prefix = '') {
  const panel = featChoiceHeader('Skilled', prefix);
  const KEY = prefix+'skilled_choices';
  const chosen = state.featChoices[KEY] || [];

  const allSkills = D.skills.map(s => s.name);
  const allTools = [
    ...(D.tools?.artisansTools  || []).map(t => t.name),
    ...(D.tools?.musicalInstruments || []).map(t => t.name),
    ...(D.tools?.gamingSets || []).map(t => t.name),
  ];

  const renderGroup = (title, items) => {
    const sec = h('div', 'detail-section');
    sec.innerHTML = `<h4>${title} <span style="color:var(--red);font-size:.7rem">(${chosen.length}/3 total chosen)</span></h4>`;
    const grid = h('div', 'checkbox-grid');
    for (const name of items) {
      const on = chosen.includes(name);
      const item = h('div', 'check-item' + (on ? ' checked' : ''));
      item.innerHTML = `<input type="checkbox" ${on ? 'checked' : ''}><span style="font-weight:bold">${name}</span>`;
      item.addEventListener('click', () => {
        const list = state.featChoices[KEY] || [];
        const idx = list.indexOf(name);
        if (idx >= 0) list.splice(idx, 1);
        else if (list.length < 3) list.push(name);
        state.featChoices[KEY] = list;
        renderStep5();
      });
      grid.appendChild(item);
    }
    sec.appendChild(grid);
    return sec;
  };

  panel.appendChild(renderGroup('Skills', allSkills));
  panel.appendChild(renderGroup('Tools', allTools));
  content.appendChild(panel);
}

// ══════════════════════════════════════════════════════════
//  STEP 6 – Ability Scores
// ══════════════════════════════════════════════════════════
const PB_COSTS = { 8:0, 9:1, 10:2, 11:3, 12:4, 13:5, 14:7, 15:9 };
const STD_ARRAY = [15, 14, 13, 12, 10, 8];

function renderStep6() {
  const content = document.getElementById('content');
  content.innerHTML = '';
  content.appendChild(Object.assign(h('div', 'step-header'),
    { innerHTML: '<h2>Determine Ability Scores</h2><p>Choose a method, assign scores, then apply background boosts.</p>' }));

  // Method tabs
  const tabs = h('div', 'method-tabs');
  const methods = [
    { id: 'standardArray', label: 'Standard Array' },
    { id: 'pointBuy',      label: 'Point Buy' },
    { id: 'diceRoll',      label: 'Dice Roll' },
  ];
  for (const m of methods) {
    const btn = h('button', 'method-tab' + (state.scoreMethod === m.id ? ' active' : ''), m.label);
    btn.addEventListener('click', () => {
      state.scoreMethod = m.id;
      state.arrayAssign = {};
      state.scores = { STR:8, DEX:8, CON:8, INT:8, WIS:8, CHA:8 };
      state.rolledPool = [];
      state.bgBoosts = {};
      state.bgBoostMode = null;
      renderStep6();
    });
    tabs.appendChild(btn);
  }
  content.appendChild(tabs);

  if (!state.scoreMethod) {
    content.appendChild(h('div', 'info-box', 'Choose a method above to begin assigning scores.'));
    return;
  }

  if (state.scoreMethod === 'standardArray') renderStandardArray(content);
  else if (state.scoreMethod === 'pointBuy') renderPointBuy(content);
  else renderDiceRoll(content);

  // Background boost section (always shown once method chosen)
  if (state.background) renderBgBoost(content);
  else content.appendChild(h('div', 'warn-box', 'Choose a background first (Step 2) to apply ability score boosts.'));
}

function renderStandardArray(content) {
  const assign = state.arrayAssign;
  // Which values are used?
  const used = Object.values(assign).filter(Boolean).map(Number);
  const remaining = STD_ARRAY.filter(v => !used.includes(v) || Object.values(assign).filter(x => Number(x) === v).length > 1);

  const rows = h('div', 'ability-rows');
  for (const key of ABILITY_KEYS) {
    const row = h('div', 'ability-row array-assign');
    const usedByOthers = STD_ARRAY.filter(v => {
      return Object.entries(assign).some(([k, val]) => k !== key && Number(val) === v);
    });
    const selOpts = ['<option value="">—</option>',
      ...STD_ARRAY.map(v => {
        const takenElsewhere = Object.entries(assign).some(([k, val]) => k !== key && Number(val) === v);
        return `<option value="${v}" ${takenElsewhere ? 'disabled' : ''} ${assign[key] == v ? 'selected' : ''}>${v}</option>`;
      })
    ].join('');
    const sel = h('select');
    sel.innerHTML = selOpts;
    sel.addEventListener('change', () => {
      state.arrayAssign[key] = sel.value;
      // Update scores
      for (const k of ABILITY_KEYS) state.scores[k] = Number(state.arrayAssign[k]) || 8;
      renderStep6();
    });
    const mod = abilityMod(state.scores[key]);
    row.innerHTML = `<span class="ability-name">${ABILITY_NAMES[key]}</span><span class="ability-abbr">${key}</span>`;
    row.appendChild(sel);
    row.innerHTML += `<span class="ability-mod">${state.scores[key] ? modStr(mod) : '—'}</span>`;
    const selNode = row.querySelector('select');
    row.appendChild(selNode); // re-append select properly
    rows.appendChild(row);
  }
  content.appendChild(rows);
}

// Rewrite for cleaner approach:
function renderStandardArray(content) {
  const rows = h('div', 'ability-rows');
  for (const key of ABILITY_KEYS) {
    const row = h('div', 'ability-row array-assign');
    const nameSpan = h('span', 'ability-name', ABILITY_NAMES[key]);
    const abbrSpan = h('span', 'ability-abbr', key);
    const sel = document.createElement('select');
    sel.className = 'ability-val';
    sel.style.width = '70px';
    sel.innerHTML = '<option value="">—</option>' +
      STD_ARRAY.map(v => {
        const takenByOther = Object.entries(state.arrayAssign).some(([k, val]) => k !== key && Number(val) === v);
        return `<option value="${v}" ${takenByOther ? 'disabled' : ''} ${state.arrayAssign[key] == v ? 'selected' : ''}>${v}</option>`;
      }).join('');
    sel.addEventListener('change', () => {
      state.arrayAssign[key] = sel.value;
      for (const k of ABILITY_KEYS) state.scores[k] = Number(state.arrayAssign[k]) || 8;
      renderStep6();
    });
    const score = Number(state.arrayAssign[key]) || 0;
    const modSpan = h('span', 'ability-mod', score ? modStr(abilityMod(score)) : '—');
    row.append(nameSpan, abbrSpan, sel, modSpan);
    rows.appendChild(row);
  }
  content.appendChild(rows);
  const assigned = Object.values(state.arrayAssign).filter(Boolean).length;
  if (assigned < 6) content.appendChild(h('div', 'warn-box', `Assign all 6 values (${assigned}/6 assigned).`));
}

function renderPointBuy(content) {
  const budget = 27;
  const spent = ABILITY_KEYS.reduce((sum, k) => sum + (PB_COSTS[state.scores[k]] || 0), 0);
  const remaining = budget - spent;

  const budgetDisp = h('div', 'pb-budget', `Points remaining: ${remaining} / ${budget}`);
  content.appendChild(budgetDisp);

  const rows = h('div', 'ability-rows');
  for (const key of ABILITY_KEYS) {
    const val = state.scores[key];
    const row = h('div', 'ability-row');
    const minus = h('button', 'pb-btn', '−');
    const plus  = h('button', 'pb-btn', '+');
    minus.addEventListener('click', () => {
      if (val > 8) { state.scores[key]--; renderStep6(); }
    });
    plus.addEventListener('click', () => {
      if (val < 15) {
        const newCost = PB_COSTS[val + 1] - PB_COSTS[val];
        if (remaining >= newCost) { state.scores[key]++; renderStep6(); }
      }
    });
    row.append(
      h('span', 'ability-name', ABILITY_NAMES[key]),
      h('span', 'ability-abbr', key),
      minus,
      h('span', 'ability-val', String(val)),
      plus,
      h('span', 'ability-mod', modStr(abilityMod(val))),
      h('span', '', `(cost: ${PB_COSTS[val]})`)
    );
    row.lastChild.style.cssText = 'font-size:.72rem;color:#7a6050';
    rows.appendChild(row);
  }
  content.appendChild(rows);
}

function renderDiceRoll(content) {
  const poolSize = 6;
  if (!state.rolledPool.length) {
    content.appendChild(h('div', 'info-box', 'Click "Roll All" to roll 4d6 drop lowest for each ability, then assign values via the dropdowns.'));
    const rollAllBtn = h('button', 'roll-btn', '🎲 Roll All 6');
    rollAllBtn.style.marginBottom = '.85rem';
    rollAllBtn.addEventListener('click', () => {
      state.rolledPool = ABILITY_KEYS.map(() => roll4d6dl());
      state.arrayAssign = {};
      for (const k of ABILITY_KEYS) state.scores[k] = 8;
      renderStep6();
    });
    content.appendChild(rollAllBtn);
    return;
  }

  // Show rolled values, allow reassignment via dropdowns
  const rolledVals = state.rolledPool.map(r => r.total);
  const rollDisp = h('div', 'info-box');
  rollDisp.innerHTML = '<strong>Rolled values:</strong> ' +
    state.rolledPool.map((r, i) => `<strong>${r.total}</strong> <small>(${r.dice.join(',')}→drop ${r.dice[0]})</small>`).join(' · ');
  const rerollBtn = h('button', 'roll-btn', '🎲 Re-roll');
  rerollBtn.style.marginLeft = '1rem';
  rerollBtn.addEventListener('click', () => {
    state.rolledPool = ABILITY_KEYS.map(() => roll4d6dl());
    state.arrayAssign = {};
    for (const k of ABILITY_KEYS) state.scores[k] = 8;
    renderStep6();
  });
  rollDisp.appendChild(rerollBtn);
  content.appendChild(rollDisp);

  // Assign rolled values to abilities (same UI as standard array but with rolled values)
  const rows = h('div', 'ability-rows');
  for (const key of ABILITY_KEYS) {
    const row = h('div', 'ability-row array-assign');
    const nameSpan = h('span', 'ability-name', ABILITY_NAMES[key]);
    const abbrSpan = h('span', 'ability-abbr', key);
    const sel = document.createElement('select');
    sel.className = 'ability-val';
    sel.style.width = '70px';
    sel.innerHTML = '<option value="">—</option>' +
      rolledVals.map(v => {
        const takenByOther = Object.entries(state.arrayAssign).some(([k, val]) => k !== key && Number(val) === v);
        return `<option value="${v}" ${takenByOther ? 'disabled' : ''} ${state.arrayAssign[key] == v ? 'selected' : ''}>${v}</option>`;
      }).join('');
    sel.addEventListener('change', () => {
      state.arrayAssign[key] = sel.value;
      for (const k of ABILITY_KEYS) state.scores[k] = Number(state.arrayAssign[k]) || 8;
      renderStep6();
    });
    const score = Number(state.arrayAssign[key]) || 0;
    const modSpan = h('span', 'ability-mod', score ? modStr(abilityMod(score)) : '—');
    row.append(nameSpan, abbrSpan, sel, modSpan);
    rows.appendChild(row);
  }
  content.appendChild(rows);
}

function renderBgBoost(content) {
  const bg = state.background;
  const bgAbils = bg.abilityScores; // 3 ability names

  const sec = h('div', 'bg-boost-section');
  sec.innerHTML = `<h3>Background Ability Score Boosts</h3>
    <p style="font-size:.8rem;margin-bottom:.6rem">Your <strong>${bg.name}</strong> background boosts: <strong>${bgAbils.join(', ')}</strong>. Choose a distribution:</p>`;

  const modeBtns = h('div', 'boost-mode-btns');
  for (const [mode, label] of [['twoOne', '+2/+1 to two'], ['threeOne', '+1/+1/+1 to all three']]) {
    const btn = h('button', 'boost-mode-btn' + (state.bgBoostMode === mode ? ' active' : ''), label);
    btn.addEventListener('click', () => {
      state.bgBoostMode = mode;
      state.bgBoosts = {};
      renderStep6();
    });
    modeBtns.appendChild(btn);
  }
  sec.appendChild(modeBtns);

  if (state.bgBoostMode === 'threeOne') {
    // All three get +1
    state.bgBoosts = {};
    for (const ab of bgAbils) {
      const key = ABILITY_KEYS.find(k => ABILITY_NAMES[k] === ab);
      if (key) state.bgBoosts[key] = 1;
    }
    const note = h('p', '', `Each of ${bgAbils.join(', ')} receives +1.`);
    note.style.fontSize = '.82rem';
    sec.appendChild(note);
  } else if (state.bgBoostMode === 'twoOne') {
    // Assign +2 and +1 among the three
    const alloc = h('div', 'boost-alloc');
    const abils = bgAbils.slice(0, 3);
    for (const boost of [2, 1]) {
      const chip = h('div', 'boost-chip');
      chip.innerHTML = `<strong>+${boost} to:</strong>`;
      const sel = document.createElement('select');
      const curKey = Object.entries(state.bgBoosts).find(([, v]) => v === boost)?.[0];
      const otherBoost = boost === 2 ? 1 : 2;
      const otherKey = Object.entries(state.bgBoosts).find(([, v]) => v === otherBoost)?.[0];
      sel.innerHTML = '<option value="">—</option>' +
        abils.map(ab => {
          const k = ABILITY_KEYS.find(k => ABILITY_NAMES[k] === ab);
          const disabled = k && k === otherKey;
          return `<option value="${k}" ${disabled ? 'disabled' : ''} ${k === curKey ? 'selected' : ''}>${ab}</option>`;
        }).join('');
      sel.addEventListener('change', () => {
        // Remove previous assignment for this boost amount
        for (const k of ABILITY_KEYS) if (state.bgBoosts[k] === boost) delete state.bgBoosts[k];
        if (sel.value) state.bgBoosts[sel.value] = boost;
        renderStep6();
      });
      chip.appendChild(sel);
      alloc.appendChild(chip);
    }
    sec.appendChild(alloc);
  }

  // Show final boosted scores
  if (state.bgBoostMode) {
    const fs = finalScores();
    const preview = h('div', 'ability-block');
    preview.style.marginTop = '.75rem';
    for (const k of ABILITY_KEYS) {
      const box = h('div', 'ab-box');
      const boost = state.bgBoosts[k] || 0;
      box.innerHTML = `<div class="ab-name">${k}</div>
        <div class="ab-score">${fs[k]}</div>
        <div class="ab-mod">${modStr(abilityMod(fs[k]))}</div>
        ${boost ? `<div style="font-size:.65rem;color:var(--green)">+${boost}</div>` : ''}`;
      if (boost) box.style.borderColor = 'var(--green)';
      preview.appendChild(box);
    }
    sec.appendChild(preview);
  }

  content.appendChild(sec);
}

// ══════════════════════════════════════════════════════════
//  STEP 7 – Alignment
// ══════════════════════════════════════════════════════════
function renderStep7() {
  const content = document.getElementById('content');
  content.innerHTML = '';
  content.appendChild(Object.assign(h('div', 'step-header'),
    { innerHTML: '<h2>Choose Alignment</h2><p>Alignment describes your character\'s moral and ethical outlook. Player characters are typically not Evil.</p>' }));

  const grid = h('div', 'alignment-grid');
  for (const al of D.alignments) {
    const btn = h('button', 'align-btn' + (state.alignment === al.name ? ' selected' : ''));
    btn.innerHTML = `${al.name}<span class="align-abbr">${al.abbreviation}</span>`;
    btn.addEventListener('click', () => {
      state.alignment = al.name;
      renderStep7();
      renderSummary();
    });
    grid.appendChild(btn);
  }
  content.appendChild(grid);

  if (state.alignment?.includes('Evil')) {
    content.appendChild(h('div', 'warn-box', '⚠ Check with your DM before choosing an Evil alignment for a player character.'));
  }
}

// ══════════════════════════════════════════════════════════
//  STEP 8 – Details
// ══════════════════════════════════════════════════════════
const DETAIL_TABS = [
  { id: 'identity',    label: 'Identity' },
  { id: 'equipment',   label: 'Equipment' },
  { id: 'spells',      label: 'Spells',     casterOnly: true },
  { id: 'stats',       label: 'Stats' },
  { id: 'trinket',     label: 'Trinket' },
];

function renderStep8() {
  const content = document.getElementById('content');
  content.innerHTML = '';
  content.appendChild(Object.assign(h('div', 'step-header'),
    { innerHTML: '<h2>Character Details</h2><p>Name your character, choose equipment, and review your calculated stats.</p>' }));

  const tabs = h('div', 'details-tabs');
  const isCaster = state.cls && isSpellcaster(state.cls.name);
  const visibleTabs = DETAIL_TABS.filter(t => !t.casterOnly || isCaster);

  if (!visibleTabs.find(t => t.id === state.detailTab)) state.detailTab = 'identity';

  for (const tab of visibleTabs) {
    const btn = h('button', 'details-tab' + (state.detailTab === tab.id ? ' active' : ''), tab.label);
    btn.addEventListener('click', () => { state.detailTab = tab.id; renderStep8(); });
    tabs.appendChild(btn);
  }
  content.appendChild(tabs);

  if (state.detailTab === 'identity')   renderIdentity(content);
  else if (state.detailTab === 'equipment') renderEquipment(content);
  else if (state.detailTab === 'spells') renderSpells(content);
  else if (state.detailTab === 'stats')  renderStats(content);
  else if (state.detailTab === 'trinket') renderTrinket(content);
}

function renderIdentity(content) {
  const panel = h('div', 'detail-panel');
  const fields = [
    ['name',   'Character Name', 'text', false],
    ['gender', 'Gender',         'text', false],
    ['age',    'Age',            'text', false],
    ['height', 'Height',         'text', false],
    ['weight', 'Weight',         'text', false],
    ['eyes',   'Eye Color',      'text', false],
    ['hair',   'Hair Color',     'text', false],
    ['skin',   'Skin/Complexion','text', false],
    ['backstory','Backstory','textarea', true],
    ['traits', 'Personality Traits', 'textarea', true],
    ['ideals', 'Ideals',         'textarea', true],
    ['bonds',  'Bonds',          'textarea', true],
    ['flaws',  'Flaws',          'textarea', true],
  ];

  const grid = h('div', 'form-grid');
  for (const [key, label, type, full] of fields) {
    const grp = h('div', 'form-group' + (full ? ' full' : ''));
    const lbl = h('label', '', label);
    let inp;
    if (type === 'textarea') {
      inp = document.createElement('textarea');
      inp.rows = 3;
    } else {
      inp = document.createElement('input');
      inp.type = 'text';
    }
    inp.value = state[key] || '';
    inp.placeholder = label;
    inp.addEventListener('input', () => { state[key] = inp.value; renderSummary(); });
    grp.append(lbl, inp);
    grid.appendChild(grp);
  }
  panel.appendChild(grid);
  content.appendChild(panel);
}

function renderEquipment(content) {
  if (!state.cls) { content.appendChild(h('p', 'info-box', 'Choose a class first.')); return; }
  const cls = state.cls;
  const bg = state.background;

  const formatItem = i => {
    if (i.gp) return `${i.gp} gp`;
    if (i['choose']) return `(your tool proficiency)`;
    return `${i.item}${i.quantity ? ` ×${i.quantity}` : ''}${i.note ? ` (${i.note})` : ''}`;
  };

  const split = h('div', 'split-panel');

  // ── LEFT: Starting equipment choices ──
  const leftCol = h('div', 'split-left');
  const panel = h('div', 'detail-panel');
  panel.style.marginTop = '0';
  panel.innerHTML = '<h3>Starting Equipment</h3><p style="font-size:.8rem;margin-bottom:.75rem">Choose Option A (item bundle) or Option B (gold) <em>independently</em> for your class and background.</p>';

  const classSec = h('div', 'detail-section');
  classSec.innerHTML = `<h4>${cls.name} Starting Equipment</h4>`;
  for (const opt of (cls.startingEquipment || [])) {
    const isSelected = state.equipClassOption === opt.option;
    const eqDiv = h('div', 'equip-option' + (isSelected ? ' selected' : ''));
    eqDiv.innerHTML = `<h4>Option ${opt.option}</h4>
      <div class="equip-list">${opt.items.map(formatItem).join(', ')}</div>`;
    eqDiv.addEventListener('click', () => { state.equipClassOption = opt.option; renderStep8(); });
    classSec.appendChild(eqDiv);
  }
  panel.appendChild(classSec);

  if (bg?.startingEquipment?.length) {
    const bgSec = h('div', 'detail-section');
    bgSec.innerHTML = `<h4>${bg.name} Background Equipment</h4>`;
    for (const opt of bg.startingEquipment) {
      const isSelected = state.equipBgOption === opt.option;
      const eqDiv = h('div', 'equip-option' + (isSelected ? ' selected' : ''));
      eqDiv.innerHTML = `<h4>Option ${opt.option}</h4>
        <div class="equip-list">${opt.items.map(formatItem).join(', ')}</div>`;
      eqDiv.addEventListener('click', () => { state.equipBgOption = opt.option; renderStep8(); });
      bgSec.appendChild(eqDiv);
    }
    panel.appendChild(bgSec);
  }
  leftCol.appendChild(panel);

  // ── RIGHT: Custom equipment browser ──
  const rightCol = h('div', 'split-right');
  renderEquipBrowser(rightCol);

  split.append(leftCol, rightCol);
  content.appendChild(split);
}

// ── GP helpers ──────────────────────────────────────────────────────────────
function getEquipGP() {
  let gp = 0;
  // Class Option B gold
  if (state.cls && state.equipClassOption) {
    const opt = (state.cls.startingEquipment || []).find(o => o.option === state.equipClassOption);
    if (opt) { const gi = opt.items.find(i => i.gp); if (gi) gp += gi.gp; }
  }
  // Background Option B gold
  if (state.background && state.equipBgOption) {
    const opt = (state.background.startingEquipment || []).find(o => o.option === state.equipBgOption);
    if (opt) { const gi = opt.items.find(i => i.gp); if (gi) gp += gi.gp; }
  }
  return gp;
}

function getCustomSpentGP() {
  return state.customItems.reduce((sum, ci) => sum + ci.costGP * ci.qty, 0);
}

// ── Equipment browser ───────────────────────────────────────────────────────
function renderEquipBrowser(content) {
  const totalGP = getEquipGP();
  const spentGP  = getCustomSpentGP();
  const remainGP = totalGP - spentGP;

  const section = h('div', 'detail-panel');
  section.style.marginTop = '1rem';
  section.innerHTML = '<h3>Custom Equipment</h3>';

  // GP tracker bar
  const gpBar = h('div', 'gp-tracker');
  gpBar.innerHTML = totalGP > 0
    ? `<span class="gp-label">Budget from Option B</span>
       <span class="gp-remain${remainGP < 0 ? ' gp-over' : ''}">${remainGP % 1 === 0 ? remainGP : remainGP.toFixed(2)} / ${totalGP} gp remaining</span>`
    : `<span class="gp-label" style="color:var(--ink-muted)">No gold budget (no Option B selected) — add items for reference</span>`;
  section.appendChild(gpBar);

  // ── Cart: custom items already added ──
  if (state.customItems.length) {
    const cartSec = h('div', 'detail-section');
    cartSec.innerHTML = '<h4>Added Items</h4>';
    const cartList = h('div', '');
    state.customItems.forEach((ci, idx) => {
      const row = h('div', 'cart-row');
      const minus = h('button', 'qty-btn', '−');
      const plus  = h('button', 'qty-btn', '+');
      const qSpan = h('span', 'qty-val', String(ci.qty));
      const del   = h('button', 'qty-btn remove-btn', '✕');
      minus.addEventListener('click', () => {
        if (ci.qty > 1) ci.qty--; else state.customItems.splice(idx, 1);
        renderStep8();
      });
      plus.addEventListener('click',  () => { ci.qty++; renderStep8(); });
      del.addEventListener('click',   () => { state.customItems.splice(idx, 1); renderStep8(); });
      const costStr = ci.costGP > 0 ? `${ci.costGP % 1 === 0 ? ci.costGP : ci.costGP.toFixed(2)} gp` : 'free';
      row.innerHTML = `<span class="cart-name">${ci.name}</span><span class="cart-cost">${costStr} ea.</span>`;
      row.append(minus, qSpan, plus, del);
      cartList.appendChild(row);
    });
    cartSec.appendChild(cartList);
    section.appendChild(cartSec);
  }

  // ── Browser tabs ──
  const BROWSER_TABS = ['Armor', 'Weapons', 'Gear', 'Packs', 'Focuses'];
  const tabBar = h('div', 'browser-tabs');
  for (const tab of BROWSER_TABS) {
    const btn = h('button', 'browser-tab' + (state.equipBrowserTab === tab ? ' active' : ''), tab);
    btn.addEventListener('click', () => { state.equipBrowserTab = tab; state.equipBrowserSearch = ''; renderStep8(); });
    tabBar.appendChild(btn);
  }
  section.appendChild(tabBar);

  // ── Search ──
  const searchBox = h('input', 'spell-search');
  searchBox.type = 'text';
  searchBox.placeholder = `Search ${state.equipBrowserTab}…`;
  searchBox.value = state.equipBrowserSearch;
  const itemList = h('div', 'equip-browser-list');
  searchBox.addEventListener('input', () => {
    state.equipBrowserSearch = searchBox.value;
    renderEquipBrowserItems(itemList);
  });
  section.appendChild(searchBox);

  renderEquipBrowserItems(itemList);
  section.appendChild(itemList);

  content.appendChild(section);
}

function renderEquipBrowserItems(container) {
  container.innerHTML = '';
  const tab    = state.equipBrowserTab;
  const filter = state.equipBrowserSearch.toLowerCase();

  // Build flat item list for the active tab
  let items = [];
  if (tab === 'Armor') {
    items = (D.armor || []).map(a => ({
      name:   a.name,
      costGP: a.costGP,
      note:   `${a.category} · AC ${a.acBase}${a.dexBonus === 'full' ? '+DEX' : a.dexBonus === 'cap' ? `+DEX (max ${a.dexCap})` : ''}`
              + (a.stealthDisadvantage ? ' · Stealth disadv.' : ''),
    }));
  } else if (tab === 'Weapons') {
    items = (D.weapons || []).map(w => ({
      name:   w.name,
      costGP: w.costGP,
      note:   `${w.category} ${w.type} · ${w.damageDie} ${w.damageType}`
              + (w.properties?.length ? ' · ' + w.properties.join(', ') : ''),
    }));
  } else if (tab === 'Gear') {
    items = (D.gear || []).map(g => ({
      name:   g.name,
      costGP: g.costGP,
      note:   g.notes ? g.notes.slice(0, 70) + (g.notes.length > 70 ? '…' : '') : '',
    }));
  } else if (tab === 'Packs') {
    items = (D.packs || []).map(p => ({
      name:   p.name,
      costGP: p.costGP,
      note:   `Contains: ${(p.contents || []).slice(0, 4).join(', ')}${(p.contents || []).length > 4 ? '…' : ''}`,
    }));
  } else if (tab === 'Focuses') {
    for (const fg of (D.focuses || [])) {
      for (const form of (fg.forms || [])) {
        items.push({
          name:   `${form.name} (${fg.type})`,
          costGP: form.costGP,
          note:   `Used by: ${(fg.usedBy || []).join(', ')}`,
        });
      }
    }
  }

  const visible = filter ? items.filter(i => i.name.toLowerCase().includes(filter)) : items;

  for (const item of visible) {
    const existing = state.customItems.find(ci => ci.name === item.name);
    const row = h('div', 'browser-item');
    const costStr = item.costGP > 0 ? `${item.costGP % 1 === 0 ? item.costGP : item.costGP.toFixed(2)} gp` : 'free';
    row.innerHTML = `<div class="bi-info"><span class="bi-name">${item.name}</span><span class="bi-note">${item.note}</span></div>
      <span class="bi-cost">${costStr}</span>`;
    const addBtn = h('button', 'qty-btn add-btn', existing ? `+1 (×${existing.qty})` : '+ Add');
    addBtn.addEventListener('click', () => {
      const ex2 = state.customItems.find(ci => ci.name === item.name);
      if (ex2) ex2.qty++;
      else state.customItems.push({ name: item.name, costGP: item.costGP, qty: 1 });
      renderStep8();
    });
    row.appendChild(addBtn);
    container.appendChild(row);
  }

  if (!visible.length) container.appendChild(h('p', 'feature-desc', 'No items match.'));
}

function renderSpells(content) {
  if (!state.cls) return;
  const sc = spellcastingInfo(state.cls.name);
  if (!sc) return;

  const className = state.cls.name;
  const spellList = D.spellLists[className] || [];
  const allSpells = D.spells.filter(s => spellList.includes(s.name));
  const cantrips = allSpells.filter(s => s.level === 0);
  const level1s  = allSpells.filter(s => s.level === 1);

  // Cleric Thaumaturge / Druid Magician extra cantrip
  let cantripCount = sc.level1.cantripsKnown;
  const orderKey = className === 'Cleric' ? 'Cleric_Divine Order' : className === 'Druid' ? 'Druid_Primal Order' : null;
  if (orderKey) {
    const chosen = state.classChoices[orderKey];
    if (chosen === 'Thaumaturge' || chosen === 'Magician') cantripCount++;
  }

  const prepared = sc.level1.preparedSpells;
  const isWizard = className === 'Wizard';
  const spellbookCount = isWizard ? (sc.level1.spellbook?.spells || 6) : null;

  const panel = h('div', 'detail-panel');
  panel.innerHTML = `<h3>${className} Spells (Level 1)</h3>
    <p style="font-size:.8rem;margin-bottom:.75rem">Spellcasting ability: <strong>${sc.ability}</strong> · Focus: ${sc.focus}</p>`;

  // Cantrips section
  if (cantripCount > 0) {
    const cs = h('div', 'spell-section');
    cs.innerHTML = `<h3>Cantrips</h3><div class="spell-limit">Choose ${cantripCount} cantrip(s) — ${state.spells.cantrips.length}/${cantripCount} chosen</div>`;
    const search = h('input', 'spell-search');
    search.placeholder = 'Search cantrips…';
    search.type = 'text';
    let filter = '';
    search.addEventListener('input', () => { filter = search.value.toLowerCase(); renderSpellList(listEl, cantrips, 'cantrips', cantripCount, filter); });
    cs.appendChild(search);
    const listEl = h('div', 'spell-list');
    renderSpellList(listEl, cantrips, 'cantrips', cantripCount, filter);
    cs.appendChild(listEl);
    panel.appendChild(cs);
  }

  // Level 1 spells
  const label = isWizard ? `Spellbook Spells (choose ${spellbookCount})` : `Prepared Spells (choose ${prepared})`;
  const count = isWizard ? spellbookCount : prepared;
  const ps = h('div', 'spell-section');
  ps.style.marginTop = '1rem';
  ps.innerHTML = `<h3>${label}</h3><div class="spell-limit">${state.spells.prepared.length}/${count} chosen</div>`;
  const search2 = h('input', 'spell-search');
  search2.placeholder = 'Search spells…';
  search2.type = 'text';
  let filter2 = '';
  search2.addEventListener('input', () => { filter2 = search2.value.toLowerCase(); renderSpellList(listEl2, level1s, 'prepared', count, filter2); });
  ps.appendChild(search2);
  const listEl2 = h('div', 'spell-list');
  renderSpellList(listEl2, level1s, 'prepared', count, filter2);
  ps.appendChild(listEl2);
  panel.appendChild(ps);

  content.appendChild(panel);
}

function renderSpellList(container, spells, stateKey, max, filter) {
  container.innerHTML = '';
  const visible = filter ? spells.filter(s => s.name.toLowerCase().includes(filter)) : spells;
  for (const sp of visible) {
    const chosen = state.spells[stateKey].includes(sp.name);
    const item = h('div', 'spell-item' + (chosen ? ' selected' : ''));
    item.innerHTML = `<input type="checkbox" ${chosen ? 'checked' : ''}>
      <div>
        <div class="spell-name">${sp.name}</div>
        <div class="spell-meta">${sp.school} · ${sp.castingTime} · Range ${sp.range} · ${sp.duration}${sp.concentration ? ' · Conc.' : ''}${sp.ritual ? ' · Ritual' : ''}</div>
        <div class="spell-meta" style="font-style:italic;margin-top:1px">${sp.description.slice(0, 90)}…</div>
      </div>`;
    item.addEventListener('click', () => {
      const list = state.spells[stateKey];
      const idx = list.indexOf(sp.name);
      if (idx >= 0) list.splice(idx, 1);
      else if (list.length < max) list.push(sp.name);
      renderSpellList(container, spells, stateKey, max, filter);
    });
    container.appendChild(item);
  }
  if (!visible.length) container.appendChild(h('p', 'feature-desc', 'No spells match.'));
}

function renderStats(content) {
  const panel = h('div', 'detail-panel');
  panel.innerHTML = '<h3>Character Statistics</h3>';

  const fs = finalScores();

  // Ability scores block
  const abBlock = h('div', 'ability-block');
  for (const k of ABILITY_KEYS) {
    const box = h('div', 'ab-box');
    box.innerHTML = `<div class="ab-name">${k}</div>
      <div class="ab-score">${fs[k]}</div>
      <div class="ab-mod">${modStr(abilityMod(fs[k]))}</div>`;
    abBlock.appendChild(box);
  }
  panel.appendChild(abBlock);

  // Derived stats
  const dex = abilityMod(fs.DEX);
  const con = abilityMod(fs.CON);
  const wis = abilityMod(fs.WIS);
  const hitDie = state.cls?.hitDie || 'd8';
  const hitDieMax = { d6:6, d8:8, d10:10, d12:12 }[hitDie] || 8;
  const hp = hitDieMax + con;
  const initiative = dex;
  const passivePerception = 10 + wis + (backgroundSkills().includes('Perception') || state.classSkills.includes('Perception') ? 2 : 0);
  const profBonus = 2;

  // Spellcasting
  const sc = state.cls ? spellcastingInfo(state.cls.name) : null;
  let spellAbilKey = null, spellDC = null, spellAtk = null;
  if (sc) {
    const scAbilName = sc.ability;
    spellAbilKey = ABILITY_KEYS.find(k => ABILITY_NAMES[k] === scAbilName);
    const spellMod = spellAbilKey ? abilityMod(fs[spellAbilKey]) : 0;
    spellDC = 8 + profBonus + spellMod;
    spellAtk = modStr(profBonus + spellMod);
  }

  // AC — class-specific unarmored formulas take precedence
  let ac, acNote;
  if (state.cls?.name === 'Barbarian') {
    ac = 10 + dex + con;
    acNote = '10+DEX+CON (Unarmored Defense)';
  } else if (state.cls?.name === 'Monk') {
    ac = 10 + dex + wis;
    acNote = '10+DEX+WIS (Unarmored Defense)';
  } else {
    ac = 10 + dex;
    acNote = '10+DEX (no armor)';
  }

  const statsGrid = h('div', 'stats-grid');
  const statBoxes = [
    ['Proficiency Bonus', `+${profBonus}`, 'All classes at level 1'],
    ['Hit Points',        String(hp),       `${hitDie} max + CON mod`],
    ['Armor Class',       String(ac),       acNote],
    ['Initiative',        modStr(initiative), 'DEX modifier'],
    ['Passive Perception',String(passivePerception), '10 + WIS mod (+prof if trained)'],
    ['Speed',             state.species ? `${state.species.speed.walk} ft.` : '—', ''],
    ...(sc ? [
      ['Spell Save DC',   String(spellDC),  `8 + prof + ${sc.ability} mod`],
      ['Spell Attack',    spellAtk,         `Prof + ${sc.ability} mod`],
    ] : []),
  ];
  for (const [label, val, note] of statBoxes) {
    const box = h('div', 'stat-box');
    box.innerHTML = `<div class="stat-label">${label}</div>
      <div class="stat-value">${val}</div>
      ${note ? `<div class="stat-note">${note}</div>` : ''}`;
    statsGrid.appendChild(box);
  }
  panel.appendChild(statsGrid);

  // Saving throws
  const saveSec = h('div', 'detail-section');
  saveSec.style.marginTop = '.85rem';
  saveSec.innerHTML = '<h4>Saving Throws</h4>';
  const saveGrid = h('div', 'stats-grid');
  for (const k of ABILITY_KEYS) {
    const prof = state.cls?.savingThrows?.includes(ABILITY_NAMES[k]);
    const val = abilityMod(fs[k]) + (prof ? profBonus : 0);
    const box = h('div', 'stat-box');
    box.innerHTML = `<div class="stat-label">${k} Save</div>
      <div class="stat-value">${modStr(val)}</div>
      <div class="stat-note">${prof ? 'Proficient' : ''}</div>`;
    if (prof) box.style.borderColor = 'var(--gold)';
    saveGrid.appendChild(box);
  }
  saveSec.appendChild(saveGrid);
  panel.appendChild(saveSec);

  // Skills
  const allMySkills = [...new Set([...backgroundSkills(), ...state.classSkills])];
  const expertise = state.classChoices['Rogue_Expertise'] || [];
  const skillSec = h('div', 'detail-section');
  skillSec.style.marginTop = '.85rem';
  skillSec.innerHTML = '<h4>Skills</h4>';
  const skillGrid = h('div', 'stats-grid');
  for (const sk of D.skills) {
    const prof = allMySkills.includes(sk.name);
    const exp = expertise.includes(sk.name);
    const abilMod = abilityMod(fs[sk.ability]);
    const val = abilMod + (exp ? profBonus * 2 : prof ? profBonus : 0);
    const box = h('div', 'stat-box');
    box.innerHTML = `<div class="stat-label">${sk.name}<br><small>${sk.ability}</small></div>
      <div class="stat-value">${modStr(val)}</div>
      <div class="stat-note">${exp ? 'Expertise' : prof ? 'Proficient' : ''}</div>`;
    if (exp) box.style.borderColor = 'var(--gold)';
    else if (prof) box.style.borderColor = 'var(--green)';
    skillGrid.appendChild(box);
  }
  skillSec.appendChild(skillGrid);
  panel.appendChild(skillSec);

  content.appendChild(panel);
}

function renderTrinket(content) {
  const panel = h('div', 'detail-panel');
  panel.innerHTML = '<h3>Roll a Trinket (Optional)</h3><p style="font-size:.82rem;margin-bottom:.6rem">Roll 1d100 to receive a mysterious free Tiny item.</p>';
  const roller = h('div', 'trinket-roller');
  const btn = h('button', 'roll-btn', '🎲 Roll Trinket (d100)');
  btn.addEventListener('click', () => {
    const roll = Math.ceil(Math.random() * 100);
    const t = D.trinkets.find(t => t.roll === roll) || D.trinkets[D.trinkets.length - 1];
    state.trinket = t;
    roller.querySelector('.trinket-result')?.remove();
    const res = h('div', 'trinket-result', `Roll: <strong>${roll}</strong> — ${t.description}`);
    roller.appendChild(res);
    renderSummary();
  });
  roller.appendChild(btn);
  if (state.trinket) {
    roller.appendChild(h('div', 'trinket-result', `Current trinket: ${state.trinket.description}`));
  }
  panel.appendChild(roller);
  content.appendChild(panel);
}

// ══════════════════════════════════════════════════════════
//  SUMMARY SIDEBAR
// ══════════════════════════════════════════════════════════
function renderSummary() {
  const body = document.getElementById('summary-body');
  body.innerHTML = '';

  const row = (label, val) => {
    if (!val) return;
    const d = h('div', 'sum-row');
    d.innerHTML = `<div class="sum-label">${label}</div><div class="sum-value">${val}</div>`;
    body.appendChild(d);
  };
  const divider = () => body.appendChild(h('hr', 'sum-divider'));

  if (state.name) row('Name', state.name);
  if (state.cls)  row('Class', state.cls.name);
  if (state.background) row('Background', state.background.name);
  if (state.species) row('Species', state.species.name);
  if (state.alignment) row('Alignment', state.alignment);

  if (state.cls || state.background || state.species) divider();

  const allLangs = [...new Set([...autoLanguages(), ...state.languages])];
  if (allLangs.length) row('Languages', allLangs.join(', '));

  const allSkills = [...new Set([...backgroundSkills(), ...state.classSkills])];
  if (allSkills.length) row('Skills', allSkills.join(', '));

  if (state.scoreMethod) {
    divider();
    const fs = finalScores();
    const scoreDiv = h('div', '');
    scoreDiv.innerHTML = '<div class="sum-label">Ability Scores</div>';
    const grid = h('div', 'sum-scores');
    for (const k of ABILITY_KEYS) {
      const b = h('div', 'sum-score');
      b.innerHTML = `<div class="sc-abbr">${k}</div><div class="sc-val">${fs[k]}</div>`;
      grid.appendChild(b);
    }
    scoreDiv.appendChild(grid);
    body.appendChild(scoreDiv);
  }

  if (state.cls?.hitDie && state.scoreMethod) {
    divider();
    const fs = finalScores();
    const hp = ({ d6:6, d8:8, d10:10, d12:12 }[state.cls.hitDie] || 8) + abilityMod(fs.CON);
    row('Hit Points', String(hp));
    row('Hit Die', state.cls.hitDie);
    row('Prof. Bonus', '+2');
  }

  if (state.trinket) {
    divider();
    row('Trinket', state.trinket.description);
  }
}

// ══════════════════════════════════════════════════════════
//  FINISHED
// ══════════════════════════════════════════════════════════
function renderFinished() {
  const content = document.getElementById('content');
  content.innerHTML = '';

  const panel = h('div', 'detail-panel');
  panel.style.maxWidth = '600px';
  const name = state.name || 'Your Character';
  panel.innerHTML = `<h3>🎉 ${name} is Ready!</h3>
    <p style="font-size:.9rem;margin-bottom:.75rem">Character creation is complete. Here is your full summary:</p>`;

  const fs = finalScores();
  const sc = state.cls ? spellcastingInfo(state.cls.name) : null;

  const sections = [
    ['Identity', [
      ['Name', state.name],
      ['Gender', state.gender], ['Age', state.age],
      ['Alignment', state.alignment],
      ['Height', state.height], ['Weight', state.weight],
    ]],
    ['Class & Background', [
      ['Class', state.cls?.name],
      ['Hit Die', state.cls?.hitDie],
      ['Background', state.background?.name],
      ['Origin Feat', state.background?.originFeat],
      ['Species', state.species?.name],
    ]],
    ['Proficiencies', [
      ['Skills', [...new Set([...backgroundSkills(), ...state.classSkills])].join(', ')],
      ['Languages', [...new Set([...autoLanguages(), ...state.languages])].join(', ')],
      ['Armor', state.cls?.armorTraining?.join(', ')],
      ['Weapons', state.cls?.weaponProficiencies?.join(', ')],
    ]],
  ];

  for (const [title, rows] of sections) {
    const sec = h('div', 'detail-section');
    sec.innerHTML = `<h4>${title}</h4>`;
    for (const [label, val] of rows) {
      if (val) sec.innerHTML += `<p style="font-size:.82rem"><strong>${label}:</strong> ${val}</p>`;
    }
    panel.appendChild(sec);
  }

  // Ability scores
  const abSec = h('div', 'detail-section');
  abSec.innerHTML = '<h4>Ability Scores</h4>';
  const abBlock = h('div', 'ability-block');
  for (const k of ABILITY_KEYS) {
    const box = h('div', 'ab-box');
    box.innerHTML = `<div class="ab-name">${k}</div>
      <div class="ab-score">${fs[k]}</div>
      <div class="ab-mod">${modStr(abilityMod(fs[k]))}</div>`;
    abBlock.appendChild(box);
  }
  abSec.appendChild(abBlock);
  panel.appendChild(abSec);

  const printBtn = h('button', 'roll-btn', '🖨 Print / Save as PDF');
  printBtn.style.marginTop = '1rem';
  printBtn.addEventListener('click', () => window.print());
  panel.appendChild(printBtn);

  const restartBtn = h('button', 'btn btn-ghost', 'Start Over');
  restartBtn.style.marginLeft = '.75rem';
  restartBtn.style.marginTop = '1rem';
  restartBtn.addEventListener('click', () => {
    if (confirm('Start over? All progress will be lost.')) {
      Object.assign(state, {
        step:1, cls:null, background:null, species:null,
        languages:[], classSkills:[], speciesChoices:{}, featChoices:{}, scoreMethod:null,
        scores:{STR:8,DEX:8,CON:8,INT:8,WIS:8,CHA:8},
        arrayAssign:{}, rolledPool:[], bgBoostMode:null, bgBoosts:{},
        alignment:null, name:'', gender:'', age:'', height:'', weight:'',
        eyes:'', hair:'', skin:'', backstory:'', traits:'', ideals:'',
        bonds:'', flaws:'',
        equipClassOption:null, equipBgOption:null,
        customItems:[], equipBrowserTab:'Armor', equipBrowserSearch:'',
        spells:{cantrips:[],prepared:[]}, trinket:null, classChoices:{},
        detailTab:'identity',
      });
      render();
    }
  });
  panel.appendChild(restartBtn);
  content.appendChild(panel);
  renderSummary();
  document.getElementById('btn-next').disabled = true;
}

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => render());
