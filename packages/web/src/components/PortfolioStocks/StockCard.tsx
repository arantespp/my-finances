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

const StockDetail = ({
  portfolioId,
  stock: { index, date, value, quantity },
}: {
  portfolioId: string;
  stock: PortfolioStock;
}) => {
  const onClick = (
    removePortfolioStock: MutationFn<RemovePortfolioStockMutationResponse, RemovePortfolioStockMutationVariables>,
  ) => async () => {
    try {
      await removePortfolioStock();
    } catch (e) {
      throw e;
    }
  };

  const update: MutationUpdaterFn<RemovePortfolioStockMutationResponse> = (proxy, { data }) => {
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

  return (
    <RemovePortfolioStockMutation
      mutation={REMOVE_PORTFOLIO_STOCK_MUTATION}
      variables={{ portfolioId, index: Number(index) }}
      update={update}>
      {(removePortfolioStock, { loading }) => {
        return (
          <div className="StockDetail">
            <div className="columns">
              <div className="column">
                <span>{index}</span>
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
                  onClick={onClick(removePortfolioStock)}>
                  Deletar
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </RemovePortfolioStockMutation>
  );
};

interface Props {
  portfolioId: string;
  stocks: PortfolioStock[];
}

class StockCard extends React.Component<Props> {
  render() {
    const { portfolioId, stocks } = this.props;
    const ticker = stocks[0].ticker;
    return (
      <div className="StockCard">
        <span>{ticker}</span>
        {stocks.map(stock => (
          <StockDetail key={stock.index} stock={stock} portfolioId={portfolioId} />
        ))}
      </div>
    );
  }
}

export default StockCard;
