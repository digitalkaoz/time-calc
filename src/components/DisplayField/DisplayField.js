import React from 'react';

const DisplayField = ({value, label}) => {
    return (
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
            <input className="mdl-textfield__input" readOnly="true" type="time" value={ value } placeholder={label} />
            <label className="mdl-textfield__label">{label}</label>
        </div>
    );
}

export default DisplayField;
