function camelToDash(str: string) {
  return str.replace(/[A-Z]/g, (item: string, index: number) => {
    return index ? '-' + item.toLowerCase() : item.toLowerCase()
  })
}
class React extends HTMLElement {}
function createComponent(comp, props = {}, children = []) {
  if (typeof comp === 'function') {
    customElements.define(camelToDash(comp.name), React)
    console.log(comp(props))
    return createElement(
      camelToDash(comp.name),
      props,
      children.concat([comp(props)])
    )
  } else {
    return createElement(comp, props, children)
  }
}

function createElement(comp, props, children = []) {
  let dom = document.createElement(comp)

  const regx = /^on/
  if (comp != 'template') {
    for (let key in props) {
      if (regx.test(key)) {
        dom.addEventListener(key.toLowerCase().slice(2), props[key])
      }
      dom.setAttribute(key, props[key])
    }
  } else {
    dom = dom.content
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      dom.appendChild(document.createTextNode(child))
    } else {
      dom.appendChild(child)
    }
  })
  return dom
}

function AppRoot(props) {
  console.log('props: ', props)
  return (
    <template>
      <div onClick={aaa}>
        <slot name="aaa"></slot>
        hello world
        <a href="www.baidu.com">123</a>
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
