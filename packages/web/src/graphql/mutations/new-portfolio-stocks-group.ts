/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { PortfolioStocksGroupInput } from '../inputs';
import { Portfolio } from '../types';

export const NEW_PORTFOLIO_STOCKS_GROUP_MUTATION = gql`
  mutation newPortfolioStocksGroup($userId: ID!, $input: PortfolioStocksGroupInput!) {
    newPortfolioStocksGroup(portfolioId: $portfolioId, input: $input) {
      id
      name
    }
  }
`;

export interface NewPortfolioStocksGroupMutationResponse {
  newPortfolio: Portfolio;
}

export interface NewPortfolioStocksGroupMutationVariables extends PortfolioStocksGroupInput {}

export class NewPortfolioMutation extends Mutation<
  NewPortfolioStocksGroupMutationResponse,
  NewPortfolioStocksGroupMutationVariables
> {}
