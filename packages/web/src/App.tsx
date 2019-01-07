/** @format */

import * as React from 'react';

import { withAuthenticator } from 'aws-amplify-react';

import asyncComponent from '@components/AsyncComponent';

import './App.scss';

const Layout = asyncComponent(() => import('@components/Layout').then(module => module.default));

class App extends React.Component {
  render() {
    return (
      <div className="App container">
        <Layout />
      </div>
    );
  }
}

export default withAuthenticator(App, false);
