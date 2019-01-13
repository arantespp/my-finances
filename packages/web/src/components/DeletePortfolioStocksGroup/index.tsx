/** @format */

import * as React from 'react';

import { MutationFn, MutationUpdaterFn } from 'react-apollo';

import {
  DELETE_PORTFOLIO_STOCKS_GROUP,
  DeletePortfolioStocksGroupMutation,
  DeletePortfolioStocksGroupMutationResponse,
  DeletePortfolioStocksGroupMutationVariables,
} from '@graphql/mutations/delete-portfolio-stocks-group';
import { PORTFOLIO_QUERY, PortfolioQueryResponse, PortfolioQueryVariables } from '@graphql/queries/portfolio';
import { Portfolio } from '@graphql/types';

interface Props {
  portfolioId: string;
  portfolioStocksGroupId: string;
}

class DeletePortfolioStocksGroup extends React.Component<Props> {
  render() {
    const { portfolioId, portfolioStocksGroupId } = this.props;
    return (
      <DeletePortfolioStocksGroupMutation
        mutation={DELETE_PORTFOLIO_STOCKS_GROUP}
        variables={{ portfolioId, portfolioStocksGroupId }}
        update={this.update}>
        {(deletePortfolioStocksGroup, { loading }) => {
          return (
            <div>
              <button
                className={`button is-danger ${loading && 'is-loading'}`}
                onClick={this.onClick(deletePortfolioStocksGroup)}>
                Deletar
              </button>
            </div>
          );
        }}
      </DeletePortfolioStocksGroupMutation>
    );
  }

  private onClick = (
    deletePortfolioStocksGroup: MutationFn<
      DeletePortfolioStocksGroupMutationResponse,
      DeletePortfolioStocksGroupMutationVariables
    >,
  ) => async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      await deletePortfolioStocksGroup();
    } catch (err) {
      throw err;
    }
  };

  private update: MutationUpdaterFn<DeletePortfolioStocksGroupMutationResponse> = (proxy, { data }) => {
    const { portfolioId } = this.props;
    const readQuery = proxy.readQuery<PortfolioQueryResponse, PortfolioQueryVariables>({
      query: PORTFOLIO_QUERY,
      variables: { portfolioId },
    });
    const { stocksGroups } = readQuery!.portfolio;
    const newStocksGroups = stocksGroups!.filter(stocksGroup => stocksGroup.id !== data!.deletePortfolioStocksGroup.id);
    const newPortfolio: Portfolio = { ...readQuery!.portfolio, stocksGroups: newStocksGroups };
    const newData: PortfolioQueryResponse = { portfolio: newPortfolio };
    proxy.writeQuery({
      query: PORTFOLIO_QUERY,
      variables: { portfolioId },
      data: newData,
    });
  };
}

export default DeletePortfolioStocksGroup;
