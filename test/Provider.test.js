import React, { useContext, useEffect } from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'

import Context from '../src/Context'
import Provider from '../src/Provider'

let mockUseInitMathJax
jest.mock('../src/useInitMathJax', () => () => mockUseInitMathJax)

// make sure state changes in useEffect happen inside act()
// https://github.com/airbnb/enzyme/issues/2073#issuecomment-565736674
const waitForComponent = async (wrapper) => {
  await act(async () => {
    await new Promise((r) => setTimeout(r, 150)) // give time to debounced callback
    wrapper.update()
  })
}

const Component = ({ cb, promiseMakerToAdd }) => {
  const {
    addCallback,
    promiseMakers,
    removeCallback,
    typesetDone,
  } = useContext(Context)
  useEffect(() => {
    if (promiseMakerToAdd) {
      promiseMakers.current.push(promiseMakerToAdd)
    }
    addCallback(cb)
    return () => removeCallback(cb)
  })
  return <div className={typesetDone ? 'done' : 'working'} />
}
Component.defaultProps = {
  cb: () => {},
  promiseMakerToAdd: null,
}

describe('Provider', () => {
  let mockChtmlStylesheet
  beforeEach(() => {
    mockUseInitMathJax = Promise.resolve()
    mockChtmlStylesheet = jest.fn(() => {
      const styleElem = global.window.document.createElement('style')
      styleElem.id = 'MOCK-CSS'
      return styleElem
    })
    global.window.MathJax = {
      chtmlStylesheet: mockChtmlStylesheet,
    }
  })

  it('should support a custom callback', async () => {
    const cb = jest.fn()
    const wrapper = mount(
      <Provider>
        <Component cb={cb} />
      </Provider>
    )
    await waitForComponent(wrapper)
    expect(cb).toBeCalledTimes(1)
  })

  it('should set typesetDone', async () => {
    const wrapper = mount(
      <Provider>
        <Component />
      </Provider>
    )
    expect(wrapper.find('div').prop('className')).toBe('working')
    await waitForComponent(wrapper)
    expect(wrapper.find('div').prop('className')).toBe('done')
  })

  it('should make and run a promise', async () => {
    const makePromise = jest.fn(() => Promise.resolve())
    const wrapper = mount(
      <Provider>
        <Component promiseMakerToAdd={makePromise} />
      </Provider>
    )
    await waitForComponent(wrapper)
    expect(makePromise).toBeCalledTimes(1)
  })

  it('should update stylesheets', async () => {
    const wrapper = mount(
      <Provider>
        <Component />
      </Provider>
    )
    await waitForComponent(wrapper)
    expect(mockChtmlStylesheet).toBeCalledTimes(1)
    expect(document.getElementById('MOCK-CSS')).toBeTruthy()
  })
})
