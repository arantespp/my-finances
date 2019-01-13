/** @format */

import * as React from 'react';

import { Portfolio } from '@graphql/types';

import './styles.scss';

interface Props {
  portfolio: Portfolio;
}

class PortfolioDetails extends React.Component<Props> {
  render() {
    const { name } = this.props.portfolio;
    return (
      <div className="PortfolioDetails">
        <span>PortfolioDetails</span>
        <span>{name}</span>
      </div>
    );
  }
}

export default PortfolioDetails;
