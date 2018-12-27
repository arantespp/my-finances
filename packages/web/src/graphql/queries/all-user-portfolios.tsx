/** @format */

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Portfolio } from '../types';

export const ALL_USER_PORTFOLIOS_QUERY = gql`
  query allUserPortfolios($userId: ID!) {
    allUserPortfolios(userId: $userId) {
      id
      name
    }
  }
`;

export interface AllUserPortfoliosQueryResponse {
  allUserPortfolios: Portfolio[];
}

export interface AllUserPortfoliosQueryVariables {
  userId: string;
}

export class AllUserPortfoliosQuery extends Query<AllUserPortfoliosQueryResponse, AllUserPortfoliosQueryVariables> {}
