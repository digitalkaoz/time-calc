import store from 'store/dist/store.modern'
import Moment from 'moment'
import 'moment-duration-format'
import fetch from 'isomorphic-fetch'
import json2csv from 'json2csv'

export class CalculationHelper {
  static fetchCalculation (form) {
    if (navigator.onLine) {
      return CalculationHelper.calculateRemote(form)
    }

    // eslint-disable-next-line no-undef
    return new Promise((resolve) => {
      resolve(CalculationHelper.calculateLocal(form))
    })
  }

  static calculateRemote (form) {
    let timeSet = {}

    Object.keys(form.value).forEach((k) => {
      if (Object.keys(form.schema.properties).includes(k) && form.value[k] !== '') {
        timeSet[k] = form.value[k]
      }
    })

    const query = Object.keys(timeSet).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(timeSet[k])}`).join('&')

    return fetch((process.env.REACT_APP_SERVER || '/') + 'calculate?' + query)
            .then(response => response.json())
            .catch(() => {
              return CalculationHelper.calculateLocal(form)
            })
  }

  static calculateLocal (form) {
    const breakDuration = Moment.duration(form.value.break)
    const startDate = new Moment(form.value.start, 'HH:mm')
    const endDate = new Moment(form.value.end, 'HH:mm')
    const milliseconds = endDate.subtract(breakDuration).diff(startDate)
    const duration = Moment.duration(milliseconds / 1000, 'seconds').format('HH:mm', {trim: false})

    return {
      start: form.value.start,
      end: form.value.end,
      break: form.value.break,
      duration: duration,
      date: form.value.date
    }
  }
}

export class TimeHelper {
  static sortTimes (times) {
    return times.sort((a, b) => {
      a = Moment(a.date, 'L')
      b = Moment(b.date, 'L')

      if (a.isBefore(b)) {
        return -1
      }

      if (a.isAfter(b)) {
        return 1
      }
      return 0
    })
  }

  static downloadTimes (times) {
    if (!times) {
      return
    }

    const headers = Object.getOwnPropertyNames(times[0])
    const csv = json2csv({ data: times, fields: headers })
    const csvContent = 'data:text/csv;charset=utf-8;base64,' + btoa(csv)

    window.open(csvContent)
  }
}

export class StoreHelper {
  static loadTimes () {
    return store.get('times') || []
  }

  static saveTimes (times) {
    store.set('times', times)
  }
}
