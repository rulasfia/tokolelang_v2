import Button from "@components/atoms/Button";
import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "react-query";

type ComponentProps = { children: ReactNode };

const ErrorFallback = ({ action }: { action: () => void }) => {
  return (
    <div>
      There was an error!
      <Button onPress={() => action()}>Try again</Button>
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
