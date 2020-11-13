const marker = `{{${String(Math.random()).slice(2)}}}`;
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
const boundAttributeSuffix = "$engin$";
const nodeMarker = `<!--${marker}-->`;
const html = (strings, ...values) => {
  return {
    marker,
    values,
    getHTML() {
      const len = strings.length - 1;
      let html = "";
      let isCommentBinding = false;
      for (let i = 0; i < len; i++) {
        const char = strings[i];
        const commentOpen = char.lastIndexOf("<!--");
        isCommentBinding =
          (commentOpen > -1 || isCommentBinding) &&
          char.indexOf("-->", commentOpen + 1) === -1;
        const attributeMatch = lastAttributeNameRegex.exec(char);
        if (!attributeMatch) {
          html += char + (isCommentBinding ? marker : nodeMarker);
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
      html += strings[len];
      return html;
    },
    getTemplate() {
      const template = document.createElement("template");
      template.innerHTML = this.getHTML().trim();
      return template;
    },
  };
};
const tempMap = new Map();
const containerMap = new WeakMap();
const render = (container, result) => {
  let process = containerMap.get(container);
  if (!process) {
    containerMap.set(container, (process = new Process(result)));
  }
  console.log(process);
  //container.appendChild(result.getTemplate().content);
};
const resultMap = new Map();
class Process {
  constructor(result) {
    this.values = result.values;
    this.patch = resultMap.get(result.marker);
    if (!patch) {
      resultMap.set(result.marker, (this.patch = new Patch()));
      this.temp = patch.pretreatment(
        result.values,
        result.getTemplate().content
      );
    }
  }
  update(values) {}
}
class Patch {
  pretreatment(values, content) {
    const iterator = document.createNodeIterator(
      content,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT
    );
    let node = null;
    let index = -1;
    while ((node = iterator.nextNode())) {
      switch (node.nodeType) {
        case 1:
          //node节点
          if (node.hasAttributes()) {
            const attributes = [...node.attributes];
            const preAttr = attributes.filter((attr) =>
              endsWith(attr.name, boundAttributeSuffix)
            );
            const { length } = preAttr;
            for (let i = 0; i < length; i++) {
              index++;
              const attr = preAttr[i];
              const name = deleteSuffix(preAttr[i].name, boundAttributeSuffix);
              node.removeAttribute(attr.name);
              const prefix = name[0];
              if (prefix === "@") {
                node.addEventListener(
                  name.slice(1).toLowerCase(),
                  values[index]
                );
              } else if (prefix === ":") {
                //TODO
              } else if (prefix === "?") {
                //TODO
              }

              //console.log(name);
            }
          }

          break;
        case 8:
          //注释节点
          if (node.data === marker) {
            index++;
            const parent = node.parentNode;
            // if (values[index] instanceof TemplateResult) {
            //   node.remove();
            //   render(data, parent);
            // } else

            if (values[index] instanceof Node) {
              parent.replaceChild(values[index], node);
            } else {
              parent.replaceChild(document.createTextNode(values[index]), node);
            }
            console.log(node, "text");
          }

          break;
      }
    }
    return iterator.root;
  }
}
const deleteSuffix = (str, suffix) => {
  const index = str.length - suffix.length;
  return str.slice(0, index);
};
const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};
const result = html`<div
  @click="${() => {
    console.log(1);
  }}"
>
  ${1 + 3} 456
</div>`;

render(document.body, result);
//console.log(result, result.getTemplate());
