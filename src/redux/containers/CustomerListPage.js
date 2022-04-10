import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as customerActions from "../actions/customers";
import CustomerListPage from "../../pages/CustomerListPage";

const mapStateToProps = (state) => ({
    customers: state.customers.data
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(customerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListPage);
