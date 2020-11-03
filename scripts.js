/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

function code(str, shift, alphabet = '', type) {
  const r = Number.parseInt(shift, 10);

  /**
   * Kóðar streng með því að hliðra honum um n stök.
   *
   * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
   * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
   * @param {string} alphabet Stafróf sem kóða á út frá
   * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
   */

  function encode(n) {
    const upper = str.toLocaleUpperCase();

    let result = '';
    for (let i = 0; i < str.length; i += 1) {
      if (alphabet.includes(upper[i])) {
        result += alphabet[(alphabet.indexOf(upper[i]) + n) % alphabet.length];
      }
    }
    return result;
  }

  /**
   * Afkóðar streng með því að hliðra honum um n stök.
   *
   * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
   * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
   * @param {string} alphabet Stafróf sem afkóða á út frá
   * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
   */
  function decode(n) {
    const m = alphabet.length - n;
    return encode(m);
  }
  if (type === 'encode') {
    return encode(r);
  }
  return decode(r);
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  function change() {
    const str = document.getElementById('input').value;
    const newAlph = document.getElementById('alphabet').value;
    const upper = newAlph.toLocaleUpperCase();
    alphabet = upper;
    document.querySelector('.result').textContent = code(str, shift, alphabet, type);
  }

  function toggler(e) {
    const str = document.getElementById('input').value;
    type = e.target.value;
    document.querySelector('.result').textContent = code(str, shift, alphabet, type);
  }

  function shifted(e) {
    const str = document.getElementById('input').value;
    shift = e.target.value;
    document.querySelector('.shiftValue').textContent = shift;
    if (str === '') {
      return;
    }
    document.querySelector('.result').textContent = code(str, shift, alphabet, type);
  }

  function write() {
    const str = document.getElementById('input').value;
    document.querySelector('.result').textContent = code(str, shift, alphabet, type);
  }

  function init(el) {
    const input = el.querySelectorAll('[type=text]');
    input[0].addEventListener('keyup', change);
    input[1].addEventListener('input', write);

    const radio = document.querySelectorAll('input[type=radio]');
    radio[0].addEventListener('change', toggler);
    radio[1].addEventListener('change', toggler);

    const range = document.querySelector('input[type=range]');
    range.addEventListener('input', shifted);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
