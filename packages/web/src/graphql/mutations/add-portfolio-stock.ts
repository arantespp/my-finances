/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { PortfolioStockInput } from '../inputs';
import { PortfolioStock } from '../types';

export const ADD_PORTFOLIO_STOCK_MUTATION = gql`
  mutation addPortfolioStock($portfolioId: ID!, $portfolioStocksGroupId: ID!, $input: PortfolioStockInput!) {
    addPortfolioStock(portfolioId: $portfolioId, portfolioStocksGroupId: $portfolioStocksGroupId, input: $input) {
      id
      index
      ticker
      quantity
      value
      type
      date
    }
  }
`;

export interface AddPortfolioStockMutationResponse {
  addPortfolioStock: [PortfolioStock];
}

export interface AddPortfolioStockMutationVariables {
  portfolioId: string;
  portfolioStocksGroupId: string;
  input: PortfolioStockInput;
}

export class AddPortfolioStockMutation extends Mutation<
  AddPortfolioStockMutationResponse,
  AddPortfolioStockMutationVariables
> {}
