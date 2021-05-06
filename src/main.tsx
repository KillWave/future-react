import React, { html } from './react'
import ReactDOM from './react-dom'
function HomeDemo2() {
  return html`hello world`
}
class DemoHome1 extends React.Component {
  render() {
    return html`我是demo`
  }
}
async function HomeDemo3(props, childer) {
  return html`<button>${props.home2.value}</button>
    ${await (<HomeDemo2 />)} ${await (<DemoHome1></DemoHome1>)}
    <div>${childer}</div>`
}
//@ts-ignore
ReactDOM.render(
  <HomeDemo3 home2={444}>123</HomeDemo3>,
  document.querySelector('#root')
)
