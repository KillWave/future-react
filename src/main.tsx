function camelToDash(str: string) {
  return str.replace(/[A-Z]/g, (item: string, index: number) => {
    return index ? '-' + item.toLowerCase() : item.toLowerCase()
  })
}
class React extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
}
function createComponent(comp, props = {}, children = []) {
  if (typeof comp === 'function') {
    customElements.define(camelToDash(comp.name), React)
    return createElement(
      camelToDash(comp.name),
      props,
      [comp(props).cloneNode(true)].concat(children)
    )
  } else {
    return createElement(comp, props, children)
  }
}

function createElement(comp, props, children = []) {
  const dom = document.createElement(comp).content
    ? document.createElement(comp).content
    : document.createElement(comp)

  const regx = /^on/
  if (comp != 'template') {
    for (let key in props) {
      if (regx.test(key)) {
        dom.addEventListener(key.toLowerCase().slice(2), props[key])
      }
      dom.setAttribute(key, props[key])
    }
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      dom.appendChild(document.createTextNode(child))
    } else {
      const root = dom.shadowRoot ? dom.shadowRoot : dom
      if (child instanceof DocumentFragment) {
        root.appendChild(child)
      } else {
        dom.appendChild(child)
      }
    }
  })
  return dom
}

function AppRoot(props) {
  console.log('props: ', props)
  return (
    <template>
      <div onClick={aaa}>
        <a href="www.baidu.com">123</a>
        <slot name="aaa">123</slot>
        hello world
      </div>
    </template>
  )
}

function aaa() {
  console.log('clickaaa')
}
document.querySelector('#root').appendChild(
  <AppRoot>
    <div slot="aaa">123456</div>
  </AppRoot>
)
