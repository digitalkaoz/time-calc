import React from 'react'
import {Fieldset, createValue} from 'react-forms'
import TimeField from '../TimeField/TimeField';
import DisplayField from '../DisplayField/DisplayField';
import SaveButton from '../SaveButton/SaveButton';
import { connect } from 'react-redux'
import {fetchCalculation} from '../../logic/actions/actions';

import './Form.css';

const SCHEMA = {
    type: 'object',
    required: [
        'start',
        'end'
    ],
    properties: {
        start: {type: 'string', pattern: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/},
        end: {type: 'string', pattern: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/},
        break: {type: "string", pattern: /^$|(^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])$/}
    }
};

class Form extends React.Component {

    constructor(props) {
        super(props);

        let formValue = createValue({
            value: props.value,
            onChange: this.onChange.bind(this),
            schema: SCHEMA
        });

        this.state = {formValue}
    }

    onChange(formValue) {
        if (formValue._errorList.length === 0) {
            this.props.calculate(formValue);
        }
        this.setState({formValue})
    }

    render() {
        return (
            <Fieldset formValue={this.state.formValue} className="mdl-grid">
                <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--6-col-phone">
                    <TimeField select="start" label="Start Time"  />
                </div>
                <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--6-col-phone">
                    <TimeField select="break" label="Break" />
                </div>
                <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--6-col-phone">
                    <TimeField select="end" label="End Time"  />
                </div>
                <div className="mdl-cell mdl-cell--2-col mdl-cell--3-col-tablet mdl-cell--5-col-phone">
                    <DisplayField label="Duration" value={this.props.time && this.props.time.duration ? this.props.time.duration : ''} />
                </div>
                <div className="mdl-cell mdl-cell--1-col">
                <SaveButton />
                </div>
            </Fieldset>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        time: state.calculate.current
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        calculate: (formValue) => {
            return dispatch(fetchCalculation(formValue))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)
