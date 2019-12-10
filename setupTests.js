/* eslint import/no-extraneous-dependencies: "off" */
const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

configure({ adapter: new Adapter() })

jest.mock('mathjax-full/components/src/startup/lib/startup.js', () => {})
jest.mock('mathjax-full/js/components/loader.js', () => ({
  Loader: {
    preLoad() {},
  },
}))
jest.mock('mathjax-full/components/src/core/core.js', () => {})
jest.mock('mathjax-full/components/src/input/tex-full/tex-full.js', () => {})
jest.mock('mathjax-full/components/src/output/chtml/chtml.js', () => {})
jest.mock('mathjax-full/components/src/startup/startup.js', () => {
  // console.log('START')

  global.window.MathJax.startup.pageReady()
  global.window.MathJax = {
    chtmlStylesheet: () => {
      const styleElem = global.window.document.createElement('style')
      styleElem.id = 'MOCK-CSS'
      return styleElem
    },
    tex2chtmlPromise: (texCode, { display }) =>
      new Promise((resolve) => {
        const mockElement = global.window.document.createElement(
          display ? 'div' : 'span'
        )
        mockElement.innerHTML = texCode
        resolve(mockElement)
      }),
    getMetricsFor: () => {
      return {}
    },
  }
})
