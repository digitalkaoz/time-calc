import React from "react";
// eslint-disable-next-line
import componentHandler from 'material-design-lite/src/mdlComponentHandler';
import { connect } from 'react-redux'

import "./App.css";

import Form from "../Form/Form";

const App = ({time}) => {
    return (
        <div>
            <header className="mdl-layout__header mdl-layout__header--scroll mdl-layout--fixed-header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Time - Calculator</span>
                    <div className="mdl-layout-spacer"></div>
                    <span className="mdl-layout-title">{ time && time.duration ? time.duration : '-' }</span>
                </div>
            </header>
            <main className="mdl-layout__content">
                <Form />
            </main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        time: state.calculateTime.times.response
    }
}

export default connect(mapStateToProps)(App)
