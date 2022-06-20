import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: undefined};
  }

  static getDerivedStateFromError(err) {
    return {error: err};
  }

  render() {
    if (typeof(this.state.error) !== "undefined") {
      this.props.notify("error", this.state.error.message);
      return <h1>Failed to handle: {this.state.error.message}</h1>;
    }

    return this.props.children; 
  }
}
