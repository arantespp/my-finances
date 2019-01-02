/** @format */

import * as React from 'react';

import { Portfolio } from '@graphql/types';

import AddStock from './AddStock';

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
      <div className="PortfolioStocks">
        <AddStock portfolioId={id} />
      </div>
    );
  }
}

export default PortfolioStocks;
