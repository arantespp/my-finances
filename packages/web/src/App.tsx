/** @format */

import * as React from 'react';

import { withAuthenticator } from 'aws-amplify-react';

import { Layout, LongShort, Stocks } from '@components';

import './App.scss';

class App extends React.Component {
  public components = (): Array<{ path: string; name: string; component: React.ComponentClass }> => {
    return [
      {
        path: '/investments',
        name: 'Investimentos',
        component: LongShort,
      },
      {
        path: '/stocks',
        name: 'Ações',
        component: Stocks,
      },
    ];
  };

  public render() {
    return <Layout components={this.components()} />;
  }
}

export default withAuthenticator(App, true);
