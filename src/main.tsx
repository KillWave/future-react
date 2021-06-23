import { camelToDash, createElement } from './utils'
import { proxy, deepProxy } from './hooks'
import chain from './core/chain'
class React extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
}

function createComponent(comp, props = {}, children = []) {
  if (typeof comp === 'function') {
    const tagName = camelToDash(comp.name)
    const compDefine = customElements.get(tagName)
    if (!compDefine) {
      customElements.define(tagName, React)
    }
    console.log(props)

    // return chain(props).pipe()
    return proxy({
      props: deepProxy(props),
      children: [comp(this.props)].concat(children),
      $el: createElement(
        tagName,
        this.props,
        [comp(this.props)].concat(this.children)
      ),
    })
    // return createElement(tagName, props, [comp(props)].concat(children))
  } else {
    return proxy({
      props: deepProxy(props),
      children,
      $el: createElement(comp, this.props, this.children),
    })
    // return createElement(comp, props, children)
  }
}
function AppRoot(props) {
  console.log('ctx: ', props)

  return (
    <template>
      <button
        onClick={() => {
          console.log(props)
          props.name = 456
        }}
      >
        hello world
      </button>

      <slot name="aaa">123</slot>
    </template>
  )
}

function render(tree) {
  console.log('tree: ', tree)
}

// document.querySelector('#root').appendChild(

// )
render(
  <AppRoot name={'123'}>
    123
    <div slot="aaa">123456</div>
  </AppRoot>
)
