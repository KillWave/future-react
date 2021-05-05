import { render, TemplateResult } from 'lit-html'
import {enqueueSetState} from './setState'
function camelToDash(str: string) {
    return str.replace(/[A-Z]/g, (item: string, index: number) => {
        return index ? '-' + item.toLowerCase() : item.toLowerCase()
    })
}
export abstract class Component extends HTMLElement {
    private state = {}
    private props = {}
    private readonly root: ShadowRoot
    constructor(props = { mode: "open" }) {
        super()
        this.props = props
        this.root = this.attachShadow({ mode: (props.mode ? props.mode : "open") as ShadowRootMode })
        this.update()
    }
    update(){
        render(this.render(this.props), this.root)
    }
    abstract render(props): TemplateResult
    setState(stateChange){
        enqueueSetState(stateChange,this)
    }
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
            render(props) {
                return comp.call(this,props)
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