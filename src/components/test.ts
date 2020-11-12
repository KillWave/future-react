import { Component, html, MyCmp } from "../index";

@Component({
  ShadowRootInit: { mode: "open" },
})
export default class ItemTest extends MyCmp {
  created() {}
  mounted() {}

  render(): any {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}
