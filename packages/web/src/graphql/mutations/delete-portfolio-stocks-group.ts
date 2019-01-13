/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { PortfolioStocksGroup } from '../types';

export const DELETE_PORTFOLIO_STOCKS_GROUP = gql`
  mutation deletePortfolioStocksGroup($portfolioId: ID!, $portfolioStocksGroupId: ID!) {
    deletePortfolioStocksGroup(portfolioId: $portfolioId, portfolioStocksGroupId: $portfolioStocksGroupId) {
      id
    }
  }
`;

export interface DeletePortfolioStocksGroupMutationResponse {
  deletePortfolioStocksGroup: PortfolioStocksGroup;
}

export interface DeletePortfolioStocksGroupMutationVariables {
  portfolioId: string;
  portfolioStocksGroupId: string;
}

export class DeletePortfolioStocksGroupMutation extends Mutation<
  DeletePortfolioStocksGroupMutationResponse,
  DeletePortfolioStocksGroupMutationVariables
> {}
