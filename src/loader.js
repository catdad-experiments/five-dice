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

  const onZero = () => {
    setValue(0);
  };

  return html`
    <div>
    <span>${title}: </span>
    <span> ${_val === null ? '_' : _val} </span>
    <button onclick=${onLess}>&lt;</button>
    <button onclick=${onMore}>&gt;</button>
    <button onclick=${onZero}>0</button>
    </div>
  `;
};

//const useState = () => [null, () => {}];

const App = () => {
  const [ ones, setOnes ] = useState(null);
  const [ twos, setTwos ] = useState(null);
  const [ threes, setThrees ] = useState(null);
  const [ fours, setFours ] = useState(null);
  const [ fives, setFives ] = useState(null);
  const [ sixes, setSixes ] = useState(null);

  return html`
    <div>the app</div>
    <${Control} title=Ones maxValue=${5 * 1} incrementValue=1 setValue=${setOnes} value=${ones} />
    <${Control} title=Twos maxValue=${5 * 2} incrementValue=2 setValue=${setTwos} value=${twos} />
    <${Control} title=Threes maxValue=${5 * 3} incrementValue=3 setValue=${setThrees} value=${threes} />
    <${Control} title=Fours maxValue=${5 * 4} incrementValue=4 setValue=${setFours} value=${fours} />
    <${Control} title=Fives maxValue=${5 * 5} incrementValue=5 setValue=${setFives} value=${fives} />
    <${Control} title=Sixes maxValue=${5 * 6} incrementValue=6 setValue=${setSixes} value=${sixes} />
  `;
};

export default () => {
  initService();

  render(html`<${App} />`, document.querySelector('#main'));
};
