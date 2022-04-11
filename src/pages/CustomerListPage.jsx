import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import CustomerList from '../redux/containers/CustomerList';
import DefaultTemplate from './templates/DefaultTemplate';

class CustomerListPage extends React.Component {

  componentDidMount() {
    this.processAction();
  }

  componentDidUpdate() {
    this.processAction();
  }

  processAction = () => {
    const { action = '', id = 0 } = this.props.match.params;
    const { customers, customerShowForm } = this.props;

    switch(action) {
      case 'new':
          customerShowForm();
        break;

      case 'edit':
        const customer = customers.filter(c => c.id === parseInt(id));    
        if (customer.length) {
          customerShowForm(customer[0]);
        }
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <DefaultTemplate>
        <CustomerList />
      </DefaultTemplate>
    )
  }
}

CustomerListPage.propTypes = {
  customers: PropTypes.array.isRequired,
  customerShowForm: PropTypes.func.isRequired
}

export default withRouter(CustomerListPage);