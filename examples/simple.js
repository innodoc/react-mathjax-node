import React from 'react'
import ReactDOM from 'react-dom'
import { MathJaxDiv, MathJaxSpan, MathJaxProvider } from '..'

const Root = () => (
  <MathJaxProvider>
    <p>
      Here is some inline math: <MathJaxSpan texCode="f(x)=x^2" />
    </p>
    <p>This one is a block element:</p>
    <MathJaxDiv texCode="f(x)=x^2" />
  </MathJaxProvider>
)
ReactDOM.render(<Root />, document.getElementById('root'))
