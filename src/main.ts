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
    if (!this.state.num) {
        this.state.num = 1
    }
    return html`<button @click="${click.bind(this)}">${this.state.num}</button>`
}
function click() {
    this.setState((prev, prevProps) => {
        console.log(prev, prevProps)
        return {
            num: prev.num + 1
        }
    })
}
const demo = React.component(DemoHome1, { demo: 456 });
const home = React.component(HomeDemo2, { home: 123 });
const home2 = React.component(HomeDemo3, { home2: 123 });


console.log(demo)

console.log(home)
console.log(home2)


ReactDOM.render(home2, document.querySelector("#root"))