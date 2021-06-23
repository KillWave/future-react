import { unRef } from '../hooks'
export function createElement(comp, props, children = []) {
  const dom = document.createElement(comp).content
    ? document.createElement(comp).content.cloneNode(true)
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
    // console.log('child: ', child)
    if (typeof child === 'string' || typeof child === 'number') {
      dom.appendChild(document.createTextNode(child + ''))
    } else {
      const root = dom.shadowRoot ? dom.shadowRoot : dom
      console.log('child: ', child)
      const el = child.$el
      console.log('el: ', el)

      if (el instanceof DocumentFragment) {
        root.appendChild(el)
      } else {
        dom.appendChild(el)
      }
    }
  })
  return dom
}

export function camelToDash(str: string) {
  return str.replace(/[A-Z]/g, (item: string, index: number) => {
    return index ? '-' + item.toLowerCase() : item.toLowerCase()
  })
}
