import { SVGTemplateResult, TemplateResult } from './template-result.js';
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
export declare const html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
export declare const svg: (strings: TemplateStringsArray, ...values: unknown[]) => SVGTemplateResult;
