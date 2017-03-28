import fetchMock from 'fetch-mock'
import {CalculationHelper, StoreHelper, TimeHelper} from './helpers'

describe('Logic - CalculationHelper', () => {
  const expected = {break: '00:30', date: '12/12/2012', duration: '01:30', end: '14:00', start: '12:00'}
  const given = {schema: {properties: {start: '', end: '', break: ''}}, value: {start: '12:00', break: '00:30', end: '14:00', date: '12/12/2012'}}
  const mockOnline = (state) => {
    Object.defineProperty(navigator.constructor.prototype, 'onLine', {
      get: function getOnline () {
        return state
      }
    })
  }

  it('can calculate on the client', () => {
    const result = CalculationHelper.calculateLocal(given)

    expect(result).toEqual(expected)
  })

  xit('can fetch the result from a http-request', async () => {
    fetchMock.mock('begin:https://localhost:3001/calculate?', expected)

    const result = await CalculationHelper.calculateRemote(given)

    expect(result).toEqual(expected)
    expect(fetchMock.called('begin:https://localhost:3001/calculate')).toBeTruthy()
  })

  xit('falls back to local calculation in case of an server error', async () => {
    fetchMock.get('begin:https://localhost:3001/calculate?', () => {
      throw new Error()
    })

    const result = await CalculationHelper.calculateRemote(given)

    expect(result).toEqual(expected)
    expect(fetchMock.called('begin:https://localhost:3001/calculate')).toBeTruthy()
  })

  xit('calculates on the server if online', async () => {
    fetchMock.mock('begin://localhost:3001/calculate?', expected)
    mockOnline(true)

    const result = await CalculationHelper.fetchCalculation(given)

    expect(fetchMock.called('begin:https://localhost:3001/calculate')).toBeTruthy()
    expect(result).toEqual(expected)
  })

  it('calculates on the client if offline', async () => {
    mockOnline(false)

    const result = await CalculationHelper.fetchCalculation(given)

    expect(result).toEqual(expected)
    expect(fetchMock.called('begin:https://localhost:3001/calculate')).toBeFalsy()
  })
})

describe('Logic - TimeHelper', () => {
  it('sorts a list of times by comparing the dates', () => {
    let times = [{date: '12/12/2012'}, {date: '01/01/1970'}]

    expect(TimeHelper.sortTimes(times)).toEqual([{date: '01/01/1970'}, {date: '12/12/2012'}])
  })

  it('generates a CSV of times and gives a download', () => {
    window.open = jest.fn()

    let times = [{date: '12/12/2012'}, {date: '01/01/1970'}]

    TimeHelper.downloadTimes(times)

    expect(window.open).toBeCalledWith('data:text/csv;charset=utf-8,date%0A12/12/2012%0A01/01/1970')
  })
})

describe('Logic - StoreHelper', () => {
  let storeGet
  let storeSet

    // beforeAll(() => {
    // TODO jest 19
    //     storeGet = jest.spyOn(StoreHelper, 'get');
    //     storeSet = jest.spyOn(StoreHelper, 'set');
    // })

  xit('returns an array of times from local-storage', () => {
    const times = StoreHelper.loadTimes()

    expect(storeGet).toBeCalled()
    expect(times).toBe([])
  })

  xit('saves times to local-storage', () => {
    const times = StoreHelper.saveTimes([])

    expect(storeGet).toBeCalled()
    expect(times).toBe([])
  })
})
