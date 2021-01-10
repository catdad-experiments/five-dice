import { html, render, useState } from './preact.js';
import initService from './init-service.js';

const useLocalStorageState = (name, initial) => {
  const key = `five-dice/${name}`;
  const [value, setValue] = useState(initial);
  let stored = value;

  if (initial === value) {
    stored = Number(localStorage.getItem(key)) || initial;
  }

  return [stored, val => {
    if (val === initial) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, val);
    }

    if (val === value && val !== stored) {
      setValue(undefined);
    }

    setValue(val);
  }];
};

const ControlText = ({ title, worth }) => html`
  <span class=info>
    <span class=title>${title}</span>
    <span class=worth>${worth || ' '}</span>
  </span>
`;

const Control = ({ title, worth, value: _val, setValue, maxValue: _max, increment: _inc }) => {
  const value = _val || 0;
  const increment = Number(_inc) || 1;
  const max = Number(_max) || Infinity;

  const onLess = () => {
    if (value - increment > 0) {
      setValue(value - increment);
    }
  };

  const onMore = () => {
    if (value + increment <= max) {
      setValue(value + increment);
    }
  };

  return html`
    <div class="line grid-row">
      <${ControlText} title=${title} worth=${worth}/>
      <span class=value> ${_val === null ? '__' : _val} </span>
      <span class=buttons>
        <button onclick=${onLess}>◀</button>
        <button onclick=${onMore}>▶</button>
        <button onclick=${() => setValue(0)}>⭕</button>
        <button onclick=${() => setValue(null)}>❌</button>
      </span>
    </div>
  `;
};

const CountControl = ({ title, worth, value: _val, setValue, multiplier: _mul }) => {
  const multiplier = Number(_mul) || 1;

  return html`
    <div class="line grid-row">
      <${ControlText} title=${title} worth=${worth}/>
      <span class=value> ${_val === null ? '__' : _val} </span>
      <span class=buttons>
        <button onclick=${() => setValue(1 * multiplier)}>🎲</button>
        <button onclick=${() => setValue(2 * multiplier)}>🎲</button>
        <button onclick=${() => setValue(3 * multiplier)}>🎲</button>
        <button onclick=${() => setValue(4 * multiplier)}>🎲</button>
        <button onclick=${() => setValue(5 * multiplier)}>🎲</button>
        <button onclick=${() => setValue(0)}>⭕</button>
        <button onclick=${() => setValue(null)}>❌</button>
      </span>
    </div>
  `;
};

const BooleanControl = ({ title, worth, increment: _inc, value, setValue }) => {
  const increment = Number(_inc) || 1;

  return html`
    <div class="line grid-row">
      <${ControlText} title=${title} worth=${worth}/>
      <span class=value> ${value === null ? '__' : value} </span>
      <span class=buttons>
        <span class=filler></span>
        <button onclick=${() => setValue(increment)}>✔</button>
        <button onclick=${() => setValue(0)}>⭕</button>
        <button onclick=${() => setValue(null)}>❌</button>
      </span>
    </div>
  `;
};

const Sum = ({ children, value }) => html`
  <div class="line grid-sum"><span>${children}:</span> <span class=sum-value>${value}</span></div>
`;

