import React from 'react'
import { connect } from 'react-redux'
import './Button.css';
import autoBind from 'react-autobind';

class Button extends React.Component {
    constructor(props){
        super(props);

        autoBind(this);
    }

    onClick() {
        this.props.invoke(this.props.context);
    }

    render() {
        const classes = 'mdl-button mdl-js-button '+(this.props.classes || '');

        return (
            <button className={classes} onClick={this.onClick }>
                <i className="material-icons">{ this.props.icon }</i>
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
