import {html,render} from './index'
//test
var mo = new MutationObserver(function (records) {
    records.forEach(function (mutation) {
      console.log(mutation.type, mutation);
    });
  });
  const options = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
  };
  
  mo.observe(document.querySelector("#root"), options);
  let a = 12;
  const b = 13;
  function testClick(e) {
    console.log(e);
    a = 1111;
    render(test(a), document.querySelector("#root"));
  }
  const test = (a) => html`<div class="${a}" :style="${a}">
    123
    <button  @click="${testClick}">Button</button>${a}
  </div>`;
  const test1 = html`<div class="${a}" @click="${testClick}" :style="${b}">
    123${b}
    ${html `<div>123</div>`}
  </div>`;
  
  render(test(a), document.querySelector("#root"));
  setTimeout(() => {
    render(test1, document.querySelector("#root"));
  }, 4000);