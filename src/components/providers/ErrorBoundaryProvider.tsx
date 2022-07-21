import type { ReactNode } from "react";
import { useQueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";

type ComponentProps = { children: ReactNode };

const ErrorFallback = ({ action }: { action: () => void }) => {
  return (
    <div>
      There was an error!
      <button
        className="rounded-sm px-4 py-2 border border-gray-500"
        onClick={() => action()}
      >
        Try again
      </button>
    </div>
  );
};

export const ErrorBoundaryProvider = ({ children }: ComponentProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorFallback action={resetErrorBoundary} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
