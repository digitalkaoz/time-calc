import React from 'react'
import Button from './Button'
import { shallow } from 'enzyme'
import 'jest-enzyme'

describe('Component - Button', () => {
  it('adds the classes from props.classes to the button', () => {
    const component = shallow(<Button classes='mdl-button--raised' />)

    expect(component.find('button')).toHaveClassName('mdl-button--raised')
  })

  it('adds the mdl-icon from props.icon', () => {
    const component = shallow(<Button icon='add' />)

    expect(component.find('i')).toHaveHTML("<i class='material-icons'>add</i>")
  })

  it('renders a disabled button if there is no callback defined via props.invoke', () => {
    const component = shallow(<Button />)

    expect(component.find('button')).toBeDisabled()
  })

  it('binds the onClick handler', () => {
    const cb = jest.fn()
    const component = shallow(<Button invoke={cb} context={1337} />)

    component.find('button').simulate('click')
    expect(cb).toBeCalledWith(1337)
  })
})
