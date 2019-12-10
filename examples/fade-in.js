import React, { useContext } from 'react'
import ReactDOM from 'react-dom'

import { MathJaxDiv, MathJaxSpan, MathJaxContext, MathJaxProvider } from '..'

const MathJaxFadeInExample = () => {
  const { typesetDone } = useContext(MathJaxContext)
  const style = {
    opacity: typesetDone ? 1 : 0,
    transition: 'opacity 1s linear',
  }
  return (
    <div style={style}>
      <p>
        Here is some inline math: <MathJaxSpan texCode="f(x)=x^2" />
      </p>
      <p>This one is a block element:</p>
      <MathJaxDiv texCode="f(x)=x^2" />
    </div>
  )
}

const Root = () => (
  <MathJaxProvider>
    <p>Prevent flash of non-typeset formulars.</p>
    <MathJaxFadeInExample />
  </MathJaxProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
