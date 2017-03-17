import React from 'react'
import TimeList, {PureTimeList} from './TimeList'
import 'jest-enzyme'
import { shallowWithStore, shallowWithState } from 'enzyme-redux'
import { shallow, mount } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import {Provider} from 'react-redux'

describe('Component - TimeList', () => {
  const download = jest.fn()
  const clear = jest.fn()
  const load = jest.fn()

  const times = {0: {duration: '02:00'}, 1: {duration: '02:00'}}

  it('is wrapped with redux', () => {
    const component = shallowWithState(<TimeList />, {timelist: {times: []}})

    expect(component.find(PureTimeList).length).toBe(1)
  })

  it('renders an empty div if there are no times to display', () => {
    const component = shallow(<PureTimeList times={{}} clear={clear} download={download} load={load} />)

    expect(component).toHaveHTML('<div></div>')
  })

  it('displays a sum field of all times', () => {
    const component = shallow(<PureTimeList times={times} clear={clear} download={download} load={load} />)

    expect(component.find('#sum')).toIncludeText('04:00')
  })

  describe('Actions', () => {
    it('has a delete-all button when there are timesets', () => {
      const component = mount(<Provider store={createMockStore({})}><PureTimeList times={times} clear={clear} download={download} load={load} /></Provider>)

      component.find('button').filterWhere(n => n.text() === 'delete').first().simulate('click')

      expect(clear).toBeCalled()
    })

    it('deletes all timeset if pressed yes in dialog', () => {
      const component = mount(<Provider store={createMockStore({})}><PureTimeList times={times} clear={clear} download={download} load={load} /></Provider>)

      component.find('#deleteAll button').filterWhere(n => n.text() === 'Do It').first().simulate('click')

      expect(clear).toBeCalled()
    })

    it('has a download button which exports the timelist as CSV', () => {
      const component = mount(<Provider store={createMockStore()}><PureTimeList times={times} clear={clear} download={download} load={load} /></Provider>)

      component.find('button').filterWhere(n => n.text() === 'cloud_download').first().simulate('click')

      expect(download).toBeCalled()
    })
  })
})
