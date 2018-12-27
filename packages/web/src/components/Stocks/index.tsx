/** @format */

import * as React from 'react';

import { Loading } from '@components';
import RegisteredStock from './RegisteredStock';
import RegisterStock from './RegisterStock';

import { ALL_REGISTERED_STOCKS_QUERY, AllRegisteredStocksQuery } from '@graphql/queries/all-registered-stocks';

class Stocks extends React.Component {
  render() {
    return (
      <AllRegisteredStocksQuery query={ALL_REGISTERED_STOCKS_QUERY}>
        {({ loading, data }) => {
          return (
            <div className="container">
              <RegisterStock />
              {loading ? (
                <Loading />
              ) : (
                data!.allRegisteredStocks.map(stock => <RegisteredStock key={stock.ticker} {...stock} />)
              )}
            </div>
          );
        }}
      </AllRegisteredStocksQuery>
    );
  }
}

export default Stocks;
