import React, { useState } from './react'
function AppRoot(props) {
  console.log('props: ', props)
  const [num, updateNum] = useState(0)

  return (
    <template>
      <button onClick={() => updateNum((d) => d + 1)}>hello world</button>
      {num}
      <slot name="aaa">123</slot>
    </template>
  )
}

document.querySelector('#root').appendChild(
  <AppRoot name={'123'}>
    123
    <div slot="aaa">123456</div>
  </AppRoot>
)
