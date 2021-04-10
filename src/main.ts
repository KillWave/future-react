

import { ElementEngin, html } from './lib/element-engin'

class MyElement extends ElementEngin {
    data = {
        aaaa: [123,456],
        bbb:122
    }
     // 要监听属性的变化，必须通过observedAttributes监听这个属性
     static get observedAttributes() {
        return ['name'];
    }
    get template() {
        const { aaaa,bbb } = this.data;
        return html`<div @click="${this.add.bind(this)}">${aaaa},${bbb}</div>`
    }
    //监听属性变化
    attributeChanged(...args){
        console.log(args)
    }
    add() {
        this.setAttribute("name","123")
        this.data.aaaa.push(789)
        this.data.bbb = 2222
    }
}

customElements.define("my-element", MyElement)

document.querySelector("#root").append(new MyElement)