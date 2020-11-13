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
  blurs() {
    // console.log(this.val);
    // this.val =  this.root.querySelector("#input").value;
    // console.log(this.val);
  }
  render(): any {
    return html`
      <div>
        <test-item>
          123 ${document.createElement("ul")}
          ${this.val}
          <input id="input" @click="${this.blurs.bind(this)}" :value="${
      this.val
    }"/>
        </test-test>
      </div>
    `;
  }
}
