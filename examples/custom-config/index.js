import React from 'react'
import ReactDOM from 'react-dom'
import { MathJaxDiv, MathJaxSpan, MathJaxProvider, MathJaxConfigProvider } from 'react-mathjax-node'

const mathJaxOptions = {
  chtml: {
    fontURL: 'https://cdn.com/fonts',
  },
}

const Root = () => (
  <MathJaxConfigProvider options={mathJaxOptions}>
    <MathJaxProvider>
      <p>
        Here is some inline math: <MathJaxSpan texCode="f(x)=x^2" />
      </p>
      <p>This one is a block element:</p>
      <MathJaxDiv texCode="f(x)=x^2" />
    </MathJaxProvider>
  </MathJaxConfigProvider>
)
ReactDOM.render(<Root />, document.getElementById('root'))
