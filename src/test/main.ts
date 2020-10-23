import {ElementEngin,html,Component} from '../element-engin'
import TestTag from './src/test'

Component({
    components:{
        TestTag
    }
});
export default class App extends ElementEngin {
    private name = 'app';
    private text = 'text';
    private hello(){
        
        console.log(App.name)
        this.text = this.text +' change';
    }
    private change(e){
        this.text = e.target.value;
    }
    render(){
        return html `
        <test-tag :data=${this.name}></test-tag>
        这是App
        <button @click="${this.hello.bind(this)}">${this.text}</button>
        <input :value="${this.text}" @input="${this.change.bind(this)}" ></input>
        <div>${this.text}</div>
        `;
    }
}