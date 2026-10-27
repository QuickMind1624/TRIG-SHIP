/* =====================================================
   TRIGOLAB DEGREE ↔ RADIAN CONVERTER
   Exact degree output + a safe expression parser for radian input.
   Supports π, 3π/4, 2*pi, brackets and basic arithmetic without eval().
   ===================================================== */
(function initTrigoLabRadianConverter() {
  'use strict';

  function formatNumber(value, digits) {
    if (!Number.isFinite(value)) return 'Invalid input';
    if (Math.abs(value) < 1e-12) return '0';
    return value.toFixed(digits == null ? 9 : digits)
      .replace(/(?:\.0+|(\.\d*?)0+)$/, '$1');
  }

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const remainder = a % b;
      a = b;
      b = remainder;
    }
    return a || 1;
  }

  function approximateFraction(value) {
    if (!Number.isFinite(value)) return null;
    if (Math.abs(value) < 1e-12) return { n: 0, d: 1 };

    const sign = value < 0 ? -1 : 1;
    let x = Math.abs(value);
    let h0 = 0, h1 = 1, k0 = 1, k1 = 0;
    const maxDenominator = 1000000;

    for (let i = 0; i < 32; i++) {
      const a = Math.floor(x);
      const h2 = a * h1 + h0;
      const k2 = a * k1 + k0;
      if (k2 > maxDenominator) break;

      h0 = h1; h1 = h2;
      k0 = k1; k1 = k2;

      if (Math.abs(h1 / k1 - Math.abs(value)) < 1e-10) {
        return { n: sign * h1, d: k1 };
      }

      const remainder = x - a;
      if (remainder < 1e-14) break;
      x = 1 / remainder;
    }

    const divisor = gcd(h1, k1);
    return { n: sign * (h1 / divisor), d: k1 / divisor };
  }

  function formatPiMultiple(degrees) {
    const fraction = approximateFraction(degrees / 180);
    if (!fraction || fraction.n === 0) return '0';

    const n = fraction.n;
    const d = fraction.d;
    const absN = Math.abs(n);
    const sign = n < 0 ? '−' : '';
    const numerator = absN === 1 ? 'π' : absN + 'π';
    return sign + numerator + (d === 1 ? '' : '/' + d);
  }

  function parseRadianExpression(raw) {
    let source = String(raw == null ? '' : raw)
      .trim()
      .toLowerCase()
      .replace(/π/g, 'pi')
      .replace(/[−–]/g, '-')
      .replace(/[×·]/g, '*')
      .replace(/[÷]/g, '/')
      .replace(/\s+/g, '');

    if (!source) return NaN;

    const tokens = [];
    let position = 0;
    while (position < source.length) {
      const match = source.slice(position).match(/^(?:\d+(?:\.\d*)?|\.\d+|pi|[()+\-*/])/i);
      if (!match) return NaN;
      const token = match[0];
      tokens.push(token);
      position += token.length;
    }

    // Make common mathematical shorthand work: 2π, 3(π/4), and (π)2.
    const expanded = [];
    function endsValue(token) {
      return token === 'pi' || token === ')' || /^\d/.test(token) || /^\.\d/.test(token);
    }
    function startsValue(token) {
      return token === 'pi' || token === '(' || /^\d/.test(token) || /^\.\d/.test(token);
    }
    tokens.forEach(function (token) {
      const previous = expanded.length ? expanded[expanded.length - 1] : null;
      if (previous && endsValue(previous) && startsValue(token)) expanded.push('*');
      expanded.push(token);
    });

    let cursor = 0;
    function expression() {
      let value = term();
      while (expanded[cursor] === '+' || expanded[cursor] === '-') {
        const operator = expanded[cursor++];
        const right = term();
        value = operator === '+' ? value + right : value - right;
      }
      return value;
    }
    function term() {
      let value = unary();
      while (expanded[cursor] === '*' || expanded[cursor] === '/') {
        const operator = expanded[cursor++];
        const right = unary();
        if (operator === '/' && right === 0) throw new Error('Division by zero');
        value = operator === '*' ? value * right : value / right;
      }
      return value;
    }
    function unary() {
      if (expanded[cursor] === '+') {
        cursor++;
        return unary();
      }
      if (expanded[cursor] === '-') {
        cursor++;
        return -unary();
      }
      return primary();
    }
    function primary() {
      const token = expanded[cursor++];
      if (token === 'pi') return Math.PI;
      if (token === '(') {
        const value = expression();
        if (expanded[cursor] !== ')') throw new Error('Missing closing bracket');
        cursor++;
        return value;
      }
      if (token && /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token)) return Number(token);
      throw new Error('Invalid expression');
    }

    try {
      const result = expression();
      if (cursor !== expanded.length || !Number.isFinite(result)) return NaN;
      return result;
    } catch (error) {
      return NaN;
    }
  }

  function init() {
    const degreeInput = document.getElementById('radDegreeInput');
    const degreeButton = document.getElementById('radDegreeConvert');
    const degreeExact = document.getElementById('radDegreeExact');
    const degreeDecimal = document.getElementById('radDegreeDecimal');
    const radianInput = document.getElementById('radRadianInput');
    const radianButton = document.getElementById('radRadianConvert');
    const radianDegree = document.getElementById('radRadianDegree');
    const radianDecimal = document.getElementById('radRadianDecimal');

    if (!degreeInput || !degreeButton || !degreeExact || !degreeDecimal ||
        !radianInput || !radianButton || !radianDegree || !radianDecimal) return;

    function convertDegrees() {
      const raw = degreeInput.value.trim();
      const degrees = raw === '' ? NaN : Number(raw);
      if (!Number.isFinite(degrees)) {
        degreeExact.textContent = 'Invalid input';
        degreeDecimal.textContent = 'Enter a valid degree number';
        return;
      }
      degreeExact.textContent = formatPiMultiple(degrees);
      degreeDecimal.textContent = formatNumber(degrees * Math.PI / 180);
    }

    function convertRadians() {
      const radians = parseRadianExpression(radianInput.value);
      if (!Number.isFinite(radians)) {
        radianDegree.textContent = 'Check expression';
        radianDecimal.textContent = 'Example: π/2, 3π/4, (2π)/3';
        return;
      }
      radianDegree.textContent = formatNumber(radians * 180 / Math.PI) + '°';
      radianDecimal.textContent = formatNumber(radians);
    }

    function insertAtCursor(text) {
      const start = Number.isInteger(radianInput.selectionStart) ? radianInput.selectionStart : radianInput.value.length;
      const end = Number.isInteger(radianInput.selectionEnd) ? radianInput.selectionEnd : start;
      radianInput.setRangeText(text, start, end, 'end');
      radianInput.focus();
      convertRadians();
    }

    document.querySelectorAll('[data-rad-key]').forEach(function (button) {
      button.addEventListener('click', function () {
        insertAtCursor(button.getAttribute('data-rad-key') || '');
      });
    });

    document.querySelectorAll('[data-rad-action]').forEach(function (button) {
      button.addEventListener('click', function () {
        const action = button.getAttribute('data-rad-action');
        if (action === 'clear') {
          radianInput.value = '';
          radianInput.focus();
          convertRadians();
        } else if (action === 'backspace') {
          const start = Number.isInteger(radianInput.selectionStart) ? radianInput.selectionStart : radianInput.value.length;
          const end = Number.isInteger(radianInput.selectionEnd) ? radianInput.selectionEnd : start;
          if (start === end && start > 0) radianInput.setSelectionRange(start - 1, end);
          radianInput.setRangeText('', radianInput.selectionStart, radianInput.selectionEnd, 'end');
          radianInput.focus();
          convertRadians();
        } else if (action === 'convert') {
          convertRadians();
        }
      });
    });

    degreeButton.addEventListener('click', convertDegrees);
    radianButton.addEventListener('click', convertRadians);
    degreeInput.addEventListener('input', convertDegrees);
    radianInput.addEventListener('input', convertRadians);
    degreeInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') convertDegrees();
    });
    radianInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') convertRadians();
    });

    convertDegrees();
    convertRadians();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
