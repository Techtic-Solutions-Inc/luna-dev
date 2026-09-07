import React from 'react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryState {
  hasError: boolean
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="font-['EB_Garamond'] text-[32px] font-[500] text-[#ffffff]">
            Something went wrong.
          </h1>
          <p className="max-w-md text-[16px] text-[#828282]">
            An unexpected error occurred. Please try again or return to the home page.
          </p>
          <Button onClick={this.handleReset} type="button">
            Return home
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
