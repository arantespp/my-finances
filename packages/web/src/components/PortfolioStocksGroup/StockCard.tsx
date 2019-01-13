/** @format */

import * as React from 'react';

import { PortfolioStockType } from '@graphql/enums';
import { MOST_RECENT_STOCK_PRICE_QUERY, MostRecentStockPriceQuery } from '@graphql/queries/most-recent-stock-price';
import { PortfolioStock } from '@graphql/types';

import StockDetail from './StockDetail';

const POOL_INTERVAL = 60 * 60 * 1000; // 1 hour

interface Props {
  portfolioId: string;
  portfolioStocksGroupId: string;
  stocks: PortfolioStock[];
}

class StockCard extends React.Component<Props> {
  render() {
    const { portfolioId, portfolioStocksGroupId, stocks } = this.props;
    const ticker = stocks[0].ticker!;
    return (
      <MostRecentStockPriceQuery
        query={MOST_RECENT_STOCK_PRICE_QUERY}
        variables={{ ticker }}
        pollInterval={POOL_INTERVAL}>
        {({ data }) => {
          const lastPrice = data && data!.mostRecentStockPrice ? data!.mostRecentStockPrice.price! : 0;
          const stocksQuantity = this.stocksQuantity(stocks);
          return (
            <div className="StockCard">
              <div className="columns">
                <span className="column has-text-weight-bold">{ticker}</span>
                <span className="column">Último valor: R$ {lastPrice.toFixed(2)}</span>
                <span className="column">Quantidade {stocksQuantity}</span>
                <span className="column">Valor total R$ {(lastPrice * stocksQuantity).toFixed(2)}</span>
              </div>
              {stocks.sort(this.sortByDate).map(stock => (
                <StockDetail
                  key={stock.index}
                  stock={stock}
                  portfolioId={portfolioId}
                  portfolioStocksGroupId={portfolioStocksGroupId}
                />
              ))}
            </div>
          );
        }}
      </MostRecentStockPriceQuery>
    );
  }

  private stocksQuantity = (stocks: PortfolioStock[]): number => {
    return stocks.reduce(
      (sum, stock) =>
        stock.type! === PortfolioStockType.B
          ? sum + stock.quantity!
          : stock.type! === PortfolioStockType.S
          ? sum - stock.quantity!
          : sum,
      0,
    );
  };

  private sortByDate = (stockA: PortfolioStock, stockB: PortfolioStock): number => {
    return stockA.date! < stockB.date! ? 1 : -1;
  };
}

export default StockCard;
