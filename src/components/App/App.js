import React from "react";
// eslint-disable-next-line
import componentHandler from 'material-design-lite/src/mdlComponentHandler';

import "./App.css";

import Form from "../Form/Form";

const App = () => {
    return (
        <div className="mdl-layout--fixed-header">
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Time - Calculator</span>
                </div>
            </header>
            <main className="mdl-layout__content">
                <Form />
            </main>
        </div>
    );
}

export default App;