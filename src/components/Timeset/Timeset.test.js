import React from 'react'
import ConnectedTimeset, {Timeset} from './Timeset'
import 'jest-enzyme'
import { shallowWithStore, shallowWithState } from 'enzyme-redux'
import { shallow, mount } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import {Provider} from 'react-redux'

describe('Component - Timeset', () => {
  const date = {start: '12:00', break: '00:30', end: '14:30', duration: '02:00', date: '12/12/2012'}

  it('is wrapped with redux', () => {
    const component = shallowWithState(<ConnectedTimeset time={date} index={1} />, {}).dive()

    expect(component.find(Timeset).length).toBe(1)
  })
})
