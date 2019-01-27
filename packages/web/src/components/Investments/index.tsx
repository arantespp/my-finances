/** @format */

import * as React from 'react';

import Loading from '@components/Loading';

import { InjectedWithUserHandlerProps, withUserHandler } from '@hocs/withUserHandler';

import NewPortfolio from '../NewPortfolio';
import PortfolioCard from './PortfolioCard';

import { USER_PORTFOLIOS_QUERY, UserPortfoliosQuery } from '@graphql/queries/user-portfolios';

import './styles.scss';

interface Props extends InjectedWithUserHandlerProps {}
interface State {
  userId: string;
}

class Investments extends React.Component<Props, State> {
  state = {
    userId: '',
  };

  async componentDidMount() {
    const {
      userHandler: { getUser },
    } = this.props;
    const userId = (await getUser()).id;
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

export default withUserHandler(Investments);
