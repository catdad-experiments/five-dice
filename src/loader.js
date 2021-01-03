import { html, render, useState } from './preact.js';
import initService from './init-service.js';

const Control = ({ title, value: _val, setValue, maxValue: _max, incrementValue: _inc }) => {
  const value = _val || 0;
  const increment = Number(_inc) || 1;
  const max = Number(_max) || Infinity;

  const onLess = () => {
    if (value - increment <= 0) {
      return;
    }

    setValue(value - increment);
  };

  const onMore = () => {
    if (value + increment <= max) {
      setValue(value + increment);
    }
  };

  const onZero = () => setValue(0);
  const onClear = () => setValue(null);

  return html`
    <div>
    <span>${title}: </span>
    <span> ${_val === null ? '_' : _val} </span>
    <button onclick=${onLess}>${'<'}</button>
    <button onclick=${onMore}>${'>'}</button>
    <button onclick=${onZero}>0</button>
    <button onclick=${onClear}>Clear</button>
    </div>
  `;
};

const App = () => {
  const [ ones, setOnes ] = useState(null);
  const [ twos, setTwos ] = useState(null);
  const [ threes, setThrees ] = useState(null);
  const [ fours, setFours ] = useState(null);
  const [ fives, setFives ] = useState(null);
  const [ sixes, setSixes ] = useState(null);

  const [ threeKind, setThreeKind ] = useState(null);
  const [ fourKind, setFourKind ] = useState(null);
  const [ fullHouse, setFullHouse ] = useState(null);
  const [ small, setSmall ] = useState(null);
  const [ large, setLarge ] = useState(null);
  const [ fiveKind, setFiveKind ] = useState(null);
  const [ chance, setChance ] = useState(null);

  const upperTotal = [ones, twos, threes, fours, fives, sixes].reduce((a, b) => (a || 0) + (b || 0));
  const upperBonus = upperTotal >= 63 ? 35 : 0;
  const lowerTotal = [threeKind, fourKind, fullHouse, small, large, fiveKind, chance].reduce((a, b) => (a || 0) + (b || 0));
  const grandTotal = upperTotal + upperBonus + lowerTotal;

  return html`
    <p>🎲🎲🎲🎲🎲</p>
    <div><b>Upper Section</b></div>
    <${Control} title=Ones maxValue=${5 * 1} incrementValue=1 setValue=${setOnes} value=${ones} />
    <${Control} title=Twos maxValue=${5 * 2} incrementValue=2 setValue=${setTwos} value=${twos} />
    <${Control} title=Threes maxValue=${5 * 3} incrementValue=3 setValue=${setThrees} value=${threes} />
    <${Control} title=Fours maxValue=${5 * 4} incrementValue=4 setValue=${setFours} value=${fours} />
    <${Control} title=Fives maxValue=${5 * 5} incrementValue=5 setValue=${setFives} value=${fives} />
    <${Control} title=Sixes maxValue=${5 * 6} incrementValue=6 setValue=${setSixes} value=${sixes} />
    <div>Upper section total: ${upperTotal}</div>
    <div>Upper section bonus (for a score of 63 or more): ${upperBonus}</div>
    <div><b>Lower section:</b></div>
    <${Control} title="Three of a kind" maxValue=${5 * 6} incrementValue=1 setValue=${setThreeKind} value=${threeKind} />
    <${Control} title="Four of a kind" maxValue=${5 * 6} incrementValue=1 setValue=${setFourKind} value=${fourKind} />
    <${Control} title="Full house" maxValue=${25} incrementValue=25 setValue=${setFullHouse} value=${fullHouse} />
    <${Control} title="Small straight" maxValue=${30} incrementValue=30 setValue=${setSmall} value=${small} />
    <${Control} title="Large straight" maxValue=${40} incrementValue=40 setValue=${setLarge} value=${large} />
    <${Control} title="Five of a kind" maxValue=${50} incrementValue=50 setValue=${setFiveKind} value=${fiveKind} />
    <${Control} title="Chance" maxValue=${5 * 6} incrementValue=1 setValue=${setChance} value=${chance} />
    <div>Lower section total: ${lowerTotal}</div>
    <div>Grant total: ${grandTotal}</div>
  `;
};

export default () => {
  initService();

  render(html`<${App} />`, document.querySelector('#main'));
};
