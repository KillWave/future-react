import { Html } from "./html-engin/interface";
import { destroy, render } from "./html-engin/render";
export { html } from "./html-engin/";
// createdCallback
// 自定义元素注册后，在实例化之后会调用，通常多用于做元素的初始化，如插入子元素，绑定事件等。

// attachedCallback
// 元素插入到 document 时触发。

// detachedCallback
// 元素从 document 中移除时触发，可能会用于做类似 destroy 之类的事情。

// attributeChangedCallback
// 元素属性变化时触发，可以用于从外到内的通信。外部通过修改元素的属性来让内部获取相关的数据并且执行对应的操作。

//type NewCmp = new (...params: any[]) => HTMLElement;
/**
 * 改变字符串为标签样式
 * @param name
 * @returns {string}
 */
function classNameToTagName(name) {
  var result = "";
  //首字母大写执行标签化
  if (name.charAt(0).match(/[A-Z]+/)) {
    //根据大写字母进行分组
    const names = name.split(/[A-Z]+/).filter((str: string) => str.length);
    const names2 = name
      .split(/[a-z]+/)
      .filter((str: string) => str.length)
      .map((s: string) => s.toLowerCase());
    const length1 = names.length;
    const length2 = names2.length;
    if (length1 === length2) {
      for (let i = 0; i < length1; i++) {
        if (i === length1 - 1) {
          result += names2[i] + names[i];
        } else {
          result += names2[i] + names[i] + "-";
        }
      }
    } else {
      throw new Error("Please use Hump naming");
    }
  }
  return result;
}
interface ComponentOption {
  components?: any;
  ShadowRootInit?: ShadowRootInit;
}
export function Component(option: ComponentOption) {
  const { components = {}, ShadowRootInit = { mode: "open" } } = option;
  for (var key in components) {
    const isRegister = window.customElements.get(
      key ? key : classNameToTagName(components[key].name)
    );
    if (!isRegister) {
      window.customElements.define(
        key ? key : classNameToTagName(components[key].name),
        components[key]
      );
    }
  }

  return function (target: any) {
    target.prototype.ShadowRootInit = ShadowRootInit; //target.prototype.attachShadow(ShadowRootInit)
  };
}
interface PropOption {
  default: any;
}
export function Prop(option: PropOption = { default: null }) {
  const d = option.default;
  //console.log(d);
  return function (target: any, attr: string) {
    target[attr] = d;
    target.props = target.props ? target.props : [];
    target.props.push(attr);
    //console.log(target, attr);
    //target[attr] = target.getAttribute(attr) || option?.default;
  };
}
class ElementComponent extends HTMLElement {
  public ShadowRootInit: ShadowRootInit;
  public props?: Array<string>;
}

export abstract class MyCmp
  extends ElementComponent
  implements ElementComponent {
  abstract render(): Html.TemplateResult;
  public readonly root: ShadowRoot = this.attachShadow(this.ShadowRootInit);
  constructor() {
    super();
    this.attrProcessing();
    this.created();
  }
  private attrProcessing() {
    const props = this.props || [];
    props.forEach((attr: string) => {
      this[attr] = this.getAttribute(attr);
    });
  }
  created() {}
  destroy() {}
  mounted() {}
  disconnectedCallback() {
    destroy(this.root);
    this.destroy();
  }
  update() {
    render(this.render(), this.root);
  }
  adoptedCallback() {}
  attributeChangedCallback(...args) {
    console.log(args, "attr");
    //this.update();
  }
  public subscribe() {
    var observer = new MutationObserver(function (mutations, observer) {
      mutations.forEach(function (mutation) {
        console.log(mutation, 11);
      });
    });
    observer.observe(this.root, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true,
    });
    const props = this.props || ["root"];
    !props.includes("root") && props.push("root");
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        if (!props.includes(key)) {
          let element = this[key];
          Object.defineProperty(this, key, {
            //属性重写（或者添加属性）
            get() {
              return element;
            },
            set(val) {
              element = val;
              this.update();
            },
          });
        }
      }
    }
  }
  connectedCallback() {
    this.subscribe();
    this.update();
    this.mounted();
  }
}
