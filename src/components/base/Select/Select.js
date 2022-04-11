import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Select.scss';

const Select = ({ name, items, selectedItem, onChange }) => {
    
    const [ currentItem, setCurrentItem ] = useState(selectedItem);
    const [ expanded, setExpanded ] = useState(false);

    useEffect(() => {
        setCurrentItem(selectedItem);
    }, [selectedItem]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleBlur = () => {
        setExpanded(false);
    }

    const handleItemClick = (event, item) => {
        if (currentItem !== item) {
            setCurrentItem(item);

            if (onChange)
                onChange(name, item);            
        }
    }

    let expandedClass = expanded ? "expanded" : "";

    return (
        <div className={`select ${expandedClass}`} onClick={handleExpandClick} onBlur={handleBlur} tabIndex="-1">
            <div className="select-title">{currentItem.length ? currentItem : "-"}</div>

            <div className="select-options">
                {items.map((item, key) => {
                    return <div key={key} className="select-option" onClick={(e) => handleItemClick(e, item)}>{item}</div>
                })}
            </div>

        </div>
    )
}


Select.propTypes = {
    name: PropTypes.string,
    selectedItem: PropTypes.string,
    items: PropTypes.array,
    onChange: PropTypes.func
}

  
export default Select;