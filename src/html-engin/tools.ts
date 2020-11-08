export const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
export const createMarker = () => document.createComment("");
export const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
export const boundAttributeSuffix = "$lit$";
export const containerMap = new WeakMap();
export const templateMap = new Map();

export const typeJudgment = (type:unknown)=>{
    return Object.prototype.toString.call(type).slice(8,-1)
}