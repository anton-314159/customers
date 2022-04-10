import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as customerActions from "../actions/customers";
import Sidebar from "../../components/Sidebar/Sidebar";

const mapStateToProps = (state) => ({
  customerFormVisible: state.customers.customerFormVisible
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(customerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
