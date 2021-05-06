import { render, TemplateResult } from 'lit-html'
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
    for (let key in props) {
      this.setAttribute(key, props[key])
    }
    this.root = this.attachShadow({
      mode: 'open',
    })

    this.update(children)
  }

  update(children) {
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

export function createComponent(comp, props, ...children) {
  const tagName = camelToDash(comp.name)
  const compDefine = customElements.get(tagName)
  if (comp.prototype && comp.prototype.render) {
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
}

// export function setComponentProps(comp, props) {
//     comp.props = props;
//     console.log(comp.el)
//     // render(comp.render(),comp.el)
// }
