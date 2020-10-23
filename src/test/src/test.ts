import {ElementEngin,html} from '../../element-engin'

export default class TestTag extends ElementEngin{
    render(){
        return html `
            app-data${this['data']}
            <p>这是test</p>
        `;
    }
}
