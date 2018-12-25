/** @format */

import * as React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Loading } from '@components';

interface QueryData {
  allRegisteredStocks: string[];
}

const QUERY = gql`
  query {
    allRegisteredStocks
  }
`;

class AddLongShort extends React.Component {
  public render() {
    return (
      <Query<QueryData, {}> query={QUERY}>
        {({ loading, data }) => {
          return loading ? (
            <Loading />
          ) : (
            <form>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">From</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select>
                          {data!.allRegisteredStocks.map(ticker => (
                            <option key={ticker}>{ticker}</option>
                          ))}
                          <option>Select dropdown</option>
                          <option>With options</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input className="input" type="text" placeholder="Name" />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </Query>
    );
  }
}

export default AddLongShort;
