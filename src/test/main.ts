import {ElementEngin,html} from '../element-engin'
import Test from './src/test'
customElements.define('test-p',Test);
export default class App extends ElementEngin {
    private name = 'app'
    render(){
        return html `
        <test-p :data=${this.name}></test-p>
        这是App`;
    }
}