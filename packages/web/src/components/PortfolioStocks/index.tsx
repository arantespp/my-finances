/** @format */

import * as React from 'react';

import { Loading } from '@components';

import { PORTFOLIO_STOCKS_QUERY, PortfolioQuery } from '@graphql/queries/portfolio';
import { Portfolio, PortfolioStock } from '@graphql/types';

import AddStock from './AddStock';
import StockCard from './StockCard';

import './styles.scss';

interface Props {
  portfolio: Portfolio;
}

class PortfolioStocks extends React.Component<Props> {
  render() {
    const {
      portfolio: { id },
    } = this.props;
    return (
      <PortfolioQuery query={PORTFOLIO_STOCKS_QUERY} variables={{ portfolioId: id }}>
        {({ data, loading, error }) => {
          if (error) {
            throw error;
          }

          return (
            <div className="PortfolioStocks">
              <AddStock portfolioId={id} />
              {loading ? <Loading /> : this.stockCards(data!.portfolio.stocks!)}
            </div>
          );
        }}
      </PortfolioQuery>
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

  private stockCards = (stocks: PortfolioStock[]) => {
    const {
      portfolio: { id },
    } = this.props;
    const allStocks = this.aggregateStocks(stocks);
    return Object.keys(allStocks).map(key => {
      const aggregated = allStocks[key];
      return <StockCard key={aggregated[0].ticker} stocks={aggregated} portfolioId={id} />;
    });
  };
}

export default PortfolioStocks;
