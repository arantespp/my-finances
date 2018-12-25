/** @format */

import * as React from 'react';

class AddLongShort extends React.Component {
  public render() {
    return (
      <form>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">From</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded has-icons-left">
                <input className="input" type="text" placeholder="Name" />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>
            <div className="field">
              <span>oi</span>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AddLongShort;
