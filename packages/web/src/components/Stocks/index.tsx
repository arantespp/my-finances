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

class Stocks extends React.Component {
  public render() {
    return (
      <Query<QueryData, {}> query={QUERY}>
        {({ loading, data }) => {
          return loading ? <Loading /> : data!.allRegisteredStocks.map(ticker => <span key={ticker}>{ticker}</span>);
        }}
      </Query>
    );
  }
}

export default Stocks;
