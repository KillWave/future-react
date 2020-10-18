import { TemplateFactory } from './template-factory.js';
export interface RenderOptions {
    readonly templateFactory: TemplateFactory;
    readonly eventContext?: EventTarget;
}
