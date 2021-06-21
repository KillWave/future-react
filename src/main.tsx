function createElement(comp, props, children) {
  if (typeof comp === 'function') {
    return new comp(props, children)
  } else {
    const dom = document.createElement(comp)
    const regx = /^on/
    for (let key in props) {
      if (regx.test(key)) {
        dom.addEventListener(key.toLowerCase().slice(2), props[key])
      }
      dom.setAttribute(key, props[key])
    }
    children.forEach((child) => {
      if (child instanceof Element) {
        dom.appendChild(child)
      } else {
        dom.appendChild(document.createTextNode(child))
      }
    })
    return dom
  }
}

function App(props, children) {
  // console.log('props, children: ', props, children)
  return (
    <div onClick={aaa}>
      hello world
      <a href="www.baidu.com">123</a>
    </div>
  )
}

function aaa() {
  console.log('clickaaa')
}
document.querySelector('#root').appendChild(<App></App>)
