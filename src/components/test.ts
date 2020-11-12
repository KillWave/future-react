import { Component, html, MyCmp, Prop } from "../index";

@Component({
  ShadowRootInit: { mode: "open" },
})
export default class ItemTest extends MyCmp {
  @Prop({ update: true }) private data!: any;
  created() {
    console.log(this.data);
  }
  mounted() {}

  change() {
    this.$emit("dataChange", 999);
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
