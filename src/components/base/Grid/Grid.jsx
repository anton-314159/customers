import React from 'react';
import PropTypes from 'prop-types';

import './Grid.scss';

import GridRow from './GridRow';

class Grid extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      headerChecked: false,
      selectedItems: []
    };

    this.onItemChecked = this.onItemChecked.bind(this);
  }

  onItemChecked(type, checked, item) {

    const { onItemsChecked } = this.props;

    if (type === 'header') {

      this.setState({
        headerChecked: checked,
        selectedItems: checked ? [...this.props.items] : []
      }, () => {
        if (onItemsChecked) {
          onItemsChecked(this.state.selectedItems);
        }
      });  

    } else {

      let selectedItems = [...this.state.selectedItems];

      let i = selectedItems.indexOf(item);
      if ((i !== -1) && !checked) {
        selectedItems.splice(i, 1);
      } else if ((i === -1) && checked) {
        selectedItems.push(item);
      }
  
      this.setState({
        selectedItems: selectedItems
      }, () => {
        if (onItemsChecked) {
          onItemsChecked(this.state.selectedItems);
        }
      });      
    }
  }

  static getDerivedStateFromProps(props, state) {
    if ((props.items.length === 0) && state.headerChecked) {
      return {
        headerChecked: false
      };
    }

    return null;
  } 

  render() {

    const { headerChecked, selectedItems } = this.state;
    const { items, itemProps } = this.props;

    return (
      <div className="grid">
        <GridRow 
          type="header"
          className="grid-item-header" 
          itemProps={itemProps}
          checked={headerChecked}
          onChecked={this.onItemChecked} />
      
        {
          items.map((item, key) => {
            let itemKey = item.name.toLowerCase().replace(/\s+/, '') + '_' + key;

            let itemChecked = (selectedItems.indexOf(item) !== -1);

            return (
              <GridRow key={itemKey} 
                onChecked={this.onItemChecked} 
                checked={itemChecked}
                item={item}
                itemProps={itemProps} />
            )
          })
        }
      </div>
    )
  }
}

Grid.propTypes = {
  items: PropTypes.array.isRequired,
  itemProps: PropTypes.array.isRequired,
  onItemsChecked: PropTypes.func
}


export default Grid;
