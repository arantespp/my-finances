/** @format */

import * as React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import { Loading, LongShort, PortfolioDetails } from '@components';

import { PORTFOLIO_QUERY, PortfolioQuery } from '@graphql/queries/portfolio';
import { Portfolio as PortfolioType } from '@graphql/types';

type ComponentNames = 'Detalhes' | 'Long & Short';

interface Props
  extends RouteComponentProps<
    any,
    any,
    {
      portfolioId: string;
    }
  > {}

interface State {
  componentName: ComponentNames;
}

class Portfolio extends React.Component<Props, State> {
  state = {
    componentName: 'Detalhes' as ComponentNames,
  };

  components: Array<{ name: ComponentNames; component: React.ComponentClass<{ portfolio: PortfolioType }> }> = [
    {
      name: 'Detalhes',
      component: PortfolioDetails,
    },
    {
      name: 'Long & Short',
      component: LongShort,
    },
  ];

  render() {
    const { portfolioId } = this.props.location.state;
    const { componentName } = this.state;
    return (
      <PortfolioQuery query={PORTFOLIO_QUERY} variables={{ portfolioId }} onError={this.onError}>
        {({ loading, data }) => {
          return loading ? (
            <Loading />
          ) : (
            <div>
              <div className="tabs">
                <ul>
                  {this.components.map(({ name }) => {
                    return (
                      <li key={name} className={name === componentName ? 'is-active' : ''}>
                        <a onClick={this.changeComponentState(name)}>{name}</a>
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

  private changeComponentState = (name: ComponentNames) => () => {
    this.setState({ componentName: name });
  };

  private componentToRender = (portfolio: PortfolioType): React.ReactNode => {
    const { componentName } = this.state;
    const Component = this.components.find(({ name }) => componentName === name)!.component;
    return <Component portfolio={portfolio} />;
  };
}

export default Portfolio;
