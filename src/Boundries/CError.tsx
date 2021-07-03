import React from "react";
import { Alert } from "antd";
class CError extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <Alert
          message="An Error Has Occured"
          description={this.state.error && this.state.error.toString()}
          type="error"
          showIcon
          closable={false}
        />
      );
    }
    // Normally, just render children, i.e. in
    // case no error is Found
    return this.props.children;
  }
}

export default CError;