import React, { html } from './react'
import ReactDOM from './react-dom'
function HomeDemo2(props) {
  console.log(props)
  return html`hello world`
}
class DemoHome1 extends React.Component {
  render(props) {
    console.log(props)
    return html`我是demo`
  }
}
function HomeDemo3(props) {
  console.log(props)
  console.log(props.home2)
  return html`<button @click="${click.bind(this)}">
    ${props.home2.value}
  </button>`
}
function click() {
  this.setState((prev) => {
    this.setAttribute('home2', 4444)
    return prev
  })
}
const demo = React.component(DemoHome1, { demo: 456 })
const home = React.component(HomeDemo2, { home: 123 })
const home2 = React.component(HomeDemo3, { home2: 123 })

console.log(demo)

console.log(home)
console.log(home2)

ReactDOM.render(home2, document.querySelector('#root'))
