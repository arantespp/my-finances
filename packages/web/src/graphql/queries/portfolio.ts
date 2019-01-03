/** @format */

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Portfolio } from '../types';

export const PORTFOLIO_QUERY = gql`
  query portfolio($portfolioId: ID!) {
    portfolio(id: $portfolioId) {
      id
      name
    }
  }
`;

export const PORTFOLIO_STOCKS_QUERY = gql`
  query portfolio($portfolioId: ID!) {
    portfolio(id: $portfolioId) {
      id
      stocks {
        id
        index
        ticker
        value
        quantity
        date
        type
      }
    }
  }
`;

export interface PortfolioQueryResponse {
  portfolio: Portfolio;
}

export interface PortfolioQueryVariables {
  portfolioId: string;
}

export class PortfolioQuery extends Query<PortfolioQueryResponse, PortfolioQueryVariables> {}
