import {Component} from './component'
export default {
    async render(comp:Promise<Component>,container){
        const ins = await comp;
        container.append(ins)
    } 
}