import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Context from './Context'
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
  const mathJaxElem = useMathJax(texCode, displayType)
  const { typesetDone } = useContext(Context)
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

const Div = ({ classNameHide, classNameShow, texCode }) => (
  <MathJaxNode
    classNameHide={classNameHide}
    classNameShow={classNameShow}
    displayType="display"
    texCode={texCode}
  />
)

Div.propTypes = nodePropTypes
Div.defaultProps = nodeDefaultProps

const Span = ({ classNameHide, classNameShow, texCode }) => (
  <MathJaxNode
    classNameHide={classNameHide}
    classNameShow={classNameShow}
    displayType="inline"
    texCode={texCode}
  />
)

Span.propTypes = nodePropTypes
Span.defaultProps = nodeDefaultProps

export { Div, Span }
