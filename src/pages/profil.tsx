import type { NextPageWithLayout } from "./_app";
import { signOut, useSession } from "next-auth/react";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import Button from "@components/atoms/Button";

const ProfilPage: NextPageWithLayout = () => {
  const { data } = useSession();

  const onSignOut = () => {
    signOut({
      callbackUrl: "http://localhost:3412",
    });
  };
  return (
    <>
      <main className="min-h-screen w-screen bg-amber-50 p-4">
        <h2 className="text-[3rem] font-extrabold text-gray-700 md:text-[5rem] lg:text-[5rem]">
          Profil
        </h2>

        <Button type="button" onPress={onSignOut}>
          Sign Out
        </Button>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </main>
    </>
  );
};

export default ProfilPage;
ProfilPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
