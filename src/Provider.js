import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDebouncedCallback } from 'use-debounce'

import Context from './Context'
import useInitMathJax from './useInitMathJax'

const updateCss = () => {
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

  // Typeset when no new formulars were encountered.
  const { callback: triggerProcessing } = useDebouncedCallback(() => {
    const runCallbacks = () => {
      while (typesetCallbacks.current.length > 0) {
        typesetCallbacks.current.pop()()
      }
    }

    if (promiseMakers.current.length > 0) {
      promiseMakers.current
        .reduce((chain, makePromise) => chain.then(makePromise), initPromise)
        .then(() => {
          promiseMakers.current = []
          updateCss()
          setTypesetDone(true)
          runCallbacks()
        })
    } else {
      setTypesetDone(true)
      runCallbacks()
    }
  }, 100)

  useEffect(() => {
    // Trigger typesetting in case no formulars were rendered.
    triggerProcessing()
  })

  const value = {
    addCallback,
    removeCallback,
    setTypesetDone,
    typesetDone,
    promiseMakers,
    triggerProcessing,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Provider
