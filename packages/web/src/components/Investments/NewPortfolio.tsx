/** @format */

import * as React from 'react';

import { MutationFn } from 'react-apollo';

import {
  NEW_PORTFOLIO_MUTATION,
  NewPortfolioMutation,
  NewPortfolioMutationResponse,
  NewPortfolioMutationVariables,
} from '@graphql/mutations/new-portfolio';

import { userHandler } from '@utils';

interface State {
  portfolioName: string;
}

class NewPortfolio extends React.Component<{}, State> {
  state = {
    portfolioName: '',
  };

  render() {
    return (
      <NewPortfolioMutation mutation={NEW_PORTFOLIO_MUTATION}>
        {(newPortfolio, { loading }) => {
          return (
            <div>
              <form onSubmit={this.onSubmit(newPortfolio)}>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input className="input" type="text" onChange={this.onChange} />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope" />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className={`button is-success ${loading && 'is-loading'}`}>Criar</button>
                  </p>
                </div>
              </form>
            </div>
          );
        }}
      </NewPortfolioMutation>
    );
  }

  private onChange = (e: any) => {
    this.setState({ portfolioName: e.target.value });
  };

  private onSubmit = (newPortfolio: MutationFn<NewPortfolioMutationResponse, NewPortfolioMutationVariables>) => async (
    e: any,
  ) => {
    e.preventDefault();
    try {
      const { portfolioName } = this.state;
      const userId = await userHandler.userId();
      await newPortfolio({ variables: { userId, portfolioName } });
    } catch (e) {
      throw e;
    }
  };
}

export default NewPortfolio;
