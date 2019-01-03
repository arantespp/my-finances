/** @format */

import * as React from 'react';

import { withAuthenticator } from 'aws-amplify-react';

import Layout from '@components/Layout';

import './App.scss';

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
