/** @format */

import * as React from 'react';

// import Loading from '@components/Loading';

// import { PORTFOLIO_STOCKS_QUERY, PortfolioQuery } from '@graphql/queries/portfolio';
import { PortfolioStock, PortfolioStocksGroup as PortfolioStocksGroupGraphQLType } from '@graphql/types';

import AddPortfolioStock from '@components/AddPortfolioStock';
import StockCard from './StockCard';

import './styles.scss';

interface Props {
  portfolioId: string;
  portfolioStocksGroup: PortfolioStocksGroupGraphQLType;
}

class PortfolioStocksGroup extends React.Component<Props> {
  render() {
    const { portfolioId, portfolioStocksGroup } = this.props;
    return (
      <div className="PortfolioStocks">
        <AddPortfolioStock portfolioId={portfolioId} portfolioStocksGroupId={portfolioStocksGroup.id} />
        {this.stockCards()}
      </div>
    );
  }

  private aggregateStocks = (stocks: PortfolioStock[]): { [key: string]: PortfolioStock[] } => {
    return stocks.reduce((acc, stock) => {
      if (!!!acc[stock.ticker!]) {
        acc[stock.ticker!] = [];
      }
      acc[stock.ticker!].push(stock);
      return acc;
    }, {});
  };

  private stockCards = () => {
    const {
      portfolioId,
      portfolioStocksGroup: { id, stocks },
    } = this.props;
    const allStocks = this.aggregateStocks(stocks);
    return Object.keys(allStocks).map(key => {
      const aggregated = allStocks[key];
      return (
        <StockCard
          key={aggregated[0].ticker}
          stocks={aggregated}
          portfolioId={portfolioId}
          portfolioStocksGroupId={id}
        />
      );
    });
  };
}

export default PortfolioStocksGroup;
