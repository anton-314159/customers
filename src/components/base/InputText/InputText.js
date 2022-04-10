import React from 'react';

import './InputText.scss';

const InputText = ({ value, onChange, className }) => {
    
    return (
        <>
            <input value={value} onChange={onChange} className={`input-text ${className}`} />
        </>
    )
}

export default InputText;