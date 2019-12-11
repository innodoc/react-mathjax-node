import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'

import MathJax from '..'

const CallbackExample = () => {
  const { addCallback, removeCallback } = useContext(MathJax.Context)
  useEffect(() => {
    const callback = () => {
      console.log('Typesetting is done.')
    }
    addCallback(callback)
    return () => {
      removeCallback(callback)
    }
  })
  return (
    <>
      <p>Add callbacks that run after typesetting is done.</p>
      <p>
        Here is some inline math: <MathJax.Span texCode="f(x)=x^2" />
      </p>
      <p>This one is a block element:</p>
      <MathJax.Div texCode="f(x)=x^2" />
    </>
  )
}

const Root = () => (
  <MathJax.Provider>
    <CallbackExample />
  </MathJax.Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
