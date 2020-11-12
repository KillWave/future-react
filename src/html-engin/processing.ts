import { Html } from "./interface";
import { render } from "./render";
import { TemplateResult } from "./result";
import {
  boundAttributeSuffix,
  marker,
  templateMap,
  typeJudgment,
} from "./tools";

const endsWith = (str: string, suffix: string) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};

const deleteSuffix = (str: string, suffix: string) => {
  const index = str.length - suffix.length;
  return str.slice(0, index);
};

const diff = (newData: unknown, oldData: unknown) => {
  //console.log(newData, oldData);
  if (newData === oldData) {
    return false;
  } else {
    return true;
  }
};
export class Processing {
  public bindNodes: Html.Vnode[];
  private result: Html.TemplateResult;
  public template: HTMLTemplateElement;
  constructor(result: Html.TemplateResult) {
    this.bindNodes = [];
    this.result = result;
    let template = templateMap.get(result.getHTML());
    if (!template) {
      templateMap.set(result.getHTML(), (template = this.compile()));
    }
    this.template = template;
  }
  compile(result?: Html.TemplateResult) {
    const valueArray = result ? result.valueArray : this.result.valueArray;
    const content = result
      ? result.getTemplateElement().content.cloneNode(true)
      : this.result.getTemplateElement().content.cloneNode(true);
    const iteratorTemplate = document.createNodeIterator(
      content,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT
    );
    let node = null;
    let index = -1;
    while ((node = iteratorTemplate.nextNode())) {
      switch (node.nodeType) {
        case 1:
          //node节点
          const vnode: Html.Vnode = {
            node,
            type: Html.VnodeType.NODE,
            attributes: [],
          };
          const attributes = [...node.attributes];
          const { length } = attributes;
          for (let i = 0; i < length; i++) {
            if (endsWith(attributes[i].name, boundAttributeSuffix)) {
              index++;
              const name = deleteSuffix(
                attributes[i].name,
                boundAttributeSuffix
              );
              const prefix = name[0];
              const attributeName = name.slice(1);
              switch (prefix) {
                case "@":
                  node.addEventListener(
                    attributeName.toLowerCase(),
                    valueArray[index]
                  );
                  break;
                case ":":
                  if (node.isContentEditable || attributeName === "value") {
                    const self = this;
                    node.addEventListener("input", function (e) {
                      //console.log(e);
                      const newArray = [...valueArray];
                      const arr = newArray.map((d) => {
                        d === newArray[index] && (d = this.value);
                        return d;
                      });
                      // newArray[index] = this.value;

                      self.update(arr);
                      //valueArray[index] = this.value;
                    });
                  }
                  vnode.attributes.push({
                    name: attributeName,
                    value: valueArray[index],
                    index,
                  });

                  break;
                default:
                  node.setAttribute(name, valueArray[index]);
                  break;
              }
              node.removeAttribute(attributes[i].name);
            }
          }
          if (vnode.attributes.length) {
            this.bindNodes.push(vnode);
          }
          break;
        case 8:
          //注释节点
          if (node.data === marker) {
            index++;
            const parent = node.parentNode;
            const data = valueArray[index];
            // if(typeJudgment(data).slice(0, 4))
            switch (typeJudgment(data)) {
              case "Object":
                if (data instanceof TemplateResult) {
                  node.remove();
                  render(data, parent);
                } else {
                  throw new Error("Object is not TemplateResult type");
                }
                break;
              default:
                let childerNode: Node;
                if (data instanceof Node) {
                  childerNode = data;
                } else {
                  childerNode = document.createTextNode(data as string);
                }
                parent.replaceChild(childerNode, node);
                const vnode: Html.Vnode = {
                  node: childerNode,
                  type: Html.VnodeType.CHILDREN,
                  value: data,
                  index,
                };
                this.bindNodes.push(vnode);
                break;
            }
          }
          break;
      }
    }
    return iteratorTemplate.root;
  }
  update(newData = []) {
    for (let i = 0; i < this.bindNodes.length; i++) {
      const vnode = this.bindNodes[i];
      switch (vnode.type) {
        case Html.VnodeType.NODE:
          {
            const { node, attributes } = vnode;
            for (let a = 0; a < attributes.length; a++) {
              const attr = attributes[a];
              if (newData.length) {
                if (diff(newData[attr.index], attr.value)) {
                  attr.value = newData[attr.index];
                  (<Element>node).setAttribute(attr.name, <string>attr.value);
                }
              } else {
                (<Element>node).setAttribute(attr.name, <string>attr.value);
              }
            }
          }

          break;
        case Html.VnodeType.CHILDREN:
          {
            const { node, value, index } = vnode;
            if (newData.length) {
              if (diff(newData[index], value)) {
                vnode.value = newData[index];
                (<Html.TextNode>node).data = vnode.value;
              }
            }
          }

          break;
      }
    }
  }
  destroy() {
    templateMap.delete(this.result.getHTML());
  }
}
