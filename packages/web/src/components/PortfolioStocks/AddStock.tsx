/** @format */

import * as React from 'react';

import { utc } from 'moment';
import { MutationFn } from 'react-apollo';
import DatePicker from 'react-datepicker';

import InputNumber from '@components/InputNumber';

import { PortfolioStockType } from '@graphql/enums';
import {
  ADD_PORTFOLIO_STOCK_MUTATION,
  AddPortfolioStockMutation,
  AddPortfolioStockMutationResponse,
  AddPortfolioStockMutationVariables,
} from '@graphql/mutations/add-portfolio-stock';

interface Props {
  portfolioId: string;
}

interface State {
  date: string;
  ticker: string;
  value: number | string;
  quantity: number | string;
}

const dateFormat = 'YYYY-MM-DD';

class AddStock extends React.Component<Props, State> {
  state = {
    date: utc(Date.now()).format(dateFormat),
    ticker: '',
    value: '',
    quantity: '',
  };

  render() {
    return (
      <AddPortfolioStockMutation mutation={ADD_PORTFOLIO_STOCK_MUTATION}>
        {(addPortfolioStock, { loading }) => {
          return (
            <div className="AddStock">
              <form onSubmit={this.onSubmit(addPortfolioStock)}>
                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field">
                      <label className="label">Data</label>
                      <div className="control is-expanded">
                        <DatePicker
                          className="input"
                          selected={new Date(this.state.date)}
                          onChange={this.dateOnChange}
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Ativo</label>
                      <p className="control is-expanded has-icons-left">
                        <input
                          className="input"
                          type="text"
                          placeholder="Ativo"
                          onChange={this.tickerOnChange}
                          value={this.state.ticker}
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user" />
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <label className="label">Valor</label>
                      <p className="control is-expanded has-icons-left">
                        <InputNumber
                          className="input"
                          onChange={this.valueOnChange}
                          value={this.state.value}
                          toFixed={2}
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user" />
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <label className="label">Quantidade</label>
                      <p className="control is-expanded has-icons-left">
                        <InputNumber
                          className="input"
                          onChange={this.quantityOnChange}
                          value={this.state.quantity}
                          toFixed={0}
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user" />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="control button-align">
                    <button type="submit" className={`button is-primary ${loading && 'is-loading'}`}>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </AddPortfolioStockMutation>
    );
  }

  private onSubmit = (
    addPortfolioStock: MutationFn<AddPortfolioStockMutationResponse, AddPortfolioStockMutationVariables>,
  ) => async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { portfolioId } = this.props;
      const { ticker, quantity, value, date } = this.state;
      await addPortfolioStock({
        variables: {
          portfolioId,
          data: {
            ticker,
            date,
            value: Number(value),
            quantity: Number(quantity),
            type: PortfolioStockType.B,
          },
        },
      });
    } catch (e) {
      throw e;
    }
  };

  private dateOnChange = (date: Date) => {
    this.setState({ date: utc(date).format(dateFormat) });
  };

  private tickerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ticker: event.target.value.toUpperCase() });
  };

  private valueOnChange = (value: number) => {
    this.setState({ value });
  };

  private quantityOnChange = (value: number) => {
    this.setState({ quantity: value });
  };
}

export default AddStock;
