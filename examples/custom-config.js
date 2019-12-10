import React from 'react'
import ReactDOM from 'react-dom'
import {
  MathJaxDiv,
  MathJaxSpan,
  MathJaxProvider,
  MathJaxConfigProvider,
} from '..'

const mathJaxOptions = {
  startup: {
    pageReady() {
      console.log('Custom pageReady!')
    },
  },
  chtml: {
    fontURL: 'https://unpkg.com/mathjax@3.0.0/es5/output/chtml/fonts/woff-v2',
  },
}

const mathJaxOptionsPre =
  "{\n  startup: {\n    pageReady() {\n      console.log('Custom pageReady!')\n    },\n  },\n  chtml: {\n    fontURL: 'https://unpkg.com/mathjax@3.0.0/es5/output/chtml/fonts/woff-v2',\n  },\n}"

const Root = () => (
  <MathJaxConfigProvider options={mathJaxOptions}>
    <MathJaxProvider>
      <p>Using a custom MathJax configuration:</p>
      <pre>{mathJaxOptionsPre}</pre>
      <p>
        Here is some inline math: <MathJaxSpan texCode="f(x)=x^2" />
      </p>
      <p>This one is a block element:</p>
      <MathJaxDiv texCode="f(x)=x^2" />
    </MathJaxProvider>
  </MathJaxConfigProvider>
)
ReactDOM.render(<Root />, document.getElementById('root'))
