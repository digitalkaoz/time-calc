import React from 'react'

const DisplayField = ({value, label}) => {
  return (
    <div className='mdl-textfield mdl-textfield--floating-label is-dirty'>
      <input className='mdl-textfield__input' readOnly='true' type='text' value={value} />
      <label className='mdl-textfield__label'>{label}</label>
    </div>
  )
}

export default DisplayField
