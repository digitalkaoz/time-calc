import React from 'react'
import { connect } from 'react-redux'
import './Button.css';

class Button extends React.Component {

    onClick() {
        this.props.invoke(this.props.context);
    }

    render() {
        const classes = 'mdl-button mdl-js-button '+(this.props.classes || '');

        return (
            <button className={classes} onClick={this.onClick.bind(this)}>
                <i className="material-icons">{ this.props.icon}</i>
            </button>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        times: state.timelist.times
    }
}

export default connect(
    mapStateToProps,
)(Button)
