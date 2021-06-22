import { createElement, camelToDash } from './utils'

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
      return createElement(
        tagName,
        props,
        [comp(props).cloneNode(true)].concat(children)
      )
    } else {
      return createElement(comp, props, children)
    }
  }
}
