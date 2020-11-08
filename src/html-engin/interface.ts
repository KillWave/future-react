

export namespace Html{
    export type trustedTypes = any;
    export interface TemplateResult {
        stringArray:TemplateStringsArray;
        valueArray:unknown[];
        getHTML:()=>string;
        getTemplateElement:()=>HTMLTemplateElement;
    }
    export enum VnodeType {
        NODE="node",
        CHILDREN = "children"
    }
    export enum NodeType {
        NODE=1,
        COMMENT=8
    }
    export interface  VnodeAttribute{
        name:string;
        value:unknown;
        index:number;
    }
    export interface Vnode{
        node:Element | Text | Node;
        type:VnodeType;
        attributes?:VnodeAttribute[];
        value?:unknown;
        index?:number;
    }
    export interface TextNode extends Element{
        data:any;
    }
}