import {ElementEngin,html} from '../element-engin'
import Test from './src/test'
customElements.define('test-p',Test);
export default class App extends ElementEngin {
    private name = 'app';
    private text = 'text';
    private hello(){
        this.text = this.text +' change';
    }
    private change(e){
        this.text = e.target.value;
    }
    render(){
        return html `
        <test-p :data=${this.name}></test-p>
        这是App
        <button @click="${this.hello.bind(this)}">${this.text}</button>
        <input :value="${this.text}" @input="${this.change.bind(this)}" ></input>
        <div>${this.text}</div>
        `;
    }
}