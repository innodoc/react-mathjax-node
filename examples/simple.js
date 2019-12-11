import React from 'react'
import ReactDOM from 'react-dom'

import MathJax from '..'

const Root = () => (
  <MathJax.Provider>
    <p>
      Here is some inline math: <MathJax.Span texCode="f(x)=x^2" />
    </p>
    <p>This one is a block element:</p>
    <MathJax.Div texCode="f(x)=x^2" />
  </MathJax.Provider>
)
ReactDOM.render(<Root />, document.getElementById('root'))
