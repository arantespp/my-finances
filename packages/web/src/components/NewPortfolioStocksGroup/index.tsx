/** @format */

import * as React from 'react';

import { MutationFn, MutationUpdaterFn } from 'react-apollo';

import {
  NEW_PORTFOLIO_STOCKS_GROUP_MUTATION,
  NewPortfolioStocksGroupMutation,
  NewPortfolioStocksGroupMutationResponse,
  NewPortfolioStocksGroupMutationVariables,
} from '@graphql/mutations/new-portfolio-stocks-group';
import { PORTFOLIO_QUERY, PortfolioQueryResponse, PortfolioQueryVariables } from '@graphql/queries/portfolio';
import { Portfolio, PortfolioStocksGroup } from '@graphql/types';

interface Props {
  portfolioId: string;
}

interface State {
  name: string;
}

class NewPortfolioStocksGroup extends React.Component<Props, State> {
  state = {
    name: '',
  };

  render() {
    return (
      <NewPortfolioStocksGroupMutation mutation={NEW_PORTFOLIO_STOCKS_GROUP_MUTATION} update={this.update}>
        {(newPortfolioStocksGroup, { loading }) => {
          return (
            <div className="NewPortfolio">
              <form onSubmit={this.onSubmit(newPortfolioStocksGroup)}>
                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field">
                      <p className="control has-icons-left has-icons-right">
                        <input className="input" type="text" value={this.state.name} onChange={this.onChange} />
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
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </NewPortfolioStocksGroupMutation>
    );
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  };

  private onSubmit = (
    newPortfolioStocksGroup: MutationFn<
      NewPortfolioStocksGroupMutationResponse,
      NewPortfolioStocksGroupMutationVariables
    >,
  ) => async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { portfolioId } = this.props;
      const { name } = this.state;
      await newPortfolioStocksGroup({ variables: { portfolioId, input: { name } } });
      this.setState({ name: '' });
    } catch (err) {
      throw err;
    }
  };

  private update: MutationUpdaterFn<NewPortfolioStocksGroupMutationResponse> = (proxy, { data }) => {
    const { portfolioId } = this.props;
    const readQuery = proxy.readQuery<PortfolioQueryResponse, PortfolioQueryVariables>({
      query: PORTFOLIO_QUERY,
      variables: { portfolioId },
    });
    const newStocksGroup: PortfolioStocksGroup = { ...data!.newPortfolioStocksGroup, stocks: [] };
    const newStocksGroups: PortfolioStocksGroup[] = [...readQuery!.portfolio!.stocksGroups!, newStocksGroup];
    const newPortfolio: Portfolio = { ...readQuery!.portfolio, stocksGroups: newStocksGroups };
    const newData: PortfolioQueryResponse = { portfolio: newPortfolio };
    proxy.writeQuery({
      query: PORTFOLIO_QUERY,
      variables: { portfolioId },
      data: newData,
    });
  };
}

export default NewPortfolioStocksGroup;
