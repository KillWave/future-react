import { html, render, TemplateResult } from 'lit-html'

function camelToDash(str) {
    return str.replace(/[A-Z]/g, (item: string, index: number) => {
        return index ? '-' + item.toLowerCase() : item.toLowerCase()
    })
}
export abstract class Component extends HTMLElement {
    private state = {}
    private root:ShadowRoot
    constructor(props = {}) {
        super()
        this.root = this.attachShadow({mode:"open"})
        console.log(props)
        render(this.render(),this.root)
    }
    abstract render(): TemplateResult
}


export function createComponent(comp, props) {
    const tagName = camelToDash(comp.name);
    if (comp.prototype && comp.prototype.render) {
        if(!customElements.get(tagName)){
            customElements.define(tagName, comp);
        }
        return customElements.whenDefined(tagName).then(() => new comp(props))
    } else {
        class FC extends Component {
            render(){
                return comp()
            }
        }
        if(!customElements.get(tagName)){
            customElements.define(tagName, FC);
        }
        return customElements.whenDefined(tagName).then(() => new FC(props))
    }
}

// export function setComponentProps(comp, props) {
//     comp.props = props;
//     console.log(comp.el)
//     // render(comp.render(),comp.el)
// }