import React from 'react'
import {ErrorList, withFormValue} from 'react-forms'
import 'material-design-lite/src/textfield/textfield'
import autoBind from 'react-autobind'
import DatePicker from 'md-date-time-picker/dist/js/mdDateTimePicker'
import Moment from 'moment'
import Button from '../Button/Button'

import './TimeField.css'

class TimeField extends React.Component {
  static defaultProps = {
    mobile: false,
    timer: true
  };

  constructor (props) {
    super(props)

    autoBind(this)
  }

  componentDidMount () {
    if (this.props.mobile === false) {
      this.refs.field.addEventListener('onOk', this.onOk)

      const dialog = new DatePicker({
        type: 'time',
                // mode: true,
        trigger: document.getElementById(this.props.select)
      })
      dialog.toggle.bind(dialog)

      this.setState({dialog})
      this.refs.field.addEventListener('onOk', this.onOk)
    }
  }

  componentDidUpdate () {
        // default form value fix form react-forms
    if (this.props.formValue.value === undefined) {
      if (this.refs.field && this.refs.field.parentNode.MaterialTextfield) {
        this.refs.field.parentNode.MaterialTextfield.change(null)
        if (this.props.formValue.errorList.length > 0) {
          this.refs.field.parentNode.classList.add('is-invalid')
        }
      }
    }

    if (this.state.dialog) {
      // eslint-disable-next-line
      this.state.dialog.time = new Moment(this.props.formValue.value, 'HH:mm')
    }

    // always dirty b.c. of mdl issues with time/date inputs
    if (this.refs.field && this.refs.field.parentNode.MaterialTextfield) {
      this.refs.field.parentNode.classList.add('is-dirty')
    }
  }

  render () {
    const classes = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label ' + (this.props.formValue.errorList.length ? 'is-invalid' : '')

    return (
      <div className={classes}>
        {this.props.mobile === false
          ? <input className='mdl-textfield__input' type='time' onKeyUp={this.onClose} id={this.props.select}
            ref='field' value={this.props.formValue.value} onFocus={this.onToggle}
            onChange={this.onChange} placeholder='HH:mm' />
                    : <input className='mdl-textfield__input' type='field' id={this.props.select} ref='time' value={this.props.formValue.value} onChange={this.onChange} placeholder='HH:mm' />
                }
        <label className='mdl-textfield__label'>{this.props.label}</label>
        <ErrorList className='mdl-textfield__error' formValue={this.props.formValue} />
        {this.props.timer &&
        <Button invoke={this.onUpdate} context={this} icon='timer' classes='mdl-button--icon mdl-button--colored pull-right' />}
      </div>
    )
  }

  onClose = () => this.state.dialog.hide()
  onToggle = () => {
    // eslint-disable-next-line
    this.state.dialog.time = this.props.formValue.value ? new Moment(this.props.formValue.value, 'HH:mm') : new Moment()
    this.state.dialog.toggle()
  }

  onUpdate = () => this.props.formValue.update(new Moment().format('HH:mm'))
  onOk = () => this.props.formValue.update(this.state.dialog.time.format('HH:mm'))
  onChange = (e) => this.props.formValue.update(e.target.value)
}

export default withFormValue(TimeField)
