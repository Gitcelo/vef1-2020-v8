/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

function code(str, shift, alphabet, type){

let r = Number.parseInt(shift);

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem kóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */

function encode(str, n, alphabet = '') {

  const upper = str.toLocaleUpperCase();

  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += alphabet[(alphabet.indexOf(upper[i]) + n) % alphabet.length];
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
function decode(str, n, alphabet = '') {
  return str
    .toLocaleUpperCase()
    .split('')
    .map(s => alphabet.indexOf(s) - n) // hliðruð staðsetning stafs
    .map(i => i < 0 ? alphabet.length + i : i) // ef i verður neikvætt, förum aftast í stafróf
    .map(i => alphabet[i])
    .join('');
}
  debugger;
  if(type === 'encode') {
    return encode(str, r, alphabet);
  }
  else {
    return decode(str, r, alphabet);
  }
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  function change(e) {
    let str = document.getElementById("alphabet").value;
    str = str.toLocaleUpperCase();
    alphabet = str;
  }

  function toggler(e) {
    let str = document.getElementById('input').value;
    type = e.target.value;
    document.querySelector('.result').textContent = code(str, shift, alphabet, type);
  }

  function shifted(e) {
    let str = document.getElementById('input').value;
    console.log(str);
    shift = e.target.value;
    document.querySelector('.shiftValue').textContent = shift;
    if(str === '') {
      return;
    }
    document.querySelector('.result').textContent = code(str, shift, alphabet, type);
  }

  function init(el) {
    const alph = el.querySelector('.alphabet');
    alph.addEventListener('keyup', change);

    const radio = document.querySelectorAll('input[type=radio]');
    radio[0].addEventListener('change', toggler);
    radio[1].addEventListener('change', toggler);

    const range = document.querySelector('input[type=range]');
    range.addEventListener('input', shifted);

    const input = document.querySelector('input[type=range]');
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
