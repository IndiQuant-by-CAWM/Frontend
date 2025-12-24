import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In real production, send to monitoring (Sentry, LogRocket, Datadog)
    // console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" aria-live="assertive" className="error-boundary" style={{padding:'2rem'}}>
          <h1>Something went wrong</h1>
          <p>We're sorry — an unexpected error occurred. Please try refreshing the page or contact support if the issue persists.</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">Reload</button>
        </main>
      );
    }
    return this.props.children;
  }
}
