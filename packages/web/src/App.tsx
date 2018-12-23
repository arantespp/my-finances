/** @format */

import * as React from 'react';

import { Footer, Header, Menu } from '@components';

import './App.scss';

class App extends React.Component {
  public render() {
    return (
      <div className="App container">
        <div className="header">
          <Header />
        </div>
        <div className="content">
          <div className="menu">
            <Menu />
          </div>
          <div className="content">
            <span>io</span>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
