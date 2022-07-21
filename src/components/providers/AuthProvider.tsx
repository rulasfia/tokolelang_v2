import type { ReactNode } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingSpinner from "@components/atoms/Spinner";

const publicRoutes = ["/", "/login", "/signup"];

type ComponentProps = { children: ReactNode };

export const ProtectedRouteProvider = ({ children }: ComponentProps) => {
  const { status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      push("/");
    }
  }, [push, status]);

  if (status === "unauthenticated") return null;

  return <>{children}</>;
};

export const AuthProvider = ({ children }: ComponentProps) => {
  const { status } = useSession();
  const { pathname } = useRouter();

  if (status === "loading" && pathname === "/") return null;
  if (status === "loading" && pathname !== "/")
    return <LoadingSpinner withContainer />;

  return (
    <>
      {publicRoutes.includes(pathname) ? (
        children
      ) : (
        <ProtectedRouteProvider>{children}</ProtectedRouteProvider>
      )}
    </>
  );
};
