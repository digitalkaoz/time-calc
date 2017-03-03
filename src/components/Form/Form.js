import React from 'react'
import {Fieldset, createValue} from 'react-forms'
import TimeField from '../TimeField/TimeField';
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
        break: {type: 'string', pattern: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/}
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
            this.props.onChange(formValue);
        }
        this.setState({formValue})
    }

    render() {
        return (
        <Fieldset formValue={this.state.formValue} className="mdl-grid">
            <TimeField select="start" label="Start Time"  />
            <TimeField select="break" label="Break" />
            <TimeField select="end" label="End Time"  />
        </Fieldset>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (formValue) => {
            return dispatch(fetchCalculation(formValue))
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Form)