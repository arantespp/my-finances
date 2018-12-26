/** @format */

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const UNREGISTER_STOCK_MUTATION = gql`
  mutation unregisterStock($ticker: String!) {
    unregisterStock(ticker: $ticker)
  }
`;

export interface UnregisterStockMutationResponse {
  unregisterStock: string;
}

export interface UnregisterStockMutationVariables {
  ticker: string;
}

export class UnregisterStockMutation extends Mutation<
  UnregisterStockMutationResponse,
  UnregisterStockMutationVariables
> {}
