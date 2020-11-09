import { Component, html, MyCmp } from "../index";
import Test from "./test";
@Component({
  components: {
    "test-item": Test,
  },
  ShadowRootInit:{mode:'closed'}
})
export default class AppTest extends MyCmp {
  private val = "123";
  created() {
    console.log(this.root);
  }
  private change() {
    this.val = "456";
    console.log(111);
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
