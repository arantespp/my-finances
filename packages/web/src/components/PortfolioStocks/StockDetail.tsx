/** @format */

import * as React from 'react';

import { MutationUpdaterFn } from 'apollo-client';
import { MutationFn } from 'react-apollo';

import {
  REMOVE_PORTFOLIO_STOCK_MUTATION,
  RemovePortfolioStockMutation,
  RemovePortfolioStockMutationResponse,
  RemovePortfolioStockMutationVariables,
} from '@graphql/mutations/remove-portfolio-stock';
import { PORTFOLIO_STOCKS_QUERY, PortfolioQueryResponse, PortfolioQueryVariables } from '@graphql/queries/portfolio';
import { PortfolioStock } from '@graphql/types';

interface Props {
  portfolioId: string;
  stock: PortfolioStock;
}

class StockDetail extends React.Component<Props> {
  render() {
    const {
      portfolioId,
      stock: { index, date, value, quantity, type },
    } = this.props;
    return (
      <RemovePortfolioStockMutation
        mutation={REMOVE_PORTFOLIO_STOCK_MUTATION}
        variables={{ portfolioId, index: Number(index) }}
        update={this.update}>
        {(removePortfolioStock, { loading }) => {
          return (
            <div className="StockDetail">
              <div className="columns">
                <div className="column">
                  <span>{index}</span>
                </div>
                <div className="column">
                  <span>{type}</span>
                </div>
                <div className="column">
                  <span>{date}</span>
                </div>
                <div className="column">
                  <span>{value}</span>
                </div>
                <div className="column">
                  <span>{quantity}</span>
                </div>
                <div className="column">
                  <button
                    className={`button is-danger ${loading && 'is-loading'}`}
                    onClick={this.onClick(removePortfolioStock)}>
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </RemovePortfolioStockMutation>
    );
  }

  private onClick = (
    removePortfolioStock: MutationFn<RemovePortfolioStockMutationResponse, RemovePortfolioStockMutationVariables>,
  ) => async () => {
    try {
      await removePortfolioStock();
    } catch (e) {
      throw e;
    }
  };

  private update: MutationUpdaterFn<RemovePortfolioStockMutationResponse> = (proxy, { data }) => {
    const { portfolioId } = this.props;
    const readQuery = proxy.readQuery<PortfolioQueryResponse, PortfolioQueryVariables>({
      query: PORTFOLIO_STOCKS_QUERY,
      variables: { portfolioId },
    });
    const newData: PortfolioQueryResponse = {
      portfolio: { ...readQuery!.portfolio, stocks: data!.removePortfolioStock },
    };
    proxy.writeQuery({
      query: PORTFOLIO_STOCKS_QUERY,
      variables: { portfolioId },
      data: newData,
    });
  };
}

export default StockDetail;
