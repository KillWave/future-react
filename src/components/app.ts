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
  }
  private change(e) {
    console.log(e, 'change');
    // this.val = "456";
    // console.log(this.test);
  }
  render(): any {
    return html`
      <div>
        <test-item :data="${this.val}" @change="${this.change}">
          123 ${document.createElement("ul")}${this.val}
        </test-test>
      </div>
    `;
  }
}
