import React, { useEffect, useContext } from 'react'
import { mount } from 'enzyme'

import { Provider, Context, useMathJax } from '..'

const MathJaxComponent = ({ callback, mathType, texCode }) => {
  const { addCallback, removeCallback } = useContext(Context)
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
      <Provider>
        <MathJaxComponent
          callback={callback}
          mathType="inline"
          texCode={texCode}
        />
      </Provider>
    )
  })
})
