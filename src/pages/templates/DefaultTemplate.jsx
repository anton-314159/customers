import React from 'react';

import './DefaultTemplate.scss';

import Sidebar from '../../redux/containers/Sidebar';

class DefaultTemplate extends React.Component {
    render() {
        return (
          <div className="app">
        
            <Sidebar />
    
            <div className="content">
              <div className="content-header">
                <div className="content-header-profile"></div>
                <div className="content-header-time">2:40:00</div>
              </div>

              {this.props.children} 

            </div>        
          </div>            
        )
    }
}

export default DefaultTemplate;