import React from 'react'
import { mount } from 'enzyme'

let mockOptions
jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: () => mockOptions,
  }
})

let mockStartup
jest.mock('mathjax-full/components/src/startup/lib/startup.js', () => {})
jest.mock('mathjax-full/js/components/loader.js', () => ({
  Loader: { preLoad: () => {} },
}))
jest.mock('mathjax-full/components/src/core/core.js', () => {})
jest.mock('mathjax-full/components/src/input/tex-full/tex-full.js', () => {})
jest.mock('mathjax-full/components/src/output/chtml/chtml.js', () => {})
jest.mock('mathjax-full/components/src/startup/startup.js', () => mockStartup())

describe('useInitMathJax', () => {
  let useInitMathJax
  let makeComponent
  beforeEach(() => {
    mockOptions = {}
    // Simulate lib startup
    mockStartup = jest.fn(() => {
      window.MathJax.startup.pageReady()
    })
    // reset useInitMathJax module state and side-effects
    if (window.MathJax) {
      delete window.MathJax
    }
    jest.isolateModules(() => {
      useInitMathJax = require('../src/useInitMathJax').default
    })
    // Component factory that lets us access the init promise
    makeComponent = () => {
      let promise
      const Component = () => {
        promise = useInitMathJax()
        return <div />
      }
      return [Component, () => promise]
    }
  })

  it('should load MathJax', async () => {
    const [Component, getPromise] = makeComponent()
    mount(<Component />)
    const initPromise = getPromise()
    expect(initPromise).not.toBeUndefined()
    await initPromise
    expect(mockStartup).toBeCalledTimes(1)
  })

  it('should load MathJax with custom pageReady callback', async () => {
    const customPageReady = jest.fn()
    mockOptions = {
      startup: { pageReady: customPageReady },
    }
    const [Component, getPromise] = makeComponent()
    mount(<Component />)
    const initPromise = getPromise()
    expect(initPromise).not.toBeUndefined()
    await initPromise
    expect(mockStartup).toBeCalledTimes(1)
    expect(customPageReady).toBeCalledTimes(1)
  })

  it('should (1) load MathJax, (2) load with ready MathJax', async () => {
    const [Component1, getPromise1] = makeComponent()
    mount(<Component1 />)
    const [Component2, getPromise2] = makeComponent()
    mount(<Component2 />)
    const initPromise1 = getPromise1()
    expect(initPromise1).not.toBeUndefined()
    await initPromise1
    const initPromise2 = getPromise2()
    expect(initPromise2).not.toBeUndefined()
    await initPromise2
    expect(mockStartup).toBeCalledTimes(1)
  })

  it('should (1) load MathJax, (2) load with non-ready MathJax', async () => {
    mockStartup = jest.fn() // delay pageReady manually
    const [Component1, getPromise1] = makeComponent()
    mount(<Component1 />)
    const [Component2, getPromise2] = makeComponent()
    mount(<Component2 />)
    const initPromise1 = getPromise1()
    expect(initPromise1).not.toBeUndefined()
    expect(mockStartup).toBeCalledTimes(1)
    const initPromise2 = getPromise2()
    expect(initPromise2).not.toBeUndefined()
    window.MathJax.startup.pageReady()
    await initPromise1
    await initPromise2
  })
})
