import { insert } from 'mathjax-full/js/util/Options'

// if MathJax import has been triggered
let mathJaxImported = false
// if MathJax is ready
let mathJaxReady = false

const DEFAULT_FONT_URL =
  'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'

const pageReadyCallbacks = []

const defaultOptions = {
  chtml: {
    fontURL: DEFAULT_FONT_URL,
  },
  startup: {
    typeset: false,
    pageReady: () => {
      mathJaxReady = true
      while (pageReadyCallbacks.length > 0) {
        pageReadyCallbacks.pop()()
      }
    },
  },
  tex: {
    packages: { '[+]': ['ams'] },
  },
}

// TODO: create (optional) MathJaxOptionsContext (only one options for all MathJaxContexts!)

const useInitMathJax = (options) => {
  if (process.browser) {
    const customOptions = options
    return new Promise((resolve) => {
      if (mathJaxImported) {
        if (mathJaxReady) {
          resolve()
        } else {
          pageReadyCallbacks.push(resolve)
        }
      } else {
        mathJaxImported = true
        // support a custom pageReady function
        let readyCallback
        if (customOptions.startup && customOptions.startup.pageReady) {
          const customReadyCallback = customOptions.startup.pageReady
          delete customOptions.startup.pageReady
          readyCallback = () => {
            resolve()
            customReadyCallback()
          }
        } else {
          readyCallback = resolve
        }
        // MathJax reads options from window.MathJax
        window.MathJax = insert(defaultOptions, customOptions)
        pageReadyCallbacks.push(readyCallback)
        import(
          /* webpackChunkName: "mathjax" */
          './mathjax-bundle'
        )
      }
    })
  }
  return undefined // no-op on server
}

export default useInitMathJax
