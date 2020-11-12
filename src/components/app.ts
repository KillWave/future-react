import { Component, html, MyCmp, Prop } from "../index";
import Test from "./test";
@Component({
  components: {
    "test-item": Test,
  },
  ShadowRootInit: { mode: "open" },
})
export default class AppTest extends MyCmp {
  @Prop({ default: "test" }) private test!: string;
  private val = "123";
  created() {}
  render(): any {
    return html`
      <div>
        <test-item>
          123 ${document.createElement("ul")}
          ${this.val}
          <input :value="${this.val}" />
        </test-test>
      </div>
    `;
  }
}
