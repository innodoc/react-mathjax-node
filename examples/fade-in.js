import React, { useContext } from 'react'
import ReactDOM from 'react-dom'

import {
  MathJaxDiv,
  MathJaxSpan,
  MathJaxContext,
  MathJaxProvider,
} from '../src'

const MathJaxPane = () => {
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
    <MathJaxPane />
  </MathJaxProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))