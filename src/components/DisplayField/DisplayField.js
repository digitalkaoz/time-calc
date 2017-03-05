import React from 'react';

const DisplayField = ({value, label}) => {
    return (
        <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" value={ value } placeholder={label} />
        </div>
    );
}

export default DisplayField;
