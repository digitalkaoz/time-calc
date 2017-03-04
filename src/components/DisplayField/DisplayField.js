import React from 'react';

const DisplayField = ({value, label}) => {
    return (
        <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--6-col-phone">
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" value={ value } placeholder={label} />
            </div>
        </div>
    );
}

export default DisplayField;