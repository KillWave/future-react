
import { render } from './html-engin/render'
import { TemplateResult } from './html-engin/template-result'
export { html } from './html-engin'
// createdCallback
// 自定义元素注册后，在实例化之后会调用，通常多用于做元素的初始化，如插入子元素，绑定事件等。

// attachedCallback
// 元素插入到 document 时触发。

// detachedCallback
// 元素从 document 中移除时触发，可能会用于做类似 destroy 之类的事情。

// attributeChangedCallback
// 元素属性变化时触发，可以用于从外到内的通信。外部通过修改元素的属性来让内部获取相关的数据并且执行对应的操作。
export  abstract class ElementEngin extends HTMLElement {
  public readonly root: ShadowRoot = this.attachShadow({ mode: 'closed' });
  public watch!: Object;
  private props: string[] = [];
  abstract render(): TemplateResult;
  private getProps() {
    this.props.forEach((prop: string) => {
      this[prop] = this.getAttribute(prop);
    });
  }
  created() { }
  destroy() { }
  mounted() { }
  disconnectedCallback() {
    this.destroy();
  }
  attributeChangedCallback() {
    this.getProps();
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
    this.getProps();
    this.subscribe();
    this.created();
    render(this.render(), this.root);
    this.mounted();
  }
}