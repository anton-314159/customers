import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as customerActions from "../actions/customers";
import CustomerForm from "../../components/Customers/CustomerForm";

const mapStateToProps = (state) => ({
    customerFormVisible: state.customers.customerFormVisible,
    customerFormData: state.customers.customerFormData,
    customerFormMetaData: state.customers.metaData
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(customerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
