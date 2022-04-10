import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as customerActions from "../actions/customers";
import CustomerList from "../../components/Customers/CustomerList";

const mapStateToProps = (state) => ({
    customers: state.customers.data,
    customerFormVisible: state.customers.customerFormVisible
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(customerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
