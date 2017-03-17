import React from 'react'
import App from './App'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import 'jest-enzyme'

describe('Component - App', () => {
  it('has the correct title', () => {
    const component = shallow(<App />)

    expect(component.find('.mdl-layout-title')).toIncludeText('Time - Calculator')
  })

  it('wraps everything with redux', () => {
    const component = shallow(<App />)

    expect(component.find(Provider)).toHaveProp('store')
  })
})
