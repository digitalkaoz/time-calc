import React from 'react'
import TimeField from './TimeField'
import { shallow, mount, render } from 'enzyme'
import 'jest-enzyme'
import Moment from 'moment'
import { setTimeout } from 'timers';

describe('Component - TimeField', () => {
  const update = jest.fn()

  const validValue = {errorList: [], value: 'bar', update: update}
  const invalidValue = {errorList: [{foo: 'bar'}], value: 'bar', update: update}

  it('sets the label', () => {
    const component = shallow(<TimeField formValue={validValue} label='foo' timer={false} select='date' />).dive()

    expect(component.find('label')).toIncludeText('foo')
    expect(component.find('button').length).toBe(0)
  })

  it('renders a timer for picking current time if wanted', () => {
    const component = mount(<TimeField formValue={validValue} timer select='date' />)

    expect(component.find('button')).toIncludeText('timer')      
  })

  describe('Form Handling', () => {
    it('set the form value from props', () => {
      const component = shallow(<TimeField formValue={validValue} select='date' />).dive()

      expect(component.find('input')).toHaveValue('bar')
    })

    xit('is always dirty', () => {
      const component = mount(<TimeField formValue={validValue} select='date' />)

      expect(component.find('div')).toHaveClassName('is-dirty')
    })

    it('is marked invalid in case of errors', () => {
      let mounted = mount(<TimeField formValue={invalidValue} select='date' />)
      expect(mounted.find('div').first()).toHaveClassName('is-invalid')

      mounted = mount(<TimeField formValue={{errorList: [], value: undefined, update: update}} select='date' />)
      expect(mounted.find('div').first()).not.toHaveClassName('is-invalid')

      mounted.setProps({formValue: {errorList: [{foo: 'bar'}], value: undefined, update: update}})
      expect(mounted.find('div').first()).toHaveClassName('is-invalid')
    })

    it('updates the value on value change', () => {
      const e = {target: {value: 'foo'}}

      const component = shallow(<TimeField formValue={validValue} select='date' />).dive()

      component.find('input').simulate('change', e)
      expect(update).toBeCalledWith('foo')
      expect(component.state('dialog').time).toBeInstanceOf(Moment)
    })

    it('updates the value in case of timer click', () => {
      const e = {target: {value: 'foo'}}
      const component = mount(<TimeField formValue={validValue} timer select='date' />)

      component.find('button').simulate('click', e)
      expect(update).toBeCalledWith('foo')
    })
  })

  it('creates a datepicker', () => {
    const component = shallow(<TimeField formValue={validValue} select='date' />).dive()

    expect(component).toHaveState('dialog')
  })

  xit('opens the datepicker onfocus', () => {
    const component = shallow(<TimeField formValue={validValue} select='date' />).dive()

    component.find('input').simulate('focus')
  })
})
