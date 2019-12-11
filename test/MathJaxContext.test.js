import React, { useContext } from 'react'
import { shallow } from 'enzyme'

import Context from '../src/Context'

describe('Context', () => {
  it('should provide no defaults', () => {
    const MyComponent = () => <div context={useContext(Context)} />
    const div = shallow(<MyComponent />).find('div')
    expect(div.prop('context')).toBeUndefined()
  })
})
