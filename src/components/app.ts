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
    console.log(e)
    const [data] = e.detail.args;
    console.log(data, 'change');
    // this.val = data
    // this.val = "456";
    // console.log(this.test);
  }
  render(): any {
    return html`
      <div>
        <test-item :data="${this.val}" @dataChange="${this.change}">
          123 ${document.createElement("ul")}${this.val}
        </test-test>
      </div>
    `;
  }
}
