/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const REGISTER_STOCK_MUTATION = gql`
  mutation registerStock($stockMetadata: StockMetadataInput!) {
    registerStock(stockMetadata: $stockMetadata) {
      AlphaVantageSymbol
      ticker
    }
  }
`;

export interface RegisterStockMutationResponse {
  registerStock: {
    AlphaVantageSymbol: string;
    ticker: string;
  };
}

export interface RegisterStockMutationVariables {
  stockMetadata: {
    AlphaVantageSymbol: string;
    ticker: string;
  };
}

export class RegisterStockMutation extends Mutation<RegisterStockMutationResponse, RegisterStockMutationVariables> {}
