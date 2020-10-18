import {ElementEngin,html} from './element-engin'


class ItemTest extends ElementEngin{
    public val = 'btn';
    created(){
        // console.log(this.root.querySelector('button'));
    }
    mounted(){

    }
    destroy(){

    }
    render(){
        return html `
            <button @click=${this.hello.bind(this)}>${this.val}</button>
        `;
    }
    hello(){
        this.val = '456';
    }
}
customElements.define('item-test',ItemTest);

document.body.appendChild(new ItemTest());