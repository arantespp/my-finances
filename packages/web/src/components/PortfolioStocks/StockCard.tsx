/** @format */

import * as React from 'react';

import { MOST_RECENT_STOCK_PRICE_QUERY, MostRecentStockPriceQuery } from '@graphql/queries/most-recent-stock-price';
import { PortfolioStock } from '@graphql/types';

import StockDetail from './StockDetail';

const POOL_INTERVAL = 60 * 60 * 1000; // 1 hour

interface Props {
  portfolioId: string;
  stocks: PortfolioStock[];
}

class StockCard extends React.Component<Props> {
  render() {
    const { portfolioId, stocks } = this.props;
    const ticker = stocks[0].ticker!;
    return (
      <MostRecentStockPriceQuery
        query={MOST_RECENT_STOCK_PRICE_QUERY}
        variables={{ ticker }}
        pollInterval={POOL_INTERVAL}>
        {({ data }) => {
          const lastPrice = data!.mostRecentStockPrice ? data!.mostRecentStockPrice.price! : 0;
          return (
            <div className="StockCard">
              <div className="columns">
                <span className="column has-text-weight-bold">{ticker}</span>
                <span className="column">Valor mais recente: R$ {lastPrice.toFixed(2)}</span>
              </div>
              {stocks.map(stock => (
                <StockDetail key={stock.index} stock={stock} portfolioId={portfolioId} />
              ))}
            </div>
          );
        }}
      </MostRecentStockPriceQuery>
    );
  }
}

export default StockCard;
