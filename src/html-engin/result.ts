import {boundAttributeSuffix,lastAttributeNameRegex,marker} from './tools'
import {Html} from './interface'
const commentMarker = ` ${marker} `;
const nodeMarker = `<!--${marker}-->`;
//防止xss
const trustedTypes = (window as Html.trustedTypes).trustedTypes;
const policy:Html.trustedTypes =  (window as Html.trustedTypes).trustedTypes && trustedTypes.createPolicy("engin", { createHTML: (s:string) => s });
export class TemplateResult{
    public stringArray!:TemplateStringsArray;
    public valueArray!:unknown[];
    constructor(stringArray:TemplateStringsArray,valueArray:unknown[]){
        this.stringArray = stringArray;
        this.valueArray = valueArray;
    }
    //把字符串变成字符串模板并且加坑 返回加坑之后的字符串模板
    public getHTML() {
        const len = this.stringArray.length - 1;
        let html = "";
        let isCommentBinding = false;
        for (let i = 0; i < len; i++) {
          const char = this.stringArray[i];
          const commentOpen = char.lastIndexOf("<!--");
          isCommentBinding =
            (commentOpen > -1 || isCommentBinding) &&
            char.indexOf("-->", commentOpen + 1) === -1;
          const attributeMatch = lastAttributeNameRegex.exec(char);
          if (!attributeMatch) {
            html += char + (isCommentBinding ? commentMarker : nodeMarker);
          } else {
            html +=
              char.substr(0, attributeMatch.index) +
              attributeMatch[1] +
              attributeMatch[2] +
              boundAttributeSuffix +
              attributeMatch[3] +
              marker;
          }
        }
        html += this.stringArray[len];
        return html;
      }
      //把加坑之后的字符串模板转化为fragment文档
      public getTemplateElement() {
        const template = document.createElement("template");
        let value = this.getHTML();
        if (policy) {
          value = policy.createHTML(value);
        }
        template.innerHTML = value;
        return template;
      }
}