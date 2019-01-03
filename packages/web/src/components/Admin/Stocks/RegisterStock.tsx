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

import config from '@config';

interface AlphaVantageGlobalQuoteResponse {
  'Global Quote':
    | {
        '01. symbol': string;
        '02. open': string;
        '03. high': string;
        '04. low': string;
        '05. price': string;
        '06. volume': string;
        '07. latest trading day': string;
        '08. previous close': string;
        '09. change': string;
        '10. change percent': string;
      }
    | {};
}

interface State {
  AlphaVantageSymbol: string;
  globalQuote: AlphaVantageGlobalQuoteResponse | null;
  hasSymbol: boolean;
  loadingCheck: boolean;
  ticker: string;
}

class RegisterStock extends React.Component<{}, State> {
  state = {
    AlphaVantageSymbol: '',
    globalQuote: { 'Global Quote': {} },
    hasSymbol: false,
    loadingCheck: false,
    ticker: '',
  };

  render() {
    const { loadingCheck } = this.state;
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
                      <button
                        className={`button is-info ${loadingCheck && 'is-loading'}`}
                        disabled={this.disableCheckButton()}
                        type="button"
                        onClick={this.checkStock}>
                        Test Stock
                      </button>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button className="button is-primary" disabled={this.disableSubmitButton()} type="submit">
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

  private disableCheckButton = (): boolean => {
    const { ticker } = this.state;
    return !!!ticker;
  };

  private disableSubmitButton = (): boolean => {
    const { hasSymbol } = this.state;
    return !hasSymbol;
  };

  private checkStock = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({ loadingCheck: true });
    const { AlphaVantageApiKey } = config;
    const { AlphaVantageSymbol } = this.state;
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${AlphaVantageSymbol}&apikey=${AlphaVantageApiKey}`,
    );
    const globalQuote: AlphaVantageGlobalQuoteResponse = await res.json();
    this.setState({ loadingCheck: false, hasSymbol: Object.keys(globalQuote['Global Quote']).length !== 0 });
  };

  private submitForm = (
    registerStock: MutationFn<RegisterStockMutationResponse, RegisterStockMutationVariables>,
  ) => async (event: any) => {
    try {
      event.preventDefault();
      const { ticker, AlphaVantageSymbol } = this.state;
      await registerStock({ variables: { stockMetadata: { ticker, AlphaVantageSymbol } } });
      this.setState({ ticker: '', AlphaVantageSymbol: '' });
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
    const ticker = (e.target.value as string).toUpperCase();
    this.setState({ ticker, AlphaVantageSymbol: ticker + '.SA' });
  };

  private symbolOnChange = (e: any) => {
    this.setState({ AlphaVantageSymbol: (e.target.value as string).toUpperCase() });
  };
}

export default RegisterStock;
