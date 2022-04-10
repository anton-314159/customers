import React from 'react';
import axios from 'axios';
import { withRouter, Link } from "react-router-dom";

import './SidebarNavigation.scss';

class SidebarNavigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    let self = this;

    axios.get("/customers/data/sidebar.json").then(function(response) {
      self.setState({
        items: response.data
      });
    });   
  }

  render() {

    const { items } = this.state;

    if (items.length === 0)
      return null;

    return (
      <div className="sidebar-nav">
      {
        items.map((category, i) => {
          return (
            <div className="sidebar-nav-cat" key={i}>
              <div className="sidebar-nav-cat-title">{category.title}</div>
              {
                category.items.map((item, j) => {
                  return (
                    <Link key={j} to={item.url} className="sidebar-nav-item">
                       <div className="sidebar-nav-item-ico">
                          <img src={item.ico} alt={item.title} />
                       </div>
                      <div className="sidebar-nav-item-title">{item.title}</div>             
                    </Link>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
    )
  }
}
export default withRouter(SidebarNavigation);
