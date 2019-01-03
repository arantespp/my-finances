/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { StockMetadata } from '../types';

export const REGISTER_STOCK_MUTATION = gql`
  mutation registerStock($stockMetadata: StockMetadataInput!) {
    registerStock(stockMetadata: $stockMetadata) {
      AlphaVantageSymbol
      ticker
    }
  }
`;

export interface RegisterStockMutationResponse {
  registerStock: StockMetadata;
}

export interface RegisterStockMutationVariables {
  stockMetadata: {
    AlphaVantageSymbol: string;
    ticker: string;
  };
}

export class RegisterStockMutation extends Mutation<RegisterStockMutationResponse, RegisterStockMutationVariables> {}
