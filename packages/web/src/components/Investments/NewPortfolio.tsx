/** @format */

import * as React from 'react';

import { MutationFn, MutationUpdaterFn } from 'react-apollo';

import {
  NEW_PORTFOLIO_MUTATION,
  NewPortfolioMutation,
  NewPortfolioMutationResponse,
  NewPortfolioMutationVariables,
} from '@graphql/mutations/new-portfolio';
import {
  USER_PORTFOLIOS_QUERY,
  UserPortfoliosQueryResponse,
  UserPortfoliosQueryVariables,
} from '@graphql/queries/user-portfolios';
import { Portfolio } from '@graphql/types/portfolio';

interface Props {
  userId: string;
}

interface State {
  portfolioName: string;
}

class NewPortfolio extends React.Component<Props, State> {
  state = {
    portfolioName: '',
  };

  render() {
    return (
      <NewPortfolioMutation mutation={NEW_PORTFOLIO_MUTATION} update={this.update}>
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
      const { userId } = this.props;
      const { portfolioName } = this.state;
      await newPortfolio({ variables: { userId, portfolioName } });
    } catch (e) {
      throw e;
    }
  };

  private update: MutationUpdaterFn<NewPortfolioMutationResponse> = (proxy, { data }) => {
    const { userId } = this.props;
    const readQuery = proxy.readQuery<UserPortfoliosQueryResponse, UserPortfoliosQueryVariables>({
      query: USER_PORTFOLIOS_QUERY,
      variables: { userId },
    });
    const newPortfolios: Portfolio[] = [...readQuery!.user.portfolios!, data!.newPortfolio];
    const newData = { user: { ...readQuery!.user, portfolios: newPortfolios } };
    proxy.writeQuery({
      query: USER_PORTFOLIOS_QUERY,
      variables: { userId },
      data: newData,
    });
  };
}

export default NewPortfolio;
