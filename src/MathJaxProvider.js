import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// import { childrenType } from '@innodoc/client-misc/src/propTypes'

import MathJaxContext from './MathJaxContext'
import typesetStates from './states'
import useInitMathJax from './useInitMathJax'

const DEFAULT_MATHJAX_FONT_URL = process.browser
  ? `${window.location.origin}/fonts/mathjax-woff-v2`
  : ''

const MathJaxProvider = ({ children, options }) => {
  const typesetTimer = useRef(false)
  const typesetCallbacks = useRef([])
  const [typesetStatus, setTypesetStatus] = useState(typesetStates.INITIAL)
  const addCallback = useCallback((cb) => typesetCallbacks.current.push(cb), [])
  const removeCallback = useCallback(
    (cb) => typesetCallbacks.current.splice(typesetCallbacks.current.indexOf(cb), 1), [])
  const value = {
    addCallback,
    removeCallback,
    setTypesetStatus,
    typesetCallbacks,
    typesetStatus,
    typesetTimer,
  }

  useInitMathJax({
    ...options,
    chtml: {
      fontURL: DEFAULT_MATHJAX_FONT_URL, // set default font URL
      ...options.chtml || {},
    },
  })

  return (
    <MathJaxContext.Provider value={value}>
      {children}
    </MathJaxContext.Provider>
  )
}

MathJaxProvider.propTypes = {
  children: PropTypes.any.isRequired,
  options: PropTypes.object.isRequired,
}

export default MathJaxProvider
