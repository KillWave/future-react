import { render, TemplateResult } from 'lit-html'

function camelToDash(str: string) {
    return str.replace(/[A-Z]/g, (item: string, index: number) => {
        return index ? '-' + item.toLowerCase() : item.toLowerCase()
    })
}
export abstract class Component extends HTMLElement {
    private state = {}
    private readonly root: ShadowRoot
    constructor(props = { mode: "open" }) {
        super()
        this.root = this.attachShadow({ mode: (props.mode ? props.mode : "open") as ShadowRootMode })
        render(this.render(), this.root)
    }
    abstract render(): TemplateResult
}


export function createComponent(comp, props) {
    const tagName = camelToDash(comp.name);
    const compDefine = customElements.get(tagName)
    if (comp.prototype && comp.prototype.render) {

        if (!compDefine) {
            customElements.define(tagName, comp);
            return customElements.whenDefined(tagName).then(() => new comp(props))
        } else {
            return customElements.whenDefined(tagName).then(() => new compDefine(props))
        }

    } else {
        class FC extends Component {
            render() {
                return comp()
            }
        }
        if (!compDefine) {
            customElements.define(tagName, FC);
            return customElements.whenDefined(tagName).then(() => new FC(props))
        } else {
            return customElements.whenDefined(tagName).then(() => new compDefine(props))
        }

    }
}

// export function setComponentProps(comp, props) {
//     comp.props = props;
//     console.log(comp.el)
//     // render(comp.render(),comp.el)
// }