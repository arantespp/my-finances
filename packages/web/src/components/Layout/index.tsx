/** @format */

import * as React from 'react';

import { Link, Route, Switch } from 'react-router-dom';

import { Footer, Header, Investments, Portfolio } from '@components';

class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        {this.Menu()}
        {this.Content()}
        <Footer />
      </div>
    );
  }

  private Content = () => {
    return (
      <Switch>
        <Route path="/investments" exact={true} component={Investments} />
        <Route path="/investments/portfolio" component={Portfolio} />
      </Switch>
    );
  };

  private Menu = () => {
    return (
      <div>
        <Link to="/investments">Investimentos</Link>
      </div>
    );
  };
}

export default Layout;
