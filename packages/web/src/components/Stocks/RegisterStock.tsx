/** @format */

import * as React from 'react';

import { MutationFn, MutationUpdaterFn } from 'react-apollo';

import {
  REGISTER_STOCK_MUTATION,
  RegisterStockMutation,
  RegisterStockMutationResponse,
  RegisterStockMutationVariables,
} from '@graphql/mutations/register-stock';
import { ALL_REGISTERED_STOCKS_QUERY, AllRegisteredStocksQueryResponse } from '@graphql/queries/all-registered-stocks';

interface State {
  AlphaVantageSymbol: string;
  ticker: string;
}

class RegisterStock extends React.Component<{}, State> {
  public state = {
    AlphaVantageSymbol: '',
    ticker: '',
  };

  public render() {
    return (
      <RegisterStockMutation mutation={REGISTER_STOCK_MUTATION} update={this.update}>
        {registerStock => {
          return (
            <form onSubmit={this.submitForm(registerStock)}>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Add Stock</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        className="input"
                        type="text"
                        placeholder="Ticker"
                        value={this.state.ticker}
                        onChange={this.tickerOnChange}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" />
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        className="input"
                        type="text"
                        placeholder="Alpha Vantage Symbol"
                        value={this.state.AlphaVantageSymbol}
                        onChange={this.symbolOnChange}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" />
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button className="button is-primary" type="submit">
                        Add Stock
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </RegisterStockMutation>
    );
  }

  private submitForm = (
    registerStock: MutationFn<RegisterStockMutationResponse, RegisterStockMutationVariables>,
  ) => async (event: any) => {
    try {
      event.preventDefault();
      const { ticker, AlphaVantageSymbol } = this.state;
      await registerStock({ variables: { stockMetadata: { ticker, AlphaVantageSymbol } } });
      this.setState({ ticker: '', AlphaVantageSymbol: '' });
      console.log(this.state);
    } catch (e) {
      throw e;
    }
  };

  private update: MutationUpdaterFn<RegisterStockMutationResponse> = (cache, { data }) => {
    const { registerStock } = data as RegisterStockMutationResponse;
    const { allRegisteredStocks } = cache.readQuery({
      query: ALL_REGISTERED_STOCKS_QUERY,
    }) as AllRegisteredStocksQueryResponse;
    cache.writeQuery({
      query: ALL_REGISTERED_STOCKS_QUERY,
      data: { allRegisteredStocks: [...allRegisteredStocks, registerStock] },
    });
  };

  private tickerOnChange = (e: any) => {
    this.setState({ ticker: e.target.value });
  };

  private symbolOnChange = (e: any) => {
    this.setState({ AlphaVantageSymbol: e.target.value });
  };
}

export default RegisterStock;
