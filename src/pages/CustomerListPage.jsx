import React from 'react';

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
          if (customerShowForm) 
            customerShowForm();
        break;

      case 'edit':
        const customer = customers.filter(c => c.id === parseInt(id));    
        if (customer.length && customerShowForm) {
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

export default withRouter(CustomerListPage);