/* =====================================================
   TRIGOLAB — ANY-ANGLE RELATIONS
   Related angles share a reference angle; coterminal angles
   differ by an integer multiple of 360 degrees.
   ===================================================== */
(function initAnyAngleRelations() {
  'use strict';

  const input = document.getElementById('freeAngleInput');
  const toggle = document.getElementById('angleRelationsToggle');
  const panel = document.getElementById('angleRelationsPanel');
  const summary = document.getElementById('angleRelationsSummary');
  const relatedList = document.getElementById('relatedAnglesList');
  const coterminalList = document.getElementById('coterminalAnglesList');
  const exactSinList = document.getElementById('exactSinAngles');
  const exactCosList = document.getElementById('exactCosAngles');
  if (!input || !toggle || !panel || !summary || !relatedList || !coterminalList || !exactSinList || !exactCosList) return;

  const EPS = 1e-8;
  const normalize = angle => {
    const n = ((angle % 360) + 360) % 360;
    return Math.abs(n) < EPS || Math.abs(n - 360) < EPS ? 0 : n;
  };
  const clean = n => {
    if (Math.abs(n) < EPS) return '0';
    const rounded = Math.round(n * 1e8) / 1e8;
    return String(rounded);
  };
  function quadrant(angle) {
    const a = normalize(angle);
    if (Math.abs(a) < EPS || Math.abs(a - 180) < EPS) return 'X-axis';
    if (Math.abs(a - 90) < EPS || Math.abs(a - 270) < EPS) return 'Y-axis';
    if (a < 90) return 'Quadrant I';
    if (a < 180) return 'Quadrant II';
    if (a < 270) return 'Quadrant III';
    return 'Quadrant IV';
  }
  function referenceAngle(angle) {
    const a = normalize(angle);
    if (a <= 90) return a;
    if (a <= 180) return 180 - a;
    if (a <= 270) return a - 180;
    return 360 - a;
  }
  // Exact values for standard special angles. Each quadrant gets its real sign.
  const SPECIAL_REFERENCE_ANGLES = [0, 30, 45, 60, 90];
  function exactRadical(numerator, denominator) {
    if (numerator === 0) return '0';
    const sign = numerator < 0 ? '−' : '';
    const n = Math.abs(numerator);
    if (denominator === 1) return sign + (n === 1 ? '1' : String(n));
    if (n === 1) return sign + '1/' + denominator;
    return sign + '√' + n + '/' + denominator;
  }
  function exactValueFor(angle, func) {
    const a = normalize(angle);
    const r = a * Math.PI / 180;
    const raw = func === 'sin' ? Math.sin(r) : Math.cos(r);
    if (Math.abs(raw) < EPS) return '0';
    const rootTwo = Math.abs(Math.abs(raw) - Math.SQRT1_2) < EPS;
    const rootThree = Math.abs(Math.abs(raw) - Math.sqrt(3) / 2) < EPS;
    const half = Math.abs(Math.abs(raw) - .5) < EPS;
    let value;
    if (rootTwo) value = '1/√2';
    else if (rootThree) value = '√3/2';
    else if (half) value = '1/2';
    else if (Math.abs(Math.abs(raw) - 1) < EPS) value = '1';
    else return null;
    return raw < 0 ? '−' + value : value;
  }
  function isStandardExactAngle(angle) {
    const ref = referenceAngle(angle);
    return SPECIAL_REFERENCE_ANGLES.some(a => Math.abs(a - ref) < EPS);
  }
  function addExactAngle(parent, angle, func, note) {
    const value = exactValueFor(angle, func);
    if (value === null) return;
    const item = document.createElement('div');
    item.className = 'angle-exact-item';
    const main = document.createElement('strong');
    main.textContent = clean(angle) + '°';
    const valueNode = document.createElement('span');
    valueNode.textContent = func + ' = ' + value;
    const detail = document.createElement('small');
    detail.textContent = note;
    item.append(main, valueNode, detail);
    parent.appendChild(item);
  }
  function renderExactAngles(raw, related) {
    exactSinList.replaceChildren();
    exactCosList.replaceChildren();
    const coterminals = [raw - 360, raw + 360];
    const candidates = [...related.filter(a => Math.abs(a - normalize(raw)) > EPS), ...coterminals];
    const unique = candidates.filter((a, i, all) => all.findIndex(b => Math.abs(a - b) < EPS) === i);
    const sinCurrent = exactValueFor(raw, 'sin');
    const cosCurrent = exactValueFor(raw, 'cos');
    let sinCount = 0, cosCount = 0;
    unique.forEach(angle => {
      if (!isStandardExactAngle(angle)) return;
      const sinVal = exactValueFor(angle, 'sin');
      const cosVal = exactValueFor(angle, 'cos');
      if (sinVal !== null) {
        addExactAngle(exactSinList, angle, 'sin', sinVal === sinCurrent ? 'Same exact value as input' : 'Exact value; sign shown');
        sinCount++;
      }
      if (cosVal !== null) {
        addExactAngle(exactCosList, angle, 'cos', cosVal === cosCurrent ? 'Same exact value as input' : 'Exact value; sign shown');
        cosCount++;
      }
    });
    if (!sinCount) exactSinList.textContent = 'No other standard exact angles in this set.';
    if (!cosCount) exactCosList.textContent = 'No other standard exact angles in this set.';
  }
  function addItem(parent, angle, detail, isEntered) {
    const item = document.createElement('div');
    item.className = 'angle-relation-item' + (isEntered ? ' is-entered' : '');
    const strong = document.createElement('strong');
    strong.textContent = clean(angle) + '°';
    const small = document.createElement('small');
    small.textContent = detail;
    item.append(strong, small);
    parent.appendChild(item);
  }
  function render() {
    const raw = Number(input.value);
    if (input.value.trim() === '' || !Number.isFinite(raw)) {
      summary.textContent = 'Enter a valid finite angle to see its related and coterminal angles.';
      relatedList.replaceChildren();
      coterminalList.replaceChildren();
      exactSinList.replaceChildren(); exactCosList.replaceChildren();
      return;
    }

    const equivalent = normalize(raw);
    const ref = referenceAngle(raw);
    summary.textContent = 'Entered: ' + clean(raw) + '° (your input). Equivalent position: ' +
      clean(equivalent) + '° (' + quadrant(equivalent) + '). Reference angle: ' +
      clean(ref) + '° (' + (ref === 0 ? 'axis angle' : 'acute reference angle') + ').';

    relatedList.replaceChildren();
    const candidates = [ref, 180 - ref, 180 + ref, 360 - ref]
      .map(normalize)
      .filter((angle, index, all) => all.findIndex(other => Math.abs(other - angle) < EPS) === index)
      .sort((a, b) => a - b);
    candidates.forEach(angle => {
      const detail = quadrant(angle) + (Math.abs(angle - equivalent) < EPS ? ' · same position as input' : '');
      addItem(relatedList, angle, detail, Math.abs(angle - equivalent) < EPS);
    });
    renderExactAngles(raw, candidates);
    if (candidates.length === 1) {
      const note = document.createElement('div');
      note.className = 'angle-relation-note';
      note.textContent = 'At an axis angle, the distinct related-angle positions collapse to one position.';
      relatedList.appendChild(note);
    }

    coterminalList.replaceChildren();
    // Show the nearest coterminal value one full turn below, the entered value,
    // and one full turn above. This also works for negative and large angles.
    const coterminals = [raw - 360, raw, raw + 360];
    coterminals.forEach((angle, index) => {
      const isEntered = index === 1;
      addItem(coterminalList, angle, (isEntered ? 'Your entered angle' : 'Same terminal side') + ' · ' + quadrant(angle), isEntered);
    });
  }

  toggle.addEventListener('click', () => {
    const willShow = panel.hidden;
    panel.hidden = !willShow;
    toggle.setAttribute('aria-expanded', String(willShow));
    toggle.innerHTML = willShow
      ? 'Hide angle relations <span aria-hidden="true">⌃</span>'
      : 'Show angle relations <span aria-hidden="true">⌄</span>';
  });
  input.addEventListener('input', render);
  render();
})();