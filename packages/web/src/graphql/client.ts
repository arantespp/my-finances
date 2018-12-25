/** @format */

import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { Auth } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE, createAppSyncLink, createLinkWithCache } from 'aws-appsync';

import config from '@config';

const { aws_appsync_graphqlEndpoint, aws_appsync_region } = config;

const stateLink = createLinkWithCache(stateLinkCache =>
  withClientState({
    cache: stateLinkCache,
    defaults: {},
    resolvers: {},
  }),
);

const auth = {
  credentials: () => Auth.currentCredentials(),
  type: AUTH_TYPE.AWS_IAM,
};

const appSyncLink = createAppSyncLink({
  auth,
  complexObjectsCredentials: () => Auth.currentCredentials() as any,
  // cacheOptions,
  region: aws_appsync_region,
  url: aws_appsync_graphqlEndpoint,
});

const link = ApolloLink.from([stateLink, appSyncLink]);

const client = new AWSAppSyncClient(
  {
    auth,
    // complexObjectsCredentials: () => Auth.currentCredentials(),
    cacheOptions: {
      dataIdFromObject: (value: any): string | null => {
        switch (value.__typename) {
          case 'Device':
            return value.deviceId;
          default:
            return defaultDataIdFromObject(value);
        }
      },
    },
    disableOffline: true,
    region: aws_appsync_region,
    url: aws_appsync_graphqlEndpoint,
  },
  {
    connectToDevTools: process.env.REACT_APP_STAGE === 'production' ? false : true,
    link,
  },
);

export default client;
