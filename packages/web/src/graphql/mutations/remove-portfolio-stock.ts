/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { PortfolioStock } from '../types';

export const REMOVE_PORTFOLIO_STOCK_MUTATION = gql`
  mutation removePortfolioStock($portfolioId: ID!, $index: Int!) {
    removePortfolioStock(portfolioId: $portfolioId, index: $index) {
      index
      ticker
      quantity
      value
      type
      date
    }
  }
`;

export interface RemovePortfolioStockMutationResponse {
  removePortfolioStock: PortfolioStock[];
}

export interface RemovePortfolioStockMutationVariables {
  portfolioId: string;
  index: number;
}

export class RemovePortfolioStockMutation extends Mutation<
  RemovePortfolioStockMutationResponse,
  RemovePortfolioStockMutationVariables
> {}
