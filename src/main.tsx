import React from './react'
function AppRoot(props) {
  console.log('props: ', props)

  return (
    <template>
      <button onClick={console.log(111)}>hello world</button>

      <slot name="aaa">123</slot>
    </template>
  )
}

function render(comp) {
  console.log('comp: ', comp)
  document.querySelector('#root').appendChild(comp.$el)
}
render(
  <AppRoot name={'123'}>
    123
    <div slot="aaa">123456</div>
  </AppRoot>
)
