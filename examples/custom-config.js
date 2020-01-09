import React from 'react'
import ReactDOM from 'react-dom'
import MathJax from '..'

const mathJaxOptions = {
  startup: {
    pageReady() {
      alert('Custom pageReady!')
    },
  },
  chtml: {
    fontURL: 'https://unpkg.com/mathjax@3.0.0/es5/output/chtml/fonts/woff-v2',
  },
}

const mathJaxOptionsPre =
  "{\n  startup: {\n    pageReady() {\n      console.log('Custom pageReady!')\n    },\n  },\n  chtml: {\n    fontURL: 'https://unpkg.com/mathjax@3.0.0/es5/output/chtml/fonts/woff-v2',\n  },\n}"

const Root = () => (
  <MathJax.ConfigProvider options={mathJaxOptions}>
    <MathJax.Provider>
      <p>Using a custom MathJax configuration:</p>
      <pre>{mathJaxOptionsPre}</pre>
      <p>
        Here is some inline math: <MathJax.Span texCode="f(x)=x^2" />
      </p>
      <p>This one is a block element:</p>
      <MathJax.Div texCode="f(x)=x^2" />
    </MathJax.Provider>
  </MathJax.ConfigProvider>
)
ReactDOM.render(<Root />, document.getElementById('root'))
