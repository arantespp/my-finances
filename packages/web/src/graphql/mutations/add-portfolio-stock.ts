/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { PortfolioStockType } from '../enums';
import { PortfolioStock } from '../types';

export const ADD_PORTFOLIO_STOCK_MUTATION = gql`
  mutation addPortfolioStock($portfolioId: ID!, $data: PortfolioStockInput!) {
    addPortfolioStock(portfolioId: $portfolioId, data: $data) {
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
  data: {
    ticker: string;
    date: string;
    type: PortfolioStockType;
    value: number;
    quantity: number;
  };
}

export class AddPortfolioStockMutation extends Mutation<
  AddPortfolioStockMutationResponse,
  AddPortfolioStockMutationVariables
> {}
