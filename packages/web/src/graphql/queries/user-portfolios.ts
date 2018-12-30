/** @format */

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { User } from '../types';

export const USER_PORTFOLIOS_QUERY = gql`
  query userPortfolios($userId: ID!) {
    user(id: $userId) {
      id
      portfolios {
        id
        name
      }
    }
  }
`;

export interface UserPortfoliosQueryResponse {
  user: User;
}

export interface UserPortfoliosQueryVariables {
  userId: string;
}

export class UserPortfoliosQuery extends Query<UserPortfoliosQueryResponse, UserPortfoliosQueryVariables> {}
