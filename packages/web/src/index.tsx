/** @format */

import * as React from 'react';

import { Auth } from 'aws-amplify';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from '@components/ErrorBoundary';
import client from '@graphql/client';
import App from './App';

import config from '@config';

import './index.scss';

const { region, userPoolId, identityPoolId, userPoolWebClientId } = config;

Auth.configure({
  identityPoolId,
  identityPoolRegion: region,
  region,
  userPoolId,
  userPoolWebClientId,
});

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Rehydrated>
          <App />
        </Rehydrated>
      </ApolloProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root') as HTMLElement,
);
