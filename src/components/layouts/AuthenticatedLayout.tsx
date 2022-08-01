import Navbar from "@components/molecules/Navbar/Navbar";
import Head from "next/head";
import type { ReactNode } from "react";

type ComponentProps = { children: ReactNode };

const AuthenticatedLayout = ({ children }: ComponentProps) => {
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

      {/* navbar */}
      <Navbar />

      {/* content */}
      <div className="container mx-auto">{children}</div>
    </>
  );
};

export default AuthenticatedLayout;
