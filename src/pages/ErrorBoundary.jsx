import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error:', error, errorInfo);
    }

    render() {
            return (
                <div className="error">
                    <h2>Oops! Something went wrong.</h2>
                    <p>Please refresh the page or try again later.</p>
                </div>
            );
    }
}

export default ErrorBoundary;
