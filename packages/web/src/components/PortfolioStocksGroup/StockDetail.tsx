/** @format */

import * as React from 'react';

import RemovePortfolioStock from '@components/RemovePortfolioStock';

import { PortfolioStock } from '@graphql/types';

interface Props {
  portfolioId: string;
  portfolioStocksGroupId: string;
  stock: PortfolioStock;
}

class StockDetail extends React.Component<Props> {
  render() {
    const {
      portfolioId,
      portfolioStocksGroupId,
      stock: { index, date, value, quantity, type },
    } = this.props;
    return (
      <div className="StockDetail">
        <div className="columns">
          <div className="column">
            <span>{type}</span>
          </div>
          <div className="column">
            <span>{date}</span>
          </div>
          <div className="column">
            <span>R$ {(value as number).toFixed(2)}</span>
          </div>
          <div className="column">
            <span>{quantity}</span>
          </div>
          <div className="column">
            <span>V. Unit R$ {((value as number) / (quantity as number)).toFixed(2)}</span>
          </div>
          <div className="column">
            <RemovePortfolioStock
              portfolioId={portfolioId}
              portfolioStocksGroupId={portfolioStocksGroupId}
              index={index}
            />
          </div>
        </div>
      </div>
    );
  }

  // private onClick = (
  //   removePortfolioStock: MutationFn<RemovePortfolioStockMutationResponse, RemovePortfolioStockMutationVariables>,
  // ) => async () => {
  //   try {
  //     await removePortfolioStock();
  //   } catch (e) {
  //     throw e;
  //   }
  // };

  // private update: MutationUpdaterFn<RemovePortfolioStockMutationResponse> = (proxy, { data }) => {
  //   const { portfolioId } = this.props;
  //   const readQuery = proxy.readQuery<PortfolioQueryResponse, PortfolioQueryVariables>({
  //     query: PORTFOLIO_STOCKS_QUERY,
  //     variables: { portfolioId },
  //   });
  //   const newData: PortfolioQueryResponse = {
  //     portfolio: { ...readQuery!.portfolio, stocks: data!.removePortfolioStock },
  //   };
  //   proxy.writeQuery({
  //     query: PORTFOLIO_STOCKS_QUERY,
  //     variables: { portfolioId },
  //     data: newData,
  //   });
  // };
}

export default StockDetail;
