/** @format */

import * as React from 'react';

// import AddLongShort from './AddLongShort';

import { Portfolio } from '@graphql/types';

interface Props {
  portfolio: Portfolio;
}

class LongShort extends React.Component<Props> {
  render() {
    return <span>LongShort</span>;
  }
}

export default LongShort;
