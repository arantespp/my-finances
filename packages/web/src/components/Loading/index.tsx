/** @format */

import * as React from 'react';

import './styles.scss';

class Loading extends React.Component {
  render() {
    return <progress className="progress is-info" />;
  }
}

export default Loading;
