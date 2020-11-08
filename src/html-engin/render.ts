import {Html} from './interface'
import {containerMap,templateMap} from './tools'
import {Processing} from './processing'
export const render = (result:Html.TemplateResult,container:Element)=>{
    let root = containerMap.get(container);
    if(!root){
        containerMap.set(container,(root = new Processing(result)));
        root.update();
        container.appendChild(root.template);
    }else{
        let temp =  templateMap.get(result.getHTML());
        if(!temp){
            templateMap.set(result.getHTML(),(temp=root.compile(result)));
            root.update();
            container.innerHTML = '';
            container.appendChild(temp);   
        }else{
            root.update(result.valueArray);
        }
        
    }
}
