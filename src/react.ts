import { camelToDash, createElement } from './utils'

export default class React extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
  static createComponent(comp, props = {}, children = []) {
    if (typeof comp === 'function') {
      const tagName = camelToDash(comp.name)
      const compDefine = customElements.get(tagName)
      if (!compDefine) {
        customElements.define(tagName, React)
      }
      return createTreeOrElement(tagName, props, [comp(props)].concat(children))
    } else {
      return createTreeOrElement(comp, props, children)
    }
  }
}

function createTreeOrElement(tag, props, children) {
  return {
    tag,
    props,
    children,
    $el: createElement(tag, props, children),
  }
}
