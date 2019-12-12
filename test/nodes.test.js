import React from 'react'
import { mount, shallow } from 'enzyme'

import { Div, MathJaxNode, Span } from '../src/nodes'

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

  describe.each([
    ['Div', Div, 'display'],
    ['Span', Span, 'inline'],
  ])('<MathJax.%s />', (_, Component, displayType) => {
    it('should render', () => {
      const wrapper = shallow(
        <Component
          classNameHide="hide"
          classNameShow="show"
          texCode={texCode}
        />
      )
      const node = wrapper.find(MathJaxNode)
      expect(node.prop('classNameHide')).toBe('hide')
      expect(node.prop('classNameShow')).toBe('show')
      expect(node.prop('displayType')).toBe(displayType)
      expect(node.prop('texCode')).toBe(texCode)
    })
  })

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
          expect(tag.type()).toBe(displayType === 'display' ? 'div' : 'span')
          expect(tag.instance()).toBe(mockRef.current)
          expect(tag.prop('className')).toBe(typesetDone ? 'show' : 'hide')
        }
      )

      it('should render w/o classNames', () => {
        const wrapper = mount(
          <MathJaxNode displayType={displayType} texCode={texCode} />
        )
        const tag = wrapper.childAt(0)
        expect(tag.type()).toBe(displayType === 'display' ? 'div' : 'span')
        expect(tag.instance()).toBe(mockRef.current)
        expect(tag.prop('className')).toBeUndefined()
      })
    }
  )
})
