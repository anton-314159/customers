import React from 'react';

import './Sidebar.scss';

import { withRouter } from "react-router-dom";

import SidebarNavigation  from './SidebarNavigation';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);


    let sidebarToggle = localStorage.getItem('sidebarToggle');
    let toggle = (sidebarToggle && (sidebarToggle === 'true'));

    this.state = {
      toggle: toggle
    };

    this.btnToggleClick = this.btnToggleClick.bind(this);
    this.btnCreactClick = this.btnCreactClick.bind(this);
  }

  btnCreactClick() {
    /*if (this.props.customerShowForm)
      this.props.customerShowForm();*/

    this.props.history.push('/new');
  }

  btnToggleClick() {
    const { toggle } = this.state;

    localStorage.setItem('sidebarToggle', !toggle);

    this.setState({
      toggle: !toggle
    });
  }

  render() {

    const { toggle } = this.state;

    let toggleClass = toggle ? 'toggle' : '';

    return (
      <div className={`sidebar ${toggleClass}`}>
        <div className="sidebar-toggle" onClick={this.btnToggleClick}></div>

        <div className="sidebar-logo"></div>

        <div className="sidebar-button" onClick={this.btnCreactClick}>
          <div className="sidebar-button-title">Create new</div>
          <div className="sidebar-button-expand"></div>
        </div>

        <SidebarNavigation />

      </div>
    )
  }
}
export default withRouter(Sidebar);
