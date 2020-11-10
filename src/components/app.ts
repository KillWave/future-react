import { Component, html, MyCmp, Prop } from "../index";
import Test from "./test";
@Component({
  components: {
    "test-item": Test,
  },
  ShadowRootInit: { mode: "closed" },
})
export default class AppTest extends MyCmp {
  @Prop({ default: "test" }) private test!: string;
  private val = "123";
  created() {
    document.addEventListener("change", this.change);
  }
  private change(e) {
    console.log(e.data, 123);
    // this.val = "456";
    // console.log(this.test);
  }
  render(): any {
    return html`
      <div>
        <test-item :data="${this.val}" @click="${this.change.bind(this)}">
          123 ${document.createElement("ul")}${this.val}
        </test-test>
      </div>
    `;
  }
}
