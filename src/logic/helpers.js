import store from 'store/dist/store.modern'
import Moment from 'moment'
import fetch from 'isomorphic-fetch'

export class CalculationHelper {
  static fetchCalculation (form) {
    if (navigator.onLine) {
      return CalculationHelper.calculateRemote(form)
    }

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
            .catch((e) => CalculationHelper.calculateLocal(form))
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
    times = times.sort((a, b) => {
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
    return times
  }

  static downloadTimes (times) {
    let lines = []

    times.forEach(function (line, index) {
      let lineData = []
      let headers = []
      for (let key in line) {
        if (line.hasOwnProperty(key)) {
          lineData.push(line[key])
        }
        if (index === 0 && line.hasOwnProperty(key)) {
          headers.push(key)
        }
      }

      if (index === 0) {
        lines.push('data:text/csv;charset=utf-8,' + headers.join(','))
      }
      lines.push(lineData.join(','))
    })
    const csvContent = lines.join('\n')
    window.open(encodeURI(csvContent))
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
