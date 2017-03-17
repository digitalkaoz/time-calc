import React from 'react'
import ConnectedForm, {Form} from './Form'
import {TimeField} from '../TimeField/TimeField'
import DateField from '../DateField/DateField'
import DisplayField from '../DisplayField/DisplayField'
import 'jest-enzyme'
import { shallowWithStore, shallowWithState } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'
import { shallow, mount, render } from 'enzyme'

describe('Component - Form', () => {
  const dispatch = jest.fn()
  const save = jest.fn()
  const calculate = jest.fn()

  it('renders every field', () => {
    const component = mount(<Form save={save} edit={false} calculate={calculate} />)
    const defaultValue = {errorList: [], value: undefined, update: jest.fn()}

    expect(component.containsMatchingElement(<DisplayField label='Duration' value='' />)).toBeTruthy()
    expect(component.find('input').length).toBe(5)

    expect(component).toContainReact(<TimeField select='start' label='Start Time' formValue={defaultValue} mobile={false} timer={true} />) // finds but closing tag problem
    expect(component.containsMatchingElement(<TimeField select='start' label='Start Time' formValue={defaultValue} mobile={false} timer={true} />)).toBeTruthy() // cant find anything
    expect(component.debug()).toBe('') // debug
      // expect(component).toContainReact(<DateField select='date' label='Day' formValue={{}}/>);
      // expect(component.containsMatchingElement(<TimeField select='break' label='Break' mobile={false} timer={false} formValue={{errorList: [], value: undefined, update: jest.fn()}}/>)).toBeTruthy();
      // expect(component).toContainReact(<TimeField select='end' label='End' formValue={{ value : undefined}}/>);
  })

  xit('triggers calculation in case of valid form', () => {
    const expectedState = {
      form: {
        value: {
          start: '',
          end: '',
          date: ''
        }
      }
    }
    const component = mount(<ConnectedForm dispatch={dispatch} store={createMockStore(expectedState)} />)
    const time = {target: {value: '12:00'}}
    const date = {target: {value: '12/12/2012'}}

    component.find('#start').simulate('change', time)
    component.find('#end').simulate('change', time)
    component.find('#date').simulate('change', date)

    expect(dispatch).toBeCalledWith({})
  })

  describe('form submit handling', () => {
    it('has no save button for new timesets', () => {
      const expectedState = {
        form: {
          value: {}
        }
      }
      const component = mount(<ConnectedForm dispatch={dispatch} store={createMockStore(expectedState)} />)

      expect(component.find('button').length).toBe(2) // 2 for time-pickers
    })

    it('has an add button for calculated timesets', () => {
      const expectedState = {
        form: {
          current: {
            duration: '02:00'
          }
        }
      }
      const component = mount(<ConnectedForm dispatch={dispatch} store={createMockStore(expectedState)} />)

      expect(component.find('button').last()).toIncludeText('add')
      // component.find('button').last().simulate('click');
      // expect(dispatch).toBeCalledWith({});
    })

    it('has a save button for existing timesets', () => {
      const expectedState = {
        form: {
          edit: true,
          current: {
            duration: '02:00'
          }
        }
      }
      const component = mount(<ConnectedForm dispatch={dispatch} store={createMockStore(expectedState)} />)

      expect(component.find('button').last()).toIncludeText('save')
      // component.find('button').last().simulate('click');
      // expect(save).toBeCalledWith({});
    })
  })
})
