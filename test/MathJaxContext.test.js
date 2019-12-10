import React, { useContext } from 'react'
import { shallow } from 'enzyme'

import MathJaxContext from '../src/MathJaxContext'

describe('MathJaxContext', () => {
  it('should provide no defaults', () => {
    const MyComponent = () => <div context={useContext(MathJaxContext)} />
    const div = shallow(<MyComponent />).find('div')
    expect(div.prop('context')).toBeUndefined()
  })
})
