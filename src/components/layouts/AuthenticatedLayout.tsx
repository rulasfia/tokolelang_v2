import Button from "@components/atoms/Button";
import NavLink from "@components/molecules/Navbar/NavLink";
import { signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";

type ComponentProps = { children: ReactNode };

const AuthenticatedLayout = ({ children }: ComponentProps) => {
  const onSignOut = () => {
    signOut({
      callbackUrl: "http://localhost:3000",
    });
  };

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

      <div className="text-gray-900 scroll-smooth antialiased">
        <nav className="flex sticky top-0 bg-white gap-y-2 border-b border-b-gray-400 justify-center flex-col px-8 h-28">
          <div className="flex flex-row justify-between items-center">
            <h3 className="font-bold text-2xl text-gray-700">Tokolelang</h3>
            <Button type="button" onPress={onSignOut}>
              Sign Out
            </Button>
          </div>

          <div className="flex flex-row justify-start gap-x-4 items-center">
            <NavLink href="/terbuka">Lelang Terbuka</NavLink>
            <NavLink href="/pesan">Pesan</NavLink>
            <NavLink href="/riwayat">Riwayat</NavLink>
            <NavLink href="/profil">Profil</NavLink>
          </div>
        </nav>

        {children}
      </div>
    </>
  );
};

export default AuthenticatedLayout;
