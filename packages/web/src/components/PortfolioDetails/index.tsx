/** @format */

import * as React from 'react';

import NewPortfolioStocksGroup from '@components/NewPortfolioStocksGroup';

import { Portfolio } from '@graphql/types';

import StocksGroup from './StocksGroup';

import './styles.scss';

interface Props {
  portfolio: Portfolio;
}

class PortfolioDetails extends React.Component<Props> {
  render() {
    const { id, name, stocksGroups } = this.props.portfolio;
    return (
      <div className="PortfolioDetails">
        <span>PortfolioDetails</span>
        <span>{name}</span>
        <div className="stocks-group-section">
          <NewPortfolioStocksGroup portfolioId={id} />
          {stocksGroups!.map((stocksGroup, index) => {
            return <StocksGroup key={index} portfolioId={id} stocksGroup={stocksGroup} />;
          })}
        </div>
      </div>
    );
  }
}

export default PortfolioDetails;
