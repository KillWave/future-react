import { MyCmp,html,Component } from '../index'
@Component({
})
export default class ItemTest extends MyCmp {
    created(){
        console.log(this['data'])
    }
    mounted(){
    }
    render():any {
        return html`
            <div>
                ${this['data']}
                <slot></slot>
            </div>
        `;
    }

}