const setStateQueue = [];
const renderQueue = [];
export function defer(callback) {
    return Promise.resolve().then(callback)
}
export function enqueueSetState(stateChange, component) {
    defer(flush)
    setStateQueue.push({
        stateChange,
        component
    })
    const r = renderQueue.some(item => item === component)
    if (!r) {
        renderQueue.push(component)
    }
}

function flush() {
    let item;
    while (item = setStateQueue.shift()) {
        const { stateChange, component } = item;
        if (!component.prevState) {
            component.prevState = Object.assign({}, component.state)
        }
        if (typeof stateChange === 'function') {
            Object.assign(component.state, stateChange(component.prevState, component.props));
        } else {
            Object.assign(component.state, stateChange);
        }
        component.prevState = component.state
    }
    let component;
    while (component = renderQueue.shift()) {
        component.update()
    }
}