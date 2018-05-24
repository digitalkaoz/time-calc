import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {
  fetchCalculation,
  save,
  resetCalculation
} from '../../logic/actions/actions'

import TimeField from '../TimeField/TimeField'
import DateField from '../DateField/DateField'
import Button from '../Button/Button'
import { TimeHelper } from '../../logic/helpers'

const validate = (values, props) => {
  const errors = {}

  if (!values.start || !values.end) {
    errors.duration = 'No Start and End Time set'
  }

  if (!Object.keys(errors).length) {
    props.calculate(values)
  }

  return errors
}

const Form = props => (
  <form onSubmit={props.handleSubmit(props.save)}>
    <Grid container>
      <Grid item xs={12} sm={6} md={2}>
        <Field name='start' label='Start Time' component={TimeField} />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Field name='end' label='End Time' component={TimeField} />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Field
          name='break'
          label='Break Time'
          defaultValue={'00:00'}
          component={TimeField}
          showPicker={false}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Field name='date' label='Day' component={DateField} />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Field
          name='duration'
          label='Duration'
          component={TimeField}
          showPicker={false}
          disabled
          defaultValue='00:00'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        {props.valid && <Button
          invoke={() => null}
          context={props}
          type='submit'
          icon={props.edit ? 'save' : 'add'}
        />}
        {props.edit && <Button
          invoke={() => null}
          context={props}
          type='reset'
          icon={'cancel'}
        />}
      </Grid>
    </Grid>
    <Field
      name='index'
      component={({input}) => <input type='hidden' {...input} />}
    />
  </form>
)

const mapStateToProps = state => {
  return {
    initialValues: {break: '00:00', date: TimeHelper.today()},
    edit: !!(state.form.time && state.form.time.values ? state.form.time.values.index : undefined)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    calculate: formValue => dispatch(fetchCalculation(formValue)),

    save: (values, dispatch) => {
      dispatch(save(values, values.index))
      dispatch(resetCalculation())
    }
  }
}

Form.propTypes = {
  edit: PropTypes.bool,
  valid: PropTypes.bool,
  save: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'time', validate })(Form)
)
