import React from 'react'
import DisplayField from './DisplayField'
import { shallow } from 'enzyme'
import 'jest-enzyme'

describe('Component - DisplayField', () => {
  it('sets the label', () => {
    const component = shallow(<DisplayField label='foo' />)

    expect(component.find('label')).toIncludeText('foo')
  })

  it('sets the value', () => {
    const component = shallow(<DisplayField value='foo' />)

    expect(component.find('input')).toHaveValue('foo')
  })
})
