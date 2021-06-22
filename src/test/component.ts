import { render, TemplateResult, html } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map'
import { enqueueSetState } from './setState'
function camelToDash(str: string) {
  return str.replace(/[A-Z]/g, (item: string, index: number) => {
    return index ? '-' + item.toLowerCase() : item.toLowerCase()
  })
}

export abstract class Component extends HTMLElement {
  private state = {}
  private readonly root: ShadowRoot
  constructor(props = {}, children = []) {
    super()
    const regx = /^on/
    for (let key in props) {
      if (regx.test(key)) {
        this.addEventListener(key.toLowerCase().slice(2), props[key])
      }
      this.setAttribute(key, props[key])
    }
    this.root = this.attachShadow({
      mode: 'open',
    })

    this.update(children)
  }

  update(children: unknown[]) {
    const data = this.render(this.attributes, children)
    if (data instanceof Promise) {
      data.then((res) => render(res, this.root))
    } else {
      render(data, this.root)
    }
  }
  abstract render(props, children): TemplateResult
  setState(stateChange) {
    enqueueSetState(stateChange, this)
  }
}

function isType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

export async function createComponent(comp, props, ...children) {
  const type = isType(comp)
  if (type === 'Function') {
    if (comp.prototype && comp.prototype.render) {
      const tagName = camelToDash(comp.name)
      const compDefine = customElements.get(tagName)
      if (!compDefine) {
        customElements.define(tagName, comp)
        return customElements
          .whenDefined(tagName)
          .then(() => new comp(props, children))
      } else {
        return customElements
          .whenDefined(tagName)
          .then(() => new compDefine(props, children))
      }
    } else {
      const tagName = camelToDash(comp.name)
      const compDefine = customElements.get(tagName)
      class FC extends Component {
        render(props) {
          return comp.call(this, props, children)
        }
      }
      if (!compDefine) {
        customElements.define(tagName, FC)
        return customElements
          .whenDefined(tagName)
          .then(() => new FC(props, children))
      } else {
        return customElements
          .whenDefined(tagName)
          .then(() => new compDefine(props, children))
      }
    }
  } else {
    return isType(comp) === 'DocumentFragment'
      ? html`${await Promise.all(children)}`
      : template(comp, props)`
      ${await Promise.all(children)}
  `
  }
}

function template(tagName, props) {
  return (strings: TemplateStringsArray, ...values: unknown[]) => {
    const attrs = [`<${tagName}`]
    const regx = /^on/
    Object.keys(props || {}).forEach((key, index) => {
      if (regx.test(key)) {
        attrs.push(` @${key.toLowerCase().slice(2)}=`)
      } else {
        attrs.push(` ${key}=`)
      }
      if (isType(props[key]) === 'Object') {
        values.splice(index, 0, styleMap(props[key]))
      } else {
        values.splice(index, 0, props[key])
      }
    })

    attrs.push('>')
    const attr = attrs[1]
    attrs.splice(1, 1)
    attrs[0] += attr
    const stringsArray: any = [...attrs, ...strings, `</${tagName}>`]
    stringsArray.raw = stringsArray
    return html(stringsArray, ...values)
  }
}
