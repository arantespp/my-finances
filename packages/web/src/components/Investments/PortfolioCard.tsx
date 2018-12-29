/** @format */

import * as React from 'react';

import { Portfolio } from '@graphql/types';

interface Props extends Portfolio {}

class PortfolioCard extends React.Component<Props> {
  render() {
    return (
      <span>
        {this.props.id}-{this.props.name}
      </span>
    );
  }
}

export default PortfolioCard;
