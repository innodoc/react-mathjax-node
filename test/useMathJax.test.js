import React, { useEffect, useContext } from 'react'
import { mount } from 'enzyme'

import { MathJaxProvider, MathJaxContext, useMathJax } from '..'

const MathJaxComponent = ({ callback, mathType, texCode }) => {
  const { addCallback, removeCallback } = useContext(MathJaxContext)
  useEffect(() => {
    addCallback(callback)
    return () => removeCallback(callback)
  })
  const elem = useMathJax(texCode, mathType)
  return <div ref={elem} />
}

describe('useMathJax', () => {
  it('should render', (done) => {
    const texCode = 'f(x)=x^2'
    let wrapper
    const callback = () => {
      expect(wrapper.html()).toBe(`<div><span>${texCode}</span></div>`)
      done()
    }
    wrapper = mount(
      <MathJaxProvider>
        <MathJaxComponent
          callback={callback}
          mathType="inline"
          texCode={texCode}
        />
      </MathJaxProvider>
    )
  })
})
