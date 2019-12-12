import React, { useContext } from 'react'
import { mount } from 'enzyme'

import ConfigContext from '../src/ConfigContext'
import ConfigProvider from '../src/ConfigProvider'

describe('ConfigProvider', () => {
  it('should provide config object', () => {
    const testOptions = { foo: 'bar' }
    const Component = () => {
      const options = useContext(ConfigContext)
      return <div options={options} />
    }
    const wrapper = mount(
      <ConfigProvider options={testOptions}>
        <Component />
      </ConfigProvider>
    )
    expect(wrapper.find('div').prop('options')).toBe(testOptions)
  })
})
