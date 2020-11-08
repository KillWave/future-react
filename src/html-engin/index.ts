
import {TemplateResult} from './result'
export {render} from './render'
export const html = (strings:TemplateStringsArray,...values:unknown[])=> new TemplateResult(strings,values);