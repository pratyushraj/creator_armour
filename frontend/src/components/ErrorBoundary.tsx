import { Component, ReactNode } from 'react'
import { Button } from './Button'

interface ErrorBoundaryState {
    hasError: boolean
    error?: Error
}

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
                        <p className="text-gray-600 mb-6">
                            We're sorry, but something unexpected happened. Please try refreshing the page.
                        </p>
                        <div className="space-y-3">
                            <Button 
                                onClick={() => window.location.reload()} 
                                fullWidth
                            >
                                Refresh Page
                            </Button>
                            <Button 
                                variant="secondary" 
                                onClick={() => window.history.back()}
                                fullWidth
                            >
                                Go Back
                            </Button>
                        </div>
                        {this.state.error && (
                            <p className="text-sm text-gray-400 mt-4">
                                Error: {this.state.error.message}
                            </p>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}