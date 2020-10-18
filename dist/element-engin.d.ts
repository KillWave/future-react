import { TemplateResult } from './html-engin/template-result';
export { html } from './html-engin';
export declare abstract class ElementEngin extends HTMLElement {
    readonly root: ShadowRoot;
    watch: Object;
    private props;
    abstract render(): TemplateResult;
    private getProps;
    created(): void;
    destroy(): void;
    mounted(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(): void;
    private subscribe;
    connectedCallback(): void;
}
