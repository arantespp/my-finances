/** @format */

import * as React from 'react';

import { Link } from 'react-router-dom';

import { Portfolio } from '@graphql/types';

interface Props extends Portfolio {}

class PortfolioCard extends React.Component<Props> {
  render() {
    const { id, name } = this.props;
    return (
      <span>
        {id}-{name}
        <Link
          to={{
            pathname: '/investments/portfolio',
            state: {
              portfolioId: id,
            },
          }}>
          <button className={`button is-success`}>Abrir</button>
        </Link>
      </span>
    );
  }
}

export default PortfolioCard;
