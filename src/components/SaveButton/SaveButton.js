import React from 'react'
import { connect } from 'react-redux'
import {save} from '../../logic/actions/actions';

import './SaveButton.css';

class SaveButton extends React.Component {

    onClick() {
        if (this.props.time) {
            let time = this.props.time;
            time.day = new Date().toDateString();

            this.props.save(time);
        }
    }

    render() {
        return (
            <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" onClick={this.onClick.bind(this)}>
                <i className="material-icons">add</i>
            </button>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        time: state.calculate.current
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        save: (time) => {
            return dispatch(save(time))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveButton)
