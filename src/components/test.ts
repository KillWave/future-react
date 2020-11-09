import { Component, html, MyCmp } from "../index";

@Component({
  ShadowRootInit:{mode:'closed'}
})
export default class ItemTest extends MyCmp {
  created() {
    console.log(this.body,111)
    console.log(this["data"]);
  }
  mounted() {}
  change(){
    this['data'] = 999;
  }
  render(): any {
    return html`
      <div @click="${this.change.bind(this)}">
        ${this["data"]}
        <!-- <slot></slot> -->
      </div>
    `;
  }
}
