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
    return (
      <div className="PortfolioStocks">
        <AddStock />
      </div>
    );
  }
}

export default PortfolioStocks;
