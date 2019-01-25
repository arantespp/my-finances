/** @format */

import * as React from 'react';

import { withAuthenticator } from 'aws-amplify-react';

import asyncComponent from '@components/AsyncComponent';

import config from '@config';

import './App.scss';

const Layout = asyncComponent(() => import('@components/Layout').then(module => module.default));

const { google_client_id, facebook_app_id } = config;

const federated = { google_client_id, facebook_app_id };

class App extends React.Component {
  render() {
    return (
      <div className="App container">
        <Layout />
      </div>
    );
  }
}

export default withAuthenticator(App, true, [], federated, {});
