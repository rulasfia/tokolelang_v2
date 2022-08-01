// src/pages/_app.tsx
import "@styles/globals.css";
import { withTRPC } from "@trpc/next";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { AppType } from "next/dist/shared/lib/utils";
import type { ReactElement, ReactNode } from "react";
import { Suspense } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import superjson from "superjson";
import type { AppRouter } from "../server/router";

import LoadingSpinner from "@components/atoms/Spinner";
import DefaultLayout from "@components/layouts/DefaultLayout";
import { AuthProvider } from "@components/providers/AuthProvider";
import { ErrorBoundaryProvider } from "@components/providers/ErrorBoundaryProvider";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <SessionProvider session={session}>
      <ErrorBoundaryProvider>
        <Suspense fallback={<LoadingSpinner withContainer />}>
          {getLayout(
            <AuthProvider>
              <Component {...pageProps} />

              {process.env.NODE_ENV !== "production" && (
                <ReactQueryDevtools
                  initialIsOpen={false}
                  position="bottom-right"
                />
              )}
            </AuthProvider>
          )}
        </Suspense>
      </ErrorBoundaryProvider>
    </SessionProvider>
  );
}) as AppType;

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3412}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config: ({ ctx }) => {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 100,
            suspense: true,
          },
        },
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
