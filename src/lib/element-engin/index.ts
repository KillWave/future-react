import { TemplateResult, render } from '../lit-html'
export function nextTick(callback) {
    return Promise.resolve().then(callback)
}
export abstract class ElementEngin extends HTMLElement {
    constructor() {
        super();
        this.update();
    }
    abstract state: { [index: string]: any }
    abstract template: TemplateResult
    update() {
        nextTick(() => {
            render(this.template, this)
        })
    }
}

export * from '../lit-html'