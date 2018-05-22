import React from 'react'
import Moment from 'moment'

class AbstractDateTimeField extends React.Component {
  static moment (value, format) {
    if (value instanceof Moment) {
      return value.format(format)
    }

    if (value) {
      return new Moment(value, format)
    }

    return new Moment()
  }

  static now () {
    return AbstractDateTimeField.time(new Moment())
  }

  static today () {
    return AbstractDateTimeField.date(new Moment())
  }

  static time (value) {
    return AbstractDateTimeField.moment(value, 'HH:mm')
  }

  static date (value) {
    return AbstractDateTimeField.moment(value, 'L')
  }
}

export default AbstractDateTimeField
