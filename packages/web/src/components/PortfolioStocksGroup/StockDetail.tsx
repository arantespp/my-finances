/** @format */

import * as React from 'react';

import AddPortfolioStock from '@components/AddPortfolioStock';
import RemovePortfolioStock from '@components/RemovePortfolioStock';

import { PortfolioStock } from '@graphql/types';

interface Props {
  portfolioId: string;
  portfolioStocksGroupId: string;
  stock: PortfolioStock;
}

interface State {
  modifyStock: boolean;
}

class StockDetail extends React.Component<Props, State> {
  state = {
    modifyStock: false,
  };

  render() {
    const { portfolioId, portfolioStocksGroupId, stock } = this.props;
    const { index, date, value, quantity, type } = stock;
    const { modifyStock } = this.state;
    return (
      <div className="StockDetail">
        <div className="columns">
          <div className="column">
            <span>{type}</span>
          </div>
          <div className="column">
            <span>{date}</span>
          </div>
          <div className="column">
            <span>R$ {(value as number).toFixed(2)}</span>
          </div>
          <div className="column">
            <span>{quantity}</span>
          </div>
          <div className="column">
            <span>V. Unit R$ {((value as number) / (quantity as number)).toFixed(2)}</span>
          </div>
          <div className="column">
            <button onClick={this.modifyStock}>Modificar</button>
            <RemovePortfolioStock
              portfolioId={portfolioId}
              portfolioStocksGroupId={portfolioStocksGroupId}
              index={index}
            />
          </div>
        </div>
        {modifyStock ? (
          <div>
            <AddPortfolioStock
              portfolioId={portfolioId}
              portfolioStocksGroupId={portfolioStocksGroupId}
              index={index}
              stock={stock}
            />
          </div>
        ) : null}
      </div>
    );
  }

  private modifyStock = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState({ modifyStock: !this.state.modifyStock });
  };
}

export default StockDetail;
