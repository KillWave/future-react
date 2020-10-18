
import { render } from './html-engin/render'
import { TemplateResult } from './html-engin/template-result'
export { html } from './html-engin'
export  abstract class ElementEngin extends HTMLElement {
  public readonly root: ShadowRoot = this.attachShadow({ mode: 'closed' });
  abstract render(): TemplateResult;
  created() { }
  destroy() { }
  mounted() { }
  attributeChange(){}
  disconnectedCallback() {
    this.destroy();
  }
  attributeChangedCallback() {
    this.attributeChange();
    render(this.render(), this.root);
  }
  private subscribe() {
    var observer = new MutationObserver(function (mutations, observer) {
      mutations.forEach(function (mutation) {
        console.log(mutation);
      });
    });
    observer.observe(this.root, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true
    })

    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        if (key != 'root') {
          let element = this[key];
          Object.defineProperty(this, key, {//属性重写（或者添加属性）
            get() {
              return element;
            },
            set(val) {
              element = val;
              render(this.render(), this.root);
            }
          })
        }
      }
    }
  }
  connectedCallback() {
    this.subscribe();
    this.created();
    render(this.render(), this.root);
    this.mounted();
  }
}