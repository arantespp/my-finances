/** @format */

import * as React from 'react';

import { Portfolio } from '@graphql/types';

interface Props {
  portfolio: Portfolio;
}

class PortfolioDetails extends React.Component<Props> {
  render() {
    const { name } = this.props.portfolio;
    return (
      <div>
        <span>PortfolioDetails</span>
        <span>{name}</span>;
      </div>
    );
  }
}

export default PortfolioDetails;
