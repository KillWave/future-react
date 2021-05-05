import React from './react'
import ReactDOM from './react-dom'
import { html } from 'lit-html'
import { createComponent, Component } from './component'
function HomeDemo2() {
    return html`hello world`
}
class DemoHome1 extends Component {
    render() {
        return html`我是demo`
    }
}
function HomeDemo3() {
    return html`hello world3`
}
const demo = createComponent(DemoHome1, { demo: 456 });
const home = createComponent(HomeDemo2, { home: 123 });
const home2 = createComponent(HomeDemo3, { home2: 123 });
// setComponentProps(demo,{demo:456})
// setComponentProps(home,{home:123})

console.log(demo)
console.log(home)
console.log(home2)

ReactDOM.render(home2, document.querySelector("#root"))