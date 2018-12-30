/** @format */

import * as React from 'react';

interface State {
  ticker: string;
  price: number | string;
  qty: number | string;
}

class AddStock extends React.Component<{}, State> {
  state = {
    ticker: '',
    price: '',
    qty: '',
  };

  render() {
    return (
      <div className="AddStock">
        <form onSubmit={this.onSubmit}>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <label className="label">Ativo</label>
                <p className="control is-expanded has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Ativo"
                    onChange={this.tickerInput}
                    value={this.state.ticker}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label">Valor</label>
                <p className="control is-expanded has-icons-left">
                  <input
                    className="input"
                    type="number"
                    value={this.state.price}
                    step="0.01"
                    onChange={this.priceInput}
                    placeholder="Cotação"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label">Quantidade</label>
                <p className="control is-expanded has-icons-left">
                  <input
                    className="input"
                    type="number"
                    value={this.state.qty}
                    onChange={this.qtyInput}
                    step="1"
                    placeholder="Quantidade"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                </p>
              </div>
            </div>
            <div className="control button-align">
              <button className="button is-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(this.state);
  };

  private tickerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ticker: event.target.value.toUpperCase() });
  };

  private priceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.value) {
      this.setState({ price: Number(Number(event.target.value).toFixed(2)) });
    } else {
      this.setState(prevState => ({ price: prevState.price }));
    }
  };

  private qtyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, !!event.target.value);
    if (!!event.target.value) {
      this.setState({ qty: Number(Number(event.target.value).toFixed(0)) });
    } else {
      this.setState({ qty: '' });
    }
  };
}

export default AddStock;
