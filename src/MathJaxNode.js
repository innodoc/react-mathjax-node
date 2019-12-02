import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import MathJaxContext from './MathJaxContext'
import typesetStates from './states'
import useMathJax from './useMathJax'

const MathJaxNode = ({ texCode, displayType, fadeIn }) => {
  const mathJaxElem = useMathJax(texCode || '', displayType)
  const { typesetStatus } = useContext(MathJaxContext)
  const className = 'TODO'
  // const className = !fadeIn || typesetStatus === typesetStates.DONE
  //   ? fadeInCss.show
  //   : fadeInCss.hide
  return displayType === 'display'
    ? <div className={className} ref={mathJaxElem} />
    : <span className={className} ref={mathJaxElem} />
}

MathJaxNode.propTypes = {
  displayType: PropTypes.oneOf(['inline', 'display']),
  fadeIn: PropTypes.bool,
  texCode: PropTypes.string,
}

MathJaxNode.defaultProps = {
  displayType: 'display',
  fadeIn: false,
  texCode: '',
}

export default MathJaxNode
