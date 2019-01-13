/** @format */

import * as React from 'react';

import DeletePortfolioStocksGroup from '@components/DeletePortfolioStocksGroup';

import { PortfolioStocksGroup } from '@graphql/types';

interface Props {
  portfolioId: string;
  stocksGroup: PortfolioStocksGroup;
}

class StocksGroup extends React.Component<Props> {
  render() {
    const { portfolioId, stocksGroup } = this.props;
    const { id, name } = stocksGroup;
    return (
      <div className="stocks-group">
        <span>{name}</span>
        <DeletePortfolioStocksGroup portfolioId={portfolioId} portfolioStocksGroupId={id} />
      </div>
    );
  }
}

export default StocksGroup;
