/** @format */

import * as React from 'react';

interface Props {
  className: string;
  toFixed: number;
  value: number | string;
  onChange: (value: number) => void;
}

class InputNumber extends React.Component<Props> {
  render() {
    const { className } = this.props;
    return (
      <input
        className={className}
        type="number"
        value={this.props.value}
        step="1"
        onChange={this.onChange}
        onFocus={this.onFocus}
      />
    );
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { toFixed } = this.props;
    const { value } = this.props;
    const newValue = Number(Number(event.target.value).toFixed(toFixed)) || Number(value);
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  };

  private onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };
}

export default InputNumber;
