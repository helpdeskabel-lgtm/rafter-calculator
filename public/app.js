// Rafter length calculator — pure right triangle: rafter = sqrt(run^2 + height^2)

const form = document.getElementById('calc-form');
const resetBtn = document.getElementById('reset');
const errorEl = document.getElementById('error');
const resultEl = document.getElementById('result');

const widthFtEl = document.getElementById('width-ft');
const widthInEl = document.getElementById('width-in');
const heightFtEl = document.getElementById('height-ft');
const heightInEl = document.getElementById('height-in');

const rafterOutEl = document.getElementById('rafter-out');
const rafterTotalOutEl = document.getElementById('rafter-total-out');
const stepWidthEl = document.getElementById('step-width');
const stepRunEl = document.getElementById('step-run');
const stepHeightEl = document.getElementById('step-height');
const stepFinalEl = document.getElementById('step-final');

function parseField(el) {
  const raw = el.value.trim();
  if (raw === '') return 0;
  const n = Number(raw);
  if (!Number.isFinite(n)) return NaN;
  return n;
}

function toInches(feet, inches) {
  return feet * 12 + inches;
}

function inchesToFeetInches(totalInches) {
  const rounded = Math.round(totalInches);
  return { feet: Math.floor(rounded / 12), inches: rounded % 12 };
}

function formatFtIn({ feet, inches }) {
  return `${feet} ft ${inches} in`;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// Round to nearest 1/16 in, return { wholeIn, num, denom } with fraction simplified.
function toSixteenths(decimalInches) {
  const sixteenths = Math.round(decimalInches * 16);
  const wholeIn = Math.floor(sixteenths / 16);
  const remainder = sixteenths % 16;
  if (remainder === 0) return { wholeIn, num: 0, denom: 1 };
  const g = gcd(remainder, 16);
  return { wholeIn, num: remainder / g, denom: 16 / g };
}

function formatFtInFrac(decimalInches) {
  const { wholeIn, num, denom } = toSixteenths(decimalInches);
  const feet = Math.floor(wholeIn / 12);
  const inches = wholeIn % 12;
  const frac = num === 0 ? '' : ` ${num}/${denom}`;
  return `${feet} ft ${inches}${frac} in`;
}

function formatTotalInFrac(decimalInches) {
  const { wholeIn, num, denom } = toSixteenths(decimalInches);
  const frac = num === 0 ? '' : ` ${num}/${denom}`;
  return `${wholeIn}${frac} in`;
}

function showError(msg) {
  errorEl.textContent = msg;
  resultEl.classList.add('hidden');
}

function clearError() {
  errorEl.textContent = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearError();

  const widthFt = parseField(widthFtEl);
  const widthIn = parseField(widthInEl);
  const heightFt = parseField(heightFtEl);
  const heightIn = parseField(heightInEl);

  if ([widthFt, widthIn, heightFt, heightIn].some((v) => Number.isNaN(v))) {
    return showError('Please enter valid numbers only.');
  }
  if ([widthFt, widthIn, heightFt, heightIn].some((v) => v < 0)) {
    return showError('Negative numbers are not allowed.');
  }
  if (widthIn > 11 || heightIn > 11) {
    return showError('Inches must be between 0 and 11.');
  }

  const widthTotalIn = toInches(widthFt, widthIn);
  const heightTotalIn = toInches(heightFt, heightIn);

  if (widthTotalIn <= 0) {
    return showError('Please enter a building width greater than zero.');
  }
  if (heightTotalIn <= 0) {
    return showError('Please enter a rafter height greater than zero.');
  }

  const runIn = widthTotalIn / 2;
  const rafterIn = Math.sqrt(runIn * runIn + heightTotalIn * heightTotalIn);

  const widthFtIn = inchesToFeetInches(widthTotalIn);
  const runFtIn = inchesToFeetInches(runIn);
  const heightFtIn = inchesToFeetInches(heightTotalIn);

  rafterOutEl.textContent = formatFtInFrac(rafterIn);
  rafterTotalOutEl.textContent = formatTotalInFrac(rafterIn);
  stepWidthEl.textContent = formatFtIn(widthFtIn);
  stepRunEl.textContent = formatFtIn(runFtIn);
  stepHeightEl.textContent = formatFtIn(heightFtIn);
  stepFinalEl.textContent = formatFtInFrac(rafterIn);

  resultEl.classList.remove('hidden');
});

resetBtn.addEventListener('click', () => {
  form.reset();
  clearError();
  resultEl.classList.add('hidden');
  widthFtEl.focus();
});
