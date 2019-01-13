/** @format */

import * as React from 'react';

import Loading from '@components/Loading';

import NewPortfolio from '../NewPortfolio';
import PortfolioCard from './PortfolioCard';

import { USER_PORTFOLIOS_QUERY, UserPortfoliosQuery } from '@graphql/queries/user-portfolios';

import { userHandler } from '@utils';

import './styles.scss';
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

    return !!!userId ? (
      <Loading />
    ) : (
      <div className="Investments">
        <NewPortfolio userId={userId} />
        <UserPortfoliosQuery query={USER_PORTFOLIOS_QUERY} variables={{ userId }}>
          {({ data, loading }) => {
            return loading ? (
              <Loading />
            ) : data!.user.portfolios!.length !== 0 ? (
              data!.user.portfolios!.map(portfolio => <PortfolioCard key={portfolio.id} {...portfolio} />)
            ) : (
              'Não possui portfolios'
            );
          }}
        </UserPortfoliosQuery>
      </div>
    );
  }
}

export default Investments;
