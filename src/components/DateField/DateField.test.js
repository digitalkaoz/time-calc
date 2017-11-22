import React from 'react'
import DateField from './DateField'
import { shallow, mount, render } from 'enzyme'
import 'jest-enzyme'
import Moment from 'moment'

describe('Component - Datefield', () => {
  const update = jest.fn()

  const validValue = {errorList: [], value: 'bar', update: update}
  const invalidValue = {errorList: [{foo: 'bar'}], value: 'bar', update: update}

  it('sets the label', () => {
    const component = shallow(<DateField formValue={validValue} label='foo' select='date' />).dive()

    expect(component.find('label')).toIncludeText('foo')
  })

  describe('Form Handling', () => {
    it('set the form value from props', () => {
      const component = shallow(<DateField formValue={validValue} select='date' />).dive()

      expect(component.find('input')).toHaveValue('bar')
    })

    xit('is always dirty', () => {
      const component = mount(<DateField formValue={validValue} select='date' />)

      component.update()
      expect(component.find('div')).toHaveClassName('is-dirty')
    })

    it('is marked invalid in case of errors', () => {
      let mounted = mount(<DateField formValue={invalidValue} select='date' />)
      expect(mounted.find('div').first()).toHaveClassName('is-invalid')

      mounted = mount(<DateField formValue={{errorList: [], value: undefined, update: update}} select='date' />)
      expect(mounted.find('div').first()).not.toHaveClassName('is-invalid')

      mounted.setProps({formValue: {errorList: [{foo: 'bar'}], value: undefined, update: update}})
      expect(mounted.find('div').first()).toHaveClassName('is-invalid')
    })

    it('invokes the form.update on value change', () => {
      const e = {target: {value: 'foo'}}

      const component = shallow(<DateField formValue={validValue} select='date' />).dive()

      component.find('input').simulate('change', e)
      expect(update).toBeCalledWith('foo')
      expect(component.state('dialog').time).toBeInstanceOf(Moment)
    })
  })

  it('creates a datepicker', () => {
    const component = shallow(<DateField formValue={validValue} select='date' />).dive()

    expect(component).toHaveState('dialog')
  })

  xit('opens the datepicker onfocus', () => {
    const component = shallow(<DateField formValue={validValue} select='date' />).dive()

    component.find('input').simulate('focus')
  })
})
