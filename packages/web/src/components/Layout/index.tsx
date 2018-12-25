/** @format */

import * as React from 'react';

import { Link, Route, Switch } from 'react-router-dom';

import { Footer, Header } from '@components';

interface Props {
  components: Array<{ path: string; name: string; component: React.ComponentClass }>;
}

class Layout extends React.Component<Props> {
  public render() {
    return (
      <div>
        <Header />
        {this.Content()}
        {this.Menu()}
        <Footer />
      </div>
    );
  }

  private Content = () => {
    const { components } = this.props;
    return (
      <Switch>
        {components.map(({ path, component }, index) => (
          <Route key={index} path={path} exact={true} component={component} />
        ))}
      </Switch>
    );
  };

  private Menu = () => {
    const { components } = this.props;
    return (
      <div>
        {components.map(({ name, path }, index) => (
          <Link key={index} to={path}>
            {name}
          </Link>
        ))}
      </div>
    );
  };
}

export default Layout;
