/** @format */

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { StockPrice } from '../types';

export const MOST_RECENT_STOCK_PRICE_QUERY = gql`
  query mostRecentStockPrice($ticker: ID!) {
    mostRecentStockPrice(ticker: $ticker) {
      ticker
      price
    }
  }
`;

export interface MostRecentStockPriceQueryResponse {
  mostRecentStockPrice: StockPrice;
}

export interface MostRecentStockPriceQueryVariables {
  ticker: string;
}

export class MostRecentStockPriceQuery extends Query<
  MostRecentStockPriceQueryResponse,
  MostRecentStockPriceQueryVariables
> {}
