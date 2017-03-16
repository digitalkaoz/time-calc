import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'
import {CalculationHelper, TimeHelper, StoreHelper} from '../helpers'
import {CALCULATE, CLEAR_TIMES, LOAD_TIMES, ADD_TIME, DELETE_TIME, DOWNLOAD_TIMES, timesCleaned, calculationFetched, timesLoaded} from '../actions/actions'

function * calculations (action) {
  const calc = yield call(CalculationHelper.fetchCalculation, action.form)

  yield put(calculationFetched(calc))
}

function * clearTimes () {
  yield call(StoreHelper.saveTimes, [])
  yield put(timesCleaned())
}

function * loadTimesFromStore () {
  const times = yield call(StoreHelper.loadTimes)
  yield put(timesLoaded(times))
}

function * addTime (action) {
  let times = yield call(StoreHelper.loadTimes)

  if (action.index !== undefined) { // update
    times[action.index] = action.time
  } else { // create
    times.push(action.time)
  }
  times = TimeHelper.sortTimes(times)

  yield call(StoreHelper.saveTimes, times)
  yield loadTimesFromStore()
}

function * deleteTime (action) {
  let times = yield call(StoreHelper.loadTimes)
  times = times.filter(t => JSON.stringify(t) !== JSON.stringify(action.time))

  yield call(StoreHelper.saveTimes, times)
  yield loadTimesFromStore()
}

function * downloadTimes () {
  let times = yield call(StoreHelper.loadTimes)

  yield TimeHelper.downloadTimes(times)
}

export default function * rootSaga () {
  yield takeLatest(CALCULATE, calculations)
  yield takeEvery(CLEAR_TIMES, clearTimes)
  yield takeLatest(LOAD_TIMES, loadTimesFromStore)
  yield takeEvery(ADD_TIME, addTime)
  yield takeEvery(DELETE_TIME, deleteTime)
  yield takeEvery(DOWNLOAD_TIMES, downloadTimes)
}
