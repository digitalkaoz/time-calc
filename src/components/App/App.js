import React from "react";
// eslint-disable-next-line
import componentHandler from 'material-design-lite/src/mdlComponentHandler';

import "./App.css";

import Form from "../Form/Form";
import TimeList from "../TimeList/TimeList";


const App = () => {
    return (
        <div className="mdl-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header mdl-layout--no-drawer-button">
                <div className="mdl-layout__header-row">
                    <div className="mdl-layout-spacer"></div>
                    <div className="mdl-layout-title">Time - Calculator</div>
                    <div className="mdl-layout-spacer"></div>
                </div>
            </header>
            <main className="mdl-layout__content">
                <Form />
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                        <TimeList />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
