import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import MathJaxContext from './MathJaxContext'
import useMathJax from './useMathJax'

const nodePropTypes = {
  classNameHide: PropTypes.string,
  classNameShow: PropTypes.string,
  texCode: PropTypes.string,
}

const nodeDefaultProps = {
  classNameHide: null,
  classNameShow: null,
  texCode: '',
}

const MathJaxNode = ({
  classNameHide,
  classNameShow,
  displayType,
  texCode,
}) => {
  const mathJaxElem = useMathJax(texCode || '', displayType)
  const { typesetDone } = useContext(MathJaxContext)
  let className
  if (classNameHide && classNameShow) {
    className = typesetDone ? classNameShow : classNameHide
  }
  const Tag = displayType === 'display' ? 'div' : 'span'
  return <Tag className={className} ref={mathJaxElem} />
}

MathJaxNode.propTypes = {
  displayType: PropTypes.oneOf(['inline', 'display']),
  ...nodePropTypes,
}

MathJaxNode.defaultProps = {
  displayType: 'display',
  ...nodeDefaultProps,
}

const MathJaxDiv = ({ classNameHide, classNameShow, texCode }) => (
  <MathJaxNode
    classNameHide={classNameHide}
    classNameShow={classNameShow}
    displayType="display"
    texCode={texCode}
  />
)

MathJaxDiv.propTypes = nodePropTypes
MathJaxDiv.defaultProps = nodeDefaultProps

const MathJaxSpan = ({ classNameHide, classNameShow, texCode }) => (
  <MathJaxNode
    classNameHide={classNameHide}
    classNameShow={classNameShow}
    displayType="inline"
    texCode={texCode}
  />
)

MathJaxSpan.propTypes = nodePropTypes
MathJaxSpan.defaultProps = nodeDefaultProps

export { MathJaxDiv, MathJaxSpan }
