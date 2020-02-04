/* eslint-disable global-require */

import { useContext } from 'react'
import { insert } from 'mathjax-full/js/util/Options'

import ConfigContext from './ConfigContext'

const DEFAULT_FONT_URL =
  'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'

// if MathJax import has been triggered
let mathJaxImported = false
// if MathJax is ready
let mathJaxReady = false

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

const importMathJax = () => {
  require('mathjax-full/components/src/startup/lib/startup.js')
  const { Loader } = require('mathjax-full/js/components/loader.js')
  Loader.preLoad('loader', 'startup', 'core', 'input/tex-full', 'output/chtml')
  require('mathjax-full/components/src/core/core.js')
  require('mathjax-full/components/src/input/tex-full/tex-full.js')
  require('mathjax-full/components/src/output/chtml/chtml.js')
  require('mathjax-full/components/src/startup/startup.js')
}

const useInitMathJax = () => {
  const options = useContext(ConfigContext)
  if (typeof window !== 'undefined') {
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
        if (options.startup && options.startup.pageReady) {
          const customReadyCallback = options.startup.pageReady
          delete options.startup.pageReady
          readyCallback = () => {
            resolve()
            customReadyCallback()
          }
        } else {
          readyCallback = resolve
        }
        // MathJax reads options from window.MathJax
        window.MathJax = insert(defaultOptions, options, false)
        pageReadyCallbacks.push(readyCallback)
        importMathJax()
      }
    })
  }
  return undefined // no-op on server
}

export default useInitMathJax
