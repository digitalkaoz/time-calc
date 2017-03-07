import React from 'react'
import {Fieldset, createValue} from 'react-forms'
import TimeField from '../TimeField/TimeField';
import DisplayField from '../DisplayField/DisplayField';
import { connect } from 'react-redux'
import {fetchCalculation, save, resetCalculation} from '../../logic/actions/actions';
import Button from './../Button/Button';
import Moment from 'moment';
import autoBind from 'react-autobind';

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

        autoBind(this);

        let formValue = createValue({
            value: props.value,
            onChange: this.onChange,
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

    componentWillReceiveProps(props) {
        if (props.value !== this.props.value) {
            let formValue = createValue({
                value: props.value,
                onChange: this.onChange,
                schema: SCHEMA
            });

            this.state = {formValue}
        }
    }

    onReset() {
        this.props.reset();
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
                <div className="mdl-cell mdl-cell--2-col mdl-cell--4-col-tablet mdl-cell--6-col-phone">
                    <DisplayField label="Duration" value={this.props.value.duration || ''} />
                </div>
                <div className="mdl-cell mdl-cell--1-col mdl-cell mdl-cell--5-col-tablet mdl-cell mdl-cell--6-col-phone">
                    {this.props.value.duration &&
                    <Button invoke={this.props.save} context={this} icon="add" classes="mdl-button--raised mdl-js-ripple-effect mdl-button--accent"/>
                    }
                </div>
            </Fieldset>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        value: state.calculate.current
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        calculate: (formValue) => {
            return dispatch(fetchCalculation(formValue))
        },
        reset: () => {
            return dispatch(resetCalculation())
        },
        save: (component) => {
            if (component.props.value) {
                let time = component.props.value;
                time.day = Moment().format();

                if (!time.break) {
                    time.break = '0:00';
                }

                dispatch(save(time));
                component.onReset();
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)
