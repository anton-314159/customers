import React from 'react';

import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

import CustomerListPage from './redux/containers/CustomerListPage';
import NotFoundPage from './pages/NotFoundPage';

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

class App extends React.Component {

  render() {

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={CustomerListPage} />
          <Route exact path={`/:action(new)`} component={CustomerListPage} />
          <Route exact path={`/:action(edit)/:id([0-9]+)`} component={CustomerListPage} />                    
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    )
  }
}

export default App;
