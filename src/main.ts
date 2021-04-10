

import { ElementEngin, html } from './lib/element-engin'

class MyElement extends ElementEngin {
    data = {
        aaaa: [123,456],
        bbb:122
    }
    get template() {
        const { aaaa,bbb } = this.data;
        return html`<div @click="${this.add.bind(this)}">${aaaa},${bbb}</div>`
    }
    add() {
        this.data.aaaa.push(789)
        this.data.bbb = 2222
    }
}

customElements.define("my-element", MyElement)

document.querySelector("#root").append(new MyElement)