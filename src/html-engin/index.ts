
import {defaultTemplateProcessor} from './default-template-processor.js';
import {SVGTemplateResult, TemplateResult} from './template-result.js';
export const html = (strings: TemplateStringsArray, ...values: unknown[]) =>
    new TemplateResult(strings, values, 'html', defaultTemplateProcessor);

/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
export const svg = (strings: TemplateStringsArray, ...values: unknown[]) =>
    new SVGTemplateResult(strings, values, 'svg', defaultTemplateProcessor);