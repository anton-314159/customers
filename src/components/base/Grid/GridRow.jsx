import React from 'react';
import './Grid.scss';

class GridRow extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { item, type, checked } = this.props;

    if (this.props.onChecked)
      this.props.onChecked(type, !checked, item);
  }

  render() {

    const { type, className, item, itemProps, checked } = this.props;
    const cssActiveClass = checked ? 'grid-item-active' : '';

    return (
        <div className={`grid-item ${className ? className : ''}  ${cssActiveClass}`} onClick={this.onClick}>
          <div className="grid-item-checkbox">
            <input type="checkbox" 
              onChange={this.onClick}
              onClick={(e) => e.stopPropagation()}
              checked={checked} />
          </div> 

          {
            itemProps.map((itemProp, index) => 
              <div key={index} className={`grid-item-${itemProp.propertyName}`}>
                { (type === "header") ? itemProp.headerName : item[itemProp.propertyName]}
              </div>  
            )
          }

        </div>
    )
  }
}
export default GridRow;
