import React from './react'
import ReactDOM from './react-dom'
import { html } from 'lit-html'
import { Component } from './component'
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
const demo = React.component(DemoHome1, { demo: 456 });
const demo1 = React.component(DemoHome1, { demo: 456 });
const home = React.component(HomeDemo2, { home: 123 });
const home2 = React.component(HomeDemo3, { home2: 123 });
const home3 = React.component(HomeDemo3, { home3: 123 });
// setComponentProps(demo,{demo:456})
// setComponentProps(home,{home:123})

console.log(demo)
console.log(demo1)
console.log(home)
console.log(home2)
console.log(home3)

ReactDOM.render(demo, document.querySelector("#root"))