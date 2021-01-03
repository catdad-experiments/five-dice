import { html, render, useState } from './preact.js';
import initService from './init-service.js';

const Control = ({ children: [title, worth], value: _val, setValue, maxValue: _max, incrementValue: _inc }) => {
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

  const onZero = () => setValue(0);
  const onClear = () => setValue(null);

  return html`
    <div class="line grid-row">
      <span>${title}</span>
      <span>${worth || ' '}</span>
      <span class=value> ${_val === null ? '__' : _val} </span>
      <button onclick=${onLess}>${'<'}</button>
      <button onclick=${onMore}>${'>'}</button>
      <button onclick=${onZero}>0</button>
      <button onclick=${onClear}>Clear</button>
    </div>
  `;
};

const Sum = ({ children, value }) => html`
  <div class="line grid-sum"><span>${children}:</span> <span class=sum-value>${value}</span></div>
`;

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
  const [ fiveBonus, setFiveBonus ] = useState(null);
  const [ chance, setChance ] = useState(null);

  const upperTotal = [ones, twos, threes, fours, fives, sixes].reduce((a, b) => (a || 0) + (b || 0));
  const upperBonus = upperTotal >= 63 ? 35 : 0;
  const lowerTotal = [threeKind, fourKind, fullHouse, small, large, fiveKind, fiveBonus, chance].reduce((a, b) => (a || 0) + (b || 0));
  const grandTotal = upperTotal + upperBonus + lowerTotal;

  return html`
    <h1>🎲🎲🎲🎲🎲</h1>

    <h2>Upper Section</h2>
    <${Control} maxValue=${5 * 1} incrementValue=1 setValue=${setOnes} value=${ones}>
      <span>Ones</span>
      <span>add up all ⚀ dice</span>
    <//>
    <${Control} maxValue=${5 * 2} incrementValue=2 setValue=${setTwos} value=${twos}>
      <span>Twos</span>
      <span>add up all ⚁ dice</span>
    <//>
    <${Control} maxValue=${5 * 3} incrementValue=3 setValue=${setThrees} value=${threes}>
      <span>Threes</span>
      <span>add up all ⚂ dice</span>
    <//>
    <${Control} maxValue=${5 * 4} incrementValue=4 setValue=${setFours} value=${fours}>
      <span>Fours</span>
      <span>add up all ⚃ dice</span>
    <//>
    <${Control} maxValue=${5 * 5} incrementValue=5 setValue=${setFives} value=${fives}>
      <span>Fives</span>
      <span>add up all ⚄ dice</span>
    <//>
    <${Control} maxValue=${5 * 6} incrementValue=6 setValue=${setSixes} value=${sixes}>
      <span>Sixes</span>
      <span>add up all ⚅ dice</span>
    <//>

    <${Sum} value=${upperTotal}>Upper section total<//>
    <${Sum} value=${upperBonus}>Bonus for a score of 63 or more<//>

    <h2>Lower section</h2>
    <${Control} maxValue=${5 * 6} incrementValue=1 setValue=${setThreeKind} value=${threeKind}>
      <span>Three of a kind</span>
      <span>add up all dice</span>
    <//>
    <${Control} maxValue=${5 * 6} incrementValue=1 setValue=${setFourKind} value=${fourKind}>
      <span>Four of a kind</span>
      <span>add up all dice</span>
    <//>
    <${Control} maxValue=${25} incrementValue=25 setValue=${setFullHouse} value=${fullHouse}>
      <span>Full house (two or one and three of another)</span>
      <span>25</span>
    <//>
    <${Control} maxValue=${30} incrementValue=30 setValue=${setSmall} value=${small}>
      <span>Small straight (four numbers in a row)</span>
      <span>30</span>
    <//>
    <${Control} maxValue=${40} incrementValue=40 setValue=${setLarge} value=${large}>
      <span>Large straight (five numbers in a row)</span>
      <span>40</span>
    <//>
    <${Control} maxValue=${50} incrementValue=50 setValue=${setFiveKind} value=${fiveKind}>
      <span>Five of a kind</span>
      <span>50</span>
    <//>
    <${Control} maxValue=${300} incrementValue=100 setValue=${setFiveBonus} value=${fiveBonus}>
      <span>Bonus five of a kind</span>
      <span>100 points each, up to 3</span>
    <//>
    <${Control} maxValue=${5 * 6} incrementValue=1 setValue=${setChance} value=${chance}>
      <span>Chance</span>
      <span>add up all dice</span>
    <//>

    <${Sum} value=${lowerTotal}>Lower section total<//>
    <p>
      <${Sum} value=${grandTotal}><b>Grand total</b><//>
    </p>
  `;
};

export default () => {
  initService();

  render(html`<${App} />`, document.querySelector('#main'));
};
