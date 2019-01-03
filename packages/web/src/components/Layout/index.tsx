/** @format */

import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import Stocks from '@components/Admin/Stocks';
import Investments from '@components/Investments';
import Portfolio from '@components/Portfolio';

import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';

interface State {
  hiddenMenu: boolean;
}

class Layout extends React.Component<{}, State> {
  state = {
    hiddenMenu: false,
  };
  render() {
    return (
      <div className="Layout">
        <div className="columns container">
          <div className="column is-one-fifth is-hidden-mobile">
            <Menu />
          </div>
          <div className="column">
            <div>
              <Header />
              <div className="content">
                <Switch>
                  <Route path="/investments" exact={true} component={Investments} />
                  <Route path="/investments/portfolio" component={Portfolio} />
                  <Route path="/admin/stocks" component={Stocks} />
                </Switch>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
