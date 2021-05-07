import { createComponent, Component } from './component'
export default {
  createElement: createComponent,
  Component,
  Fragment: document.createDocumentFragment(),
}
