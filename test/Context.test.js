import React, { useContext } from 'react'
import { shallow } from 'enzyme'

import Context from '../src/Context'

describe('Context', () => {
  it('should provide undefined as default', () => {
    const Component = () => <div context={useContext(Context)} />
    const div = shallow(<Component />).find('div')
    expect(div.prop('context')).toBeUndefined()
  })
})
