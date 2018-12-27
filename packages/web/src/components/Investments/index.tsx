/** @format */

import * as React from 'react';

import { Loading } from '@components';

import NewPortfolio from './NewPortfolio';
import PortfolioCard from './PortfolioCard';

import { ALL_USER_PORTFOLIOS_QUERY, AllUserPortfoliosQuery } from '@graphql/queries/all-user-portfolios';

import { userHandler } from '@utils';

interface State {
  userId: string;
}

class Investments extends React.Component<{}, State> {
  state = {
    userId: '',
  };

  async componentDidMount() {
    const userId = await userHandler.userId();
    this.setState({ userId });
  }

  render() {
    const { userId } = this.state;

    return (
      <div>
        <NewPortfolio />
        {!!!userId ? (
          <Loading />
        ) : (
          <AllUserPortfoliosQuery query={ALL_USER_PORTFOLIOS_QUERY} variables={{ userId }}>
            {({ data, loading }) => {
              console.log(data);
              return loading ? <Loading /> : <PortfolioCard />;
            }}
          </AllUserPortfoliosQuery>
        )}
      </div>
    );
  }
}

export default Investments;
