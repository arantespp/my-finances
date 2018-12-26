/** @format */

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const ALL_REGISTERED_STOCKS_QUERY = gql`
  query {
    allRegisteredStocks {
      ticker
      AlphaVantageSymbol
    }
  }
`;

export interface AllRegisteredStocksQueryResponse {
  allRegisteredStocks: Array<{
    AlphaVantageSymbol: string;
    ticker: string;
  }>;
}

export interface AllRegisteredStocksQueryVariables {}

export class AllRegisteredStocksQuery extends Query<
  AllRegisteredStocksQueryResponse,
  AllRegisteredStocksQueryVariables
> {}
