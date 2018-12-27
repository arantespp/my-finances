/** @format */

import * as React from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  state = { hasError: false };

  componentDidCatch(error: any, info: any) {
    const logErrorToMyService = console.log;
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
