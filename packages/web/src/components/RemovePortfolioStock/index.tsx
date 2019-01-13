/** @format */

import * as React from 'react';

import { MutationFn, MutationUpdaterFn } from 'react-apollo';

import {
  REMOVE_PORTFOLIO_STOCK_MUTATION,
  RemovePortfolioStockMutation,
  RemovePortfolioStockMutationResponse,
  RemovePortfolioStockMutationVariables,
} from '@graphql/mutations/remove-portfolio-stock';
import { PORTFOLIO_QUERY, PortfolioQueryResponse, PortfolioQueryVariables } from '@graphql/queries/portfolio';
import { Portfolio, PortfolioStocksGroup } from '@graphql/types';

interface Props {
  portfolioId: string;
  portfolioStocksGroupId: string;
  index: number;
}

class RemovePortfolioStock extends React.Component<Props> {
  render() {
    const { portfolioId, portfolioStocksGroupId, index } = this.props;
    return (
      <RemovePortfolioStockMutation
        mutation={REMOVE_PORTFOLIO_STOCK_MUTATION}
        variables={{ portfolioId, portfolioStocksGroupId, index }}
        update={this.update}>
        {(removePortfolioStock, { loading }) => {
          return (
            <div>
              <button
                className={`button is-danger ${loading && 'is-loading'}`}
                onClick={this.onClick(removePortfolioStock)}>
                Remover
              </button>
            </div>
          );
        }}
      </RemovePortfolioStockMutation>
    );
  }

  private onClick = (
    removePortfolioStock: MutationFn<RemovePortfolioStockMutationResponse, RemovePortfolioStockMutationVariables>,
  ) => async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      await removePortfolioStock();
    } catch (err) {
      throw err;
    }
  };

  private update: MutationUpdaterFn<RemovePortfolioStockMutationResponse> = (proxy, { data }) => {
    const { portfolioId, portfolioStocksGroupId } = this.props;
    const readQuery = proxy.readQuery<PortfolioQueryResponse, PortfolioQueryVariables>({
      query: PORTFOLIO_QUERY,
      variables: { portfolioId },
    });
    const portfolio: Portfolio = readQuery!.portfolio!;
    const portfolioStocksGroup: PortfolioStocksGroup = portfolio.stocksGroups!.find(
      ({ id }) => id === portfolioStocksGroupId,
    )!;
    const newPortfolioStocksGroup: PortfolioStocksGroup = {
      ...portfolioStocksGroup,
      stocks: data!.removePortfolioStock,
    };
    const newPortfolioStocksGroups: PortfolioStocksGroup[] = [
      ...portfolio.stocksGroups!.filter(({ id }) => id !== portfolioStocksGroupId),
      newPortfolioStocksGroup,
    ]!;
    const newPortfolio: Portfolio = { ...portfolio, stocksGroups: newPortfolioStocksGroups };
    const newData: PortfolioQueryResponse = { portfolio: newPortfolio };
    proxy.writeQuery({
      query: PORTFOLIO_QUERY,
      variables: { portfolioId },
      data: newData,
    });
  };
}

export default RemovePortfolioStock;
