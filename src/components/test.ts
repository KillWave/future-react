import { Component, html, MyCmp, Prop } from "../index";

@Component({
  ShadowRootInit: { mode: "open" },
})
export default class ItemTest extends MyCmp {
  @Prop() private data!: any;
  created() {
    // console.log(this.data, 111);
  }
  mounted() {}

  change() {
    this.data = 999;
    this.$emit("change",1,2,3);
  }
  render(): any {
    return html`
      <div @click="${this.change.bind(this)}">
        ${this.data}
        <slot></slot>
      </div>
    `;
  }
}
