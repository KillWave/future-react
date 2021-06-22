import React from './react'
function AppRoot(props) {
  console.log('props: ', props)
  return (
    <template>
      <div onClick={aaa}>
        <a href="www.baidu.com">123</a>
        <slot name="aaa">123</slot>
        hello world
      </div>
    </template>
  )
}

function aaa() {
  console.log('clickaaa')
}
document.querySelector('#root').appendChild(
  <AppRoot>
    <div slot="aaa">123456</div>
  </AppRoot>
)
