import React from 'react'
import { mount } from 'enzyme'

import useMathJax from '../src/useMathJax'

let mockPromiseMakers
const mockSetTypesetDone = jest.fn()
const mockTriggerProcessing = jest.fn()
let mockRef
let mockUseEffectFunc
jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: () => {
      mockPromiseMakers = ActualReact.useRef([])
      return {
        promiseMakers: mockPromiseMakers,
        setTypesetDone: mockSetTypesetDone,
        triggerProcessing: mockTriggerProcessing,
      }
    },
    useEffect: (func) => {
      mockUseEffectFunc = func
    },
    useRef: () => {
      mockRef = ActualReact.useRef()
      return mockRef
    },
  }
})

const MathJaxComponent = ({ mathType, texCode }) => {
  const elem = useMathJax(texCode, mathType)
  return <div ref={elem} />
}

const texCode = 'f(x)=x^2'

describe('useMathJax', () => {
  it.each(['inline', 'display'])(
    'should call MathJax and manage nodes (%s)',
    async (mathType) => {
      mockSetTypesetDone.mockClear()
      mockTriggerProcessing.mockClear()

      window.MathJax = {
        tex2chtmlPromise: (_texCode, options) => {
          expect(_texCode).toBe(texCode)
          expect(options).toEqual({
            mock: 'metrics',
            display: mathType === 'display',
          })
          return new Promise((resolve) => {
            const el = window.document.createElement('div')
            el.id = 'mockid'
            resolve(el)
          })
        },
        getMetricsFor: (elem, display) => {
          expect(elem).toBe(mockRef.current)
          expect(display).toBe(mathType === 'display')
          return { mock: 'metrics' }
        },
      }

      const wrapper = mount(
        <MathJaxComponent mathType={mathType} texCode={texCode} />
      )

      // Call useEffect *after* Component is mounted, so ref is set
      const cleanupFunc = mockUseEffectFunc()

      expect(mockPromiseMakers.current).toHaveLength(1)
      await mockPromiseMakers.current[0]().then(() => {
        // check mathJaxNodes were appended
        expect(mockRef.current.children).toHaveLength(1)
        expect(mockRef.current.children[0].id).toBe('mockid')
      })
      expect(mockSetTypesetDone).toBeCalledTimes(1)
      expect(mockSetTypesetDone).toBeCalledWith(false)
      expect(mockTriggerProcessing).toBeCalledTimes(1)

      // check ref is passed to children
      const div = wrapper.childAt(0)
      expect(div.instance()).toBe(mockRef.current)
      // check removal of mathJaxNodes on cleanup
      cleanupFunc()
      expect(mockRef.current.children).toHaveLength(0)
    }
  )
})
