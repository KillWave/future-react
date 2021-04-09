

import {ElementEngin,html} from './lib/element-engin'

class MyElement extends ElementEngin{
    public state = {
        aaaa:123
    }
    get template(){
        return html`<div @click="${this.add.bind(this)}">${this.state.aaaa}</div>`
    }
    add(){
        this.state.aaaa = 456
        this.update()
    }
}

customElements.define("my-element",MyElement)

document.querySelector("#root").append(new MyElement)