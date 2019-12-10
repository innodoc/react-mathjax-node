import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { MathJaxContext, MathJaxDiv, MathJaxSpan, MathJaxProvider } from '..'

const MathJaxCallbackExample = () => {
  const { addCallback, removeCallback } = useContext(MathJaxContext)
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
        Here is some inline math: <MathJaxSpan texCode="f(x)=x^2" />
      </p>
      <p>This one is a block element:</p>
      <MathJaxDiv texCode="f(x)=x^2" />
    </>
  )
}

const Root = () => (
  <MathJaxProvider>
    <MathJaxCallbackExample />
  </MathJaxProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
