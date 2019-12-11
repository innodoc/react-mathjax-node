import { useContext, useEffect, useRef } from 'react'

import Context from './Context'

const useMathJax = (texCode, mathType = 'inline') => {
  const mathJaxElem = useRef(null)
  const { promiseMakers } = useContext(Context)

  // Add typesetting Promise
  useEffect(() => {
    const display = mathType === 'display'
    const elem = mathJaxElem.current
    if (typeof window !== 'undefined') {
      promiseMakers.current.push(() => {
        return window.MathJax.tex2chtmlPromise(texCode, {
          ...window.MathJax.getMetricsFor(elem, display),
          display,
        }).then((mathJaxNodes) => {
          // add rendered nodes
          if (mathJaxNodes) {
            elem.innerHTML = mathJaxNodes.outerHTML
          }
        })
      })
    }
    return () => {
      if (elem) {
        elem.innerHTML = ''
      }
    }
  }, [mathJaxElem, mathType, promiseMakers, texCode])
  return mathJaxElem
}

export default useMathJax
