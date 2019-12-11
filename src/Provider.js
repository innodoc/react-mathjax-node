import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Context from './Context'
import useInitMathJax from './useInitMathJax'

const typesettingDone = (setTypesetStatus, typesetCallbacks) => {
  // Add chtml styles.
  const chtmlStylesheet = window.MathJax.chtmlStylesheet()
  const existingChtmlStylesheet = document.getElementById(chtmlStylesheet.id)
  if (existingChtmlStylesheet) {
    existingChtmlStylesheet.parentNode.replaceChild(
      chtmlStylesheet,
      existingChtmlStylesheet
    )
  } else {
    document.getElementsByTagName('head')[0].appendChild(chtmlStylesheet)
  }
  // Run callbacks.
  setTypesetStatus(true)
  while (typesetCallbacks.current.length > 0) {
    typesetCallbacks.current.pop()()
  }
}

const Provider = ({ children }) => {
  // Using a chain of promises to orchestrate the flow of events.
  const promiseMakers = useRef([])
  // MathJax typesetting state. Can be used to show contents after typeset is done.
  const [typesetDone, setTypesetDone] = useState(false)
  // List of callbacks after *all* sub-tree MathJax elements have been typeset.
  const typesetCallbacks = useRef([])
  const addCallback = useCallback((cb) => typesetCallbacks.current.push(cb), [])
  const removeCallback = useCallback(
    (cb) =>
      typesetCallbacks.current.splice(typesetCallbacks.current.indexOf(cb), 1),
    []
  )

  // Load MathJax
  const initPromise = useInitMathJax()

  // Typeset formulars sequentially.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      promiseMakers.current
        .reduce((chain, makePromise) => chain.then(makePromise), initPromise)
        .then(() => typesettingDone(setTypesetDone, typesetCallbacks))
    }
  }, [initPromise, setTypesetDone, typesetCallbacks])

  const value = {
    addCallback,
    removeCallback,
    setTypesetDone,
    typesetCallbacks,
    typesetDone,
    promiseMakers,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Provider
