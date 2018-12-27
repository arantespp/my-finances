/** @format */

import * as React from 'react';

// import { Loading } from '@components';

interface State {
  longTicker: string;
  longBuyPrice: number;
  longQty: number;
  longVol: number;
  shortTicker: string;
  shortBuyPrice: number;
  shortQty: number;
  shortVol: number;
}

class AddLongShort extends React.Component<{}, State> {
  state = {
    longTicker: '',
    longBuyPrice: 0,
    longQty: 0,
    longVol: 0,
    shortTicker: '',
    shortBuyPrice: 0,
    shortQty: 0,
    shortVol: 0,
  };

  render() {
    return (
      <form>
        <div className="field is-horizontal">
          <div className="field-label is-medium">
            <label className="label">Long</label>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label">Ativo</label>
              <p className="control is-expanded has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Ativo"
                  onChange={this.longTickerInput}
                  value={this.state.longTicker}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>
            <div className="field">
              <label className="label">Cotação</label>
              <p className="control is-expanded has-icons-left">
                <input
                  className="input"
                  type="number"
                  value={this.state.longBuyPrice}
                  step="0.01"
                  onChange={this.longBuyPriceInput}
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
                  className="input is-static"
                  type="number"
                  value={this.state.longQty}
                  step="1"
                  placeholder="Quantidade"
                  readOnly={true}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>
            <div className="field">
              <label className="label">Volume</label>
              <p className="control is-expanded has-icons-left">
                <input
                  className="input is-static"
                  type="number"
                  value={this.state.longVol}
                  step="1"
                  placeholder="Volume"
                  readOnly={true}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-medium">
            <label className="label">Short</label>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label">Ativo</label>
              <p className="control is-expanded has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Ativo"
                  onChange={this.shortTickerInput}
                  value={this.state.shortTicker}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>
            <div className="field">
              <label className="label">Cotação</label>
              <p className="control is-expanded has-icons-left">
                <input
                  className="input"
                  type="number"
                  value={this.state.shortBuyPrice}
                  step="0.01"
                  onChange={this.shortBuyPriceInput}
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
                  value={this.state.shortQty}
                  step="1"
                  min="1"
                  pattern="[0-9]"
                  onChange={this.shortQtyInput}
                  placeholder="Quantidade"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>
            <div className="field">
              <label className="label">Volume</label>
              <p className="control is-expanded has-icons-left">
                <input
                  className="input is-static"
                  type="number"
                  value={this.state.shortVol}
                  placeholder="Volume"
                  readOnly={true}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="control">
          <button className="button is-primary">Submit</button>
        </div>
      </form>
    );
  }

  componentDidUpdate(prevProps: any, prevState: State, snapshot: any) {
    const { shortBuyPrice, shortQty, shortVol, longBuyPrice } = this.state;
    const shortDiff = prevState.shortBuyPrice !== shortBuyPrice || prevState.shortQty !== shortQty;
    const longDiff = prevState.longBuyPrice !== longBuyPrice;

    if (shortDiff) {
      this.setState({ shortVol: shortBuyPrice * shortQty });
    }

    if (longDiff && longBuyPrice !== 0) {
      const longQty = Math.round(shortVol / longBuyPrice);
      const longVol = longQty * longBuyPrice;
      this.setState({ longQty, longVol });
    }
  }

  private longTickerInput = (e: any) => {
    this.setState({ longTicker: e.target.value.toUpperCase() });
  };

  private longBuyPriceInput = (e: any) => {
    if (e.target && e.target.value) {
      this.setState({ longBuyPrice: Number(Number(e.target.value).toFixed(2)) });
    } else {
      this.setState(prevState => ({ longBuyPrice: prevState.longBuyPrice }));
    }
  };

  private shortTickerInput = (e: any) => {
    this.setState({ shortTicker: e.target.value.toUpperCase() });
  };

  private shortBuyPriceInput = (e: any) => {
    if (e.target && e.target.value) {
      this.setState({ shortBuyPrice: Number(Number(e.target.value).toFixed(2)) });
    } else {
      this.setState(prevState => ({ shortBuyPrice: prevState.shortBuyPrice }));
    }
  };

  private shortQtyInput = (e: any) => {
    if (e.target && e.target.value) {
      this.setState({ shortQty: Number(Number(e.target.value).toFixed(0)) });
    } else {
      this.setState(prevState => ({ shortQty: prevState.shortQty }));
    }
  };
}

export default AddLongShort;
