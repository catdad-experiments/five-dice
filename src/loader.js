import { html, render } from './preact.js';
import initService from './init-service.js';

export default () => {
  initService();

  render(html`<div>the app</div>`, document.querySelector('#main'));
};
