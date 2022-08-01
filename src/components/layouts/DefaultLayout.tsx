import Head from "next/head";
import type { ReactNode } from "react";

type ComponentProps = { children: ReactNode };

const DefaultLayout = ({ children }: ComponentProps) => {
  return (
    <>
      <Head>
        <title>Tokolelang</title>
        <meta
          name="description"
          content="Tokolelang - Create your own auction with ease!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  );
};

export default DefaultLayout;
