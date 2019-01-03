/** @format */

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { StockMetadata } from '../types';

export const ALL_REGISTERED_STOCKS_QUERY = gql`
  query {
    allRegisteredStocks {
      ticker
      AlphaVantageSymbol
    }
  }
`;

export interface AllRegisteredStocksQueryResponse {
  allRegisteredStocks: StockMetadata[];
}

export interface AllRegisteredStocksQueryVariables {}

export class AllRegisteredStocksQuery extends Query<
  AllRegisteredStocksQueryResponse,
  AllRegisteredStocksQueryVariables
> {}
