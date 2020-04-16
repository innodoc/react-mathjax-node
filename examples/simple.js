import React from 'react'
import ReactDOM from 'react-dom'

import MathJax from '..'

const Root = () => (
  <MathJax.Provider>
    <p>
      Here is some inline math:{' '}
      <MathJax.MathJaxNode displayType="inline" texCode="f(x)=x^2" />
    </p>
    <p>This one is a block element:</p>
    <MathJax.MathJaxNode displayType="display" texCode="f(x)=x^2" />
  </MathJax.Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
