import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // console.error(`Error : ${error}. Details : ${errorInfo}`);
        this.setState({
            hasError: true
        })
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong. Please look at error logs</h1>
        }

        return this.props.children;
    }
}
export default ErrorBoundary