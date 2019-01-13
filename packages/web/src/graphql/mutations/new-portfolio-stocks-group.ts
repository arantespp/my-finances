/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { PortfolioStocksGroupInput } from '../inputs';
import { Portfolio } from '../types';

export const NEW_PORTFOLIO_STOCKS_GROUP_MUTATION = gql`
  mutation newPortfolioStocksGroup($portfolioId: ID!, $input: PortfolioStocksGroupInput!) {
    newPortfolioStocksGroup(portfolioId: $portfolioId, input: $input) {
      id
      name
    }
  }
`;

export interface NewPortfolioStocksGroupMutationResponse {
  newPortfolioStocksGroup: Portfolio;
}

export interface NewPortfolioStocksGroupMutationVariables {
  portfolioId: string;
  input: PortfolioStocksGroupInput;
}

export class NewPortfolioStocksGroupMutation extends Mutation<
  NewPortfolioStocksGroupMutationResponse,
  NewPortfolioStocksGroupMutationVariables
> {}
