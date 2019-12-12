import React, { useContext } from 'react'
import { shallow } from 'enzyme'

import ConfigContext from '../src/ConfigContext'

describe('ConfigContext', () => {
  it('should provide empty object as default', () => {
    const Component = () => <div context={useContext(ConfigContext)} />
    const div = shallow(<Component />).find('div')
    expect(div.prop('context')).toEqual({})
  })
})
