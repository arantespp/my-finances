/** @format */

import * as React from 'react';

import { withAuthenticator } from 'aws-amplify-react';

import { Investments, Layout, Stocks } from '@components';

import './App.scss';

class App extends React.Component {
  components = (): Array<{ path: string; name: string; component: React.ComponentClass }> => {
    return [
      {
        path: '/investments',
        name: 'Investimentos',
        component: Investments,
      },
      {
        path: '/stocks',
        name: 'Ações',
        component: Stocks,
      },
    ];
  };

  render() {
    return <Layout components={this.components()} />;
  }
}

export default withAuthenticator(App, true);
