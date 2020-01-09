import { useContext, useEffect, useRef } from 'react'

import Context from './Context'

const useMathJax = (texCode, mathType = 'inline') => {
  const mathJaxElem = useRef(null)
  const { promiseMakers, setTypesetDone, triggerProcessing } = useContext(
    Context
  )

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
      // Trigger chain promise chain
      setTypesetDone(false)
      triggerProcessing()
    }
    return () => {
      if (elem) {
        elem.innerHTML = ''
      }
    }
  }, [
    mathJaxElem,
    mathType,
    promiseMakers,
    setTypesetDone,
    texCode,
    triggerProcessing,
  ])
  return mathJaxElem
}

export default useMathJax
