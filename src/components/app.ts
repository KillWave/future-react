import { MyCmp,html,Component } from '../index'
import Test from './test'
// customElements.define('item-test',Test);
@Component({
    components:[Test]
})
export default class AppTest extends MyCmp {
    private val = '123'
    created(){
        console.log(111)
    }
    private change(){
        this.val = '456';
        console.log(111)
    }
    render():any {
        return html`
            <div >
               <item-test :data="${this.val}" @click="${this.change.bind(this)}"   >
                   123
                   ${document.createElement('ul')}
               </item-test>
            </div>
        `;
    }

}