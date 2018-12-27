/** @format */

import * as React from 'react';

import { MutationFn, MutationUpdaterFn } from 'react-apollo';

import {
  UNREGISTER_STOCK_MUTATION,
  UnregisterStockMutation,
  UnregisterStockMutationResponse,
  UnregisterStockMutationVariables,
} from '@graphql/mutations/unregister-stock';
import { ALL_REGISTERED_STOCKS_QUERY, AllRegisteredStocksQueryResponse } from '@graphql/queries/all-registered-stocks';

interface Props {
  ticker: string;
  AlphaVantageSymbol: string;
}

class RegisteredStock extends React.Component<Props> {
  render() {
    const { AlphaVantageSymbol, ticker } = this.props;
    return (
      <UnregisterStockMutation mutation={UNREGISTER_STOCK_MUTATION} update={this.update} variables={{ ticker }}>
        {(unregisterStock, { loading }) => {
          return (
            <div>
              <span>{ticker}</span>
              <br />
              <span>{AlphaVantageSymbol}</span>
              <br />
              <a className={`button is-danger ${loading && 'is-loading'}`} onClick={this.onClick(unregisterStock)}>
                Remover
              </a>
            </div>
          );
        }}
      </UnregisterStockMutation>
    );
  }

  private onClick = (
    unregisterStock: MutationFn<UnregisterStockMutationResponse, UnregisterStockMutationVariables>,
  ) => async () => {
    await unregisterStock();
  };

  private update: MutationUpdaterFn<UnregisterStockMutationResponse> = (cache, { data }) => {
    const { unregisterStock } = data as UnregisterStockMutationResponse;
    const { allRegisteredStocks } = cache.readQuery({
      query: ALL_REGISTERED_STOCKS_QUERY,
    }) as AllRegisteredStocksQueryResponse;
    const newData: AllRegisteredStocksQueryResponse = {
      allRegisteredStocks: [...allRegisteredStocks.filter(stock => stock.ticker !== unregisterStock)],
    };
    cache.writeQuery({
      query: ALL_REGISTERED_STOCKS_QUERY,
      data: newData,
    });
  };
}

export default RegisteredStock;
