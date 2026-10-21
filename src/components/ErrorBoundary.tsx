import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  fallback: (error: unknown, reset: () => void) => ReactNode;
  resetKey?: string;
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: unknown;
  hasError: boolean;
  resetKey: string | undefined;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = {
    error: null,
    hasError: false,
    resetKey: this.props.resetKey,
  };

  static getDerivedStateFromError(error: unknown): Partial<ErrorBoundaryState> {
    return { error, hasError: true };
  }

  static getDerivedStateFromProps(
    props: ErrorBoundaryProps,
    state: ErrorBoundaryState,
  ): Partial<ErrorBoundaryState> | null {
    if (props.resetKey !== state.resetKey) {
      return { error: null, hasError: false, resetKey: props.resetKey };
    }
    return null;
  }

  override componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  private readonly reset = (): void => {
    this.setState({ error: null, hasError: false });
  };

  override render(): ReactNode {
    if (this.state.hasError) return this.props.fallback(this.state.error, this.reset);
    return this.props.children;
  }
}
