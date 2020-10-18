import { TemplateProcessor } from './interface/template-processor.js';
export declare class TemplateResult {
    readonly strings: TemplateStringsArray;
    readonly values: readonly unknown[];
    readonly type: string;
    readonly processor: TemplateProcessor;
    constructor(strings: TemplateStringsArray, values: readonly unknown[], type: string, processor: TemplateProcessor);
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML(): string;
    getTemplateElement(): HTMLTemplateElement;
}
export declare class SVGTemplateResult extends TemplateResult {
    getHTML(): string;
    getTemplateElement(): HTMLTemplateElement;
}
