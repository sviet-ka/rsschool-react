import { Component, ErrorInfo, ReactNode } from 'react';
interface ErrorProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorProps, ErrorBoundryState> {
  state = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundryState {
    console.log('getDerivedStateFromError');
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log('componentDidCatch');
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
