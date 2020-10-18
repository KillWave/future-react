import { TemplateResult } from './html-engin/template-result';
export default abstract class litElement extends HTMLElement {
    static html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
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
