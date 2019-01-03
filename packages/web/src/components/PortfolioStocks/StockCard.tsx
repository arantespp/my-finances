/** @format */

import * as React from 'react';

import { PortfolioStock } from '@graphql/types';

import StockDetail from './StockDetail';

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
