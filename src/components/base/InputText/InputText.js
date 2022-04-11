import React from 'react';
import PropTypes from 'prop-types';

import './InputText.scss';

const InputText = ({ value, onChange, className }) => {
    
    return (
        <>
            <input value={value} onChange={onChange} className={`input-text ${className}`} />
        </>
    )
}

InputText.propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func
}

export default InputText;