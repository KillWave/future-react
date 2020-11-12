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
  private change(e) {
    const [data] = e.detail.args;
    console.log(e, "change");
  }
  render(): any {
    return html`
      <div>
        <test-item :data="${this.val}" @datachange="${this.change}">
          123 ${document.createElement("ul")}${this.val}
        </test-test>
      </div>
    `;
  }
}
