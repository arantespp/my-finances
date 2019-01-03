/** @format */

import * as React from 'react';

import { Link } from 'react-router-dom';

class Menu extends React.Component {
  render() {
    return (
      <aside className="Menu">
        <div className="header">
          <span>Menu</span>
        </div>
        <div className="menu">
          <ul className="menu-list">
            <li>
              <Link to="/investments">Investimentos</Link>
            </li>
          </ul>
          <p className="menu-label">Admin</p>
          <ul className="menu-list">
            <li>
              <Link to="/admin/stocks">Stocks</Link>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}

export default Menu;
