import React from 'react'
import PropTypes from 'prop-types'

import ConfigContext from './ConfigContext'

const ConfigProvider = ({ children, options }) => (
  <ConfigContext.Provider value={options}>{children}</ConfigContext.Provider>
)

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.object,
}

ConfigProvider.defaultProps = {
  options: {},
}

export default ConfigProvider