const App = () => {
  const [ ones, setOnes ] = useLocalStorageState(1, null);
  const [ twos, setTwos ] = useLocalStorageState(2, null);
  const [ threes, setThrees ] = useLocalStorageState(3, null);
  const [ fours, setFours ] = useLocalStorageState(4, null);
  const [ fives, setFives ] = useLocalStorageState(5, null);
  const [ sixes, setSixes ] = useLocalStorageState(6, null);

  const [ threeKind, setThreeKind ] = useLocalStorageState('three-kind', null);
  const [ fourKind, setFourKind ] = useLocalStorageState('four-kind', null);
  const [ fullHouse, setFullHouse ] = useLocalStorageState('full-house', null);
  const [ small, setSmall ] = useLocalStorageState('small', null);
  const [ large, setLarge ] = useLocalStorageState('large', null);
  const [ fiveKind, setFiveKind ] = useLocalStorageState('five-kind', null);
  const [ fiveBonus, setFiveBonus ] = useLocalStorageState('five-bonus', null);
  const [ chance, setChance ] = useLocalStorageState('chance', null);

  const upperTotal = [ones, twos, threes, fours, fives, sixes].reduce((a, b) => (a || 0) + (b || 0));
  const upperBonus = upperTotal >= 63 ? 35 : 0;
  const lowerTotal = [threeKind, fourKind, fullHouse, small, large, fiveKind, fiveBonus, chance].reduce((a, b) => (a || 0) + (b || 0));
  const grandTotal = upperTotal + upperBonus + lowerTotal;

  const reset = () => {
    [
      setOnes, setTwos, setThrees, setFours, setFives, setSixes,
      setThreeKind, setFourKind, setFullHouse, setSmall, setLarge,
      setFiveKind, setFiveBonus, setChance
    ].forEach(f => f(null));
  };

  return html`
    <h1>🎲🎲🎲🎲🎲</h1>

    <h2>Upper Section</h2>
    <${CountControl} ...${{
      multiplier: 1, value: ones, setValue: setOnes,
      title: 'Ones', worth: 'add up all ⚀ dice'
    }} />
    <${CountControl} ...${{
      multiplier: 2, value: twos, setValue: setTwos,
      title: 'Twos', worth: 'add up all ⚁ dice'
    }} />
    <${CountControl} ...${{
      multiplier: 3, value: threes, setValue: setThrees,
      title: 'Threes', worth: 'add up all ⚂ dice'
    }} />
    <${CountControl} ...${{
      multiplier: 4, value: fours, setValue: setFours,
      title: 'Fours', worth: 'add up all ⚃ dice'
    }} />
    <${CountControl} ...${{
      multiplier: 5, value: fives, setValue: setFives,
      title: 'Fives', worth: 'add up all ⚄ dice'
    }} />
    <${CountControl} ...${{
      multiplier: 6, value: sixes, setValue: setSixes,
      title: 'Sixes', worth: 'add up all ⚅ dice'
    }} />

    <${Sum} value=${upperTotal}>Upper section total<//>
    <${Sum} value=${upperBonus}>Bonus for a score of 63 or more<//>

    <h2>Lower section</h2>
    <${Control} ...${{
      maxValue: 5 * 6, increment: 1, setValue: setThreeKind, value: threeKind,
      title: 'Three of a kind', worth: 'add up all dice'
    }} />
    <${Control} ...${{
      maxValue: 5 * 6, increment: 1, setValue: setFourKind, value: fourKind,
      title: 'Four of a kind', worth: 'add up all dice'
    }} />
    <${BooleanControl} ...${{
      increment: 25, setValue: setFullHouse, value: fullHouse,
      title: 'Full house (2 of one, 3 of another)', worth: '25'
    }} />
    <${BooleanControl} ...${{
      increment: 30, setValue: setSmall, value: small,
      title: 'Small straight (4 in a row)', worth: '30'
    }} />
    <${BooleanControl} ...${{
      increment: 40, setValue: setLarge, value: large,
      title: 'Large straight (5 in a row)', worth: '40'
    }} />
    <${BooleanControl} ...${{
      increment: 50, setValue: setFiveKind, value: fiveKind,
      title: 'Five of a kind', worth: '50'
    }} />
    <${Control} ...${{
      maxValue: 5 * 6, increment: 1, setValue: setChance, value: chance,
      title: 'Chance', worth: 'add up all dice'
    }} />
    <${Control} ...${{
      maxValue: 300, increment: 100, setValue: setFiveBonus, value: fiveBonus,
      title: 'Bonus five of a kind', worth: '100 each, up to 3'
    }} />

    <${Sum} value=${lowerTotal}>Lower section total<//>
    <p>
      <${Sum} value=${grandTotal}><b>Grand total</b><//>
    </p>
    <p class=center>
      <button onclick=${reset}>Reset Game</button>
    </p>
  `;
};

export default () => {
  initService();

  render(html`<${App} />`, document.querySelector('#main'));
};
