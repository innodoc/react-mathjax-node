import React from 'react'
import { mount } from 'enzyme'

import MathJaxNode from '../src/MathJaxNode'

let mockRef
jest.mock('../src/useMathJax', () => () => {
  mockRef = require('react').useRef()
  return mockRef
})

let mockContext
jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: () => mockContext,
  }
})

describe('nodes', () => {
  const texCode = 'f(x)=x^2'

  describe.each(['display', 'inline'])(
    '<MathJaxNode /> (%s)',
    (displayType) => {
      it.each([true, false])(
        'should render with classNames (typesetDone=%s)',
        (typesetDone) => {
          mockContext = { typesetDone }
          const wrapper = mount(
            <MathJaxNode
              classNameHide="hide"
              classNameShow="show"
              displayType={displayType}
              texCode={texCode}
            />
          )
          const tag = wrapper.childAt(0)
          expect(tag.type()).toBe('span')
          expect(tag.instance()).toBe(mockRef.current)
          expect(tag.prop('className')).toBe(typesetDone ? 'show' : 'hide')
        }
      )

      it('should render w/o classNames', () => {
        const wrapper = mount(
          <MathJaxNode displayType={displayType} texCode={texCode} />
        )
        const tag = wrapper.childAt(0)
        expect(tag.type()).toBe('span')
        expect(tag.instance()).toBe(mockRef.current)
        expect(tag.prop('className')).toBeUndefined()
      })
    }
  )
})
