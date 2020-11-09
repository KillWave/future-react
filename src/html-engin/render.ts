import { Html } from "./interface";
import { Processing } from "./processing";
import { containerMap, removeNodes, templateMap } from "./tools";

export const render = (
  result: Html.TemplateResult,
  container: Element | Node | ShadowRoot
) => {
  let root = containerMap.get(container);
  if (!root) {
    containerMap.set(container, (root = new Processing(result)));
    root.update();
    container.appendChild(root.template);
  } else {
    let temp = templateMap.get(result.getHTML());
    if (!temp) {
      templateMap.set(result.getHTML(), (temp = root.compile(result)));
      root.update();
      removeNodes(container, container.firstChild);
      container.appendChild(temp);
    } else {
      root.update(result.valueArray);
    }
  }
};
export const destroy = (container: Element | Node | ShadowRoot) => {
  let root = containerMap.get(container);
  root.destroy();
  containerMap.delete(container);
};
