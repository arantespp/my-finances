/** @format */

import * as React from 'react';

import { Auth } from 'aws-amplify';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

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
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement,
);
