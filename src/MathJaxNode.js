import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Context from './Context'
import useMathJax from './useMathJax'

const MathJaxNode = ({
  classNameHide,
  classNameShow,
  displayType,
  texCode,
}) => {
  const mathJaxElem = useMathJax(texCode, displayType)
  const { typesetDone } = useContext(Context)
  let className
  if (classNameHide && classNameShow) {
    className = typesetDone ? classNameShow : classNameHide
  }
  return <span className={className} ref={mathJaxElem} />
}

MathJaxNode.propTypes = {
  classNameHide: PropTypes.string,
  classNameShow: PropTypes.string,
  displayType: PropTypes.oneOf(['inline', 'display']),
  texCode: PropTypes.string,
}

MathJaxNode.defaultProps = {
  classNameHide: null,
  classNameShow: null,
  displayType: 'inline',
  texCode: '',
}

export default MathJaxNode
