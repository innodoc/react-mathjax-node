import React from 'react'
import PropTypes from 'prop-types'

import MathJaxConfigContext from './MathJaxConfigContext'

const MathJaxConfigProvider = ({ children, options }) => (
  <MathJaxConfigContext.Provider value={options}>
    {children}
  </MathJaxConfigContext.Provider>
)

MathJaxConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.object,
}

MathJaxConfigProvider.defaultProps = {
  options: {},
}

export default MathJaxConfigProvider
