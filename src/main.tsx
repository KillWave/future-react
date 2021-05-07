import React from './react'
import ReactDOM from './react-dom'
function HomeDemo2() {
  return <>hello world</>
}
class DemoHome1 extends React.Component {
  render() {
    return <>我是demo</>
  }
}
function HomeDemo3(props, childer) {
  // console.log(props.home2.value)
  return (
    <div>
      <button onClick={click} style={{ height: '50px' }}>
        {props.home2.value}
      </button>
      <HomeDemo2 onClick={click} />
      <DemoHome1></DemoHome1>
      <div>{childer}</div>
    </div>
  )
}
function click() {
  console.log('click')
}
//@ts-ignore
ReactDOM.render(
  <HomeDemo3 home2={444}>123</HomeDemo3>,
  document.querySelector('#root')
)
