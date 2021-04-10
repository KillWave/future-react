import { TemplateResult, render } from '../lit-html'
export function nextTick(callback) {
    return Promise.resolve().then(callback)
}
export abstract class ElementEngin extends HTMLElement {
    constructor() {
        super();
        //初始化渲染
        this._update();
        //数据改变渲染
        this._proxyData();
    }
    abstract data: { [index: string]: any }
    abstract template: TemplateResult
    protected _proxyData() {
        nextTick(() => {
            this.data = this.deepProxy(this.data);
        })
    }
    deepProxy(obj) {
        if (typeof obj === 'object') {
            for (let key in obj) {
                if (typeof obj[key] === 'object') {
                    obj[key] = this.deepProxy(obj[key]);
                }
            }

        }
        const engin = this;
        return new Proxy(obj, {

            /**
             * @param {Object, Array} target 设置值的对象
             * @param {String} key 属性
             * @param {any} value 值
             * @param {Object} receiver this
             */
            set: function (target, key, value, receiver) {

                if (typeof value === 'object') {
                    value = this.deepProxy(value);
                }

                if (!(Array.isArray(target) && key === 'length')) {
                    engin._update()
                }
                return Reflect.set(target, key, value, receiver);

            },
            deleteProperty(target, key) {
                engin._update()
                return Reflect.deleteProperty(target, key);
            }

        });
    }
    protected _update() {
        nextTick(() => {
            render(this.template, this)
        })
    }
}

export * from '../lit-html'