
import { render } from './html-engin/render'
import { TemplateResult } from './html-engin/template-result'
export { html,svg } from './html-engin'
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
       const names = name.split(/[A-Z]+/).filter((str:string)=>str.length);
       const names2 = name.split(/[a-z]+/).filter((str:string)=>str.length).map((s:string)=> s.toLowerCase());
       const length1 = names.length;
       const length2 = names2.length;
       if(length1 === length2){
        for(let i = 0; i < length1; i++){
          if(i === length1-1){
            result += names2[i]+names[i]
          }else{
            result += names2[i]+names[i]+'-';
          }
        }
       }else{
         throw new Error('Please use Hump naming');
       }
      
   } 
   return result
};


export function Component(options){
  const components = options.components;
  const componentsKeys = Object.keys(options.components);
  const len = componentsKeys.length;
  for(let i = 0; i < len; i++){
    const key = componentsKeys[i];
    customElements.define(classNameToTagName(components[key].name),components[key]);
  }
}


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
    // var observer = new MutationObserver(function (mutations, observer) {
    //   mutations.forEach(function (mutation) {
    //     console.log(mutation);
    //   });
    // });
    // observer.observe(this.root, {
    //   attributes: true,
    //   characterData: true,
    //   childList: true,
    //   subtree: true,
    //   attributeOldValue: true,
    //   characterDataOldValue: true
    // })

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