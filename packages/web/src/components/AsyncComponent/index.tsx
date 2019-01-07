/** @format */

import * as React from 'react';

import Loading from '@components/Loading';

interface State {
  Component: typeof React.Component | null;
}

export default function asyncComponent(getComponent: any) {
  class AsyncComponent extends React.Component<{}, State> {
    static Component: typeof React.Component | null = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component: typeof React.Component) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component }: { Component: typeof React.Component | null } = this.state;
      return !!Component ? <Component {...this.props} /> : <Loading />;
    }
  }
  return AsyncComponent;
}
