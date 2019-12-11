import React, { useContext } from 'react'
import ReactDOM from 'react-dom'

import MathJax from '..'

const FadeInExample = () => {
  const { typesetDone } = useContext(MathJax.Context)
  const style = {
    opacity: typesetDone ? 1 : 0,
    transition: 'opacity 1s linear',
  }
  return (
    <div style={style}>
      <p>
        Here is some inline math: <MathJax.Span texCode="f(x)=x^2" />
      </p>
      <p>This one is a block element:</p>
      <MathJax.Div texCode="f(x)=x^2" />
    </div>
  )
}

const Root = () => (
  <MathJax.Provider>
    <p>Prevent flash of non-typeset formulars.</p>
    <FadeInExample />
  </MathJax.Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
