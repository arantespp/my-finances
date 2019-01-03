/** @format */

import * as React from 'react';

import Loading from '@components/Loading';

import RegisteredStock from './RegisteredStock';
import RegisterStock from './RegisterStock';

import { ALL_REGISTERED_STOCKS_QUERY, AllRegisteredStocksQuery } from '@graphql/queries/all-registered-stocks';
import { StockMetadata } from '@graphql/types';

class Stocks extends React.Component {
  render() {
    return (
      <AllRegisteredStocksQuery query={ALL_REGISTERED_STOCKS_QUERY}>
        {({ loading, data }) => {
          return (
            <div className="">
              <RegisterStock />
              {loading ? (
                <Loading />
              ) : (
                data!.allRegisteredStocks
                  .sort(this.sortStocks)
                  .map(stock => <RegisteredStock key={stock.ticker} {...stock} />)
              )}
            </div>
          );
        }}
      </AllRegisteredStocksQuery>
    );
  }

  private sortStocks = (stockA: StockMetadata, stockB: StockMetadata): number => {
    return stockA.ticker < stockB.ticker ? -1 : 1;
  };
}

export default Stocks;
