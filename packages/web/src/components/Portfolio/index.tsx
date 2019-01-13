/** @format */

import * as React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Loading from '@components/Loading';
// import LongShort from '@components/LongShort';
import PortfolioDetails from '@components/PortfolioDetails';
// import PortfolioStocksGroup from '@components/PortfolioStocksGroup';

import { PORTFOLIO_QUERY, PortfolioQuery } from '@graphql/queries/portfolio';
import { Portfolio as PortfolioGraphQLType } from '@graphql/types';

enum ComponentsTypes {
  Details,
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
  componentType: ComponentsTypes;
}

class Portfolio extends React.Component<Props, State> {
  state = {
    componentType: ComponentsTypes.Details,
  };

  // components: Array<{ name: ComponentNames; component: React.ComponentClass<{ portfolio: PortfolioType }> }> = [
  //   {
  //     name: 'Detalhes',
  //     component: PortfolioDetails,
  //   },
  // {
  //   name: 'Ações',
  //   component: PortfolioStocksGroup,
  // },
  // {
  //   name: 'Long & Short',
  //   component: LongShort,
  // },
  // ];

  render() {
    const { portfolioId } = this.props.location.state;
    const { componentType } = this.state;
    return (
      <PortfolioQuery query={PORTFOLIO_QUERY} variables={{ portfolioId }} onError={this.onError}>
        {({ loading, data }) => {
          // const { stocksGroups } = data!.portfolio!;
          // console.log(stocksGroups);
          return loading ? (
            <Loading />
          ) : (
            <div>
              <div className="tabs">
                <ul>
                  <li className={componentType === ComponentsTypes.Details ? 'is-active' : ''}>
                    <a>Detalhes</a>
                  </li>
                  {/* {this.components.map(({ name }) => {
                    return (
                      <li key={name} className={name === componentName ? 'is-active' : ''}>
                        <a onClick={this.changeComponentState(name)}>{name}</a>
                      </li>
                    );
                  })} */}
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

  // private changeComponentState = (name: ComponentNames) => () => {
  //   this.setState({ componentName: name });
  // };

  private componentToRender = (portfolio: PortfolioGraphQLType): React.ReactNode => {
    const { componentType } = this.state;
    switch (componentType) {
      case ComponentsTypes.Details:
        return <PortfolioDetails portfolio={portfolio} />;
    }
  };
}

export default Portfolio;
