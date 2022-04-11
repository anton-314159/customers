import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './CustomerList.scss';
import '../../scss/buttons.scss';

import Grid from '../base/Grid/Grid';
import CustomerForm  from '../../redux/containers/CustomerForm';

class CustomerList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      selectedItems: []
    };

    this.gridItemProps = [{
      headerName: 'Customer',
      propertyName: 'name'
    },{
      headerName: 'Class',
      propertyName: 'class'
    },{
      headerName: 'Approver',
      propertyName: 'approver'
    },{
      headerName: 'Team',
      propertyName: 'team'
    }];    

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onItemsChecked = this.onItemsChecked.bind(this);

    this.onCreatClick = this.onCreatClick.bind(this);
    this.onSyncClick = this.onSyncClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);

    this.onFormClose = this.onFormClose.bind(this);    
  }

  componentDidMount() {
    this.onSyncClick();
  }

  onSyncClick() {
    const { customerFormVisible, customerHideForm, customerLoadData } = this.props;

    if (customerFormVisible) {
      customerHideForm();
    }

    customerLoadData(); 
  }

  onSearchChange(e) {
    this.setState({
      searchQuery: e.target.value.trim()
    });
  }

  onCreatClick() {
    // this.props.customerShowForm();
      this.props.history.push(`/new`);
  }

  onItemsChecked(items) {
    this.setState({
      selectedItems: items
    });
  }

  onEditClick() {
    const { selectedItems } = this.state;

    if (selectedItems.length === 1) {
        // this.props.customerShowForm(selectedItems[0]);

        this.props.history.push(`/edit/${selectedItems[0].id}`);
      }
  }

  onDeleteClick() {
    const { selectedItems } = this.state;

    if (selectedItems.length) {
        this.props.customerDeleteItems(selectedItems);

        this.setState({
          selectedItems: []
        });        
    }
  }

  onFormClose() {
    this.props.history.push('/');
  }

  render() {
    const { searchQuery, selectedItems } = this.state;
    const { customers, customerFormVisible } = this.props;   

    let filteredCustomers = customers;
    if (searchQuery.length) {
      filteredCustomers = filteredCustomers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    let disabledCtrl = customerFormVisible;
    let btnEditActiveClass = (selectedItems.length === 1 && !disabledCtrl) ? "btn-active" : "btn-disabled";
    let btnDeleteActiveClass = (selectedItems.length && !disabledCtrl) ? "btn-active" : "btn-disabled";

    let disabled = customerFormVisible;

    return (
        <div className="content-customer">

          <div className="content-actions">
            <div className="content-actions-title">Customer List</div>
            <div className="content-actions-search">
              <input type="text" 
                placeholder="Customer: Project name" 
                onChange={this.onSearchChange}
                disabled={disabled} />
            </div>
            <div className="content-actions-left">
              <button className={`btn ${btnEditActiveClass}`} onClick={this.onEditClick} disabled={disabledCtrl}>Edit</button>
              <button className={`btn ${btnDeleteActiveClass}`} onClick={this.onDeleteClick} disabled={disabledCtrl}>Delete</button>              
            </div>
            <div className="content-actions-right">
              <button className="btn btn-sync" onClick={this.onSyncClick} disabled={disabledCtrl}>Re-Sync</button>
              <button className="btn btn-green btn-plus" onClick={this.onCreatClick} disabled={disabledCtrl}>Add</button>
            </div>
          </div>
          <div className="content-grid">

            <CustomerForm onClose={this.onFormClose} /> 
            
            <Grid 
              items={filteredCustomers} 
              itemProps={this.gridItemProps}
              onItemsChecked={this.onItemsChecked} />

          </div>
        </div>
    )
  }
}

CustomerList.propTypes = {
  customers: PropTypes.array.isRequired,
  customerFormVisible: PropTypes.bool.isRequired,
  customerHideForm: PropTypes.func.isRequired,
  customerLoadData: PropTypes.func.isRequired,
  customerDeleteItems: PropTypes.func.isRequired
}


export default withRouter(CustomerList);
