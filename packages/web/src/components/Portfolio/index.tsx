/** @format */

import * as React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Loading from '@components/Loading';
// import LongShort from '@components/LongShort';
import PortfolioDetails from '@components/PortfolioDetails';
import PortfolioStocksGroup from '@components/PortfolioStocksGroup';

import { PORTFOLIO_QUERY, PortfolioQuery } from '@graphql/queries/portfolio';
import { Portfolio as PortfolioGraphQLType } from '@graphql/types';

enum ComponentsTypes {
  Details,
  StocksGroup,
}

interface Props
  extends RouteComponentProps<
    any,
    any,
    {
      portfolioId: string;
    }
  > {}

interface State {
  componentToRenderId: string;
  componentType: ComponentsTypes;
}

class Portfolio extends React.Component<Props, State> {
  state = {
    componentToRenderId: '',
    componentType: ComponentsTypes.Details,
  };

  render() {
    const { portfolioId } = this.props.location.state;
    const { componentToRenderId, componentType } = this.state;
    return (
      <PortfolioQuery query={PORTFOLIO_QUERY} variables={{ portfolioId }} onError={this.onError}>
        {({ loading, data }) => {
          if (loading) {
            return <Loading />;
          }

          const { stocksGroups } = data!.portfolio;

          return (
            <div>
              <div className="tabs">
                <ul>
                  <li
                    className={componentType === ComponentsTypes.Details ? 'is-active' : ''}
                    onClick={this.changeComponentState(ComponentsTypes.Details, '')}>
                    <a>Detalhes</a>
                  </li>
                  {stocksGroups!.map(({ id, name }) => {
                    return (
                      <li
                        key={id}
                        className={
                          id === componentToRenderId && componentType === ComponentsTypes.StocksGroup ? 'is-active' : ''
                        }
                        onClick={this.changeComponentState(ComponentsTypes.StocksGroup, id)}>
                        <a>[Ações] {name}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {this.componentToRender(data!.portfolio)}
            </div>
          );
        }}
      </PortfolioQuery>
    );
  }

  private onError = (e: any) => {
    throw e;
  };

  private changeComponentState = (componentType: ComponentsTypes, componentToRenderId: string) => () => {
    this.setState({ componentType, componentToRenderId });
  };

  private componentToRender = (portfolio: PortfolioGraphQLType): React.ReactNode => {
    const { portfolioId } = this.props.location.state;
    const { componentToRenderId, componentType } = this.state;
    switch (componentType) {
      case ComponentsTypes.Details:
        return <PortfolioDetails portfolio={portfolio} />;
      case ComponentsTypes.StocksGroup:
        const portfolioStocksGroup = portfolio.stocksGroups!.find(({ id }) => id === componentToRenderId);
        return <PortfolioStocksGroup portfolioStocksGroup={portfolioStocksGroup!} portfolioId={portfolioId} />;
      default:
        return <PortfolioDetails portfolio={portfolio} />;
    }
  };
}

export default Portfolio;
