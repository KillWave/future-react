import { createElement } from '../utils'

export function ref(data) {
  return { value: data }
}
export function unRef(ref) {
  return ref.value ? ref.value : ref
}

/**
 * 对象、数组变化监听(增删改)
 * @author w-bing
 * @date 2020-04-22
 * @param {Object} obj
 * @param {Function} cb
 * @return {Proxy}
 */
export function deepProxy(obj) {
  if (typeof obj === 'object') {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        console.log('key', obj[key])
        obj[key] = deepProxy(obj[key])
      }
    }
  }

  return new Proxy(obj || {}, {
    /**
     * @param {Object, Array} target 设置值的对象
     * @param {String} key 属性
     * @param {any} value 值
     * @param {Object} receiver this
     */
    set: function (target, key, value, receiver) {
      if (typeof value === 'object') {
        value = deepProxy(value)
      }
      // $el.attributes

      console.log(key, value)
      //排除数组修改length回调

      return Reflect.set(target, key, value, receiver)
    },
    deleteProperty(target, key) {
      return Reflect.deleteProperty(target, key)
    },
  })
}

export function proxy(obj) {
  // console.log('obj: ', obj)
  // Promise.resolve().then(() => {
  //   obj.props.$el = createElement(tagName, obj.props, obj.children)
  // })
  // obj.$el = createElement(tagName, obj.props, obj.children)
  return new Proxy(obj, {
    /**
     * @param {Object, Array} target 设置值的对象
     * @param {String} key 属性
     * @param {any} value 值
     * @param {Object} receiver this
     */
    set: function (target, key, value, receiver) {
      // if (typeof value === 'object') {
      //   value = deepProxy(value)
      // }
      // // $el.attributes
      // value[key]  = val
      console.log(key, value)
      //排除数组修改length回调

      return Reflect.set(target, key, value, receiver)
    },
    deleteProperty(target, key) {
      return Reflect.deleteProperty(target, key)
    },
  })
}
